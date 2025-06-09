import { Form, Button, Card } from 'react-bootstrap';
import styles from '../CreatePage.module.css'

export default function QuestionForm({
  currentQuestion,
  handleQuestionChange,
  handleOptionChange,
  addOption,
  removeOption,
  addQuestion
}) {
  return (
    <>
      <Card className={`${styles.formCard} mt-4`}>
                <Card.Header className={styles.cardHeader}>
                  <h3>Thêm câu hỏi mới</h3>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-4">
                    <Form.Label>Câu Hỏi</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="question"
                      value={currentQuestion.question}
                      onChange={handleQuestionChange}
                      placeholder="Nhập nội dung câu hỏi"
                    />
                  </Form.Group>


                  
                    <div className={styles.optionsSection}>
                      <div className={styles.optionsHeader}>
                        <h4>Các lựa chọn</h4>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={addOption}
                          disabled={currentQuestion.options.length >= 6}
                        >
                          <i className="bi bi-plus-lg"></i> Thêm lựa chọn
                        </Button>
                      </div>

                      {currentQuestion.options.map((option) => (
                        <div key={option.id} className={styles.optionItem}>
                          <span className={styles.optionLabel}>{option.id.toUpperCase()}</span>
                          <Form.Control
                            type="text"
                            value={option.text}
                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                            placeholder={`Nội dung lựa chọn ${option.id.toUpperCase()}`}
                          />
                          {currentQuestion.options.length > 2 && (
                            <Button
                              variant="link"
                              className={styles.removeOptionBtn}
                              onClick={() => removeOption(option.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          )}
                        </div>
                      ))}

                      <Form.Group className="mt-3">
                        <Form.Label>Đáp án đúng</Form.Label>
                       
                          <Form.Select
                            name="correctAnswer"
                            value={currentQuestion.correctAnswer}
                            onChange={handleQuestionChange}
                          >
                            <option value="">Chọn đáp án đúng</option>
                            {currentQuestion.options.map(option => (
                              <option key={option.id} value={option.id}>
                                {option.id.toUpperCase()}
                              </option>
                            ))}
                          </Form.Select>
                        
                      </Form.Group>
                    </div>
                  


                  <div className="mt-4">
                    <Button variant="warning" onClick={addQuestion}>
                      <i className="bi bi-plus-lg"></i> Thêm Câu Hỏi
                    </Button>
                  </div>
                </Card.Body>
              </Card>
    </>
  );
}
