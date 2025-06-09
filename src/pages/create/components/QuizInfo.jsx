import { Form, Card } from "react-bootstrap";
import styles from '../CreatePage.module.css'
import { generateQuestions } from "../../../apis/gptApi";
import { AiOutlineRobot } from 'react-icons/ai';

export default function QuizInfo({ quizData, handleQuizDataChange, setQuizData}) {

   const handleAutoGenerate = async () => {
  try {
    const topic = quizData.title || 'JavaScript'; // fallback nếu chưa nhập
    const questionsFromGPT = await generateQuestions(topic, 5, 'mcq');

    const formatted = questionsFromGPT.map((q, index) => {
      // Tạo danh sách options dạng { id, text }
      const optionObjs = q.options.map((text, i) => ({
        id: String.fromCharCode(97 + i), // 'a', 'b', 'c', ...
        text
      }));

      // Tìm index của đáp án đúng trong danh sách
      const correctIndex = q.options.findIndex(opt => opt === q.correctAnswer);

      return {
        id: quizData.questions.length + index + 1,
        question: q.question,
        options: optionObjs,
        correctAnswer: optionObjs[correctIndex]?.id || '', // dùng id của đáp án đúng
        points: 1
      };
    });

    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, ...formatted]
    }));
  } catch (error) {
    console.error('Lỗi gọi GPT API:', error);
    alert('Không thể tạo câu hỏi tự động');
  }
};


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
                    <button
                      type="button"
                      className="btn btn-dark mt-3 d-flex align-items-center gap-2"
                      onClick={handleAutoGenerate}
                    >
                      <AiOutlineRobot size={20} />
                      Tạo câu hỏi từ AI
                    </button>
                  </Form.Group>
                </Card.Body>
              </Card>
    )
}