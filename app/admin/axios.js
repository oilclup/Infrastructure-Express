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
      throw new Error('Unauthorized');
    }
    // } else if(error.response && error.response.status === 403) {
    //   console.log(error.response.data.error.message)
    //   throw new Error('Forbidden');
    // }
    return Promise.reject(error);
  }
);

export default instance;