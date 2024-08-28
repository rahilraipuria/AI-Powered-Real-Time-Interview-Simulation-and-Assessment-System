import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ExpertDashboard from './components/ExpertDashboard';
import AdminDashboard from './components/AdminDashboard';
import VideoCallPage from './components/VideoCallPage';
import NewMeetingPage from './components/NewMeetingPage';
import SchedulePage from './components/SchedulePage';
import QuestionsPage from './components/QuestionsPage';
import ProfilePage2 from './components/ProfilePage2';
import InterviewDetailsPage from './components/InterviewDetailsPage';
import Signup from './components/Signup'; 
import './HomePage.css'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './components/HomePage'
import HomePage from './components/HomePage';
function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  const handleSignupClose = () => setShowSignup(false);
  const handleSignupShow = () => setShowSignup(true);

  return (
    <Router>
    <div className="App">
    <Routes>
    <Route path="/" element={<HomePage handleLoginShow={handleLoginShow} handleSignupShow={handleSignupShow} />} />
    <Route path="/expert-dashboard" element={<ExpertDashboard />} />
    <Route path="/video-call/:id" element={<VideoCallPage />} />
    <Route path="/admin-dashboard" element={<AdminDashboard />} />
    <Route path="/new-meeting" element={<NewMeetingPage />} />
    <Route path="/schedule" element={<SchedulePage />} />
    <Route path="/questions" element={<QuestionsPage />} /> {/* This route should match */}
    <Route path="/profile" element={<ProfilePage2 />} />
    <Route path="/interview-details" element={<InterviewDetailsPage />} />
     </Routes>


      <Login show={showLogin} handleClose={handleLoginClose} />
      <Signup show={showSignup} handleClose={handleSignupClose} />
    </div>
  </Router>
  );
}

export default App;
