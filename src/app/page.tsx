import Image from 'next/image';
import styles from "./page.module.css";

export default function Home() {
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
              Olá, eu sou <span className={styles.highlight}>Rudio</span>
            </h1>
            <p className={styles.subtitle}>
              Desenvolvedor Full Stack.
            </p>
          </div>
        </div>
        
        <div className={styles.ctas}>
          <a href="/projetos" className={styles.primary}>
            Ver Projetos
          </a>
          <a href="/curriculo" className={styles.secondary}>
            Currículo
          </a>
        </div>
      </main>
    </div>
  );
}
