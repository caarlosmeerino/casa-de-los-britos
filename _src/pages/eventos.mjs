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

// Celebraciones: la única parte de la página con color
const EVENTOS = [
  { id: 'bodas', t: 'Bodas', c: 'var(--mostaza)', img: 'britos-montaje-01', pos: 'center 60%', p: 'Banquete, cóctel y barra libre, en salón o al aire libre.', l: ['Cóctel y banquete', 'Barra libre y recena', 'Montaje de mesa'] },
  { id: 'comuniones', t: 'Comuniones', c: 'var(--pizarra)', img: 'ribbo-03', pos: 'center 50%', p: 'Menús de adulto e infantil en salones pensados para familias.', l: ['Menú infantil', 'Salón privado', 'Tarta y sobremesa'] },
  { id: 'bautizos', t: 'Bautizos y celebraciones', c: 'var(--capsula-burdeos)', img: 'hibernia-02', pos: 'center 50%', p: 'Cumpleaños, aniversarios, bautizos y reuniones familiares.', l: ['Salones privados', 'Menús cerrados', 'Coctelería'] },
  { id: 'catering', t: 'Catering', c: 'var(--oliva)', img: 'britos-eventos-01', pos: 'center 40%', p: 'Llevamos cocina y servicio a fincas, casas y espacios propios.', l: ['Cocina en destino', 'Personal de sala', 'Menaje y mobiliario'] },
  { id: 'empresa', t: 'Empresa', c: 'var(--evento-britos)', img: 'ribbo-02', pos: 'center 40%', p: 'Comidas de equipo, cenas de Navidad y presentaciones.', l: ['Menús de grupo', 'Facturación a empresa', 'Presentaciones'] },
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
    <div class="ghero__cta enter" style="--i:2">
      <a class="phone-pill phone-pill--light" href="${DATA.telGrupos.href}"><span>${ico('phone')}</span><span class="num">${DATA.telGrupos.display}</span></a>
      <a class="btn btn--lg ghero__ghost" href="#presupuesto">Pedir presupuesto</a>
    </div>
  </div>
</section>

<section class="section about" id="grupo" aria-labelledby="grupo-title">
  <div class="wrap about__in">
    <p class="about__kicker">El grupo</p>
    <h2 id="grupo-title" class="h2">Cinco casas, un mismo equipo</h2>
    <p>Casa de los Britos, Ribbo, Ca·Nostra, Café Hibernia y Bianco. Cinco locales con carácter propio y la misma gente detrás de la cocina y la sala, también en vuestras celebraciones.</p>
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

<section class="section ev" id="celebraciones" aria-labelledby="cel-title">
  <div class="wrap">
    <div class="ev__head">
      <p class="about__kicker">Eventos</p>
      <h2 id="cel-title" class="h2">Celebraciones a medida</h2>
    </div>
    <ul class="ev__grid">
      ${EVENTOS.map((e) => `<li class="evc" id="${e.id}" style="--c:${e.c}">
        <figure class="evc__ph">${im(e.img, '', { sizes: '(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 34vw', pos: e.pos })}</figure>
        <div class="evc__txt">
          <h3>${e.t}</h3>
          <p>${e.p}</p>
          <p class="evc__list">${e.l.join(' · ')}</p>
        </div>
      </li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="section" id="como" aria-labelledby="como-title">
  <div class="wrap">
    <div class="ev__head">
      <p class="about__kicker">Cómo trabajamos</p>
      <h2 id="como-title" class="h2">Una sola persona de principio a fin</h2>
    </div>
    <ol class="steps steps--min">
      <li><span class="n">01</span><h3>La idea</h3><p>Fecha, invitados y tipo de celebración.</p></li>
      <li><span class="n">02</span><h3>El espacio</h3><p>Uno de nuestros locales o tu propia finca.</p></li>
      <li><span class="n">03</span><h3>El menú</h3><p>Prueba de menú, con opciones para alergias.</p></li>
      <li><span class="n">04</span><h3>El día</h3><p>Montaje, cocina y servicio de nuestro equipo.</p></li>
    </ol>
  </div>
</section>

<section class="section pres" id="presupuesto" aria-labelledby="pres-title">
  <div class="wrap">
    <div class="split split--top">
      <div class="stack">
        <h2 id="pres-title" class="h2">Cuéntanos tu celebración</h2>
        <p class="lead">Rellena estos datos y te llamamos para hablar del evento. Si lo prefieres, llámanos directamente.</p>
        <a class="phone-pill" href="${DATA.telGrupos.href}"><span>${ico('phone')}</span><span class="num">${DATA.telGrupos.display}</span></a>
      </div>
      <form class="form form-panel" data-form="eventos" data-subject="Solicitud de presupuesto · Britos Restauración & Eventos" data-success="Gracias. Hemos recibido tu solicitud y te llamaremos para hablar del evento." novalidate>
        <div class="field"><label for="e-tipo">Tipo de evento</label><select class="input" id="e-tipo" name="tipo" required aria-describedby="e-tipo-err"><option value="">Elige una opción</option><option>Boda</option><option>Bautizo</option><option>Comunión</option><option>Catering</option><option>Evento de empresa</option><option>Celebración familiar</option><option>Otro</option></select><p class="error" id="e-tipo-err">Elige el tipo de evento.</p></div>
        <div class="field"><label for="e-fecha">Fecha estimada</label><input class="input" id="e-fecha" name="fecha" type="text" placeholder="Por ejemplo, mayo de 2027" required aria-describedby="e-fecha-err"><p class="error" id="e-fecha-err">Indica una fecha aproximada, aunque sea el mes.</p></div>
        <div class="field"><label for="e-invitados">Invitados aproximados</label><input class="input" id="e-invitados" name="invitados" type="number" inputmode="numeric" min="1" max="2000" placeholder="Por ejemplo, 120" required aria-describedby="e-invitados-err"><p class="error" id="e-invitados-err">Indica un número aproximado de invitados.</p></div>
        <div class="field"><label for="e-lugar">Lugar</label><input class="input" id="e-lugar" name="lugar" type="text" placeholder="Uno de nuestros locales, tu finca o «por decidir»" required aria-describedby="e-lugar-err"><p class="error" id="e-lugar-err">Dinos dónde será o escribe «por decidir».</p></div>
        <div class="field"><label for="e-nombre">Nombre</label><input class="input" id="e-nombre" name="nombre" type="text" autocomplete="name" required aria-describedby="e-nombre-err"><p class="error" id="e-nombre-err">Escribe tu nombre.</p></div>
        <div class="field"><label for="e-tel">Teléfono de contacto</label><input class="input" id="e-tel" name="telefono" type="tel" autocomplete="tel" inputmode="tel" pattern="[0-9 +()\\-]{9,}" required aria-describedby="e-tel-err"><p class="error" id="e-tel-err">Escribe un teléfono de al menos 9 cifras.</p></div>
        <div class="field field--full"><label for="e-mensaje">Algo más que debamos saber <span class="hint">(opcional)</span></label><textarea class="input" id="e-mensaje" name="mensaje"></textarea></div>
        <div class="field field--full"><label class="check" for="e-priv"><input id="e-priv" name="privacidad" type="checkbox" required aria-describedby="e-priv-err"> <span>He leído y acepto la <a href="privacidad.html" target="_blank" rel="noopener">Política de privacidad</a> y el <a href="aviso-legal.html" target="_blank" rel="noopener">Aviso legal</a>.</span></label><p class="error" id="e-priv-err">Necesitamos que aceptes la política de privacidad para preparar el presupuesto.</p></div>
        <p class="form__info field--full"><strong>Protección de datos.</strong> Responsable: el titular de Britos Restauración &amp; Eventos. Finalidad: preparar y enviarte tu presupuesto. Legitimación: tu consentimiento. Destinatarios: no se ceden a terceros, salvo obligación legal. Derechos: acceso, rectificación, supresión y otros, como explica la <a href="privacidad.html">Política de privacidad</a>.</p>
        <div class="form__foot"><button class="btn btn--lg" type="submit">Pedir presupuesto</button></div>
        <p class="form__status" role="status" hidden></p>
      </form>
    </div>
  </div>
</section>
`;
