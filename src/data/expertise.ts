import type { ExpertiseGroup, ExperienceEntry } from '../types';

/** Competencias agrupadas por área (sección "Experiencia"). */
export const expertise: ExpertiseGroup[] = [
  {
    title: 'Software Engineering',
    description: 'Servicios robustos, contratos claros y código que se puede mantener.',
    items: ['Backend', 'APIs REST', 'Diseño de sistemas', 'Testing', 'Patrones de arquitectura'],
  },
  {
    title: 'Artificial Intelligence',
    description: 'Modelos de lenguaje integrados en productos y procesos reales.',
    items: ['LLMs', 'AI Agents', 'RAG', 'Orquestación', 'Automatización inteligente'],
  },
  {
    title: 'Data Engineering',
    description: 'Datos fiables, desde la ingesta hasta el análisis.',
    items: ['Python', 'PostgreSQL', 'ETL/ELT', 'Apache Spark', 'Snowflake', 'Analytics'],
  },
  {
    title: 'Cloud & DevOps',
    description: 'Entregas automatizadas y sistemas observables.',
    items: ['Docker', 'CI/CD', 'GitHub Actions', 'Infraestructura', 'Observabilidad'],
  },
];

/**
 * Trayectoria profesional. Vacío a propósito: no se publica ninguna empresa,
 * cargo ni fecha sin validar. Al añadir entradas aparece automáticamente
 * una línea de tiempo en la sección "Experiencia". Ejemplo:
 *
 *   { role: 'Software Architect', organization: 'Empresa', period: '2022 — Actualidad',
 *     description: 'Qué hiciste y qué impacto tuvo.' }
 */
export const experience: ExperienceEntry[] = [];
