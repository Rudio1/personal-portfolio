import type { ProjetoData } from '../components/ProjetoCard';

export const projetos: ProjetoData[] = [
  {
    id: 1,
    key: 'vegeta',
    tecnologias: ['Laravel', 'PHP', 'MySQL', 'API REST', 'JWT'],
    imagem: '/vegeta.png',
    github: 'https://github.com/frotaitalo/vegeta-final-pi',
    demo: null,
    destaque: true,
    tipo: 'backend',
    icone: 'database'
  },
  {
    id: 2,
    key: 'cybergallery',
    tecnologias: ['Next.js', 'TypeScript', 'Responsive Design', 'AWS S3 Bucket', 'GSAP'],
    imagem: '/cybergallery.png',
    github: 'https://github.com/Rudio1/cyberGallery',
    demo: 'https://cybergallery1.netlify.app/',
    destaque: true,
    tipo: 'frontend',
    icone: 'globe'
  },
  {
    id: 3,
    key: 'website-cecis',
    tecnologias: ['Next.js', 'C#', '.NET', 'SQL Server', 'Entity Framework', 'JWT'],
    imagem: '/cecis.png',
    github: null,
    demo: 'https://www.cecis.com.br/',
    destaque: true,
    tipo: 'fullstack',
    icone: 'globe'
  },
  {
    id: 4,
    key: 'agcustom',
    tecnologias: ['Next.js', 'React', 'CSS', 'JavaScript', 'Responsive Design'],
    imagem: '/ag-custom.png',
    github: 'https://github.com/Rudio1/website_AG-Custom',
    demo: 'https://website-ag-custom.vercel.app/',
    destaque: true,
    tipo: 'frontend',
    icone: 'globe'
  },
  {
    id: 5,
    key: 'psi-amanda',
    tecnologias: ['Next.js', 'React', 'CSS', 'JavaScript', 'Responsive Design'],
    imagem: '/psi-amanda.png',
    github: null,
    demo: 'https://psi-amanda.rudio1.com.br/',
    destaque: true,
    tipo: 'frontend',
    icone: 'globe'
  },
  {
    id: 6,
    key: 'refeicoes',
    tecnologias: ['React', 'Node.js', 'Express', 'TypeScript', 'Next.js', 'SQL Server', 'JWT'],
    imagem: '/refeicoes.png',
    github: 'https://github.com/Rudio1/front-meals',
    githubBackend: 'https://github.com/Rudio1/api-meals',
    demo: null,
    destaque: false,
    tipo: 'fullstack',
    icone: 'monitor'
  },
  {
    id: 7,
    key: 'tarefas',
    tecnologias: ['C#', '.NET', 'SQL Server', 'Entity Framework', 'JWT'],
    imagem: '/tarefas.png',
    github: 'https://github.com/Rudio1/FrontEndTaskAPI',
    githubBackend: 'https://github.com/Rudio1/CrudTaskAPI',
    demo: null,
    destaque: false,
    tipo: 'fullstack',
    icone: 'monitor'
  },
  {
    id: 8,
    key: 'brunelly',
    tecnologias: ['Next.js', 'Responsive Design'],
    imagem: '/brunelly.png',
    github: 'https://github.com/Rudio1/website_brunelly_baiocco',
    demo: 'https://website-brunelly-baiocco-ivory.vercel.app/',
    destaque: false,
    tipo: 'frontend',
    icone: 'globe'
  }
];
