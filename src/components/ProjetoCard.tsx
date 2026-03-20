'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Github, Globe, Database, Monitor } from 'lucide-react';
import styles from '../app/projetos/projetos.module.css';
import { LoadingSkeleton, LoadingSkeletonInline } from './LoadingSkeleton';

const ICONE_MAP = {
  database: Database,
  globe: Globe,
  monitor: Monitor
} as const;

type IconType = keyof typeof ICONE_MAP;

export interface ProjetoData {
  id: number;
  key: string;
  tecnologias: string[];
  imagem: string;
  github: string | null;
  githubBackend?: string | null;
  demo: string | null;
  destaque: boolean;
  tipo: 'backend' | 'frontend' | 'fullstack';
  icone: IconType;
}

interface ProjetoCardProps {
  projeto: ProjetoData;
  title: string;
  description: string;
  tipoLabel: string;
  destaqueLabel: string;
  frontendButtonLabel: string;
  backendButtonLabel: string;
  demoButtonLabel: string;
  isLoading?: boolean;
}

function ProjetoCardComponent({
  projeto,
  title,
  description,
  tipoLabel,
  destaqueLabel,
  frontendButtonLabel,
  backendButtonLabel,
  demoButtonLabel,
  isLoading = false
}: ProjetoCardProps) {
  const IconComponent = ICONE_MAP[projeto.icone];

  return (
    <article
      className={`${styles.projetoCard} ${projeto.destaque ? styles.destaque : ''}`}
    >
      <div className={styles.projetoImagem}>
        <Image
          src={projeto.imagem}
          alt={`${projeto.key} - Screenshot do projeto`}
          width={400}
          height={250}
          className={styles.imagem}
          priority={projeto.destaque}
          loading={projeto.destaque ? undefined : 'lazy'}
        />
        {projeto.destaque && (
          <div className={styles.badgeDestaque}>
            <span>{isLoading ? <LoadingSkeleton lines={1} className={styles.badgeSkeleton} /> : destaqueLabel}</span>
          </div>
        )}
        <div className={styles.tipoBadge}>
          <IconComponent size={20} />
          <span>{isLoading ? <LoadingSkeleton lines={1} className={styles.badgeSkeleton} /> : tipoLabel}</span>
        </div>
      </div>

      <div className={styles.projetoConteudo}>
        <h3 className={styles.projetoTitulo}>
          {isLoading ? <LoadingSkeleton lines={1} className={styles.projetoTituloSkeleton} /> : title}
        </h3>
        <p className={styles.projetoDescricao}>
          {isLoading ? <LoadingSkeletonInline className={styles.projetoDescricaoSkeleton} /> : description}
        </p>

        <div className={styles.tecnologias}>
          {projeto.tecnologias.map((tech) => (
            <span key={tech} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>

        <div className={styles.projetoLinks}>
          {projeto.github && (
            <a
              href={projeto.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.linkButton} ${projeto.tipo === 'backend' ? styles.backendButton : styles.frontendButton}`}
            >
              {projeto.tipo === 'backend' ? <Database size={16} /> : <Github size={16} />}
              {isLoading ? <LoadingSkeleton lines={1} className={styles.buttonSkeleton} /> : (projeto.tipo === 'backend' ? backendButtonLabel : frontendButtonLabel)}
            </a>
          )}
          {projeto.githubBackend && (
            <a
              href={projeto.githubBackend}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.linkButton} ${styles.backendButton}`}
            >
              <Database size={16} />
              {isLoading ? <LoadingSkeleton lines={1} className={styles.buttonSkeleton} /> : backendButtonLabel}
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
              {isLoading ? <LoadingSkeleton lines={1} className={styles.buttonSkeleton} /> : demoButtonLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export const ProjetoCard = memo(ProjetoCardComponent);
