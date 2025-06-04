import React, { useState } from "react";
import styles from "./UserProfilePage.module.css";
import ava from "../../assets/ava.png";

export default function UserProfilePage() {
  const [username, setUsername] = useState("jason");
  const [dob, setDob] = useState("2004-11-30");
  const [password, setPassword] = useState("123");

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Call API here
    alert("Đã lưu thông tin!");
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          <img src={ava} alt="avatar" className={styles.avatar} />
        </div>
        <h2 className={styles.title}>Thông tin người dùng</h2>

        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tên người dùng</label>
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ngày sinh</label>
            <input
              type="date"
              className={styles.input}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mật khẩu</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
}
