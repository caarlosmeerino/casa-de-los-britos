<?php
/* Panel de administración de Casa de los Britos: blog y ventana emergente. */
declare(strict_types=1);
require __DIR__ . '/../api/_lib.php';

start_session();
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');
header('Cache-Control: no-store');

$a = $_GET['a'] ?? 'blog';
$ip = $_SERVER['REMOTE_ADDR'] ?? 'local';

function flash(string $msg, string $type = 'ok'): void { $_SESSION['flash'] = [$msg, $type]; }
function go(string $to): never { header('Location: ' . $to); exit; }

/* ---------- Plantilla ---------- */
function layout(string $title, string $content, bool $nav = true): void {
  $flash = $_SESSION['flash'] ?? null; unset($_SESSION['flash']);
  $cur = $_GET['a'] ?? 'blog';
  ?><!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title><?= e($title) ?> · Panel · Casa de los Britos</title>
<link rel="icon" type="image/png" href="../assets/logos/britos-favicon.png">
<link rel="stylesheet" href="admin.css">
</head>
<body>
<header class="ad-top">
  <a class="ad-brand" href="./"><img src="../assets/logos/casa-logotipo-03.png" alt="Casa de los Britos" width="800" height="464"><span>Panel</span></a>
  <?php if ($nav): ?>
  <nav class="ad-nav" aria-label="Panel">
    <a href="./?a=blog"<?= in_array($cur, ['blog', 'edit'], true) ? ' aria-current="page"' : '' ?>>Blog</a>
    <a href="./?a=popup"<?= $cur === 'popup' ? ' aria-current="page"' : '' ?>>Ventana emergente</a>
    <a href="./?a=google"<?= $cur === 'google' ? ' aria-current="page"' : '' ?>>Reseñas de Google</a>
    <a href="../index.html" target="_blank" rel="noopener">Ver la web</a>
    <form method="post" action="./?a=logout"><?= csrf_field() ?><button type="submit">Salir</button></form>
  </nav>
  <?php endif; ?>
</header>
<main class="ad-main">
  <?php if ($flash): ?><p class="ad-flash ad-flash--<?= e($flash[1]) ?>" role="status"><?= e($flash[0]) ?></p><?php endif; ?>
  <?= $content ?>
</main>
</body>
</html><?php
  exit;
}

/* ---------- Instalación: crear la contraseña la primera vez ---------- */
$config = admin_config();
if (!$config) {
  $setupFile = DATA . '/setup.php';
  $setup = is_file($setupFile) ? include $setupFile : null;
  $error = '';
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $code = strtoupper(trim((string) ($_POST['code'] ?? '')));
    $p1 = (string) ($_POST['pass'] ?? ''); $p2 = (string) ($_POST['pass2'] ?? '');
    if (login_blocked($ip)) $error = 'Demasiados intentos. Espera 15 minutos.';
    elseif (!csrf_ok()) $error = 'La sesión ha caducado. Vuelve a intentarlo.';
    elseif (!is_array($setup) || !password_verify($code, (string) $setup['setup_hash'])) { login_failed($ip); $error = 'El código de instalación no es correcto.'; }
    elseif (mb_strlen($p1) < 10) $error = 'La contraseña debe tener al menos 10 caracteres.';
    elseif ($p1 !== $p2) $error = 'Las dos contraseñas no coinciden.';
    else {
      save_admin_config(['hash' => password_hash($p1, PASSWORD_DEFAULT), 'created' => date('c')]);
      @unlink($setupFile);
      session_regenerate_id(true);
      $_SESSION['admin'] = true; $_SESSION['ua'] = $_SERVER['HTTP_USER_AGENT'] ?? '';
      flash('Contraseña creada. Ya puedes usar el panel.');
      go('./');
    }
  }
  ob_start(); ?>
  <section class="ad-card ad-narrow">
    <h1>Primer acceso</h1>
    <p class="ad-muted">Escribe el código de instalación que tienes en el archivo <code>_src/ADMIN-LEEME.md</code> y elige tu contraseña.</p>
    <?php if (!is_array($setup)): ?><p class="ad-error">Falta el archivo de instalación. Vuelve a subir la carpeta <code>data</code>.</p><?php endif; ?>
    <?php if ($error): ?><p class="ad-error" role="alert"><?= e($error) ?></p><?php endif; ?>
    <form method="post" class="ad-form">
      <?= csrf_field() ?>
      <label>Código de instalación<input name="code" required autocomplete="off" autocapitalize="characters"></label>
      <label>Nueva contraseña <small>(mínimo 10 caracteres)</small><input type="password" name="pass" required minlength="10" autocomplete="new-password"></label>
      <label>Repite la contraseña<input type="password" name="pass2" required minlength="10" autocomplete="new-password"></label>
      <button class="ad-btn" type="submit">Crear contraseña</button>
    </form>
  </section>
  <?php layout('Primer acceso', (string) ob_get_clean(), false);
}

