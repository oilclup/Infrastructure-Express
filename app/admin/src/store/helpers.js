import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const genericComputed = {
  ...mapGetters('generic', ['getLocale']),
}


export const authMethods = mapActions('auth', [
  'logIn',
])

export const genericMethods = mapActions('generic', [
  'switchLocale',
])
