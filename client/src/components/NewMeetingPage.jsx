import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NewMeetingPage.css';
import { newMeeting } from '../services/api.js';
function NewMeetingPage() {
  const [candidateName, setCandidateName] = useState('');
  const [expertName, setExpertName] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const dateAndTime=date+"T"+time+":00Z"
    //console.log('Meeting details:', { candidateName, expertName, role, dateAndTime });
    const response= await newMeeting({ candidateName, expertName, role, dateAndTime })
    console.log(response.data)
    navigate('/admin-dashboard');
  };

  const handleCancel = () => {
    navigate('/admin-dashboard');
  };

  return (
    <Container className="new-meeting-container">
      <h2 className="text-center mb-4">Schedule New Meeting</h2>
      <Form onSubmit={handleSubmit} className="new-meeting-form">
        <Form.Group controlId="formCandidateName" className="mb-3">
          <Form.Label>Candidate Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter candidate name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formExpertName" className="mb-3">
          <Form.Label>Expert Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter expert name"
            value={expertName}
            onChange={(e) => setExpertName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formRole" className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter candidate's role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
        <div className="form-buttons">
          <Button variant="primary" type="submit" className="me-2">Schedule</Button>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </div>
      </Form>
    </Container>
  );
}

export default NewMeetingPage;
