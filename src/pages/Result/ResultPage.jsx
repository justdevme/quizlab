import React from 'react';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './ResultPage.module.css';

export default function ResultPage() {
  const resultData = {
    totalQuestions: 5,
    correctAnswers: 3,
    wrongAnswers: 2,
    timeTaken: "10p20s",
    completedAt: "01/04/2025 15:00",
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
        correctAnswer: "b",
        userAnswer: "b",
        isCorrect: true
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
        correctAnswer: "a",
        userAnswer: "a",
        isCorrect: true
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
        correctAnswer: ["a", "c", "e"],
        userAnswer: ["a", "c", "d", "e"],
        isCorrect: false
      },
      {
        id: 4,
        text: "Diện tích hình tròn có bán kính r = 5cm là bao nhiêu? (Lấy π = 3.14)",
        type: "essay",
        correctAnswer: "78.5",
        userAnswer: "78.5",
        isCorrect: true
      },
      {
        id: 5,
        text: "1 + 1 = ?",
        type: "essay",
        correctAnswer: "2",
        userAnswer: "3",
        isCorrect: false
      }
    ]
  };

  const score = 6; // 6/10 như yêu cầu

  const renderAnswer = (question) => {
    switch (question.type) {
      case 'single':
        return (
          <div className={styles.answerSection}>
            <div className={styles.optionsList}>
              {question.options.map(option => (
                <div
                  key={option.id}
                  className={`${styles.optionItem} ${
                    option.id === question.correctAnswer ? styles.correctOption : ''
                  } ${
                    option.id === question.userAnswer && option.id !== question.correctAnswer ? styles.wrongOption : ''
                  } ${
                    option.id === question.userAnswer && option.id === question.correctAnswer ? styles.correctUserOption : ''
                  }`}
                >
                  <span className={styles.optionLetter}>{option.id.toUpperCase()}</span>
                  <span className={styles.optionText}>{option.text}</span>
                  {option.id === question.correctAnswer && (
                    <i className={`bi bi-check-circle ${styles.correctIcon}`}></i>
                  )}
                  {option.id === question.userAnswer && option.id !== question.correctAnswer && (
                    <i className={`bi bi-x-circle ${styles.wrongIcon}`}></i>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'multiple':
        return (
          <div className={styles.answerSection}>
            <div className={styles.optionsList}>
              {question.options.map(option => {
                const isCorrect = question.correctAnswer.includes(option.id);
                const isUserSelected = question.userAnswer.includes(option.id);
                const isCorrectUserSelection = isCorrect && isUserSelected;
                const isWrongUserSelection = !isCorrect && isUserSelected;

                return (
                  <div
                    key={option.id}
                    className={`${styles.optionItem} ${
                      isCorrect ? styles.correctOption : ''
                    } ${
                      isWrongUserSelection ? styles.wrongOption : ''
                    } ${
                      isCorrectUserSelection ? styles.correctUserOption : ''
                    }`}
                  >
                    <span className={styles.optionLetter}>{option.id.toUpperCase()}</span>
                    <span className={styles.optionText}>{option.text}</span>
                    {isCorrect && (
                      <i className={`bi bi-check-circle ${styles.correctIcon}`}></i>
                    )}
                    {isWrongUserSelection && (
                      <i className={`bi bi-x-circle ${styles.wrongIcon}`}></i>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'essay':
        return (
          <div
            className={`${styles.answerSection} ${
              question.isCorrect ? styles.correctBackground : styles.wrongBackground
            }`}
          >
            <p><strong>Câu trả lời của bạn:</strong></p>
            <div className={styles.textBox}>{question.userAnswer}</div>
            <p className="mt-3"><strong>Đáp án đúng:</strong></p>
            <div className={styles.textBox}>{question.correctAnswer || "Chưa có đáp án mẫu"}</div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.resultPageContainer}>
      <Container>
        <Card className={styles.summaryCard}>
          <Card.Body>
            <div className={styles.scoreSection}>
              <div className={styles.scoreDetails}>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreItemLabel}>Tổng số câu hỏi:</div>
                  <div className={styles.scoreItemValue}>{resultData.totalQuestions}</div>
                </div>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreItemLabel}>Câu trả lời đúng:</div>
                  <div className={styles.scoreItemValue}>{resultData.correctAnswers}</div>
                </div>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreItemLabel}>Câu trả lời sai:</div>
                  <div className={styles.scoreItemValue}>{resultData.wrongAnswers}</div>
                </div>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreItemLabel}>Điểm số:</div>
                  <div className={styles.scoreItemValue}>{score}/10</div>
                </div>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreItemLabel}>Thời gian làm bài:</div>
                  <div className={styles.scoreItemValue}>{resultData.timeTaken}</div>
                </div>
                <div className={styles.scoreItem}>
                  <div className={styles.scoreItemLabel}>Hoàn thành lúc:</div>
                  <div className={styles.scoreItemValue}>{resultData.completedAt}</div>
                </div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <Link to="/dashboard">
                <Button variant="warning" className={styles.mainButton}>
                  <i className="bi bi-house-door"></i> Trở về trang chủ
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>

        <div className={styles.questionsSection}>
          {resultData.questions.map((question, index) => (
            <Card key={question.id} className={styles.questionCard}>
              <Card.Body>
                <div className={styles.questionHeader}>
                  <h5 className={styles.questionTitle}>
                    Câu {index + 1}: {question.text}
                  </h5>
                  <Badge
                    bg={question.isCorrect ? "success" : "danger"}
                    className={styles.questionBadge}
                  >
                    {question.isCorrect ? "Đúng" : "Sai"}
                  </Badge>
                </div>
                {renderAnswer(question)}
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
