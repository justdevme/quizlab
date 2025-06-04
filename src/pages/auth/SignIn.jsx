// src/pages/auth/SignIn.jsx
import styles from "./Auth.module.css";
import PasswordInput from "../../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <main className={styles.formWrapper}>
        <h2 className={styles.heading}>Đăng nhập</h2>
        <p className={styles.subheading}>Đăng nhập để tiếp tục quiz</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Tên người dùng</label>
            <input type="text" id="username" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <PasswordInput />
          </div>

          <div className={styles.checkboxRow}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Ghi nhớ mật khẩu</label>
          </div>

          <button
            type="button"
            className={styles.submitButton}
            onClick={() => navigate("/dashboard")}
          >
            Đăng nhập
          </button>
        </form>

        <div className={styles.footerText}>
          <span>Chưa có tài khoản?</span>
          <Link to="/sign-up">Đăng ký</Link>
        </div>

        <div className={styles.footerText}>
          <Link to="/password-recovery">Quên mật khẩu?</Link>
        </div>
      </main>
    </div>
  );
}
