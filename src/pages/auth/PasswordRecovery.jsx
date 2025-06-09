// src/pages/auth/PasswordRecovery.jsx
import styles from "./Auth.module.css";
import PasswordInput from "../../components/PasswordInput";
import { Link } from "react-router-dom";

export default function PasswordRecovery() {
  return (
    <div className={styles.container}>
      

      <main className={styles.formWrapper}>
        <h2 className={styles.heading}>Khôi phục mật khẩu</h2>

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
            <label htmlFor="security-question">Câu hỏi bảo mật</label>
            <select id="security-question" required>
              <option value="" disabled selected>Chọn chủ đề của bạn</option>
              <option value="train">Tàu hỏa</option>
              <option value="swimming_pool">Bể bơi</option>
              <option value="apple">Quả táo</option>
              <option value="wool_hat">Mỹ len</option>
              <option value="singer">Ca sĩ</option>
              <option value="graphics_card">Card đồ họa</option>
              <option value="banh_cuon">Bánh</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Nhập mật khẩu mới</label>
            <PasswordInput />
          </div>

          <button type="submit" className={styles.submitButton}>Đặt lại mật khẩu</button>
        </form>

        <div className={styles.footerText}>
          <Link to="/sign-in">Quay lại đăng nhập</Link>
        </div>
      </main>
    </div>
  );
}