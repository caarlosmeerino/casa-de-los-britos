<?php
/* Núcleo compartido del blog, la ventana emergente y el panel de administración.
   Los datos se guardan en JSON dentro de /data (protegida con .htaccess) y las
   imágenes en /uploads (donde no se puede ejecutar PHP). Sin base de datos. */
declare(strict_types=1);

const ROOT = __DIR__ . '/..';
const DATA = ROOT . '/data';
const UPLOADS = ROOT . '/uploads';
const MAX_UPLOAD = 8 * 1024 * 1024; // 8 MB
const IMAGE_TYPES = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];

function e($s): string { return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

/* ---------- JSON con escritura atómica ---------- */
function read_json(string $name, array $default = []): array {
  $f = DATA . "/$name.json";
  if (!is_file($f)) return $default;
  $d = json_decode((string) file_get_contents($f), true);
  return is_array($d) ? $d : $default;
}
function write_json(string $name, array $data): void {
  if (!is_dir(DATA)) mkdir(DATA, 0755, true);
  $tmp = DATA . "/$name." . bin2hex(random_bytes(4)) . '.tmp';
  file_put_contents($tmp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
  rename($tmp, DATA . "/$name.json");
}

/* ---------- Texto ---------- */
function slugify(string $t): string {
  $t = mb_strtolower(trim($t), 'UTF-8');
  $t = strtr($t, ['á' => 'a', 'é' => 'e', 'í' => 'i', 'ó' => 'o', 'ú' => 'u', 'ü' => 'u', 'ñ' => 'n', 'ç' => 'c', 'à' => 'a', 'è' => 'e', 'ò' => 'o']);
  $t = preg_replace('/[^a-z0-9]+/', '-', $t) ?? '';
  $t = trim($t, '-');
  return $t !== '' ? substr($t, 0, 80) : 'entrada';
}

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
function fecha_es(string $ymd): string {
  $d = DateTime::createFromFormat('Y-m-d', $ymd);
  return $d ? $d->format('j') . ' de ' . MESES[(int) $d->format('n') - 1] . ' de ' . $d->format('Y') : e($ymd);
}

/* Formato sencillo para las entradas:
   ## Título · ### Subtítulo · - lista · **negrita** · *cursiva* · [texto](https://enlace) · línea en blanco = párrafo nuevo */
function inline_md(string $s): string {
  $s = e($s);
  $s = preg_replace('/\*\*(.+?)\*\*/u', '<strong>$1</strong>', $s) ?? $s;
  $s = preg_replace('/(?<![*\w])\*(?!\s)(.+?)(?<!\s)\*(?!\*)/u', '<em>$1</em>', $s) ?? $s;
  $s = preg_replace_callback('/\[([^\]]+)\]\(([^)\s]+)\)/u', function ($m) {
    $url = html_entity_decode($m[2], ENT_QUOTES, 'UTF-8');
    if (!preg_match('~^(https?://|mailto:|tel:|/|[a-z0-9-]+\.(html|php)(\?|#|$)|#)~i', $url)) return $m[1];
    $ext = preg_match('~^https?://~i', $url) ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' . e($url) . '"' . $ext . '>' . $m[1] . '</a>';
  }, $s) ?? $s;
  return $s;
}
function md(string $text): string {
  $blocks = preg_split("/\R{2,}/u", trim(str_replace("\r", '', $text))) ?: [];
  $out = '';
  foreach ($blocks as $b) {
    $lines = explode("\n", $b);
    if (preg_match('/^###\s+(.+)/u', $lines[0], $m) && count($lines) === 1) { $out .= '<h3>' . inline_md($m[1]) . '</h3>'; continue; }
    if (preg_match('/^##\s+(.+)/u', $lines[0], $m) && count($lines) === 1) { $out .= '<h2>' . inline_md($m[1]) . '</h2>'; continue; }
    if (count(array_filter($lines, fn($l) => preg_match('/^\s*[-*]\s+/u', $l))) === count($lines)) {
      $out .= '<ul>' . implode('', array_map(fn($l) => '<li>' . inline_md(preg_replace('/^\s*[-*]\s+/u', '', $l) ?? $l) . '</li>', $lines)) . '</ul>';
      continue;
    }
    $out .= '<p>' . implode('<br>', array_map('inline_md', $lines)) . '</p>';
  }
  return $out;
}

/* ---------- Blog ---------- */
function all_posts(): array {
  $p = read_json('posts', []);
  usort($p, fn($a, $b) => strcmp($b['date'] ?? '', $a['date'] ?? ''));
  return $p;
}
function published_posts(): array {
  $today = date('Y-m-d');
  return array_values(array_filter(all_posts(), fn($p) => !empty($p['published']) && ($p['date'] ?? '') <= $today));
}
function find_post(string $slug): ?array {
  foreach (all_posts() as $p) if (($p['slug'] ?? '') === $slug) return $p;
  return null;
}

/* ---------- Ventana emergente ---------- */
function popup_config(): array {
  return array_merge(['active' => false, 'image' => '', 'alt' => '', 'title' => '', 'text' => '', 'layout' => 'left', 'link' => '', 'linkText' => '', 'where' => 'all', 'from' => '', 'to' => '', 'version' => 1], read_json('popup', []));
}
function popup_is_live(array $c): bool {
  if (empty($c['active']) || empty($c['image'])) return false;
  $today = date('Y-m-d');
  if (!empty($c['from']) && $today < $c['from']) return false;
  if (!empty($c['to']) && $today > $c['to']) return false;
  return true;
}

/* ---------- Sesión, CSRF y acceso ---------- */
function start_session(): void {
  if (session_status() === PHP_SESSION_ACTIVE) return;
  session_name('britos_admin');
  session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'httponly' => true, 'samesite' => 'Strict', 'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off']);
  session_start();
}
function csrf_token(): string {
  if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
  return $_SESSION['csrf'];
}
function csrf_field(): string { return '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">'; }
function csrf_ok(): bool { return isset($_POST['csrf'], $_SESSION['csrf']) && hash_equals($_SESSION['csrf'], (string) $_POST['csrf']); }

