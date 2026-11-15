export const meta = {
  out: 'carta.html', theme: 'casa', current: 'carta', preload: '4e3a8199',
  title: 'La carta · Casa de los Britos',
  description: 'La carta de Casa de los Britos: entrantes de la tierra, ibérico de bellota, pescados, carnes y vacuno a la brasa, arroces, postres caseros y bodega.',
};

// Carta y bodega del restaurante. Sin precios ni alérgenos por decisión del cliente.
// [nombre, nuevo, nota]  (1 = plato nuevo en carta)
const CARTA = [
  { id: 'tierra', title: 'Entrantes de la tierra', intro: 'Ibérico extremeño de bellota y quesos para abrir la mesa.', img: ['4e3a8357', 'Jamón ibérico de bellota en plato de cerámica'], items: [
    ['Jamón ibérico extremeño 100% de bellota'], ['Lomito ibérico extremeño 100% de bellota'], ['Tabla de quesos'], ['Surtido de ibéricos'], ['Cecina de angus', 1]] },
  { id: 'frios', title: 'Entrantes fríos', intro: 'Ensaladas, gambas y conservas de primera.', img: ['dsc07162', 'Ensalada de quesos con tomate'], items: [
    ['Anchoas del Cantábrico', 0, 'por unidad'], ['Ensalada de tomate con melva'], ['Ensalada de la huerta'], ['Ensalada de quesos'], ['Gambas blancas de Huelva'], ['Foie de pato'], ['Ensaladilla de gambas', 1]] },
  { id: 'calientes', title: 'Calientes', intro: 'Fritura, cuchara y platos para compartir.', img: ['4e3a8434', 'Croquetas caseras en bandeja'], items: [
    ['Tortillitas de camarones', 1, 'por unidad'], ['Croquetas selección'], ['Puntillitas'], ['Chocos fritos'], ['Fritura variada de pescado', 1], ['Flautín de gamba', 1, 'por unidad'], ['Almejas a la marinera'], ['Rejos', 1], ['Berenjenas con miel de caña', 1], ['Papas revolconas con jamón ibérico', 1], ['Revuelto de setas con jamón ibérico', 1], ['Bacalao dorao']] },
  { id: 'pescados', title: 'Pescados', intro: 'Pescado de lonja, a la brasa y a la plancha.', img: ['dsc07323', 'Pulpo sobre la parrilla'], items: [
    ['Lubina a la espalda'], ['Pulpo a la brasa'], ['Chipirón a la plancha'], ['Lomo de bacalao a la bilbaína', 1], ['Sepia a la plancha'], ['Tartar de atún', 1]] },
  { id: 'carnes', title: 'Carnes', intro: 'Ibérico y vacuno, directos a la brasa.', img: ['dsc07346', 'Carne a la brasa cortada en la mesa'], items: [
    ['Presa ibérica a la brasa'], ['Pluma ibérica a la brasa'], ['Pestorejo a la brasa', 1], ['Carrilleras en salsa'], ['Solomillo con salsa de queso', 1]],
    sub: { title: 'Vacuno a la brasa', intro: 'Ternera extremeña, angus y wagyu.', items: [['Chuletón de ternera extremeña', 0, 'al peso'], ['Chuletón de angus', 0, 'al peso'], ['Solomillo de ternera'], ['Entrecot de ternera'], ['Wagyu']] },
    after: [['Chuletillas de cordero a la brasa'], ['Pechuga de pollo empanada'], ['Lagrimitas de pollo', 1]] },
  { id: 'arroces', title: 'Nuestros arroces', intro: 'Hechos al momento. Mínimo dos personas.', img: ['dsc07021', 'Arroz cayendo en la paella con el caldo hirviendo'], items: [
    ['Arroz caldoso de marisco'], ['Arroz de presa'], ['Arroz meloso de boletus'], ['Arroz meloso con carrilleras'], ['Arroz negro de chipirones y gambas', 1]] },
  { id: 'postres', title: 'Postres', intro: 'Caseros, hechos en nuestra cocina.', img: ['dsc07438', 'Torrija caramelizada con helado'], items: [
    ['Torrijas'], ['Tarta de queso o pistachos', 1], ['Arroz con leche'], ['Coulant de chocolate'], ['Crema catalana'], ['Cinnamon roll', 1], ['Mousse de limón', 1], ['Tarta de la abuela', 1], ['Tarta red velvet', 1], ['Bolas de helado']] },
];
const BODEGA = [
  { title: 'Vinos de Extremadura', items: [['Viña Puebla Crianza'], ['Viña Puebla Selección'], ['Balancines Huno Reserva'], ['Haragán'], ['Habla del Silencio'], ['Pentateuco'], ['Cooperativa Ribera del Fresno', 0, 'del pueblo'], ['Ruta del Conquistador Verdejo'], ['Dulce Eva'], ['Frizzante 5.5 Eva']] },
  { title: 'Rioja', items: [['Ramón Bilbao Crianza'], ['Ramón Bilbao Edición Limitada'], ['Muga Crianza'], ['Azpilicueta'], ['Marqués de Murrieta Reserva'], ['Luis Cañas Crianza']] },
  { title: 'Ribera del Duero', items: [['Finca Resalso'], ['Emilio Moro'], ['Tomás Postigo'], ['Pesquera Crianza'], ['Pago de Carraovejas'], ['Arzuaga Crianza'], ['Matarromera'], ['Malleolus']] },
  { title: 'Blancos y rosados', items: [['Ramón Bilbao Rosado', 0, 'rosado'], ['Ruiz Torres Verdejo'], ['Ramón Bilbao Verdejo'], ['Protos Verdejo'], ['José Pariente Verdejo'], ['Mar de Frades Albariño'], ['Martín Códax Albariño'], ['Marieta Albariño'], ['Mar de Frades Godello']] },
  { title: 'Espumosos', items: [['Cava Extrem Blanco Semiseco'], ['Buche Brut Nature'], ['Mumm Cordon Rouge'], ['Moët & Chandon Brut'], ['Veuve Clicquot']] },
];

