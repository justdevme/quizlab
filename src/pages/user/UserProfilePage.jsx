// src/pages/user/UserProfilePage.jsx
import React, { useState } from "react";
import styles from "./UserProfilePage.module.css";

export default function UserProfilePage() {
  const [username, setUsername] = useState("jason");
  const [dob, setDob] = useState("2004-11-30");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>Thông tin người dùng</h2>

      <div className={styles.formGroup}>
        <label>Username</label>
        <input
          type="text"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Date of Birth</label>
        <input
          type="date"
          className={styles.input}
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Password</label>
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className={styles.saveBtn}>Lưu thay đổi</button>
    </div>
  );
}
