// src/pages/auth/SignIn.jsx
import styles from "./Auth.module.css";
import PasswordInput from "../../components/PasswordInput";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>QuizLab</h1>
        <div className={styles.logo}></div>
      </header>

      <main className={styles.formWrapper}>
        <h2 className={styles.heading}>Sign in</h2>
        <p className={styles.subheading}>Please login to continue to your account.</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <PasswordInput />
          </div>

          <div className={styles.checkboxRow}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Keep me logged in</label>
          </div>

          <button type="submit" className={styles.submitButton}>Sign in</button>
        </form>

        <div className={styles.footerText}>
          <span>Need an account?</span>
          <Link to="/sign-up">Create one</Link>
        </div>

        <div className={styles.footerText}>
          <Link to="/password-recovery">Forgot your password?</Link>
        </div>
      </main>
    </div>
  );
}