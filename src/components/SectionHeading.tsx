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
        <span className="plate">§ {index}</span>
        <span className={styles.ghost}>{index}</span>
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      <div className={`rule ${styles.rule}`} aria-hidden="true" />
    </div>
  );
}
