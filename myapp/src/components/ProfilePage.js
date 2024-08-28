// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch profile information (mock data for demonstration)
    setProfile({ name: 'John Doe', email: 'john.doe@example.com' });
  }, []);

  const handleSave = () => {
    // Save profile changes
    console.log('Profile saved:', profile);
  };

  return (
    <Container>
      <h1 className="text-center my-4">Profile</h1>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default ProfilePage;
