// src/pages/landing/LandingPage.jsx
import styles from "./LandingPage.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import landingImage from "../../assets/landing-homepage-pic.png"; 

export default function LandingPage() {
  return (
    <div className={styles.wrapper}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.content}>
          <h1>
            Learn new concepts <br /> for each question
          </h1>
          <p>We help you prepare for exams and quizzes</p>
          <div className={styles.buttons}>
            <button className={styles.cta}>Start solving</button>
            <a href="#" className={styles.link}>know more</a>
          </div>
        </div>

        
        <div className={styles.imageWrapper}>
          <img src={landingImage} alt="QuizLab Visual" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
