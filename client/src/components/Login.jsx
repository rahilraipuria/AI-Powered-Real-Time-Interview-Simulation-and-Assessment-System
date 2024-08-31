import React, { useState,useEffect } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
import useAuthStore from "../store/useAuthStore.js";

function Login({ show, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Expert");
  const navigate = useNavigate();
  const {user, login, isAuthenticated} = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (role === user.response.role && role === "Expert") {
        navigate("/expert-dashboard");
      } else if (role === user.response.role && role === "Admin") {
        navigate("/admin-dashboard");
      }
      handleClose();
    }
  }, [user, isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="close">
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
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
              <Form.Label>Login as</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Expert">Expert</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
