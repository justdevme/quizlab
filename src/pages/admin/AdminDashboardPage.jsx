import React, { useEffect, useState } from "react";
import styles from "./AdminDashboardPage.module.css";
import { Card, Row, Col, Button, Table, Form, Modal, Container } from "react-bootstrap";
import axios from "axios";
import SideBarAdmin from "../../components/SideBarAdmin";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    totalAttempts: 0
  });

  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingUser, setEditingUser] = useState({ username: '', password: '' });

  useEffect(() => {
    // Gọi API thống kê
    axios.get("http://localhost:8017/v1/api/users/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Lỗi thống kê:", err));

    // Gọi API lấy danh sách người dùng
    axios.get("http://localhost:8017/v1/api/users/admin/users?role=admin")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Lỗi danh sách user:", err));
  }, []);

  // Modal edit user
  const handleShowUserModal = (user) => {
    setCurrentUser(user);
    setEditingUser({ username: user.username, password: user.password || '' });
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => setShowUserModal(false);

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (currentUser) {
      setUsers(users.map(u =>
        u._id === currentUser._id
          ? { ...u, username: editingUser.username, password: editingUser.password }
          : u
      ));
    }
    handleCloseUserModal();
  };
  const handleDeleteUser = async (userId) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xoá người dùng này?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8017/v1/api/users/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      console.error("Lỗi xoá user:", err);
      alert("Xoá không thành công!");
    }
  };


  return (
    <div className={styles.adminWrapper}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <SideBarAdmin />
      </div>

      {/* Content */}
      <div className={styles.mainContent}>
        <Container fluid>
          <h1 className={styles.pageTitle}>Trang tổng quan quản trị</h1>

          {/* Thống kê */}
          <Row className="mb-4">
            <Col md={4}>
              <Card className={styles.statCard}>
                <Card.Body>
                  <h5>Tổng số người dùng</h5>
                  <h2>{stats.totalUsers}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={styles.statCard}>
                <Card.Body>
                  <h5>Tổng số bài quiz</h5>
                  <h2>{stats.totalQuizzes}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={styles.statCard}>
                <Card.Body>
                  <h5>Tổng lượt làm bài</h5>
                  <h2>{stats.totalAttempts}</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Bảng người dùng */}
          <h3>Quản lý người dùng</h3>
          <Table striped bordered hover responsive className={styles.dataTable}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Email</th>
                <th>Username</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td><span className="badge bg-primary">{user.role}</span></td>
                  <td className={styles.actionCol}>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleShowUserModal(user)}
                    >
                      Sửa
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Xóa
                    </Button>
                  </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>

      {/* Modal sửa user */}
      <Modal show={showUserModal} onHide={handleCloseUserModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveUser}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editingUser.username}
                onChange={handleEditUserChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={editingUser.password}
                onChange={handleEditUserChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseUserModal} className="me-2">Hủy</Button>
              <Button variant="primary" type="submit">Lưu thay đổi</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
