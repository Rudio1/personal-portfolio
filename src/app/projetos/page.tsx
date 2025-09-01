// src/app/projetos/page.tsx
'use client';

import Image from 'next/image';
import { ExternalLink, Github, Globe, Database, Monitor } from 'lucide-react';
import styles from './projetos.module.css';
import { useTranslations } from '../../contexts/TranslationContext';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';

// Dados dos projetos baseados nos repositórios reais
const projetos = [
  {
    id: 1,
    key: 'vegeta',
    tecnologias: ['Laravel', 'PHP', 'MySQL', 'API REST', 'JWT'],
    imagem: '/vegeta.png',
    github: 'https://github.com/frotaitalo/vegeta-final-pi',
    demo: null,
    destaque: true,
    tipo: 'backend',
    icone: <Database size={20} />
  },
  {
    id: 2,
    key: 'cybergallery',
    tecnologias: ['Next.js', 'TypeScript', 'Responsive Design', 'AWS S3 Bucket', 'GSAP'],
    imagem: '/cybergallery.png',
    github: 'https://github.com/Rudio1/cyberGallery',
    demo: null,
    destaque: true,
    tipo: 'frontend',
    icone: <Globe size={20} />
  },
  {
    id: 3,
    key: 'refeicoes',
    tecnologias: ['React', 'Node.js', 'Express', 'TypeScript', 'Next.js', 'SQL Server', 'JWT'],
    imagem: '/refeicoes.png',
    github: 'https://github.com/Rudio1/front-meals',
    githubBackend: 'https://github.com/Rudio1/api-meals',
    demo: null,
    destaque: true,
    tipo: 'fullstack',
    icone: <Monitor size={20} />
  },
  {
    id: 4,
    key: 'tarefas',
    tecnologias: ['C#', '.NET', 'SQL Server', 'Entity Framework', 'JWT'],
    imagem: '/tarefas.png',
    github: 'https://github.com/Rudio1/FrontEndTaskAPI',
    githubBackend: 'https://github.com/Rudio1/CrudTaskAPI',
    demo: null,
    destaque: false,
    tipo: 'fullstack',
    icone: <Monitor size={20} />
  },
  {
    id: 5,
    key: 'brunelly',
    tecnologias: ['Next.js', 'Responsive Design'],
    imagem: '/brunelly.png',
    github: 'https://github.com/Rudio1/website_brunelly_baiocco',
    demo: null,
    destaque: false,
    tipo: 'frontend',
    icone: <Globe size={20} />
  },
  {
    id: 6,
    key: 'agcustom',
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    imagem: '/ag-custom.png',
    github: 'https://github.com/Rudio1/website_AG-Custom',
    demo: null,
    destaque: false,
    tipo: 'frontend',
    icone: <Globe size={20} />
  }
];

export default function Projetos() {
  const { t, isLoading } = useTranslations();
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {isLoading ? <LoadingSkeleton lines={1} className={styles.titleSkeleton} /> : t('projects.title')}
          </h1>
          <p className={styles.subtitle}>
            {isLoading ? <LoadingSkeleton lines={2} className={styles.subtitleSkeleton} /> : t('projects.subtitle')}
          </p>
        </div>
        
        <div className={styles.projetosGrid}>
          {projetos.map((projeto) => (
            <article key={projeto.id} className={`${styles.projetoCard} ${projeto.destaque ? styles.destaque : ''}`}>
              <div className={styles.projetoImagem}>
                <Image
                  src={projeto.imagem}
                  alt={`${projeto.key} - Screenshot do projeto`}
                  width={400}
                  height={250}
                  className={styles.imagem}
                  priority={projeto.destaque}
                />
                {projeto.destaque && (
                  <div className={styles.badgeDestaque}>
                    <span>{isLoading ? <LoadingSkeleton lines={1} className={styles.badgeSkeleton} /> : t('projects.badges.destaque')}</span>
                  </div>
                )}
                <div className={styles.tipoBadge}>
                  {projeto.icone}
                  <span>{isLoading ? <LoadingSkeleton lines={1} className={styles.badgeSkeleton} /> : t(`projects.types.${projeto.tipo}`)}</span>
                </div>
              </div>
              
              <div className={styles.projetoConteudo}>
                <h3 className={styles.projetoTitulo}>
                  {isLoading ? <LoadingSkeleton lines={1} className={styles.projetoTituloSkeleton} /> : t(`projects.items.${projeto.key}.title`)}
                </h3>
                <p className={styles.projetoDescricao}>
                  {isLoading ? <LoadingSkeleton lines={3} className={styles.projetoDescricaoSkeleton} /> : t(`projects.items.${projeto.key}.description`)}
                </p>
                
                <div className={styles.tecnologias}>
                  {projeto.tecnologias.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className={styles.projetoLinks}>
                  <a 
                    href={projeto.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.linkButton} ${styles.frontendButton}`}
                  >
                    <Github size={16} />
                    {isLoading ? <LoadingSkeleton lines={1} className={styles.buttonSkeleton} /> : t('projects.buttons.frontend')}
                  </a>
                  {projeto.githubBackend && (
                    <a 
                      href={projeto.githubBackend} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${styles.linkButton} ${styles.backendButton}`}
                    >
                      <Database size={16} />
                      {isLoading ? <LoadingSkeleton lines={1} className={styles.buttonSkeleton} /> : t('projects.buttons.backend')}
                    </a>
                  )}
                  {projeto.demo && (
                    <a 
                      href={projeto.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${styles.linkButton} ${styles.demoButton}`}
                    >
                      <Globe size={16} />
                      {isLoading ? <LoadingSkeleton lines={1} className={styles.buttonSkeleton} /> : t('projects.buttons.demo')}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            {isLoading ? <LoadingSkeleton lines={2} className={styles.ctaTextSkeleton} /> : t('projects.cta.text')}
          </p>
          <a href="/curriculo/Curriculo - Rudio.pdf" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
            {isLoading ? <LoadingSkeleton lines={1} className={styles.ctaButtonSkeleton} /> : t('projects.cta.resume')}
            <ExternalLink size={16} />
          </a>
        </div>
      </main>
    </div>
  );
}

