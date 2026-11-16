export const meta = {
  out: 'eventos.html', theme: 'britos', current: '', preload: 'britos-montaje-01', og: 'britos-eventos-01',
  title: 'Britos Restauración & Eventos · Bodas, bautizos, comuniones y catering',
  description: 'Grupo de restauración y eventos en Ribera del Fresno: Casa de los Britos, Ribbo, Ca·Nostra, Café Hibernia y Bianco. Bodas, bautizos, comuniones y catering. Tel. 609 75 16 47.',
};

// Celebraciones: lo único de la página que lleva color
const EVENTOS = [
  { id: 'bodas', tipo: 'Boda', t: 'Bodas', w: 'bodas', c: 'var(--mostaza)', img: 'britos-montaje-01', pos: 'center 60%', p: 'Banquete, cóctel y barra libre, en salón o al aire libre.', l: ['Cóctel y banquete', 'Barra libre y recena', 'Montaje de mesa'] },
  { id: 'comuniones', tipo: 'Comunión', t: 'Comuniones', w: 'comuniones', c: 'var(--pizarra)', img: 'ribbo-03', pos: 'center 50%', p: 'Menús de adulto e infantil, en salones pensados para familias.', l: ['Menú infantil', 'Salón privado', 'Tarta y sobremesa'] },
  { id: 'bautizos', tipo: 'Bautizo', t: 'Bautizos', w: 'bautizos', c: 'var(--capsula-burdeos)', img: 'hibernia-02', pos: 'center 50%', p: 'Bautizos, cumpleaños, aniversarios y reuniones familiares.', l: ['Salones privados', 'Menús cerrados', 'Coctelería'] },
  { id: 'catering', tipo: 'Catering', t: 'Catering', w: 'catering', c: 'var(--oliva)', img: 'britos-eventos-01', pos: 'center 40%', p: 'Llevamos la cocina y el servicio a tu finca, tu casa o tu espacio.', l: ['Cocina en destino', 'Personal de sala', 'Menaje y mobiliario'] },
  { id: 'empresa', tipo: 'Evento de empresa', t: 'Empresa', w: 'empresas', c: 'var(--evento-britos)', img: 'ribbo-02', pos: 'center 40%', p: 'Comidas de equipo, cenas de Navidad y presentaciones.', l: ['Menús de grupo', 'Facturación a empresa', 'Presentaciones'] },
];

// Nuestras casas: lista tipográfica; la foto asoma al pasar el ratón
const MARCAS = [
  { name: 'Casa de los Britos', type: 'Restaurante', img: 'dsc06935', href: 'index.html' },
  { name: 'Ribbo', type: 'Restaurante', img: 'ribbo-03' },
  { name: 'Ca·Nostra', type: 'Bar y restaurante', img: 'canostra-01' },
  { name: 'Café Hibernia', type: 'Café y copas', img: 'hibernia-01' },
  { name: 'Bianco', type: 'Terraza', img: 'bianco-01' },
];

const pad = (n) => String(n).padStart(2, '0');

