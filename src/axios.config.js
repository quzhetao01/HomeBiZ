import axios from "axios";

const instance = axios.create({
    baseURL: 'https://homebiz-server2.onrender.com/',
    // baseURL: "http://localhost:8000/",
    withCredentials: true,
});

export default instance;