
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css'; 

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Thay vì dùng axios, dùng fetch để gọi API
    axios.get('http://localhost:5000/api/questions')
    .then(response => {
      console.log("Questions fetched:", response.data);
      setQuestions(response.data); // Gán câu hỏi vào state Gán câu hỏi vào state
      })
      .catch(error => {
        console.error("Error fetching questions: ", error);
      });
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer('');
    setCurrentQuestion(currentQuestion + 1);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>; // Hiển thị "loading" khi chưa có câu hỏi
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Time</h1>
      <div className="question-container">
        <h2>{questions[currentQuestion].question}</h2>
        <div className="options-container">
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelect(option)}
                className="option-input"
              />
              <label htmlFor={`option-${index}`} className="option-label">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleNextQuestion} className="next-button">Next</button>
      </div>
      <div className="score-container">
        <h3>Score: {score} </h3>
      </div>
    </div>
  );
};

export default App;

