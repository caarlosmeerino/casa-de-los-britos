export const meta = {
  out: 'reservas.html', theme: 'casa', current: 'reservas', og: '4e3a8613',
  title: 'Reservas por teléfono · Casa de los Britos',
  description: 'Reserva tu mesa en Casa de los Britos llamando al 635 82 40 92. Grupos de más de 12 personas: 609 75 16 47. Abrimos de jueves a domingo.',
};

export const body = ({ DATA, im, ico }) => `
<section class="section section--surface" data-enter aria-labelledby="reservas-title" style="padding-top:calc(var(--head-space) + clamp(40px, 6vw, 96px))">
  <div class="wrap">
    <div class="split">
      <div class="stack">
        <h1 id="reservas-title" class="display primor enter" style="--i:0">Reservas</h1>
        <p class="lead enter" style="--i:1">Llámanos y te guardamos la mesa. Las reservas se hacen solo por teléfono y te atendemos de jueves a domingo.</p>
        <div class="contact-rows enter" style="--i:2; width:100%" data-callbar-hide>
          <a href="${DATA.tel.href}"><small>Reservas</small><b>${DATA.tel.display}</b></a>
          <a href="${DATA.telGrupos.href}"><small>Grupos de más de 12 personas</small><b>${DATA.telGrupos.display}</b></a>
        </div>
        <div class="hero__cta enter" style="--i:3">
          <a class="btn btn--lg" href="${DATA.tel.href}">${ico('phone')}Llamar ahora</a>
          <button class="btn btn--lg btn--ghost copy-btn" type="button" data-copy="${DATA.tel.display}">${ico('copy')}<span data-copy-label>Copiar número</span><span data-copied>Número copiado</span></button>
        </div>
        <p class="status enter" style="--i:4"><i></i><span data-live>Abrimos de jueves a domingo</span></p>
      </div>
      <figure class="ph ph--r45 enter" style="--i:1">${im('4e3a8613', 'Cliente probando una copa de vino tinto en la sala', { sizes: '(max-width: 899px) 100vw, 46vw', eager: true, big: true })}</figure>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="horario-title">
  <div class="wrap">
    <div class="split split--top">
      <div class="stack">
        <h2 id="horario-title" class="h2">Horario</h2>
        <p class="lead">Si llamas durante el servicio y no contestamos, vuelve a intentarlo en unos minutos: estaremos atendiendo mesas.</p>
      </div>
      <dl class="hours">
        <div data-days="4"><dt>Jueves</dt><dd>12:30 – 23:30</dd></div>
        <div data-days="5"><dt>Viernes</dt><dd>12:30 – 23:30</dd></div>
        <div data-days="6"><dt>Sábado</dt><dd>12:30 – 23:30</dd></div>
        <div data-days="0"><dt>Domingo</dt><dd>12:30 – 23:30</dd></div>
        <div data-days="1,2,3"><dt>Lunes a miércoles</dt><dd>Cerrado</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="peticiones-title">
  <div class="wrap">
    <div class="head">
      <h2 id="peticiones-title" class="h2">Dínoslo al reservar</h2>
      <p class="lead">Cuanto más sepamos al llamar, mejor preparamos tu mesa.</p>
    </div>
    <div class="facts">
      <div><h3 class="h3">Grupos</h3><p>Para más de 12 personas, llama al ${DATA.telGrupos.display}. Te proponemos mesa o uno de nuestros salones y organizamos el menú con antelación.</p></div>
      <div><h3 class="h3">Alergias e intolerancias</h3><p>Cuéntanos qué alergias o intolerancias hay en la mesa. Lo anotamos con la reserva y en sala te indicamos qué platos puedes tomar.</p></div>
      <div><h3 class="h3">Niños, tronas y carritos</h3><p>Si vienes con niños, dinos cuántas tronas necesitas o si traes carrito, y te damos una mesa con sitio.</p></div>
      <div><h3 class="h3">Una mesa concreta</h3><p>¿Junto a la ventana, en el salón privado o cerca de la bodega? Pídela al llamar y haremos lo posible por guardártela.</p></div>
      <div><h3 class="h3">Arroces</h3><p>Los arroces son para un mínimo de dos personas. Si los quieres, dilo al reservar.</p></div>
      <div><h3 class="h3">Celebraciones</h3><p>Bodas, bautizos, comuniones o catering: de eso se encarga Britos Restauración &amp; Eventos.</p><a class="link" href="eventos.html">Ir a Britos Eventos ${ico('arrow')}</a></div>
    </div>
  </div>
</section>

<section class="close" aria-labelledby="cierre-title">
  <div class="wrap close__in">
    <div>
      <h2 id="cierre-title" class="h2">Te esperamos en la calle del poeta</h2>
      <p class="lead mt-s">${DATA.address[0]}, Ribera del Fresno.</p>
    </div>
    <div class="close__side">
      <a class="link" href="contacto.html">Cómo llegar ${ico('arrow')}</a>
    </div>
  </div>
</section>
`;
