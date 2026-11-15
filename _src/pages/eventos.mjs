export const meta = {
  out: 'eventos.html', theme: 'britos', current: '', heroDark: true, preload: 'britos-montaje-01', og: 'britos-eventos-01',
  title: 'Britos Restauración & Eventos · Bodas, bautizos, comuniones y catering',
  description: 'Grupo de restauración y eventos en Ribera del Fresno: Casa de los Britos, Ribbo, Ca·Nostra, Café Hibernia y Bianco. Bodas, bautizos, comuniones y catering. Tel. 609 75 16 47.',
};

// Portada: fotos de eventos y de los locales del grupo
const SLIDES = [
  ['britos-montaje-01', 'Mesas redondas vestidas con mantelería de lino, cristalería y flores en una carpa', 'center 58%', 'Montaje de boda'],
  ['bianco-02', 'Terraza de Bianco llena de gente, con bengalas encendidas en la barra', 'center 45%', 'Noche en Bianco'],
  ['ribbo-01', 'Barra de Ribbo Restaurant con clientes y taburetes de cuero', 'center 50%', 'Barra de Ribbo'],
  ['hibernia-02', 'Interior del Café Hibernia con la H iluminada y sillas de terciopelo verde', 'center 50%', 'Café Hibernia'],
];

// Nuestras marcas: foto del local con su logo encima
const MARCAS = [
  { k: 'casa', name: 'Casa de los Britos', type: 'Restaurante', img: 'dsc06935', alt: 'Comedor de Casa de los Britos', pos: 'center 55%', href: 'index.html', w: 382 },
  { k: 'ribbo', name: 'Ribbo Restaurant', type: 'Restaurante', img: 'ribbo-03', alt: 'Salón de Ribbo con mesas altas y espejo redondo iluminado', pos: 'center 55%', w: 367 },
  { k: 'canostra', name: 'Ca·Nostra', type: 'Bar y restaurante', img: 'canostra-01', alt: 'Barra de Ca·Nostra con su letrero y copas colgadas', pos: 'center 35%', w: 320 },
  { k: 'hibernia', name: 'Café Hibernia', type: 'Café y copas', img: 'hibernia-01', alt: 'Fachada y terraza del Café Hibernia al atardecer', pos: 'center 55%', w: 146 },
  { k: 'bianco', name: 'Bianco', type: 'Terraza', img: 'bianco-01', alt: 'Terraza de Bianco de noche, llena de gente', pos: 'center 40%', w: 290 },
];

