<?php
/* Reseñas de Google para la portada (o {"active":false} si no están configuradas). */
declare(strict_types=1);
require __DIR__ . '/_lib.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: public, max-age=900');

$d = google_reviews();
if (!$d || empty($d['reviews']) || $d['rating'] === null) { echo json_encode(['active' => false]); exit; }
echo json_encode(['active' => true] + $d, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