const esc = (s) => s.replace(/&/g, '&amp;');
const rows = (items) => items.map(([n, nuevo, note]) => `<li><h3>${esc(n)}</h3>${nuevo ? '<span class="tag">Nuevo</span>' : note ? `<span class="tag">${note}</span>` : ''}</li>`).join('');

export const body = ({ DATA, im, ico }) => {
  const groups = CARTA.map((g) => `
  <section class="menu-group" data-group="${g.id}" id="${g.id}" aria-labelledby="g-${g.id}">
    <div class="menu-group__head">
      <h2 id="g-${g.id}" class="h2">${g.title}</h2>
      <p>${g.intro}</p>
      <figure class="ph ph--r43">${im(g.img[0], g.img[1], { sizes: '(max-width: 899px) 100vw, 320px' })}</figure>
    </div>
    <div>
      <ul class="menu-list">${rows(g.items)}</ul>
      ${g.sub ? `<div class="menu-sub"><h3 class="h3">${g.sub.title}</h3><p>${g.sub.intro}</p><ul class="menu-list">${rows(g.sub.items)}</ul></div>` : ''}
      ${g.after ? `<div class="menu-sub"><h3 class="h3">Y además</h3><ul class="menu-list">${rows(g.after)}</ul></div>` : ''}
    </div>
  </section>`).join('');

  const bodega = `
  <section class="menu-group" data-group="bodega" id="bodega" aria-labelledby="g-bodega">
    <div class="menu-group__head">
      <h2 id="g-bodega" class="h2">La bodega</h2>
      <p>Vinos de la tierra siempre a la vista, con un sitio para el del pueblo, y grandes referencias nacionales.</p>
      <figure class="ph ph--r43">${im('dsc06959', 'Botellero con vinos tintos', { sizes: '(max-width: 899px) 100vw, 320px' })}</figure>
    </div>
    <div>${BODEGA.map((b, i) => `<div class="${i ? 'menu-sub' : ''}"><h3 class="h3" style="margin-bottom:12px">${b.title}</h3><ul class="menu-list">${rows(b.items)}</ul></div>`).join('')}</div>
  </section>`;

  const chips = [['todo', 'Todo'], ...CARTA.map((g) => [g.id, g.title.replace('Entrantes de la tierra', 'De la tierra').replace('Nuestros arroces', 'Arroces')]), ['bodega', 'Bodega']]
    .map(([id, label], i) => `<button class="chip" type="button" data-filter="${id}" aria-pressed="${i === 0}">${label}</button>`).join('');

  return `
<section class="hero hero--short" data-enter aria-labelledby="carta-title">
  <div class="hero__text">
    <div>
      <h1 id="carta-title" class="display primor enter" style="--i:0">La carta</h1>
      <p class="lead mt-m enter" style="--i:1">De la tierra, del mar y de la brasa. Pregunta por las sugerencias del día y por la información de alérgenos.</p>
    </div>
    <div class="hero__cta enter" style="--i:2" data-callbar-hide>
      <a class="btn btn--lg" href="${DATA.tel.href}">${ico('phone')}Reservar · <span class="num">${DATA.tel.display}</span></a>
      <a class="link" href="#bodega">La bodega ${ico('arrow')}</a>
    </div>
  </div>
  <div class="hero__media">
    <figure class="ph">${im('4e3a8199', 'Carta de Casa de los Britos sobre la mesa, junto al plato y la servilleta bordada', { sizes: '(max-width: 899px) 100vw, 58vw', eager: true, big: true, pos: 'center 30%' })}</figure>
  </div>
</section>

<div class="filters-bar" id="carta-inicio">
  <div class="wrap">
    <div class="filters" data-filters role="group" aria-label="Filtrar la carta">${chips}</div>
  </div>
</div>

<div class="wrap">
  ${groups}
  ${bodega}
</div>

<section class="close mt-l" aria-labelledby="reserva-title">
  <div class="wrap close__in">
    <div>
      <h2 id="reserva-title" class="h2">¿Te guardamos la mesa?</h2>
      <p class="lead mt-s">Las reservas se hacen solo por teléfono. Si quieres arroz, dínoslo al reservar.</p>
      <p class="phone-big num mt-m"><a href="${DATA.tel.href}">${DATA.tel.display}</a></p>
    </div>
    <div class="close__side">
      <p class="status"><i></i><span data-live>Abrimos de jueves a domingo</span></p>
      <a class="link" href="reservas.html">Horario y grupos ${ico('arrow')}</a>
    </div>
  </div>
</section>
`;
};
