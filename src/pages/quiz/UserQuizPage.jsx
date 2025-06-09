import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserQuizPage.module.css";
import { useNavigate } from "react-router-dom";

export default function UserQuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) return;

    axios.get(`http://localhost:8017/v1/api/quizzes/user/${user.id}`)
      .then(res => setQuizzes(res.data))
      .catch(err => console.error("❌ Lỗi khi lấy quiz:", err));
  }, []);

  return (
    <div className={styles.userQuizContainer}>
      <h2 className={styles.sectionTitle}>Các bài kiểm tra bạn đã tạo</h2>
      <div className={styles.quizList}>
        {quizzes.map((quiz, index) => (
          <div key={index} className={styles.quizCard}>
            <div className={styles.quizInfo}>
              <div className={styles.quizTitle}>{quiz.title}</div>
              <div className={styles.quizMeta}>
                <span><i className="ri-book-open-line"></i> {quiz.subject}</span>
                <span><i className="ri-user-line"></i> {quiz.stats?.attempts || 0} lượt làm</span>
                <span><i className="ri-star-line"></i> {quiz.stats?.likes || 0} lượt thích</span>
                <span><i className="ri-calendar-line"></i> {new Date(quiz.created_at).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.actionBtn}
                onClick={() => {
                    const currentUser = JSON.parse(localStorage.getItem("user"));
                        if (quiz.creator_id === currentUser.id) {
                            navigate(`/creator/quizzes/${quiz._id}`);
                        } else {
                            navigate(`/quiz-detail/${quiz._id}`);
                        }
                    }

                }
                title="Xem chi tiết"
              >
                <i className="ri-eye-line"></i>
              </button>
              <button className={styles.actionBtn} title="Chia sẻ">
                <i className="ri-share-line"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
