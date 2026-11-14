'use client';

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import styles from './page.module.css';
import buttons from '../components/button.module.css';
import HeroArt from '../components/HeroArt';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Experience from '../components/Experience';
import Stack from '../components/Stack';
import ContactSection from '../components/ContactSection';
import { useTranslations } from '../contexts/TranslationContext';
import { projetos } from '../data/projetos';
import { experiencias } from '../data/experiencia';

export default function Home() {
  const { t } = useTranslations();
  const [firstName, ...rest] = t('hero.name').split(' ');
  const lastName = rest.join(' ');

  const facts = [
    { label: t('hero.facts.since'), value: '2022' },
    { label: t('hero.facts.projects'), value: String(projetos.length).padStart(2, '0') },
    { label: t('hero.facts.companies'), value: String(experiencias.length).padStart(2, '0') },
    { label: t('hero.facts.current'), value: experiencias[0].company.replace('Grupo ', ''), accent: true },
  ];

  return (
    <main id="conteudo" className={styles.main}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroInner}`}>
          <div className={`${styles.strip} sceneRise`}>
            <span>{t('hero.label')}</span>
            <a href="https://github.com/Rudio1" target="_blank" rel="noopener noreferrer" className={styles.stripLink}>
              github.com/Rudio1
            </a>
          </div>

          <div className={styles.stage}>
            <div className={styles.copy}>
              <p className={`${styles.plateRow} sceneRise`} style={{ animationDelay: '200ms' }}>
                <span className="plate">{t('hero.plate')}</span>
              </p>

              <div className={styles.kicker}>
                <span className={`${styles.kickerRule} sceneRule`} style={{ animationDelay: '260ms' }} aria-hidden="true" />
                <p className={`${styles.kickerText} sceneRise`} style={{ animationDelay: '320ms' }}>
                  {t('about.facts.role')}
                </p>
              </div>

              <h1 id="hero-title" className={`${styles.display} sceneIdentity`} style={{ animationDelay: '480ms' }}>
                <span className={styles.inkLight}>{firstName}</span>
                <span className={styles.inkAccent}>{lastName}</span>
              </h1>

              <div className={styles.divider} aria-hidden="true">
                <span className={`${styles.dividerLine} sceneRule`} style={{ animationDelay: '380ms' }} />
                <span className={`${styles.dividerText} sceneRise`} style={{ animationDelay: '700ms' }}>
                  C# · .NET · Angular · React · SQL
                </span>
                <span className={`${styles.dividerShort} sceneRule`} style={{ animationDelay: '440ms' }} />
              </div>

              <p className={`${styles.tagline} sceneRise`} style={{ animationDelay: '760ms' }}>
                {t('hero.tagline')}
              </p>

              <div className={`${styles.ctas} sceneRise`} style={{ animationDelay: '840ms' }}>
                <a href="#projetos" className={buttons.primary}>
                  {t('hero.cta.projects')}
                  <ArrowDown size={14} aria-hidden="true" />
                </a>
                <a href="#contato" className={buttons.secondary}>
                  {t('hero.cta.contact')}
                </a>
                <a
                  href="/curriculo/Curriculo - Rudio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resume}
                >
                  {t('hero.resume')}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className={`${styles.artWrap} sceneFade`} style={{ animationDelay: '300ms' }}>
              <HeroArt portraitAlt={t('home.portraitAlt')} />
            </div>
          </div>

          <dl className={`${styles.ticket} sceneRise`} style={{ animationDelay: '880ms' }}>
            {facts.map((fact) => (
              <div key={fact.label} className={styles.ticketCell}>
                <dt className={styles.ticketLabel}>{fact.label}</dt>
                <dd className={`${styles.ticketValue} ${fact.accent ? styles.ticketAccent : ''}`}>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <a href="#sobre" className={`${styles.scroll} sceneRise`} style={{ animationDelay: '1000ms' }}>
            <span className={`${styles.scrollDot} pulse`} aria-hidden="true" />
            {t('hero.scroll')}
          </a>
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
