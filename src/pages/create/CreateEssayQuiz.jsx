import React, { useState } from "react";
import styles from "./CreateEssayQuiz.module.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreateEssayQuiz() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API here
    navigate("/create"); // quay về danh sách
  };

  return (
    <div className={styles.container}>
      <h2>Tạo đề tự luận</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label><i className="ri-book-line"></i> Tên đề thi</Form.Label>
          <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><i className="ri-question-answer-line"></i> Đề bài</Form.Label>
          <Form.Control as="textarea" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label><i className="ri-edit-box-line"></i> Bài làm mẫu (tùy chọn)</Form.Label>
          <Form.Control as="textarea" rows={6} value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </Form.Group>

        <Button variant="warning" type="submit">
          <i className="ri-upload-line"></i> Tạo đề
        </Button>
      </Form>
    </div>
  );
}
