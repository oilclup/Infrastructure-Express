import axios from 'axios';
import { provide } from 'vue';
import join from 'url-join';

const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: baseURL,  // Correctly set baseURL here
});

axiosInstance.interceptors.request.use((config) => {
  const currentUser = JSON.parse(localStorage.getItem('auth.currentUser'));
  if (currentUser) {
    const token = currentUser.accessToken;
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
  }
  config.url = join(baseURL, config.url);
  return config;
});

export const provideAxios = () => {
  provide('axios', axiosInstance);
};
