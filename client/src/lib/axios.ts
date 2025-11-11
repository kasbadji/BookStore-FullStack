import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (!config.headers) {
        config.headers = {}; //! If headers doesn't exist, create an empty object first. so he always exists
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

//! configured axios instance so you don't repeat base URL + token code.
