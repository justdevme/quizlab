import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import styles from './ResultPage.module.css';

export default function ResultPage() {
  const location = useLocation();
  const { resultId } = useParams();
  const [resultData, setResultData] = useState(location.state || null);
  
  
  useEffect(() => {
    if (!resultData && resultId) {
      const fetchResult = async () => {
        try {
          const res = await axios.get(`http://localhost:8017/v1/api/results/${resultId}`);
          setResultData(res.data);
        } catch (error) {
          console.error('Lỗi khi fetch dữ liệu kết quả:', error);
        }
      };
      fetchResult();
    }
  }, [resultId, resultData]);

  if (!resultData) return <div className={styles.loading}>Đang tải kết quả...</div>;
 



  const {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    unansweredQuestions = 0,
    duration,
    submitted_at,
    questions = []
  } = resultData;

  const percentageCorrect = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const getOptionLabel = (index) => String.fromCharCode(65 + index);

  const renderAnswerDetail = (question) => {
    if (question.type === 'single' || question.type === 'multiple') {
      return question.options.map((option, index) => {
        const isCorrectOption = question.type === 'single'
          ? option.id === question.correctAnswer
          : question.correctAnswer.includes(option.id);

        const isUserSelected = question.type === 'single'
          ? option.id === question.userAnswer
          : Array.isArray(question.userAnswer) && question.userAnswer.includes(option.id);

        let optionClass = styles.optionDetailItem;
        if (isUserSelected) {
          optionClass += question.isCorrect ? ` ${styles.userCorrect}` : ` ${styles.userIncorrect}`;
        }
        if (isCorrectOption && !isUserSelected) {
          optionClass += ` ${styles.actualCorrectOption}`;
        }

        return (
          <div key={option.id} className={optionClass}>
            <span className={styles.optionDetailLabel}>{getOptionLabel(index)}.</span>
            <span className={styles.optionDetailText}>{option.text}</span>
            {isUserSelected && question.isCorrect && <i className={`ri-check-line ${styles.iconCorrect}`}></i>}
            {isUserSelected && !question.isCorrect && <i className={`ri-close-line ${styles.iconIncorrect}`}></i>}
            {!isUserSelected && isCorrectOption && <i className={`ri-check-line ${styles.iconActualCorrect}`}></i>}
          </div>
        );
      });
    }

    if (question.type === 'text' || question.type === 'essay') {
      return (
        <div className={styles.essayAnswerDetail}>
          <p><strong>Câu trả lời của bạn:</strong></p>
          <div className={`${styles.essayBox} ${question.isCorrect ? styles.userCorrectEssay : styles.userIncorrectEssay}`}>
            {question.userAnswer || "Bạn chưa trả lời câu này"}
          </div>
          {!question.isCorrect && question.correctAnswer && (
            <>
              <p><strong>Đáp án đúng:</strong>{question.correctAnswer}</p>
              <div className={`${styles.essayBox} ${styles.actualCorrectEssay}`}>
                {question.correctAnswer}
              </div>
            </>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.resultPageContainer}>
      <div className={styles.resultHeader}>
        <h4>THÔNG TIN</h4>
        <div className={styles.timeInfo}>
          <span>Thời gian làm: {duration} giây</span>
          <span>Thời gian kết thúc: {new Date(submitted_at).toLocaleString('vi-VN')}</span>
        </div>
      </div>

      <div className={styles.progressBarContainer}>
        <ProgressBar now={percentageCorrect} className={styles.customProgressBar} />
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Hoàn thành</span>
          <span className={styles.statValue}>{percentageCorrect.toFixed(0)}%</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Số câu đúng</span>
          <span className={`${styles.statValue} ${styles.textSuccess}`}>{correctAnswers}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Số câu sai</span>
          <span className={`${styles.statValue} ${styles.textDanger}`}>{wrongAnswers}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Bỏ trống</span>
          <span className={styles.statValue}>{unansweredQuestions}</span>
        </div>
      </div>

      <div className={styles.detailTestSection}>
        <h4>CHI TIẾT PHẦN THI</h4>
        <div className={styles.questionNavigation}>
          {questions.map((q, index) => (
            <a
              href={`#question-${q.id}`}
              key={q.id}
              className={`${styles.navButton} ${q.isCorrect ? styles.navButtonCorrect : styles.navButtonIncorrect}`}
            >
              {index + 1}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.questionsReviewContainer}>
        {questions.map((question, index) => (
          <div key={question.id} id={`question-${question.id}`} className={styles.questionReviewItem}>
            <div className={styles.questionReviewHeader}>
              <span className={styles.questionReviewNumber}>Câu {index + 1}</span>
              <span className={`${styles.questionReviewStatus} ${question.isCorrect ? styles.statusCorrect : styles.statusIncorrect}`}>
                {question.isCorrect ? 'TRẢ LỜI ĐÚNG' : 'TRẢ LỜI SAI'}
              </span>
            </div>
            <p className={styles.questionReviewText}>{question.text}</p>
            <div className={styles.answerOptionsDetail}>
              {renderAnswerDetail(question)}
            </div>
            {!question.isCorrect && (
              <div className={styles.explanationBox}>
                <strong>Đáp án đúng:</strong> {question.correctAnswer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.footerActions}>
        <Link to="/dashboard">
          <button className={`${styles.actionButton} ${styles.dashboardButton}`}>Về Dashboard</button>
        </Link>
        <Link
          to="/take-quiz"
          state={{
            _id: resultData.quizId,
            title: resultData.quizTitle || "Làm lại câu sai",
            timeLimit: 10, // Hoặc để mặc định hoặc lấy từ `resultData`
            isRetry: true,
            resultId: resultId
          }}
        >
          <button className={`${styles.actionButton} ${styles.retryButton}`}>
            🔁 Làm lại câu sai
          </button>
        </Link>

      </div>
    </div>
  );
}

