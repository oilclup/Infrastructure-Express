import Vue from 'vue'
import VueRouter from 'vue-router'
// https://github.com/declandewet/vue-meta
import VueMeta from 'vue-meta'
// Adds a loading bar at the top during page loads.
import NProgress from 'nprogress/nprogress'
import store from '@state/store'
import { allRoutes } from './routes'
import jwtDecode from 'jwt-decode'
import { BASE_IMAGE_URL } from '@src/config/configsUrl'

Vue.use(VueRouter)
Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'page',
})

const router = new VueRouter({
  routes: allRoutes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: 'history',
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  // If this isn't an initial page load...
  if (routeFrom.name !== null) {
    // Start the route progress bar.
    NProgress.start()
  }

  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)
  const superAdmin = routeTo.matched.some((route) => route.meta.superAdmin)

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next()

  // if (authRequired && superAdmin) {
  //   // if (store.getters['auth/Authenticated']) {
  //   //   const token = localStorage.hltoken
  //   //   if (token) {
  //   //     const auth = jwtDecode(token)
  //   //     store.commit('auth/setUser', auth.data)
  //   //     const now = Math.floor(Date.now() / 1000)
  //   //     if (now > auth.exp) {
  //   //       localStorage.removeItem('hltoken')
  //   //       // store.commit('auth/logout')
  //   //       store.commit('auth/isAuth', false)
  //   //       return redirectToLogin()
  //   //     }
  //   if (store.getters['auth/superAdmin']) {
  //     return next()
  //   } else {
  //     return next({ path: '/contents/contentlist' })
  //   }
  //   //   }
  //   //   redirectToLogin()
  //   // } else redirectToLogin()
  // }
  //   console.log(store.getters['auth/Authenticated'])

  if (store.getters['auth/loggedIn']) {
    const currentUser = window.localStorage.getItem('auth.currentUser')
    // console.log(token)
    if (currentUser) {
      const token = JSON.parse(currentUser)
      if (token) {
        const auth = jwtDecode(token.accessToken)
        // store.commit('auth/setUser', auth.data)
        const now = Math.floor(Date.now() / 1000)
        if (now > auth.exp) {
          window.localStorage.removeItem('auth.currentUser')
          window.localStorage.removeItem('token')
          //   store.commit('auth/logOut')
          store.commit('auth/currentUser', null)
          //   return redirectToLogin()
          return location.reload()

          // window.location = `${BASE_IMAGE_URL}/logout`
        }

        if (superAdmin) {
          if (store.getters['auth/superAdmin']) {
            return next()
          } else {
            // return next({ path: '/contents/contentlist' })

            window.location = `${BASE_IMAGE_URL}/`
          }
        }
        return next()
      }
    }
    // redirectToLogin()
  } else redirectToLogin()

  // // If auth is required and the user is logged in...
  //   if (store.getters['auth/loggedIn']) {
  //     // Validate the local user token...
  //     return store.dispatch('auth/validate').then((validUser) => {
  //       // Then continue if the token still represents a valid user,
  //       // otherwise redirect to login.
  //       validUser ? next() : redirectToLogin()
  //     })
  //     // return next()
  //   }

  // If auth is required and the user is NOT currently logged in,
  // redirect to login.
  redirectToLogin()

  function redirectToLogin() {
    // Pass the original route to the login component
    next({ name: 'login', query: { redirectFrom: routeTo.fullPath } })
  }
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
  try {
    // For each matched route...
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            // If the user chose to redirect...
            if (args.length) {
              // If redirecting to the same route we're coming from...
              if (routeFrom.name === args[0].name) {
                // Complete the animation of the route progress bar.
                NProgress.done()
              }
              // Complete the redirect.
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          // Otherwise, continue resolving the route.
          resolve()
        }
      })
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return
  }

  // If we reach this point, continue resolving the route.
  next()
})

// When each route is finished evaluating...
router.afterEach((routeTo, routeFrom) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
