// src/app/projetos/page.tsx
import Image from 'next/image';
import { ExternalLink, Github, Globe, Database, Smartphone, Monitor } from 'lucide-react';
import styles from './projetos.module.css';

// Dados dos projetos baseados nos repositórios reais
const projetos = [
  {
    id: 1,
    titulo: 'Vegeta Final PI - API Mobile',
    descricao: 'API Laravel para backend de aplicativo mobile de pedais de guitarra. Sistema completo com autenticação, gestão de produtos, avaliações, comentários e transferência de produtos entre usuários.',
    tecnologias: ['Laravel', 'PHP', 'MySQL', 'API REST', 'JWT'],
    imagem: '/vegeta.png',
    github: 'https://github.com/frotaitalo/vegeta-final-pi',
    demo: null,
    destaque: true,
    tipo: 'Backend',
    icone: <Database size={20} />
  },
  {
    id: 2,
    titulo: 'Cyber Gallery',
    descricao: 'Galeria de fotos moderna e responsiva com design cyberpunk. Interface elegante para exibição de imagens com efeitos visuais e navegação intuitiva.',
    tecnologias: ['Next.js', 'TypeScript', 'Responsive Design', 'AWS S3 Bucket', 'GSAP'],
    imagem: '/cybergallery.png',
    github: 'https://github.com/Rudio1/cyberGallery',
    demo: null,
    destaque: true,
    tipo: 'Frontend',
    icone: <Globe size={20} />
  },
  {
    id: 3,
    titulo: 'Sistema de Gestão de Refeições',
    descricao: 'Aplicação web para gerenciamento de refeições com frontend e backend. Sistema completo para controle de cardápios, ingredientes e planejamento alimentar.',
    tecnologias: ['React', 'Node.js', 'Express', 'TypeScript', 'Next.js', 'SQL Server', 'JWT'],
    imagem: '/refeicoes.png',
    github: 'https://github.com/Rudio1/front-meals',
    githubBackend: 'https://github.com/Rudio1/api-meals',
    demo: null,
    destaque: true,
    tipo: 'Full Stack',
    icone: <Monitor size={20} />
  },
  {
    id: 4,
    titulo: 'Sistema de Gerenciamento de Tarefas',
    descricao: 'Sistema web completo para gerenciamento de tarefas com frontend e backend separados. Interface moderna e intuitiva para criação, edição e acompanhamento de tarefas.',
    tecnologias: ['C#', '.NET', 'SQL Server', 'Entity Framework', 'JWT'],
    imagem: '/tarefas.png',
    github: 'https://github.com/Rudio1/FrontEndTaskAPI',
    githubBackend: 'https://github.com/Rudio1/CrudTaskAPI',
    demo: null,
    destaque: false,
    tipo: 'Full Stack',
    icone: <Monitor size={20} />
  },
  {
    id: 5,
    titulo: 'Website Brunelly Baiocco',
    descricao: 'Website profissional desenvolvido para Brunelly Baiocco. Design elegante e responsivo com foco em apresentação pessoal e portfólio.',
    tecnologias: ['Next.js', 'Responsive Design'],
    imagem: '/brunelly.png',
    github: 'https://github.com/Rudio1/website_brunelly_baiocco',
    demo: null,
    destaque: false,
    tipo: 'Frontend',
    icone: <Globe size={20} />
  },
  {
    id: 6,
    titulo: 'Website AG Custom',
    descricao: 'Website corporativo para AG Custom com design moderno e funcional. Interface profissional para apresentação de serviços e produtos da empresa.',
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    imagem: '/ag-custom.png',
    github: 'https://github.com/Rudio1/website_AG-Custom',
    demo: null,
    destaque: false,
    tipo: 'Frontend',
    icone: <Globe size={20} />
  }
];

export default function Projetos() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Meus <span className={styles.highlight}>Projetos</span>
          </h1>
          <p className={styles.subtitle}>
            Uma seleção dos projetos que desenvolvi, demonstrando minhas habilidades técnicas e criatividade.
          </p>
        </div>
        
        <div className={styles.projetosGrid}>
          {projetos.map((projeto) => (
            <article key={projeto.id} className={`${styles.projetoCard} ${projeto.destaque ? styles.destaque : ''}`}>
              <div className={styles.projetoImagem}>
                <Image
                  src={projeto.imagem}
                  alt={`${projeto.titulo} - Screenshot do projeto`}
                  width={400}
                  height={250}
                  className={styles.imagem}
                  priority={projeto.destaque}
                />
                {projeto.destaque && (
                  <div className={styles.badgeDestaque}>
                    <span>Destaque</span>
                  </div>
                )}
                <div className={styles.tipoBadge}>
                  {projeto.icone}
                  <span>{projeto.tipo}</span>
                </div>
              </div>
              
              <div className={styles.projetoConteudo}>
                <h3 className={styles.projetoTitulo}>{projeto.titulo}</h3>
                <p className={styles.projetoDescricao}>{projeto.descricao}</p>
                
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
                    Frontend
                  </a>
                  {projeto.githubBackend && (
                    <a 
                      href={projeto.githubBackend} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${styles.linkButton} ${styles.backendButton}`}
                    >
                      <Database size={16} />
                      Backend
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
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Interessado em colaborar em um projeto?
          </p>
          <a href="/curriculo" className={styles.ctaButton}>
            Entre em Contato
            <ExternalLink size={16} />
          </a>
        </div>
      </main>
    </div>
  );
}

