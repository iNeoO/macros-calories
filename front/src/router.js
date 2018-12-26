import Vue from 'vue';
import Router from 'vue-router';
import cookieHelper from './modules/cookieHelper';
import Home from './views/home/home.vue';
import Login from './views/login/login.vue';
import Profile from './views/profile/profile.vue';
import Aliments from './views/aliments/aliments.vue';
import Measurements from './views/measurements/measurements.vue';
import Macros from './views/macros/macros.vue';
import Macro from './views/macro/macro.vue';

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: 'menu-item-active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/aliments',
      name: 'aliments',
      component: Aliments,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/measurements',
      name: 'measurements',
      component: Measurements,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/macros',
      name: 'macros',
      component: Macros,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/macros/macro',
      name: 'macro',
      component: Macro,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (cookieHelper.getCookie()) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
