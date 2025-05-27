import React, { useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./SearchQuizPage.module.css";
import PreviewModal from "../dashboard/PreviewModal";

const quizzes = [
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
    title: "JavaScript Advanced",
    questions: 20,
    views: 90,
    likes: 25,
    type: "Trắc nghiệm",
    author: { name: "chichu206", avatar: "/" }
  },
  {
    id: 3,
    title: "Toán lớp 1",
    questions: 10,
    views: 45,
    likes: 7,
    type: "Trắc nghiệm",
    author: { name: "hoangNg", avatar: "/" }
  },
  {
    id: 4,
    title: "Toán lớp 3",
    questions: 12,
    views: 64,
    likes: 12,
    type: "Trắc nghiệm",
    author: { name: "phLing77", avatar: "/" }
  },
  {
    id: 5,
    title: "CAMS Practice",
    questions: 25,
    views: 200,
    likes: 35,
    type: "Trắc nghiệm",
    author: { name: "TrangTr18", avatar: "/" }
  },
  {
    id: 6,
    title: "For Cam",
    questions: 18,
    views: 99,
    likes: 16,
    type: "Trắc nghiệm",
    author: { name: "IvanGK", avatar: "/" }
  },
  {
    id: 7,
    title: "Viết đoạn văn cảm nghĩ",
    questions: 1,
    views: 5,
    likes: 2,
    type: "Tự luận",
    author: { name: "admin", avatar: "/" }
  }
];

export default function Searching() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [liked, setLiked] = useState({});
  const navigate = useNavigate();

  const handlePreview = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleStartQuiz = (quiz) => {
    if (quiz.title === "Toán lớp 3") {
      navigate("/take-quiz");
    } else {
      alert("Chỉ bài Toán lớp 3 có thể làm bài trong bản demo.");
    }
  };

  const toggleLike = (quizId) => {
    setLiked((prev) => ({ ...prev, [quizId]: !prev[quizId] }));
  };

  const filtered = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.searchPageContainer}>
      <Form className={styles.searchBarTop}>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm bài quiz"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <h2 className={styles.pageTitle}>Kết quả tìm kiếm</h2>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filtered.map((quiz) => (
          <Col key={quiz.id}>
            <Card className={`shadow-sm ${styles.quizCard}`}>
              <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>

                <div className={styles.typeBadge}>
                  <i className="ri-file-list-2-line"></i> {quiz.type}
                </div>

                <div className={styles.infoIcons}>
                  <span>
                    <i className="ri-question-answer-line"></i> {quiz.questions} câu hỏi
                  </span>
                  <span>
                    <i className="ri-eye-line"></i> {quiz.views} lượt làm
                  </span>
                  <span>
                    <i className="ri-heart-3-fill text-danger"></i> {quiz.likes} lượt thích
                  </span>
                </div>

                <div className={styles.buttonGroup}>
                  <Button
                    className={styles.btnPreview}
                    onClick={() => handlePreview(quiz)}
                    variant="outline-secondary"
                  >
                    Preview
                  </Button>
                  <Button
                    className={styles.btnDoQuiz}
                    onClick={() => handleStartQuiz(quiz)}
                    variant="warning"
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
                  <img
                    src={quiz.author.avatar}
                    className={styles.authorAvatar}
                    alt="avatar"
                  />
                  <span>{quiz.author.name}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedQuiz && (
        <PreviewModal
          quiz={selectedQuiz}
          onClose={() => setSelectedQuiz(null)}
        />
      )}
    </div>
  );
}
