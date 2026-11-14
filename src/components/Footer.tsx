'use client';

import { ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';
import { useTranslations } from '../contexts/TranslationContext';

export default function Footer() {
  const { t } = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>Rudio</p>
        <p className={styles.meta}>
          © {year} Guilherme Rudio · {t('footer.built')}
        </p>
        <a href="#conteudo" className={styles.top}>
          {t('footer.top')}
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
