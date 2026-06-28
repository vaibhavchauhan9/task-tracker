import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://task-tracker-urfl.onrender.com/api',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getTasks   = (filters = {}) => api.get('/tasks', { params: filters });
export const createTask = (data)         => api.post('/tasks', data);
export const updateTask = (id, data)     => api.put(`/tasks/${id}`, data);
export const deleteTask = (id)           => api.delete(`/tasks/${id}`);