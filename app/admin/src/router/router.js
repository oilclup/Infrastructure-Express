import store from '@store';

import Register from "@components/Register.vue";
const Profile = () => import("@components/Profile.vue")


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
    component: () => (import('@pages/dashboard/dashboard.vue')),
    meta: { authRequired: true },

  //  props: (route) => ({ user: store.state.auth.currentUser || {} }),
  },
]
const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => (import('@pages/account/Login.vue')),
    beforeEnter: (to, from, next) => {
       if (store.getters['auth/loggedIn']) {
        next({ path: '/' })
      } else {
        next()
      }
      next();
    },

  },
  {
    path: '/logout',
    name: 'logout',
    meta: { authRequired: true },
    beforeEnter: (to, from, next) => {
     store.dispatch('auth/logOut')
     next({ path: '/login' }) 
    },
  },
];


const productRoutes = [
  {
    path: '/product',
    name: 'Product',
    header: '',
    icon: 'home',
    component: () => (import('@pages/products/index.vue')),
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
    meta: { authRequired: true, roleRequired : ['admin'] },
  },
  {
    path: '/product/create',
    name: 'CreateProduct',
    header: '',
    icon: 'home',
    component: () => (import('@pages/products/create.vue')), 
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
    meta: { authRequired: true, roleRequired : ['admin'] }, 
  },
];

const employeeRoutes = [
  {
    path: '/employee',
    name: 'Employee',
    header: '',
    icon: 'home',
    component: () => (import('@pages/employees/index.vue')), 
    props: (route) => ({ user: store.state.auth.currentUser || {} }), 
    meta: { authRequired: true, roleRequired : ['admin'] },
   
  },
  {
    path: '/employee/create',
    name: 'CreateEmployee',
    header: '',
    icon: 'home',
    component: () => (import('@pages/employees/create.vue')), 
    props: (route) => ({ user: store.state.auth.currentUser || {} }), 
    meta: { authRequired: true, roleRequired : ['admin'] },

  },
];



const publicRoutes = [
 
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
];

const authProtectedRoutes = [
  ...dashboardRoutes,
  ...productRoutes,
  ...employeeRoutes
]

const allRoutes = [
  ...authRoutes,
  ...publicRoutes,
  ...authProtectedRoutes,
  // ...errorPagesRoutes
]

export { allRoutes }
