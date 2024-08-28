import React, { useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Signup({ show, handleClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Role:', role);

    // Redirect based on the selected role
    if (role === 'Expert') {
      navigate('/expert-dashboard');
    } else if (role === 'Admin') {
      navigate('/admin-dashboard');
    } else {
      console.log('Please select a valid role');
    }

    handleClose(); // Close the modal after signup
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className='close'>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSignup}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Email address</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Form.Label>Confirm Password</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              </Form.Control>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Signup;
