<?php
declare(strict_types=1);
require __DIR__ . '/api/_lib.php';
// Raíz de la web (la entrada se sirve en /blog/slug, un nivel más abajo)
$R = rtrim(strtr(dirname($_SERVER['SCRIPT_NAME'] ?? '/'), DIRECTORY_SEPARATOR, '/'), '/') . '/';
$GLOBALS['R'] = $R;
$post = find_post((string) ($_GET['s'] ?? ''));
if (!$post || empty($post['published']) || ($post['date'] ?? '') > date('Y-m-d')) { http_response_code(404); $post = null; }
$pageTitle = $post ? $post['title'] . ' · Blog · Casa de los Britos' : 'Entrada no encontrada · Casa de los Britos';
$pageDesc = $post ? ($post['excerpt'] ?: mb_substr(strip_tags(md($post['body'])), 0, 160)) : 'Esta entrada no existe o ya no está publicada.';
?><!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title><?= e($pageTitle) ?></title>
<script>(function(d){var h=d.documentElement;h.classList.add('js','is-loading');try{if(sessionStorage.getItem('cb-visto'))h.classList.add('loader-quick')}catch(e){}setTimeout(function(){h.classList.remove('is-loading')},6000)})(document)</script>
<meta name="description" content="<?= e($pageDesc) ?>">
<meta name="theme-color" content="#140e0f">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="<?= e($pageTitle) ?>">
<meta property="og:description" content="<?= e($pageDesc) ?>">
<meta property="og:image" content="<?= $R ?>assets/img/4e3a8597-1600.webp">
<link rel="icon" type="image/png" href="<?= $R ?>assets/logos/casa-logo-completo.png">
<link rel="preload" href="<?= $R ?>assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>

<link rel="stylesheet" href="<?= $R ?>assets/css/styles.css?v=69b793e0">
<script src="<?= $R ?>assets/js/main.js?v=a32b78e7" defer></script>
<script src="<?= $R ?>assets/js/motion.js?v=c210499e" defer></script>
<script src="<?= $R ?>assets/js/carousel.js?v=3fe8a7d3" defer></script>
</head>
<body data-theme="casa">
<div class="loader" aria-hidden="true"><img class="loader__mark" src="<?= $R ?>assets/logos/casa-logo-completo-laton.png" alt="" width="800" height="800"><span class="loader__line"><i></i></span></div>
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
  <symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></symbol>
  <symbol id="i-photo" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1.5"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-8 8"/></symbol>
</svg>
<a class="skip" href="#main">Saltar al contenido</a>
<header class="top" id="top">
  <a class="top__brand" href="<?= $R ?>" aria-label="Casa de los Britos, inicio"><img src="<?= $R ?>assets/logos/casa-logotipo-03-mantel.png" alt="Restaurante Casa de los Britos" width="800" height="464"></a>
  <div class="top__r">
    <span class="status top__status"><i></i><span data-live>Abrimos de jueves a domingo</span></span>
    <a class="top__call" href="tel:+34635824092">Reservar · <span class="num">635 82 40 92</span></a>
    <button class="burger" type="button" data-menu-open aria-expanded="false" aria-controls="menu" aria-label="Abrir menú"><b></b><b></b><b></b></button>
  </div>
</header>
<header class="pill" id="pill" inert>
  <a class="pill__brand" href="<?= $R ?>" aria-label="Casa de los Britos, inicio"><img src="<?= $R ?>assets/logos/casa-logotipo-03-mantel.png" alt="Restaurante Casa de los Britos" width="800" height="464"></a>
  <nav class="pnav" aria-label="Principal"><span class="hl" aria-hidden="true"></span><a href="<?= $R ?>el-restaurante">El restaurante</a><a href="<?= $R ?>carta">La carta</a><a href="<?= $R ?>reservas">Reservas</a><a href="<?= $R ?>contacto">Contacto</a><a href="<?= $R ?>blog" aria-current="page">Blog</a></nav>
  <span class="pnav__sep" aria-hidden="true"></span><a class="pnav__brand" href="<?= $R ?>eventos"><img src="<?= $R ?>assets/logos/britos-icono-white.png" alt="" width="18" height="18">Eventos</a>
  <a class="btn pill__call" href="tel:+34635824092"><svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>Llamar <span class="num">635 82 40 92</span></a>
  <button class="burger" type="button" data-menu-open aria-expanded="false" aria-controls="menu" aria-label="Abrir menú"><b></b><b></b><b></b></button>
