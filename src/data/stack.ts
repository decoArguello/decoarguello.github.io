import type { StackGroup } from '../types';

/** Tecnologías agrupadas por especialidad (sección "Tecnologías"). */
export const stack: StackGroup[] = [
  {
    title: 'Lenguajes',
    description: 'La base de todo lo demás.',
    items: ['Python', 'TypeScript', 'JavaScript', 'PHP'],
  },
  {
    title: 'Backend y APIs',
    description: 'Servicios, frameworks y caché.',
    items: ['FastAPI', 'Laravel', 'Redis'],
  },
  {
    title: 'Frontend',
    description: 'Interfaces y aplicaciones web.',
    items: ['Next.js', 'React'],
  },
  {
    title: 'Datos y analítica',
    description: 'Almacenamiento, streaming, procesamiento y visualización.',
    items: ['PostgreSQL', 'Apache Kafka', 'Apache Spark', 'Snowflake', 'Power BI'],
  },
  {
    title: 'Plataforma y DevOps',
    description: 'Contenedores, automatización y backend como servicio.',
    items: ['Docker', 'GitHub Actions', 'Supabase'],
  },
];
