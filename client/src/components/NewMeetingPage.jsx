import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NewMeetingPage.css';

function NewMeetingPage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Meeting details:', { name, date, time, email });
    navigate('/admin-dashboard');
  };

  const handleCancel = () => {
    navigate('/admin-dashboard');
  };

  return (
    <Container className="new-meeting-container">
      <h2 className="text-center mb-4">Schedule New Meeting</h2>
      <Form onSubmit={handleSubmit} className="new-meeting-form">
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meeting name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTime" className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <div className="form-buttons">
          <Button variant="primary" type="submit" className="me-2">Schedule</Button>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </div>
      </Form>
    </Container>
  );
}

export default NewMeetingPage;
