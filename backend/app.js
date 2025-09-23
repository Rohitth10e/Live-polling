import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import pollRoutes from "./routes/poll.routes.js";

const PORT = process.env.PORT || 5000;
dotenv.config();

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

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    server.listen(PORT, ()=>{console.log(`connected to db & server is running on port ${PORT}`)});
})
.catch((err)=>{
    console.log(err);
})

export { io };