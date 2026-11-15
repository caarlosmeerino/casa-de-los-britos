/* Carrusel de la portada: cortina lateral, autoplay con pausa, deslizar con el dedo y flechas del teclado */
(() => {
  'use strict';
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const slides = [...root.querySelectorAll('.slide')];
    const dots = [...root.querySelectorAll('.carousel__dot')];
    const pauseBtn = root.querySelector('[data-pause]');
    const stage = root.querySelector('.ph');
    const interval = Number(root.dataset.interval) || 6000;
    if (slides.length < 2) return;
    root.style.setProperty('--interval', `${interval}ms`);

    let index = 0;
    let z = slides.length;
    let timer = null;
    let userPaused = false;
    let hoverPaused = false;
    let busy = false;

    // Las fotos que no se ven aún se cargan cuando la página ya está lista
    const warm = () => slides.forEach((s) => { s.loading = 'eager'; });
    if (document.readyState === 'complete') warm(); else addEventListener('load', warm);

    slides[0].style.zIndex = String(z);
    requestAnimationFrame(() => root.classList.add('is-ready'));

    const paused = () => userPaused || hoverPaused || document.hidden;
    const syncPaused = () => {
      root.classList.toggle('is-paused', paused());
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-pressed', String(userPaused));
        pauseBtn.setAttribute('aria-label', userPaused ? 'Reanudar el carrusel' : 'Pausar el carrusel');
      }
    };

    const schedule = () => {
      clearTimeout(timer);
      if (paused()) return;
      // el tiempo restante lo marca la barra de progreso (su animación se pausa con la clase)
      const bar = dots[index] && dots[index].querySelector('span');
      const anim = bar && bar.getAnimations ? bar.getAnimations({ subtree: true })[0] : null;
      const left = anim && anim.currentTime != null ? Math.max(0, interval - anim.currentTime) : interval;
      timer = setTimeout(() => go(index + 1, 'next'), left);
    };

    const go = (to, dir) => {
      const next = (to + slides.length) % slides.length;
      if (next === index || busy) return;
      busy = true;
      const prev = slides[index];
      const incoming = slides[next];
      root.dataset.dir = dir || (next > index ? 'next' : 'prev');
      // colocar la foto entrante en su posición de salida antes de animar
      incoming.classList.remove('is-active', 'is-leaving');
      void incoming.offsetWidth;
      prev.classList.add('is-leaving');
      prev.classList.remove('is-active');
      incoming.style.zIndex = String(++z);
      incoming.classList.add('is-active');
      prev.setAttribute('aria-hidden', 'true');
      incoming.setAttribute('aria-hidden', 'false');

      dots.forEach((d, i) => {
        d.classList.toggle('is-active', i === next);
        d.classList.toggle('is-done', false);
        if (i === next) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
        // reiniciar la barra de progreso del punto activo
        const span = d.querySelector('span');
        if (i === next && span) { span.style.animation = 'none'; void span.offsetWidth; span.style.animation = ''; }
      });
      index = next;
      const done = () => { prev.classList.remove('is-leaving'); busy = false; };
      setTimeout(done, 1250);
      schedule();
    };

    dots.forEach((d) => d.addEventListener('click', () => {
      const to = Number(d.dataset.go);
      go(to, to > index ? 'next' : 'prev');
    }));

    if (pauseBtn) pauseBtn.addEventListener('click', () => { userPaused = !userPaused; syncPaused(); schedule(); });

    // Pausa al pasar el ratón y cuando la pestaña no se ve
    if (fine) {
      stage.addEventListener('pointerenter', () => { hoverPaused = true; syncPaused(); clearTimeout(timer); });
      stage.addEventListener('pointerleave', () => { hoverPaused = false; syncPaused(); schedule(); });
    }
    document.addEventListener('visibilitychange', () => { syncPaused(); schedule(); });

    // Deslizar con el dedo o arrastrar con el ratón
    let sx = 0, sy = 0, st = 0, dragging = false;
    stage.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging = true; sx = e.clientX; sy = e.clientY; st = performance.now();
    });
    const end = (e) => {
      if (!dragging) return;
      dragging = false;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      const v = Math.abs(dx) / Math.max(1, performance.now() - st);
      if (Math.abs(dx) > Math.abs(dy) && (Math.abs(dx) > 40 || v > 0.3)) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 'next' : 'prev');
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', () => { dragging = false; });
    stage.addEventListener('dragstart', (e) => e.preventDefault());

    // Flechas del teclado cuando el foco está en el carrusel
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1, 'next'); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1, 'prev'); }
    });

    syncPaused();
    schedule();
  });
})();
