import React, { useEffect, useCallback, useState, useRef } from "react";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaPhoneAlt,
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaQuestionCircle,
  FaReplyAll,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VideoCallPage.css";
import axios from 'axios'

const RoomPage = () => {
  const socket = useSocket();
  const [recordAudioValue, setRecordAudioValue] = useState(0)
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null); 

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const localVideoRef = useRef(null); 
  const remoteVideoRef = useRef(null); 
  
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 44100, // High sample rate for better quality
        channelCount: 2, // Stereo sound
        echoCancellation: true, // Reduce echo
        noiseSuppression: true, // Reduce background noise
        autoGainControl: true, // Adjust the volume dynamically
      },
    });

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm', // Use webm format for better quality/compression
      audioBitsPerSecond: 128000, // Set high audio bitrate
    });

    const audioChunks = [];
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp4' });
      const audioUrl = URL.createObjectURL(audioBlob);

      const downloadLink = document.createElement('a');
      downloadLink.href = audioUrl;
      setRecordAudioValue(recordAudioValue+1)
      downloadLink.download = `${recordAudioValue}.wav`;
      downloadLink.click();
    };

    mediaRecorder.start();
    setRecorder(mediaRecorder);
    setIsRecording(true);
  } catch (error) {
    console.error('Error starting recording:', error);
  }
};

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
    }
  };

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);

    // Attach local stream to local video element
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const [remoteStream] = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream);

      // Attach remote stream to the remote video element
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    // Listen for the "call:ended" event to end the call on the other side
    // socket.on("call:ended", handleCutCallRemote);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      // socket.off("call:ended", handleCutCallRemote);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [questionActive, setQuestionActive] = useState(false);
  const [answerActive, setAnswerActive] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const navigate = useNavigate();

  const handleQuesToDatabase = () =>{
    axios.get(`https://172.16.1.238:8000/savingAudioFiles/${recordAudioValue}`).then(
      console.log("Data saved to database")
    ).catch((error)=>{
      console.log(error)
    })
  }

  const handleCutCallAndQues = () => {
    socket.emit("call:ended", { to: remoteSocketId });
    // Close the peer connection

    handleQuesToDatabase();
    if (peer.peer) {
      peer.peer.close();
    }

    // Stop all local media tracks
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
    }

    setCallEnded(true);
    navigate("/expert-dashboard"); // Replace '/expert-dashboard' with the actual route
  };

  useEffect(() => {
    socket.on("call:ended", () => {
      // Stop remote stream
      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop());
      }
  
      // Stop local stream
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
  
      // Close peer connection
      if (peer.peer) {
        peer.peer.close();
      }
  
      // Optionally, update the UI
      setCallEnded(true);
    });
  
    return () => {
      socket.off("call:ended");
    };
  }, [myStream, remoteStream, peer.peer, socket]);
  

  const { id } = useParams();

  const toggleQuestion = () => setQuestionActive(!questionActive);
  const toggleAnswer = () => setAnswerActive(!answerActive);
  const toggleCameraphy = () => {
    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !cameraOn;
        setCameraOn(!cameraOn);
      }
    }
  };
  
  const toggleMicphy = () => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      console.log( myStream.getAudioTracks()[0])
      if (audioTrack) {
        audioTrack.enabled = !micOn;
        setMicOn(!micOn);
      }
    }
  };
  
  return (
    <div>
      <div className="video-call-page">
        <div className="video-container">
          <div className="remote-video">
            <video
              ref={remoteVideoRef} // Use ref for remote video
              playsInline
              autoPlay
              style={{ width: "100vw", height: "100%" }}
              className="remote-video-element"
            />
          </div>
          <div className="local-video">
            <video
              ref={localVideoRef} // Use ref for local video
              playsInline
              muted
              autoPlay
              className="local-video-element"
            />
          </div>
        </div>

        <div className="video-controls">
        <button
            className={`control-btn ${isRecording ? "recording" : ""}`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          {remoteSocketId && <button className="control-btn" onClick={handleCallUser}><FaPhoneAlt /></button>}
          {myStream && (
            <button className="control-btn answer-active" onClick={sendStreams}>
              <FaReplyAll />
            </button>
          )}
          <button
            className={`control-btn ${micOn ? "mic-on" : ""}`}
            onClick={toggleMicphy}
          >
            {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </button>
          <button
            className={`control-btn ${cameraOn ? "camera-on" : ""}`}
            onClick={toggleCameraphy}
          >
            {cameraOn ? <FaVideo /> : <FaVideoSlash />}
          </button>
          <button
            className={`control-btn ${questionActive ? "question-active" : ""}`}
            onClick={toggleQuestion}
          >
            <FaQuestionCircle />
          </button>
          <button className="control-btn cut-call" onClick={handleCutCallAndQues}>
            <FaPhoneAlt />
          </button>
        </div>
      </div>
      
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
    </div>
  );
};

export default RoomPage;
