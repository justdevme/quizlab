import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SaveQuizPage.module.css';

// Dữ liệu giả lập cho các quiz đã lưu
const initialQuizzes = [
  {
    id: 1,
    title: 'KTCT',
    details: 'Tác giả A',
  },
  {
    id: 2,
    title: 'LSD',
    details: 'Tác giả B',
  },
  {
    id: 3,
    title: 'TTHCM',
    details: 'Tác giả C',
  },
  {
    id: 4,
    title: 'CNXHKH',
    details: 'Tác giả D',
  },
];

function SaveQuizPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [openMenuId, setOpenMenuId] = useState(null); // ID của quiz đang mở menu

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredQuizzes = initialQuizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(term)
    );
    setQuizzes(filteredQuizzes);
  };

  const toggleOptionsMenu = (quizId) => {
    setOpenMenuId(openMenuId === quizId ? null : quizId);
  };

  const handleUnsave = (quizId, quizTitle) => {
    console.log(`Gỡ lưu quiz: ${quizTitle} (ID: ${quizId})`);
    // Thêm logic gỡ lưu thực tế ở đây, ví dụ: gọi API, cập nhật state
    setQuizzes(quizzes.filter(q => q.id !== quizId));
    setOpenMenuId(null); // Đóng menu sau khi gỡ lưu
  };

    // Hàm xử lý điều hướng
  const handleNavigateToDetail = (quizId) => {
    navigate(`/quiz/detail/${quizId}`); // Điều hướng đến trang chi tiết, ví dụ: /quiz/detail/1
    // Bạn cần đảm bảo route /quiz/detail/:id đã được định nghĩa trong App.jsx
  };


  return (
    <div className={styles.saveQuizPageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Các bài quiz đã lưu</h1>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Tìm kiếm thư mục này"
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className={styles.quizList}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.id} className={styles.quizItem}>
              <div className={styles.quizItemIconContainer}>
                <span className={styles.quizItemIcon}>&#128193;</span>
              </div>
              <div className={styles.quizItemInfo}>
                <h3 className={styles.quizItemTitle}>{quiz.title}</h3>
                <p className={styles.quizItemDetails}>{quiz.details}</p>
              </div>
              <div className={styles.quizItemActions}>
                <button 
                  className={styles.optionsButton}
                  onClick={() => toggleOptionsMenu(quiz.id)}
                >
                  ...
                </button>
                {openMenuId === quiz.id && (
                  <div className={styles.optionsMenu}>
                    <button 
                      className={styles.menuItem}
                      onClick={() => handleUnsave(quiz.id, quiz.title)}
                    >
                      Gỡ lưu
                    </button>
                    {/* Thêm các mục menu khác nếu cần */}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>Không tìm thấy quiz nào.</p>
        )}
      </div>
    </div>
  );
}

export default SaveQuizPage;