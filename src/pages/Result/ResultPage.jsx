import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './ResultPage.module.css';
import { ProgressBar } from 'react-bootstrap'; // Sử dụng ProgressBar của react-bootstrap

export default function ResultPage() {
  const location = useLocation();
  // Lấy dữ liệu từ TakeQuizPage, nếu không có thì dùng mock data
  const resultData = location.state || {
    totalQuestions: 20, // Giả sử có 20 câu như hình
    correctAnswers: 6,
    wrongAnswers: 14,
    unansweredQuestions: 0,
    timeTaken: "00:00:55",
    completedAt: "16:00 03/06/2025",
    score: 3, // 6/20 * 10 = 3
    percentage: "30%",
    questions: Array(20).fill(null).map((_, i) => ({
      id: i + 1,
      text: `Đây là nội dung câu hỏi số ${i + 1}. Câu hỏi này có thể dài hoặc ngắn tùy thuộc vào đề bài. `,
      type: (i % 5 === 3) ? "text" : (i % 5 === 2) ? "multiple" : "single", // Xen kẽ các loại câu hỏi
      options: (i % 5 !== 3) ? [
        { id: "a", text: "Phương án A cho câu " + (i+1) },
        { id: "b", text: "Phương án B cho câu " + (i+1) },
        { id: "c", text: "Phương án C cho câu " + (i+1) },
        { id: "d", text: "Phương án D cho câu " + (i+1) }
      ] : [],
      correctAnswer: (i % 5 === 3) ? "Đáp án đúng cho câu tự luận" : (i % 5 === 2) ? ["a", "c"] : "b",
      userAnswer: (i < 6) ? ((i % 5 === 3) ? "Đáp án đúng cho câu tự luận" : (i % 5 === 2) ? ["a", "c"] : "b") : ((i % 5 === 3) ? "Đáp án sai" : (i % 5 === 2) ? ["a", "d"] : "c"), // 6 câu đầu đúng, còn lại sai
      isCorrect: i < 6,
      explanation: `Đây là giải thích chi tiết cho câu hỏi ${i + 1}. Giải thích này giúp người dùng hiểu rõ hơn về đáp án.`
    }))
  };

  const { 
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    unansweredQuestions = 0, // Thêm câu bỏ trống nếu có
    timeTaken,
    completedAt,
    questions
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
              <p className="mt-2"><strong>Đáp án đúng:</strong></p>
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
          <span>Thời gian làm: {timeTaken}</span>
          <span>Thời gian kết thúc bài thi: {completedAt}</span>
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
          <span className={styles.statLabel}>Số câu bỏ trống</span>
          <span className={styles.statValue}>{unansweredQuestions}</span>
        </div>
      </div>

      <div className={styles.detailTestSection}>
        <h4>CHI TIẾT PHẦN THI</h4>
        {/* Nếu có nhiều phần thi, có thể thêm logic render tab ở đây */}
        {/* <div className={styles.partTabs}>
          <button className={`${styles.partTab} ${styles.activePart}`}>Phần 1</button>
        </div> */}
        
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
              {/* <span className={styles.answerTypeHint}>Một đáp án</span> */}
            </div>
            <p className={styles.questionReviewText}>{question.text}</p>
            <div className={styles.answerOptionsDetail}>
              {renderAnswerDetail(question)}
            </div>
            {question.explanation && !question.isCorrect && (
              <div className={styles.explanationBox}>
                <strong>Giải thích:</strong> {question.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.footerActions}>
        <Link to="/dashboard">
          <button className={`${styles.actionButton} ${styles.dashboardButton}`}>Về Dashboard</button>
        </Link>
        {/* <button className={`${styles.actionButton} ${styles.reviewButton}`}>Xem lại bài làm</button> */}
        {/* <button className={`${styles.actionButton} ${styles.newQuizButton}`}>Làm bài mới</button> */}
      </div>
    </div>
  );
}