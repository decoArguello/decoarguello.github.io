# Portafolio: implementación

## 1. Contexto inicial

- Repositorio de usuario `decoArguello/decoarguello.github.io`: se sirve en la raíz (`https://decoarguello.github.io/`), así que no hace falta `base`.
- GitHub Pages publicaba directamente la rama `prod`. No había `CNAME` ni dominio propio.
- El contenido previo eran dos políticas de privacidad de apps (`babystorypolicy.html`, `stickeralbumcollector-policy.html`), seguramente enlazadas desde tiendas de apps. **No se han modificado ni movido.**
- `prod` está protegida: el trabajo está en la rama `feature/portfolio`.

## 2. Arquitectura elegida

**Astro 7 con salida estática + TypeScript + CSS propio con tokens de diseño.**

| Decisión | Motivo |
|---|---|
| Astro en lugar de Vite + React | El contenido es estático. Astro genera HTML sin runtime de framework: solo ~2 KB de JS propio (menú, animaciones de entrada, año). Buen punto de partida para SEO y rendimiento. |
| Sin framework de UI ni Tailwind | Pocas dependencias. Los estilos usan ámbito por componente más un `global.css` con los tokens. |
| Datos en módulos TS (`src/data/`) en lugar de content collections | Tipado estricto con `src/types.ts`, sin esquemas extra, y los tests de Node pueden importarlos directamente. |
| Fuentes autoalojadas (`@fontsource-variable`) | Sin peticiones a terceros. Se precargan solo los subconjuntos latinos. |
| Ilustraciones SVG generativas para proyectos | No hay capturas reales validadas, así que se usan composiciones abstractas por motivo en vez de simular pantallas. |
| `astro.config.ts` en TypeScript | El sitemap lee el `status` de los proyectos desde los mismos datos para excluir borradores. |

### Sistema visual

- **Tipografía:** Bricolage Grotesque (titulares, con carácter editorial) + Inter (texto, máxima legibilidad).
- **Paleta:** la de PointZeroBit, con contraste WCAG verificado:
  - Electric `#5278FF` (3.8:1 sobre blanco): solo texto grande, bordes y anillos de foco. Los enlaces usan `#3D5EF0` (5.2:1).
  - Mint `#7EE7CB`: decorativo o como fondo bajo Midnight (12:1). Las etiquetas pequeñas usan `#0E7C66` (5.1:1).
  - Texto secundario `#475467` (7.7:1).
- **Composición:** líneas finas en lugar de sombras, numeración editorial, mucho espacio negativo y una sola sección con color de fondo (Blog).
- **Marca:** un "cero" con un bit desplazado, como guiño a PointZeroBit. Se usa en el header, el footer, el favicon, la imagen OG y el nodo central del hero.

### Interacción y accesibilidad

- Skip link, landmarks, un único `h1` por página, `aria-labelledby` en cada sección.
- Menú móvil con `aria-expanded`/`aria-controls`; se cierra con Escape (devolviendo el foco), al elegir un enlace o al pasar a escritorio.
- La sección visible se marca en el menú con `aria-current="location"`.
- Las animaciones de entrada solo ocultan contenido si hay JS (clase `.js`) y el usuario no pidió reducir el movimiento. Sin JS todo es visible. Con `prefers-reduced-motion` se desactivan todas las animaciones y las del hero se ocultan.
- Tarjetas de proyecto clicables mediante el enlace del título (patrón *stretched link*), con anillo de foco en toda la tarjeta.
- Los enlaces externos llevan `rel="noopener"` y un aviso para lectores de pantalla.

## 3. Estructura

```
├── .github/workflows/deploy.yml   # CI + despliegue a Pages (permisos mínimos)
├── astro.config.ts                # site, sitemap, copia de páginas heredadas
├── docs/portfolio-implementation.md
├── public/                        # favicon.svg, og-image.png, .nojekyll
├── scripts/generate-og.mjs        # genera la imagen Open Graph con sharp
├── src/
│   ├── components/                # Header, Hero, HeroVisual, About, Expertise, Projects,
│   │                              # ProjectCard, ProjectVisual, Stack, Philosophy, Blog,
│   │                              # Contact, Footer, SectionHeading, Icon, LogoMark
│   ├── data/                      # ← TODO el contenido editable
│   ├── layouts/BaseLayout.astro   # <head> SEO, OG, JSON-LD, fuentes, scripts globales
│   ├── lib/structured-data.ts     # JSON-LD Person + WebSite
│   ├── pages/
│   │   ├── index.astro            # portada (todas las secciones)
│   │   ├── proyectos/[slug].astro # detalle de cada proyecto
│   │   ├── 404.astro
│   │   └── robots.txt.ts
│   ├── styles/global.css          # tokens, base, utilidades
│   └── types.ts                   # modelo de datos
├── tests/                         # node:test, sin dependencias
├── babystorypolicy.html           # heredado, sin cambios
└── stickeralbumcollector-policy.html
```

## 4. Personalización

### Datos pendientes de completar

| Dato | Dónde | Efecto mientras sea `null`/`false` |
|---|---|---|
| URL de LinkedIn | `profile.links.linkedin` | No aparece en hero, contacto, footer ni JSON-LD |
| Email profesional | `profile.email` | Sin enlace `mailto:` |
| Ubicación | `profile.location` | No se muestra |
| Disponibilidad | `profile.availability.enabled` | Sin indicador en el hero |
| Trayectoria laboral | `experience` en `src/data/expertise.ts` | No se muestra la línea de tiempo |
| Validar los 6 proyectos | `src/data/projects.ts` | Etiqueta "En validación", `noindex`, fuera del sitemap |

