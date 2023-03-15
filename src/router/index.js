import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore, useAlertStore } from '@/stores';
import { h } from 'vue'
import { RouterView } from 'vue-router'

import Dashboard from '@/components/Dashboard/Dashboard.vue'

import Login from '@/views/Auth/Login.vue'
import SetPassword from '@/views/Auth/SetPassword.vue'

import PatientsView from '@/views/Patient/ListView.vue'
import PatientDetailView from '@/views/Patient/DetailView.vue'
import CalendarView from '@/views/CalendarView.vue'
import QuotesView from '@/views/Quotes/QuotesView.vue'
import AddQuoteView from '@/views/Quotes/AddView.vue'
import MessagesView from '@/views/MessagesView.vue'
import PatientMessagesView from '@/views/PatientMessagesView.vue'
import QuizzesView from '@/views/Quizzes/QuizzesView.vue'
import QuestionnairesView from '@/views/Questionnaires/QuestionnairesView.vue'
import QuestionDetailsView from '@/views/Questionnaires/QuestionDetailsView.vue'
import CompleteView from '@/views/Questionnaires/CompleteView.vue'
import QuestionView from '@/views/Questionnaires/QuestionView.vue'
import AddQuizView from '@/views/Quizzes/AddQuizView.vue'
import DietView from '@/views/Diet/DietView.vue'
import PatientDietView from '@/views/Diet/PatientDietView.vue'
import PatientDietDetailsView from '@/views/Diet/PatientDietDetailsView.vue'
import PatientRecipeDetailsView from '@/views/Diet/PatientRecipeDetailsView.vue'
import AddDietView from '@/views/Diet/AddDietView.vue'
import AddRecipeView from '@/views/Diet/AddRecipeView.vue'
import SettingsView from '@/views/SettingsView.vue'
import OnboardingView from '@/views//Onboarding/OnboardingView.vue'
import LifestyleView from '@/views//Onboarding/LifestyleView.vue'

function isPatient(){
  const authStore = useAuthStore();
  return authStore.user.profile_type.includes("PatientProfile");
}

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
      path: '/onboarding',
      children: [
        {
          path: '',
          name: 'onboarding',
          component: OnboardingView
        },
        {
          path: '/lifestyle',
          name: 'lifestyle',
          component: LifestyleView
        }
      ]
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
          component: () => isPatient() ? import('@/views/PatientHomeView.vue') : import('@/views/HomeView.vue')
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
              component: PatientDetailView,
              children: [
                {
                  path: "report",
                  name: "report",
                  component: PatientDetailView
                }
              ]
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
              path: '/patient-diet',
              name: 'patient-diet',
              component: PatientDietView
            },
            {
              path: '/patient-diet/diet-details',
              name: 'patient-diet-details',
              component: PatientDietDetailsView
            },
            {
              path: '/patient-diet/recipe-details',
              name: 'patient-recipe-details',
              component: PatientRecipeDetailsView
            },
            {
              path: "add-diet/:id?",
              name: "add-diet",
              component: AddDietView
            },
            {
              path: "add-recipe/:id?",
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
          path: "calendar/:id?",
          name: "calendar",
          component: CalendarView
        },
        {
          path: "messages",
          name: "messages",
          component: MessagesView
        },
        {
          path: "patient-messages",
          name: "patient-messages",
          component: PatientMessagesView
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
              path: "add-quiz/:id?",
              name: "add-quiz",
              component: AddQuizView
            }
          ]
        },
        {
          path: '/questionnaire',
          children: [
            {
              path: '',
              name: 'questionnaire',
              component: QuestionnairesView
            },
            {
              path: 'question-details',
              name: 'question-details',
              component: QuestionDetailsView,
              
            },
            {
              path: 'question-details/question',
              name: 'question',
              component: QuestionView
            },
            {
              path: 'question-details/question/complete',
              name: 'complete',
              component: CompleteView
            },
          ]
        }
      ]
    },
  ]
})

router.beforeEach(async (to) => {

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