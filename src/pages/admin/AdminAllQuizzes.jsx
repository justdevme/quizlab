import React, { useEffect, useState } from "react";
import styles from "./AdminAllQuizzes.module.css"
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import SideBarAdmin from "../../components/SideBarAdmin";

export default function AdminAllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [showEditModal, setShowEditModal] = useState(false);

  // Load all quizzes
  useEffect(() => {
    axios.get("http://localhost:8017/v1/api/quizzes")
      .then(res => setQuizzes(res.data))
      .catch(err => console.error("Lỗi tải quiz:", err));
  }, []);

  const handleEditClick = (quiz) => {
    setSelectedQuiz(quiz);
    setEditData({ title: quiz.title, description: quiz.description });
    setShowEditModal(true);
  };

  const handleDelete = async (quizId) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá quiz này?")) return;
    await axios.delete(`http://localhost:8017/v1/api/quizzes/${quizId}`);
    setQuizzes(prev => prev.filter(q => q._id !== quizId));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8017/v1/api/quizzes/${selectedQuiz._id}`, editData);
    setQuizzes(prev =>
      prev.map(q => q._id === selectedQuiz._id ? { ...q, ...editData } : q)
    );
    setShowEditModal(false);
  };

  return (
    <div className={styles.adminWrapper}>
      <div className={styles.sidebar}>
        <SideBarAdmin />
      </div>

      <div className={styles.mainContent}>
        <h2 className={styles.pageTitle}>Tất cả bài quiz</h2>
        <Table striped bordered hover responsive className={styles.quizTable}>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>STT</th>
              <th style={{ width: "180px" }}>Tiêu đề</th>
              <th style={{ width: "40%" }}>Mô tả</th>
              <th style={{ width: "120px" }}>Môn học</th>
              <th style={{ width: "150px" }}>Người tạo</th>
              <th style={{ width: "150px", textAlign: "center" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr key={quiz._id}>
                <td>{index + 1}</td>
                <td>{quiz.title}</td>
                <td>{quiz.description}</td>
                <td>{quiz.subject || "-"}</td>
                <td>{quiz.creatorName || quiz.creator_id}</td>
                <td className={styles.actionCol}>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditClick(quiz)}
                  >
                    ✏️
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(quiz._id)}
                  >
                    🗑️
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(`/quiz-detail/${quiz._id}`, "_blank")}
                  >
                    👁️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal sửa quiz */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sửa quiz</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveEdit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={editData.description}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Lưu
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}