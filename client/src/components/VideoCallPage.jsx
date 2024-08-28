/* src/components/VideoCallPage.js */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPhoneAlt, FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaQuestionCircle, FaReplyAll } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VideoCallPage.css';
import { useNavigate } from 'react-router-dom';

const VideoCallPage = () => {
    const [cameraOn, setCameraOn] = useState(true);
    const [micOn, setMicOn] = useState(true);
    const [questionActive, setQuestionActive] = useState(false);
    const [answerActive, setAnswerActive] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const navigate = useNavigate();

    const handleCutCall = () => {
        setCallEnded(true);
        navigate('/expert-dashboard'); // Replace '/admin-dashboard' with the actual route to the Admin Dashboard
    };
   

    const { id } = useParams();

    const toggleCamera = () => setCameraOn(!cameraOn);
    const toggleMic = () => setMicOn(!micOn);
    const toggleQuestion = () => setQuestionActive(!questionActive);
    const toggleAnswer = () => setAnswerActive(!answerActive);

    if (callEnded) {
        return (
            <div className="end-message">
                <h1>The Interview has been completed</h1>
            </div>
        );
    }

    return (
        <div className="video-call-page">
            <div className="video-container">
                <div className="remote-video">
                    {/* Remote video stream would be placed here */}
                </div>
                <div className="local-video">
                    <div className="local-video-box">
                        <div className="local-video-content">
                            <p>Front Camera</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="video-controls">
            <button className={`control-btn ${micOn ? 'mic-on' : ''}`} onClick={toggleMic}>
                    {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />} 
                </button>
                <button className={`control-btn ${cameraOn ? 'camera-on' : ''}`} onClick={toggleCamera}>
                    {cameraOn ? <FaVideo /> : <FaVideoSlash />} 
                </button>
                <button className={`control-btn ${questionActive ? 'question-active' : ''}`} onClick={toggleQuestion}>
                    <FaQuestionCircle /> 
                </button>
                <button className={`control-btn ${answerActive ? 'answer-active' : ''}`} onClick={toggleAnswer}>
                    <FaReplyAll /> 
                </button>
                <button className="control-btn cut-call" onClick={handleCutCall}>
                    <FaPhoneAlt /> 
                </button>
            </div>
        </div>
    );
};

export default VideoCallPage;
