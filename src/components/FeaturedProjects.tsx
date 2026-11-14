'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import styles from './FeaturedProjects.module.css';
import buttons from './button.module.css';
import SectionHeading from './SectionHeading';
import { useTranslations } from '../contexts/TranslationContext';
import { projetos } from '../data/projetos';

const detailKeys = ['problem', 'role', 'results'] as const;

export default function FeaturedProjects() {
  const { t } = useTranslations();
  const featured = projetos.filter((projeto) => projeto.destaque);

  return (
    <section id="projetos" className="section" aria-labelledby="projetos-title">
      <div className={styles.top}>
        <SectionHeading id="projetos-title" index="02" title={t('featured.title')} />
      </div>

      <div className={styles.list}>
        {featured.map((projeto, index) => {
          const base = `projects.items.${projeto.key}`;
          const title = t(`${base}.title`);
          const host = projeto.demo ? new URL(projeto.demo).hostname.replace(/^www\./, '') : '';
          const features = t(`${base}.features`)
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean);
          const details = detailKeys
            .map((key) => ({ key, value: t(`${base}.${key}`).trim() }))
            .filter((detail) => detail.value);

          return (
            <article
              key={projeto.key}
              className={`${styles.case} ${index % 2 === 1 ? styles.reverse : ''}`}
              aria-labelledby={`case-${projeto.key}`}
            >
              <div className={styles.media}>
                <div className={styles.window}>
                  <div className={styles.windowBar} aria-hidden="true">
                    <span className={styles.dots}>
                      <span />
                      <span />
                      <span />
                    </span>
                    {host ? <span className={styles.url}>{host}</span> : null}
                  </div>
                  <div className={styles.viewport}>
                    <Image
                      src={projeto.imagem}
                      alt={title}
                      width={1200}
                      height={750}
                      sizes="(max-width: 1023px) 92vw, 640px"
                      className={styles.image}
                      style={{
                        objectPosition: projeto.imagemFoco,
                        transform: projeto.imagemZoom ? `scale(${projeto.imagemZoom})` : undefined,
                        transformOrigin: projeto.imagemFoco,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.body}>
                <p className={styles.meta}>
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <span>{t(`${base}.category`)}</span>
                </p>
                <h3 id={`case-${projeto.key}`} className={styles.title}>
                  {title}
                </h3>
                <p className={styles.description}>{t(`${base}.description`)}</p>

                {features.length > 0 ? (
                  <div className={styles.block}>
                    <p className={styles.label}>{t('featured.labels.features')}</p>
                    <ul className={styles.features}>
                      {features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {details.length > 0 ? (
                  <dl className={styles.details}>
                    {details.map((detail) => (
                      <div key={detail.key} className={styles.block}>
                        <dt className={styles.label}>{t(`featured.labels.${detail.key}`)}</dt>
                        <dd className={styles.detailText}>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <div className={styles.block}>
                  <p className={styles.label}>{t('featured.labels.stack')}</p>
                  <ul className={styles.tags}>
                    {projeto.tecnologias.map((tech) => (
                      <li key={tech} className={styles.tag}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.links}>
                  {projeto.demo ? (
                    <a href={projeto.demo} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {t('projects.buttons.demo')}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : null}
                  {projeto.github ? (
                    <a href={projeto.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      <Github size={16} aria-hidden="true" />
                      GitHub
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.more}>
        <Link href="/projetos" className={buttons.secondary}>
          {t('featured.all')}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
