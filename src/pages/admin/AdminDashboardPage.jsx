import React, { useState } from 'react';
import styles from './AdminDashboardPage.module.css';
import { Container, Row, Col, Table, Form, Modal, Button } from 'react-bootstrap';

// Mock data cho người dùng
const initialUsers = [
  { id: 1, username: 'user_alpha', password: 'password123', role: 'User' },
  { id: 2, username: 'user_beta', password: 'password456', role: 'User' },
];

export default function AdminDashboardPage() {
  const [users, setUsers] = useState(initialUsers);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingUser, setEditingUser] = useState({ username: '', password: '' });

  // Handlers cho User Modal
  const handleShowUserModal = (user) => {
    setCurrentUser(user);
    setEditingUser({ username: user.username, password: user.password });
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => setShowUserModal(false);

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = (event) => {
    event.preventDefault();
    if (currentUser) {
      setUsers(users.map(u => 
        u.id === currentUser.id 
          ? { ...u, username: editingUser.username, password: editingUser.password } 
          : u
      ));
    }
    handleCloseUserModal();
  };

  return (
    <Container fluid className={styles.adminDashboardContainer}>
      <Row className={styles.fullHeightRow}>
        <Col xs={12} className={styles.mainContent}>
          <header className={styles.pageHeader}>
            <h1>Quản Lý Người Dùng</h1>
          </header>
          
          <div className={styles.userManagementSection}>
            <Table striped bordered hover responsive className={styles.dataTable}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Username</th>
                  <th>Vai trò</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>
                      <span className="badge bg-primary">{user.role}</span>
                    </td>
                    <td>
                      <Button 
                        variant="warning" 
                        size="sm" 
                        onClick={() => handleShowUserModal(user)}
                        className={styles.editButton}
                      >
                        <i className="ri-edit-line me-1"></i>
                        Sửa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* User Edit Modal */}
      <Modal show={showUserModal} onHide={handleCloseUserModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveUser}>
            <Form.Group className="mb-3" controlId="editUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                name="username" 
                value={editingUser.username} 
                onChange={handleEditUserChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editPassword">
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
              <Button variant="secondary" onClick={handleCloseUserModal} className="me-2">
                Hủy
              </Button>
              <Button variant="primary" type="submit" className={styles.saveButton}>
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}