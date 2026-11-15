export const meta = {
  out: 'entrada.php', theme: 'casa', current: 'blog', og: '4e3a8597', rootPrefix: true,
  title: '<?= e($pageTitle) ?>',
  description: '<?= e($pageDesc) ?>',
  phpTop: `<?php
declare(strict_types=1);
require __DIR__ . '/api/_lib.php';
// Raíz de la web (la entrada se sirve en /blog/slug, un nivel más abajo)
$R = rtrim(strtr(dirname($_SERVER['SCRIPT_NAME'] ?? '/'), DIRECTORY_SEPARATOR, '/'), '/') . '/';
$GLOBALS['R'] = $R;
$post = find_post((string) ($_GET['s'] ?? ''));
if (!$post || empty($post['published']) || ($post['date'] ?? '') > date('Y-m-d')) { http_response_code(404); $post = null; }
$pageTitle = $post ? $post['title'] . ' · Blog · Casa de los Britos' : 'Entrada no encontrada · Casa de los Britos';
$pageDesc = $post ? ($post['excerpt'] ?: mb_substr(strip_tags(md($post['body'])), 0, 160)) : 'Esta entrada no existe o ya no está publicada.';
?>`,
};

export const body = ({ ico }) => `
<?php if (!$post): ?>
<section class="section" style="padding-top:calc(var(--head-space) + clamp(64px, 8vw, 120px))" aria-labelledby="nf-title">
  <div class="wrap">
    <h1 id="nf-title" class="post__title">No encontramos esta entrada</h1>
    <p class="lead mt-s">Puede que se haya despublicado o que el enlace no esté completo.</p>
    <a class="btn mt-m" href="blog.php">Ver todas las entradas ${ico('arrow')}</a>
  </div>
</section>
<?php else: ?>
<article class="section post" style="padding-top:calc(var(--head-space) + clamp(48px, 6vw, 96px))" aria-labelledby="post-title">
  <div class="wrap post__wrap">
    <a class="link post__back" href="blog.php">← Todas las entradas</a>
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
      <a class="link" href="blog.php">Más entradas ${ico('arrow')}</a>
    </div>
  </div>
</article>
<?php endif; ?>
`;
