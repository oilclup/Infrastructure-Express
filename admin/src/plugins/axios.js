import axios from 'axios'
import join from 'url-join'

const baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000'

axios.interceptors.request.use(async (config) => {
  const currentUser = JSON.parse(localStorage.getItem('auth.currentUser'))
  if (currentUser) {
    const token = currentUser.accessToken
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` }
    }
  }
  config.url = join(baseURL, config.url)
  return config
})

export default axios
