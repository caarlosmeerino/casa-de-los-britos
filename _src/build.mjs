// Generador de la web: ensambla cabecera, menú, pie y barra de llamada
// alrededor del contenido de cada página de _src/pages y escribe HTML
// estático en la raíz del proyecto. Uso:  node _src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

export const DATA = {
  tel: { display: '635 82 40 92', href: 'tel:+34635824092' },
  telGrupos: { display: '609 75 16 47', href: 'tel:+34609751647' },
  address: ['C. Meléndez Valdés, 14', '06225 Ribera del Fresno', 'Badajoz'],
  maps: 'https://www.google.com/maps/search/?api=1&query=Casa+de+los+Britos%2C+C.+Mel%C3%A9ndez+Vald%C3%A9s+14%2C+Ribera+del+Fresno',
  instagram: 'https://www.instagram.com/casadelosbritos/',
  tiktok: 'https://www.tiktok.com/@casadelosbritos',
};

const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
  <symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></symbol>
  <symbol id="i-photo" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1.5"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-8 8"/></symbol>
</svg>`;

const NAV = {
  casa: {
    brand: { href: 'index.html', img: 'assets/logos/casa-logotipo-03-mantel.png', w: 800, h: 464, alt: 'Restaurante Casa de los Britos', label: 'Casa de los Britos, inicio' },
    items: [
      { href: 'index.html', key: 'inicio', label: 'Inicio', small: 'Inicio', menuLabel: 'Casa de los Britos', pill: false, img: '4e3a8246' },
      { href: 'el-restaurante.html', key: 'restaurante', label: 'El restaurante', small: 'El lugar', img: 'dsc06935' },
      { href: 'carta.html', key: 'carta', label: 'La carta', small: 'Cocina', img: 'dsc07287' },
      { href: 'reservas.html', key: 'reservas', label: 'Reservas', small: 'Mesa', img: '4e3a8236' },
      { href: 'contacto.html', key: 'contacto', label: 'Contacto', small: 'Visita', img: 'dsc06948' },
      { href: 'blog.php', key: 'blog', label: 'Blog', small: 'Novedades', img: '4e3a8597' },
    ],
    out: { href: 'eventos.html', pillLabel: 'Eventos', icon: 'assets/logos/britos-icono-white.png', img: 'assets/logos/eventos-logotipo-01-white.png', w: 800, h: 220, alt: 'Britos Restauración & Eventos' },
    call: DATA.tel, callLabel: 'Llamar',
  },
  britos: {
    brand: { href: 'eventos.html', img: 'assets/logos/britos-logotipo-burdeos.png', w: 900, h: 248, alt: 'Britos Restauración & Eventos', label: 'Britos Restauración & Eventos, inicio' },
    items: [
      { href: '#bodas', key: 'bodas', label: 'Bodas', small: 'Celebrar' },
      { href: '#bautizos', key: 'bautizos', label: 'Bautizos', small: 'Familia' },
      { href: '#comuniones', key: 'comuniones', label: 'Comuniones', small: 'Familia' },
      { href: '#catering', key: 'catering', label: 'Catering', small: 'En destino' },
      { href: '#empresa', key: 'empresa', label: 'Empresa', small: 'Equipos' },
      { href: '#presupuesto', key: 'presupuesto', label: 'Presupuesto', small: 'Contacto' },
    ],
    out: { href: 'index.html', pillLabel: 'Restaurante', img: 'assets/logos/casa-logotipo-03.png', w: 800, h: 464, alt: 'Restaurante Casa de los Britos' },
    call: DATA.telGrupos, callLabel: 'Llamar',
  },
};

const ico = (id, cls = 'ico') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;

function head(m) {
  const theme = m.theme === 'britos' ? '#fffdf4' : '#140e0f';
  const icon = m.theme === 'britos' ? 'assets/logos/britos-favicon.png' : 'assets/logos/casa-logo-completo.png';
  const pre = m.preload ? `<link rel="preload" as="image" href="assets/img/${m.preload}-1600.webp" imagesrcset="assets/img/${m.preload}-800.webp 800w, assets/img/${m.preload}-1600.webp 1600w" imagesizes="(max-width: 899px) 100vw, 58vw">` : '';
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${m.title}</title>
<meta name="description" content="${m.description}">
<meta name="theme-color" content="${theme}">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="${m.title}">
<meta property="og:description" content="${m.description}">
<meta property="og:image" content="assets/img/${m.og || m.preload || 'dsc07287'}-1600.webp">
<link rel="icon" type="image/png" href="${icon}">
${m.theme === 'britos'
  ? '<link rel="preload" href="assets/fonts/unageo-var.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="preload" href="assets/fonts/coliner-medium.woff2" as="font" type="font/woff2" crossorigin>'
  : '<link rel="preload" href="assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>'}
${pre}
<link rel="stylesheet" href="assets/css/styles.css">
<script src="assets/js/main.js" defer></script>
<script src="assets/js/motion.js" defer></script>
<script src="assets/js/carousel.js" defer></script>
</head>`;
}

