import { Button, Card } from 'react-bootstrap';
import styles from '../CreatePage.module.css'

export default function QuestionList({ questions, onRemove }) {
    return (
      <Card className={`${styles.formCard} mt-4`}>
        <Card.Header className={styles.cardHeader}>
          <h3>Danh sách câu hỏi ({questions.length})</h3>
        </Card.Header>
        <Card.Body>
          <div className={styles.questionsList}>
            {questions.map((question, index) => (
              <div key={question.id} className={styles.questionItem}>
                <div className={styles.questionNumber}>{index + 1}</div>
                <div className={styles.questionContent}>
                  <h4>{question.question}</h4>
                  <p>
                    <span className="badge bg-info">{question.points} điểm</span>
                  </p>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onRemove(index)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    );
  }
  