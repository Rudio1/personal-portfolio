'use client';

import Image from 'next/image';
import styles from "./page.module.css";
import { useTranslations } from '../contexts/TranslationContext';
import { LoadingText, LoadingSkeleton } from '../components/LoadingSkeleton';

export default function Home() {
  const { t, isLoading } = useTranslations();
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            <Image
              src="/img-rudio.png"
              alt="Rudio - Foto de perfil"
              width={200}
              height={200}
              priority
              className={styles.roundImage}
            />
          </div>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              <div className={styles.titleLine}>
                {isLoading ? <LoadingText className={styles.titleSkeleton} /> : t('home.title')}
              </div>
            </h1>
            <div className={styles.subtitle}>
              {isLoading ? (
                <LoadingSkeleton lines={3} />
              ) : (
                <>
                  <p>
                    {t('home.subtitle')}
                  </p>
                  
                  <p>
                    {t('home.description')}
                  </p>
                  
                  <p>
                    {t('home.objective')}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.ctas}>
          {isLoading ? (
            <div className={styles.ctasSkeleton}>
              <div className={styles.skeletonButton}></div>
              <div className={styles.skeletonButton}></div>
            </div>
          ) : (
            <>
              <a href="/projetos" className={styles.primary}>
                {t('home.cta.projects')}
              </a>
              <a href="/curriculo/Curriculo - Rudio.pdf" target="_blank" rel="noopener noreferrer" className={styles.secondary}>
                {t('home.cta.resume')}
              </a>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
