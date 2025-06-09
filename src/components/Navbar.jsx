// src/components/Navbar.jsx
import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";

export default function Navbar({ showLogin = true }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <img src={logo} alt="QuizLab logo" className={styles.logo} />
        <span className={styles.brand}>QuizLab</span>
      </div>

      <ul className={styles.menu}>
        <li><a href="#">How it works?</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">About us</a></li>
      </ul>

      {showLogin && (
        <div className={styles.right}>
          <button className={styles.login}>Sign in</button>
        </div>
      )}
    </nav>
  );
}
