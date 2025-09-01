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
              <div className={styles.titleLine}>Olá,</div>
              <div className={styles.titleLine}>
                Eu sou <span className={styles.highlight}>Rudio</span>
              </div>
            </h1>
            <div className={styles.subtitle}>
              <p>
                Com uma sólida experiência em desenvolvimento Full Stack, atuo na criação de aplicações escaláveis, seguras e centradas no usuário. Nos últimos anos, participei do design e implementação de funcionalidades inovadoras tanto no front-end quanto no back-end, garantindo performance, manutenção simples e experiências fluídas.
              </p>
              
              <p>
                Tenho domínio em tecnologias como C#, .NET, PHP, Laravel, React, Node.js e bancos de dados SQL/NoSQL, além de experiência com desenvolvimento de APIs, autenticação e integração em nuvem. Meu foco é entregar soluções digitais confiáveis e eficientes, sempre aplicando boas práticas e qualidade de código.
              </p>
              
              <p>
                Movido por curiosidade e aprendizado contínuo, meu objetivo é desenvolver soluções que conectem pessoas e tecnologia de forma efetiva e impactante.
              </p>
            </div>
          </div>
        </div>
        
        <div className={styles.ctas}>
          <a href="/projetos" className={styles.primary}>
            Ver Projetos
          </a>
          <a href="/curriculo/Curriculo - Rudio.pdf" target="_blank" rel="noopener noreferrer" className={styles.secondary}>
            Currículo
          </a>
        </div>
      </main>
    </div>
  );
}