</header>
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menú" inert>
  <div class="menu__head">
    <a href="<?= $R ?>" aria-label="Casa de los Britos, inicio"><img src="<?= $R ?>assets/logos/casa-logotipo-03-mantel.png" alt="Restaurante Casa de los Britos" width="800" height="464"></a>
    <button class="burger" type="button" data-menu-close aria-expanded="true" aria-label="Cerrar menú"><b></b><b></b><b></b></button>
  </div>
  <div class="menu__body">
    <ul class="mlinks">
      <li style="--i:0"><a href="<?= $R ?>" data-prev="0"><small>Inicio</small><span>Casa de los Britos</span></a></li>
      <li style="--i:1"><a href="<?= $R ?>el-restaurante" data-prev="1"><small>El lugar</small><span>El restaurante</span></a></li>
      <li style="--i:2"><a href="<?= $R ?>carta" data-prev="2"><small>Cocina</small><span>La carta</span></a></li>
      <li style="--i:3"><a href="<?= $R ?>reservas" data-prev="3"><small>Mesa</small><span>Reservas</span></a></li>
      <li style="--i:4"><a href="<?= $R ?>contacto" data-prev="4"><small>Visita</small><span>Contacto</span></a></li>
      <li style="--i:5"><a href="<?= $R ?>blog" data-prev="5" aria-current="page"><small>Novedades</small><span>Blog</span></a></li>
      <li class="mlinks__out" style="--i:6"><a href="<?= $R ?>eventos"><img src="<?= $R ?>assets/logos/eventos-logotipo-01-white.png" alt="Britos Restauración & Eventos" width="800" height="220" loading="lazy"><svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a></li>
    </ul>
    <div class="mprev" aria-hidden="true"><img src="<?= $R ?>assets/img/4e3a8246-800.webp" alt="" loading="lazy" class="on"><img src="<?= $R ?>assets/img/dsc06935-800.webp" alt="" loading="lazy"><img src="<?= $R ?>assets/img/dsc07287-800.webp" alt="" loading="lazy"><img src="<?= $R ?>assets/img/4e3a8236-800.webp" alt="" loading="lazy"><img src="<?= $R ?>assets/img/dsc06948-800.webp" alt="" loading="lazy"><img src="<?= $R ?>assets/img/4e3a8597-800.webp" alt="" loading="lazy"></div>
  </div>
  <div class="menu__foot">
    <div><b>Dirección</b><a href="https://www.google.com/maps/search/?api=1&query=Casa+de+los+Britos%2C+C.+Mel%C3%A9ndez+Vald%C3%A9s+14%2C+Ribera+del+Fresno" target="_blank" rel="noopener">C. Meléndez Valdés, 14<br>Ribera del Fresno</a></div>
    <div><b>Hoy</b><span data-live>Abrimos de jueves a domingo</span></div>
    <div><b>Reservas</b><a class="num" href="tel:+34635824092">635 82 40 92</a></div>
    <div><b>Síguenos</b><a href="https://www.instagram.com/casadelosbritos/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.tiktok.com/@casadelosbritos" target="_blank" rel="noopener">TikTok</a></div>
  </div>
</div>
<main id="main">

<?php if (!$post): ?>
<section class="section" style="padding-top:calc(var(--head-space) + clamp(64px, 8vw, 120px))" aria-labelledby="nf-title">
  <div class="wrap">
    <h1 id="nf-title" class="post__title">No encontramos esta entrada</h1>
    <p class="lead mt-s">Puede que se haya despublicado o que el enlace no esté completo.</p>
    <a class="btn mt-m" href="<?= $R ?>blog">Ver todas las entradas <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
  </div>
