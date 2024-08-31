import React, { useState,useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import './AdminDashboard.css';
import useAuthStore from '../store/useAuthStore.js';
import useStore from '../store/useStore.js';

function AdminDashboard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const {logout} = useAuthStore();
  const {interviews,fetchScheduledInterviews}=useStore()

  const handleLogout =async () =>{
    await logout()
    navigate("/")
  }
  const handleNewMeeting = () => {
    navigate('/new-meeting');
  };

  const handleSchedule = () => {
    fetchScheduledInterviews()
    navigate('/scheduled');
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  useEffect(()=>{
    if(interviews){
      console.log("Interview Array: ",interviews)
    }
  },[interviews,handleSchedule])
  //const user = { name: "John Doe", email: "john.doe@example.com" };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavLink 
                to="/admin-dashboard" 
                className={({ isActive }) => isActive ? 'nav-link custom-link active' : 'nav-link custom-link'}
              >
                Home
              </NavLink>
              <NavLink 
                to="/users" 
                className={({ isActive }) => isActive ? 'nav-link custom-link active' : 'nav-link custom-link'}
              >
                Users
              </NavLink>
              <NavLink 
                to="/questions" 
                className={({ isActive }) => isActive ? 'nav-link custom-link active' : 'nav-link custom-link'}
              >
                Past Interviews
              </NavLink>
              <NavLink 
                to="#" 
                className="nav-link custom-link" 
                onClick={(e) => {
                  e.preventDefault(); // Prevents navigation
                }}
              >
                Questions
              </NavLink>
              <NavLink 
                to="#" 
                className={({ isActive }) => isActive ? 'nav-link custom-link active' : 'nav-link custom-link'}
                onClick={toggleProfile}
              >
                Profile
              </NavLink>
            </Nav>
            <Button onClick={handleLogout}>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Profile Panel */}
      {showProfile && (
        <div className="profile-panel">
          <button className="close-btn" onClick={toggleProfile}>×</button>
          <div className="profile-content">
            <div className="profile-icon">
              <i className="bi bi-person-circle" style={{ color: '#003060' }}></i> {/* Dark blue shade for the profile icon */}
            </div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
      )}

      <section id="hero" className="hero-section text-white text-center">
        <Container>
          <h1 className="display-4">Welcome to the Admin Dashboard</h1>
          <p className="lead">Manage all your interviews and meetings efficiently.</p>
          <Button variant="primary" size="lg" className="mx-2" onClick={handleNewMeeting}>
            New Meeting
          </Button>
          <Button variant="outline-light" size="lg" className="mx-2" onClick={handleSchedule}>
            Scheduled
          </Button>
        </Container>
      </section>
    </>
  );
}

export default AdminDashboard;
