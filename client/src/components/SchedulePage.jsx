// src/components/SchedulePage.js
import React, { useState } from 'react';
import { Container, Navbar, Nav, Table, Button, Modal, Form } from 'react-bootstrap';
import './SchedulePage.css';

function SchedulePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [activeSection, setActiveSection] = useState('scheduled');
  const [interviews, setInterviews] = useState([
    { id: '1', date: '2024-08-30', time: '10:00 AM' },
    { id: '2', date: '2024-08-31', time: '11:00 AM' },
    { id: '3', date: '2024-09-01', time: '01:00 PM' },
    { id: '4', date: '2024-09-02', time: '03:00 PM' },
  ]);

  const [pendingInterviews, setPendingInterviews] = useState([
    { id: '5', date: '2024-09-03', time: '10:00 AM' },
    { id: '6', date: '2024-09-04', time: '11:00 AM' },
    { id: '7', date: '2024-09-05', time: '01:00 PM' },
    { id: '8', date: '2024-09-06', time: '03:00 PM' },
    { id: '9', date: '2024-09-07', time: '09:00 AM' },
  ]);

  const [completedInterviews, setCompletedInterviews] = useState([]);

  const handleRescheduleClick = (interview) => {
    setSelectedInterview(interview);
    setNewDate(interview.date);
    setNewTime(interview.time);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    const updatedInterviews = interviews.map((interview) =>
      interview.id === selectedInterview.id
        ? { ...interview, date: newDate, time: newTime }
        : interview
    );
    setInterviews(updatedInterviews);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updatedInterviews = interviews.filter(interview => interview.id !== id);
    setInterviews(updatedInterviews);
  };

  const handleEvaluate = (id) => {
    const interviewToEvaluate = pendingInterviews.find(interview => interview.id === id);
    setPendingInterviews(pendingInterviews.filter(interview => interview.id !== id));
    setCompletedInterviews([...completedInterviews, interviewToEvaluate]);
  };

  const renderTable = (interviewList, buttons) => (
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Time</th>
          {buttons && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {interviewList.map((interview) => (
          <tr key={interview.id}>
            <td>{interview.id}</td>
            <td>{interview.date}</td>
            <td>{interview.time}</td>
            {buttons && (
              <td>
                {buttons.reschedule && (
                  <Button variant="warning" className="mx-1" onClick={() => handleRescheduleClick(interview)}>Reschedule</Button>
                )}
                {buttons.delete && (
                  <Button variant="danger" className="mx-1" onClick={() => handleDelete(interview.id)}>Delete</Button>
                )}
                {buttons.evaluate && (
                  <Button variant="success" className="mx-1" onClick={() => handleEvaluate(interview.id)}>Evaluate</Button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Container className='defCol'>
          <Navbar.Brand href="#home">Schedule Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => setActiveSection('scheduled')} className={activeSection === 'scheduled' ? 'active' : ''}>Scheduled</Nav.Link>
              <Nav.Link onClick={() => setActiveSection('pending')} className={activeSection === 'pending' ? 'active' : ''}>Pending</Nav.Link>
              <Nav.Link onClick={() => setActiveSection('completed')} className={activeSection === 'completed' ? 'active' : ''}>Completed</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section id="scheduled" className="my-5">
        <Container>
          <h2 className="text-center mb-4">
            {activeSection === 'scheduled' && 'Scheduled Interviews'}
            {activeSection === 'pending' && 'Pending Interviews'}
            {activeSection === 'completed' && 'Completed Interviews'}
          </h2>
          {activeSection === 'scheduled' && renderTable(interviews, { reschedule: true, delete: true })}
          {activeSection === 'pending' && renderTable(pendingInterviews, { evaluate: true })}
          {activeSection === 'completed' && renderTable(completedInterviews, false)}
        </Container>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewDate">
              <Form.Label>New Date</Form.Label>
              <Form.Control
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formNewTime">
              <Form.Label>New Time</Form.Label>
              <Form.Control
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SchedulePage;
