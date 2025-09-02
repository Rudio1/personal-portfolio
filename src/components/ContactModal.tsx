// src/components/ContactModal.tsx
'use client';

import { useState } from 'react';
import { X, Send, User, Phone } from 'lucide-react';
import { useTranslations } from '../contexts/TranslationContext';
import styles from './ContactModal.module.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    telephone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string>('');
  const [errors, setErrors] = useState<{name?: string; telephone?: string}>({});

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    
    const phoneRegex = /^(\d{2})?(\d{4,5})(\d{4})$/;
    
    return phoneRegex.test(cleanPhone) && (cleanPhone.length === 10 || cleanPhone.length === 11);
  };

  const validateForm = (): boolean => {
    const newErrors: {name?: string; telephone?: string} = {};
    
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulário antes de enviar
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitError('');

    try {
      const requestBody = {
        name: formData.name.trim(),
        telephone: formData.telephone.trim()
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });


      if (response.ok) {
        const responseData = await response.json();
        setSubmitStatus('success');
        setFormData({ name: '', telephone: '' });
        // Fechar modal após 2 segundos
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        const errorData = await response.text();
        console.error('Erro da API:', response.status, errorData);
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('contact.title')}</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              <User size={16} />
              {t('contact.name')}
            </label>
            <div className={`${styles.inputContainer} ${errors.name ? styles.inputContainerError : ''}`}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={t('contact.namePlaceholder')}
                required
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="telephone" className={styles.label}>
              <Phone size={16} />
              {t('contact.phone')}
            </label>
            <div className={`${styles.inputContainer} ${errors.telephone ? styles.inputContainerError : ''}`}>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={t('contact.phonePlaceholder')}
                required
                disabled={isSubmitting}
              />
            </div>
            {errors.telephone && (
              <span className={styles.errorText}>{errors.telephone}</span>
            )}
          </div>

          {submitStatus === 'success' && (
            <div className={styles.successMessage}>
              {t('contact.success')}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              {submitError || t('contact.error')}
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              {t('contact.cancel')}
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || !formData.name.trim() || !formData.telephone.trim()}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner} />
                  {t('contact.sending')}
                </>
              ) : (
                <>
                  <Send size={16} />
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
