import type { Project } from '../types';

/**
 * Proyectos destacados, en el orden en que se muestran.
 *
 * Todos están en `status: 'draft'`: son candidatos cuyo contenido debe
 * validarse antes de presentarlos como definitivos. Al revisar cada uno:
 *   1. Ajusta `summary`, `problem` y `solution` a la realidad del proyecto.
 *   2. Completa `stack` solo con tecnologías efectivamente usadas.
 *   3. Añade `links.repository` / `links.demo` solo si son públicos y funcionan.
 *   4. Cambia `status` a `'published'`.
 *
 * Guía completa: docs/portfolio-implementation.md → "Agregar un proyecto".
 */
export const projects: Project[] = [
  {
    slug: 'zuitehub',
    name: 'ZuiteHub',
    category: 'Plataforma empresarial',
    summary: 'Plataforma tecnológica para el desarrollo de soluciones empresariales.',
    problem:
      'Las organizaciones suelen resolver cada necesidad con herramientas aisladas, lo que multiplica integraciones, datos duplicados y costes de mantenimiento.',
    solution:
      'Una base común sobre la que construir soluciones a medida, con módulos reutilizables y una arquitectura pensada para crecer sin reescribirse.',
    stack: [],
    visual: 'tiles',
    status: 'draft',
    links: { repository: null, demo: null },
  },
  {
    slug: 'homeolistic',
    name: 'Homeolistic',
    category: 'SaaS',
    summary: 'Plataforma SaaS orientada a profesionales y servicios de bienestar.',
    problem:
      'Los profesionales del bienestar gestionan su práctica con herramientas genéricas que no se adaptan a su forma de trabajar.',
    solution:
      'Un producto SaaS multi-cliente enfocado en el flujo de trabajo real del profesional, desde la organización de su práctica hasta la relación con sus clientes.',
    stack: [],
    visual: 'orbit',
    status: 'draft',
    links: { repository: null, demo: null },
  },
  {
    slug: 'podalia',
    name: 'Podalia',
    category: 'Salud',
    summary: 'Sistema de gestión clínica y consulta externa.',
    problem:
      'La consulta externa requiere coordinar agenda, historia clínica y seguimiento de pacientes con rigor y confidencialidad.',
    solution:
      'Un sistema de gestión clínica que centraliza la operación de la consulta, con especial atención a la integridad y protección de los datos.',
    stack: [],
    visual: 'pulse',
    status: 'draft',
    links: { repository: null, demo: null },
  },
  {
    slug: 'agentos',
    name: 'AgentOS',
    category: 'Inteligencia artificial',
    summary: 'Arquitectura y runtime para agentes de inteligencia artificial.',
    problem:
      'Pasar de un prototipo con LLMs a agentes fiables exige resolver orquestación, herramientas, memoria y observabilidad de forma consistente.',
    solution:
      'Un runtime que define cómo se componen, ejecutan y supervisan los agentes, separando la lógica de cada agente de la infraestructura que los coordina.',
    stack: [],
    visual: 'nodes',
    status: 'draft',
    links: { repository: null, demo: null },
  },
  {
    slug: 'gamehub',
    name: 'GameHub',
    category: 'Tiempo real',
    summary: 'Plataforma multijugador de juegos de mesa digitales.',
    problem:
      'Los juegos de mesa en línea necesitan sincronizar el estado de cada partida entre varios jugadores de forma justa y consistente.',
    solution:
      'Una plataforma con reglas de juego desacopladas del motor de partidas y comunicación en tiempo real entre jugadores.',
    stack: [],
    visual: 'grid',
    status: 'draft',
    links: { repository: null, demo: null },
  },
  {
    slug: 'claude-dev-optimizer',
    name: 'Claude Dev Optimizer',
    category: 'Herramientas de desarrollo',
    summary: 'Herramientas para optimizar flujos de desarrollo asistidos por IA.',
    problem:
      'El desarrollo asistido por IA rinde mejor cuando el contexto, las instrucciones y los flujos de trabajo están bien estructurados.',
    solution:
      'Un conjunto de herramientas y convenciones que estructuran el trabajo con asistentes de código para obtener resultados más predecibles.',
    stack: [],
    visual: 'layers',
    status: 'draft',
    links: { repository: null, demo: null },
  },
];
