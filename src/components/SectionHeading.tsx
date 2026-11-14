import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  id: string;
  index: string;
  title: string;
}

export default function SectionHeading({ id, index, title }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <p className={styles.index} aria-hidden="true">
        <span className={styles.number}>{index}</span>
        <span className={styles.rule} />
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </div>
  );
}
