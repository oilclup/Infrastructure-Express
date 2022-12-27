import store from '@state/store'

// auth related routes
const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@views/pages/account/login')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ path: '/' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/register',
    name: 'register',
    role: 'admin',
    meta: { authRequired: true, admin: true },
    component: () => lazyLoadView(import('@views/pages/account/register')),

  },
  {
    path: '/confirm-account',
    name: 'confirm-account',
    component: () => lazyLoadView(import('@views/pages/account/confirm')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ path: '/' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: () =>
      lazyLoadView(import('@views/pages/account/forgetPassword')),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.meta.authRequired
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { path: '/' } : { ...routeFrom })
      },
    },
  },
]

const publicRoutes = [
  {
    path: '/reset_password',
    name: 'reset-password',
    component: () => lazyLoadView(import('@views/pages/public/forgetPassword')),
  },
  {
    path: '/privacy_notice',
    name: 'privacy-notice',
    component: () => lazyLoadView(import('@views/pages/public/privacy_notice')),
  },
  {
    path: '/terms_of_use',
    name: 'terms-of-use',
    component: () => lazyLoadView(import('@views/pages/public/terms_of_use')),
  },
]

// error pages
/* const errorPagesRoutes = [
  {
    path: '/404',
    name: '404',
    component: require('@views/pages/secondary/error-404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  {
    path: '/500',
    name: '500',
    component: require('@views/pages/secondary/error-500').default,
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]
 */
// dashboard
const dashboardRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    header: '',
    icon: 'home',
    role: 'admin',
    // badge: {
    //   text: '1',
    //   varient: 'success',
    // },
    component: () => lazyLoadView(import('@views/pages/dashboard/dashboard')),
    meta: { authRequired: true, admin: true },
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]


const authProtectedRoutes = [
  ...dashboardRoutes,

]
const allRoutes = [
  ...authRoutes,
  ...publicRoutes,
  ...authProtectedRoutes,
  // ...errorPagesRoutes
]

export { allRoutes, authProtectedRoutes }

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@components/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    // error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}

/* async function renderCategory() {
  let result = await axios.get('/api/category')
  result = result.data.map((x) => {
    return {
      path: `${x.category_name}`,
      name: `${x.category_name}`,
      meta: { authRequired: true },
      component: () =>
        lazyLoadView(import('@views/pages/category/trainingbasic/index.vue')),
    }
  })

  return result
} */
