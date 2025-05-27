import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import styles from "./CreatedQuizzesPage.module.css";
import { useNavigate } from "react-router-dom";
import PreviewModal from "../dashboard/PreviewModal";
import CreateQuizModal from "./CreateQuizModal"; // ✅ Modal chọn loại quiz

const createdQuizzes = [
  {
    id: 1,
    title: "React Basics",
    questions: 15,
    views: 120,
    likes: 18,
    type: "Trắc nghiệm",
    author: { name: "Jason", avatar: "/" }
  },
  {
    id: 2,
    title: "Tự luận Lịch sử",
    questions: 1,
    views: 22,
    likes: 4,
    type: "Tự luận",
    author: { name: "NguyenVanA", avatar: "/" }
  }
];

export default function CreatedQuizzesPage() {
  const [liked, setLiked] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const handleStartQuiz = (quiz) => {
    if (quiz.title === "React Basics") {
      navigate("/take-quiz");
    } else {
      alert("Demo chỉ hoạt động với bài React Basics.");
    }
  };

  const toggleLike = (quizId) => {
    setLiked((prev) => ({ ...prev, [quizId]: !prev[quizId] }));
  };

  return (
    <div className={styles.createdContainer}>
      <div className={styles.headerRow}>
        <h2 className={styles.pageTitle}>Các bài quiz đã tạo</h2>
        <Button
          className={styles.yellowButton}
          onClick={() => setShowCreateModal(true)}
        >
          + Tạo quiz mới
        </Button>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {createdQuizzes.map((quiz) => (
          <Col key={quiz.id}>
            <Card className={`shadow-sm ${styles.quizCard}`}>
              <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>

                <div className={styles.typeBadge}>
                  <i className="ri-file-list-2-line"></i> {quiz.type}
                </div>

                <div className={styles.infoIcons}>
                  <span><i className="ri-question-answer-line"></i> {quiz.questions} câu hỏi</span>
                  <span><i className="ri-eye-line"></i> {quiz.views} lượt làm</span>
                  <span><i className="ri-heart-3-fill text-danger"></i> {quiz.likes} lượt thích</span>
                </div>

                <div className={styles.buttonGroup}>
                  <Button
                    className={styles.btnPreview}
                    variant="outline-secondary"
                    onClick={() => setSelectedQuiz(quiz)}
                  >
                    Preview
                  </Button>
                  <Button
                    className={styles.btnDoQuiz}
                    variant="warning"
                    onClick={() => handleStartQuiz(quiz)}
                  >
                    Làm bài
                  </Button>
                  <Button
                    className={styles.btnLike}
                    onClick={() => toggleLike(quiz.id)}
                  >
                    <i className={liked[quiz.id] ? "ri-heart-fill text-danger" : "ri-heart-line"}></i>
                  </Button>
                </div>

                <div className={styles.authorInfo}>
                  <img src={quiz.author.avatar} className={styles.authorAvatar} alt="avatar" />
                  <span>{quiz.author.name}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ Modal preview quiz */}
      {selectedQuiz && (
        <PreviewModal quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
      )}

      {/* ✅ Modal tạo quiz mới */}
      {showCreateModal && (
        <CreateQuizModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
