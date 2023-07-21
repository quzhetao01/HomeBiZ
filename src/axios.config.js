import axios from "axios";

const instance = axios.create({
    baseURL: 'https://homebiz-server2.onrender.com',
    withCredentials: true,
});

export default instance;