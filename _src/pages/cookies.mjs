import { legalPage } from '../legal.mjs';

export const meta = {
  out: 'cookies.html', theme: 'casa', current: '', og: 'dsc06948',
  title: 'Política de cookies · Casa de los Britos',
  description: 'Qué cookies usa la web de Casa de los Britos y cómo gestionarlas.',
};

export const body = () => legalPage('Cookies',
  'Esta web no usa cookies de publicidad ni de analítica. Te explicamos qué ocurre con el mapa, las reseñas de Google y los enlaces a redes sociales.',
  [
    ['1. Qué son las cookies', '<p>Son pequeños archivos que una web guarda en tu navegador para recordar información sobre tu visita.</p>'],
    ['2. Cookies propias', '<p>Esta web no instala cookies propias de seguimiento, analítica ni publicidad. Las fuentes tipográficas y las imágenes se sirven desde nuestro propio servidor, sin conectar con servicios externos.</p>'],
    ['3. El mapa de Google Maps', '<p>En la página de contacto, el mapa no se carga hasta que pulsas «Ver el mapa». Al hacerlo, Google puede instalar sus propias cookies, según su política: <a href="https://policies.google.com/technologies/cookies?hl=es" target="_blank" rel="noopener">política de cookies de Google</a>. Si no pulsas el botón, no se conecta con Google.</p>'],
    ['4. Reseñas de Google', '<p>Las reseñas que mostramos en la portada las pide nuestro servidor a Google y las guarda unas horas. Tu navegador no se conecta con Google para verlas y no se instala ninguna cookie por ello. Solo si pulsas «Ver todas las reseñas en Google» irás a su web, donde se aplica su política.</p>'],
    ['5. Enlaces a redes sociales', '<p>Los enlaces a Instagram y TikTok te llevan a esas plataformas, que aplican sus propias políticas de cookies. Esta web no inserta sus contenidos ni sus botones de seguimiento.</p>'],
    ['6. Cómo gestionar las cookies', '<p>Puedes ver y borrar las cookies desde la configuración de tu navegador: <a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener">Chrome</a>, <a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener">Firefox</a>, <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a> y <a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener">Edge</a>.</p>'],
    ['7. Cambios', '<p>Si en el futuro añadimos herramientas de analítica u otros servicios que usen cookies, actualizaremos esta política y te pediremos permiso antes de activarlas.</p>'],
  ]);
