import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import QuizInfoForm from './components/QuizInfo';
import QuestionForm from './components/QuestionInFo';
import QuestionList from './components/QuestionList';
import Sidebar from '../../components/Sidebar';
import styles from './CreatePage.module.css';
import { createQuiz } from '../../apis/quizApi';
import Papa from 'papaparse'
import { FaFileCsv } from 'react-icons/fa';


export default function CreateQuizPage() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: [{ id: 'a', text: '' }, { id: 'b', text: '' }],
    correctAnswer: '',
    points: 1
  });

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleOptionChange = (id, value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.map(opt => 
        opt.id === id ? { ...opt, text: value } : opt
      )
    }));
  };

  const addOption = () => {
    if (currentQuestion.options.length >= 6) return;
    const newId = String.fromCharCode(97 + currentQuestion.options.length);
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...prev.options, { id: newId, text: '' }]
    }));
  };

  const removeOption = (id) => {
    if (currentQuestion.options.length <= 2) return;
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt.id !== id)
    }));
  };

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) return;
  
    setQuizData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        { ...currentQuestion, id: prev.questions.length + 1 }
      ]
    }));
  
    // Reset current question form
    setCurrentQuestion({
      question: '',
      options: [{ id: 'a', text: '' }, { id: 'b', text: '' }],
      correctAnswer: '',
      points: 1
    });
  };

  const removeQuestion = (index) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };


  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    questions: []
  });

  const handleQuizDataChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const formattedQuestions = quizData.questions.map((q) => ({
      question: q.question,
      options: q.options.map(opt => opt.text), // chỉ lấy text của lựa chọn
      correctAnswer: q.correctAnswer,
      points: q.points
    }));

    const payload = {
      title: quizData.title,
      description: quizData.description,
      questions: formattedQuestions
    };

    const result = await createQuiz(payload);
    alert('Quiz đã được tạo! ID: ' + result.quizId);
  } catch (err) {
    console.error(err);
    alert('Lỗi khi tạo quiz!');
  }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedQuestions = results.data.map((row, index) => {
          const options = ['A', 'B', 'C', 'D'].map(letter => ({
            id: letter.toLowerCase(),
            text: row[`option${letter}`] || ''
          }));
  
          return {
            id: index + 1,
            question: row.question || '',
            options,
            correctAnswer: row.correctAnswer?.toLowerCase() || '',
            points: parseInt(row.points) || 1
          };
        });
  
        setQuizData(prev => ({
          ...prev,
          questions: parsedQuestions
        }));
      }
    });
  };

  return (
    <div className={styles.dashboardContainer}>
    <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

    <div className={`${styles.mainContent} ${collapsed ? styles.expanded : ''}`}>
      <div className={styles.contentArea}>
        <h2 className={styles.heading}>Tạo quiz mới</h2>

        <Form onSubmit={handleSubmit}>
          <QuizInfoForm quizData={quizData} handleQuizDataChange={handleQuizDataChange} />

          <QuestionForm
            currentQuestion={currentQuestion}
            handleQuestionChange={handleQuestionChange}
            handleOptionChange={handleOptionChange}
            addOption={addOption}
            removeOption={removeOption}
            addQuestion={addQuestion}
          />

          {Array.isArray(quizData.questions) && quizData.questions.length > 0 && (
            <QuestionList
              questions={quizData.questions}
              onRemove={removeQuestion}
            />
          )}
          <div className={styles.actionsWrapper}>
            
          
            <Form.Label htmlFor="csvUpload" className={styles.uploadButton}>
              <FaFileCsv />
              Chọn file csv
            </Form.Label>
            <Form.Control
              type="file"
              accept=".csv"
              id="csvUpload"
              onChange={handleCSVUpload}
              style={{ display: 'none' }}
            />
          

            <div className={styles.formActions}>
              <button type="submit" className="btn btn-warning">Lưu Quiz</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>


  );
}