/* ---------- Acceso ---------- */
if ($a === 'logout' && $_SERVER['REQUEST_METHOD'] === 'POST' && csrf_ok()) {
  $_SESSION = []; session_destroy();
  go('./');
}
if (!is_logged()) {
  $error = '';
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (login_blocked($ip)) $error = 'Demasiados intentos. Espera 15 minutos y vuelve a probar.';
    elseif (!csrf_ok()) $error = 'La sesión ha caducado. Vuelve a intentarlo.';
    elseif (!password_verify((string) ($_POST['pass'] ?? ''), (string) $config['hash'])) { login_failed($ip); usleep(400000); $error = 'Contraseña incorrecta.'; }
    else {
      session_regenerate_id(true);
      $_SESSION['admin'] = true; $_SESSION['ua'] = $_SERVER['HTTP_USER_AGENT'] ?? '';
      go('./');
    }
  }
  ob_start(); ?>
  <section class="ad-card ad-narrow">
    <h1>Entrar al panel</h1>
    <?php if ($error): ?><p class="ad-error" role="alert"><?= e($error) ?></p><?php endif; ?>
    <form method="post" class="ad-form">
      <?= csrf_field() ?>
      <label>Contraseña<input type="password" name="pass" required autocomplete="current-password" autofocus></label>
      <button class="ad-btn" type="submit">Entrar</button>
    </form>
  </section>
  <?php layout('Entrar', (string) ob_get_clean(), false);
}

