import axios from 'axios';

const instance = axios.create({
    baseURL: "http://8.9.3.229:5000"
});

export default instance;