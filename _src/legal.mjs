// Datos del titular para los textos legales.
// PENDIENTE: el cliente debe facilitar estos datos. Mientras falten, se muestran marcados en la página.
const P = (t) => `<mark class="pend">${t}</mark>`;

export const TITULAR = {
  nombre: P('[Razón social o nombre del titular]'),
  nif: P('[NIF / CIF]'),
  domicilio: 'C. Meléndez Valdés, 14, 06225 Ribera del Fresno (Badajoz)',
  email: P('[correo de contacto]'),
  telefono: '635 82 40 92',
  registro: P('[Datos de inscripción en el Registro Mercantil, si es una sociedad]'),
  web: P('[dominio de la web]'),
};

export const legalPage = (title, intro, sections) => `
<section class="section legal" style="padding-top:calc(var(--head-space) + clamp(64px, 8vw, 120px))" aria-labelledby="legal-title">
  <div class="wrap">
    <h1 id="legal-title" class="display primor">${title}</h1>
    <p class="lead mt-m">${intro}</p>
    <p class="legal__date">Última actualización: noviembre de 2026</p>
    <div class="legal__body">
      ${sections.map(([h, body]) => `<h2>${h}</h2>${body}`).join('\n      ')}
    </div>
  </div>
</section>`;
