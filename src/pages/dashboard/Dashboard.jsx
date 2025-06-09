import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import styles from "./Dashboard.module.css";

// Đăng ký Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    title: {
      display: true,
      text: 'Bản đồ hiệu suất theo tuần',
      font: {
        size: 18,
        weight: 'bold',
      },
      padding: 20,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f1f3f4',
      },
      ticks: {
        color: '#6c757d',
      },
    },
    x: {
      grid: {
        color: '#f1f3f4',
      },
      ticks: {
        color: '#6c757d',
      },
    },
  },
};

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentQuizzes, setRecentQuizzes] = useState([])
  const [topUsersByQuizzesDone, setTopUsersByQuizzesDone] = useState([]);
  const [weeklyPerformance, setWeeklyPerformance] = useState([]);
  const [savedQuizzes, setSavedQuizzes] = useState([]);
  const [userStats, setUserStats] = useState({
    quizzesCreated: 0,
    quizzesCompleted: 0,
    totalAttempts: 0,
    totalLikes: 0
  })
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser?.id) return;

        const res = await axios.get(`http://localhost:8017/v1/api/results/performance/weekly/${currentUser.id}`);
        setWeeklyPerformance(res.data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu hiệu suất:", err);
      }
    };
    fetchPerformance();
  }, []);

  // Data cho biểu đồ hiệu suất
