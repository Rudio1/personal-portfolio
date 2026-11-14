export interface StackItem {
  name: string;
}

export interface StackCategory {
  key: 'backend' | 'frontend' | 'database' | 'cloud' | 'tools';
  items: StackItem[];
}

export const stack: StackCategory[] = [
  {
    key: 'backend',
    items: [
      { name: 'C#' },
      { name: '.NET' },
      { name: 'PHP' },
      { name: 'Laravel' },
      { name: 'REST' },
      { name: 'OAuth' },
      { name: 'JWT' },
    ],
  },
  {
    key: 'frontend',
    items: [
      { name: 'Angular' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Vue.js' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'CSS' },
    ],
  },
  {
    key: 'database',
    items: [
      { name: 'SQL Server' },
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'Redis' },
    ],
  },
  {
    key: 'cloud',
    items: [
      { name: 'Azure App Service' },
      { name: 'Azure DevOps' },
      { name: 'AWS S3' },
      { name: 'AWS Lambda' },
    ],
  },
  {
    key: 'tools',
    items: [
      { name: 'Git' },
      { name: 'Git Flow' },
      { name: 'GitHub Actions' },
      { name: 'CI/CD' },
      { name: 'Vite' },
      { name: 'Scrum' },
    ],
  },
];
