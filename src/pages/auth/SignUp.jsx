// src/pages/auth/SignUp.jsx
import styles from "./Auth.module.css";
import PasswordInput from "../../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    password: "",
    email: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:8017/v1/api/auth/register", formData)
      alert("Đăng ký thành công! Hãy đăng nhập.")
      navigate("/sign-in");
    } catch (err){
      alert(err.response?.data?.message || "Lỗi đăng ký");
    }
  }

  return (
    <div className={styles.container}>
      

      <main className={styles.formWrapper}>
        <h2 className={styles.heading}>Đăng nhập</h2>
        <p className={styles.subheading}>Thử thách cùng Quizlab</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Tên người dùng</label>
            <input type="text" id="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="dob">Ngày sinh</label>
            <input type="text" id="dob" placeholder="dd/mm/yyyy" value={formData.dob} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Mật Khẩu</label>
            <PasswordInput value={formData.password} onChange={ (e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" className={styles.submitButton} >Đăng ký</button>
        </form>

        <div className={styles.footerText}>
          <span>Đã có tài khoản</span>
          <Link to="/sign-in">Đăng nhập</Link>
        </div>
      </main>
    </div>
  );
}