export const body = ({ DATA, im, ico }) => `
<section class="ghero" data-enter aria-labelledby="ev-title">
  <div class="ghero__media carousel carousel--fade" data-carousel data-interval="6000" role="region" aria-roledescription="carrusel" aria-label="Fotos de eventos y de nuestros locales">
    <figure class="ph">
      <div class="slides">
        ${SLIDES.map(([name, alt, pos], i) => im(name, alt, { sizes: '100vw', eager: i === 0, big: true, pos }).replace('<img ', `<img class="slide${i === 0 ? ' is-active' : ''}" data-i="${i}" aria-hidden="${i === 0 ? 'false' : 'true'}" `)).join('\n        ')}
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
  <div class="ghero__text wrap">
    <p class="ghero__kicker enter" style="--i:0">Ribera del Fresno · Tierra de Barros</p>
    <h1 id="ev-title" class="enter" style="--i:1">Grupo de restauración y eventos</h1>
    <p class="ghero__lead enter" style="--i:2">Cinco locales y un mismo equipo para bodas, bautizos, comuniones, catering y eventos de empresa.</p>
    <div class="ghero__cta enter" style="--i:3">
      <a class="phone-pill phone-pill--light" href="${DATA.telGrupos.href}"><span>${ico('phone')}</span><span class="num">${DATA.telGrupos.display}</span></a>
      <a class="btn btn--lg ghero__ghost" href="#presupuesto">Pedir presupuesto</a>
    </div>
  </div>
</section>

<section class="section about" id="grupo" aria-labelledby="grupo-title">
  <div class="wrap about__in">
    <p class="about__kicker">El grupo</p>
    <h2 id="grupo-title" class="h2">Cinco casas, un mismo equipo</h2>
    <p>Empezamos con Casa de los Britos, en Ribera del Fresno. Después llegaron Ribbo, Ca·Nostra, el Café Hibernia y Bianco: cinco locales distintos, cada uno con su carácter, y la misma gente detrás de la cocina y la sala.</p>
    <p>Ese equipo es el que prepara vuestras celebraciones, en cualquiera de nuestros espacios o en la finca que elijáis.</p>
  </div>
</section>

<section class="section marcas" id="marcas" aria-labelledby="marcas-title">
  <div class="wrap">
    <h2 id="marcas-title" class="h2 marcas__title">Nuestras marcas</h2>
    <ul class="marcas__grid">
      ${MARCAS.map((m) => {
        const inner = `<figure class="marca__ph">${im(m.img, m.alt, { sizes: '(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 34vw', pos: m.pos })}</figure>
        <div class="marca__over">
          <img class="marca__logo marca__logo--${m.k}" src="assets/logos/marca-${m.k}-white.png" alt="${m.name}" width="${m.w}" height="240" loading="lazy">
          <span class="marca__rule" aria-hidden="true"></span>
          <span class="marca__type">${m.type}${m.href ? ` ${ico('arrow')}` : ''}</span>
        </div>`;
        return `<li class="marca${m.href ? ' marca--link' : ''}">${m.href ? `<a href="${m.href}" aria-label="${m.name}, ${m.type.toLowerCase()}: ver su web">${inner}</a>` : `<div>${inner}</div>`}</li>`;
      }).join('\n      ')}
    </ul>
  </div>
</section>

<figure class="band ph" aria-hidden="true">${im('canostra-02', '', { sizes: '100vw', big: true, pos: 'center 72%' })}</figure>

<section class="section" id="celebraciones" aria-labelledby="cel-title">
  <div class="wrap">
    <div class="head">
      <h2 id="cel-title" class="h2">Celebraciones a medida</h2>
      <p class="lead">El mismo equipo de cocina y sala para cada tipo de evento, desde el primer menú hasta la recena.</p>
    </div>
    <div class="rows">
      <article class="row" id="bodas" style="--c:var(--mostaza)">
        <span class="row__chip" aria-hidden="true"></span>
        <h3>Bodas</h3>
        <div><p>Banquete, cóctel de bienvenida y barra libre, en salón o al aire libre.</p>
          <ul><li>Cóctel y banquete</li><li>Barra libre y recena</li><li>Montaje y decoración de mesa</li></ul></div>
        <div class="row__cap" aria-hidden="true">${im('britos-montaje-01', '', { sizes: '200px', pos: 'center 60%' })}</div>
      </article>
      <article class="row" id="bautizos" style="--c:var(--capsula-burdeos)">
        <span class="row__chip" aria-hidden="true"></span>
        <h3>Bautizos y celebraciones</h3>
        <div><p>Cumpleaños, aniversarios, bautizos y reuniones familiares.</p>
          <ul><li>Salones privados</li><li>Menús cerrados</li><li>Coctelería en Bianco y Hibernia</li></ul></div>
        <div class="row__cap" aria-hidden="true">${im('hibernia-02', '', { sizes: '200px', pos: 'center 50%' })}</div>
      </article>
      <article class="row" id="comuniones" style="--c:var(--pizarra)">
        <span class="row__chip" aria-hidden="true"></span>
        <h3>Comuniones</h3>
        <div><p>Menús de adulto e infantil, en salones pensados para familias.</p>
          <ul><li>Menú infantil</li><li>Salón privado</li><li>Tarta y sobremesa</li></ul></div>
        <div class="row__cap" aria-hidden="true">${im('ribbo-03', '', { sizes: '200px', pos: 'center 50%' })}</div>
      </article>
      <article class="row" id="catering" style="--c:var(--oliva)">
        <span class="row__chip" aria-hidden="true"></span>
        <h3>Catering</h3>
        <div><p>Llevamos cocina y servicio a fincas, casas y espacios propios.</p>
          <ul><li>Cocina en destino</li><li>Personal de sala</li><li>Menaje y mobiliario</li></ul></div>
        <div class="row__cap" aria-hidden="true">${im('britos-eventos-01', '', { sizes: '200px', pos: 'center 40%' })}</div>
      </article>
      <article class="row" id="empresa" style="--c:var(--britos)">
        <span class="row__chip" aria-hidden="true"></span>
        <h3>Empresa</h3>
        <div><p>Comidas de equipo, cenas de Navidad y presentaciones.</p>
          <ul><li>Menús de grupo</li><li>Facturación a empresa</li><li>Espacios para presentaciones</li></ul></div>
        <div class="row__cap" aria-hidden="true">${im('ribbo-02', '', { sizes: '200px', pos: 'center 40%' })}</div>
      </article>
    </div>
  </div>
</section>

<section class="section section--surface" id="como" aria-labelledby="como-title">
  <div class="wrap">
    <div class="head">
      <h2 id="como-title" class="h2">Una sola persona de principio a fin</h2>
      <p class="lead">Te asignamos a alguien del equipo que lleva tu evento entero: menú, espacio, montaje y servicio.</p>
    </div>
    <ol class="steps">
      <li><span class="n">1</span><h3>Nos cuentas la idea</h3><p>Fecha, invitados y tipo de celebración.</p></li>
      <li><span class="n">2</span><h3>Elegimos el espacio</h3><p>Uno de nuestros locales o tu propia finca.</p></li>
      <li><span class="n">3</span><h3>Prueba de menú</h3><p>Cerramos el menú contigo, con opciones para alergias.</p></li>
      <li><span class="n">4</span><h3>El gran día</h3><p>Montaje, cocina y servicio a cargo de nuestro equipo.</p></li>
    </ol>
  </div>
</section>

<section class="section" id="galeria" aria-labelledby="gal-title">
  <div class="wrap">
    <div class="head">
      <h2 id="gal-title" class="h2">Montajes y eventos</h2>
      <p class="lead">Algunas de las celebraciones que hemos preparado.</p>
    </div>
    <!-- PENDIENTE: fotos de bautizos, comuniones y eventos de empresa (mínimo 1600 px de ancho) -->
    <div class="gallery">
      <figure class="ph">${im('britos-montaje-01', 'Mesas redondas vestidas con mantelería de lino, cristalería y centros de flores de otoño en una carpa', { sizes: '(max-width: 699px) 100vw, 50vw', pos: 'center 55%' })}</figure>
      <figure class="ph">${im('britos-eventos-01', 'Camarero de Britos con delantal bordado sirviendo aperitivos', { sizes: '(max-width: 699px) 50vw, 50vw', pos: 'center 40%' })}</figure>
      <figure class="ph">${im('bianco-02', 'Fiesta en la terraza de Bianco con bengalas en la barra', { sizes: '(max-width: 699px) 50vw, 50vw', pos: 'center 45%' })}</figure>
      <figure class="ph">${im('ribbo-02', 'Mojitos preparándose en la barra de Ribbo', { sizes: '(max-width: 699px) 50vw, 33vw', pos: 'center 50%' })}</figure>
      <figure class="ph">${im('canostra-01', 'Barra de Ca·Nostra con copas colgadas', { sizes: '(max-width: 699px) 50vw, 33vw', pos: 'center 40%' })}</figure>
      <figure class="ph">${im('hibernia-02', 'Salón del Café Hibernia', { sizes: '(max-width: 699px) 100vw, 33vw', pos: 'center 50%' })}</figure>
    </div>
  </div>
</section>

<section class="section section--surface" id="presupuesto" aria-labelledby="pres-title">
  <div class="wrap">
    <div class="split split--top">
      <div class="stack">
        <h2 id="pres-title" class="h2">Cuéntanos tu celebración</h2>
        <p class="lead">Rellena estos datos y te llamamos para hablar del evento. Si lo prefieres, llámanos directamente.</p>
        <a class="phone-pill" href="${DATA.telGrupos.href}"><span>${ico('phone')}</span><span class="num">${DATA.telGrupos.display}</span></a>
      </div>
      <form class="form form-panel" style="background:var(--marfil)" data-form="eventos" data-subject="Solicitud de presupuesto · Britos Restauración & Eventos" data-success="Gracias. Hemos recibido tu solicitud y te llamaremos para hablar del evento." novalidate>
        <div class="field"><label for="e-tipo">Tipo de evento</label><select class="input" id="e-tipo" name="tipo" required aria-describedby="e-tipo-err"><option value="">Elige una opción</option><option>Boda</option><option>Bautizo</option><option>Comunión</option><option>Catering</option><option>Evento de empresa</option><option>Celebración familiar</option><option>Otro</option></select><p class="error" id="e-tipo-err">Elige el tipo de evento.</p></div>
        <div class="field"><label for="e-fecha">Fecha estimada</label><input class="input" id="e-fecha" name="fecha" type="text" placeholder="Por ejemplo, mayo de 2027" required aria-describedby="e-fecha-err"><p class="error" id="e-fecha-err">Indica una fecha aproximada, aunque sea el mes.</p></div>
        <div class="field"><label for="e-invitados">Invitados aproximados</label><input class="input" id="e-invitados" name="invitados" type="number" inputmode="numeric" min="1" max="2000" placeholder="Por ejemplo, 120" required aria-describedby="e-invitados-err"><p class="error" id="e-invitados-err">Indica un número aproximado de invitados.</p></div>
        <div class="field"><label for="e-lugar">Lugar</label><input class="input" id="e-lugar" name="lugar" type="text" placeholder="Uno de nuestros locales, tu finca o «por decidir»" required aria-describedby="e-lugar-err"><p class="error" id="e-lugar-err">Dinos dónde será o escribe «por decidir».</p></div>
        <div class="field"><label for="e-nombre">Nombre</label><input class="input" id="e-nombre" name="nombre" type="text" autocomplete="name" required aria-describedby="e-nombre-err"><p class="error" id="e-nombre-err">Escribe tu nombre.</p></div>
        <div class="field"><label for="e-tel">Teléfono de contacto</label><input class="input" id="e-tel" name="telefono" type="tel" autocomplete="tel" inputmode="tel" pattern="[0-9 +()\\-]{9,}" required aria-describedby="e-tel-err"><p class="error" id="e-tel-err">Escribe un teléfono de al menos 9 cifras.</p></div>
        <div class="field field--full"><label for="e-mensaje">Algo más que debamos saber <span class="hint">(opcional)</span></label><textarea class="input" id="e-mensaje" name="mensaje"></textarea></div>
        <div class="field field--full"><label class="check" for="e-priv"><input id="e-priv" name="privacidad" type="checkbox" required aria-describedby="e-priv-err"> He leído y acepto la <a href="privacidad.html" target="_blank" rel="noopener">Política de privacidad</a> y el <a href="aviso-legal.html" target="_blank" rel="noopener">Aviso legal</a>.</label><p class="error" id="e-priv-err">Necesitamos que aceptes la política de privacidad para preparar el presupuesto.</p></div>
        <p class="form__info field--full"><strong>Protección de datos.</strong> Responsable: el titular de Britos Restauración &amp; Eventos. Finalidad: preparar y enviarte tu presupuesto. Legitimación: tu consentimiento. Destinatarios: no se ceden a terceros, salvo obligación legal. Derechos: acceso, rectificación, supresión y otros, como explica la <a href="privacidad.html">Política de privacidad</a>.</p>
        <div class="form__foot"><button class="btn btn--lg" type="submit">Pedir presupuesto</button></div>
        <p class="form__status" role="status" hidden></p>
      </form>
    </div>
  </div>
</section>
`;
