import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Tạo quiz", href: "/create" },
  { name: "Làm quiz", href: "/take-quiz" },
  { name: "Kết quả", href: "/result" },
  { name: "Chấm điểm", href: "/grade" },
  { name: "Trợ lý AI", href: "/ai-assistant" },
  {name:"Đăng nhập", href:"/sign-in"},
  {name: "Đăng ký", href:"/sign-up"},
  {name:"Landing", href:"/homepage"}
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
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
