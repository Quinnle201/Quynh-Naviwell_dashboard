import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PatientsView from '../views/PatientsView.vue'
import CalendarView from '../views/CalendarView.vue'
import PatientDetailView from '../views/PatientDetailView.vue'

import Dashboard from '../components/Dashboard/Dashboard.vue'

import Login from '../views/Login.vue'
import SetPassword from '../views/SetPassword.vue'

import { useAuthStore, useAlertStore } from '@/stores';

import { h } from 'vue'
import { RouterView } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/set-password',
      name: 'setpassword',
      component: SetPassword,
      beforeEnter: (to, from) => {
        const authStore = useAuthStore();
        if(!authStore.user || authStore.claim != null){
          return from
        }
        // reject the navigation
        
      },
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
          path: '/patients',
          component: { render: () => h(RouterView) },
          children: [
            { 
              path: '',
              name: 'patients',
              component: PatientsView
            },
            { 
              path: "patients/:id",
          name: "patient",
          component: PatientDetailView
            }
          ]
        },
        {
          path: "calendar",
          name: "calendar",
          component: CalendarView
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
  const publicPages = ['/login', '/set-password'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
      authStore.returnUrl = to.fullPath;
      return '/login';
  }
});

export default router