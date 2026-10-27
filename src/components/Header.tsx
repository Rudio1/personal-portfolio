'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslations } from '../contexts/TranslationContext';
import ContactModal from './ContactModal';
import styles from './Header.module.css';

const menuItems = [
  { key: 'about', href: '/' },
  { key: 'projects', href: '/projetos' },
];

const FlagIcon = ({ country }: { country: 'br' | 'us' }) => {
  const flagSrc = country === 'br' ? '/brazil.svg' : '/usa.svg';

  return (
    <Image
      src={flagSrc}
      alt=""
      width={20}
      height={15}
      className={styles.flagImage}
    />
  );
};

export default function Header() {
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale, changeLocale, t } = useTranslations();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const switchLanguage = (newLocale: string) => {
    changeLocale(newLocale);
    setIsLanguageDropdownOpen(false);
  };

  useEffect(() => {
    const sentinel = document.getElementById('scroll-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    });
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        setIsLanguageDropdownOpen(false);
      }
    };

    const menuButton = menuButtonRef.current;

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      document.querySelector<HTMLElement>('#mobile-menu a')?.focus();
    } else if (!document.querySelector('[role="dialog"]')) {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      const menu = document.getElementById('mobile-menu');
      if (menu && document.activeElement instanceof HTMLElement && menu.contains(document.activeElement)) {
        menuButton?.focus();
      }
      if (!document.querySelector('[role="dialog"]')) {
        document.body.style.overflow = '';
      }
    };
  }, [isMenuOpen]);

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

  const openContact = () => {
    setIsContactModalOpen(true);
  };

  return (
    <>
      <a href="#conteudo" className={styles.skipLink}>
        {t('a11y.skip')}
      </a>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/" onClick={closeMenu}>
              <span>Rudio</span>
            </Link>
          </div>

          <nav className={styles.navigation} aria-label={t('a11y.mainNav')}>
            <ul className={styles.navList}>
              {menuItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {t(`navigation.${item.key}`)}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button type="button" onClick={openContact} className={styles.contactButton}>
                  {t('navigation.contact')}
                </button>
              </li>
              <li className={styles.languageDropdown}>
                <button
                  type="button"
                  onClick={() => setIsLanguageDropdownOpen((open) => !open)}
                  className={styles.languageButton}
                  aria-label={t('a11y.selectLanguage')}
                  aria-expanded={isLanguageDropdownOpen}
                >
                  <FlagIcon country={locale === 'pt' ? 'br' : 'us'} />
                  <span>{locale === 'pt' ? 'PT' : 'EN'}</span>
                  <ChevronDown size={14} className={`${styles.chevron} ${isLanguageDropdownOpen ? styles.chevronOpen : ''}`} />
                </button>

                {isLanguageDropdownOpen && (
                  <div className={styles.languageDropdownMenu}>
                    <button
                      type="button"
                      onClick={() => switchLanguage('pt')}
                      className={`${styles.languageOption} ${locale === 'pt' ? styles.languageOptionActive : ''}`}
                    >
                      <FlagIcon country="br" />
                      <span>Português</span>
                    </button>
                    <button
                      type="button"
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

          <button
            type="button"
            ref={menuButtonRef}
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
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

        <div
          id="mobile-menu"
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <nav className={styles.mobileNavigation}>
            <ul className={styles.mobileNavList}>
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.mobileNavLink} onClick={closeMenu}>
                    {t(`navigation.${item.key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    document.body.style.overflow = '';
                    openContact();
                    closeMenu();
                  }}
                  className={styles.mobileContactButton}
                >
                  {t('navigation.contact')}
                </button>
              </li>
              <li>
                <div className={styles.mobileLanguageSection}>
                  <p className={styles.mobileLanguageTitle}>Idioma / Language</p>
                  <div className={styles.mobileLanguageOptions}>
                    <button
                      type="button"
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
                      type="button"
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

        {isMenuOpen && (
          <div className={styles.overlay} onClick={closeMenu} />
        )}
      </header>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
