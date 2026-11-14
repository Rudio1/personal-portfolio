'use client';

import styles from './Experience.module.css';
import SectionHeading from './SectionHeading';
import { useTranslations } from '../contexts/TranslationContext';
import { experiencias } from '../data/experiencia';

export default function Experience() {
  const { t } = useTranslations();

  return (
    <section id="experiencia" className="section" aria-labelledby="experiencia-title">
      <div className="sectionGrid">
        <SectionHeading id="experiencia-title" index="03" title={t('experience.title')} />

        <ol className={styles.list}>
          {experiencias.map((item) => {
            const base = `experience.items.${item.key}`;
            const current = item.end === null;

            return (
              <li key={item.key} className={styles.item}>
                <p className={styles.period}>
                  {current ? <span className={styles.live} aria-hidden="true" /> : null}
                  {item.start} — {item.end ?? t('experience.present')}
                </p>
                <div className={styles.content}>
                  <h3 className={styles.role}>{t(`${base}.role`)}</h3>
                  <p className={styles.company}>
                    {item.company} · {t(`${base}.location`)}
                  </p>
                  <p className={styles.description}>{t(`${base}.description`)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
