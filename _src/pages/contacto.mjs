export const meta = {
  out: 'contacto.html', theme: 'casa', current: 'contacto', preload: 'dsc06948',
  title: 'Contacto y cómo llegar · Casa de los Britos',
  description: 'Casa de los Britos: C. Meléndez Valdés, 14, 06225 Ribera del Fresno (Badajoz). Teléfono, horario, mapa y formulario para consultas generales y prensa.',
};

export const body = ({ DATA, im, ico }) => `
<section class="hero hero--short" data-enter aria-labelledby="contacto-title">
  <div class="hero__text">
    <div>
      <h1 id="contacto-title" class="display primor enter" style="--i:0">Contacto</h1>
      <p class="lead mt-m enter" style="--i:1">En la calle que lleva el nombre de Meléndez Valdés, en el corazón de Ribera del Fresno.</p>
    </div>
    <div class="hero__cta enter" style="--i:2" data-callbar-hide>
      <a class="btn btn--lg" href="${DATA.maps}" target="_blank" rel="noopener">${ico('pin')}Cómo llegar</a>
      <a class="link" href="${DATA.tel.href}">${ico('phone')}<span class="num">${DATA.tel.display}</span></a>
    </div>
  </div>
  <div class="hero__media">
    <figure class="ph">${im('dsc06948', 'Placa con el escudo de Restaurante Casa de los Britos en la fachada', { sizes: '(max-width: 899px) 100vw, 58vw', eager: true, big: true, pos: '40% center' })}</figure>
  </div>
</section>

<section class="section" aria-labelledby="visita-title">
  <div class="wrap">
    <div class="split split--top">
      <div class="stack">
        <h2 id="visita-title" class="h2">Visítanos</h2>
        <address class="lead" style="color:var(--ink)">${DATA.address[0]}<br>${DATA.address[1]}<br>${DATA.address[2]}</address>
        <div class="contact-rows" style="width:100%">
          <a href="${DATA.tel.href}"><small>Reservas</small><b>${DATA.tel.display}</b></a>
          <a href="${DATA.telGrupos.href}"><small>Grupos y eventos</small><b>${DATA.telGrupos.display}</b></a>
          <div><small>Síguenos</small><span><a class="link" href="${DATA.instagram}" target="_blank" rel="noopener">Instagram</a> · <a class="link" href="${DATA.tiktok}" target="_blank" rel="noopener">TikTok</a> · @casadelosbritos</span></div>
        </div>
        <p class="status"><i></i><span data-live>Abrimos de jueves a domingo</span></p>
        <dl class="hours" style="width:100%">
          <div data-days="4,5,6,0"><dt>Jueves a domingo</dt><dd>12:30 – 23:30</dd></div>
          <div data-days="1,2,3"><dt>Lunes a miércoles</dt><dd>Cerrado</dd></div>
        </dl>
      </div>
      <div class="stack">
        <div class="map" style="width:100%">
          <div class="map__gate" data-map-gate><p>El mapa lo sirve Google Maps, que puede instalar sus propias cookies. <a href="cookies.html">Más información</a>.</p><button class="btn" type="button" data-map-load>${ico('pin')}Ver el mapa</button></div>
          <iframe hidden title="Mapa: Casa de los Britos en Ribera del Fresno" referrerpolicy="no-referrer-when-downgrade"
            data-src="https://maps.google.com/maps?q=C.%20Mel%C3%A9ndez%20Vald%C3%A9s%2014%2C%2006225%20Ribera%20del%20Fresno&amp;z=16&amp;output=embed"></iframe>
        </div>
        <a class="btn btn--ghost" href="${DATA.maps}" target="_blank" rel="noopener">${ico('pin')}Abrir en Google Maps</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--surface" aria-labelledby="form-title">
  <div class="wrap">
    <div class="split split--top">
      <div class="stack">
        <h2 id="form-title" class="h2">Escríbenos</h2>
        <p class="lead">Para consultas generales, prensa o proveedores.</p>
        <p class="prose"><strong>Las reservas de mesa no se gestionan por aquí.</strong> Para reservar, llama al <a class="num" href="${DATA.tel.href}" style="text-decoration:underline;text-underline-offset:4px;color:var(--ink)">${DATA.tel.display}</a>.</p>
      </div>
      <form class="form" data-form="contacto" data-subject="Consulta desde la web de Casa de los Britos" data-success="Gracias. Hemos recibido tu mensaje y te contestaremos pronto." novalidate>
        <div class="field"><label for="c-nombre">Nombre</label><input class="input" id="c-nombre" name="nombre" type="text" autocomplete="name" required aria-describedby="c-nombre-err"><p class="error" id="c-nombre-err">Escribe tu nombre.</p></div>
        <div class="field"><label for="c-email">Correo electrónico</label><input class="input" id="c-email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="c-email-err"><p class="error" id="c-email-err">Escribe un correo válido, por ejemplo nombre@correo.es.</p></div>
        <div class="field"><label for="c-tel">Teléfono <span class="hint">(opcional)</span></label><input class="input" id="c-tel" name="telefono" type="tel" autocomplete="tel" inputmode="tel"></div>
        <div class="field"><label for="c-motivo">Motivo</label><select class="input" id="c-motivo" name="motivo" required aria-describedby="c-motivo-err"><option value="">Elige una opción</option><option>Consulta general</option><option>Prensa</option><option>Proveedores</option><option>Otro</option></select><p class="error" id="c-motivo-err">Elige el motivo de tu mensaje.</p></div>
        <div class="field field--full"><label for="c-mensaje">Mensaje</label><textarea class="input" id="c-mensaje" name="mensaje" required aria-describedby="c-mensaje-err"></textarea><p class="error" id="c-mensaje-err">Cuéntanos en qué podemos ayudarte.</p></div>
        <div class="field field--full"><label class="check" for="c-priv"><input id="c-priv" name="privacidad" type="checkbox" required aria-describedby="c-priv-err"> He leído y acepto la <a href="privacidad.html" target="_blank" rel="noopener">Política de privacidad</a> y el <a href="aviso-legal.html" target="_blank" rel="noopener">Aviso legal</a>.</label><p class="error" id="c-priv-err">Necesitamos que aceptes la política de privacidad para poder contestarte.</p></div>
        <p class="form__info field--full"><strong>Protección de datos.</strong> Responsable: el titular de Casa de los Britos. Finalidad: responder a tu consulta. Legitimación: tu consentimiento. Destinatarios: no se ceden a terceros, salvo obligación legal. Derechos: acceso, rectificación, supresión y otros, como explica la <a href="privacidad.html">Política de privacidad</a>.</p>
        <div class="form__foot"><button class="btn btn--lg" type="submit">Enviar mensaje</button></div>
        <p class="form__status" role="status" hidden></p>
      </form>
    </div>
  </div>
</section>
`;
