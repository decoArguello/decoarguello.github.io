// Verifica la salida de `npm run build` (ejecutar el build antes: `npm run validate` lo hace).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.ts';
import { navigation } from '../src/data/profile.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const SITE = 'https://decoarguello.github.io';

if (!existsSync(dist)) throw new Error('No existe dist/. Ejecuta `npm run build` antes de los tests.');

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const files = walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const legacyPages = ['babystorypolicy.html', 'stickeralbumcollector-policy.html'];
const generatedPages = htmlFiles.filter((f) => !legacyPages.includes(relative(dist, f)));
const read = (file) => readFileSync(file, 'utf8');
const urlPath = (file) => '/' + relative(dist, file).split(sep).join('/').replace(/index\.html$/, '');

/** Resuelve una ruta del sitio a un archivo de dist/ como lo haría GitHub Pages. */
const resolves = (pathname) => {
  const clean = decodeURIComponent(pathname);
  const candidates = clean.endsWith('/')
    ? [join(dist, clean, 'index.html')]
    : [join(dist, clean), join(dist, clean, 'index.html'), join(dist, `${clean}.html`)];
  return candidates.some((c) => existsSync(c) && statSync(c).isFile());
};

const attrValues = (html, attr) => [...html.matchAll(new RegExp(`\\s${attr}="([^"]*)"`, 'g'))].map((m) => m[1]);

test('existen las páginas y archivos esperados', () => {
  for (const path of ['index.html', '404.html', 'robots.txt', 'sitemap-index.xml', 'favicon.svg', 'og-image.png', '.nojekyll']) {
    assert.ok(existsSync(join(dist, path)), `falta dist/${path}`);
  }
  for (const project of projects) {
    assert.ok(existsSync(join(dist, 'proyectos', project.slug, 'index.html')), `falta la página de ${project.slug}`);
  }
});

test('las páginas heredadas se copian sin cambios', () => {
  for (const page of legacyPages) {
    assert.deepEqual(readFileSync(join(dist, page)), readFileSync(join(root, page)), `${page} difiere del original`);
  }
});

test('todos los enlaces y recursos internos existen', () => {
  const ids = new Map(htmlFiles.map((f) => [urlPath(f), new Set(attrValues(read(f), 'id'))]));

  for (const file of generatedPages) {
    const html = read(file);
    const refs = [...attrValues(html, 'href'), ...attrValues(html, 'src')];
    for (const ref of refs) {
      if (/^(https?:|mailto:|data:)/.test(ref)) continue;
      assert.doesNotMatch(ref, /undefined|null/, `${urlPath(file)}: referencia sospechosa "${ref}"`);
      const url = new URL(ref, SITE + urlPath(file));
      if (url.origin !== SITE) continue;
      assert.ok(resolves(url.pathname), `${urlPath(file)}: "${ref}" no existe en dist/`);
      if (url.hash) {
        const target = ids.get(url.pathname);
        assert.ok(target?.has(url.hash.slice(1)), `${urlPath(file)}: ancla "${ref}" no encontrada`);
      }
    }
  }
});

test('la portada contiene todas las secciones de la navegación', () => {
  const html = read(join(dist, 'index.html'));
  for (const item of navigation) assert.match(html, new RegExp(`id="${item.id}"`), `falta la sección #${item.id}`);
});

test('cada página tiene title, description, canonical y Open Graph absolutos', () => {
  for (const file of generatedPages) {
    const html = read(file);
    const page = urlPath(file);
    assert.match(html, /<title>[^<]+<\/title>/, `${page}: sin <title>`);
    assert.match(html, /<meta name="description" content="[^"]+"/, `${page}: sin description`);
    assert.match(html, /<html lang="es"[\s>]/, `${page}: sin lang`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical?.startsWith(SITE + '/'), `${page}: canonical inválido (${canonical})`);
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    assert.ok(ogImage?.startsWith(SITE + '/'), `${page}: og:image no es absoluta`);
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${page}: debe tener exactamente un <h1>`);
  }
});

test('el JSON-LD es válido e incluye Person y WebSite en la portada', () => {
  for (const file of generatedPages) {
    for (const [, json] of read(file).matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      assert.doesNotThrow(() => JSON.parse(json), `${urlPath(file)}: JSON-LD inválido`);
    }
  }
  const types = [...read(join(dist, 'index.html')).matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(
    ([, json]) => JSON.parse(json)['@type'],
  );
  assert.deepEqual(types.sort(), ['Person', 'WebSite']);
});

test('los proyectos en borrador llevan noindex y no están en el sitemap', () => {
  const sitemap = walk(dist)
    .filter((f) => /sitemap-\d+\.xml$/.test(f))
    .map(read)
    .join('');
  for (const project of projects) {
    const html = read(join(dist, 'proyectos', project.slug, 'index.html'));
    const inSitemap = sitemap.includes(`/proyectos/${project.slug}/`);
    const noindex = html.includes('<meta name="robots" content="noindex');
    if (project.status === 'draft') {
      assert.ok(noindex, `${project.slug}: borrador sin noindex`);
      assert.ok(!inSitemap, `${project.slug}: borrador presente en el sitemap`);
    } else {
      assert.ok(!noindex && inSitemap, `${project.slug}: publicado pero no indexable`);
    }
  }
});

test('no hay palabras pegadas a enlaces o énfasis por espacios colapsados', () => {
  for (const file of generatedPages) {
    const glued = read(file).match(/[a-záéíóúñ]<(a|em|strong)[\s>]|<\/(a|em|strong)>[a-záéíóúñ]/i);
    assert.equal(glued, null, `${urlPath(file)}: texto pegado cerca de "${glued?.[0]}"`);
  }
});

test('los enlaces externos que abren pestaña nueva usan rel="noopener"', () => {
  for (const file of generatedPages) {
    for (const [tag] of read(file).matchAll(/<a\s[^>]*target="_blank"[^>]*>/g)) {
      assert.match(tag, /rel="[^"]*noopener/, `${urlPath(file)}: ${tag}`);
    }
  }
});

test('las imágenes tienen alt o están ocultas a tecnologías de asistencia', () => {
  for (const file of generatedPages) {
    for (const [tag] of read(file).matchAll(/<img\s[^>]*>/g)) {
      assert.match(tag, /\salt="/, `${urlPath(file)}: <img> sin alt`);
    }
    for (const [tag] of read(file).matchAll(/<svg\s[^>]*>/g)) {
      assert.match(tag, /aria-hidden="true"|role="img"/, `${urlPath(file)}: <svg> sin aria-hidden ni role`);
    }
  }
});