export const body = ({ DATA, im, ico }) => `
<section class="bx-hero" aria-labelledby="ev-title">
  <div class="bx-hero__meta wrap"><span>Restauración &amp; Eventos</span><span>Ribera del Fresno · Tierra de Barros</span></div>
  <h1 id="ev-title" class="bx-hero__word"><span class="sr-only">Britos Restauración &amp; Eventos</span><span aria-hidden="true">Britos</span></h1>
  <div class="bx-hero__foot wrap">
    <p class="bx-hero__line">Celebramos <span class="sr-only">bodas, comuniones, bautizos, catering y eventos de empresa</span><span class="bx-tick" aria-hidden="true"><span class="bx-tick__in">${[...EVENTOS, EVENTOS[0]].map((e) => `<span style="color:${e.c}">${e.w}</span>`).join('')}</span></span></p>
    <div class="bx-hero__cta">
      <a class="bx-link" href="#presupuesto">Pedir presupuesto ${ico('arrow')}</a>
      <a class="bx-link" href="${DATA.telGrupos.href}">${ico('phone')}<span class="num">${DATA.telGrupos.display}</span></a>
    </div>
  </div>
  <figure class="bx-hero__ph">${im('britos-montaje-01', 'Mesas de banquete vestidas con mantelería de lino, cristalería y flores en una carpa', { sizes: '100vw', eager: true, big: true, pos: 'center 58%' })}</figure>
</section>

<section class="bx-sec" id="grupo" aria-labelledby="grupo-title">
  <div class="wrap">
    <p class="bx-k bx-r">01 — El grupo</p>
    <h2 id="grupo-title" class="bx-statement bx-r">Cinco casas. Un mismo equipo. <em>Cada celebración, a medida.</em></h2>
  </div>
</section>

<section class="bx-sec bx-sec--tight" id="marcas" aria-labelledby="marcas-title">
  <div class="wrap">
    <h2 id="marcas-title" class="bx-k bx-r">02 — Nuestras casas</h2>
    <ul class="bx-list">
      ${MARCAS.map((m, i) => {
        const inner = `<span class="bx-list__n">${pad(i + 1)}</span><span class="bx-list__name">${m.name}</span><span class="bx-list__type">${m.type}${m.href ? ` ${ico('arrow')}` : ''}</span><span class="bx-list__img" aria-hidden="true">${im(m.img, '', { sizes: '280px' })}</span>`;
        return `<li class="bx-r">${m.href ? `<a class="bx-list__row" href="${m.href}">${inner}</a>` : `<div class="bx-list__row">${inner}</div>`}</li>`;
      }).join('\n      ')}
    </ul>
  </div>
</section>

<section class="bx-sec bx-ev" id="celebraciones" aria-labelledby="cel-title">
  <div class="wrap">
    <h2 id="cel-title" class="bx-k bx-r">03 — Celebraciones</h2>
    <div class="bx-acc">
      ${EVENTOS.map((e, i) => `<details class="bx-ev__item bx-r" id="${e.id}" name="celebraciones" style="--c:${e.c}"${i === 0 ? ' open' : ''}>
        <summary><span class="bx-ev__n">${pad(i + 1)}</span><span class="bx-ev__t">${e.t}</span><span class="bx-ev__x" aria-hidden="true"></span></summary>
        <div class="bx-ev__body">
          <figure class="bx-ev__ph">${im(e.img, '', { sizes: '(max-width: 799px) 100vw, 45vw', pos: e.pos })}</figure>
          <div class="bx-ev__txt">
            <p>${e.p}</p>
            <ul>${e.l.map((x) => `<li>${x}</li>`).join('')}</ul>
            <a class="bx-ev__cta" href="#presupuesto" data-tipo="${e.tipo}">Pedir presupuesto ${ico('arrow')}</a>
          </div>
        </div>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>
<script>
(() => {
  const open = () => { const d = location.hash && document.querySelector('details' + location.hash); if (d) d.open = true; };
  addEventListener('hashchange', open); open();
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-tipo]'); if (!a) return;
    const sel = document.getElementById('e-tipo'); if (sel) sel.value = a.dataset.tipo;
  });
})();
</script>

<section class="bx-sec" id="como" aria-labelledby="como-title">
  <div class="wrap">
    <h2 id="como-title" class="bx-k bx-r">04 — Cómo trabajamos</h2>
    <p class="bx-statement bx-r">Una sola persona del equipo lleva tu evento de principio a fin.</p>
    <ol class="bx-steps">
      <li class="bx-r"><span>01</span>La idea</li>
      <li class="bx-r"><span>02</span>El espacio</li>
      <li class="bx-r"><span>03</span>El menú</li>
      <li class="bx-r"><span>04</span>El día</li>
    </ol>
  </div>
</section>

<section class="bx-end" id="presupuesto" aria-labelledby="pres-title">
  <div class="wrap">
    <p class="bx-k">05 — Hablemos</p>
    <h2 id="pres-title" class="bx-end__t">¿Lo celebramos?</h2>
    <a class="bx-end__tel num" href="${DATA.telGrupos.href}">${DATA.telGrupos.display}</a>
    <p class="bx-end__or">O cuéntanos tu celebración y te llamamos:</p>
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
</section>
`;
