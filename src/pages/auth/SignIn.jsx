// src/pages/auth/SignIn.jsx
import styles from "./Auth.module.css";
import PasswordInput from "../../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:8017/v1/api/auth/login", {
      email,
      password
    });

    const { userId, name, role } = res.data;

    //Lưu user vào localStorage
    const userData = {
      id: userId,
      username: name,
      role: role
    };
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(userData.role)
    //Điều hướng theo role
    if (userData.username === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  } catch (error) {
    alert(error.response?.data?.message || "Lỗi đăng nhập");
  }
};


  return (
    <div className={styles.container}>
      <main className={styles.formWrapper}>
        <h2 className={styles.heading}>Đăng nhập</h2>
        <p className={styles.subheading}>Đăng nhập để tiếp tục quiz</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className={styles.checkboxRow}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Ghi nhớ mật khẩu</label>
          </div>

          <button
            type="button"
            className={styles.submitButton}
            onClick={handleLogin}
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
