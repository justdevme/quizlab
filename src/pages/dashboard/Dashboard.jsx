import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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

// Data cho biểu đồ hiệu suất
const performanceChartData = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
  datasets: [
    {
      label: 'Điểm trung bình',
      data: [75, 82, 78, 85, 88, 92],
      borderColor: '#007bff',
      backgroundColor: 'rgba(0, 123, 255, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Tỷ lệ hoàn thành (%)',
      data: [65, 70, 75, 80, 85, 90],
      borderColor: '#28a745',
      backgroundColor: 'rgba(40, 167, 69, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Thời gian trung bình (phút)',
      data: [25, 23, 20, 18, 16, 15],
      borderColor: '#ffc107',
      backgroundColor: 'rgba(255, 193, 7, 0.1)',
      tension: 0.4,
      fill: true,
    }
  ],
};

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
      text: 'Bản đồ hiệu suất theo tháng',
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
                <StatCard icon="ri-file-list-2-line" value="300" label="Bài kiểm tra đã tạo" />
                <StatCard icon="ri-group-line" value="450" label="Người tham gia" />
                <StatCard icon="ri-checkbox-circle-line" value="250" label="Bài đã hoàn thành" />
                <StatCard icon="ri-user-follow-line" value="30" label="Trực tuyến" />
              </div>

              <div className={styles.dashboardRow}>
                <div className={styles.recentQuizzes}>
                  <div className={styles.cardHeader}>
                    <h2>Bài kiểm tra gần đây</h2>
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
                            <span><i className="ri-question-answer-line"></i> {quiz.questions} câu hỏi</span>
                            <span><i className="ri-user-line"></i> {quiz.participants} người tham gia</span>
                            <span><i className="ri-calendar-line"></i> {quiz.date}</span>
                          </div>
                        </div>
                        <div className={styles.quizActions}>
                          <Button variant="light" size="sm"><i className="ri-share-line"></i></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.activityFeed}>
                  <div className={styles.cardHeader}>
                    <h2>Hoạt động gần đây</h2>
                  </div>
                  <div className={styles.activityList}>
                    {[
                      { user: "B", action: "đã hoàn thành", quiz: "UI Design Fundamentals", time: "2 giờ trước", score: "85%" },
                      { user: "C", action: "đã hoàn thành", quiz: "React Basics Quiz", time: "3 giờ trước" },
                      { user: "D", action: "đã hoàn thành", quiz: "JavaScript Advanced Concepts", time: "5 giờ trước", score: "92%" },
                      { user: "E", action: "đã hoàn thành", quiz: "React Basics Quiz", time: "1 giờ trước", score: "36%" },
                      { user: "F", action: "đã hoàn thành", quiz: "UI Design Fundamentals", time: "1 ngày trước", score: "78%" },
                    ].map((activity, index) => (
                      <div key={index} className={styles.activityItem}>
                        <div className={styles.activityIcon}>
                          {activity.action === "đã hoàn thành" && <i className="ri-checkbox-circle-fill"></i>}
                          {activity.action === "đã bắt đầu" && <i className="ri-play-circle-fill"></i>}
                          {activity.action === "đã đánh giá" && <i className="ri-star-fill"></i>}
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

              {/* Bản đồ hiệu suất */}
              <div className={styles.dashboardRow}>
                <div className={styles.performanceChart}>
                  <div className={styles.cardHeader}>
                    <h2>Bản đồ hiệu suất</h2>
                  </div>
                  <div className={styles.chartContainer}>
                    <Line data={performanceChartData} options={chartOptions} />
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