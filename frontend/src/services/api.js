import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API || 'http://localhost:5000'}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Task API endpoints
export const taskAPI = {
  getAllTasks: () => api.get('/tasks'),
  getTaskById: (id) => api.get(`/tasks/${id}`),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  completeTask: (id) => api.put(`/tasks/${id}`, { status: 'Completed', completedAt: new Date() }),
};

// History API endpoints
export const historyAPI = {
  getAllHistory: () => api.get('/history'),
  getHistoryByTaskId: (taskId) => api.get(`/history/${taskId}`),
};

export default api;
