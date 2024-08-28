// src/components/PastPage.js
import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Card } from 'react-bootstrap';

const PastPage = () => {
  const [pastMeetings, setPastMeetings] = useState([]);

  useEffect(() => {
    // Fetch past meetings (mock data for demonstration)
    setPastMeetings([
      { id: '3', date: '2024-08-20', time: '11:00 AM' },
      { id: '4', date: '2024-08-21', time: '01:00 PM' },
    ]);
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">Past Meetings</h1>
      <Card>
        <Card.Header>Past Meetings</Card.Header>
        <ListGroup variant="flush">
          {pastMeetings.map((meeting) => (
            <ListGroup.Item key={meeting.id}>
              <div>
                <strong>ID:</strong> {meeting.id}
              </div>
              <div>
                <strong>Date:</strong> {meeting.date}
              </div>
              <div>
                <strong>Time:</strong> {meeting.time}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default PastPage;
