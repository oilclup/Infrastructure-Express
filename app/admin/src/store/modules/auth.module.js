import axios from '@/axios'

export const state = {
  currentUser: getSavedState('auth.currentUser'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders(state)
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  },
  superAdmin(state) {
    if (state.currentUser.data.role === 'superAdmin') {
      return true
    } else {
      return false
    }
  },
}

export const actions = {
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state)
    dispatch('validate')
  },

  logIn({ commit }, { email, password } = {}) {
    console.log("log login", email)
    return axios.post('/api/signIn', { email, password }).then((response) => {
      const user = response.data
      //const token = user.accessToken

      commit('SET_CURRENT_USER', user)
      return user
    })
  },

  logOut({ commit }) {
    commit('SET_CURRENT_USER', null)
  },

  register(
    { email, password, firstName, lastName } = {}
  ) {
    // if (getters.loggedIn) return dispatch('validate')
    return axios
      .post('/api/signup', { email, password, firstName, lastName })
      .then((response) => {
        const user = response.data
        return user
      })
  },

  resetPassword({ dispatch, getters }, { email } = {}) {
    if (getters.loggedIn) return dispatch('validate')

    return axios.post('/api/reset', { email }).then((response) => {
      const message = response.data
      return message
    })
  },


  validate({ state }) {
    if (!state.currentUser) return Promise.resolve(null)
    // return axios
    //   .post('/api/session')
    //   .then((response) => {
    //     const user = response.data
    //     commit('SET_CURRENT_USER', user)
    //     return user
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status === 401) {
    //       commit('SET_CURRENT_USER', null)
    //     }
    //     return null
    //   })
  },
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state) {
  const currentUser = state.currentUser
  if (currentUser) {
    const token = currentUser.accessToken
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  } else {
    axios.defaults.headers.common.Authorization = ''
  }
}

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};