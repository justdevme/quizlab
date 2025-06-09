import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./SearchQuizPage.module.css";
import PreviewModal from "../dashboard/PreviewModal";
import ava from "../../assets/ava.png";
import axios from "axios";

export default function SearchQuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [likedQuizzes, setLikedQuizzes] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8017/v1/api/quizzes/search?q=${encodeURIComponent(searchTerm)}`);
        setQuizzes(res.data);
      } catch (err) {
        console.error('Lỗi khi tìm quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) fetchQuizzes();
  }, [searchTerm]);

  const handlePreview = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleViewDetail = (quiz) => {
    navigate(`/quiz-detail/${quiz._id}`);
  };

  const toggleLike = (quizId) => {
    setLikedQuizzes((prev) => ({ ...prev, [quizId]: !prev[quizId] }));
  };

  return (
    <div className={styles.searchPageLayout}>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h2 className={styles.headerPageTitle}>Kết quả tìm kiếm cho: "{searchTerm}"</h2>
        </div>
      </header>

      <div className={styles.mainContentArea}>
        {loading ? (
          <p>Đang tải kết quả...</p>
        ) : quizzes.length === 0 ? (
          <p>Không tìm thấy bài quiz nào phù hợp.</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {quizzes.map((quiz) => (
              <Col key={quiz._id}>
                <Card className={`${styles.quizCardItem} shadow-sm`}>
                  <Card.Body>
                    <Card.Title className={styles.quizCardTitle}>{quiz.title}</Card.Title>

                    <div className={styles.quizCardTypeBadge}>{quiz.subject}</div>

                    <div className={styles.quizCardButtonGroup}>
                      <Button
                        className={styles.quizCardButtonDo}
                        onClick={() => handleViewDetail(quiz)}
                        variant="info"
                      >
                        Xem chi tiết
                      </Button>
                      <Button
                        className={styles.quizCardButtonLike}
                        onClick={() => toggleLike(quiz._id)}
                      >
                        <i className={likedQuizzes[quiz._id] ? "ri-heart-fill text-danger" : "ri-heart-line"}></i>
                      </Button>
                    </div>

                    <div className={styles.quizCardAuthorInfo}>
                      <img
                        src={quiz.author?.avatar || ava}
                        className={styles.quizCardAuthorAvatar}
                        alt={`${quiz.author?.name || 'Người dùng'}'s avatar`}
                      />
                      <span>{quiz.author?.name || 'Ẩn danh'}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
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
