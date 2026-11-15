import { TITULAR as T, legalPage } from '../legal.mjs';

export const meta = {
  out: 'privacidad.html', theme: 'casa', current: '', og: 'dsc06948',
  title: 'Política de privacidad · Casa de los Britos',
  description: 'Cómo tratamos los datos personales que nos envías a través de la web de Casa de los Britos y Britos Restauración & Eventos.',
};

export const body = () => legalPage('Privacidad',
  'Cómo tratamos los datos que nos envías a través de esta web, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos (LOPDGDD).',
  [
    ['1. Responsable del tratamiento', `<ul>
      <li><strong>Responsable:</strong> ${T.nombre}</li>
      <li><strong>NIF/CIF:</strong> ${T.nif}</li>
      <li><strong>Domicilio:</strong> ${T.domicilio}</li>
      <li><strong>Correo electrónico:</strong> ${T.email}</li>
      <li><strong>Teléfono:</strong> ${T.telefono}</li>
    </ul>`],
    ['2. Qué datos tratamos', '<p>Solo los que nos facilitas en los formularios: nombre, correo electrónico, teléfono y el contenido de tu mensaje. En el formulario de eventos, además, el tipo de celebración, la fecha aproximada, el número de invitados y el lugar. No pedimos datos especialmente protegidos; si en tu mensaje nos cuentas alergias o intolerancias, las usamos solo para preparar tu menú.</p>'],
    ['3. Para qué los usamos', `<ul>
      <li><strong>Formulario de contacto:</strong> responder a tu consulta general, de prensa o de proveedores.</li>
      <li><strong>Formulario de eventos:</strong> preparar y enviarte el dossier y el presupuesto de tu celebración y hablar contigo sobre ella.</li>
    </ul>
    <p>No usamos tus datos para enviarte publicidad sin tu permiso ni para tomar decisiones automatizadas.</p>`],
    ['4. Base legal', '<p>Tu consentimiento, que nos das al marcar la casilla del formulario, y, en el caso de los presupuestos, la aplicación de medidas precontractuales a petición tuya (art. 6.1.a y 6.1.b del RGPD). Puedes retirar tu consentimiento en cualquier momento.</p>'],
    ['5. Cuánto tiempo los guardamos', '<p>El tiempo necesario para atender tu consulta o tu evento y, después, durante los plazos que exige la ley para atender posibles responsabilidades. Si no llegamos a contratar, borramos los datos del presupuesto en un plazo máximo de un año.</p>'],
    ['6. A quién se los comunicamos', '<p>No cedemos tus datos a terceros, salvo obligación legal. Pueden tener acceso a ellos, solo para prestarnos su servicio y con contrato de encargado del tratamiento, nuestros proveedores de alojamiento web y de correo electrónico.</p>'],
    ['7. Tus derechos', `<p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${T.email} o por correo postal a la dirección indicada, adjuntando copia de tu documento de identidad. Si consideras que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).</p>`],
    ['8. Seguridad', '<p>Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a pérdidas, accesos no autorizados o usos indebidos.</p>'],
    ['9. Cookies', '<p>Lo explicamos en la <a href="cookies.html">Política de cookies</a>.</p>'],
  ]);
