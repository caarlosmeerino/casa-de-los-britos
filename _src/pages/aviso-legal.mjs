import { TITULAR as T, legalPage } from '../legal.mjs';

export const meta = {
  out: 'aviso-legal.html', theme: 'casa', current: '', og: 'dsc06948',
  title: 'Aviso legal · Casa de los Britos',
  description: 'Aviso legal de la web de Casa de los Britos y Britos Restauración & Eventos.',
};

export const body = () => legalPage('Aviso legal',
  'Información sobre el titular de esta web y las condiciones para usarla, conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).',
  [
    ['1. Titular de la web', `<ul>
      <li><strong>Titular:</strong> ${T.nombre}</li>
      <li><strong>NIF/CIF:</strong> ${T.nif}</li>
      <li><strong>Domicilio:</strong> ${T.domicilio}</li>
      <li><strong>Teléfono:</strong> ${T.telefono}</li>
      <li><strong>Correo electrónico:</strong> ${T.email}</li>
      <li><strong>Datos registrales:</strong> ${T.registro}</li>
    </ul>
    <p>Esta web reúne la información del Restaurante Casa de los Britos y de Britos Restauración &amp; Eventos.</p>`],
    ['2. Objeto', '<p>La web informa sobre el restaurante, su carta, su horario y sus servicios de eventos y catering, y permite contactar por teléfono o mediante formularios. Las reservas de mesa se hacen solo por teléfono.</p>'],
    ['3. Condiciones de uso', '<p>Al navegar por esta web aceptas estas condiciones. Te comprometes a usarla de forma lícita, sin dañar su funcionamiento ni el de otros usuarios, y a no introducir en los formularios datos falsos o de terceros sin su permiso.</p>'],
    ['4. Información de la carta, precios y horarios', '<p>La carta, los vinos y los horarios pueden cambiar según la temporada y el mercado. Ante cualquier duda, confírmalo por teléfono. La información sobre alérgenos está disponible en el restaurante: pregúntala al personal.</p>'],
    ['5. Propiedad intelectual e industrial', '<p>Los textos, fotografías, logotipos, marcas y diseño de esta web pertenecen a su titular o se usan con permiso. No está permitido copiarlos, distribuirlos ni modificarlos sin autorización escrita.</p>'],
    ['6. Enlaces externos y reseñas', '<p>Las reseñas de la portada proceden de Google y son opiniones de sus autores; las mostramos tal cual las publica Google, sin modificarlas. La web enlaza con servicios de terceros, como Google Maps, Instagram y TikTok. No somos responsables de sus contenidos ni de sus políticas; al usarlos se aplican sus propias condiciones.</p>'],
    ['7. Responsabilidad', '<p>Trabajamos para que la información sea correcta y esté actualizada, pero no podemos garantizar que no haya errores puntuales ni interrupciones del servicio por causas técnicas ajenas a nosotros.</p>'],
    ['8. Protección de datos y cookies', '<p>El tratamiento de tus datos se explica en la <a href="privacidad.html">Política de privacidad</a> y el uso de cookies en la <a href="cookies.html">Política de cookies</a>.</p>'],
    ['9. Legislación y jurisdicción', '<p>Estas condiciones se rigen por la legislación española. Para cualquier conflicto, las partes se someten a los juzgados y tribunales que correspondan según la ley; si eres consumidor, los de tu domicilio.</p>'],
  ]);
