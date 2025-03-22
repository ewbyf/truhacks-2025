import axios from 'axios';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`
    }
});

export default api;