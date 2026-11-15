export const meta = {
  out: 'blog.php', theme: 'casa', current: 'blog', og: '4e3a8597',
  title: 'Blog · Casa de los Britos',
  description: 'Novedades de Casa de los Britos en Ribera del Fresno: platos de temporada, jornadas gastronómicas, vinos y lo que pasa en el restaurante.',
  phpTop: `<?php declare(strict_types=1); require __DIR__ . '/api/_lib.php'; $posts = published_posts(); ?>`,
};

export const body = ({ ico }) => `
<section class="section" style="padding-top:calc(var(--head-space) + clamp(64px, 8vw, 120px))" aria-labelledby="blog-title">
  <div class="wrap">
    <div class="head">
      <h1 id="blog-title" class="display primor">Blog</h1>
      <p class="lead">Platos de temporada, jornadas, vinos y lo que pasa en el restaurante.</p>
    </div>
    <?php if (!$posts): ?>
      <div class="posts-empty">
        <p class="statement">Muy pronto publicaremos aquí nuestras novedades.</p>
        <a class="link mt-m" href="carta.html">Mientras tanto, ver la carta ${ico('arrow')}</a>
      </div>
    <?php else: ?>
      <ul class="posts">
        <?php foreach ($posts as $i => $p): ?>
        <li>
          <a class="post-card" href="entrada.php?s=<?= e($p['slug']) ?>">
            <figure class="ph ph--r32"><?php if (!empty($p['cover'])): ?><img src="<?= e($p['cover']) ?>" alt="<?= e($p['alt'] ?? '') ?>" loading="<?= $i < 2 ? 'eager' : 'lazy' ?>" decoding="async"><?php else: ?><img src="assets/img/4e3a8597-800.webp" alt="" loading="lazy" decoding="async"><?php endif; ?></figure>
            <p class="post-card__date"><?= fecha_es($p['date']) ?></p>
            <h2 class="post-card__title"><?= e($p['title']) ?></h2>
            <?php if (!empty($p['excerpt'])): ?><p class="post-card__excerpt"><?= e($p['excerpt']) ?></p><?php endif; ?>
            <span class="link">Leer ${ico('arrow')}</span>
          </a>
        </li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
  </div>
</section>
`;
