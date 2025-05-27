// src/pages/create/CreateQuizModal.jsx
import React from "react";
import styles from "./CreateQuizModal.module.css";
import { useNavigate } from "react-router-dom";

export default function CreateQuizModal({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h4 className={styles.title}>Chọn loại bài quiz</h4>

        <div className={styles.buttonGroup}>
          <button
            className={styles.selectButton}
            onClick={() => navigate("/create/multiple")}
          >
            Trắc nghiệm
          </button>
          <button
            className={styles.selectButton}
            onClick={() => navigate("/create/essay")}
          >
            Tự luận
          </button>
        </div>
      </div>
    </div>
  );
}
