import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExpertDashboard.css';
import MeetingList from './MeetingList';
import ProfileDialog from './ProfileDialog';

const ExpertDashboard = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [view, setView] = useState('upcoming'); 
    const [meetings, setMeetings] = useState([
        { id: 1, datetime: '2024-09-01 23:40', started: false },
        { id: 2, datetime: '2024-09-02 23:40', started: false },
        { id: 3, datetime: '2024-09-29 23:40', started: false },
        { id: 4, datetime: '2024-09-29 23:40', started: false },
        { id: 5, datetime: '2024-09-28 11:00', started: false },
        { id: 6, datetime: '2024-09-29 14:00', started: false },
        { id: 7, datetime: '2024-09-24 09:00', started: true },
        { id: 8, datetime: '2024-09-23 15:00', started: true },
    ]);

    const navigate = useNavigate();

    const toggleProfile = () => setShowProfile(!showProfile);
    
    const startMeeting = (id) => {
        setMeetings(meetings.map(meeting =>
            meeting.id === id ? { ...meeting, started: true } : meeting
        ));
        navigate(`/video-call/${id}`);
    };
    
    const upcomingMeetings = meetings.filter(meeting =>
        new Date(meeting.datetime) > new Date() && !meeting.started
    );

    const pastMeetings = meetings.filter(meeting =>
        new Date(meeting.datetime) <= new Date() || meeting.started
    );

    // Example user data, replace with actual data as needed
    const [user, setUser] = useState({ name: "John Doe", email: "johndoe@example.com" });

    return (
        <div className="dashboard-container">
            <header className="d-flex justify-content-between align-items-center p-3">
                <h1 className="text-white dashboard-title">Experts Dashboard</h1>
                <div className="d-flex align-items-center">
                    <span
                        className={`navbar-link me-4 ${view === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setView('upcoming')}
                    >
                        Schedule
                    </span>
                    <span
                        className={`navbar-link ${view === 'past' ? 'active' : ''}`}
                        onClick={() => setView('past')}
                    >
                        Past
                    </span>
                    <button className="btn btn-secondary ms-3" onClick={toggleProfile}>
                        <i className="bi bi-person"></i>
                    </button>
                </div>
            </header>

            {/* Render the ProfileDialog only if showProfile is true */}
            {showProfile && <ProfileDialog onClose={toggleProfile} user={user} />}

            <main className="p-4">
                {view === 'upcoming' ? (
                    <>
                        <h1 className="upcoming-meetings-heading">Upcoming Meetings</h1>
                        <MeetingList meetings={upcomingMeetings} startMeeting={startMeeting} showStartButton={true} />
                    </>
                ) : (
                    <>
                        <h1 className="text-primary past-meetings">Past Meetings</h1>
                        <MeetingList meetings={pastMeetings} startMeeting={startMeeting} showStartButton={false} />
                    </>
                )}
            </main>
        </div>
    );
};

export default ExpertDashboard;
