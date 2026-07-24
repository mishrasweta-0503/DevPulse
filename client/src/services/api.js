import axios from 'axios';

// Dynamically set backend base URL for local development and future production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to attach JWT token to outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch all posts from backend
export const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

// Create a new post
export const createPostApi = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

export default api;