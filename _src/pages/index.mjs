export const meta = {
  out: 'index.html', theme: 'casa', current: 'inicio', preload: 'dsc07287',
  title: 'Casa de los Britos · Restaurante en Ribera del Fresno',
  description: 'Restaurante en la antigua casa solariega de los Britos, Ribera del Fresno (Badajoz): ibérico de bellota, ternera extremeña a la brasa, pescado de lonja, arroces y bodega. Reservas por teléfono.',
};

// Fotos del carrusel de portada: [archivo, texto alternativo, encuadre, etiqueta]
const SLIDES = [
  ['dsc07287', 'Chuletón sobre la parrilla, con las brasas encendidas debajo', 'center 60%', 'la brasa'],
  ['4e3a8246', 'Mesa junto al aplique de luz cálida sobre la pared de barro', 'center 50%', 'la sala'],
  ['4e3a8357', 'Jamón ibérico de bellota cortado a cuchillo', 'center 55%', 'el ibérico'],
  ['dsc06935', 'Puertas de madera bajo el arco con vidriera de colores', 'center 35%', 'la vidriera'],
  ['dsc07046', 'Arroz meloso de boletus recién hecho', 'center 50%', 'los arroces'],
];

export const body = ({ DATA, im, ico }) => `
<section class="hero" data-enter aria-labelledby="hero-title">
  <div class="hero__text">
    <div>
      <h1 id="hero-title" class="display enter" style="--i:0">Cocina de la tierra, mesa de familia.</h1>
      <p class="lead mt-m enter" style="--i:1">Restaurante en Ribera del Fresno. Ibérico, brasa, arroces y bodega en la antigua casa solariega de los Britos.</p>
    </div>
    <div class="enter" style="--i:3" data-callbar-hide>
      <div class="hero__cta">
        <a class="btn btn--lg" href="${DATA.tel.href}">${ico('phone')}Reservar · <span class="num">${DATA.tel.display}</span></a>
        <a class="link" href="carta.html">Ver la carta ${ico('arrow')}</a>
      </div>
      <p class="status mt-m"><i></i><span data-live>Abrimos de jueves a domingo</span></p>
    </div>
  </div>
  <div class="hero__media carousel" data-carousel data-interval="6000" role="region" aria-roledescription="carrusel" aria-label="Fotos del restaurante">
    <figure class="ph">
      <div class="slides">
        ${SLIDES.map(([name, alt, pos], i) => im(name, alt, { sizes: '(max-width: 899px) 100vw, 58vw', eager: i === 0, big: true, pos }).replace('<img ', `<img class="slide${i === 0 ? ' is-active' : ''}" data-i="${i}" aria-hidden="${i === 0 ? 'false' : 'true'}" `)).join('\n        ')}
      </div>
    </figure>
    <div class="carousel__ui">
      <div class="carousel__dots">
        ${SLIDES.map(([, , , label], i) => `<button type="button" class="carousel__dot${i === 0 ? ' is-active' : ''}" data-go="${i}" aria-label="Foto ${i + 1} de ${SLIDES.length}: ${label}"${i === 0 ? ' aria-current="true"' : ''}><span></span></button>`).join('')}
      </div>
      <button type="button" class="carousel__pause" data-pause aria-label="Pausar el carrusel" aria-pressed="false">
        <svg class="ico ico--pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>
        <svg class="ico ico--play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>
      </button>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="bienvenida">
  <div class="wrap">
    <h2 id="bienvenida" class="sr-only">Bienvenidos al restaurante</h2>
    <p class="statement">En la calle dedicada a Meléndez Valdés, poeta ilustre de Ribera del Fresno, nace un espacio donde disfrutar de la buena gastronomía sin prisas. Jamón ibérico de bellota, chuletones extremeños a la brasa, pescados frescos y arroces para compartir, todo ello acompañado de una cuidada selección de vinos de nuestra tierra.</p>
    <a class="link mt-m" href="el-restaurante.html">Conocer el restaurante ${ico('arrow')}</a>
  </div>
</section>

<section class="section" aria-labelledby="cocina-title">
  <div class="wrap">
    <div class="head">
      <h2 id="cocina-title" class="h2">Brasa, arroces y sobremesa</h2>
      <p class="lead">Producto de la tierra, fuego de verdad y una bodega a la vista.</p>
    </div>
    <ul class="tiles">
      <li><a class="tile" href="carta.html#carnes"><figure class="ph ph--r45">${im('dsc07282', 'Chuletón sobre la parrilla', { sizes: '(max-width: 899px) 50vw, 33vw' })}</figure><h3>La brasa ${ico('arrow')}</h3></a></li>
      <li><a class="tile" href="carta.html#arroces"><figure class="ph ph--r45">${im('dsc07046', 'Arroz meloso de boletus recién hecho', { sizes: '(max-width: 899px) 50vw, 33vw' })}</figure><h3>Los arroces ${ico('arrow')}</h3></a></li>
      <li><a class="tile" href="carta.html#tierra"><figure class="ph ph--r45">${im('4e3a8357', 'Jamón ibérico de bellota cortado a cuchillo', { sizes: '(max-width: 899px) 50vw, 33vw' })}</figure><h3>La tierra ${ico('arrow')}</h3></a></li>
      <li><a class="tile" href="carta.html#bodega"><figure class="ph ph--r45">${im('dsc06961', 'Botellas de la bodega del restaurante', { sizes: '(max-width: 899px) 50vw, 33vw' })}</figure><h3>La bodega ${ico('arrow')}</h3></a></li>
      <li><a class="tile" href="carta.html#postres"><figure class="ph ph--r45">${im('dsc07442', 'Torrija caramelizada con helado', { sizes: '(max-width: 899px) 50vw, 33vw' })}</figure><h3>Postres caseros ${ico('arrow')}</h3></a></li>
      <li><a class="tile" href="el-restaurante.html#espacios"><figure class="ph ph--r45">${im('4e3a8251', 'Mesa de uno de nuestros salones junto a la ventana', { sizes: '(max-width: 899px) 50vw, 33vw' })}</figure><h3>Nuestros salones ${ico('arrow')}</h3></a></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="brasa-title">
  <div class="wrap">
    <div class="split">
      <figure class="ph ph--r45">${im('dsc07291', 'Chuletón dorándose sobre la parrilla con las brasas encendidas', { sizes: '(max-width: 899px) 100vw, 46vw' })}</figure>
      <div class="stack">
        <h2 id="brasa-title" class="h2">Directo a la parrilla</h2>
        <p class="prose">Ternera extremeña, angus y wagyu; presa y pluma ibérica; pulpo y pescado de lonja. Todo pasa por la brasa y llega a la mesa al punto que nos pidas.</p>
        <ul class="menu-list" style="width:100%">
          <li><h3>Chuletón de ternera extremeña</h3><span class="tag">Al peso</span></li>
          <li><h3>Chuletón de angus</h3><span class="tag">Al peso</span></li>
          <li><h3>Wagyu</h3></li>
          <li><h3>Presa y pluma ibérica a la brasa</h3></li>
        </ul>
        <a class="link" href="carta.html#carnes">Ver todas las carnes ${ico('arrow')}</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--surface" aria-labelledby="carta-title">
  <div class="wrap">
    <div class="split split--top">
      <div class="stack">
        <h2 id="carta-title" class="h2">De la tierra a la brasa</h2>
        <p class="lead">Pregunta por las sugerencias del día al reservar o en la mesa.</p>
        <a class="btn" href="carta.html">Ver la carta completa ${ico('arrow')}</a>
      </div>
      <ol class="index-list">
        <li><a href="carta.html#tierra"><span class="n">01</span><span class="t">Entrantes de la tierra</span><span class="c">5 platos</span></a></li>
        <li><a href="carta.html#frios"><span class="n">02</span><span class="t">Entrantes fríos</span><span class="c">7 platos</span></a></li>
        <li><a href="carta.html#calientes"><span class="n">03</span><span class="t">Calientes</span><span class="c">12 platos</span></a></li>
        <li><a href="carta.html#pescados"><span class="n">04</span><span class="t">Pescados</span><span class="c">6 platos</span></a></li>
        <li><a href="carta.html#carnes"><span class="n">05</span><span class="t">Carnes</span><span class="c">13 platos</span></a></li>
        <li><a href="carta.html#arroces"><span class="n">06</span><span class="t">Nuestros arroces</span><span class="c">5 platos</span></a></li>
        <li><a href="carta.html#postres"><span class="n">07</span><span class="t">Postres</span><span class="c">10 platos</span></a></li>
        <li><a href="carta.html#bodega"><span class="n">08</span><span class="t">La bodega</span><span class="c">38 vinos</span></a></li>
      </ol>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="bodega-title">
  <div class="wrap">
    <div class="split">
      <div class="stack">
        <h2 id="bodega-title" class="h2">La bodega</h2>
        <p class="prose">Treinta y ocho referencias con un sitio especial para Extremadura: Viña Puebla, Habla del Silencio, Haragán o Pentateuco, y el vino de la <strong>Cooperativa de Ribera del Fresno</strong>, el del pueblo.</p>
        <p class="prose">Para las carnes, Rioja y Ribera del Duero. Para brindar, cava y champagne.</p>
        <a class="link" href="carta.html#bodega">Ver la bodega ${ico('arrow')}</a>
      </div>
      <figure class="ph ph--r45">${im('dsc06962', 'Botellas de espumoso en el botellero de la bodega', { sizes: '(max-width: 899px) 100vw, 46vw' })}</figure>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="salones-title">
  <div class="wrap">
    <div class="head">
      <h2 id="salones-title" class="h2">Nuestros salones</h2>
      <div>
        <p class="lead">Comedor principal, salón privado y la bodega a la vista. Pide tu mesa favorita al reservar.</p>
        <a class="link mt-s" href="el-restaurante.html#espacios">Conocer los salones ${ico('arrow')}</a>
      </div>
    </div>
  </div>
  <div class="strip" role="list">
    <a role="listitem" class="ph" href="el-restaurante.html#espacios">${im('4e3a8224', 'Escalera y sala con aplique de luz al fondo', { sizes: '(max-width: 699px) 70vw, 25vw' })}</a>
    <a role="listitem" class="ph" href="el-restaurante.html#espacios">${im('4e3a8241', 'Mesa puesta delante del botellero', { sizes: '(max-width: 699px) 70vw, 25vw', pos: 'center 55%' })}</a>
    <a role="listitem" class="ph" href="el-restaurante.html#espacios">${im('dsc06941', 'Mesas de la sala con la luz cálida de la pared', { sizes: '(max-width: 699px) 70vw, 25vw' })}</a>
    <a role="listitem" class="ph" href="el-restaurante.html#espacios">${im('4e3a8231', 'Mesa de mármol junto a la ventana del patio', { sizes: '(max-width: 699px) 70vw, 25vw', pos: 'center 60%' })}</a>
  </div>
</section>

<!-- Reseñas de Google: se rellenan desde api/resenas.php (configurable en /admin). Sin configurar, la sección no se muestra. -->
<section class="section section--surface reviews" id="resenas" aria-labelledby="resenas-title" data-reviews hidden>
  <div class="wrap">
    <div class="head">
      <h2 id="resenas-title" class="h2">Lo que dicen en Google</h2>
      <div class="reviews__score">
        <p><span class="reviews__rating num" data-r-rating></span><span class="reviews__stars" data-r-stars aria-hidden="true"></span></p>
        <p class="muted" data-r-count></p>
      </div>
    </div>
    <ul class="reviews__list" data-r-list></ul>
    <p class="reviews__foot"><a class="link" data-r-link href="#" target="_blank" rel="noopener">Ver todas las reseñas en Google ${ico('arrow')}</a><span class="muted">Reseñas de Google</span></p>
  </div>
</section>

<section class="section" aria-labelledby="historia-title">
  <div class="wrap">
    <div class="split">
      <figure class="ph ph--r43">${im('dsc06948', 'Placa con el escudo de Restaurante Casa de los Britos en la fachada', { sizes: '(max-width: 899px) 100vw, 50vw' })}</figure>
      <div class="stack">
        <h2 id="historia-title" class="h2">La casa que marcó el pulso del pueblo</h2>
        <p class="prose">El restaurante toma su nombre de la Casa Solariega de los Britos, en el corazón de Ribera del Fresno. Fue casa de familia, casino y punto de encuentro de los vecinos. Desde diciembre de 2025, tras una reforma integral, vuelve a estar abierta al pueblo.</p>
        <a class="link" href="el-restaurante.html#historia">Leer la historia ${ico('arrow')}</a>
      </div>
    </div>
  </div>
</section>

<section class="close" aria-labelledby="reserva-title">
  <div class="wrap close__in">
    <div>
      <h2 id="reserva-title" class="h2">Te guardamos la mesa</h2>
      <p class="lead mt-s">Las reservas se hacen solo por teléfono. Te atendemos de jueves a domingo.</p>
      <p class="phone-big num mt-m"><a href="${DATA.tel.href}">${DATA.tel.display}</a></p>
    </div>
    <div class="close__side">
      <p class="status"><i></i><span data-live>Abrimos de jueves a domingo</span></p>
      <dl class="hours">
        <div data-days="4,5,6,0"><dt>Jueves a domingo</dt><dd>12:30 – 23:30</dd></div>
        <div data-days="1,2,3"><dt>Lunes a miércoles</dt><dd>Cerrado</dd></div>
      </dl>
      <a class="link" href="reservas.html">Grupos y peticiones especiales ${ico('arrow')}</a>
    </div>
  </div>
</section>

<section class="to-britos" aria-label="Britos Restauración y Eventos">
  <div class="wrap to-britos__in">
    <img src="assets/logos/britos-logotipo-burdeos.png" alt="Britos Restauración &amp; Eventos" width="900" height="248" loading="lazy">
    <p>¿Una boda, un bautizo, una comunión o un catering? Lo organiza nuestro grupo de eventos.</p>
    <a class="btn" href="eventos.html">Ir a Britos Eventos ${ico('arrow')}</a>
  </div>
</section>
`;
