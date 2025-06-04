import React, { useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import styles from "./CreatedQuizzesPage.module.css";
import { useNavigate } from "react-router-dom";
import PreviewModal from "../dashboard/PreviewModal";
import CreateQuizModal from "./CreateQuizModal";
import ava from "../../assets/ava.png";
const createdQuizzes = [
  {
    id: 1,
    title: "Toán cơ bản",
    questions: 15,
    views: 120,
    likes: 18,
    type: "Trắc nghiệm",
    author: { name: "Jason", avatar: ava }, //  Bạn có thể thay đổi avatar path nếu cần
  },
  {
    id: 2,
    title: "Tự luận Lịch sử",
    questions: 1,
    views: 22,
    likes: 4,
    type: "Tự luận",
    author: { name: "NguyenVanA", avatar: ava }, // Bạn có thể thay đổi avatar path nếu cần
  },
];

export default function CreatedQuizzesPage() {
  const [likedQuizzes, setLikedQuizzes] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  // State cho quiz creation form
  const [quizTopic, setQuizTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [selectedQuestionType, setSelectedQuestionType] = useState("multiple-choice");

  const [headerSearchInput, setHeaderSearchInput] = useState("");

  const handleHeaderSearchSubmit = (e) => {
    if (e.key === "Enter" && headerSearchInput.trim()) {
      console.log("Header search submitted:", headerSearchInput);
      // Thêm logic tìm kiếm hoặc lọc danh sách quiz đã tạo nếu cần
    }
  };

  const handleQuizCreationSubmit = () => {
    console.log("Topic:", quizTopic);
    console.log("Number of Questions:", numQuestions);
    console.log("Question Type:", selectedQuestionType);
    // Thêm logic gọi API hoặc xử lý dữ liệu ở đây
    // Ví dụ: alert("Quiz creation submitted!");
  };

  const handleStartQuiz = (quiz) => {
    if (quiz.title === "React Basics") {
      navigate("/take-quiz");
    } else {
      alert("Demo chỉ hoạt động với bài React Basics.");
    }
  };

  const toggleLike = (quizId) => {
    setLikedQuizzes((prev) => ({ ...prev, [quizId]: !prev[quizId] }));
  };

  const filteredCreatedQuizzes = headerSearchInput.trim()
    ? createdQuizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(headerSearchInput.toLowerCase())
      )
    : createdQuizzes;

  return (
    <div className={styles.createdQuizzesLayout}>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h2 className={styles.headerPageTitle}>Trang tạo quiz</h2>
        </div>
        <div className={styles.pageHeaderRight}>
          <div className={styles.headerSearchWrapper}>
            <input
              type="text"
              placeholder="Tìm kiếm bài quiz"
              className={styles.headerSearchBar}
              value={headerSearchInput}
              onChange={(e) => setHeaderSearchInput(e.target.value)}
              onKeyDown={handleHeaderSearchSubmit}
            />
          </div>
        </div>
      </header>

      <div className={styles.mainContentArea}>
        <div className={styles.quizCreationBox}>
          <h3 className={styles.quizCreationTitle}>Tạo quiz bằng AI</h3>
          <p className={styles.quizCreationSubtitle}>Thoải mái sáng tạo</p>

          <Form.Group className="mb-3">
            <Form.Label className={styles.formLabel}>Chủ đề</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập chủ đề"
              value={quizTopic}
              onChange={(e) => setQuizTopic(e.target.value)}
              className={styles.formInput}
            />
            <Form.Text className={styles.formHelpText}>
              Nhập chủ đề mà bạn muốn quiz tại đây
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={styles.formLabel}>Số câu hỏi</Form.Label>
            <Form.Control
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value, 10) || 1)}
              min="1"
              className={styles.formInput}
            />
            <Form.Text className={styles.formHelpText}>
              Bạn có thể tùy chỉnh số câu hỏi
            </Form.Text>
          </Form.Group>

          <div className={styles.questionTypeSelector}>
            <Button
              variant={selectedQuestionType === "multiple-choice" ? "dark" : "light"}
              className={`${styles.typeButton} ${
                selectedQuestionType === "multiple-choice" ? styles.activeTypeButton : ""
              }`}
              onClick={() => setSelectedQuestionType("multiple-choice")}
            >
              <i className="ri-checkbox-multiple-line me-2"></i>Nhiều đáp án
            </Button>
            <Button
              variant={selectedQuestionType === "open-ended" ? "dark" : "light"}
              className={`${styles.typeButton} ${
                selectedQuestionType === "open-ended" ? styles.activeTypeButton : ""
              }`}
              onClick={() => setSelectedQuestionType("open-ended")}
            >
              <i className="ri-pencil-ruler-2-line me-2"></i>Điền từ
            </Button>
          </div>

          <Button variant="primary" className={styles.submitQuizButton} onClick={handleQuizCreationSubmit}>
            Tạo quiz
          </Button>
        </div>

        <div className={styles.contentHeaderRow} style={{ marginTop: '30px' }}>
          <h4 className={styles.contentPageTitle}>Danh sách Quiz đã tạo</h4>
          <Button
            className={styles.createQuizButton}
            onClick={() => setShowCreateModal(true)}
          >
            + Tạo quiz mới (Modal)
          </Button>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredCreatedQuizzes.map((quiz) => (
            <Col key={quiz.id}>
              <Card className={`${styles.quizCardItem} shadow-sm`}>
                <Card.Body>
                  <Card.Title className={styles.quizCardTitle}>{quiz.title}</Card.Title>
                  <div className={styles.quizCardTypeBadge}>
                    <i className="ri-file-list-2-line"></i> {quiz.type}
                  </div>
                  <div className={styles.quizCardButtonGroup}>
                    <Button
                      className={styles.quizCardButtonDo}
                      variant="warning"
                      onClick={() => handleStartQuiz(quiz)}
                    >
                      Làm bài
                    </Button>
                    <Button
                      className={styles.quizCardButtonLike}
                      onClick={() => toggleLike(quiz.id)}
                    >
                      <i className={likedQuizzes[quiz.id] ? "ri-heart-fill text-danger" : "ri-heart-line"}></i>
                    </Button>
                  </div>
                  <div className={styles.quizCardAuthorInfo}>
                    <img src={quiz.author.avatar} className={styles.quizCardAuthorAvatar} alt={`${quiz.author.name}'s avatar`} />
                    <span>{quiz.author.name}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {selectedQuiz && (
        <PreviewModal quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
      )}

      {showCreateModal && (
        <CreateQuizModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}