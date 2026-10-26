# decoarguello.github.io

Portafolio profesional de **Diego Arguello**: ingeniería de software, arquitectura de sistemas, IA aplicada e ingeniería de datos. Sitio estático construido con [Astro](https://astro.build/) y publicado en GitHub Pages.

- Sitio: https://decoarguello.github.io/
- Blog: [PointZeroBit](https://pointzerobit.com/)

## Desarrollo local

Requiere Node.js ≥ 22.23.

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # build estático en dist/
npm run preview    # sirve dist/ localmente
```

| Script | Qué hace |
|---|---|
| `npm run lint` | ESLint (TypeScript + Astro) |
| `npm run check` | Comprobación de tipos y plantillas (`astro check`) |
| `npm test` | Tests de datos y del build (requiere `dist/`) |
| `npm run validate` | lint → check → build → test |
| `npm run og` | Regenera `public/og-image.png` |

## Editar el contenido

Todo el contenido vive en `src/data/`; los componentes no contienen datos personales.

| Archivo | Contenido |
|---|---|
| `src/data/profile.ts` | Nombre, rol, titulares, enlaces (GitHub, LinkedIn, blog), email, disponibilidad, navegación |
| `src/data/projects.ts` | Proyectos destacados |
| `src/data/expertise.ts` | Competencias y trayectoria profesional |
| `src/data/stack.ts` | Tecnologías por especialidad |
| `src/data/principles.ts` | Filosofía de ingeniería |

Los campos en `null` (LinkedIn, email, enlaces de proyecto) se ocultan automáticamente: el sitio nunca muestra enlaces sin destino real.

### Agregar un proyecto

1. Añade un objeto al array de `src/data/projects.ts` con un `slug` único en minúsculas y guiones.
2. Escribe `summary`, `problem` y `solution`; añade a `stack` solo tecnologías realmente usadas.
3. Elige un motivo visual (`grid`, `nodes`, `orbit`, `layers`, `pulse`, `tiles`).
4. Completa `links.repository` / `links.demo` solo con URLs públicas que funcionen; si no, `null`.
5. Usa `status: 'draft'` mientras el contenido esté en revisión (etiqueta "En validación", `noindex`, fuera del sitemap) y `'published'` cuando sea definitivo.
6. Ejecuta `npm run validate`.

La página `/proyectos/<slug>/` se genera automáticamente.

## Publicación

El workflow `.github/workflows/deploy.yml` valida, construye y publica el sitio en cada push a `prod`. Antes del primer despliegue hay que cambiar **Settings → Pages → Source** a **GitHub Actions**. Detalles en la guía.

## Documentación

[`docs/portfolio-implementation.md`](docs/portfolio-implementation.md): arquitectura, decisiones técnicas, personalización, publicación, validaciones y pendientes.

## Páginas heredadas

`babystorypolicy.html` y `stickeralbumcollector-policy.html` son políticas de privacidad de apps publicadas. Se mantienen en la raíz sin cambios y el build las copia a `dist/`, así que sus URLs no cambian.