// Cabecera transparente del principio de la página (da paso a la píldora al hacer scroll)
function top(theme) {
  const n = NAV[theme];
  const status = theme === 'casa' ? '<span class="status top__status"><i></i><span data-live>Abrimos de jueves a domingo</span></span>' : '';
  const callText = theme === 'casa' ? 'Reservar' : 'Eventos';
  return `<header class="top" id="top">
  <a class="top__brand" href="${n.brand.href}" aria-label="${n.brand.label}"><img src="${n.brand.img}" alt="${n.brand.alt}" width="${n.brand.w}" height="${n.brand.h}"></a>
  <div class="top__r">
    ${status}
    <a class="top__call" href="${n.call.href}">${callText} · <span class="num">${n.call.display}</span></a>
    <button class="burger" type="button" data-menu-open aria-expanded="false" aria-controls="menu" aria-label="Abrir menú"><b></b><b></b><b></b></button>
  </div>
</header>`;
}

function pill(theme, current) {
  const n = NAV[theme];
  const links = n.items.filter((i) => i.pill !== false).map((i) => `<a href="${i.href}"${i.key === current ? ' aria-current="page"' : ''}>${i.label}</a>`).join('');
  const out = theme === 'casa'
    ? `<span class="pnav__sep" aria-hidden="true"></span><a class="pnav__brand" href="${n.out.href}"><img src="${n.out.icon}" alt="" width="18" height="18">${n.out.pillLabel}</a>`
    : '';
  return `<header class="pill" id="pill" inert>
  <a class="pill__brand" href="${n.brand.href}" aria-label="${n.brand.label}"><img src="${n.brand.img}" alt="${n.brand.alt}" width="${n.brand.w}" height="${n.brand.h}"></a>
  <nav class="pnav" aria-label="Principal"><span class="hl" aria-hidden="true"></span>${links}</nav>
  ${out}
  <a class="btn pill__call" href="${n.call.href}">${ico('phone')}${n.callLabel} <span class="num">${n.call.display}</span></a>
  <button class="burger" type="button" data-menu-open aria-expanded="false" aria-controls="menu" aria-label="Abrir menú"><b></b><b></b><b></b></button>
</header>`;
}

