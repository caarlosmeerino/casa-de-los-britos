export const meta = {
  out: 'el-restaurante.html', theme: 'casa', current: 'restaurante', preload: 'dsc06935',
  title: 'El restaurante · Casa de los Britos',
  description: 'El restaurante en la antigua casa solariega de los Britos, en Ribera del Fresno: comedor, salón privado y bodega, y la historia de una casa que marcó el pulso del pueblo.',
};

export const body = ({ DATA, im, ico }) => `
<section class="hero hero--short" data-enter aria-labelledby="restaurante-title">
  <div class="hero__text">
    <div>
      <h1 id="restaurante-title" class="display primor enter" style="--i:0">El restaurante</h1>
      <p class="lead mt-m enter" style="--i:1">Un restaurante vestido de fiesta en la antigua casa solariega de los Britos, restaurada para sentarse a comer: puertas de madera y cristal, mármol y luz cálida.</p>
    </div>
    <div class="hero__cta enter" style="--i:2" data-callbar-hide>
      <a class="btn btn--lg" href="${DATA.tel.href}">${ico('phone')}Reservar · <span class="num">${DATA.tel.display}</span></a>
      <a class="link" href="#historia">La historia ${ico('arrow')}</a>
    </div>
  </div>
  <div class="hero__media">
    <figure class="ph">${im('dsc06935', 'Puertas de madera bajo el arco con vidriera de colores, entre mesas preparadas', { sizes: '(max-width: 899px) 100vw, 58vw', eager: true, big: true, pos: 'center 35%' })}</figure>
  </div>
</section>

<section class="section" id="espacios" aria-labelledby="espacios-title">
  <div class="wrap">
    <div class="head">
      <h2 id="espacios-title" class="h2">Nuestros salones y la bodega</h2>
      <p class="lead">Cada sala tiene su carácter. El comedor principal para el día a día, el salón privado para las celebraciones y la bodega siempre a la vista, para elegir el vino con calma.</p>
    </div>
    <div class="spaces">
      <article class="space">
        <figure class="ph ph--r45">${im('4e3a8231', 'Mesas de mármol junto a la ventana del patio', { sizes: '(max-width: 899px) 100vw, 33vw' })}</figure>
        <span class="n">i.</span>
        <h3>Comedor principal</h3>
        <p>Mesas de mármol junto a las ventanas del patio.</p>
      </article>
      <article class="space">
        <figure class="ph ph--r45">${im('4e3a8251', 'Mesa larga del salón privado tras las puertas de cristal', { sizes: '(max-width: 899px) 100vw, 33vw' })}</figure>
        <span class="n">ii.</span>
        <h3>Salón privado</h3>
        <p>Mesa larga tras las puertas de cristal, para comidas de familia, grupos y empresa.</p>
      </article>
      <article class="space">
        <figure class="ph ph--r45">${im('4e3a8236', 'Botellero iluminado junto a una mesa preparada', { sizes: '(max-width: 899px) 100vw, 33vw' })}</figure>
        <span class="n">iii.</span>
        <h3>La bodega</h3>
        <p>Vinos de Extremadura, Rioja, Ribera del Duero y espumosos.</p>
      </article>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="rincones-title">
  <div class="wrap">
    <div class="head">
      <h2 id="rincones-title" class="h2">La luz, la sobremesa</h2>
      <p class="lead">Al reservar puedes pedirnos la mesa que prefieras: junto a la ventana, bajo los apliques o cerca de la bodega.</p>
    </div>
    <div class="gallery">
      <figure class="ph">${im('4e3a8246', 'Mesa junto al aplique de luz sobre la pared de barro', { sizes: '(max-width: 699px) 100vw, 50vw', big: true })}</figure>
      <figure class="ph">${im('4e3a8214', 'Puerta de madera y cristal que da a la sala', { sizes: '(max-width: 699px) 50vw, 50vw', pos: 'center 40%' })}</figure>
      <figure class="ph">${im('4e3a8241', 'Mesa puesta delante del botellero', { sizes: '(max-width: 699px) 50vw, 50vw', pos: 'center 55%' })}</figure>
      <figure class="ph">${im('4e3a8243', 'Plato, copas y servilleta bordada con el escudo del restaurante', { sizes: '(max-width: 699px) 50vw, 33vw' })}</figure>
      <figure class="ph">${im('4e3a8597', 'Sirviendo vino tinto durante la comida', { sizes: '(max-width: 699px) 50vw, 33vw' })}</figure>
      <figure class="ph">${im('dsc06941', 'Mesas de la sala con la luz cálida de la pared', { sizes: '(max-width: 699px) 50vw, 33vw' })}</figure>
    </div>
  </div>
</section>

<section class="section section--surface" id="historia" aria-labelledby="historia-title">
  <div class="wrap">
    <div class="head">
      <h2 id="historia-title" class="h2">La casa que marcó el pulso del pueblo</h2>
      <p class="lead">El restaurante toma su nombre de la Casa Solariega de los Britos, en el corazón de Ribera del Fresno.</p>
    </div>
    <ol class="timeline">
      <li>
        <span class="when">Finales del siglo XIX</span>
        <h3>La casa solariega</h3>
        <p>La Casa Solariega de los Britos marcó el pulso social de Ribera del Fresno. Pasó por herencia de don José María Gragera y Brito a doña María del Valle Gragera y Zalamea, y el apellido Brito es el que hoy recupera su nombre.</p>
      </li>
      <li>
        <span class="when">El Casino</span>
        <h3>Punto de encuentro del pueblo</h3>
        <p>Una parte del inmueble albergó el Casino de Recreo, hoy sede del Círculo La Unión. Durante generaciones fue lugar de reunión y celebración para los vecinos.</p>
      </li>
      <li>
        <span class="when">1928 – 1929</span>
        <h3>Una fachada para el recuerdo</h3>
        <p>El fotógrafo Fernando Garrorena Arcas retrató la fachada original. Esa imagen se conserva hoy en la Fototeca de la Diputación de Badajoz.</p>
      </li>
      <li>
        <span class="when">Diciembre de 2025</span>
        <h3>Abre el restaurante</h3>
        <p>José Miguel Suárez Merino rescata la memoria de la antigua Casa de los Britos. Tras una reforma integral, abre como restaurante con cocina de producto de la tierra.</p>
      </li>
    </ol>
  </div>
</section>

<section class="close" aria-labelledby="reserva-title">
  <div class="wrap close__in">
    <div>
      <h2 id="reserva-title" class="h2">Un restaurante con historia, abierto al pueblo</h2>
      <p class="phone-big num mt-m"><a href="${DATA.tel.href}">${DATA.tel.display}</a></p>
    </div>
    <div class="close__side">
      <p class="status"><i></i><span data-live>Abrimos de jueves a domingo</span></p>
      <a class="link" href="carta.html">Ver la carta ${ico('arrow')}</a>
    </div>
  </div>
</section>
`;