function admin_config(): ?array {
  $f = DATA . '/config.php';
  if (!is_file($f)) return null;
  $c = include $f;
  return is_array($c) ? $c : null;
}
function save_admin_config(array $c): void {
  if (!is_dir(DATA)) mkdir(DATA, 0755, true);
  file_put_contents(DATA . '/config.php', "<?php\n// Generado por el panel. No editar a mano.\nreturn " . var_export($c, true) . ";\n", LOCK_EX);
}
function is_logged(): bool { return !empty($_SESSION['admin']) && ($_SESSION['ua'] ?? '') === ($_SERVER['HTTP_USER_AGENT'] ?? ''); }

/* Límite de intentos: 5 fallos en 15 minutos por IP */
function login_blocked(string $ip): bool {
  $a = read_json('login-attempts', []);
  $now = time();
  $list = array_values(array_filter($a[$ip] ?? [], fn($t) => $t > $now - 900));
  return count($list) >= 5;
}
function login_failed(string $ip): void {
  $a = read_json('login-attempts', []);
  $now = time();
  foreach ($a as $k => $v) { $a[$k] = array_values(array_filter($v, fn($t) => $t > $now - 900)); if (!$a[$k]) unset($a[$k]); }
  $a[$ip][] = $now;
  write_json('login-attempts', $a);
}

