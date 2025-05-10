import styles from "./QuestionBlock.module.css";

export default function QuestionBlock({ questionText }) {
  return (
    <div className={styles.block}>
      <div className={styles.question}>{questionText}</div>
    </div>
  );
}