function menu(theme, current) {
  const n = NAV[theme];
  const links = n.items.map((i, idx) => `<li style="--i:${idx}"><a href="${i.href}" data-prev="${idx}"${i.key === current ? ' aria-current="page"' : ''}><small>${i.small}</small><span>${i.menuLabel || i.label}</span></a></li>`).join('\n      ');
  const outLink = `<li class="mlinks__out" style="--i:${n.items.length}"><a href="${n.out.href}"><img src="${n.out.img}" alt="${n.out.alt}" width="${n.out.w}" height="${n.out.h}" loading="lazy">${ico('arrow')}</a></li>`;
  const prev = theme === 'casa'
    ? `<div class="mprev" aria-hidden="true">${n.items.map((i, idx) => `<img src="assets/img/${i.img}-800.webp" alt="" loading="lazy"${idx === 0 ? ' class="on"' : ''}>`).join('')}</div>`
    : `<div class="mprev" aria-hidden="true"><img src="assets/img/britos-eventos-01-800.webp" alt="" loading="lazy" class="on"></div>`;
  const foot = theme === 'casa'
    ? `<div><b>Dirección</b><a href="${DATA.maps}" target="_blank" rel="noopener">${DATA.address[0]}<br>Ribera del Fresno</a></div>
    <div><b>Hoy</b><span data-live>Abrimos de jueves a domingo</span></div>
    <div><b>Reservas</b><a class="num" href="${DATA.tel.href}">${DATA.tel.display}</a></div>
    <div><b>Síguenos</b><a href="${DATA.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${DATA.tiktok}" target="_blank" rel="noopener">TikTok</a></div>`
    : `<div><b>Eventos y grupos</b><a class="num" href="${DATA.telGrupos.href}">${DATA.telGrupos.display}</a></div>
    <div><b>Presupuesto</b><a href="#presupuesto">Cuéntanos tu celebración</a></div>
    <div><b>Dónde</b>Ribera del Fresno y Tierra de Barros</div>
    <div><b>Síguenos</b><a href="${DATA.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${DATA.tiktok}" target="_blank" rel="noopener">TikTok</a></div>`;
  return `<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menú" inert>
  <div class="menu__head">
    <a href="${n.brand.href}" aria-label="${n.brand.label}"><img src="${n.brand.img}" alt="${n.brand.alt}" width="${n.brand.w}" height="${n.brand.h}"></a>
    <button class="burger" type="button" data-menu-close aria-expanded="true" aria-label="Cerrar menú"><b></b><b></b><b></b></button>
  </div>
  <div class="menu__body">
    <ul class="mlinks">
      ${links}
      ${outLink}
    </ul>
    ${prev}
  </div>
  <div class="menu__foot">
    ${foot}
  </div>
</div>`;
}

function footer(theme) {
  if (theme === 'britos') {
    return `<footer class="footer">
  <div class="wrap">
    <div class="footer__top">
      <div><img class="footer__logo" src="assets/logos/britos-logotipo-burdeos.png" alt="Britos Restauración &amp; Eventos" width="900" height="248" loading="lazy"></div>
      <div>
        <h2>Eventos y grupos</h2>
        <p><a class="num" href="${DATA.telGrupos.href}">${DATA.telGrupos.display}</a></p>
        <p><a href="#presupuesto">Pedir presupuesto</a></p>
      </div>
      <div>
        <h2>Celebraciones</h2>
        <ul><li><a href="#bodas">Bodas</a></li><li><a href="#bautizos">Bautizos</a></li><li><a href="#comuniones">Comuniones</a></li><li><a href="#catering">Catering</a></li><li><a href="#empresa">Empresa</a></li></ul>
      </div>
      <div>
        <h2>El grupo</h2>
        <ul><li><a href="index.html">Restaurante Casa de los Britos</a></li><li><a href="#casas">Nuestras casas</a></li></ul>
      </div>
      <div>
        <h2>Síguenos</h2>
        <ul><li><a href="${DATA.instagram}" target="_blank" rel="noopener">Instagram</a></li><li><a href="${DATA.tiktok}" target="_blank" rel="noopener">TikTok</a></li></ul>
      </div>
    </div>
    <div class="footer__brands"><img src="assets/logos/nuestras-marcas-burdeos.png" alt="Nuestras marcas: Café Hibernia, Restaurante Casa de los Britos, Ca·Nostra, Ribbo Restaurant y Bianco" width="1800" height="159" loading="lazy"></div>
    <div class="footer__legal"><p>© <span data-year>2026</span> Britos Restauración &amp; Eventos · Ribera del Fresno, Badajoz</p><p class="footer__links"><a href="aviso-legal.html">Aviso legal</a> · <a href="privacidad.html">Privacidad</a> · <a href="cookies.html">Cookies</a></p></div>
  </div>
</footer>`;
  }
  return `<footer class="footer">
  <div class="wrap">
    <div class="footer__top">
      <div><img class="footer__logo" src="assets/logos/casa-logo-completo-laton.png" alt="Restaurante Casa de los Britos" width="800" height="800" loading="lazy"></div>
      <div>
        <h2>Visítanos</h2>
        <address>${DATA.address[0]}<br>${DATA.address[1]}<br>${DATA.address[2]}</address>
        <p><a href="${DATA.maps}" target="_blank" rel="noopener">Cómo llegar</a></p>
      </div>
      <div>
        <h2>Reservas</h2>
        <p><a class="num" href="${DATA.tel.href}">${DATA.tel.display}</a></p>
        <p>Grupos: <a class="num" href="${DATA.telGrupos.href}">${DATA.telGrupos.display}</a></p>
      </div>
      <div>
        <h2>Horario</h2>
        <p>Jueves a domingo<br><span class="num">12:30 – 23:30</span><br>Lunes a miércoles cerrado</p>
      </div>
      <div>
        <h2>El restaurante</h2>
        <ul><li><a href="el-restaurante.html">El restaurante</a></li><li><a href="carta.html">La carta</a></li><li><a href="reservas.html">Reservas</a></li><li><a href="contacto.html">Contacto</a></li><li><a href="blog.php">Blog</a></li><li><a href="${DATA.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${DATA.tiktok}" target="_blank" rel="noopener">TikTok</a></li></ul>
      </div>
    </div>
    <div class="footer__brands"><img src="assets/logos/eventos-nuestras-marcas-white.png" alt="Nuestras marcas: Café Hibernia, Restaurante Casa de los Britos, Ca·Nostra, Ribbo Restaurant y Bianco" width="1800" height="159" loading="lazy"></div>
    <div class="footer__legal"><p>© <span data-year>2026</span> Casa de los Britos · Parte de <a href="eventos.html">Britos Restauración &amp; Eventos</a></p><p class="footer__links"><a href="aviso-legal.html">Aviso legal</a> · <a href="privacidad.html">Privacidad</a> · <a href="cookies.html">Cookies</a></p></div>
  </div>
</footer>`;
}

