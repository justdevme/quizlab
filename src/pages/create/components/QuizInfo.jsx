import { Form, Card } from "react-bootstrap";
import styles from '../CreatePage.module.css'

export default function QuizInfo({ quizData, handleQuizDataChange}) {
    return (
        <Card className={styles.formCard}>
                <Card.Header className={styles.cardHeader}>
                  <h3>Thông tin bài quiz</h3>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-4">
                    <Form.Label>Tiêu đề bài quiz</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={quizData.title}
                      onChange={handleQuizDataChange}
                      placeholder="Nhập tiêu đề bài quiz"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={quizData.description}
                      onChange={handleQuizDataChange}
                      placeholder="Mô tả ngắn về bài quiz"
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
    )
}