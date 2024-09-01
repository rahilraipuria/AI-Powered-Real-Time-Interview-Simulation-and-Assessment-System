import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Table, Button, Modal, Form } from 'react-bootstrap';
import './SchedulePage.css';
import useStore from '../store/useStore.js';
import { evaluateTheInterview } from '../services/api.js';

function SchedulePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [activeSection, setActiveSection] = useState('scheduled');
  const { interviews, fetchScheduledInterviews, fetchPendingInterviews, fetchCompletedInterviews } = useStore();
  
  useEffect(() => {
    const fetch = async () => {
      if (activeSection === "scheduled") {
        fetchScheduledInterviews();
      } else if (activeSection === "pending") {
        fetchPendingInterviews();
      } else if (activeSection === "completed") {
        fetchCompletedInterviews();
      }
    };
    fetch();
  }, [activeSection]);

  const handleRescheduleClick = (interview) => {
    setSelectedInterview(interview);
    setNewDate(interview.date);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    const updatedInterviews = interviews.map((interview) =>
      interview._id === selectedInterview._id
        ? { ...interview, date: newDate }
        : interview
    );
    // Assuming setInterviews is defined in your useStore
    setInterviews(updatedInterviews);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updatedInterviews = interviews.filter(interview => interview._id !== id);
    // Assuming setInterviews is defined in your useStore
    setInterviews(updatedInterviews);
  };

  const handleEvaluate = async (id) => {
    //console.log(id);
    try {
      const result = await evaluateTheInterview(id);
      console.log("Evaluation Results:", result); // Log the evaluation results
      // Update the state with the evaluated interview if needed
      const updatedInterviews = interviews.map((interview) =>
        interview._id === id ? { ...interview, ...result.interview } : interview
      );
      // Assuming setInterviews is defined in your useStore
      setInterviews(updatedInterviews);
    } catch (error) {
      console.error("Error evaluating interview:", error);
    }
  };

  const renderTable = (interviewList, buttons) => (
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Role</th>
          {buttons && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {interviewList.map((interview) => (
          <tr key={interview._id}>
            <td>{interview._id}</td>
            <td>{interview.date}</td>
            <td>{interview.role}</td>
            {buttons && (
              <td>
                {buttons.reschedule && (
                  <Button variant="warning" className="mx-1" onClick={() => handleRescheduleClick(interview)}>Reschedule</Button>
                )}
                {buttons.delete && (
                  <Button variant="danger" className="mx-1" onClick={() => handleDelete(interview._id)}>Delete</Button>
                )}
                {buttons.evaluate && (
                  <Button variant="success" className="mx-1" onClick={() => handleEvaluate(interview._id)}>Evaluate</Button>
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
        <Container className="defCol">
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
          {activeSection === 'pending' && renderTable(interviews, { evaluate: true })}
          {activeSection === 'completed' && renderTable(interviews, false)}
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
