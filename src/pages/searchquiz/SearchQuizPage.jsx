import React, { useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./SearchQuizPage.module.css";
import PreviewModal from "../dashboard/PreviewModal"; // Giả sử PreviewModal ở đúng đường dẫn
import ava from "../../assets/ava.png";
// Dữ liệu quizzes mẫu (giữ nguyên)
const quizzes = [
  {
    id: 1,
    title: "React Basics",
    questions: 15,
    views: 120,
    likes: 18,
    type: "Trắc nghiệm",
    author: { name: "Jason", avatar: ava }
  },
  {
    id: 2,
    title: "JavaScript Advanced",
    questions: 20,
    views: 90,
    likes: 25,
    type: "Trắc nghiệm",
    author: { name: "chichu206", avatar: ava },
  },
  {
    id: 3,
    title: "Hóa 12",
    questions: 10,
    views: 45,
    likes: 7,
    type: "Trắc nghiệm",
    author: { name: "hoangNg", avatar: ava },
  },
  {
    id: 4,
    title: "Toán cơ bản",
    questions: 12,
    views: 64,
    likes: 12,
    type: "Trắc nghiệm",
    author: { name: "phLing77", avatar: ava },
  },
  {
    id: 5,
    title: "CAMS Practice",
    questions: 25,
    views: 200,
    likes: 35,
    type: "Trắc nghiệm",
    author: { name: "TrangTr18", avatar: ava },
  },
  {
    id: 6,
    title: "For Cam",
    questions: 18,
    views: 99,
    likes: 16,
    type: "Trắc nghiệm",
    author: { name: "IvanGK", avatar: ava },
  },
  {
    id: 7,
    title: "ie mock test",
    questions: 1,
    views: 5,
    likes: 2,
    type: "Tự luận",
    author: { name: "admin", avatar: ava },
  },
];

export default function SearchQuizPage() {
  const [pageSearchTerm, setPageSearchTerm] = useState(""); // Đổi tên để phân biệt với header search
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [likedQuizzes, setLikedQuizzes] = useState({}); // Đổi tên cho rõ ràng
  const navigate = useNavigate();

  // State và function cho thanh tìm kiếm của Header (giống Dashboard)
  const [headerSearchInput, setHeaderSearchInput] = useState("");

  const handleHeaderSearchSubmit = (e) => {
    if (e.key === "Enter" && headerSearchInput.trim()) {
      console.log("Header search submitted:", headerSearchInput);
      // Thêm logic điều hướng hoặc tìm kiếm tại đây nếu cần
      // navigate(`/search-results?query=${encodeURIComponent(headerSearchInput.trim())}`);
      // Hoặc có thể cập nhật pageSearchTerm để lọc danh sách bên dưới
      setPageSearchTerm(headerSearchInput.trim());
    }
  };

  const handlePreview = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleStartQuiz = (quiz) => {
    // Giữ nguyên logic điều hướng của bạn
    navigate(`/quiz-detail`); 
  };

  const toggleLike = (quizId) => {
    setLikedQuizzes((prev) => ({ ...prev, [quizId]: !prev[quizId] }));
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(pageSearchTerm.toLowerCase())
  );

  return (
    <div className={styles.searchPageLayout}> {/* Class cho layout tổng thể */}
      {/* Header - Giống hệt Dashboard */}
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h2 className={styles.headerPageTitle}>Kết quả tìm kiếm</h2> 
          {/* Bạn có thể bỏ trống title ở đây nếu không muốn hiển thị */}
        </div>
        <div className={styles.pageHeaderRight}>
          <div className={styles.headerSearchWrapper}>
            {/* Icon tìm kiếm nếu có (ví dụ: <i className="ri-search-line"></i>) */}
            <input
              type="text"
              placeholder="Tìm kiếm bài quiz..." // Placeholder của Dashboard
              className={styles.headerSearchBar}
              value={headerSearchInput}
              onChange={(e) => setHeaderSearchInput(e.target.value)}
              onKeyDown={handleHeaderSearchSubmit}
            />
          </div>
          {/* Các actions khác của header (nếu có) */}
        </div>
      </header>

      {/* Main Content Area */}
      <div className={styles.mainContentArea}>

        <Row xs={1} md={2} lg={3} className="g-4"> {/* Bootstrap grid */}
          {filteredQuizzes.map((quiz) => (
            <Col key={quiz.id}>
              <Card className={`${styles.quizCardItem} shadow-sm`}> {/* Class cho card */}
                <Card.Body>
                  <Card.Title className={styles.quizCardTitle}>{quiz.title}</Card.Title>

                  <div className={styles.quizCardTypeBadge}>
                    {/* Icon nếu có (ví dụ: <i className="ri-file-list-2-line"></i>) */}
                    {quiz.type}
                  </div>

                  <div className={styles.quizCardButtonGroup}>
                    <Button
                      className={styles.quizCardButtonDo}
                      onClick={() => handleStartQuiz(quiz)}
                      variant="warning" // Giữ nguyên variant
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
                    <img
                      src={quiz.author.avatar} // Đảm bảo đường dẫn avatar đúng
                      className={styles.quizCardAuthorAvatar}
                      alt={`${quiz.author.name}'s avatar`}
                    />
                    <span>{quiz.author.name}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {selectedQuiz && (
        <PreviewModal
          quiz={selectedQuiz}
          onClose={() => setSelectedQuiz(null)}
        />
      )}
    </div>
  );
}
