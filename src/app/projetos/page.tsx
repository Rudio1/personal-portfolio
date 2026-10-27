'use client';

import { useState, useCallback } from 'react';
import { ExternalLink } from 'lucide-react';
import styles from './projetos.module.css';
import buttons from '../../components/button.module.css';
import { useTranslations } from '../../contexts/TranslationContext';
import ContactModal from '../../components/ContactModal';
import { ProjetoCard } from '../../components/ProjetoCard';
import { projetos } from '../../data/projetos';

export default function Projetos() {
  const { t } = useTranslations();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const handleCloseModal = useCallback(() => setIsContactModalOpen(false), []);

  return (
    <div className={styles.page}>
      <main id="conteudo" className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('projects.title')}</h1>
          <p className={styles.subtitle}>{t('projects.subtitle')}</p>
        </header>

        <div className={styles.list}>
          {projetos.map((projeto) => (
            <ProjetoCard
              key={projeto.id}
              projeto={projeto}
              title={t(`projects.items.${projeto.key}.title`)}
              description={t(`projects.items.${projeto.key}.description`)}
              tipoLabel={t(`projects.types.${projeto.tipo}`)}
              frontendButtonLabel={t('projects.buttons.frontend')}
              backendButtonLabel={t('projects.buttons.backend')}
              demoButtonLabel={t('projects.buttons.demo')}
            />
          ))}
        </div>

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>{t('projects.cta.text')}</p>
          <div className={styles.ctaButtons}>
            <button type="button" onClick={() => setIsContactModalOpen(true)} className={buttons.primary}>
              {t('projects.cta.contact')}
            </button>
            <a
              href="/curriculo/Curriculo - Rudio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={buttons.secondary}
            >
              {t('projects.cta.resume')}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </main>

      <ContactModal isOpen={isContactModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