const transformedChartData = {
  labels: weeklyPerformance.map((item) => item._id), // ngày
  datasets: [
    {
      label: "Điểm trung bình",
      data: weeklyPerformance.map((item) => item.avgScore),
      borderColor: '#007bff',
      backgroundColor: 'rgba(0, 123, 255, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: "Tỷ lệ hoàn thành (%)",
      data: weeklyPerformance.map((item) =>
        item.total === 0 ? 0 : Math.round((item.completed / item.total) * 100)
      ),
      borderColor: '#28a745',
      backgroundColor: 'rgba(40, 167, 69, 0.1)',
      tension: 0.4,
      fill: true,
    },
    // Nếu có duration thì mở lại:
    {
         label: "Thời gian trung bình (phút)",
         data: weeklyPerformance.map((item) => item.avgDuration ?? 0),
         borderColor: '#ffc107',
         backgroundColor: 'rgba(255, 193, 7, 0.1)',
         tension: 0.4,
         fill: true,
       },
  ],
};


  useEffect(() => {
    const fetchRankingByTotal = async () => {
      try {
        const res = await axios.get("http://localhost:8017/v1/api/results/ranking/by-total");
        setTopUsersByQuizzesDone(res.data);
      } catch (err) {
        console.error("Lỗi lấy bảng xếp hạng theo tổng số bài:", err);
      }
    };

    fetchRankingByTotal();
  }, []);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser?.id) return;

        const [statsRes, recentRes, savedRes] = await Promise.all([
          axios.get(`http://localhost:8017/v1/user-dashboard/${currentUser.id}`),
          axios.get(`http://localhost:8017/v1/api/results/recent/${currentUser.id}`),
          axios.get(`http://localhost:8017/v1/api/favorites/user/${currentUser.id}`)
        ]);
        setSavedQuizzes(savedRes.data);
        setUserStats(statsRes.data);
        setRecentQuizzes(recentRes.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu dashboard:", error);
      }
    };

    fetchDashboardData();
}, []);


  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"))
        const res = await axios.get(`http://localhost:8017/v1/user-dashboard/${currentUser.id}`);
        setUserStats(res.data);
      } catch (error) {
        console.error("Lỗi tải thống kê người dùng:", error);
      }
    }
    
    fetchUserStats();
  }, [])



  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={`${styles.mainContent} ${collapsed ? styles.expanded : ""}`}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.pageTitle}>
              {location.pathname === "/dashboard" && "Dashboard"}
            </h2>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Tìm kiếm bài quiz"
                className={styles.searchBar}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchSubmit}
              />
            </div>
          </div>
        </header>

        <div className={styles.contentArea}>
          <Outlet />

          {location.pathname === "/dashboard" && (
            <div className={styles.dashboardHome}>
              <div className={styles.statsRow}>
                <StatCard icon="ri-file-list-2-line" value={userStats.quizzesCreated} label="Bài kiểm tra đã tạo" />
                <StatCard icon="ri-checkbox-circle-line" value={userStats.quizzesCompleted} label="Bài đã hoàn thành" />
                <StatCard icon="ri-bar-chart-box-line" value={userStats.totalAttempts} label="Tổng lượt làm bài" />
                <StatCard icon="ri-thumb-up-line" value={userStats.totalLikes} label="Tổng lượt thích" />
              </div>


              <div className={styles.dashboardRow}>
                <div className={styles.recentQuizzes}>
                  <div className={styles.cardHeader}>
                    <h2>Bài kiểm tra gần đây</h2>
                  </div>
                  <div className={styles.quizList}>
                    {recentQuizzes.length > 0 ? (
                      recentQuizzes.map((quiz, index) => (
                        <div key={index} className={styles.quizItem}>
                          <div className={styles.quizInfo}>
                            <h3>{quiz.quizTitle}</h3>
                            <div className={styles.quizMeta}>
                              <span><i className="ri-question-answer-line"></i> {quiz.totalQuestions || 0} câu hỏi</span>
                              <span><i className="ri-user-line"></i> {quiz.participants || 0} người tham gia</span>
                              <span><i className="ri-star-line"></i> Điểm: {quiz.score}</span>
                              <span><i className="ri-calendar-line"></i> {new Date(quiz.submitted_at).toLocaleDateString('vi-VN')}</span>
                            </div>
                          </div>
                          <div className={styles.quizActions}>
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => navigate(`/quiz-detail/${quiz.quiz_id}`)} 
                              title="Xem chi tiết"
                            >
                              <i className="ri-eye-line"></i>
                            </Button>
                            <Button variant="light" size="sm" title="Chia sẻ">
                              <i className="ri-share-line"></i>
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={styles.noQuiz}>Bạn chưa làm bài kiểm tra nào gần đây.</p>
                    )}

                  </div>
                </div>

                <div className={styles.activityFeed}>
                  <div className={styles.cardHeader}>
                    <h2>Bảng xếp hạng người dùng tích cực</h2>
                  </div>
                  <div className={styles.activityList}>
                    {topUsersByQuizzesDone.length === 0 ? (
                      <p>Chưa có dữ liệu xếp hạng.</p>
                    ) : (
                      topUsersByQuizzesDone.map((user, index) => (
                        <div key={index} className={styles.activityItem}>
                          <div className={styles.activityIcon}>
                            <i className="ri-trophy-fill"></i>
                          </div>
                          <div className={styles.activityInfo}>
                           <p>
                              <Link to={`/profile/${user.userId}`} className={styles.usernameLink}>
                                <strong>{user.username}</strong>
                              </Link>{" "}
                              đã hoàn thành <strong>{user.totalQuizzesDone}</strong> bài quiz
                            </p>
                            <span className={styles.activityTime}>#️⃣ Hạng {index + 1}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Bản đồ hiệu suất */}
              <div className={styles.dashboardRow}>
                <div className={styles.performanceChart}>
                  <div className={styles.cardHeader}>
                    
                  </div>
                  <div className={styles.chartContainer}>
                    <Line data={transformedChartData} options={chartOptions} />
                  </div>
                </div>
                <div className={styles.savedQuizzesPanel}>
                  <div className={styles.cardHeader}>
                    <h2>Quiz đã lưu</h2>
                  </div>
                  <div className={styles.quizList}>
                    {savedQuizzes.map((quiz, index) => (
                      <div key={index} className={styles.quizItem}>
                        <div className={styles.quizInfo}>
                          <h3>{quiz.title}</h3>
                          <p>{quiz.subject}</p>
                          <span>Lưu lúc: {new Date(quiz.saved_at).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className={styles.quizActions}>
                          <Button variant="light" size="sm" onClick={() => navigate(`/quiz-detail/${quiz.quiz_id}`)}>
                            <i className="ri-eye-line"></i>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
            </div>
          )}
          </div>
        </div>
      </div>
    
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>
        <i className={icon}></i>
      </div>
      <div className={styles.statInfo}>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}