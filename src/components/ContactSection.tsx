'use client';

import { useCallback, useState } from 'react';
import { ArrowUpRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import styles from './ContactSection.module.css';
import buttons from './button.module.css';
import SectionHeading from './SectionHeading';
import ContactModal from './ContactModal';
import { useTranslations } from '../contexts/TranslationContext';

const channels = [
  { key: 'email', value: 'guilhermerudio6@gmail.com', href: 'mailto:guilhermerudio6@gmail.com', icon: Mail, external: false },
  {
    key: 'linkedin',
    value: 'in/guilherme-rudio-790939164',
    href: 'https://www.linkedin.com/in/guilherme-rudio-790939164/',
    icon: Linkedin,
    external: true,
  },
  { key: 'github', value: 'Rudio1', href: 'https://github.com/Rudio1', icon: Github, external: true },
  { key: 'resume', value: 'PDF', href: '/curriculo/Curriculo - Rudio.pdf', icon: FileText, external: true },
] as const;

export default function ContactSection() {
  const { t } = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <section id="contato" className="section" aria-labelledby="contato-title">
      <div className="sectionGrid">
        <SectionHeading id="contato-title" index="05" title={t('contactSection.title')} />

        <div className={styles.body}>
          <p className={styles.headline}>{t('contactSection.headline')}</p>
          <p className={styles.text}>{t('contactSection.text')}</p>

          <button type="button" className={buttons.primary} onClick={() => setIsModalOpen(true)}>
            {t('contactSection.form')}
          </button>

          <ul className={styles.channels}>
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.key}>
                  <a
                    href={channel.href}
                    className={styles.channel}
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className={styles.channelLabel}>
                      <Icon size={16} aria-hidden="true" />
                      {t(`contactSection.channels.${channel.key}`)}
                    </span>
                    <span className={styles.channelValue}>{channel.value}</span>
                    <ArrowUpRight size={18} aria-hidden="true" className={styles.arrow} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={handleClose} />
    </section>
  );
}
