// Integridad del contenido configurable en src/data/. Node ≥ 22.18 importa TypeScript directamente.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.ts';
import { navigation, profile, brand } from '../src/data/profile.ts';

const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

test('los slugs de proyecto son únicos y aptos para URL', () => {
  const slugs = projects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, 'slugs duplicados');
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `slug inválido: ${slug}`);
});

test('los enlaces de proyecto son null o URLs https reales (sin placeholders)', () => {
  for (const project of projects) {
    for (const [kind, url] of Object.entries(project.links)) {
      if (url === null) continue;
      assert.ok(isHttpsUrl(url), `${project.name}.${kind} no es https: ${url}`);
      assert.doesNotMatch(url, /example\.com|placeholder|todo|xxx/i, `${project.name}.${kind} parece un placeholder`);
    }
  }
});

test('cada proyecto tiene los textos obligatorios', () => {
  for (const project of projects) {
    for (const field of ['name', 'category', 'summary', 'problem', 'solution']) {
      assert.ok(project[field]?.trim(), `${project.slug}: falta ${field}`);
    }
    assert.ok(['draft', 'published'].includes(project.status), `${project.slug}: status inválido`);
  }
});

test('los enlaces del perfil son https y el email, si existe, es válido', () => {
  assert.ok(isHttpsUrl(profile.links.github));
  assert.ok(isHttpsUrl(profile.links.blog));
  assert.ok(isHttpsUrl(brand.url));
  if (profile.links.linkedin !== null) assert.match(profile.links.linkedin, /^https:\/\/(www\.)?linkedin\.com\//);
  if (profile.email !== null) assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

test('la navegación no repite anclas', () => {
  const ids = navigation.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
});
