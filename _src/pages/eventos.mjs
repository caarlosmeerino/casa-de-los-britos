export const meta = {
  out: 'eventos.html', theme: 'britos', current: '', og: 'britos-eventos-01',
  title: 'Britos Restauración & Eventos · Bodas, bautizos, comuniones y catering',
  description: 'Diseñamos tu evento a medida: bodas, bautizos, comuniones, catering y eventos de empresa en Ribera del Fresno y Tierra de Barros. Llama al 609 75 16 47.',
};

const pending = (txt, ico) => `<div class="ph ph--pending"><div>${ico('photo')}<span>${txt}</span></div></div>`;

export const body = ({ DATA, im, ico }) => `
<section class="bhero" data-enter aria-labelledby="ev-title">
  <div class="bhero__text">
    <img class="bhero__logo enter" style="--i:0" src="assets/logos/britos-logotipo-burdeos.png" alt="Britos Restauración &amp; Eventos" width="900" height="248">
    <h1 id="ev-title" class="enter" style="--i:1">Diseñamos tu evento a medida</h1>
    <p class="lead enter" style="--i:2">Bodas, bautizos, comuniones, catering y eventos privados, en el espacio que mejor encaje con cada celebración.</p>
    <div class="bhero__cta enter" style="--i:3" data-callbar-hide>
      <a class="phone-pill" href="${DATA.telGrupos.href}"><span>${ico('phone')}</span><span class="num">${DATA.telGrupos.display}</span></a>
      <a class="btn btn--lg btn--ghost" href="#presupuesto">Pedir presupuesto</a>
    </div>
  </div>
  <!-- PENDIENTE: fotos originales de bodas, bautizos y comuniones (sin el filtro del cartel) -->
  <div class="capsules" role="list" aria-label="Celebraciones">
    <a role="listitem" class="capsule capsule--mostaza" style="--i:0" href="#bodas">${im('britos-montaje-01', '', { sizes: '(max-width: 899px) 100vw, 18vw', pos: 'center 60%' })}<span>Bodas</span></a>
    <a role="listitem" class="capsule capsule--burdeos" style="--i:1" href="#bautizos"><span>Bautizos</span></a>
    <a role="listitem" class="capsule capsule--pizarra" style="--i:2" href="#comuniones"><span>Comuniones</span></a>
    <a role="listitem" class="capsule capsule--oliva" style="--i:3" href="#catering">${im('britos-eventos-01', '', { sizes: '(max-width: 899px) 100vw, 18vw', pos: 'center 40%' })}<span>Catering</span></a>
  </div>
</section>

<section class="section" id="celebraciones" aria-labelledby="cel-title">
  <div class="wrap">
    <div class="head">
      <h2 id="cel-title" class="h2">Celebraciones a medida</h2>
      <p class="lead">Cinco casas y un mismo equipo: el grupo que hemos formado a partir de Casa de los Britos.</p>
    </div>
    <div class="services">
      <article class="service" id="bodas">
        <div><h3>Bodas</h3><p>Banquete, cóctel de bienvenida y barra libre, en salón o al aire libre.</p>
          <ul><li>Cóctel y banquete</li><li>Barra libre y recena</li><li>Montaje y decoración de mesa</li></ul></div>
        <div class="service__cap" style="--c:var(--mostaza)" aria-hidden="true">${im('britos-montaje-01', '', { sizes: '120px', pos: 'center 60%' })}</div>
      </article>
      <article class="service" id="bautizos">
        <div><h3>Bautizos y celebraciones</h3><p>Cumpleaños, aniversarios, bautizos y reuniones familiares.</p>
          <ul><li>Salones privados</li><li>Menús cerrados</li><li>Coctelería en Bianco y Hibernia</li></ul></div>
        <div class="service__cap" style="--c:var(--capsula-burdeos)" aria-hidden="true"></div>
      </article>
      <article class="service" id="comuniones">
        <div><h3>Comuniones</h3><p>Menús de adulto e infantil, en salones pensados para familias.</p>
          <ul><li>Menú infantil</li><li>Salón privado</li><li>Tarta y sobremesa</li></ul></div>
        <div class="service__cap" style="--c:var(--pizarra)" aria-hidden="true"></div>
      </article>
      <article class="service" id="catering">
        <div><h3>Catering</h3><p>Llevamos cocina y servicio a fincas, casas y espacios propios.</p>
          <ul><li>Cocina en destino</li><li>Personal de sala</li><li>Menaje y mobiliario</li></ul></div>
        <div class="service__cap" style="--c:var(--oliva)" aria-hidden="true">${im('britos-eventos-01', '', { sizes: '120px', pos: 'center 40%' })}</div>
      </article>
      <article class="service service--wide" id="empresa">
        <div><h3>Empresa</h3><p>Comidas de equipo, cenas de Navidad y presentaciones.</p>
          <ul><li>Menús de grupo</li><li>Facturación a empresa</li><li>Espacios para presentaciones</li></ul></div>
        <div class="service__cap" style="--c:var(--britos)" aria-hidden="true"></div>
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
      <li><span class="n">2</span><h3>Elegimos el espacio</h3><p>Una de nuestras cinco casas o tu propia finca.</p></li>
      <li><span class="n">3</span><h3>Prueba de menú</h3><p>Cerramos el menú contigo, con opciones para alergias.</p></li>
      <li><span class="n">4</span><h3>El gran día</h3><p>Montaje, cocina y servicio a cargo de nuestro equipo.</p></li>
    </ol>
  </div>
</section>

<section class="section" id="casas" aria-labelledby="casas-title">
  <div class="wrap">
    <div class="head">
      <h2 id="casas-title" class="h2">Un espacio para cada ocasión</h2>
      <p class="lead">Nuestras cinco casas, o la finca que tú elijas.</p>
    </div>
    <ul class="houses">
      <li><b>Casa de los Britos</b><span>Restaurante</span><a href="index.html">Ver el restaurante</a></li>
      <li><b>Ribbo Restaurant</b><span>Restaurante</span></li>
      <li><b>Ca·Nostra</b><span>Bar &amp; restaurante</span></li>
      <li><b>Bianco Terrace</b><span>Terraza</span></li>
      <li><b>Hibernia</b><span>Café &amp; copas</span></li>
    </ul>
  </div>
</section>

<section class="section" id="galeria" aria-labelledby="gal-title">
  <div class="wrap">
    <div class="head">
      <h2 id="gal-title" class="h2">Montajes y eventos</h2>
      <p class="lead">Algunas de las celebraciones que hemos preparado.</p>
    </div>
    <!-- PENDIENTE: sustituir cada hueco por fotos reales de eventos (mínimo 1600 px de ancho) -->
    <div class="gallery">
      <figure class="ph">${im('britos-montaje-01', 'Mesas redondas vestidas con mantelería de lino, cristalería y centros de flores de otoño en una carpa', { sizes: '(max-width: 699px) 100vw, 50vw', pos: 'center 55%' })}</figure>
      <figure class="ph">${im('britos-eventos-01', 'Camarero de Britos con delantal bordado sirviendo aperitivos', { sizes: '(max-width: 699px) 50vw, 50vw', pos: 'center 40%' })}</figure>
      ${pending('Foto de bautizo: mesas de cóctel vestidas', ico)}
      ${pending('Foto de comunión: salón montado', ico)}
      ${pending('Foto de evento de empresa', ico)}
      ${pending('Foto de detalle: mantelería y menaje', ico)}
    </div>
  </div>
</section>

<section class="section section--surface" id="presupuesto" aria-labelledby="pres-title" data-callbar-hide>
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
        <div class="field"><label for="e-lugar">Lugar</label><input class="input" id="e-lugar" name="lugar" type="text" placeholder="Una de las casas, tu finca o «por decidir»" required aria-describedby="e-lugar-err"><p class="error" id="e-lugar-err">Dinos dónde será o escribe «por decidir».</p></div>
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
