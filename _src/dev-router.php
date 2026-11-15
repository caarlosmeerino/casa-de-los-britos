<?php
// Solo para probar en local con el servidor de PHP (php -S). En el hosting
// real estas protecciones las aplica el .htaccess de cada carpeta.
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/');
if (preg_match('~^/(data|_src|_propuesta|\.playwright-mcp|\.claude)(/|$)|^/api/_|^/uploads/.*\.(php|phtml|phar|html?|svg)$|/\.~i', $path)) {
  http_response_code(403);
  echo 'Prohibido';
  return true;
}
if ($path === '/' || $path === '') { require __DIR__ . '/../index.html'; return true; }
return false; // el servidor sirve el archivo tal cual (o ejecuta el .php)
