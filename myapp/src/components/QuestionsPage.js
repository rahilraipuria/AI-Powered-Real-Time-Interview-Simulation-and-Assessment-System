import React, { useState } from 'react';
import { Container, Form, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './QuestionsPage.css';

function QuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items] = useState([
    { id: 1, interviewer: 'Alice Smith', interviewerEmail: 'alice@example.com', candidate: 'Bob Brown', candidateEmail: 'bob@example.com' },
    { id: 2, interviewer: 'Charlie Johnson', interviewerEmail: 'charlie@example.com', candidate: 'Diana Evans', candidateEmail: 'diana@example.com' },
    { id: 3, interviewer: 'Edward Lee', interviewerEmail: 'edward@example.com', candidate: 'Fiona Clark', candidateEmail: 'fiona@example.com' },
    { id: 4, interviewer: 'Grace Martin', interviewerEmail: 'grace@example.com', candidate: 'Henry Allen', candidateEmail: 'henry@example.com' },
    { id: 5, interviewer: 'Ivy Harris', interviewerEmail: 'ivy@example.com', candidate: 'Jackie Wilson', candidateEmail: 'jackie@example.com' },
  ]);
  
  const navigate = useNavigate();

  const filteredItems = items.filter(
    item =>
      item.interviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.candidate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (item) => {
    navigate('/interview-details', { state: { interview: item } });
  };

  return (
    <Container className="my-5">
      <h1>Interview Questions</h1>
      <Form.Control
        type="text"
        placeholder="Search for Interviewer or Candidate"
        className="mb-4"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ListGroup>
        {filteredItems.map(item => (
          <ListGroup.Item key={item.id}>
            <div className="d-flex align-items-center">
              <span className="flex-fill">
                <strong>Interviewer:</strong> {item.interviewer}
              </span>
              <span className="flex-fill">
                <strong>Candidate:</strong> {item.candidate}
              </span>
              <div className="button-container">
                <Button variant="primary" onClick={() => handleViewClick(item)}>View</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default QuestionsPage;
