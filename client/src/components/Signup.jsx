import React, { useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
import './Login.css';
import { registerNewUser } from '../services/api.js';
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  //const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    registerNewUser({fullName,username,email,password,role})
    setEmail('')
    setPassword('')
    setFullName('')
    setUsername('')
    setRole('')
  };

  return (
    <Modal centered show={true}>
      <Modal.Header closeButton className='close'>
        <Modal.Title>Create New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSignup}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Full Name</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Email</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Username</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Col>
          </Row>


          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Role</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="Expert">Expert</option>
                <option value="Admin">Admin</option>
                <option value="Candidate">Candidate</option>
              </Form.Control>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Signup;
