const state = {
    locale: localStorage.getItem('locale') || 'en',
}
const mutations = {
    setLocale(state, locale) {
        state.locale = locale
        localStorage.setItem('locale', locale)
    },
}

const actions = {
    switchLocale({ commit }, locale) {
        commit('setLocale', locale)
    },
}

const getters = {
    getLocale() {
      return state.locale
    },
}

export const generic = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
