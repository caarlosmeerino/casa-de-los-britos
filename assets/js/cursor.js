/* Cursor propio (solo ratón): el punto va pegado al puntero y el aro lo sigue
   con inercia; sobre enlaces y botones el aro crece. En campos de texto vuelve
   el cursor normal. */
(() => {
  'use strict';
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const root = document.documentElement;
  const el = document.createElement('div');
  el.className = 'cursor';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<span class="cursor__ring"><i></i></span><span class="cursor__dot"></span>';
  const ring = el.firstChild;
  const dot = el.lastChild;
  const HOVER = 'a, button, [role="button"], label, summary, select, .carousel .ph, [data-cursor]';
  const TEXT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable]';
  let x = -100, y = -100, rx = -100, ry = -100, running = false, seen = false;

  let last = 0;
  const loop = (now) => {
    // suavizado por tiempo: igual de fluido a 60 Hz que a 144 Hz
    const k = 1 - Math.pow(0.8, Math.min(100, now - (last || now - 16.7)) / 16.7);
    last = now;
    rx += (x - rx) * k; ry += (y - ry) * k;
    ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
    if (Math.abs(x - rx) < 0.1 && Math.abs(y - ry) < 0.1) { running = false; last = 0; return; }
    requestAnimationFrame(loop);
  };
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY;
    if (!seen) { seen = true; rx = x; ry = y; }
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    root.classList.add('cursor-in');
    const t = e.target instanceof Element ? e.target : null;
    root.classList.toggle('cursor-text', !!(t && t.closest(TEXT)));
    root.classList.toggle('cursor-hover', !!(t && t.closest(HOVER)));
    if (!running) { running = true; requestAnimationFrame(loop); }
  }, { passive: true });
  addEventListener('pointerdown', () => root.classList.add('cursor-down'));
  addEventListener('pointerup', () => root.classList.remove('cursor-down'));
  document.addEventListener('mouseleave', () => root.classList.remove('cursor-in'));
  addEventListener('blur', () => root.classList.remove('cursor-in'));

  const mount = () => { document.body.appendChild(el); root.classList.add('has-cursor'); };
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
