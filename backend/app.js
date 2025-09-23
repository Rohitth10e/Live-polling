require("dotenv").config();
import express from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

const POST = process.env.PORT || 5000;

const app = express();
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

mongoose.connect()