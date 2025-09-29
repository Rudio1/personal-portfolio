// src/components/LoadingSkeleton.tsx
'use client';

import styles from './LoadingSkeleton.module.css';

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

export function LoadingSkeleton({ lines = 1, className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`${styles.skeleton} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className={styles.skeletonLine}></div>
      ))}
    </div>
  );
}

export function LoadingSkeletonInline({ className = '' }: { className?: string }) {
  return (
    <span className={`${styles.skeleton} ${className}`}>
      <span className={styles.skeletonLine}></span>
    </span>
  );
}

export function LoadingText({ className = '' }: { className?: string }) {
  return (
    <div className={`${styles.skeletonText} ${className}`}>
      <div className={styles.skeletonLine}></div>
    </div>
  );
}
