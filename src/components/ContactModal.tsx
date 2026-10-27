'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { X, Send, User, Phone } from 'lucide-react';
import { useTranslations } from '../contexts/TranslationContext';
import buttons from './button.module.css';
import styles from './ContactModal.module.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslations();
  const titleId = useId();
  const nameErrorId = useId();
  const phoneErrorId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const timeoutRef = useRef<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    telephone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<{ name?: string; telephone?: string }>({});

  onCloseRef.current = onClose;

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    const phoneRegex = /^(\d{2})?(\d{4,5})(\d{4})$/;
    return phoneRegex.test(cleanPhone) && (cleanPhone.length === 10 || cleanPhone.length === 11);
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; telephone?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('contact.errors.nameMinLength');
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = t('contact.errors.phoneRequired');
    } else if (!validatePhone(formData.telephone)) {
      newErrors.telephone = t('contact.errors.phoneInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          telephone: formData.telephone.trim()
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', telephone: '' });
        timeoutRef.current = window.setTimeout(() => {
          onCloseRef.current();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        console.error('Erro ao enviar contato:', response.status);
        setSubmitError(t('contact.error'));
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar contato:', error);
      setSubmitError(t('contact.error'));
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    panel?.querySelector<HTMLElement>('input[name="name"]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), [href]')
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>{t('contact.title')}</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label={t('contact.close')}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="contact-name" className={styles.label}>
              <User size={16} aria-hidden="true" />
              {t('contact.name')}
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder={t('contact.namePlaceholder')}
              autoComplete="name"
              required
              disabled={isSubmitting}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? nameErrorId : undefined}
            />
            {errors.name && (
              <span id={nameErrorId} className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="contact-telephone" className={styles.label}>
              <Phone size={16} aria-hidden="true" />
              {t('contact.phone')}
            </label>
            <input
              type="tel"
              id="contact-telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.telephone ? styles.inputError : ''}`}
              placeholder={t('contact.phonePlaceholder')}
              autoComplete="tel"
              required
              disabled={isSubmitting}
              aria-invalid={errors.telephone ? true : undefined}
              aria-describedby={errors.telephone ? phoneErrorId : undefined}
            />
            {errors.telephone && (
              <span id={phoneErrorId} className={styles.errorText}>{errors.telephone}</span>
            )}
          </div>

          <div aria-live="polite">
            {submitStatus === 'success' && (
              <p className={styles.successMessage}>{t('contact.success')}</p>
            )}
            {submitStatus === 'error' && (
              <p className={styles.errorMessage}>{submitError || t('contact.error')}</p>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={buttons.secondary}
              disabled={isSubmitting}
            >
              {t('contact.cancel')}
            </button>
            <button
              type="submit"
              className={buttons.primary}
              disabled={isSubmitting || !formData.name.trim() || !formData.telephone.trim()}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  {t('contact.sending')}
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden="true" />
                  {t('contact.send')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
