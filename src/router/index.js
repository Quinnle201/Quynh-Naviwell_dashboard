import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PatientsView from '../views/PatientsView.vue'

import Dashboard from '../components/Dashboard/Dashboard.vue'

import Login from '../views/Login.vue'

import { useAuthStore, useAlertStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: '',
      redirect: 'home',
      component: Dashboard,
      children: [
        {
          path: "home",
          name: "home",
          component: HomeView
        },
        {
          path: "about",
          name: "about",
          component: AboutView
        },
        {
          path: "patients",
          name: "patients",
          component: PatientsView
        }
      ]
    },
  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  // TODO - figure out proper handling for dev env
  const dev_ENV = `${import.meta.env.VITE_APP_ENV}` == 'development'

  if (authRequired && !authStore.user && !dev_ENV) {
      authStore.returnUrl = to.fullPath;
      return '/login';
  }
});

export default router