'use client';

import Image from 'next/image';
import { ArrowDown, ExternalLink } from 'lucide-react';
import styles from './page.module.css';
import buttons from '../components/button.module.css';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Experience from '../components/Experience';
import Stack from '../components/Stack';
import ContactSection from '../components/ContactSection';
import { useTranslations } from '../contexts/TranslationContext';

export default function Home() {
  const { t } = useTranslations();
  const nameParts = t('hero.name').split(' ');

  return (
    <main id="conteudo" className={styles.main}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.copy}>
            <p className={`${styles.label} ${styles.enter}`}>
              <span className={styles.dot} aria-hidden="true" />
              {t('hero.label')}
            </p>
            <h1 id="hero-title" className={`${styles.display} ${styles.enter} ${styles.tName}`}>
              {nameParts.map((part) => (
                <span key={part} className={styles.nameLine}>
                  {part}
                </span>
              ))}
            </h1>
            <p className={`${styles.tagline} ${styles.enter} ${styles.tSubtitle}`}>{t('hero.tagline')}</p>
            <div className={`${styles.ctas} ${styles.enter} ${styles.tCtas}`}>
              <a href="#projetos" className={buttons.primary}>
                {t('hero.cta.projects')}
              </a>
              <a href="#contato" className={buttons.secondary}>
                {t('hero.cta.contact')}
              </a>
            </div>
          </div>

          <div className={`${styles.portraitWrap} ${styles.enter} ${styles.tPhoto}`}>
            <Image
              src="/guilherme-rudio.png"
              alt={t('home.portraitAlt')}
              width={840}
              height={1050}
              priority
              sizes="(max-width: 767px) 240px, (max-width: 1023px) 280px, 340px"
              className={styles.portrait}
            />
          </div>

          <div className={`${styles.heroFoot} ${styles.enter} ${styles.tLogos}`}>
            <a href="#sobre" className={styles.scroll}>
              <ArrowDown size={14} aria-hidden="true" className={styles.scrollIcon} />
              {t('hero.scroll')}
            </a>
            <a
              href="/curriculo/Curriculo - Rudio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resume}
            >
              {t('home.cta.resume')}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <About />
      <FeaturedProjects />
      <Experience />
      <Stack />
      <ContactSection />
    </main>
  );
}
