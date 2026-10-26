import type { Principle } from '../types';

/** Filosofía de ingeniería (sección "Cómo abordo la construcción de software"). */
export const principles: Principle[] = [
  {
    title: 'Arquitectura antes de complejidad',
    body: 'Antes de escribir código busco entender el problema, sus límites y cómo va a evolucionar. Una buena arquitectura no añade capas: decide cuáles sobran.',
  },
  {
    title: 'Automatización y calidad desde el diseño',
    body: 'Las pruebas, la integración continua y los despliegues repetibles no se añaden al final. Forman parte del sistema desde el primer día.',
  },
  {
    title: 'Seguridad, mantenibilidad y escalabilidad',
    body: 'El software vive mucho más que su primera versión. Diseño pensando en quien lo mantendrá, en los datos que protege y en la carga que tendrá que soportar.',
  },
  {
    title: 'Tecnología aplicada a problemas reales',
    body: 'La inteligencia artificial, los datos y la nube valen por lo que resuelven. Elijo cada herramienta por su impacto en el producto, no por su novedad.',
  },
];
