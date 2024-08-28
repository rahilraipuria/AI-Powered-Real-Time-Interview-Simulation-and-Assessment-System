// src/components/ProfilePage.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './ProfilePage2.css'; // Create this CSS file for styling

function ProfilePage2() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
      </div>
      <div className="text-center">
        <Button variant="secondary" href="/admin-dashboard">Back to Dashboard</Button>
      </div>
    </Container>
  );
}

export default ProfilePage2;
