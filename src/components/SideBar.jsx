import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: "ri-dashboard-line" },
  { name: "Tạo quiz", href: "/create", icon: "ri-edit-box-line" },
  { name: "Làm quiz", href: "/take-quiz", icon: "ri-file-list-3-line" },
  { name: "Kết quả", href: "/result", icon: "ri-bar-chart-2-line" },
  { name: "Chấm điểm", href: "/grade", icon: "ri-checkbox-circle-line" },
  { name: "Trợ lý AI", href: "/ai-assistant", icon: "ri-robot-2-line" },
  { name: "Đăng nhập", href: "/sign-in", icon: "ri-login-box-line" },
  { name: "Đăng ký", href: "/sign-up", icon: "ri-user-add-line" },
  { name: "Landing", href: "/homepage", icon: "ri-home-3-line" },
];

function SideBar() {
  return (
    <div className={`d-flex flex-column p-3 ${styles.sidebar}`}>
      <h4 className="text-center mb-4">QuizLab</h4>

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

      
      <li className="nav-item mt-4 text-center">
        <NavLink to="/user/profile" className={styles.profileLink}>
          <img src="/avatars/1.png" alt="avatar" className={styles.sidebarAvatar} />
          <div className={styles.userName}>User</div>
        </NavLink>
      </li>
    </div>
  );
}

export default SideBar;