</section>
<?php else: ?>
<article class="section post" style="padding-top:calc(var(--head-space) + clamp(48px, 6vw, 96px))" aria-labelledby="post-title">
  <div class="wrap post__wrap">
    <a class="link post__back" href="<?= $R ?>blog">← Todas las entradas</a>
    <p class="post-card__date mt-m"><?= fecha_es($post['date']) ?></p>
    <h1 id="post-title" class="post__title"><?= e($post['title']) ?></h1>
    <?php if (!empty($post['excerpt'])): ?><p class="lead mt-s"><?= e($post['excerpt']) ?></p><?php endif; ?>
  </div>
  <?php if (!empty($post['cover'])): ?>
  <div class="wrap"><figure class="ph post__cover"><img src="<?= e($post['cover']) ?>" alt="<?= e($post['alt'] ?? '') ?>" fetchpriority="high"></figure></div>
  <?php endif; ?>
  <div class="wrap post__wrap">
    <div class="post__body"><?= md($post['body']) ?></div>
    <div class="post__foot">
      <a class="btn" href="tel:+34635824092">Reservar · <span class="num">635 82 40 92</span></a>
      <a class="link" href="<?= $R ?>blog">Más entradas <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
</article>
<?php endif; ?>

</main>
<footer class="footer">
  <div class="wrap">
    <div class="footer__top">
      <div><img class="footer__logo" src="<?= $R ?>assets/logos/casa-logo-completo-laton.png" alt="Restaurante Casa de los Britos" width="800" height="800" loading="lazy"></div>
      <div>
        <h2>Visítanos</h2>
        <address>C. Meléndez Valdés, 14<br>06225 Ribera del Fresno<br>Badajoz</address>
        <p><a href="https://www.google.com/maps/search/?api=1&query=Casa+de+los+Britos%2C+C.+Mel%C3%A9ndez+Vald%C3%A9s+14%2C+Ribera+del+Fresno" target="_blank" rel="noopener">Cómo llegar</a></p>
      </div>
      <div>
        <h2>Reservas</h2>
        <p><a class="num" href="tel:+34635824092">635 82 40 92</a></p>
        <p>Grupos: <a class="num" href="tel:+34609751647">609 75 16 47</a></p>
      </div>
      <div>
        <h2>Horario</h2>
        <p>Jueves a domingo<br><span class="num">12:30 – 23:30</span><br>Lunes a miércoles cerrado</p>
      </div>
      <div>
        <h2>El restaurante</h2>
        <ul><li><a href="<?= $R ?>el-restaurante">El restaurante</a></li><li><a href="<?= $R ?>carta">La carta</a></li><li><a href="<?= $R ?>reservas">Reservas</a></li><li><a href="<?= $R ?>contacto">Contacto</a></li><li><a href="<?= $R ?>blog">Blog</a></li><li><a href="https://www.instagram.com/casadelosbritos/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.tiktok.com/@casadelosbritos" target="_blank" rel="noopener">TikTok</a></li></ul>
      </div>
    </div>
    <div class="footer__brands"><img src="<?= $R ?>assets/logos/eventos-nuestras-marcas-white.png" alt="Nuestras marcas: Café Hibernia, Restaurante Casa de los Britos, Ca·Nostra, Ribbo Restaurant y Bianco" width="1800" height="159" loading="lazy"></div>
    <div class="footer__legal"><p>© <span data-year>2026</span> Casa de los Britos · Parte de <a href="<?= $R ?>eventos">Britos Restauración &amp; Eventos</a></p><p class="footer__links"><a href="<?= $R ?>aviso-legal">Aviso legal</a> · <a href="<?= $R ?>privacidad">Privacidad</a> · <a href="<?= $R ?>cookies">Cookies</a></p></div>
  </div>
</footer>
<div class="callbar"><a class="btn btn--lg" href="tel:+34635824092"><svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>Reservar · <span class="num">635 82 40 92</span></a></div>
<p id="live" class="sr-only" aria-live="polite"></p>
</body>
</html>
