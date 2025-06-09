// src/pages/dashboard/PreviewModal.jsx
import React from "react";
import styles from "./PreviewModal.module.css";

export default function PreviewModal({ quiz, onClose }) {
  if (!quiz) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3 className={styles.title}>{quiz.title}</h3>
        <p className={styles.description}>
          Đây là một bài quiz gồm {quiz.questions} câu hỏi, được tạo bởi{" "}
          <strong>{quiz.author.name}</strong>.
        </p>
      </div>
    </div>
  );
}
