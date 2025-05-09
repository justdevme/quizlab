import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import styles from './QuizDetailPage.module.css';

export default function QuizDetailPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.quizData) {
      setQuiz(location.state.quizData);
      setLoading(false);
    } else {
      fetch(`http://localhost:8017/v1/api/quizzes/${quizId}`)
        .then(res => res.json())
        .then(data => {
          setQuiz(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch quiz', err);
          setLoading(false);
        });
    }
  }, [quizId, location.state]);

  /*useEffect(() => {
    // Dữ liệu mẫu
    const staticQuiz = {
      title: "Kiểm tra kiến thức Toán học lớp 9",
      description: "Bài kiểm tra bao gồm các câu hỏi lý thuyết và bài tập thực tế, giúp bạn ôn tập hiệu quả.",
      likes: 120,
      attempts: 87,
      timeLimit: 30, // phút
      questions: new Array(15).fill({}) // 15 câu hỏi giả lập
    };
  
    setQuiz(staticQuiz);
    setLoading(false);
  }, []);*/
  

  const handleStartQuiz = () => {
    navigate(`/quiz/${quizId}/take-quiz`, { state: { quizData: quiz } });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="warning" />
      </Container>
    );
  }

  if (!quiz) {
    return (
      <Container className="text-center mt-5">
        <h4>Không tìm thấy bài quiz</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className={styles.card}>
        <Card.Body>
          <h2 className={styles.title}>{quiz.title}</h2>
          <p className={styles.description}>{quiz.description}</p>
          <Row className="mt-4">
            <Col md={6}>
              <div className={styles.stat}><strong>🧡 Lượt thích:</strong> {quiz.likes || 0}</div>
              <div className={styles.stat}><strong>✅ Lượt làm:</strong> {quiz.attempts || 0}</div>
            </Col>
            <Col md={6}>
              <div className={styles.stat}><strong>⏳ Thời gian:</strong> {quiz.timeLimit ? quiz.timeLimit + ' phút' : 'Không giới hạn'}</div>
              <div className={styles.stat}><strong>📄 Câu hỏi:</strong> {quiz.questions?.length || 0}</div>
            </Col>
          </Row>
          <div className="text-end mt-4">
            <Button variant="warning" size="lg" onClick={handleStartQuiz}>
              👉 Làm bài
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