/* ---------- Acciones (POST) ---------- */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!csrf_ok()) { flash('La sesión ha caducado. Vuelve a intentarlo.', 'error'); go('./'); }

  if ($a === 'save') {
    $posts = read_json('posts', []);
    $id = (string) ($_POST['id'] ?? '');
    $title = trim((string) ($_POST['title'] ?? ''));
    if ($title === '') { flash('Escribe un título para la entrada.', 'error'); go('./?a=edit' . ($id ? '&id=' . urlencode($id) : '')); }
    $up = handle_upload('cover');
    if (!$up['ok']) { flash($up['error'], 'error'); go('./?a=edit' . ($id ? '&id=' . urlencode($id) : '')); }
    $idx = null;
    foreach ($posts as $i => $p) if ($p['id'] === $id) $idx = $i;
    $post = $idx !== null ? $posts[$idx] : ['id' => bin2hex(random_bytes(6)), 'cover' => '', 'created' => date('c')];
    if ($idx === null) {
      $slug = slugify($title); $base = $slug; $n = 2;
      $slugs = array_column($posts, 'slug');
      while (in_array($slug, $slugs, true)) $slug = $base . '-' . $n++;
      $post['slug'] = $slug;
    }
    $date = (string) ($_POST['date'] ?? '');
    $post['title'] = mb_substr($title, 0, 160);
    $post['date'] = preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) ? $date : date('Y-m-d');
    $post['excerpt'] = mb_substr(trim((string) ($_POST['excerpt'] ?? '')), 0, 320);
    $post['body'] = (string) ($_POST['body'] ?? '');
    $post['alt'] = mb_substr(trim((string) ($_POST['alt'] ?? '')), 0, 200);
    $post['published'] = !empty($_POST['published']);
    if (!empty($_POST['remove_cover'])) { delete_upload($post['cover']); $post['cover'] = ''; }
    if ($up['path']) { delete_upload($post['cover']); $post['cover'] = $up['path']; }
    $post['updated'] = date('c');
    if ($idx === null) $posts[] = $post; else $posts[$idx] = $post;
    write_json('posts', $posts);
    flash($post['published'] ? 'Entrada guardada y publicada.' : 'Entrada guardada como borrador.');
    go('./?a=edit&id=' . urlencode($post['id']));
  }

  if ($a === 'delete') {
    $id = (string) ($_POST['id'] ?? '');
    $posts = read_json('posts', []);
    foreach ($posts as $i => $p) if ($p['id'] === $id) { delete_upload($p['cover'] ?? ''); unset($posts[$i]); }
    write_json('posts', array_values($posts));
    flash('Entrada borrada.');
    go('./?a=blog');
  }

  if ($a === 'popup') {
    $c = popup_config();
    $up = handle_upload('image');
    if (!$up['ok']) { flash($up['error'], 'error'); go('./?a=popup'); }
    if ($up['path']) { delete_upload($c['image']); $c['image'] = $up['path']; }
    if (!empty($_POST['remove_image'])) { delete_upload($c['image']); $c['image'] = ''; }
    $link = trim((string) ($_POST['link'] ?? ''));
    if ($link !== '' && !preg_match('~^(https?://|/|tel:|mailto:|[a-z0-9-]+\.(html|php))~i', $link)) { flash('El enlace debe empezar por https://', 'error'); go('./?a=popup'); }
    $c['active'] = !empty($_POST['active']);
    $c['alt'] = mb_substr(trim((string) ($_POST['alt'] ?? '')), 0, 200);
    $c['title'] = mb_substr(trim((string) ($_POST['title'] ?? '')), 0, 80);
    $c['text'] = mb_substr(trim((string) ($_POST['text'] ?? '')), 0, 260);
    $c['layout'] = ($_POST['layout'] ?? 'left') === 'right' ? 'right' : 'left';
    $c['link'] = $link;
    $c['linkText'] = mb_substr(trim((string) ($_POST['linkText'] ?? '')), 0, 60);
    $c['where'] = in_array($_POST['where'] ?? 'all', ['all', 'casa', 'britos'], true) ? $_POST['where'] : 'all';
    $c['from'] = preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) ($_POST['from'] ?? '')) ? $_POST['from'] : '';
    $c['to'] = preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) ($_POST['to'] ?? '')) ? $_POST['to'] : '';
    $c['version'] = (int) ($c['version'] ?? 1) + 1; // cada cambio vuelve a mostrarse a quien ya la cerró
    if ($c['active'] && !$c['image']) { $c['active'] = false; flash('Sube una imagen para poder activar la ventana.', 'error'); write_json('popup', $c); go('./?a=popup'); }
    write_json('popup', $c);
    flash($c['active'] ? 'Ventana emergente activada.' : 'Ventana emergente guardada y desactivada.');
    go('./?a=popup');
  }

  if ($a === 'google') {
    $g = google_config();
    $key = trim((string) ($_POST['key'] ?? ''));
    $place = trim((string) ($_POST['place'] ?? ''));
    if ($key !== '') $g['key'] = $key;               // vacío = se mantiene la clave guardada
    if (!empty($_POST['forget_key'])) $g['key'] = '';
    $g['place'] = $place;
    $g['active'] = !empty($_POST['active']);
    @unlink(DATA . '/resenas-cache.json');           // al cambiar ajustes, se vuelve a pedir a Google
    $msg = 'Ajustes guardados.';
    if ($g['active']) {
      $t = google_fetch_place($g['key'], $g['place']);
      if (!$t['ok']) { $g['active'] = false; save_google_config($g); flash('No se ha activado: ' . $t['error'], 'error'); go('./?a=google'); }
      write_json('resenas-cache', ['at' => time(), 'place' => $g['place'], 'data' => $t['data']]);
      $msg = 'Reseñas activadas: ' . number_format((float) $t['data']['rating'], 1, ',', '') . ' de media con ' . $t['data']['count'] . ' opiniones.';
    }
    save_google_config($g);
    flash($msg);
    go('./?a=google');
  }

  if ($a === 'google-test') {
    $g = google_config();
    $t = google_fetch_place($g['key'], $g['place']);
    if ($t['ok']) flash('Conexión correcta con «' . $t['data']['name'] . '»: ' . number_format((float) $t['data']['rating'], 1, ',', '') . ' de media, ' . $t['data']['count'] . ' opiniones, ' . count($t['data']['reviews']) . ' reseñas recibidas.');
    else flash('La prueba ha fallado: ' . $t['error'], 'error');
    go('./?a=google');
  }
  go('./');
}

