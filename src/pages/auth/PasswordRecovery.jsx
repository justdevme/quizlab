// src/pages/auth/PasswordRecovery.jsx
import styles from "./Auth.module.css";
import PasswordInput from "../../components/PasswordInput";
import { Link } from "react-router-dom";

export default function PasswordRecovery() {
  return (
    <div className={styles.container}>
      

      <main className={styles.formWrapper}>
        <h2 className={styles.heading}>Password Recovery</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="dob">Date of Birth</label>
            <input type="text" id="dob" placeholder="dd/mm/yyyy" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="security-question">Security Question</label>
            <select id="security-question" required>
              <option value="" disabled selected>Select a topic</option>
              <option value="train">Train</option>
              <option value="swimming_pool">Swimming Pool</option>
              <option value="apple">Apple</option>
              <option value="wool_hat">Wool Hat</option>
              <option value="singer">Singer</option>
              <option value="graphics_card">Graphics Card</option>
              <option value="banh_cuon">Cake</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">New Password</label>
            <PasswordInput />
          </div>

          <button type="submit" className={styles.submitButton}>Reset Password</button>
        </form>

        <div className={styles.footerText}>
          <Link to="/sign-in">Back to Sign in</Link>
        </div>
      </main>
    </div>
  );
}