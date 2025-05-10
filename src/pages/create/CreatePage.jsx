import React, { useState } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import styles from './CreatePage.module.css';

export default function CreatePage() {
  const [quizData, setQuizData] = useState({
    title: '',
    timeLimit: 30,
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    type: 'single',
    options: [{ id: 'a', text: '' }, { id: 'b', text: '' }],
    correctAnswer: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setQuizData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOptionChange = (id, value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.map(opt => (opt.id === id ? { ...opt, text: value } : opt)),
    }));
  };

  const toggleCorrectMultiple = (id) => {
    const prev = currentQuestion.correctAnswer || [];
    const updated = prev.includes(id)
      ? prev.filter(optId => optId !== id)
      : [...prev, id];
    setCurrentQuestion(prev => ({ ...prev, correctAnswer: updated }));
  };

  const addOption = () => {
    const newId = String.fromCharCode(97 + currentQuestion.options.length);
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...prev.options, { id: newId, text: '' }],
    }));
  };

  const addQuestion = () => {
    if (!currentQuestion.text.trim()) return;
    const q = {
      ...currentQuestion,
      id: quizData.questions.length + 1,
      options: currentQuestion.type === 'essay' ? [] : currentQuestion.options,
    };
    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, q],
    }));
    setCurrentQuestion({
      text: '',
      type: 'single',
      options: [{ id: 'a', text: '' }, { id: 'b', text: '' }],
      correctAnswer: '',
    });
  };

  const removeQuestion = (index) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quiz Data:', quizData);
    alert("Quiz đã được lưu (console.log)");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tạo bài Quiz</h2>
      <Form onSubmit={handleSubmit}>
        {/* Quiz Info */}
        <Card className={styles.card}>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề bài quiz</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={quizData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Thời gian làm (phút)</Form.Label>
              <Form.Control
                type="number"
                name="timeLimit"
                value={quizData.timeLimit}
                onChange={handleChange}
                min={1}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Question Entry */}
        <Card className={styles.card}>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nội dung câu hỏi</Form.Label>
              <Form.Control
                as="textarea"
                name="text"
                rows={2}
                value={currentQuestion.text}
                onChange={handleQuestionChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Loại câu hỏi</Form.Label>
              <Form.Select
                name="type"
                value={currentQuestion.type}
                onChange={(e) => {
                  const type = e.target.value;
                  setCurrentQuestion({
                    text: '',
                    type,
                    options: type === 'essay' ? [] : [{ id: 'a', text: '' }, { id: 'b', text: '' }],
                    correctAnswer: type === 'multiple' ? [] : '',
                  });
                }}
              >
                <option value="single">Một đáp án</option>
                <option value="multiple">Nhiều đáp án</option>
                <option value="essay">Tự luận</option>
              </Form.Select>
            </Form.Group>

            {currentQuestion.type !== 'essay' && (
              <>
                {currentQuestion.options.map(opt => (
                  <div key={opt.id} className={styles.optionRow}>
                    <span>{opt.id.toUpperCase()}.</span>
                    <Form.Control
                      value={opt.text}
                      onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                      placeholder={`Lựa chọn ${opt.id.toUpperCase()}`}
                    />
                  </div>
                ))}
                <Button size="sm" className={styles.yellowBtn} onClick={addOption}>
                   Thêm lựa chọn
                </Button>
              </>
            )}

            {/* Đáp án đúng */}
            {currentQuestion.type === 'single' && (
              <Form.Group className="mt-3">
                <Form.Label>Đáp án đúng</Form.Label>
                <Form.Select
                  name="correctAnswer"
                  value={currentQuestion.correctAnswer}
                  onChange={handleQuestionChange}
                >
                  <option value="">Chọn đáp án</option>
                  {currentQuestion.options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.id.toUpperCase()}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            {currentQuestion.type === 'multiple' && (
              <Form.Group className="mt-3">
                <Form.Label>Đáp án đúng</Form.Label>
                {currentQuestion.options.map(opt => (
                  <Form.Check
                    key={opt.id}
                    type="checkbox"
                    label={`Lựa chọn ${opt.id.toUpperCase()}`}
                    checked={(currentQuestion.correctAnswer || []).includes(opt.id)}
                    onChange={() => toggleCorrectMultiple(opt.id)}
                  />
                ))}
              </Form.Group>
            )}

            {currentQuestion.type === 'essay' && (
              <Form.Group className="mt-3">
                <Form.Label>Đáp án mẫu</Form.Label>
                <Form.Control
                  type="text"
                  name="correctAnswer"
                  value={currentQuestion.correctAnswer}
                  onChange={handleQuestionChange}
                  placeholder="Nhập đáp án mẫu"
                />
              </Form.Group>
            )}

            <div className="mt-3 text-end">
            <Button className={styles.yellowBtn} onClick={addQuestion}>
              Thêm câu hỏi
            </Button>
                        </div>
          </Card.Body>
        </Card>

        {/* Danh sách câu hỏi */}
        {quizData.questions.length > 0 && (
          <Card className={styles.card}>
            <Card.Body>
              <h5>Danh sách câu hỏi ({quizData.questions.length})</h5>
              {quizData.questions.map((q, i) => (
                <div key={q.id} className={styles.questionBlock}>
                  <strong>{i + 1}. {q.text}</strong>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => removeQuestion(i)}
                  >
                    Xóa
                  </Button>
                </div>
              ))}
            </Card.Body>
          </Card>
        )}

            <div className="d-flex justify-content-end">
              <Button type="submit" className={styles.yellowBtn}>
                Lưu bài quiz
              </Button>
            </div>

        
      </Form>

      
    </div>
  );
}
