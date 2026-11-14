'use client';

import styles from './About.module.css';
import SectionHeading from './SectionHeading';
import { useTranslations } from '../contexts/TranslationContext';

const factKeys = ['since', 'role', 'education', 'english'] as const;

export default function About() {
  const { t } = useTranslations();

  return (
    <section id="sobre" className="section" aria-labelledby="sobre-title">
      <div className="sectionGrid">
        <SectionHeading id="sobre-title" index="01" title={t('about.title')} />

        <div className={styles.body}>
          <p className={styles.lead}>{t('about.p1')}</p>
          <div className={styles.columns}>
            <p className={styles.text}>{t('about.p2')}</p>
            <p className={styles.text}>{t('about.p3')}</p>
          </div>

          <ul className={styles.facts}>
            {factKeys.map((key) => (
              <li key={key} className={styles.fact}>
                {t(`about.facts.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
