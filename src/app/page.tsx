'use client';

import Image from 'next/image';
import styles from "./page.module.css";
import { useTranslations } from '../contexts/TranslationContext';
import { LoadingText, LoadingSkeleton } from '../components/LoadingSkeleton';
import { ExternalLink } from 'lucide-react';

export default function Home() {
  const { t, isLoading } = useTranslations();
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.profileSection}>
          <div className={styles.textContent}>
          <h1 className={styles.title}>
            <div className={styles.titleLine}>
              {isLoading ? <LoadingText className={styles.titleSkeleton} /> : t('home.title').split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
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
                
                <div className={styles.logosCarousel}>
                  <div className={styles.carouselTrack}>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/azure.svg" alt="Azure" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/dotnet.svg" alt=".NET" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/sql.svg" alt="SQL Server" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/react.svg" alt="React" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/next.svg" alt="Next.js" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/csharp.svg" alt="C#" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/php.svg" alt="PHP" width={40} height={40} />
                    </div>
                    {/* Duplicar para efeito infinito */}
                    <div className={styles.carouselItem}>
                      <Image src="/logos/azure.svg" alt="Azure" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/dotnet.svg" alt=".NET" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/sql.svg" alt="SQL Server" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/react.svg" alt="React" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/next.svg" alt="Next.js" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/csharp.svg" alt="C#" width={40} height={40} />
                    </div>
                    <div className={styles.carouselItem}>
                      <Image src="/logos/php.svg" alt="PHP" width={40} height={40} />
                    </div>
                  </div>
                </div>
                
                <p>
                  {t('home.objective')}
                </p>
              </>
            )}
          </div>
          </div>
          
          <div className={styles.profileImage}>
          <Image
            src="/guilherme-rudio.png"
            alt="Rudio - Foto de perfil"
            width={200}
            height={200}
            priority
            className={styles.roundImage}
          />
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
                <ExternalLink size={16} style={{ marginLeft: '8px' }} />
              </a>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