/* ---------- Subida de imágenes ---------- */
function handle_upload(string $field): array {
  if (empty($_FILES[$field]) || ($_FILES[$field]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) return ['ok' => true, 'path' => null];
  $f = $_FILES[$field];
  if ($f['error'] === UPLOAD_ERR_INI_SIZE || $f['error'] === UPLOAD_ERR_FORM_SIZE) return ['ok' => false, 'error' => 'La imagen pesa demasiado. Súbela de menos de 8 MB.'];
  if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'])) return ['ok' => false, 'error' => 'No se ha podido subir la imagen. Inténtalo de nuevo.'];
  if ($f['size'] > MAX_UPLOAD) return ['ok' => false, 'error' => 'La imagen pesa demasiado. Súbela de menos de 8 MB.'];
  $mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']) ?: '';
  if (!isset(IMAGE_TYPES[$mime]) || !@getimagesize($f['tmp_name'])) return ['ok' => false, 'error' => 'El archivo no es una imagen válida. Usa JPG, PNG o WebP.'];
  if (!is_dir(UPLOADS)) mkdir(UPLOADS, 0755, true);
  $name = date('Ymd') . '-' . bin2hex(random_bytes(6)) . '.' . IMAGE_TYPES[$mime];
  if (!move_uploaded_file($f['tmp_name'], UPLOADS . '/' . $name)) return ['ok' => false, 'error' => 'No se ha podido guardar la imagen en el servidor.'];
  return ['ok' => true, 'path' => 'uploads/' . $name];
}
function delete_upload(?string $path): void {
  if (!$path || !preg_match('~^uploads/[A-Za-z0-9._-]+$~', $path)) return;
  $f = ROOT . '/' . $path;
  if (is_file($f)) @unlink($f);
}

/* ---------- Reseñas de Google (Places API New) ----------
   La clave y el ID del sitio se guardan en data/google.php (archivo PHP: no se
   puede leer desde el navegador). Las reseñas se piden desde el servidor, así
   que el visitante no se conecta con Google. */
const REVIEWS_TTL = 6 * 3600; // se renuevan cada 6 horas

function google_config(): array {
  $f = DATA . '/google.php';
  $c = is_file($f) ? include $f : [];
  return array_merge(['active' => false, 'key' => '', 'place' => ''], is_array($c) ? $c : []);
}
function save_google_config(array $c): void {
  if (!is_dir(DATA)) mkdir(DATA, 0755, true);
  file_put_contents(DATA . '/google.php', "<?php\n// Generado por el panel. No editar a mano.\nreturn " . var_export($c, true) . ";\n", LOCK_EX);
}

/* Pide la ficha a Google. Devuelve ['ok'=>bool, 'data'=>array|null, 'error'=>string] */
function google_fetch_place(string $key, string $place): array {
  if ($key === '' || $place === '') return ['ok' => false, 'data' => null, 'error' => 'Falta la clave o el ID del sitio.'];
  if (!preg_match('/^[A-Za-z0-9_-]{10,200}$/', $place)) return ['ok' => false, 'data' => null, 'error' => 'El ID del sitio no tiene un formato válido.'];
  $url = 'https://places.googleapis.com/v1/places/' . rawurlencode($place) . '?languageCode=es&regionCode=ES';
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 8, CURLOPT_CONNECTTIMEOUT => 4,
    CURLOPT_HTTPHEADER => ['X-Goog-Api-Key: ' . $key, 'X-Goog-FieldMask: displayName,rating,userRatingCount,googleMapsUri,reviews'],
  ]);
  // En Windows (pruebas en local) PHP no trae certificados: usamos los del sistema.
  // La verificación SSL sigue activa; en el hosting (Linux) esto no se aplica.
  if (PHP_OS_FAMILY === 'Windows' && defined('CURLSSLOPT_NATIVE_CA') && !ini_get('curl.cainfo')) {
    curl_setopt($ch, CURLOPT_SSL_OPTIONS, CURLSSLOPT_NATIVE_CA);
  }
  $body = curl_exec($ch);
  $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err = curl_error($ch);
  curl_close($ch);
  if ($body === false) return ['ok' => false, 'data' => null, 'error' => 'No se ha podido conectar con Google: ' . $err];
  $j = json_decode((string) $body, true);
  if ($code !== 200 || !is_array($j)) {
    $msg = is_array($j) && isset($j['error']['message']) ? (string) $j['error']['message'] : 'Respuesta inesperada de Google (código ' . $code . ').';
    $es = [
      'API key not valid' => 'La clave de API no es válida. Cópiala de nuevo desde Google Cloud.',
      'API_KEY_INVALID' => 'La clave de API no es válida. Cópiala de nuevo desde Google Cloud.',
      'has not been used in project' => 'Activa «Places API (New)» en tu proyecto de Google Cloud y vuelve a probar en unos minutos.',
      'is disabled' => 'Activa «Places API (New)» en tu proyecto de Google Cloud y vuelve a probar en unos minutos.',
      'billing' => 'Falta activar la facturación en tu proyecto de Google Cloud.',
      'are blocked' => 'La clave tiene restricciones que impiden usar «Places API (New)». Revísalas en Google Cloud.',
      'Not Found' => 'No existe ningún sitio con ese ID. Revisa el Place ID.',
      'not a valid Place ID' => 'No existe ningún sitio con ese ID. Revisa el Place ID.',
    ];
    foreach ($es as $needle => $txt) if (stripos($msg, $needle) !== false) { $msg = $txt; break; }
    return ['ok' => false, 'data' => null, 'error' => $msg];
  }
  $reviews = [];
  foreach (array_slice($j['reviews'] ?? [], 0, 5) as $r) {
    $text = $r['text']['text'] ?? ($r['originalText']['text'] ?? '');
    if (trim($text) === '') continue;
    $reviews[] = [
      'author' => (string) ($r['authorAttribution']['displayName'] ?? 'Cliente de Google'),
      'authorUri' => (string) ($r['authorAttribution']['uri'] ?? ''),
      'rating' => (int) ($r['rating'] ?? 0),
      'when' => (string) ($r['relativePublishTimeDescription'] ?? ''),
      'text' => mb_substr((string) $text, 0, 700),
    ];
  }
  return ['ok' => true, 'error' => '', 'data' => [
    'name' => (string) ($j['displayName']['text'] ?? ''),
    'rating' => isset($j['rating']) ? round((float) $j['rating'], 1) : null,
    'count' => (int) ($j['userRatingCount'] ?? 0),
    'url' => (string) ($j['googleMapsUri'] ?? ''),
    'reviews' => $reviews,
  ]];
}

/* Reseñas para la web, con caché. Si Google falla, se sirve la última copia buena. */
function google_reviews(): ?array {
  $c = google_config();
  if (empty($c['active']) || $c['key'] === '' || $c['place'] === '') return null;
  $cache = read_json('resenas-cache', []);
  $fresh = isset($cache['at'], $cache['place']) && $cache['place'] === $c['place'] && time() - (int) $cache['at'] < REVIEWS_TTL;
  if ($fresh) return $cache['data'] ?? null;
  $r = google_fetch_place($c['key'], $c['place']);
  if ($r['ok']) { write_json('resenas-cache', ['at' => time(), 'place' => $c['place'], 'data' => $r['data']]); return $r['data']; }
  return ($cache['place'] ?? '') === $c['place'] ? ($cache['data'] ?? null) : null;
}
