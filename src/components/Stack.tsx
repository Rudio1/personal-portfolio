'use client';

import styles from './Stack.module.css';
import SectionHeading from './SectionHeading';
import { useTranslations } from '../contexts/TranslationContext';
import { stack } from '../data/stack';

export default function Stack() {
  const { t } = useTranslations();

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="sectionGrid">
        <SectionHeading id="stack-title" index="04" title={t('stack.title')} />

        <div className={styles.body}>
          <p className={styles.intro}>{t('stack.intro')}</p>

          <div className={styles.grid}>
            {stack.map((category) => (
              <div key={category.key} className={styles.category}>
                <h3 className={styles.categoryTitle}>{t(`stack.categories.${category.key}`)}</h3>
                <ul className={styles.items}>
                  {category.items.map((item) => (
                    <li key={item.name} className={styles.item}>
                      <span className={styles.bullet} aria-hidden="true" />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
