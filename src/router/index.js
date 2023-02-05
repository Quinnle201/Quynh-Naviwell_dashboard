import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore, useAlertStore } from '@/stores';
import { h } from 'vue'
import { RouterView } from 'vue-router'

import Dashboard from '@/components/Dashboard/Dashboard.vue'

import Login from '@/views/Auth/Login.vue'
import SetPassword from '@/views/Auth/SetPassword.vue'

import HomeView from '@/views/HomeView.vue'
import PatientsView from '@/views/Patient/ListView.vue'
import PatientDetailView from '@/views/Patient/DetailView.vue'
import CalendarView from '@/views/CalendarView.vue'
import QuotesView from '@/views/Quotes/QuotesView.vue'
import AddQuoteView from '@/views/Quotes/AddView.vue'
import MessagesView from '@/views/MessagesView.vue'
import QuizzesView from '@/views/Quizzes/QuizzesView.vue'
import AddQuizView from '@/views/Quizzes/AddQuizView.vue'
import DietView from '@/views/Diet/DietView.vue'
import AddDietView from '@/views/Diet/AddDietView.vue'
import AddRecipeView from '@/views/Diet/AddRecipeView.vue'
import SettingsView from '@/views/SettingsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from) => {
        const authStore = useAuthStore();
        if(authStore.user || authStore.claim != null){
          return from
        }
      },
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
          path: '/patients',
          component: { render: () => h(RouterView) },
          children: [
            {
              path: '',
              name: 'patients',
              component: PatientsView
            },
            {
              path: ":id",
              name: "patient",
              component: PatientDetailView
            }
          ]
        },
        {
          path: '/diet',
          component: { render: () => h(RouterView) },
          children: [
            {
              path: '',
              name: 'diet',
              component: DietView
            },
            {
              path: "add-diet",
              name: "add-diet",
              component: AddDietView
            },
            {
              path: "add-recipe",
              name: "add-recipe",
              component: AddRecipeView
            }
          ]
        },
        {
          path: '/quotes',
          component: { render: () => h(RouterView) },
          children: [
            {
              path: '',
              name: 'quotes',
              component: QuotesView
            },
            {
              path: "mass-add",
              name: "quotes-mass-add",
              component: AddQuoteView
            }
          ]
        },
        {
          path: "calendar",
          name: "calendar",
          component: CalendarView
        },
        {
          path: "messages",
          name: "messages",
          component: MessagesView
        },
        {
          path: "settings",
          name: "settings",
          component: SettingsView
        },
        {
          path: '/quizzes',
          component: { render: () => h(RouterView) },
          children: [
            {
              path: '',
              name: 'quizzes',
              component: QuizzesView
            },
            {
              path: "add-quiz",
              name: "add-quiz",
              component: AddQuizView
            }
          ]
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