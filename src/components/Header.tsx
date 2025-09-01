'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const menu = [
  {
    label: 'Sobre',
    href: '/',
  },
  {
    label: 'Projetos',
    href: '/projetos',
  },
  {
    label: 'Currículo',
    href: '/curriculo/Curriculo - Rudio.pdf',
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fechar menu ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Previne scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>
            <span>Rudio</span>
          </Link>
        </div>
        
        {/* Menu Desktop */}
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            {menu.map((item) => (
              <li key={item.href}>
                {item.href.includes('.pdf') ? (
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Botão Menu Mobile */}
        <button 
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X size={24} className={styles.menuIcon} />
          ) : (
            <Menu size={24} className={styles.menuIcon} />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      <div 
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <nav className={styles.mobileNavigation}>
          <ul className={styles.mobileNavList}>
            {menu.map((item) => (
              <li key={item.href}>
                {item.href.includes('.pdf') ? (
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.mobileNavLink}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    href={item.href} 
                    className={styles.mobileNavLink}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay para fechar menu */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={closeMenu}></div>
      )}
    </header>
  );
}

            