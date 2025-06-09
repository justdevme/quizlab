import React, { useState, useEffect } from 'react';

const flashcards = [
  {
    question: "Đại hội đại biểu toàn quốc lần thứ VI của DCSVN được tổ chức vào năm nào?",
    options: ['a) 1985', 'b) 1986', 'c) 1987', 'd) 1988'],
    correctAnswer: 'b'
  },
  {
    question: "Chính sách Đổi mới được khởi xướng từ Đại hội nào của Đảng?",
    options: ['a) Đại hội V', 'b) Đại hội VI', 'c) Đại hội VII', 'd) Đại hội VIII'],
    correctAnswer: 'b'
  }
];

export default function FlashcardApp() {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .flashcard-container {
        font-family: sans-serif;
        background: #f0f4f8;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
      }
      .flashcard-header {
        display: flex;
        justify-content: space-between;
        width: 300px;
        margin-bottom: 20px;
        font-size: 18px;
      }
      .flashcard-header button {
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 6px 12px;
        cursor: pointer;
      }
      .flashcard {
        width: 400px;
        height: 260px;
        perspective: 1000px;
        cursor: pointer;
        position: relative;
      }
      .flashcard-front,
      .flashcard-back {
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        padding: 24px;
        position: absolute;
        backface-visibility: hidden;
        transition: transform 0.6s ease-in-out;
      }
      .flashcard-front {
        transform: rotateY(0deg);
      }
      .flashcard-back {
        transform: rotateY(180deg);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .flashcard.flipped .flashcard-front {
        transform: rotateY(-180deg);
      }
      .flashcard.flipped .flashcard-back {
        transform: rotateY(0deg);
      }
      .hint {
        margin-top: 16px;
        color: #888;
        font-size: 14px;
      }
      .flashcard-front ul {
        padding-left: 16px;
      }
      .flashcard-front li {
        margin-bottom: 8px;
        font-size: 16px;
        color: #444;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleNext = () => {
    if (current < flashcards.length - 1) {
      setCurrent(current + 1);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setFlipped(false);
    }
  };

  const card = flashcards[current];

  return (
    <div className="flashcard-container">
      <div className="flashcard-header">
        <button onClick={handlePrevious}>&larr;</button>
        <span>{current + 1}/{flashcards.length}</span>
        <button onClick={handleNext}>&rarr;</button>
      </div>
      <div
        className={`flashcard ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flashcard-front">
          <h3>{card.question}</h3>
          <ul>
            {card.options.map((opt, idx) => (
              <li key={idx}>{opt}</li>
            ))}
          </ul>
        </div>
        <div className="flashcard-back">
          <h3>Đáp án đúng:</h3>
          <p>{card.options.find(o => o.toLowerCase().startsWith(card.correctAnswer))}</p>
        </div>
      </div>
      
    </div>
  );
}