import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000'
});

const currentUser = JSON.parse(window.localStorage.getItem('auth.currentUser'));
const token = currentUser && currentUser.data ? currentUser.data.accessToken : '';
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // Unauthorized error, handle redirection here
      throw new Error('Unauthorized');
    }
    return Promise.reject(error);
  }
);

export default instance;