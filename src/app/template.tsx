'use client';

import { useEffect, useState } from 'react';
import styles from './template.module.css';

let seen = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!seen) {
        seen = true;
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setPlay(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={play ? styles.enter : undefined} onAnimationEnd={() => setPlay(false)}>
      {children}
    </div>
  );
}
