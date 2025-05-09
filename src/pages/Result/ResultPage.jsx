import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ResultPage.module.css';

export default function ResultPage() {
  const { resultId } = useParams();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8017/v1/api/results/${resultId}`)
      .then(res => {
        setResultData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Không thể tải kết quả.');
        setLoading(false);
      });
  }, [resultId]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderAnswer = (q) => {
    return (
      <div className={styles.answerSection}>
        <div className={styles.optionsList}>
          {q.options.map((opt, i) => {
            const isCorrect = q.correctAnswer === opt || (Array.isArray(q.correctAnswer) && q.correctAnswer.includes(opt));
            const isUserSelected = q.userAnswer === opt || (Array.isArray(q.userAnswer) && q.userAnswer.includes(opt));
            const isCorrectUserSelection = isCorrect && isUserSelected;
            const isWrongUserSelection = !isCorrect && isUserSelected;

            return (
              <div
                key={i}
                className={`${styles.optionItem} ${
                  isCorrect ? styles.correctOption : ''
                } ${
                  isWrongUserSelection ? styles.wrongOption : ''
                } ${
                  isCorrectUserSelection ? styles.correctUserOption : ''
                }`}
              >
                <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                <span className={styles.optionText}>{opt}</span>
                {isCorrect && <i className={`bi bi-check-circle ${styles.correctIcon}`}></i>}
                {isWrongUserSelection && <i className={`bi bi-x-circle ${styles.wrongIcon}`}></i>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) return <Spinner animation="border" className="mt-5 d-block mx-auto" />;
  if (error) return <Alert variant="danger" className="mt-4 text-center">{error}</Alert>;

  const score = Math.round((resultData.score / resultData.maxScore) * 100);

  return (
    <div className={styles.resultPageContainer}>
      <Container>
        <Card className={styles.summaryCard}>
          <Card.Body>
            <div className={styles.scoreSection}>
              <div className={styles.scoreDetails}>
                <div className={styles.scoreItem}><b>Quiz:</b> {resultData.quizTitle}</div>
                <div className={styles.scoreItem}><b>Tổng câu hỏi:</b> {resultData.totalQuestions}</div>
                <div className={styles.scoreItem}><b>Đúng:</b> {resultData.correctCount}</div>
                <div className={styles.scoreItem}><b>Sai:</b> {resultData.wrongCount}</div>
                <div className={styles.scoreItem}><b>Điểm:</b> {score}/100</div>
                <div className={styles.scoreItem}><b>Thời gian:</b> {formatTime(resultData.duration)}</div>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <Link to="/dashboard">
                <Button variant="warning"><i className="bi bi-house-door"></i> Trang chủ</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>

        <div className={styles.questionsSection}>
          {resultData.detailedResults.map((q, idx) => (
            <Card key={q.questionId} className={styles.questionCard}>
              <Card.Body>
                <div className={styles.questionHeader}>
                  <h5>Câu {idx + 1}: {q.questionText}</h5>
                  <Badge bg={q.isCorrect ? 'success' : 'danger'}>
                    {q.isCorrect ? 'Đúng' : 'Sai'}
                  </Badge>
                </div>
                {renderAnswer(q)}
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
