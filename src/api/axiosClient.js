import axios from 'axios';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const { useAuthStore } = require('../store/authStore');
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { useAuthStore } = require('../store/authStore');
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
