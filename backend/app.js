import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import pollRoutes from "./routes/poll.routes.js";
import Poll from "./models/poll.model.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use("/api/polls", pollRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://live-polling-frontend-wgrf.onrender.com",
    methods: ["GET", "POST"]
  }
});

let participants = [];

io.on("connection", (socket) => {
  console.log("something got connected: ", socket?.id);

   socket.on('student_join', async (data) => { 
        const newUser = { id: socket.id, name: data.name, role: 'student' };
        participants.push(newUser);
        io.emit('update_participants', participants);
        console.log(`Student ${data.name} joined. Total participants: ${participants.length}`);

        try {
            const activePoll = await Poll.findOne({ isActive: true });
            if (activePoll) {
                socket.emit('newPoll', activePoll);
            }
        } catch (err) {
            console.error("Error sending active poll to new student:", err);
        }
    });

  socket.on("teacher_join", () => {
    const newUser = { id: socket.id, name: "teacher", role: "teacher" };
    if (!participants.some(p => p.role === "teacher")) {
      participants.push(newUser);
    }
    console.log('Teacher joined | Total participants:', participants.length);
    io.emit("update_participants", participants);
  })

  socket.on("endPoll", async (pollId) => {
  const poll = await Poll.findById(pollId);
  if (poll && poll.isActive) {
    poll.isActive = false;
    await poll.save();

    io.emit("pollEnded", poll); 
  }
});

  socket.on("kick_student", (studentId) => {
    const studentSocket = io.sockets.sockets.get(studentId);
    if (studentSocket) {
      studentSocket.emit("kicked");
      studentSocket.disconnect(true);
    }
  })

  socket.on("disconnect", () => {
    console.log("something got disconnected: ", socket?.id);
    participants = participants.filter(p => p.id !== socket.id);
    console.log('A user left. Total participants:', participants.length);
    io.emit("update_participants", participants);
  });
})

setInterval(async () => {
  try {
    const now = new Date();
    const expiredPolls = await Poll.find({ isActive: true, expiresAt: { $lte: now } });

    for (const poll of expiredPolls) {
      poll.isActive = false;
      await poll.save();
      io.emit("pollEnded", poll);
    }
  } catch (err) {
    console.error("Error in poll expiration check:", err);
  }
}, 1000);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => { console.log(`connected to db & server is running on port ${PORT}`) });
  })
  .catch((err) => {
    console.log(err);
  })

export default io;
