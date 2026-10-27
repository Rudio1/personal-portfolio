'use client';

import { memo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Github, Globe, Database } from 'lucide-react';
import styles from '../app/projetos/projetos.module.css';
import buttons from './button.module.css';

type IconType = 'database' | 'globe' | 'monitor';

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
  frontendButtonLabel: string;
  backendButtonLabel: string;
  demoButtonLabel: string;
}

function ProjetoCardComponent({
  projeto,
  title,
  description,
  tipoLabel,
  frontendButtonLabel,
  backendButtonLabel,
  demoButtonLabel,
}: ProjetoCardProps) {
  const articleRef = useRef<HTMLElement>(null);
  const textLed = projeto.key === 'vegeta';

  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let observer: IntersectionObserver | null = null;
    const frame = window.requestAnimationFrame(() => {
      el.classList.add(styles.canReveal);
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      if (inView) {
        el.classList.add(styles.isVisible);
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          el.classList.add(styles.isVisible);
          observer?.disconnect();
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return (
    <article
      id={projeto.key}
      ref={articleRef}
      className={`${styles.case} ${textLed ? styles.textLed : ''}`}
    >
      {textLed ? null : (
        <div className={styles.imageWrap}>
          <Image
            src={projeto.imagem}
            alt={title}
            width={1200}
            height={750}
            sizes="(max-width: 1023px) 100vw, 640px"
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.caseBody}>
        <p className={styles.meta}>{tipoLabel}</p>
        <h2 className={styles.caseTitle}>{title}</h2>
        <p className={styles.caseDescription}>{description}</p>

        <ul className={styles.tecnologias}>
          {projeto.tecnologias.map((tech) => (
            <li key={tech} className={styles.techTag}>
              {tech}
            </li>
          ))}
        </ul>

        <div className={styles.caseLinks}>
          {projeto.github && (
            <a
              href={projeto.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttons.secondary}
            >
              {projeto.tipo === 'backend' ? <Database size={16} aria-hidden="true" /> : <Github size={16} aria-hidden="true" />}
              {projeto.tipo === 'backend' ? backendButtonLabel : frontendButtonLabel}
            </a>
          )}
          {projeto.githubBackend && (
            <a
              href={projeto.githubBackend}
              target="_blank"
              rel="noopener noreferrer"
              className={buttons.secondary}
            >
              <Database size={16} aria-hidden="true" />
              {backendButtonLabel}
            </a>
          )}
          {projeto.demo && (
            <a
              href={projeto.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={buttons.secondary}
            >
              <Globe size={16} aria-hidden="true" />
              {demoButtonLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export const ProjetoCard = memo(ProjetoCardComponent);
