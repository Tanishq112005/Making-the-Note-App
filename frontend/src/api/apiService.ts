
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
      // Note: Your backend expects the token in the body for most requests,
      // but it's standard practice to send it in the Authorization header.
      // If your backend strictly requires it in the body, you'll add it
      // when you make the specific API call.
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;