import fs from 'fs';
import https from 'https';
import express from 'express';
import { Server } from 'socket.io';
import axios from 'axios'
import {run} from './assembly.js';
// Initialize express app
const app = express();

// Path to your SSL certificate and key
const options = {
  key: fs.readFileSync('C:/WINDOWS/system32/localhost-key.pem'),
  cert: fs.readFileSync('C:/WINDOWS/system32/localhost.pem'),
};

// Create an HTTPS server with Express app
const server = https.createServer(options, app);

const io = new Server(server, {
  cors: {
    origin: '*', // Adjust CORS settings as needed
  },
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on('connection', (socket) => {
  console.log(`Socket Connected`, socket.id);

  socket.on('room:join', (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit('user:joined', { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit('room:join', data);
  });

  socket.on('user:call', ({ to, offer }) => {
    io.to(to).emit('incomming:call', { from: socket.id, offer });
  });

  socket.on('call:accepted', ({ to, ans }) => {
    io.to(to).emit('call:accepted', { from: socket.id, ans });
  });

  socket.on('peer:nego:needed', ({ to, offer }) => {
    console.log('peer:nego:needed', offer);
    io.to(to).emit('peer:nego:needed', { from: socket.id, offer });
  });

  socket.on('peer:nego:done', ({ to, ans }) => {
    console.log('peer:nego:done', ans);
    io.to(to).emit('peer:nego:final', { from: socket.id, ans });
  });
});

// Add a GET request handler
app.get('/', (req, res) => {
  res.send('Hello! This is a simple HTTPS server with Socket.IO.');
});

// Start the server on port 8000
// server.listen(8000, '172.16.1.238', () => {
//   console.log('HTTPS server is running on https://172.16.1.238:8000');
// });

import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        console.log('mongodb+srv://pratyushk512:pratyush0512@cluster0.chvvbrn.mongodb.net')
        const connectionInstance=await mongoose.connect
        (`mongodb+srv://pratyushk512:pratyush0512@cluster0.chvvbrn.mongodb.net`)
        console.log(`MongoDB connected.... DB Host: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MONGODB connection failed",error);
        process.exit(1);
    }
}

connectDB()
.then(()=>{
  server.listen(8000, '172.16.1.238', () => {
    console.log('HTTPS server is running on https://172.16.1.238:8000');
  }); 
})
.catch((err)=>{
    console.log("Mongo DB connnection failed!!!",err)
})
app.get('/savingAudioFiles/:recordAudioValue',async (req,res)=>{
  const {recordAudioValue} = req.params;
  console.log(recordAudioValue)
  const questionArray = await run(recordAudioValue);
  console.log(questionArray)
  let data = JSON.stringify({
    "interviewId": "66d34661b724f43687e7a171",
    "questions": questionArray
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://172.16.2.38:8000/api/v1/interviews/interviewComplete',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
})