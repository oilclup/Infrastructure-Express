import store from '@store';

import Home from "@components/Home.vue";
import Register from "@components/Register.vue";
// lazy-loaded
const Profile = () => import("@components/Profile.vue")
const BoardAdmin = () => import("@components/BoardAdmin.vue")
const BoardModerator = () => import("@components/BoardModerator.vue")
const BoardUser = () => import("@components/BoardUser.vue")

const dashboardRoutes = [
  {
    path: '/',
    name: 'dashboard',
    header: '',
    icon: 'home',
   // role: 'superAdmin',
    // badge: {
    //   text: '1',
    //   varient: 'success',
    // },
    component: () => (import('@pages/dashboard/Dashboard.vue')),
    meta: { authRequired: true, superAdmin: true },
  //  props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]
const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => (import('@pages/account/Login.vue')),
    beforeEnter: (to, from, next) => {
      console.log("Before entering login route", to);
      /* Your other logic */
       if (store.getters['auth/loggedIn']) {
        next({ path: '/' })
      } else {
        next()
      }
      next();
    },

  },
];


const publicRoutes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
];

const authProtectedRoutes = [
  ...dashboardRoutes
]

const allRoutes = [
  ...authRoutes,
  ...publicRoutes,
  ...authProtectedRoutes,
  // ...errorPagesRoutes
]

export { allRoutes }
