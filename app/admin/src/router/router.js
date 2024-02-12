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


const productRoutes = [
  {
    path: '/product',
    name: 'Product',
    header: '',
    icon: 'home',
    meta: { authRequired: true },
    component: () => (import('@pages/products/index.vue')),
    props: (route) => ({ user: store.state.auth.currentUser || {} }),
    children: [
      {
        path: 'create',
        name: 'CreateProduct',
        component: () => (import('@pages/products/create.vue')),
      },
    ],
  },
  {
    path: '/product/create',
    name: 'CreateProduct',
    header: '',
    icon: 'home',
    meta: { authRequired: true },
    component: () => (import('@pages/products/create.vue')), 
    props: (route) => ({ user: store.state.auth.currentUser || {} }), 
  },
];

const employeeRoutes = [
  {
    path: '/employee',
    name: 'Employee',
    header: '',
    icon: 'home',
    meta: { authRequired: true },
    component: () => (import('@pages/employees/index.vue')), 
    props: (route) => ({ user: store.state.auth.currentUser || {} }), 
  },
  {
    path: '/employee/create',
    name: 'CreateEmployee',
    header: '',
    icon: 'home',
    meta: { authRequired: true },
    component: () => (import('@pages/employees/create.vue')), 
    props: (route) => ({ user: store.state.auth.currentUser || {} }), 
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
