// src/components/ProfileDialog.js
import React from 'react';
import './ProfileDialog.css'; // Ensure the path is correct

function ProfileDialog({ onClose, user }) {
    return (
        <div className="profile-dialog">
            <button className="close-btn" onClick={onClose}>×</button>
            <div className="profile-content">
                <div className="profile-icon">
                    <i className="bi bi-person-circle"></i> {/* Using Bootstrap Icons for the profile icon */}
                </div>
                <p className="profile-name">{user.name}</p>
                <p className="profile-email">{user.email}</p>
            </div>
        </div>
    );
}

export default ProfileDialog;
