import type { Brand, NavItem, Profile } from '../types';

/**
 * Perfil profesional. Todos los textos del sitio que hablan de la persona
 * salen de aquí. Los campos en `null` se ocultan automáticamente.
 *
 * PENDIENTE DE COMPLETAR:
 *  - `links.linkedin`: URL pública del perfil de LinkedIn.
 *  - `email`: dirección profesional validada.
 *  - `location`: opcional.
 *  - `availability.enabled`: activar solo si es cierto.
 */
export const profile: Profile = {
  name: 'Diego Arguello',
  role: 'Software Engineer & Architect',
  specialties: [
    'Arquitectura de software',
    'IA aplicada y agentes',
    'Backend y APIs',
    'Ingeniería de datos',
    'Cloud y DevOps',
  ],
  headline: 'Diseño y construyo soluciones de software que convierten ideas complejas en productos reales.',
  subheadline:
    'Ingeniería de software, arquitectura de sistemas, inteligencia artificial y plataformas escalables.',
  location: null,
  availability: { enabled: false, label: 'Disponible para nuevos proyectos' },
  email: null,
  links: {
    github: 'https://github.com/decoArguello',
    linkedin: null,
    blog: 'https://pointzerobit.com/',
  },
};

export const brand: Brand = {
  name: 'PointZeroBit',
  url: 'https://pointzerobit.com/',
  description: 'Blog sobre arquitectura de software, inteligencia artificial, datos y construcción de productos.',
};

/** Navegación principal. Cada `id` corresponde a una sección de la portada. */
export const navigation: NavItem[] = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Sobre mí', id: 'sobre-mi' },
  { label: 'Experiencia', id: 'experiencia' },
  { label: 'Proyectos', id: 'proyectos' },
  { label: 'Tecnologías', id: 'tecnologias' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contacto', id: 'contacto' },
];
