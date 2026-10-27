'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import styles from './page.module.css';
import buttons from '../components/button.module.css';
import { useTranslations } from '../contexts/TranslationContext';

const logos = [
  { src: '/logos/azure.svg', alt: 'Azure' },
  { src: '/logos/dotnet.svg', alt: '.NET' },
  { src: '/logos/sql.svg', alt: 'SQL Server' },
  { src: '/logos/react.svg', alt: 'React' },
  { src: '/logos/next.svg', alt: 'Next.js' },
  { src: '/logos/csharp.svg', alt: 'C#' },
  { src: '/logos/php.svg', alt: 'PHP' },
];

const workKeys = ['agropulse', 'vae-mobility', 'ag-clinical'] as const;

export default function Home() {
  const { t } = useTranslations();
  const lines = t('home.title').split('\n');
  const hasName = lines.length > 1;
  const greeting = hasName ? lines[0] : '';
  const name = hasName ? lines.slice(1).join(' ') : lines[0];
  const description = t('home.description').trim();
  const objective = t('home.objective').trim();

  return (
    <div className={styles.page}>
      <main id="conteudo" className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.copy}>
            <p className={`${styles.eyebrow} ${styles.enter}`}>{t('home.eyebrow')}</p>
            {greeting ? (
              <p className={`${styles.greeting} ${styles.enter} ${styles.tGreeting}`}>{greeting}</p>
            ) : null}
            <h1 className={`${styles.display} ${styles.enter} ${styles.tName}`}>{name}</h1>
            <p className={`${styles.subtitle} ${styles.enter} ${styles.tSubtitle}`}>{t('home.subtitle')}</p>
            {description ? <p className={styles.subtitle}>{description}</p> : null}
            {objective ? <p className={styles.subtitle}>{objective}</p> : null}
            <div className={`${styles.ctas} ${styles.enter} ${styles.tCtas}`}>
              <Link href="/projetos" className={buttons.primary}>
                {t('home.cta.projects')}
              </Link>
              <a
                href="/curriculo/Curriculo - Rudio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={buttons.secondary}
              >
                {t('home.cta.resume')}
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
            <ul className={`${styles.logos} ${styles.enter} ${styles.tLogos}`}>
              {logos.map((logo) => (
                <li key={logo.src} className={styles.logoItem}>
                  <Image src={logo.src} alt={logo.alt} width={28} height={28} />
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.portraitWrap} ${styles.enter} ${styles.tPhoto}`}>
            <Image
              src="/guilherme-rudio.png"
              alt={t('home.portraitAlt')}
              width={840}
              height={1050}
              sizes="(max-width: 767px) 280px, (max-width: 1023px) 320px, 420px"
              className={styles.portrait}
            />
          </div>
        </section>

        <section className={`${styles.work} ${styles.workEnter}`} aria-labelledby="work-heading">
          <h2 id="work-heading" className={styles.workTitle}>{t('home.work')}</h2>
          <ol className={styles.workList}>
            {workKeys.map((key, index) => (
              <li key={key}>
                <Link href={`/projetos#${key}`} className={styles.workLink}>
                  <span className={styles.workIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span>{t(`projects.items.${key}.title`)}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