function callbar(theme) {
  return theme === 'britos'
    ? `<div class="callbar"><a class="btn btn--lg" href="${DATA.telGrupos.href}">${ico('phone')}Llamar · <span class="num">${DATA.telGrupos.display}</span></a></div>`
    : `<div class="callbar"><a class="btn btn--lg" href="${DATA.tel.href}">${ico('phone')}Reservar · <span class="num">${DATA.tel.display}</span></a></div>`;
}

// Ayudante para imágenes responsivas
export const img = (name, alt, { w = 1600, h = 2400, sizes = '100vw', eager = false, pos = '', big = false } = {}) => {
  const src = big ? `assets/img/${name}-1600.webp` : `assets/img/${name}-800.webp`;
  return `<img src="${src}" srcset="assets/img/${name}-800.webp 800w, assets/img/${name}-1600.webp 1600w" sizes="${sizes}" width="${w}" height="${h}" alt="${alt}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}${pos ? ` style="object-position:${pos}"` : ''}>`;
};

const dims = JSON.parse(fs.readFileSync(path.join(root, 'assets/img/_dims.json'), 'utf8'));
export const im = (name, alt, opts = {}) => {
  const [w, h] = dims[name] || [1600, 2400];
  return img(name, alt, { w, h, ...opts });
};

const pagesDir = path.join(here, 'pages');
for (const file of fs.readdirSync(pagesDir).filter((f) => f.endsWith('.mjs'))) {
  const mod = await import(path.join(pagesDir, file).replace(/\\/g, '/').replace(/^([A-Z]):/, 'file:///$1:'));
  const m = mod.meta;
  const body = mod.body({ DATA, im, ico });
  const html = `${m.phpTop || ""}${head(m)}
<body data-theme="${m.theme}">
${SPRITE}
<a class="skip" href="#main">Saltar al contenido</a>
${top(m.theme)}
${pill(m.theme, m.current)}
${menu(m.theme, m.current)}
<main id="main">
${body}
</main>
${footer(m.theme)}
${callbar(m.theme)}
<p id="live" class="sr-only" aria-live="polite"></p>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, m.out), html);
  console.log('escrito', m.out);
}
