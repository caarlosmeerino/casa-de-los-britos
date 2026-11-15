/* Capa de movimiento: un único bucle rAF con suavizado (lerp).
   Solo transform / opacity / clip-path, para que todo corra en la GPU.
   No toca el scroll nativo: la página se desplaza como siempre y los
   efectos siguen ese desplazamiento con inercia. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const S = { y: scrollY, sy: scrollY, vh: innerHeight, tasks: [] };
  addEventListener('resize', () => { S.vh = innerHeight; }, { passive: true });

  /* ---------- Apariciones (texto y fotos) ---------- */
  const TEXT = [
    '.head > *', 'main .split > .stack > *', '.close__in > div > *', '.facts > div', '.timeline li', '.steps li',
    '.houses li', '.services .service', '.spaces .space > :not(figure)', '.tiles h3', '.index-list li',
    '.to-britos__in > *', '.menu-group__head > :not(figure)', '.menu-sub', '.contact-rows > *', 'main .hours > div',
    '.statement + .link', '.form > .field', '.form__foot',
  ].join(',');
  const PHOTO = 'main .ph:not(.ph--pending)';

  const pending = [];
  const prepare = () => {
    const vh = innerHeight;
    // Solo lo que empieza fuera de la pantalla: lo visible al cargar no parpadea
    const below = (el) => el.getBoundingClientRect().top > vh * 0.9;
    $$(TEXT).forEach((el) => {
      if (el.closest('[data-enter], .hero, .bhero') || !below(el)) return;
      el.classList.add('fx');
      pending.push(el);
    });
    $$(PHOTO).forEach((el) => {
      if (el.closest('.hero, .bhero, .hero__media') || !below(el)) return;
      el.classList.add('clip');
      pending.push(el);
    });
    // Escalonado entre hermanos que entran juntos
    const groups = new Map();
    pending.forEach((el) => {
      const p = el.parentElement;
      if (!groups.has(p)) groups.set(p, []);
      groups.get(p).push(el);
    });
    groups.forEach((list) => list.forEach((el, i) => el.style.setProperty('--d', `${Math.min(i, 5) * 90}ms`)));
  };

  const revealTask = () => {
    if (!pending.length) return;
    for (let i = pending.length - 1; i >= 0; i--) {
      const el = pending[i];
      const r = el.getBoundingClientRect();
      if (r.top < S.vh * 0.9 || r.bottom < 0) {
        el.classList.add('in');
        if (el.classList.contains('clip')) setTimeout(() => el.classList.add('done'), 2000);
        pending.splice(i, 1);
      }
    }
  };

  /* ---------- Parallax en fotos grandes ---------- */
  const PAR = [
    ['.hero__media .ph', 9], ['.gallery > .ph:first-child', 7], ['main .split > figure.ph', 6], ['.spaces .space .ph', 5],
  ];
  const parEls = [];
  const preparePar = () => {
    if (reduce) return;
    PAR.forEach(([sel, amt]) => $$(sel).forEach((fig) => {
      const img = fig.querySelector(':scope > .slides, :scope > img');
      if (!img || fig.querySelector('.par')) return;
      const layer = document.createElement('div');
      layer.className = 'par';
      fig.insertBefore(layer, img);
      layer.appendChild(img);
      parEls.push({ fig, layer, amt });
    }));
  };
  const parTask = () => {
    parEls.forEach((o) => {
      const r = o.fig.getBoundingClientRect();
      if (r.bottom < -120 || r.top > S.vh + 120) return;
      // desplazamiento suavizado: usamos la diferencia entre scroll real y suavizado
      const lag = S.y - S.sy;
      const p = (r.top + lag + r.height / 2 - S.vh / 2) / (S.vh / 2 + r.height / 2);
      o.layer.style.transform = `translate3d(0, ${(clamp(p, -1.2, 1.2) * -o.amt).toFixed(2)}%, 0)`;
    });
  };

  /* ---------- Manifiesto: palabras que se encienden ---------- */
  const words = [];
  const prepareWords = () => {
    $$('.statement').forEach((st) => {
      const parts = st.textContent.trim().split(/\s+/);
      st.setAttribute('aria-label', st.textContent.trim());
      st.innerHTML = parts.map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
      words.push({ st, ws: $$('.w', st), lit: -1 });
    });
  };
  const wordsTask = () => {
    words.forEach((o) => {
      const r = o.st.getBoundingClientRect();
      if (r.bottom < 0 || r.top > S.vh) return;
      const start = S.vh * 0.85;
      const end = S.vh * 0.35;
      const k = clamp((start - (r.top + (S.y - S.sy))) / (start - end + r.height * 0.6), 0, 1);
      const n = Math.round(k * o.ws.length);
      if (n !== o.lit) { o.ws.forEach((w, i) => w.classList.toggle('on', i < n)); o.lit = n; }
    });
  };

  /* ---------- Botones magnéticos ---------- */
  const magTask = (() => {
    if (!fine || reduce) return null;
    const btns = $$('.btn--lg, .phone-pill, .pill__call, .burger').map((el) => ({ el, x: 0, y: 0, tx: 0, ty: 0 }));
    btns.forEach((b) => {
      b.el.classList.add('mag');
      b.el.addEventListener('pointermove', (e) => {
        const r = b.el.getBoundingClientRect();
        b.tx = ((e.clientX - r.left) / r.width - 0.5) * 10;
        b.ty = ((e.clientY - r.top) / r.height - 0.5) * 8;
      });
      b.el.addEventListener('pointerleave', () => { b.tx = 0; b.ty = 0; });
    });
    return () => btns.forEach((b) => {
      b.x = lerp(b.x, b.tx, 0.18); b.y = lerp(b.y, b.ty, 0.18);
      if (Math.abs(b.x) < 0.01 && Math.abs(b.y) < 0.01 && !b.tx && !b.ty) { if (b.el.style.translate) b.el.style.translate = ''; return; }
      b.el.style.translate = `${b.x.toFixed(2)}px ${b.y.toFixed(2)}px`;
    });
  })();

  /* ---------- Bucle ---------- */
  const frame = () => {
    S.y = scrollY;
    S.sy = reduce ? S.y : lerp(S.sy, S.y, 0.1);
    if (Math.abs(S.sy - S.y) < 0.1) S.sy = S.y;
    revealTask();
    if (parEls.length) parTask();
    if (words.length) wordsTask();
    if (magTask) magTask();
    requestAnimationFrame(frame);
  };

  const start = () => {
    prepare();
    preparePar();
    prepareWords();
    requestAnimationFrame(frame);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
