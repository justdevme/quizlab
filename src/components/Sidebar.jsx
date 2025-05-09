import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar({ collapsed}) {
  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="QuizLab" className={styles.logoImage} />
          {!collapsed && <span className={styles.logoText}>QuizLab</span>}
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/dashboard" className={styles.navLink}>
              <i className="bi bi-house-door"></i>
              {!collapsed && <span>Trang chủ</span>}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/search" className={styles.navLink}>
              <i className="bi bi-search"></i>
              {!collapsed && <span>Tìm kiếm quiz</span>}
            </Link>
          </li>
          <li className={`${styles.navItem} ${styles.active}`}>
            <Link to="/create" className={styles.navLink}>
              <i className="bi bi-pencil-square"></i>
              {!collapsed && <span>Tạo quiz</span>}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/take-quiz" className={styles.navLink}>
              <i className="bi bi-file-earmark-text"></i>
              {!collapsed && <span>Làm quiz</span>}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/result" className={styles.navLink}>
              <i className="bi bi-bar-chart"></i>
              {!collapsed && <span>Kết quả</span>}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/grade" className={styles.navLink}>
              <i className="bi bi-check-circle"></i>
              {!collapsed && <span>Chấm điểm</span>}
            </Link>
          </li>
          <li className={styles.navItem}>
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
                <img src="/assets/user-logo.png" alt="User" />
              </div>
              <div className={styles.userName}>
                <span>Nguyễn Văn A</span>
              </div>
            </>
          )}
          <button className={styles.logoutBtn}>
            <i className="bi bi-box-arrow-right"></i>
            {!collapsed && <span></span>}
          </button>
        </div>
      </div>
    </div>
  );
}
