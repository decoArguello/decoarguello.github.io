/** Modelo de datos del portafolio. Todo el contenido editable vive en `src/data/`. */

export interface Profile {
  /** Nombre profesional visible en el sitio, metadatos y JSON-LD. */
  name: string;
  /** Rol corto para el título del sitio y el JSON-LD `jobTitle`. */
  role: string;
  /** Especialidades mostradas bajo el hero. */
  specialties: string[];
  headline: string;
  subheadline: string;
  /** Ciudad o país. `null` para no mostrarlo. */
  location: string | null;
  /**
   * Indicador de disponibilidad. Solo se muestra si `enabled` es `true`;
   * actívalo únicamente cuando sea cierto.
   */
  availability: { enabled: boolean; label: string };
  /** Email profesional validado. `null` oculta el enlace `mailto:`. */
  email: string | null;
  links: {
    github: string;
    /** URL completa del perfil. `null` oculta todos los enlaces a LinkedIn. */
    linkedin: string | null;
    blog: string;
  };
}

export interface Brand {
  name: string;
  url: string;
  description: string;
}

export interface NavItem {
  label: string;
  /** Ancla de sección en la página principal, sin `#`. */
  id: string;
}

export type ProjectVisualMotif = 'grid' | 'nodes' | 'orbit' | 'layers' | 'pulse' | 'tiles';

export interface Project {
  /** Identificador estable; define la URL `/proyectos/<slug>/`. */
  slug: string;
  name: string;
  category: string;
  /** Una línea: qué es. */
  summary: string;
  /** Problema que resuelve. */
  problem: string;
  /** Enfoque técnico de la solución. */
  solution: string;
  /** Tecnologías confirmadas. Si está vacío, no se muestra la fila de stack. */
  stack: string[];
  /** Ilustración abstracta generada en SVG (no simula capturas reales). */
  visual: ProjectVisualMotif;
  /**
   * `draft`: contenido pendiente de validación. Se muestra con una etiqueta
   * discreta, su página lleva `noindex` y se excluye del sitemap.
   * `published`: contenido revisado.
   */
  status: 'draft' | 'published';
  /** Solo URLs reales y públicas. `null` oculta el botón. */
  links: { repository: string | null; demo: string | null };
}

export interface ExpertiseGroup {
  title: string;
  description: string;
  items: string[];
}

/** Entrada de trayectoria profesional. Ver `src/data/experience.ts`. */
export interface ExperienceEntry {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface StackGroup {
  title: string;
  description: string;
  items: string[];
}

export interface Principle {
  title: string;
  body: string;
}
