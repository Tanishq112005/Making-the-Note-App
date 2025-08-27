
import axios from 'axios';

// Replace with your actual backend URL
const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptor to add the JWT token to every request
api.interceptors.request.use(
  (config : any) => {
    const token = localStorage.getItem('jwt_token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;