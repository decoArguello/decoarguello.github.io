/**
 * Genera `public/og-image.png` (1200×630) para Open Graph a partir de un SVG.
 * Usa `sharp`, que ya instala Astro. Ejecutar tras cambiar nombre o rol:
 *   npm run og
 * Las fuentes se resuelven con las del sistema (sans-serif), no con las web fonts.
 */
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const name = 'Diego Arguello';
const role = 'Software Engineer &amp; Architect';
const tagline = ['Arquitectura de software · IA aplicada', 'Backend y APIs · Ingeniería de datos'];

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#D3DCE5"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <rect x="760" width="440" height="630" fill="url(#dots)"/>
  <rect x="0" y="618" width="1200" height="12" fill="#7EE7CB"/>

  <g transform="translate(80 84)">
    <rect width="64" height="64" rx="18" fill="#101827"/>
    <circle cx="28" cy="32" r="13" fill="none" stroke="#FFFFFF" stroke-width="5"/>
    <circle cx="47" cy="45" r="6" fill="#7EE7CB"/>
  </g>

  <text x="80" y="318" font-family="'Segoe UI', Inter, Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#101827" letter-spacing="-2">${name}</text>
  <text x="80" y="392" font-family="'Segoe UI', Inter, Helvetica, Arial, sans-serif" font-size="40" font-weight="500" fill="#3D5EF0">${role}</text>
  ${tagline
    .map(
      (line, i) =>
        `<text x="80" y="${478 + i * 46}" font-family="'Segoe UI', Inter, Helvetica, Arial, sans-serif" font-size="30" fill="#475467">${line}</text>`,
    )
    .join('\n  ')}

  <g transform="translate(980 315)">
    <circle r="92" fill="#101827"/>
    <circle cx="-14" r="30" fill="none" stroke="#FFFFFF" stroke-width="9"/>
    <circle cx="28" cy="30" r="14" fill="#7EE7CB"/>
  </g>
</svg>`;

const output = fileURLToPath(new URL('../public/og-image.png', import.meta.url));
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output);
console.log(`OG image generada: ${output}`);
