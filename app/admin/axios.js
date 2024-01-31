import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000'

const data = JSON.parse(window.localStorage.getItem('auth.currentUser'));
const token = data ? data.data.accessToken : '';

axios.defaults.headers['Authorization'] = `Bearer ${token}`

export default axios;
