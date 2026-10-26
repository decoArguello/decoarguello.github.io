import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import type { AstroIntegration } from 'astro';
import { projects } from './src/data/projects';

/**
 * Repositorio de usuario (`decoarguello.github.io`): el sitio se sirve en la raíz,
 * por lo que no se necesita `base`. Si en el futuro se usa un dominio propio,
 * actualizar `site` y añadir `public/CNAME`.
 */
const SITE = 'https://decoarguello.github.io';

/**
 * Páginas HTML preexistentes en la raíz del repositorio (políticas de privacidad
 * de apps publicadas). Se dejan intactas donde están —así siguen funcionando si
 * GitHub Pages publica directamente desde la rama— y se copian al build para
 * conservar exactamente las mismas URLs cuando se publique con GitHub Actions.
 */
const LEGACY_PAGES = ['babystorypolicy.html', 'stickeralbumcollector-policy.html'];

function legacyPages(): AstroIntegration {
  return {
    name: 'legacy-pages',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = new URL('./', import.meta.url);
        await Promise.all(
          LEGACY_PAGES.map((file) =>
            copyFile(fileURLToPath(new URL(file, root)), fileURLToPath(new URL(file, dir))),
          ),
        );
        logger.info(`Copiadas ${LEGACY_PAGES.length} páginas heredadas al build.`);
      },
    },
  };
}

const draftPaths = projects
  .filter((project) => project.status === 'draft')
  .map((project) => `/proyectos/${project.slug}/`);

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Los proyectos en borrador llevan `noindex`; tampoco van al sitemap.
      filter: (page) => !page.includes('/404') && !draftPaths.some((path) => page.endsWith(path)),
    }),
    legacyPages(),
  ],
});
