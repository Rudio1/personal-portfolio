'use client';

import { useState, useCallback } from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';
import styles from './projetos.module.css';
import { useTranslations } from '../../contexts/TranslationContext';
import { LoadingSkeleton, LoadingSkeletonInline } from '../../components/LoadingSkeleton';
import ContactModal from '../../components/ContactModal';
import { ProjetoCard } from '../../components/ProjetoCard';
import { projetos } from '../../data/projetos';

export default function Projetos() {
  const { t, isLoading } = useTranslations();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const handleCloseModal = useCallback(() => setIsContactModalOpen(false), []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {isLoading ? <LoadingSkeleton lines={1} className={styles.titleSkeleton} /> : t('projects.title')}
          </h1>
          <p className={styles.subtitle}>
            {isLoading ? <LoadingSkeletonInline className={styles.subtitleSkeleton} /> : t('projects.subtitle')}
          </p>
        </div>

        <div className={styles.projetosGrid}>
          {projetos.map((projeto) => (
            <ProjetoCard
              key={projeto.id}
              projeto={projeto}
              title={t(`projects.items.${projeto.key}.title`)}
              description={t(`projects.items.${projeto.key}.description`)}
              tipoLabel={t(`projects.types.${projeto.tipo}`)}
              destaqueLabel={t('projects.badges.destaque')}
              frontendButtonLabel={t('projects.buttons.frontend')}
              backendButtonLabel={t('projects.buttons.backend')}
              demoButtonLabel={t('projects.buttons.demo')}
              isLoading={isLoading}
            />
          ))}
        </div>

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            {isLoading ? <LoadingSkeletonInline className={styles.ctaTextSkeleton} /> : t('projects.cta.text')}
          </p>
          <div className={styles.ctaButtons}>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className={styles.ctaButton}
            >
              {isLoading ? <LoadingSkeleton lines={1} className={styles.ctaButtonSkeleton} /> : t('projects.cta.contact')}
              <MessageCircle size={16} />
            </button>
            <a href="/curriculo/Curriculo - Rudio.pdf" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonSecondary}>
              {isLoading ? <LoadingSkeleton lines={1} className={styles.ctaButtonSkeleton} /> : t('projects.cta.resume')}
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </main>

      <ContactModal isOpen={isContactModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
