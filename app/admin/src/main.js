import Vue from 'vue'
import App from './app'
import router from '@router'
import store from '@state/store'
import '@components/_globals'

import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import vco from 'v-click-outside'
import VueRouter from 'vue-router'
import VueFeather from 'vue-feather'
import flatPickr from 'vue-flatpickr-component'
import Paginate from 'vuejs-paginate'
import VueToast from 'vue-toast-notification'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// import 'vue-toast-notification/dist/theme-default.css'
import '@assets/css/theme-default.css'

// import axios from 'axios'
import axios from './plugins/axios'

import helpers from './helpers'

import * as bootstrap from 'bootstrap'
import jQuery from 'jquery'
global.jQuery = jQuery
global.$ = jQuery

Vue.use(VueFeather)
Vue.use(flatPickr)

Vue.use(VueRouter)
Vue.use(vco)
Vue.use(Loading)

Vue.use(VueToast, {
  // One of the options
  // position: 'top',
  // duration: 500000,
})

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

// const baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000'

// if (typeof baseURL !== 'undefined') {
//   axios.defaults.baseURL = baseURL
// }

Vue.prototype.axios = axios
// const currentUser = JSON.parse(localStorage.getItem('auth.currentUser'))
// if (currentUser) {
//   const token = currentUser.accessToken
//   if (token) {
//     Vue.prototype.axios.defaults.headers.common[
//       'Authorization'
//     ] = `Bearer ${token}`
//   }
// }

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueMask)

Vue.component('apexchart', VueApexCharts)
Vue.component('paginate', Paginate)

const plugin = {
  install() {
    Vue.helpers = helpers
    Vue.prototype.$helpers = helpers
  },
}

Vue.use(plugin)

// Uncomment this if you are having api served through other url or do not want to use fake backend
// Vue.prototype.$http = require('axios')
// Vue.prototype.$http.defaults.baseURL  = 'http://mock-api.coderthemes.com/'

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
