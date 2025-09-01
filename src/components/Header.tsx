'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslations } from '../contexts/TranslationContext';
import styles from './Header.module.css';

const menuItems = [
  {
    key: 'about',
    href: '/',
  },
  {
    key: 'projects',
    href: '/projetos',
  },
  {
    key: 'resume',
    href: '/curriculo/Curriculo - Rudio.pdf',
  },
];

// Componente de Bandeira usando SVGs
const FlagIcon = ({ country }: { country: 'br' | 'us' }) => {
  const flagSrc = country === 'br' ? '/brazil.svg' : '/usa.svg';
  
  return (
    <Image 
      src={flagSrc} 
      alt={`${country === 'br' ? 'Brasil' : 'Estados Unidos'} flag`}
      width={20}
      height={15}
      className={styles.flagImage}
    />
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { locale, changeLocale, t, isLoading } = useTranslations();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const switchLanguage = (newLocale: string) => {
    changeLocale(newLocale);
    setIsLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  // Fechar menu ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        setIsLanguageDropdownOpen(false);
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

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isLanguageDropdownOpen && !target.closest(`.${styles.languageDropdown}`)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

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
            {menuItems.map((item) => (
              <li key={item.href}>
                {item.href.includes('.pdf') ? (
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    {isLoading ? (
                      <div className={`${styles.navSkeleton} ${styles[`navSkeleton${item.key.charAt(0).toUpperCase() + item.key.slice(1)}`]}`}>
                        <div className={styles.skeletonLine}></div>
                      </div>
                    ) : (
                      t(`navigation.${item.key}`)
                    )}
                  </a>
                ) : (
                  <Link href={item.href} className={styles.navLink}>
                    {isLoading ? (
                      <div className={`${styles.navSkeleton} ${styles[`navSkeleton${item.key.charAt(0).toUpperCase() + item.key.slice(1)}`]}`}>
                        <div className={styles.skeletonLine}></div>
                      </div>
                    ) : (
                      t(`navigation.${item.key}`)
                    )}
                  </Link>
                )}
              </li>
            ))}
            <li className={styles.languageDropdown}>
              <button 
                onClick={toggleLanguageDropdown}
                className={styles.languageButton}
                aria-label="Select language"
                aria-expanded={isLanguageDropdownOpen}
              >
                <FlagIcon country={locale === 'pt' ? 'br' : 'us'} />
                <span>{locale === 'pt' ? 'PT' : 'EN'}</span>
                <ChevronDown size={14} className={`${styles.chevron} ${isLanguageDropdownOpen ? styles.chevronOpen : ''}`} />
              </button>
              
              {isLanguageDropdownOpen && (
                <div className={styles.languageDropdownMenu}>
                  <button 
                    onClick={() => switchLanguage('pt')}
                    className={`${styles.languageOption} ${locale === 'pt' ? styles.languageOptionActive : ''}`}
                  >
                    <FlagIcon country="br" />
                    <span>Português</span>
                  </button>
                  <button 
                    onClick={() => switchLanguage('en')}
                    className={`${styles.languageOption} ${locale === 'en' ? styles.languageOptionActive : ''}`}
                  >
                    <FlagIcon country="us" />
                    <span>English</span>
                  </button>
                </div>
              )}
            </li>
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
        <div className={styles.mobileHeader}>
          <div className={styles.mobileLogo}>
            <Link href="/" onClick={closeMenu}>
              <span>Rudio</span>
            </Link>
          </div>
        </div>
        <nav className={styles.mobileNavigation}>
          <ul className={styles.mobileNavList}>
            {menuItems.map((item) => (
              <li key={item.href}>
                {item.href.includes('.pdf') ? (
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.mobileNavLink}
                    onClick={closeMenu}
                  >
                    {t(`navigation.${item.key}`)}
                  </a>
                ) : (
                  <Link 
                    href={item.href} 
                    className={styles.mobileNavLink}
                    onClick={closeMenu}
                  >
                    {t(`navigation.${item.key}`)}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <div className={styles.mobileLanguageSection}>
                <h3 className={styles.mobileLanguageTitle}>Idioma / Language</h3>
                <div className={styles.mobileLanguageOptions}>
                  <button 
                    onClick={() => {
                      switchLanguage('pt');
                      closeMenu();
                    }}
                    className={`${styles.mobileLanguageOption} ${locale === 'pt' ? styles.mobileLanguageOptionActive : ''}`}
                  >
                    <FlagIcon country="br" />
                    <span>Português</span>
                  </button>
                  <button 
                    onClick={() => {
                      switchLanguage('en');
                      closeMenu();
                    }}
                    className={`${styles.mobileLanguageOption} ${locale === 'en' ? styles.mobileLanguageOptionActive : ''}`}
                  >
                    <FlagIcon country="us" />
                    <span>English</span>
                  </button>
                </div>
              </div>
            </li>
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

            