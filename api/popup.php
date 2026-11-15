<?php
/* Devuelve la ventana emergente activa (si la hay) para que la web la muestre. */
declare(strict_types=1);
require __DIR__ . '/_lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$c = popup_config();
if (!popup_is_live($c)) { echo json_encode(['active' => false]); exit; }

echo json_encode([
  'active' => true,
  'id' => (string) ($c['version'] ?? 1),
  'image' => $c['image'],
  'alt' => (string) ($c['alt'] ?? ''),
  'title' => (string) ($c['title'] ?? ''),
  'text' => (string) ($c['text'] ?? ''),
  'layout' => ($c['layout'] ?? 'left') === 'right' ? 'right' : 'left',
  'link' => (string) ($c['link'] ?? ''),
  'linkText' => (string) ($c['linkText'] ?? ''),
  'where' => (string) ($c['where'] ?? 'all'),
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
