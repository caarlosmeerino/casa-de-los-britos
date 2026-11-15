<?php
// Solo para probar en local con el servidor de PHP (php -S). En el hosting
// real estas reglas las aplica el .htaccess (protecciones y direcciones limpias).
$root = realpath(__DIR__ . '/..');
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/');

// Carpetas y archivos privados
if (preg_match('~^/(data|_src|_propuesta|\.playwright-mcp|\.claude|\.taste-skill)(/|$)|^/api/_|^/uploads/.*\.(php|phtml|phar|html?|svg)$|/\.~i', $path)) {
  http_response_code(403); echo 'Prohibido'; return true;
}

// Direcciones antiguas → limpias (301)
if (preg_match('~^/(.*?)index\.html$~', $path, $m)) { header('Location: /' . $m[1], true, 301); return true; }
if (preg_match('~^/([a-z0-9-]+)\.html$~', $path, $m)) { header('Location: /' . $m[1], true, 301); return true; }
if ($path === '/blog.php') { header('Location: /blog', true, 301); return true; }

// Barra final → sin barra (las rutas relativas dependen de ello)
if ($path !== '/' && substr($path, -1) === '/' && !is_dir($root . $path)) { header('Location: ' . rtrim($path, '/'), true, 301); return true; }

// Portada
if ($path === '/') { readfile($root . '/index.html'); return true; }

// Blog
if ($path === '/blog') { $_SERVER['SCRIPT_NAME'] = '/blog.php'; chdir($root); require $root . '/blog.php'; return true; }
if (preg_match('~^/blog/([a-z0-9-]+)$~', $path, $m)) {
  $_GET['s'] = $m[1]; $_SERVER['SCRIPT_NAME'] = '/entrada.php'; chdir($root); require $root . '/entrada.php'; return true;
}

// Páginas sin extensión: /carta → carta.html
if (preg_match('~^/([a-z0-9-]+)$~', $path, $m) && is_file($root . '/' . $m[1] . '.html')) {
  header('Content-Type: text/html; charset=UTF-8'); readfile($root . '/' . $m[1] . '.html'); return true;
}

return false; // el servidor sirve el archivo tal cual (o ejecuta el .php)
