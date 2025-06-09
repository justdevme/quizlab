import styles from "./OptionItem.module.css";

export default function OptionItem({ text, isSelected, onClick }) {
  return (
    <button
      className={`${styles.option} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