> Para no publicar el email por omisión se dejó en `null`, aunque `dag852@gmail.com` ya aparece en las políticas de privacidad. Si se quiere usar ese u otro, basta con escribirlo en `profile.email`.

### Agregar un proyecto

Ver el README. Resumen: añadir un objeto a `projects`, mantener `status: 'draft'` hasta validarlo y ejecutar `npm run validate`. Los tests rechazan slugs duplicados, URLs que no sean https o que parezcan placeholders, y borradores indexables.

### Usar una imagen real en un proyecto

1. Coloca la imagen en `src/assets/projects/`.
2. Añade un campo opcional `image` al tipo `Project`.
3. En `ProjectCard.astro` y `[slug].astro`, si existe `image`, renderiza `<Image>` de `astro:assets` (genera tamaños responsivos y WebP) con un `alt` descriptivo; si no, usa `ProjectVisual`.

### Cambiar el nombre o el rol

Edita `profile.ts` y ejecuta `npm run og` para regenerar la imagen social (el script tiene el nombre y el rol en constantes al inicio).

### Dominio propio

Crea `public/CNAME` con el dominio, actualiza `SITE` en `astro.config.ts` y el valor `SITE` de `tests/build.test.mjs`, y configura el DNS según la documentación de GitHub Pages.

## 5. Publicación en GitHub Pages

No se ha publicado nada. Pasos cuando se decida:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.** Sin este cambio, Pages sigue publicando la rama tal cual y el workflow falla en el paso de despliegue.
2. Abrir un PR de `feature/portfolio` a `prod` y fusionarlo.
3. El workflow ejecuta `npm ci`, lint, check, build y tests; luego publica `dist/`. También puede lanzarse manualmente (`workflow_dispatch`).
4. Comprobar que siguen funcionando:
   - https://decoarguello.github.io/babystorypolicy.html
   - https://decoarguello.github.io/stickeralbumcollector-policy.html

**Permisos del workflow:** `contents: read` global. Solo el job `deploy` recibe `pages: write` e `id-token: write`, que son los mínimos que pide `actions/deploy-pages`.

**Compatibilidad sin cambiar la fuente de Pages:** si `prod` se fusiona sin cambiar la fuente, Pages seguirá sirviendo la raíz de la rama. Las políticas seguirán funcionando porque no se movieron, pero la portada mostrará el README. Por eso el paso 1 va primero.

## 6. Validaciones realizadas

Ejecutadas localmente (Windows 11, Node 24.14, npm 11.11):

| Comprobación | Resultado |
|---|---|
| `npm run lint` (ESLint 10 + typescript-eslint + eslint-plugin-astro) | 0 problemas |
| `npm run check` (astro check, TS 6.0 estricto) | 0 errores, 0 avisos, 0 sugerencias |
| `npm run build` | 8 páginas + robots + sitemap, ~0,6 MB en total (en su mayoría subconjuntos de fuentes que se descargan bajo demanda) |
| `npm test` | 15/15 |

Qué cubren los tests (`tests/`):

- **Datos:** slugs únicos y válidos, enlaces solo https y sin placeholders, campos obligatorios, perfil y email válidos, navegación sin anclas duplicadas.
- **Build:** archivos esperados; páginas heredadas idénticas byte a byte; todo enlace, recurso y ancla interna resuelve en `dist/`; cada sección del menú existe; title, description, `lang`, canonical y `og:image` absolutos; un solo `h1` por página; JSON-LD válido (`Person` y `WebSite` en la portada); borradores con `noindex` y fuera del sitemap; `rel="noopener"` en `target="_blank"`; SVG decorativos con `aria-hidden`; ninguna palabra pegada a enlaces por colapso de espacios.

### Revisión visual

Hecha con Chrome headless real mediante Chrome DevTools Protocol (script local no versionado en `.verification/`, ignorado por git):

- Anchos 375, 768, 1024 y 1440 px en la portada, el detalle de proyecto, 404 y una política heredada.
- **Sin scroll horizontal** en ningún ancho. **Sin errores de consola** en las páginas nuevas. La política heredada pide `/favicon.ico`, que no existe; ese 404 ya ocurría antes.
- Todas las animaciones de entrada se revelan al recorrer la página. Con `prefers-reduced-motion: reduce` todo es visible al cargar.
- Menú móvil: se abre, se cierra con Escape y devuelve el foco al botón.
- Se revisaron capturas de cada sección y se corrigieron: icono de GitHub invisible en el hero, palabras pegadas a enlaces y énfasis (con test de regresión), numerales con contornos superpuestos, logo invisible en el footer, separadores colgando al hacer wrap e ilustración con bandas en el detalle.

### No verificado

- Safari/iOS y Firefox (solo se probó Chromium).
- Lectores de pantalla reales (NVDA/VoiceOver). La accesibilidad se revisó a nivel de marcado, contraste y teclado.
- Lighthouse/PageSpeed y el workflow de GitHub Actions en GitHub (no se ejecutó ni publicó nada).
- Que las URLs externas (GitHub, PointZeroBit) respondan: se tomaron del perfil público y del enunciado.

## 7. Pendientes

1. Completar LinkedIn, email y, si procede, ubicación y disponibilidad.
2. Validar los 6 proyectos (textos, stack, enlaces) y pasarlos a `published`. Los textos de problema y solución son redacciones prudentes basadas en la descripción de una línea de cada proyecto: **deben revisarse**.
3. Añadir la trayectoria profesional si se quiere mostrar.
4. Opcional: integrar los últimos artículos de PointZeroBit. Es WordPress, así que su feed RSS (`/feed/`) podría leerse **en tiempo de build** (sin credenciales) y mostrar artículos reales con su fecha.
5. Opcional: añadir `favicon.ico` en `public/` para eliminar el 404 que generan las páginas heredadas.
