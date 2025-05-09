import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TakeQuizPage.module.css';
import axios from 'axios'

export default function TakeQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8017/v1/api/quizzes/${id}/questions`)
      .then(res => {
        setQuizData(res.data);
        setTimeLeft((res.data.timeLimit || 30) * 60);
      })
      .catch(err => console.error(err));
  }, [id]);

  // Format thời gian
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Đếm ngược thời gian
  useEffect(() => {
    if (timeLeft > 0 && !quizSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, quizSubmitted]); 

  // Xử lý khi chọn đáp án
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      if (currentAnswers.includes(value)) {
        return {
          ...prev,
          [questionId]: currentAnswers.filter(item => item !== value)
        };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, value]
          };
        }
      });
  };

  // Chuyển câu hỏi
  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  // Câu hỏi tiếp theo
  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Câu hỏi trước
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Nộp bài
  const duration = (quizData?.timeLimit || 30) * 60 - timeLeft;
  const handleSubmit = async () => {
    setQuizSubmitted(true);
  
    try {
      const response = await axios.post(`http://localhost:8017/v1/api/results/${id}/submit`, {
        userAnswers: answers,
        duration
      });
  
      const resultId = response.data.resultId;
      navigate(`/result/${resultId}`);
    } catch (error) {
      console.error("Lỗi khi nộp bài:", error);
      alert("Đã xảy ra lỗi khi nộp bài!");
      setQuizSubmitted(false);
    }
  };
  // Kiểm tra câu hỏi đã được trả lời chưa
  const isQuestionAnswered = (questionId) => {
    return answers[questionId] !== undefined && 
           (Array.isArray(answers[questionId]) ? answers[questionId].length > 0 : true);
  };

  // Tính số câu đã trả lời
  const answeredCount = Object.keys(answers).length;

  // Hiển thị câu hỏi hiện tại
  const renderQuestion = () => {
    const q = quizData.questions[currentQuestion];
    return (
      <div>
        <h4>Câu {currentQuestion + 1}: {q.question}</h4>
        {q.options.map(opt => (
          <Form.Check
            key={opt}
            type="checkbox"
            label={opt}
            checked={answers[q._id]?.includes(opt) || false}
            onChange={() => handleAnswerChange(q._id, opt)}
          />
        ))}
      </div>
    );
  };
  if (!quizData) return <div>Đang tải quiz...</div>;
  return (
    <div className={styles.takeQuizContainer}>
      <Container>
        {quizSubmitted ? (
          <div className={styles.submittedContainer}>
            
          </div>
        ) : (
          <>
            <div className={styles.quizHeader}>
              <div className={styles.quizInfo}>
                <h3 className={styles.quizTitle}>{quizData.title}</h3>
                <p className={styles.quizDescription}>{quizData.description}</p>
              </div>
              <div className={styles.quizTimer}>
                <div className={styles.timerIcon}>
                  <i className="bi bi-clock"></i>
                </div>
                <div className={styles.timerValue}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            <Row>
              <Col lg={8} md={12}>
                <Card className={styles.questionCard}>
                  <Card.Body>
                    {renderQuestion()}
                    
                    <div className={styles.navigationButtons}>
                      <Button 
                        variant="outline-secondary" 
                        onClick={prevQuestion}
                        disabled={currentQuestion === 0}
                      >
                        <i className="bi bi-arrow-left"></i> Quiz trước
                      </Button>
                      
                      {currentQuestion < quizData.questions.length - 1 ? (
                        <Button 
                          variant="outline-primary" 
                          onClick={nextQuestion}
                        >
                          Quiz tiếp theo <i className="bi bi-arrow-right"></i>
                        </Button>
                      ) : (
                        <Button 
                          variant="warning" 
                          onClick={handleSubmit}
                        >
                          Nộp bài
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={4} md={12}>
                <Card className={styles.questionNavigationCard}>
                  <Card.Body>
                    <div className={styles.progressInfo}>
                      <div className={styles.progressText}>
                        Tiến độ: {answeredCount}/{quizData.questions.length} câu
                      </div>
                      <ProgressBar 
                        now={(answeredCount / quizData.questions.length) * 100} 
                        variant="warning" 
                        className={styles.progressBar}
                      />
                    </div>
                    
                    <div className={styles.questionButtons}>
                      {quizData.questions.map((question, index) => (
                        <Button
                          key={question._id}
                          variant={isQuestionAnswered(question._id) ? "warning" : "outline-secondary"}
                          className={`${styles.questionButton} ${currentQuestion === index ? styles.currentQuestion : ''}`}
                          onClick={() => goToQuestion(index)}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>
                    
                    <div className={styles.submitSection}>
                      <Button 
                        variant="warning" 
                        size="lg" 
                        block 
                        className={styles.submitButton}
                        onClick={handleSubmit}
                      >
                        Nộp bài
                      </Button>
                      <div className={styles.submitNote}>
                        
                        
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}