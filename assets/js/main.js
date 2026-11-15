/* Casa de los Britos · Britos Restauración & Eventos — comportamiento compartido, sin dependencias */
(() => {
  'use strict';

  const CONFIG = {
    // PENDIENTE: correos reales (o un servicio de envío en data-endpoint del formulario)
    emailContacto: 'info@casadelosbritos.es',
    emailEventos: 'eventos@casadelosbritos.es',
    phoneDisplay: '635 82 40 92',
    // Horario publicado: jueves a domingo 12:30–23:30. 0 = domingo.
    hours: { 0: [12.5, 23.5], 4: [12.5, 23.5], 5: [12.5, 23.5], 6: [12.5, 23.5] },
  };
  const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  const root = document.documentElement;
  root.classList.add('js');

  /* Pantalla de carga: se va cuando las fuentes y la foto principal están listas */
  (() => {
    if (!root.classList.contains('is-loading')) return;
    const quick = root.classList.contains('loader-quick');
    const t0 = performance.now();
    const MIN = quick ? 0 : 900; // primera visita: un instante de marca
    const hero = document.querySelector('img[fetchpriority="high"], .hero__media img, .bhero__logo');
    const imgReady = hero ? (hero.decode ? hero.decode().catch(() => {}) : new Promise((r) => { if (hero.complete) r(); else { hero.onload = hero.onerror = r; } })) : Promise.resolve();
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const limit = new Promise((r) => setTimeout(r, 4000));
    let gone = false;
    const leave = () => {
      if (gone) return; gone = true;
      // la portada empieza a entrar mientras la pantalla de carga se desvanece
      root.classList.add('loader-out');
      root.classList.remove('is-loading');
      setTimeout(() => root.classList.remove('loader-out', 'loader-quick'), 700);
      try { sessionStorage.setItem('cb-visto', '1'); } catch (_) { /* nada */ }
    };
    Promise.race([Promise.all([imgReady, fontsReady]), limit]).then(() => {
      setTimeout(leave, Math.max(0, MIN - (performance.now() - t0)));
    });
    // Al volver con el botón «atrás» (caché del navegador) no debe quedarse puesta
    addEventListener('pageshow', (e) => { if (e.persisted) root.classList.remove('is-loading', 'loader-out', 'loader-quick'); });
  })();
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const live = $('#live');
  const say = (t) => { if (live) live.textContent = t; };

  /* Estado en directo: abierto / cerrado */
  const fmt = (h) => `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;
  const status = () => {
    const now = new Date();
    const d = now.getDay();
    const h = now.getHours() + now.getMinutes() / 60;
    const today = CONFIG.hours[d];
    if (today && h >= today[0] && h < today[1]) return { open: true, text: `Abierto · hasta las ${fmt(today[1])}` };
    if (today && h < today[0]) return { open: false, text: `Cerrado · abrimos hoy a las ${fmt(today[0])}` };
    for (let i = 1; i <= 7; i++) {
      const nd = (d + i) % 7;
      if (CONFIG.hours[nd]) return { open: false, text: `Cerrado · abrimos el ${i === 1 ? 'mañana' : DAYS[nd]} a las ${fmt(CONFIG.hours[nd][0])}`.replace('el mañana', 'mañana') };
    }
    return { open: false, text: 'Cerrado' };
  };
  const paintStatus = () => {
    const s = status();
    $$('[data-live]').forEach((el) => { el.textContent = s.text; });
    $$('.status').forEach((el) => el.setAttribute('data-open', String(s.open)));
  };
  paintStatus();
  setInterval(paintStatus, 60000);
  $$('.hours [data-days]').forEach((row) => {
    if (row.dataset.days.split(',').map(Number).includes(new Date().getDay())) row.classList.add('is-today');
  });

  /* Menú a pantalla completa */
  const menu = $('#menu');
  const openers = $$('[data-menu-open]');
  const main = $('#main');
  let lastFocus = null;
  let menuOpen = false;

  /* Cabecera de inicio → píldora: la píldora baja cuando la cabecera de arriba se va */
  const pillEl = $('#pill');
  const topEl = $('#top');
  const syncPill = () => {
    if (!pillEl) return;
    const limit = topEl ? topEl.offsetHeight + 40 : 80;
    const on = scrollY > limit;
    pillEl.classList.toggle('is-on', on);
    pillEl.toggleAttribute('inert', !on || menuOpen);
  };
  syncPill();
  addEventListener('scroll', syncPill, { passive: true });

  const setMenu = (open) => {
    if (!menu) return;
    menuOpen = open;
    menu.classList.toggle('is-open', open);
    menu.toggleAttribute('inert', !open);
    document.body.classList.toggle('menu-open', open);
    openers.forEach((b) => b.setAttribute('aria-expanded', String(open)));
    [main, $('.footer'), topEl, $('.callbar')].forEach((el) => el && el.toggleAttribute('inert', open));
    syncPill();
    if (open) {
      lastFocus = document.activeElement;
      setTimeout(() => { const c = $('[data-menu-close]', menu); if (c) c.focus({ preventScroll: true }); }, 60);
    } else if (lastFocus) {
      lastFocus.focus({ preventScroll: true });
    }
  };
  openers.forEach((b) => b.addEventListener('click', () => setMenu(true)));
  if (menu) {
    $('[data-menu-close]', menu).addEventListener('click', () => setMenu(false));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });
    // Vista previa de foto por enlace
    const prev = $$('.mprev img', menu);
    if (prev.length > 1) {
      $$('[data-prev]', menu).forEach((a) => {
        const show = () => prev.forEach((im, i) => im.classList.toggle('on', i === Number(a.dataset.prev)));
        a.addEventListener('mouseenter', show);
        a.addEventListener('focus', show);
      });
    }
  }

  /* Resalte que sigue al ratón en la píldora */
  const pnav = $('.pnav');
  if (pnav && fine) {
    const hl = $('.hl', pnav);
    const move = (a) => {
      hl.style.width = `${a.offsetWidth}px`;
      hl.style.transform = `translateX(${a.offsetLeft}px)`;
      hl.style.opacity = '1';
    };
    $$('a', pnav).forEach((a) => a.addEventListener('mouseenter', () => move(a)));
    pnav.addEventListener('mouseleave', () => { hl.style.opacity = '0'; });
  }

  /* Secciones activas en páginas de anclas (Britos) */
  const anchorLinks = $$('.pnav a[href^="#"]');
  if (anchorLinks.length && 'IntersectionObserver' in window) {
    const map = new Map(anchorLinks.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const a = map.get(en.target.id);
        if (a && en.isIntersecting) { anchorLinks.forEach((x) => x.classList.remove('is-current')); a.classList.add('is-current'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* Barra de llamada en móvil: aparece cuando la llamada principal ya no se ve */
  const callbar = $('.callbar');
  if (callbar) {
    const anchors = $$('[data-callbar-hide]');
    const visible = new Set();
    const update = () => callbar.classList.toggle('is-visible', visible.size === 0 && scrollY > 160);
    if ('IntersectionObserver' in window && anchors.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
        update();
      });
      anchors.forEach((a) => io.observe(a));
      addEventListener('scroll', update, { passive: true });
    } else {
      callbar.classList.add('is-visible');
    }
  }

  /* Copiar número */
  $$('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      let ok = false;
      try { await navigator.clipboard.writeText(text); ok = true; } catch (_) {
        const ta = Object.assign(document.createElement('textarea'), { value: text });
        ta.setAttribute('readonly', ''); ta.style.cssText = 'position:absolute;left:-9999px';
        document.body.appendChild(ta); ta.select();
        try { ok = document.execCommand('copy'); } catch (__) { ok = false; }
        ta.remove();
      }
      if (!ok) return;
      btn.classList.add('is-copied');
      say('Número copiado');
      clearTimeout(btn._t);
      btn._t = setTimeout(() => btn.classList.remove('is-copied'), 2200);
    });
  });

  /* Carta: filtros */
  const bar = $('[data-filters]');
  const fbar = $('.filters-bar');
  if (fbar) {
    const stick = () => { const top = parseFloat(getComputedStyle(fbar).top) || 0; fbar.classList.toggle('is-stuck', fbar.getBoundingClientRect().top <= top + 1); };
    stick(); addEventListener('scroll', stick, { passive: true });
  }
  if (bar) {
    const chips = $$('.chip', bar);
    const groups = $$('[data-group]');
    const apply = (cat, scroll) => {
      chips.forEach((c) => {
        const on = c.dataset.filter === cat;
        c.setAttribute('aria-pressed', String(on));
        if (on && scroll !== false) c.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
      });
      groups.forEach((g) => { g.hidden = !(cat === 'todo' || g.dataset.group === cat); });
      const n = groups.filter((g) => !g.hidden).reduce((s, g) => s + $$('.menu-list li', g).length, 0);
      say(`${n} referencias`);
    };
    chips.forEach((chip) => chip.addEventListener('click', () => {
      apply(chip.dataset.filter);
      const top = $('#carta-inicio');
      if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    }));
    const fromHash = () => {
      const h = location.hash.slice(1);
      if (chips.some((c) => c.dataset.filter === h)) apply(h, false);
    };
    fromHash();
    addEventListener('hashchange', fromHash);
  }

  /* Formularios: validación en línea y envío */
  $$('form[data-form]').forEach((form) => {
    const status = $('.form__status', form);
    const validate = (field) => {
      const input = $('.input, input[type="checkbox"]', field);
      if (!input) return true;
      const ok = input.checkValidity();
      field.classList.toggle('is-invalid', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    $$('.field', form).forEach((field) => {
      const input = $('.input', field);
      if (!input) return;
      input.addEventListener('blur', () => { if (input.value) validate(field); });
      input.addEventListener('input', () => { if (field.classList.contains('is-invalid')) validate(field); });
    });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = $$('.field', form);
      if (!fields.map(validate).every(Boolean)) {
        const first = $('.is-invalid .input, .is-invalid input', form);
        if (first) first.focus();
        return;
      }
      const endpoint = form.dataset.endpoint;
      const submit = $('[type="submit"]', form);
      if (endpoint) {
        submit.disabled = true;
        try {
          const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(res.status);
          status.textContent = form.dataset.success;
          form.reset();
        } catch (_) {
          status.textContent = `No se ha podido enviar. Llámanos al ${CONFIG.phoneDisplay}.`;
        } finally { status.hidden = false; submit.disabled = false; }
        return;
      }
      const to = form.dataset.form === 'eventos' ? CONFIG.emailEventos : CONFIG.emailContacto;
      const lines = $$('.field', form).map((field) => {
        const input = $('.input', field); const label = $('label', field);
        return input && input.value && label ? `${label.childNodes[0].textContent.trim()}: ${input.value}` : null;
      }).filter(Boolean);
      location.href = `mailto:${to}?subject=${encodeURIComponent(form.dataset.subject || 'Consulta desde la web')}&body=${encodeURIComponent(lines.join('\n'))}`;
      status.textContent = 'Se ha abierto tu correo con el mensaje ya escrito. Solo falta enviarlo.';
      status.hidden = false;
    });
  });

  /* Ventana emergente: cartel activado desde el panel (/admin), una vez por visita */
  if (location.protocol.startsWith('http') && 'HTMLDialogElement' in window) {
    const theme = document.body.dataset.theme;
    fetch('api/popup.php', { cache: 'no-store', headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => {
        if (!p || !p.active || !p.image) return;
        if (p.where !== 'all' && p.where !== theme) return;
        const key = `popup-visto-${p.id}`;
        try { if (sessionStorage.getItem(key)) return; } catch (_) { /* sin almacenamiento: se muestra */ }
        const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
        const external = p.link && /^https?:/i.test(p.link) && !p.link.startsWith(location.origin);
        const linkTo = (node) => { node.href = p.link; if (external) { node.target = '_blank'; node.rel = 'noopener'; } return node; };
        const hasText = !!(p.title || p.text);

        const dlg = el('dialog', 'popup');
        dlg.setAttribute('aria-label', p.title || p.alt || 'Aviso');
        const box = el('div', `popup__box ${hasText ? 'popup__box--split' : 'popup__box--poster'}${p.layout === 'right' ? ' popup__box--right' : ''}`);
        const close = el('button', 'popup__close');
        close.type = 'button'; close.setAttribute('aria-label', 'Cerrar');
        close.innerHTML = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

        const img = el('img', 'popup__img');
        img.src = p.image; img.alt = p.alt || '';
        const media = el('figure', 'popup__media');
        if (p.link && !hasText) { const a = linkTo(el('a')); a.appendChild(img); media.appendChild(a); } else media.appendChild(img);
        box.appendChild(media);

        if (hasText) {
          const body = el('div', 'popup__body');
          if (p.title) { const h = el('h2', 'popup__title', p.title); h.id = 'popup-title'; body.appendChild(h); dlg.setAttribute('aria-labelledby', 'popup-title'); dlg.removeAttribute('aria-label'); }
          if (p.text) body.appendChild(el('p', 'popup__text', p.text));
          if (p.link) {
            const b = linkTo(el('a', 'btn popup__cta', p.linkText || 'Ver más'));
            b.insertAdjacentHTML('beforeend', '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>');
            body.appendChild(b);
          }
          body.appendChild(Object.assign(el('button', 'popup__dismiss', 'No, gracias'), { type: 'button' }));
          box.appendChild(body);
        } else if (p.link && p.linkText) {
          const foot = el('div', 'popup__foot');
          foot.appendChild(linkTo(el('a', 'btn', p.linkText)));
          box.appendChild(foot);
        }
        box.appendChild(close);
        dlg.appendChild(box);
        document.body.appendChild(dlg);
        const shut = () => {
          try { sessionStorage.setItem(key, '1'); } catch (_) { /* nada */ }
          dlg.classList.remove('is-in');
          setTimeout(() => { dlg.close(); dlg.remove(); }, reduce ? 0 : 220);
        };
        close.addEventListener('click', shut);
        const dismiss = $('.popup__dismiss', dlg);
        if (dismiss) dismiss.addEventListener('click', shut);
        dlg.addEventListener('cancel', (e) => { e.preventDefault(); shut(); });
        dlg.addEventListener('click', (e) => { if (e.target === dlg) shut(); });
        dlg.tabIndex = -1;
        const open = () => { dlg.showModal(); dlg.focus({ preventScroll: true }); requestAnimationFrame(() => dlg.classList.add('is-in')); };
        // se abre cuando la imagen ya está cargada y tras la entrada de la portada
        img.addEventListener('load', () => setTimeout(open, 900), { once: true });
      })
      .catch(() => { /* sin servidor PHP: no hay ventana */ });
  }

  /* Reseñas de Google (las pide nuestro servidor; el visitante no conecta con Google) */
  const revBox = $('[data-reviews]');
  if (revBox && location.protocol.startsWith('http')) {
    const STAR = 'M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1 6.3 20.2l1.2-6.3L2.8 9.5l6.4-.8z';
    const five = `<svg viewBox="0 0 24 24"><path d="${STAR}"/></svg>`.repeat(5);
    const stars = (n) => {
      const pct = Math.max(0, Math.min(5, n)) / 5 * 100;
      return `<span class="stars" role="img" aria-label="${String(n).replace('.', ',')} de 5 estrellas"><span class="stars__base">${five}</span><span class="stars__fill" style="width:${pct}%">${five}</span></span>`;
    };
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    fetch('api/resenas.php', { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d || !d.active || !d.reviews || !d.reviews.length) return;
        $('[data-r-rating]', revBox).textContent = Number(d.rating).toFixed(1).replace('.', ',');
        $('[data-r-stars]', revBox).innerHTML = stars(d.rating);
        $('[data-r-count]', revBox).textContent = `${d.count.toLocaleString('es-ES')} opiniones en Google`;
        const link = $('[data-r-link]', revBox);
        if (d.url) link.href = d.url; else link.remove();
        $('[data-r-list]', revBox).innerHTML = d.reviews.map((r) => `
          <li class="review">
            ${stars(r.rating)}
            <p class="review__text">${esc(r.text)}</p>
            <p class="review__meta"><span class="review__avatar" aria-hidden="true">${esc((r.author || '?').trim().charAt(0).toUpperCase())}</span><span><strong>${esc(r.author)}</strong><br><span class="muted">${esc(r.when)}</span></span></p>
          </li>`).join('');
        revBox.hidden = false;
      })
      .catch(() => { /* sin reseñas: la sección sigue oculta */ });
  }

  /* Mapa: no se conecta con Google hasta que el visitante lo pide */
  $$('[data-map-load]').forEach((btn) => btn.addEventListener('click', () => {
    const box = btn.closest('.map');
    const frame = box && $('iframe[data-src]', box);
    if (!frame) return;
    frame.src = frame.dataset.src;
    frame.hidden = false;
    const gate = $('[data-map-gate]', box);
    if (gate) gate.remove();
    frame.focus({ preventScroll: true });
  }));

  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
