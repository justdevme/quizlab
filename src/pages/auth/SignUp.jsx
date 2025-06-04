// src/pages/auth/SignUp.jsx
import styles from "./Auth.module.css";
import PasswordInput from "../../components/PasswordInput";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className={styles.container}>
      

      <main className={styles.formWrapper}>
        <h2 className={styles.heading}>Đăng nhập</h2>
        <p className={styles.subheading}>Thử thách cùng Quizlab</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Tên người dùng</label>
            <input type="text" id="username" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="dob">Ngày sinh</label>
            <input type="text" id="dob" placeholder="dd/mm/yyyy" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <PasswordInput />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="security-question">Câu hỏi bảo mật (nhằm khôi phục mật khẩu)</label>
            <select id="security-question" required>
              <option value="" disabled selected>Chọn chủ đề</option>
              <option value="train">Tàu hỏa</option>
              <option value="swimming_pool">Bể bơi</option>
              <option value="apple">Quả táo</option>
              <option value="wool_hat">Mũ len</option>
              <option value="singer">Ca sĩ</option>
              <option value="graphics_card">Card đồ họa</option>
              <option value="banh_cuon">Bánh cuốn</option>
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>Đăng ký</button>
        </form>

        <div className={styles.footerText}>
          <span>Đã có tài khoản</span>
          <Link to="/sign-in">Đăng nhập</Link>
        </div>
      </main>
    </div>
  );
}