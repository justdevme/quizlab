import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
                <StatCard icon="file-earmark-text" value="300" label="Bài kiểm tra đã tạo" />
                <StatCard icon="people" value="450" label="Người tham gia" />
                <StatCard icon="check-circle" value="250" label="Bài đã hoàn thành" />
                <StatCard icon="people" value="30" label="Trực tuyến" />
              </div>

              <div className={styles.dashboardRow}>
                <div className={styles.recentQuizzes}>
                  <div className={styles.cardHeader}>
                    <h2>Bài kiểm tra gần đây</h2>
                    <Button variant="outline-primary" size="sm">Xem tất cả</Button>
                  </div>
                  <div className={styles.quizList}>
                    {[
                      { title: "UI Design Fundamentals", questions: 15, participants: 32, date: "23/04/2023" },
                      { title: "React Basics Quiz", questions: 20, participants: 45, date: "18/04/2023" },
                      { title: "JavaScript Advanced Concepts", questions: 25, participants: 28, date: "12/04/2023" },
                      { title: "UX Research Methods", questions: 10, participants: 15, date: "05/04/2023" },
                    ].map((quiz, index) => (
                      <div key={index} className={styles.quizItem}>
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
                    <p>Biểu đồ phân tích hiệu suất được hiển thị ở đây (sử dụng Chart.js hoặc Recharts sau này)</p>
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
        <i className={`bi bi-${icon}`}></i>
      </div>
      <div className={styles.statInfo}>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}
