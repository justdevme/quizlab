import { useState } from "react";
import styles from "../pages/auth/Auth.module.css";
import closeEye from "../assets/close-eye.png";
import openEye from "../assets/open-eye.png";

export default function PasswordInput({ id = "password", ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles["password-container"]}>
      <input
        type={show ? "text" : "password"}
        id={id}
        {...props}
      />
      <button
        type="button"
        className={styles["toggle-password"]}
        onClick={() => setShow((prev) => !prev)}
      >
        <img
          src={show ? openEye : closeEye}
          alt="toggle password"
          className={show ? styles["openeye-icon"] : styles["closeeye-icon"]}
        />
      </button>
    </div>
  );
}
