import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap"; 
import styles from "./Dashboard.module.css";
import axios from'axios'


export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === `/dashboard${path}` ? styles.active : "";
  };

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:8017/v1/api/quizzes')
    .then(res => setQuizzes(res.data))
    .catch(err => console.error(err));
  }, []);


  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="QuizLab" className={styles.logoImage} />
            {!collapsed && <span className={styles.logoText}>QuizLab</span>}
          </div>
          
        </div>

        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${isActive("")}`}>
              <Link to="/dashboard" className={styles.navLink}>
                <i className="bi bi-house-door"></i>
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li className={`${styles.navItem} ${isActive("/search")}`}>
              <Link to="/search" className={styles.navLink}>
                <i className="bi bi-search"></i>
                {!collapsed && <span>Tìm kiếm quiz</span>}
              </Link>
            </li>
            <li className={`${styles.navItem} ${isActive("/create")}`}>
              <Link to="/create" className={styles.navLink}>
                <i className="bi bi-pencil-square"></i>
                {!collapsed && <span>Tạo quiz</span>}
              </Link>
            </li>
            <li className={`${styles.navItem} ${isActive("/take")}`}>
              <Link to="/take-quiz" className={styles.navLink}>
                <i className="bi bi-file-earmark-text"></i>
                {!collapsed && <span>Làm quiz</span>}
              </Link>
            </li>
            <li className={`${styles.navItem} ${isActive("/result")}`}>
              <Link to="/result" className={styles.navLink}>
                <i className="bi bi-bar-chart"></i>
                {!collapsed && <span>Kết quả</span>}
              </Link>
            </li>
            <li className={`${styles.navItem} ${isActive("/grade")}`}>
              <Link to="/grade" className={styles.navLink}>
                <i className="bi bi-check-circle"></i>
                {!collapsed && <span>Chấm điểm</span>}
              </Link>
            </li>
            <li className={`${styles.navItem} ${isActive("/ai-assistant")}`}>
              <Link to="/ai-assistant" className={styles.navLink}>
                <i className="bi bi-robot"></i>
                {!collapsed && <span>Trợ lý AI</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            {!collapsed && (
              <>
                <div className={styles.userAvatar}>
                  <img src="/user-logo.png" alt="User" />
                </div>
                <div className={styles.userName}>
                  <span>Nguyễn Văn A</span>
                  
                </div>
              </>
            )}
            <button className={styles.logoutBtn}>
              <i className="bi bi-box-arrow-right"></i>
              
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${styles.mainContent} ${collapsed ? styles.expanded : ""}`}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.pageTitle}>
              {location.pathname === "/dashboard" && "Dashboard"}
              {location.pathname === "/dashboard/search" && "Tìm kiếm bài kiểm tra"}
              {location.pathname === "/dashboard/create" && "Tạo bài kiểm tra"}
              {location.pathname === "/dashboard/take" && "Làm bài kiểm tra"}
              {location.pathname === "/dashboard/result" && "Kết quả"}
              {location.pathname === "/dashboard/grade" && "Chấm điểm"}
              {location.pathname === "/dashboard/ai-assistant" && "Trợ lý AI"}
            </h2>
          </div>
          <div className={styles.headerRight}>
            
          </div>
        </header>

        {/* Content Area */}
        <div className={styles.contentArea}>
          <Outlet />
          
          {/* Default Dashboard Content (shown only on /dashboard route) */}
          {location.pathname === "/dashboard" && (
            <div className={styles.dashboardHome}>
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <i className="bi bi-file-earmark-text"></i>
                  </div>
                  <div className={styles.statInfo}>
                    <h3>300</h3>
                    <p>Bài kiểm tra đã tạo</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <i className="bi bi-people"></i>
                  </div>
                  <div className={styles.statInfo}>
                    <h3>450</h3>
                    <p>Người tham gia</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div className={styles.statInfo}>
                    <h3>250</h3>
                    <p>Bài đã hoàn thành</p>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <i className="bi bi-people"></i>
                  </div>
                  <div className={styles.statInfo}>
                    <h3>30</h3>
                    <p>Trực tuyến</p>
                  </div>
                </div>
              </div>

              <div className={styles.dashboardRow}>
                <div className={styles.recentQuizzes}>
                  <div className={styles.cardHeader}>
                    <h2>Bài kiểm tra gần đây</h2>
                    <Button variant="outline-primary" size="sm">Xem tất cả</Button>
                  </div>
                  <div className={styles.quizList}>
                  {quizzes.map((quiz, index) => (
                      <div
                      key={index}
                      className={styles.quizItem}
                      onClick={() => navigate(`/quiz/${quiz._id}`)}
                      style={{ cursor: 'pointer' }}
                      >
                      <div className={styles.quizInfo}>
                        <h3>{quiz.title}</h3>
                        <div className={styles.quizMeta}>
                          <span><i className="bi bi-question-circle"></i> {quiz.questions} câu hỏi</span>
                          <span><i className="bi bi-people"></i> {quiz.participants} người tham gia</span>
                          <span><i className="bi bi-calendar3"></i> {quiz.date}</span>
                        </div>
                      </div>
                      <div className={styles.quizActions}>
                        <Button variant="light" size="sm"><i className="bi bi-pencil"></i></Button>
                        <Button variant="light" size="sm"><i className="bi bi-share"></i></Button>
                        <Button variant="light" size="sm"><i className="bi bi-three-dots"></i></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

                <div className={styles.activityFeed}>
                  <div className={styles.cardHeader}>
                    <h2>Hoạt động gần đây</h2>
                    <Button variant="outline-primary" size="sm">Xem tất cả</Button>
                  </div>

                  <div className={styles.activityList}>
                    {[
                      { user: "B", action: "đã hoàn thành", quiz: "UI Design Fundamentals", time: "2 giờ trước", score: "85%" },
                      { user: "C", action: "đã bắt đầu", quiz: "React Basics Quiz", time: "3 giờ trước" },
                      { user: "D", action: "đã hoàn thành", quiz: "JavaScript Advanced Concepts", time: "5 giờ trước", score: "92%" },
                      { user: "E", action: "đã hoàn thành", quiz: "React Basics Quiz", time: "1 giờ trước", score: "36%" },
                      { user: "F", action: "đã hoàn thành", quiz: "UI Design Fundamentals", time: "1 ngày trước", score: "78%" },
                    ].map((activity, index) => (
                      <div key={index} className={styles.activityItem}>
                        <div className={styles.activityIcon}>
                          {activity.action === "đã hoàn thành" && <i className="bi bi-check-circle-fill"></i>}
                          {activity.action === "đã bắt đầu" && <i className="bi bi-play-circle-fill"></i>}
                          {activity.action === "đã đánh giá" && <i className="bi bi-star-fill"></i>}
                        </div>
                        <div className={styles.activityInfo}>
                          <p>
                            <strong>{activity.user}</strong> {activity.action} bài kiểm tra <strong>{activity.quiz}</strong>
                            {activity.score && <span className={styles.score}> - Điểm: {activity.score}</span>}
                            {activity.rating && <span className={styles.rating}> - Đánh giá: {activity.rating}</span>}
                          </p>
                          <span className={styles.activityTime}>{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.dashboardRow}>
                <div className={styles.performanceChart}>
                  <div className={styles.cardHeader}>
                    <h2>Phân tích hiệu suất</h2>
                  </div>
                  <div className={styles.chartPlaceholder}>
                    <p>Biểu đồ phân tích hiệu suất được hiển thị ở đây (sử dụng thư viện Chart.js hoặc Recharts sau này) </p>
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