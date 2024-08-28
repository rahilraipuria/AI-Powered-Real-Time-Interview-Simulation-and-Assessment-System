// src/components/MeetingList.js
import React from 'react';

const MeetingList = ({ meetings, startMeeting, showStartButton }) => {
    return (
        <div>
            {meetings.length > 0 ? (
                <ul className="list-group">
                    {meetings.map(meeting => (
                        <li key={meeting.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <span className="me-2">{meeting.id}</span>
                                {new Date(meeting.datetime).toLocaleString()}
                            </div>
                            {showStartButton && !meeting.started && (
                                <button
                                    className="btn btn-success"
                                    onClick={() => startMeeting(meeting.id)}
                                >
                                    Start Meeting
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No meetings found</p>
            )}
        </div>
    );
};

export default MeetingList;
