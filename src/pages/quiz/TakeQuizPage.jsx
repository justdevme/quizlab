import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import styles from './TakeQuizPage.module.css';

export default function TakeQuizPage() {
  const navigate = useNavigate();

  const quizData = {
    timeLimit: 30, // Phút
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
        text: "Điền số thích hợp vào chỗ trống: 5 x ___ = 45",
        type: "text",
        correctAnswer: "9"
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
        ],
        correctAnswer: ["a", "c"]
      },
      {
        id: 4,
        text: "Diện tích hình tròn có bán kính r = 5cm là bao nhiêu? (Lấy π = 3.14)",
        type: 'text',
        correctAnswers: "75.8cm2" 
      },
    ]
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit * 60);

  const currentQuestion = useMemo(() => {
    return quizData.questions[currentQuestionIndex];
  }, [currentQuestionIndex, quizData.questions]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, optionIdOrValue, questionType) => {
    setAnswers(prevAnswers => {
      const newAnswers = { ...prevAnswers };
      if (questionType === 'multiple') {
        const currentSelectedOptions = newAnswers[questionId] || [];
        if (currentSelectedOptions.includes(optionIdOrValue)) {
          newAnswers[questionId] = currentSelectedOptions.filter(id => id !== optionIdOrValue);
        } else {
          newAnswers[questionId] = [...currentSelectedOptions, optionIdOrValue];
        }
      } else { // single, text
        newAnswers[questionId] = optionIdOrValue;
      }
      return newAnswers;
    });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    let wrongCount = 0;
    const timeTaken = quizData.timeLimit * 60 - timeLeft;
    
    const questionsWithResults = quizData.questions.map(q => {
      const userAnswer = answers[q.id];
      let isCorrect = false;
      
      if (q.correctAnswer !== undefined) {
        if (q.type === 'single' || q.type === 'text') {
          isCorrect = String(userAnswer).trim().toLowerCase() === String(q.correctAnswer).toLowerCase();
        } else if (q.type === 'multiple') {
          const correctAnswers = q.correctAnswer || [];
          const userAnswersArray = userAnswer || [];
          isCorrect = userAnswersArray.length === correctAnswers.length && 
                     userAnswersArray.every(ans => correctAnswers.includes(ans)) &&
                     correctAnswers.every(corrAns => userAnswersArray.includes(corrAns));
        }
        
        if (isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
      
      return {
        ...q,
        userAnswer,
        isCorrect
      };
    });

    navigate('/result', { 
      state: { 
        totalQuestions: quizData.questions.length,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        timeTaken: formatTime(timeTaken),
        completedAt: new Date().toLocaleString('vi-VN'),
        questions: questionsWithResults
      } 
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestionIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!currentQuestion) return;
      const key = event.key;

      if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
        if (currentQuestion.options && key >= '1' && key <= String(currentQuestion.options.length)) {
          const optionIndex = parseInt(key) - 1;
          const option = currentQuestion.options[optionIndex];
          if (option) {
            handleAnswerChange(currentQuestion.id, option.id, currentQuestion.type);
          }
        }
      }
      
      if (key === 'Enter') {
        if (!((event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') && currentQuestion.type === 'text')) {
            event.preventDefault();
            if (currentQuestionIndex === quizData.questions.length - 1) {
                handleSubmitQuiz();
            } else {
                handleNext();
            }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestion, answers, handleNext, currentQuestionIndex, quizData.questions.length]);

  if (!currentQuestion) {
    return <div className={styles.loadingState}>Đang tải câu hỏi...</div>;
  }

  const renderOptions = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'single':
        return currentQuestion.options.map((option, index) => (
          <button
            key={option.id}
            className={`${styles.optionButton} ${answers[currentQuestion.id] === option.id ? styles.selectedOption : ''}`}
            onClick={() => handleAnswerChange(currentQuestion.id, option.id, 'single')}
          >
            <span className={styles.optionIndex}>{String.fromCharCode(65 + index)}</span>
            {option.text}
          </button>
        ));
      case 'multiple':
        return currentQuestion.options.map((option, index) => (
          <button
            key={option.id}
            className={`${styles.optionButton} ${(answers[currentQuestion.id] || []).includes(option.id) ? styles.selectedOption : ''}`}
            onClick={() => handleAnswerChange(currentQuestion.id, option.id, 'multiple')}
          >
            <span className={styles.optionIndex}>{String.fromCharCode(65 + index)}</span>
            {option.text}
          </button>
        ));
      case 'text':
        return (
          <textarea
            className={styles.textAnswerInput}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value, 'text')}
            placeholder="Nhập câu trả lời của bạn..."
            rows={4}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.takeQuizPageContainer}>
      <header className={styles.quizPageHeader}>
        <div className={styles.topicSection}>
          {/* <span className={styles.topicLabel}>Chủ đề</span> */}
          <span className={styles.topicName}>Toán cơ bản</span> {/* Hoặc tên quiz động */} 
        </div>
        <div className={styles.timerSection}>
          <i className={`ri-time-line ${styles.timerIcon}`}></i>
          <span>{formatTime(timeLeft)}</span>
        </div>
      </header>

      <div className={styles.quizLayout}>
        <div className={styles.quizContent}>
          <div className={styles.questionDisplayCard}>
            <div className={styles.questionHeader}>
              <div className={styles.questionNumber}>
                <div>{currentQuestion.id}</div>
                <div className={styles.totalQuestions}>/{quizData.questions.length}</div>
              </div>
              <p className={styles.questionText}>{currentQuestion.text}</p>
            </div>
          </div>

          <div className={styles.optionsContainer}>
            {renderOptions()}
          </div>

          <div className={styles.navigationButtons}>
            <button 
              onClick={handlePrev} 
              disabled={currentQuestionIndex === 0}
              className={`${styles.navButton} ${styles.prevButton}`}
            >
              <i className="ri-arrow-left-s-line"></i> Câu trước
            </button>
            <button 
              onClick={handleNext}
              className={`${styles.navButton} ${styles.nextButton}`}
            >
              {currentQuestionIndex === quizData.questions.length - 1 ? 'Nộp bài' : 'Câu tiếp theo'} 
              {currentQuestionIndex !== quizData.questions.length - 1 && <i className="ri-arrow-right-s-line"></i>}
            </button>
          </div>
        </div>

        <aside className={styles.questionNavigationPanel}>
          <h3 className={styles.panelTitle}>Danh sách câu hỏi</h3>
          <div className={styles.questionGrid}>
            {quizData.questions.map((q, index) => (
              <button
                key={q.id}
                className={`
                  ${styles.questionNavButton} 
                  ${index === currentQuestionIndex ? styles.currentQuestionNav : ''}
                  ${answers[q.id] ? styles.answeredQuestionNav : ''}
                `}
                onClick={() => handleQuestionNavigation(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={handleSubmitQuiz} 
            className={`${styles.navButton} ${styles.submitButtonPanel}`}
          >
            Nộp bài
          </button>
        </aside>
      </div>
    </div>
  );
}