import { io } from "socket.io-client";

const socket = io("https://live-polling-mern-app.onrender.com",{
    transports: ['websocket'],
});

export default socket;
