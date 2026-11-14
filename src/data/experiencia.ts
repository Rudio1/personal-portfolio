export interface ExperienciaData {
  key: string;
  company: string;
  start: string;
  end: string | null;
}

export const experiencias: ExperienciaData[] = [
  { key: 'aguia-branca', company: 'Grupo Águia Branca', start: '03/2025', end: null },
  { key: 'trinks', company: 'Trinks', start: '06/2023', end: '03/2025' },
  { key: 'code-and-app', company: 'Code and App', start: '08/2022', end: '06/2023' },
];
