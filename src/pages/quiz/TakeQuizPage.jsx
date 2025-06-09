
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import styles from './TakeQuizPage.module.css';

function RetryResultModal({ show, onClose, result }) {
  if (!result) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Kết quả làm lại câu sai</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Tổng số câu:</strong> {result.totalQuestions}</p>
        <p><strong>Đúng:</strong> {result.correctAnswers}</p>
        <p><strong>Sai:</strong> {result.wrongAnswers}</p>
        <p><strong>Thời gian:</strong> {result.duration} phút</p>

        <div>
          {result.questions.map((q, i) => (
            <div key={q._id} style={{ marginBottom: '1rem' }}>
              <p><strong>Câu {i + 1}:</strong> {q.question}</p>
              <p>Trả lời của bạn: <em>{Array.isArray(q.userAnswer) ? q.userAnswer.join(', ') : q.userAnswer}</em></p>
              <p>Đáp án đúng: <strong>{Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}</strong></p>
              <p style={{ color: q.isCorrect ? 'green' : 'red' }}>
                {q.isCorrect ? '✅ Đúng' : '❌ Sai'}
              </p>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function TakeQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const quizData = location.state || { timeLimit: 30, questions: [] };
  const isRetry = quizData.isRetry === true;
  const resultId = quizData.resultId;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(
    typeof quizData.timeLimit === 'number' && quizData.timeLimit > 0
      ? quizData.timeLimit * 60
      : null
  );
  const [retryResult, setRetryResult] = useState(null);
  const [showRetryModal, setShowRetryModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let rawQuestions = [];

        if (isRetry && resultId) {
          const res = await axios.get(`http://localhost:8017/v1/questions/results/${resultId}/retry-wrong`);
          rawQuestions = res.data;
        } else if (quizData.questions) {
          rawQuestions = quizData.questions;
        }

        const formatted = rawQuestions.map(q => ({
          ...q,
          id: q._id,
          question: q.question || q.text || '',
          options: q.options || []
        }));

        setQuestions(formatted);
      } catch (err) {
        console.error("Lỗi khi tải câu hỏi:", err);
      }
    };

    fetchQuestions();
  }, [isRetry, resultId, quizData.questions]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, value, type) => {
    setAnswers(prev => {
      const updated = { ...prev };
      if (type === 'multiple') {
        const current = updated[questionId] || [];
        updated[questionId] = current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value];
      } else {
        updated[questionId] = value;
      }
      return updated;
    });
  };

  const normalize = (val) => {
    if (typeof val === 'string') return val.trim().toLowerCase();
    if (Array.isArray(val)) return val.map(v => v.trim().toLowerCase()).sort();
    return val;
  };

  const handleSubmitQuiz = async () => {
    const duration = timeLeft === null ? 0 : quizData.timeLimit * 60 - timeLeft;

    const userAnswers = {};
    questions.forEach(q => {
      userAnswers[q._id] = answers[q.id] ?? null;
    });

    if (isRetry) {
      const evaluatedQuestions = questions.map(q => {
        const ua = userAnswers[q._id];
        const ca = q.correctAnswer;

        let isCorrect = false;
        if (q.type === 'multiple') {
          isCorrect = Array.isArray(ua) && Array.isArray(ca) &&
            normalize(ua).join(',') === normalize(ca).join(',');
        } else {
          isCorrect = normalize(ua) === normalize(ca);
        }

        return {
          ...q,
          userAnswer: ua,
          isCorrect
        };
      });

      const correctAnswers = evaluatedQuestions.filter(q => q.isCorrect);

      const resultData = {
        quizTitle: quizData.title,
        submitted_at: new Date().toISOString(),
        duration: Math.round(duration / 60),
        totalQuestions: questions.length,
        correctAnswers: correctAnswers.length,
        wrongAnswers: questions.length - correctAnswers.length,
        questions: evaluatedQuestions
      };

      setRetryResult(resultData);
      setShowRetryModal(true);
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;
    if (!userId) {
      alert("Không tìm thấy userId! Bạn đã đăng nhập chưa?");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8017/v1/api/results/${quizData._id}/submit`, {
        user_id: userId,
        userAnswers,
        duration
      });
      const resultId = res.data.resultId;
      navigate(`/result/${resultId}`);
    } catch (err) {
      console.error('Lỗi khi nộp bài:', err);
      alert('Có lỗi xảy ra khi nộp bài!');
    }
  };

  const renderOptions = () => {
    if (!currentQuestion || !currentQuestion.options) {
      return <p>Đang tải câu hỏi...</p>;
    }

    const selected = answers[currentQuestion.id];

    return currentQuestion.options.map((opt, i) => (
      <button key={i}
        className={`${styles.optionButton} ${selected === opt ? styles.selectedOption : ''}`}
        onClick={() => handleAnswerChange(currentQuestion.id, opt, currentQuestion.type || 'single')}>
        <span className={styles.optionIndex}>{String.fromCharCode(65 + i)}</span>
        {opt}
      </button>
    ));
  };

  return (
    <div className={styles.takeQuizPageContainer}>
      <header className={styles.quizPageHeader}>
        <div className={styles.topicSection}>
          <span className={styles.topicName}>{quizData.title || 'Bài kiểm tra'}</span>
        </div>
        <div className={styles.timerSection}>
          <i className={`ri-time-line ${styles.timerIcon}`}></i>
          <span>{timeLeft === null ? '⏳ Không giới hạn' : formatTime(timeLeft)}</span>
        </div>
      </header>

      <div className={styles.quizLayout}>
        <div className={styles.quizContent}>
          <div className={styles.questionDisplayCard}>
            <div className={styles.questionHeader}>
              <div className={styles.questionNumber}>{currentQuestionIndex + 1}</div>
              <p className={styles.questionText}>{currentQuestion?.question}</p>
            </div>
          </div>

          <div className={styles.optionsContainer}>{renderOptions()}</div>

          <div className={styles.navigationButtons}>
            <button onClick={() => setCurrentQuestionIndex(i => i - 1)} disabled={currentQuestionIndex === 0}
              className={`${styles.navButton} ${styles.prevButton}`}>
              <i className="ri-arrow-left-s-line"></i> Câu trước
            </button>
            <button onClick={() => {
              currentQuestionIndex === questions.length - 1
                ? handleSubmitQuiz()
                : setCurrentQuestionIndex(i => i + 1);
            }}
              className={`${styles.navButton} ${styles.nextButton}`}>
              {currentQuestionIndex === questions.length - 1 ? 'Nộp bài' : 'Câu tiếp theo'}
            </button>
          </div>
        </div>

        <aside className={styles.questionNavigationPanel}>
          <h3 className={styles.panelTitle}>Danh sách câu hỏi</h3>
          <div className={styles.questionGrid}>
            {questions.map((q, i) => (
              <button key={q.id}
                className={`
                  ${styles.questionNavButton}
                  ${i === currentQuestionIndex ? styles.currentQuestionNav : ''}
                  ${answers[q.id] !== undefined ? styles.answeredQuestionNav : ''}
                `}
                onClick={() => setCurrentQuestionIndex(i)}>
                {i + 1}
              </button>
            ))}
          </div>
          <button onClick={handleSubmitQuiz} className={`${styles.navButton} ${styles.submitButtonPanel}`}>
            Nộp bài
          </button>
        </aside>
      </div>

      <RetryResultModal
        show={showRetryModal}
        onClose={() => setShowRetryModal(false)}
        result={retryResult}
      />
    </div>
  );
}

