import type { ProjetoData } from '../components/ProjetoCard';

export const projetos: ProjetoData[] = [
  {
    id: 1,
    key: 'vegeta',
    tecnologias: ['Laravel', 'PHP', 'MySQL', 'API REST', 'JWT'],
    imagem: '/vegeta.png',
    github: 'https://github.com/frotaitalo/vegeta-final-pi',
    demo: null,
    destaque: false,
    tipo: 'backend',
    icone: 'database'
  },
  {
    id: 2,
    key: 'agropulse',
    tecnologias: ['Next.js', 'React', 'CSS', 'JavaScript', 'Responsive Design'],
    imagem: '/agropulse.png',
    github: null,
    demo: 'https://agropulse.net.br/',
    destaque: true,
    tipo: 'frontend',
    icone: 'globe'
  },
  {
    id: 3,
    key: 'ag-clinical',
    tecnologias: ['Vue', 'Vite'],
    imagem: '/ag-clinical.png',
    github: null,
    demo: 'https://clinical.agcustom.com.br/',
    destaque: true,
    tipo: 'fullstack',
    icone: 'globe'
  },
  {
    id: 4,
    key: 'vae-mobility',
    tecnologias: ['Next.js', 'React', 'Dotnet Core', 'SQL Server'],
    imagem: '/vae-mobility.png',
    github: null,
    demo: 'https://www.vaemobility.com.br/',
    destaque: true,
    tipo: 'fullstack',
    icone: 'globe'
  },
  {
    id: 5,
    key: 'psi-amanda',
    tecnologias: ['Next.js', 'React', 'CSS', 'JavaScript', 'Responsive Design'],
    imagem: '/psi-amanda.png',
    github: null,
    demo: 'https://psi-amanda.rudio1.com.br/',
    destaque: false,
    tipo: 'frontend',
    icone: 'globe'
  },
  {
    id: 6,
    key: 'trafego',
    tecnologias: ['Next.js', 'React', 'CSS', 'JavaScript', 'Responsive Design'],
    imagem: '/trafego.png',
    github: null,
    demo: 'https://trafego.agcustom.com.br/',
    destaque: false,
    tipo: 'frontend',
    icone: 'globe'
  },
  {
    id: 7,
    key: 'agcustom',
    tecnologias: ['Next.js', 'React', 'CSS', 'JavaScript', 'Responsive Design'],
    imagem: '/ag-custom.png',
    github: 'https://github.com/Rudio1/website_AG-Custom',
    demo: 'https://www.agcustom.com.br/',
    destaque: false,
    tipo: 'frontend',
    icone: 'globe'
  }
];
