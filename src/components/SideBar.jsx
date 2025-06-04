import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import userLogo from "../assets/ava.png";
import logo from "../assets/logo.png";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: "ri-dashboard-line" },
  { name: "Tạo quiz", href: "/create", icon: "ri-edit-box-line" },
  { name: "Admin", href: "/admin", icon: "ri-settings-3-line" },
  { name: "Giới thiệu", href: "/homepage", icon: "ri-home-3-line" },
  { name: "Đăng xuất", href: "/sign-in", icon: "ri-login-box-line" },
];

function SideBar() {
  return (
    <div className={`d-flex flex-column p-3 ${styles.sidebar}`}>
      <div className={styles.sidebarHeader}>
        <img src={logo} alt="QuizLab Logo" className={styles.logo} />
        <h4 className={styles.brandName}>QuizLab</h4>
      </div>

      <ul className="nav nav-pills flex-column">
        {sidebarLinks.map((link) => (
          <li className="nav-item mb-2" key={link.href}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              <i className={`${link.icon} me-2`}></i>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User Profile Section - Cải thiện */}
      <div className={styles.userProfileSection}>
        <NavLink to="/user/profile" className={styles.userProfileLink}>
          <div className={styles.userProfileCard}>
            <div className={styles.avatarContainer}>
              <img src={userLogo} alt="User Avatar" className={styles.userAvatar} />
              <div className={styles.onlineIndicator}></div>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>John</div>
              <div className={styles.userRole}>User</div>
            </div>
            <i className={`ri-arrow-right-s-line ${styles.profileArrow}`}></i>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;