/* ---------- Vistas ---------- */
if ($a === 'google') {
  $g = google_config();
  $hasKey = $g['key'] !== '';
  ob_start(); ?>
  <h1>Reseñas de Google</h1>
  <p class="ad-muted">Muestra en la portada la nota media, el número de opiniones y las últimas reseñas de vuestra ficha de Google. Se actualizan solas cada 6 horas.</p>
  <p class="ad-state ad-state--<?= $g['active'] ? 'on' : 'off' ?>"><?= $g['active'] ? 'Se están mostrando en la portada' : 'Desactivadas' ?></p>
  <form method="post" action="./?a=google" class="ad-form ad-card">
    <?= csrf_field() ?>
    <label class="ad-switch"><input type="checkbox" name="active" value="1"<?= $g['active'] ? ' checked' : '' ?>><span>Mostrar las reseñas en la portada</span></label>
    <label>Clave de API de Google <small><?= $hasKey ? '(hay una clave guardada que termina en «' . e(substr($g['key'], -4)) . '»; déjalo vacío para mantenerla)' : '(empieza por «AIza…»)' ?></small><input type="password" name="key" autocomplete="off" spellcheck="false" placeholder="<?= $hasKey ? '••••••••••••' : 'AIza…' ?>"></label>
    <?php if ($hasKey): ?><label class="ad-check"><input type="checkbox" name="forget_key" value="1"> Borrar la clave guardada</label><?php endif; ?>
    <label>ID del sitio (Place ID) <small>(empieza por «ChIJ…»)</small><input name="place" spellcheck="false" placeholder="ChIJ…" value="<?= e($g['place']) ?>"></label>
    <div class="ad-actions"><button class="ad-btn" type="submit">Guardar</button></div>
  </form>
  <?php if ($hasKey && $g['place']): ?>
  <form method="post" action="./?a=google-test" class="ad-actions" style="margin-top:16px"><?= csrf_field() ?><button class="ad-btn ad-btn--ghost" type="submit">Probar conexión</button></form>
  <?php endif; ?>
  <details class="ad-help" style="margin-top:24px"><summary>Cómo conseguir la clave y el ID del sitio</summary>
    <ul>
      <li>Entra en <a href="https://console.cloud.google.com/" target="_blank" rel="noopener">Google Cloud Console</a> con la cuenta de Google del restaurante y crea un proyecto.</li>
      <li>En «APIs y servicios», activa <strong>Places API (New)</strong> y añade una cuenta de facturación (Google da un uso gratuito mensual; con 4 consultas al día no deberías pagar nada).</li>
      <li>En «Credenciales», crea una <strong>clave de API</strong> y restríngela a «Places API (New)».</li>
      <li>Busca vuestro ID en el <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener">buscador de Place ID de Google</a> escribiendo «Casa de los Britos, Ribera del Fresno».</li>
      <li>Pega aquí los dos datos, marca «Mostrar las reseñas» y guarda.</li>
    </ul>
  </details>
  <?php layout('Reseñas de Google', (string) ob_get_clean());
}
if ($a === 'edit') {
  $id = (string) ($_GET['id'] ?? '');
  $p = ['id' => '', 'title' => '', 'date' => date('Y-m-d'), 'excerpt' => '', 'body' => '', 'cover' => '', 'alt' => '', 'published' => false, 'slug' => ''];
  foreach (read_json('posts', []) as $x) if ($x['id'] === $id) $p = array_merge($p, $x);
  ob_start(); ?>
  <p><a class="ad-back" href="./?a=blog">← Volver al blog</a></p>
  <h1><?= $p['id'] ? 'Editar entrada' : 'Nueva entrada' ?></h1>
  <?php if ($p['id'] && $p['published']): ?><p class="ad-muted">Publicada en <a href="../entrada.php?s=<?= e($p['slug']) ?>" target="_blank" rel="noopener">entrada.php?s=<?= e($p['slug']) ?></a></p><?php endif; ?>
  <form method="post" action="./?a=save" enctype="multipart/form-data" class="ad-form ad-card">
    <?= csrf_field() ?>
    <input type="hidden" name="id" value="<?= e($p['id']) ?>">
    <label>Título<input name="title" required maxlength="160" value="<?= e($p['title']) ?>"></label>
    <div class="ad-row">
      <label>Fecha<input type="date" name="date" value="<?= e($p['date']) ?>"></label>
      <label class="ad-switch"><input type="checkbox" name="published" value="1"<?= $p['published'] ? ' checked' : '' ?>><span>Publicada</span></label>
    </div>
    <label>Resumen <small>(aparece en el listado del blog, máx. 320 caracteres)</small><textarea name="excerpt" rows="3" maxlength="320"><?= e($p['excerpt']) ?></textarea></label>
    <fieldset class="ad-image">
      <legend>Foto de portada</legend>
      <?php if ($p['cover']): ?><img src="../<?= e($p['cover']) ?>" alt=""><label class="ad-check"><input type="checkbox" name="remove_cover" value="1"> Quitar esta foto</label><?php endif; ?>
      <label>Subir foto <small>(JPG, PNG o WebP, máx. 8 MB, mejor en horizontal)</small><input type="file" name="cover" accept="image/jpeg,image/png,image/webp"></label>
      <label>Descripción de la foto <small>(para Google y lectores de pantalla)</small><input name="alt" maxlength="200" value="<?= e($p['alt']) ?>"></label>
    </fieldset>
    <label>Texto de la entrada<textarea name="body" rows="16"><?= e($p['body']) ?></textarea></label>
    <details class="ad-help"><summary>Cómo dar formato al texto</summary>
      <ul>
        <li>Deja una línea en blanco para empezar un párrafo nuevo.</li>
        <li><code>## Título</code> para un apartado y <code>### Subtítulo</code> para uno menor.</li>
        <li><code>- elemento</code> al principio de cada línea para una lista.</li>
        <li><code>**negrita**</code>, <code>*cursiva*</code> y <code>[texto del enlace](https://…)</code>.</li>
      </ul>
    </details>
    <div class="ad-actions"><button class="ad-btn" type="submit">Guardar</button><?php if ($p['id'] && $p['published']): ?><a class="ad-btn ad-btn--ghost" href="../entrada.php?s=<?= e($p['slug']) ?>" target="_blank" rel="noopener">Ver en la web</a><?php endif; ?></div>
  </form>
  <?php layout($p['id'] ? 'Editar entrada' : 'Nueva entrada', (string) ob_get_clean());
}

if ($a === 'popup') {
  $c = popup_config();
  $live = popup_is_live($c);
  ob_start(); ?>
  <h1>Ventana emergente</h1>
  <p class="ad-muted">Una ventana con foto, título, texto y botón que aparece al entrar en la web, una vez por visita. Útil para jornadas, menús especiales o avisos. Si subes solo una imagen (un cartel ya diseñado), se muestra el cartel solo.</p>
  <p class="ad-state ad-state--<?= $live ? 'on' : 'off' ?>"><?= $live ? 'Se está mostrando ahora en la web' : ($c['active'] ? 'Activada, pero fuera de las fechas elegidas' : 'Desactivada') ?></p>
  <form method="post" action="./?a=popup" enctype="multipart/form-data" class="ad-form ad-card">
    <?= csrf_field() ?>
    <label class="ad-switch"><input type="checkbox" name="active" value="1"<?= $c['active'] ? ' checked' : '' ?>><span>Mostrar la ventana al entrar en la web</span></label>
    <fieldset class="ad-image">
      <legend>Imagen</legend>
      <?php if ($c['image']): ?><img src="../<?= e($c['image']) ?>" alt=""><label class="ad-check"><input type="checkbox" name="remove_image" value="1"> Quitar esta imagen</label><?php endif; ?>
      <label>Subir imagen <small>(JPG, PNG o WebP, máx. 8 MB; una foto vertical queda mejor)</small><input type="file" name="image" accept="image/jpeg,image/png,image/webp"></label>
      <label>Descripción de la imagen <small>(para quien no puede verla)</small><input name="alt" maxlength="200" value="<?= e($c['alt']) ?>"></label>
    </fieldset>
    <label>Título <small>(opcional, máx. 80 caracteres; si lo dejas vacío junto al texto, se muestra solo la imagen)</small><input name="title" maxlength="80" placeholder="Por ejemplo: Jornadas del cordero" value="<?= e($c['title']) ?>"></label>
    <label>Texto <small>(opcional, máx. 260 caracteres)</small><textarea name="text" rows="3" maxlength="260" placeholder="Por ejemplo: Del 15 al 30 de noviembre, chuletillas a la brasa fuera de carta."><?= e($c['text']) ?></textarea></label>
    <label>Posición de la imagen<select name="layout"><option value="left"<?= $c['layout'] !== 'right' ? ' selected' : '' ?>>Foto a la izquierda, texto a la derecha</option><option value="right"<?= $c['layout'] === 'right' ? ' selected' : '' ?>>Texto a la izquierda, foto a la derecha</option></select></label>
    <div class="ad-row">
      <label>Enlace del botón <small>(opcional)</small><input name="link" placeholder="https://… o carta.html" value="<?= e($c['link']) ?>"></label>
      <label>Texto del botón <small>(opcional)</small><input name="linkText" maxlength="60" placeholder="Por ejemplo: Ver el menú" value="<?= e($c['linkText']) ?>"></label>
    </div>
    <div class="ad-row">
      <label>Dónde se muestra<select name="where">
        <option value="all"<?= $c['where'] === 'all' ? ' selected' : '' ?>>En toda la web</option>
        <option value="casa"<?= $c['where'] === 'casa' ? ' selected' : '' ?>>Solo en las páginas del restaurante</option>
        <option value="britos"<?= $c['where'] === 'britos' ? ' selected' : '' ?>>Solo en Britos Eventos</option>
      </select></label>
      <label>Desde <small>(opcional)</small><input type="date" name="from" value="<?= e($c['from']) ?>"></label>
      <label>Hasta <small>(opcional)</small><input type="date" name="to" value="<?= e($c['to']) ?>"></label>
    </div>
    <div class="ad-actions"><button class="ad-btn" type="submit">Guardar</button></div>
  </form>
  <?php layout('Ventana emergente', (string) ob_get_clean());
}

/* Listado del blog */
$posts = all_posts();
ob_start(); ?>
<div class="ad-head"><h1>Blog</h1><a class="ad-btn" href="./?a=edit">Nueva entrada</a></div>
<?php if (!$posts): ?>
  <section class="ad-card ad-empty"><p>Todavía no hay entradas.</p><a class="ad-btn" href="./?a=edit">Escribir la primera</a></section>
<?php else: ?>
  <ul class="ad-list">
  <?php foreach ($posts as $p): ?>
    <li class="ad-card ad-item">
      <?php if (!empty($p['cover'])): ?><img src="../<?= e($p['cover']) ?>" alt=""><?php else: ?><span class="ad-noimg" aria-hidden="true"></span><?php endif; ?>
      <div>
        <h2><a href="./?a=edit&amp;id=<?= e($p['id']) ?>"><?= e($p['title']) ?></a></h2>
        <p class="ad-muted"><?= fecha_es($p['date']) ?> · <span class="ad-tag ad-tag--<?= !empty($p['published']) ? 'on' : 'off' ?>"><?= !empty($p['published']) ? ($p['date'] > date('Y-m-d') ? 'Programada' : 'Publicada') : 'Borrador' ?></span></p>
      </div>
      <div class="ad-item__actions">
        <a class="ad-btn ad-btn--ghost" href="./?a=edit&amp;id=<?= e($p['id']) ?>">Editar</a>
        <form method="post" action="./?a=delete" onsubmit="return confirm('¿Borrar esta entrada? No se puede deshacer.');"><?= csrf_field() ?><input type="hidden" name="id" value="<?= e($p['id']) ?>"><button class="ad-btn ad-btn--danger" type="submit">Borrar</button></form>
      </div>
    </li>
  <?php endforeach; ?>
  </ul>
<?php endif; ?>
<?php layout('Blog', (string) ob_get_clean());
