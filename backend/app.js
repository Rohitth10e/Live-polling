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
app.use(express.urlencoded({ extended: true }));

app.use("/api/polls", pollRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=>{
    console.log("something got connected: ", socket?.id);

    socket.on("disconnect", ()=>{
        console.log("something got disconnected: ", socket?.id);
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
}, 60000);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    server.listen(PORT, ()=>{console.log(`connected to db & server is running on port ${PORT}`)});
})
.catch((err)=>{
    console.log(err);
})

export default io;