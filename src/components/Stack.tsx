'use client';

import styles from './Stack.module.css';
import SectionHeading from './SectionHeading';
import { useTranslations } from '../contexts/TranslationContext';
import { stack } from '../data/stack';

export default function Stack() {
  const { t } = useTranslations();

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className={styles.top}>
        <SectionHeading id="stack-title" index="04" title={t('stack.title')} />
        <p className={styles.intro}>{t('stack.intro')}</p>
      </div>

      <ol className={styles.rows}>
        {stack.map((category, index) => (
          <li key={category.key} className={styles.row}>
            <div className={styles.rowHead}>
              <span className={styles.rowIndex} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.rowTitle}>{t(`stack.categories.${category.key}`)}</h3>
            </div>
            <ul className={styles.chips}>
              {category.items.map((item) => (
                <li key={item.name} className={styles.chip}>
                  {item.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
