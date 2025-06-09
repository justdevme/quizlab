import styles from "./ProgressBar.module.css";
import { FiClock } from "react-icons/fi";

export default function ProgressBar({ current, total, timeLeft }) {
  const progressPercent = (current / total) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: `${progressPercent}%` }} />
      </div>
      <div className={styles.info}>
        <span>Question {current} of {total}</span>
        <span><FiClock /> {String(timeLeft).padStart(2, '0')}:00</span>
      </div>
    </div>
  );
}
