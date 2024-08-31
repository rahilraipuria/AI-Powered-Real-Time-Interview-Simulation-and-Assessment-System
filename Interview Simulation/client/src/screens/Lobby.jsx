import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <h1 className="text-3xl font-bold mb-6">Lobby</h1>
  <form
    onSubmit={handleSubmitForm}
    className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
  >
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Email ID
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <div className="mb-4">
      <label
        htmlFor="room"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Room Number
      </label>
      <input
        type="text"
        id="room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
    >
      Join
    </button>
  </form>
</div>

  );
};

export default LobbyScreen;
