import { createWebHistory, createRouter } from "vue-router";
import store from '@store';
import { jwtDecode } from "jwt-decode";
import { allRoutes } from './router'

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes, // Use the imported routes
});


router.beforeEach((to, from, next) => {

  const authRequired = to.matched.some((route) => route.meta.authRequired);

  if (!authRequired) return next();

  if (store.getters['auth/loggedIn']) {
    const currentUser = window.localStorage.getItem('auth.currentUser');

    if (currentUser) {
      const token = JSON.parse(currentUser);

      if (token.data && typeof token.data.accessToken === 'string') {
        const auth = jwtDecode(token.data.accessToken);
        console.log("auth-router", auth);

        const now = Math.floor(Date.now() / 1000);
        if (now > auth.exp) {
          // Token has expired
          window.localStorage.removeItem('auth.currentUser');
          store.commit('auth/currentUser', null);
          return location.reload();
        }

        // Token is valid, proceed to the next route
        return next();
      }
    }
  } else {
    // User not logged in, redirect to login
    redirectToLogin(to, next);
  }
});

function redirectToLogin(to, next) {
  next({ path: '/login', query: { redirectFrom: to.fullPath } });
}

export default router;