import React, { useState, useEffect } from "react";
import styles from "./UserProfilePage.module.css";
import ava from "../../assets/ava.png";
import axios from "axios";

export default function UserProfilePage() {
  const [username, setUsername] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(ava);
  const [password, setPassword] = useState("");

  // 🧩 Lấy user từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(`http://localhost:8017/v1/api/users/profile/${userId}`);
        const data = res.data;

        setUsername(data.username || "");

        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.username)}&background=random`;
        setAvatarPreview(avatarUrl);
      } catch (err) {
        console.error("Không thể tải thông tin người dùng:", err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Không xác định được người dùng.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8017/v1/api/users/update-profile",
        {
          userId,
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Đã lưu thông tin!");
      setPassword(""); // Xóa mật khẩu khỏi input sau khi lưu
    } catch (error) {
      alert("Cập nhật thất bại");
      console.error(error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          <img src={avatarPreview} alt="avatar" className={styles.avatar} />
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
            <label className={styles.label}>Mật khẩu</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Để trống nếu không đổi"
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
