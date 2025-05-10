import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập dữ liệu - trong thực tế sẽ lấy từ API
    const mockData = [
      {
        id: 1,
        userName: "A",
        quizTitle: "Toán lớp 2",
        totalQuestions: 20,
        correctAnswers: 17,
        wrongAnswers: 3,
        score: 85,
        duration: "21:30",
        completedAt: "15/10/2025 14:30"
      },
      {
        id: 2,
        userName: "B",
        quizTitle: "Lý lớp 8",
        totalQuestions: 15,
        correctAnswers: 12,
        wrongAnswers: 3,
        score: 80,
        duration: "20:15",
        completedAt: "16/10/2025 10:45"
      },
      {
        id: 3,
        userName: "C",
        quizTitle: "Hóa lớp 11",
        totalQuestions: 25,
        correctAnswers: 20,
        wrongAnswers: 5,
        score: 80,
        duration: "35:20",
        completedAt: "14/10/2025 09:15"
      },
      {
        id: 4,
        userName: "D",
        quizTitle: "Sinh lớp 12",
        totalQuestions: 30,
        correctAnswers: 25,
        wrongAnswers: 5,
        score: 83,
        duration: "40:10",
        completedAt: "17/10/2025 15:30"
      },
      {
        id: 5,
        userName: "E",
        quizTitle: "Sử lớp 7",
        totalQuestions: 20,
        correctAnswers: 18,
        wrongAnswers: 2,
        score: 90,
        duration: "22:45",
        completedAt: "13/10/2025 11:20"
      }
    ];

    // Sắp xếp theo tên người dùng (bảng chữ cái)
    const sortedData = [...mockData].sort((a, b) => 
      a.userName.localeCompare(b.userName, 'vi')
    );
    
    setTimeout(() => {
      setQuizHistory(sortedData);
      setLoading(false);
    }, 1000); // Giả lập thời gian tải
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="Logo" className={styles.logoImage} />
            <span className={styles.logoText}>QuizApp</span>
          </div>
          <button className={styles.toggleBtn}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className={styles.sidebarNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/dashboard" className={styles.navLink}>
                <i className="fas fa-home"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="/search" className={styles.navLink}>
                <i className="fas fa-search"></i>
                <span>Tìm kiếm Quiz</span>
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="/create" className={styles.navLink}>
                <i className="fas fa-plus-circle"></i>
                <span>Tạo Quiz</span>
              </a>
            </li>
            <li className={`${styles.navItem} ${styles.active}`}>
              <a href="/admin" className={styles.navLink}>
                <i className="fas fa-user-shield"></i>
                <span>Quản trị</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <img src="/avatar.png" alt="User Avatar" />
            </div>
            <div className={styles.userName}>
              <span>Admin</span>
              <small>admin@quizapp.com</small>
            </div>
          </div>
          <button className={styles.logoutBtn}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Admin]</h1>
          </div>
          <div className={styles.headerRight}>
          </div>
        </div>

        <div className={styles.contentArea}>
          <div className={styles.quizHistoryContainer}>
            <div className={styles.historyHeader}>
              <h2>Lịch sử làm Quiz của người dùng</h2>
              
            </div>

            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : (
              <div className={styles.historyTable}>
                <table>
                  <thead>
                    <tr>
                      <th>Tên người dùng</th>
                      <th>Tên Quiz</th>
                      <th>Tổng số câu hỏi</th>
                      <th>Câu trả lời đúng</th>
                      <th>Câu trả lời sai</th>
                      <th>Điểm số</th>
                      <th>Thời gian làm bài</th>
                      <th>Hoàn thành lúc</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizHistory.map((item) => (
                      <tr key={item.id}>
                        <td className={styles.userName}>{item.userName}</td>
                        <td>{item.quizTitle}</td>
                        <td>{item.totalQuestions}</td>
                        <td className={styles.correctAnswers}>{item.correctAnswers}</td>
                        <td className={styles.wrongAnswers}>{item.wrongAnswers}</td>
                        <td className={styles.score}>{item.score}/100</td>
                        <td>{item.duration}</td>
                        <td>{item.completedAt}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button className={styles.viewBtn} title="Xem chi tiết">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className={styles.deleteBtn} title="Xóa">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className={styles.pagination}>
              <button className={styles.pageBtn}>&laquo;</button>
              <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <button className={styles.pageBtn}>&raquo;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;