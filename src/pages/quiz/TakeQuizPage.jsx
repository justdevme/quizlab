import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './TakeQuizPage.module.css';

export default function TakeQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const navigate = useNavigate();

  const quizData = {
    timeLimit: 30,
    questions: [
      {
        id: 1,
        text: "Tính giá trị của biểu thức 2x + 3 khi x = 5",
        type: "single",
        options: [
          { id: "a", text: "10" },
          { id: "b", text: "13" },
          { id: "c", text: "15" },
          { id: "d", text: "18" }
        ],
        correctAnswer: "b"
      },
      {
        id: 2,
        text: "Phương trình x² - 5x + 6 = 0 có nghiệm là:",
        type: "single",
        options: [
          { id: "a", text: "x = 2 và x = 3" },
          { id: "b", text: "x = -2 và x = -3" },
          { id: "c", text: "x = 2 và x = -3" },
          { id: "d", text: "x = -2 và x = 3" }
        ],
        correctAnswer: "a"
      },
      {
        id: 3,
        text: "Chọn các số là số nguyên tố:",
        type: "multiple",
        options: [
          { id: "a", text: "2" },
          { id: "b", text: "4" },
          { id: "c", text: "7" },
          { id: "d", text: "9" },
          { id: "e", text: "11" }
        ],
        correctAnswer: ["a", "c", "e"]
      },
      {
        id: 4,
        text: "Diện tích hình tròn có bán kính r = 5cm là bao nhiêu? (Lấy π = 3.14)",
        type: "text",
        correctAnswer: "78.5"
      },
      {
        id: 5,
        text: "Giải thích tại sao (a + b)² ≠ a² + b²",
        type: "essay"
      }
    ]
  };

  useEffect(() => {
    if (timeLeft > 0 && !quizSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, quizSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, value, type) => {
    if (type === 'multiple') {
      setAnswers(prev => {
        const current = prev[questionId] || [];
        const updated = current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value];
        return { ...prev, [questionId]: updated };
      });
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const goToQuestion = (index) => setCurrentQuestion(index);
  const nextQuestion = () => setCurrentQuestion(q => Math.min(q + 1, quizData.questions.length - 1));
  const prevQuestion = () => setCurrentQuestion(q => Math.max(q - 1, 0));

  const handleSubmit = () => {
    setQuizSubmitted(true);
    console.log("Submitted answers:", answers);
    navigate('/result');
  };

  const isQuestionAnswered = (id) => {
    const ans = answers[id];
    return Array.isArray(ans) ? ans.length > 0 : ans !== undefined;
  };

  const renderQuestion = () => {
    const q = quizData.questions[currentQuestion];
    switch (q.type) {
      case 'single':
        return (
          <div className={styles.questionContent}>
            <h4 className={styles.questionText}>Câu {currentQuestion + 1}: {q.text}</h4>
            <div className={styles.options}>
              {q.options.map(opt => (
                <Form.Check
                  key={opt.id}
                  type="radio"
                  label={opt.text}
                  name={`q-${q.id}`}
                  checked={answers[q.id] === opt.id}
                  onChange={() => handleAnswerChange(q.id, opt.id, 'single')}
                  className={styles.optionItem}
                />
              ))}
            </div>
          </div>
        );
      case 'multiple':
        return (
          <div className={styles.questionContent}>
            <h4 className={styles.questionText}>Câu {currentQuestion + 1}: {q.text}</h4>
            <div className={styles.options}>
              {q.options.map(opt => (
                <Form.Check
                  key={opt.id}
                  type="checkbox"
                  label={opt.text}
                  checked={answers[q.id]?.includes(opt.id)}
                  onChange={() => handleAnswerChange(q.id, opt.id, 'multiple')}
                  className={styles.optionItem}
                />
              ))}
            </div>
          </div>
        );
      case 'text':
        return (
          <div className={styles.questionContent}>
            <h4 className={styles.questionText}>Câu {currentQuestion + 1}: {q.text}</h4>
            <Form.Control
              type="text"
              value={answers[q.id] || ''}
              placeholder="Nhập câu trả lời"
              onChange={(e) => handleAnswerChange(q.id, e.target.value, 'text')}
              className={styles.textInput}
            />
          </div>
        );
      case 'essay':
        return (
          <div className={styles.questionContent}>
            <h4 className={styles.questionText}>Câu {currentQuestion + 1}: {q.text}</h4>
            <Form.Control
              as="textarea"
              rows={5}
              value={answers[q.id] || ''}
              placeholder="Nhập bài luận của bạn"
              onChange={(e) => handleAnswerChange(q.id, e.target.value, 'essay')}
              className={styles.textareaInput}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.takeQuizContainer}>
      <Container>
        <div className={styles.quizHeader}>
          <div className={styles.quizInfo}>
            <h3 className={styles.quizTitle}>Bài kiểm tra mẫu</h3>
          </div>
          <div className={styles.quizTimer}>
            <i className="bi bi-clock"></i> {formatTime(timeLeft)}
          </div>
        </div>

        <Row>
          <Col lg={8}>
            <Card className={styles.questionCard}>
              <Card.Body>
                {renderQuestion()}

                <div className={styles.navigationButtons}>
                  <Button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className={styles.yellowButton}
                  >
                    ← Quiz trước
                  </Button>
                  <Button
                    onClick={
                      currentQuestion < quizData.questions.length - 1
                        ? nextQuestion
                        : handleSubmit
                    }
                    className={styles.yellowButton}
                  >
                    {currentQuestion < quizData.questions.length - 1
                      ? 'Quiz tiếp theo →'
                      : 'Nộp bài'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className={styles.questionNavigationCard}>
              <Card.Body>
                <div className={styles.progressText}>
                  Tiến độ: {Object.keys(answers).length}/{quizData.questions.length} câu
                </div>
                <ProgressBar
                  now={(Object.keys(answers).length / quizData.questions.length) * 100}
                  variant="warning"
                  className={styles.progressBar}
                />

                <div className={styles.questionButtons}>
                  {quizData.questions.map((q, i) => (
                    <Button
                      key={q.id}
                      onClick={() => goToQuestion(i)}
                      variant={isQuestionAnswered(q.id) ? "warning" : "outline-secondary"}
                      className={styles.questionButton}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  className={styles.yellowButton}
                  size="lg"
                  style={{ width: '100%', marginTop: 20 }}
                  onClick={handleSubmit}
                >
                  Nộp bài
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
