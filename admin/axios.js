// import axios from 'axios'
const axios = require('axios')

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000'
const data = JSON.parse(window.localStorage.getItem('auth.currentUser'))
let token = ''
if (data) {
  token = data.accessToken
}
axios.defaults.headers['Authorization'] = `Bearer ${token}`

export default axios
