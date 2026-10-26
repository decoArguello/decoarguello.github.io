import { brand, profile } from '../data/profile';
import { expertise } from '../data/expertise';

/** JSON-LD `Person` + `WebSite`, construidos solo con datos configurados (sin inventar credenciales). */
export function siteStructuredData(site: URL): Record<string, unknown>[] {
  const url = site.href;
  const sameAs = [profile.links.github, profile.links.linkedin].filter((link): link is string => link !== null);

  const person: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}#person`,
    name: profile.name,
    url,
    jobTitle: profile.role,
    description: profile.subheadline,
    knowsAbout: expertise.flatMap((group) => [group.title, ...group.items]),
    sameAs,
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'Máster en Visual Analytics y Big Data',
    },
  };

  if (profile.email) person.email = `mailto:${profile.email}`;

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    name: profile.name,
    url,
    inLanguage: 'es',
    author: { '@id': `${url}#person` },
    publisher: { '@id': `${url}#person` },
    about: brand.description,
  };

  return [person, website];
}
