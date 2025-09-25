import axios from "axios";

const api = axios.create({
    baseURL: "https://live-polling-mern-app.onrender.com/api",
});

export default api;
