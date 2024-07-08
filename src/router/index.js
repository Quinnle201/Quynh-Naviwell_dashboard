import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore, useProgrammaticAccesStore } from '@/stores';
import { h } from 'vue'
import { RouterView } from 'vue-router'

import Dashboard from '@/components/Dashboard/Dashboard.vue'

import Login from '@/views/Auth/Login.vue'
import SetPassword from '@/views/Auth/SetPassword.vue'
import ResetPassword from '@/views/Auth/ResetPassword.vue'

import PatientsView from '@/views/Patient/ListView.vue'
import PatientDetailView from '@/views/Patient/DetailView.vue'
import PatientNotesView from '@/views/Patient/NotesView.vue'
import SoapView from '@/views/Patient/SoapView.vue'
import CalendarView from '@/views/CalendarView.vue'
import LabResultsView from '@/views/LabResults/LabResultsView.vue'
import AddResultView from '@/views/LabResults/AddResultView.vue'
import QuotesView from '@/views/Quotes/QuotesView.vue'
import AddQuoteView from '@/views/Quotes/AddView.vue'

import QuestionDetailsView from '@/views/Questionnaires/QuestionDetailsView.vue'
import QuestionnairesResultsView from '@/views/Questionnaires/QuestionnairesResultsView.vue'

import AddQuizView from '@/views/Quizzes/AddQuizView.vue'
import ResultQuizView from '@/views/Quizzes/ResultQuizView.vue'

import PatientDietDetailsView from '@/views/Diet/PatientDietDetailsView.vue'
import PatientRecipeDetailsView from '@/views/Diet/PatientRecipeDetailsView.vue'
import AddDietView from '@/views/Diet/AddDietView.vue'
import AddRecipeView from '@/views/Diet/AddRecipeView.vue'
import SettingsView from '@/views/SettingsView.vue'
import OnboardingView from '@/views//Onboarding/OnboardingView.vue'
import QuizView from '@/views/Onboarding/QuizView.vue'
import LifestyleView from '@/views/Onboarding/LifestyleView.vue'
import GetStartedView from '@/views/Onboarding/GetStartedView.vue'
import CompleteInfoView from '@/views/Onboarding/CompleteInfoView.vue'
import PatientProfileView from '@/views/PatientProfileView.vue'
import PatientLabResultsView from '@/views/PatientLabResultsView.vue'
import NotFound from '@/views/404.vue'

import MiddlewareStylesheet from "./middleware/stylesheet";

function isPatient(){
  const authStore = useAuthStore();
  return authStore.isPatient;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { physician: true, patient: true },
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
      meta: { physician: true, patient: true },
      beforeEnter: (to, from) => {
        const authStore = useAuthStore();
        if(!authStore.user || authStore.claim != null){
          return from
        }
      },
    },
    {
      path: '/reset-password',
      name: 'resetpassword',
      component: ResetPassword,
      meta: { physician: true, patient: true },
      beforeEnter: (to, from) => {
        const authStore = useAuthStore();
        if(authStore.user || authStore.claim != null){
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
          component: OnboardingView,
          meta: { physician: false, patient: true, stylesheet: 'onboarding' },
          beforeEnter: (to, from) => {
            const programmaticAccess = useProgrammaticAccesStore();
            if(programmaticAccess.getAccessPage == "onboarding"){
              programmaticAccess.setAccessPage(null)
              return true;
            }
            return from
          },
        },
        {
          path: '/get-started',
          name: 'get-started',
          component: GetStartedView,
          meta: { physician: false, patient: true, stylesheet: 'onboarding' },
          beforeEnter: (to, from) => {
            const programmaticAccess = useProgrammaticAccesStore();
            if(programmaticAccess.getAccessPage == "get-started"){
              programmaticAccess.setAccessPage(null)
              return true;
            }
            return from
          },
        },
        {
          path: '/quiz',
          name: 'quiz',
          component: QuizView,
          meta: { physician: false, patient: true, stylesheet: 'onboarding' },
          beforeEnter: (to, from) => {
            const programmaticAccess = useProgrammaticAccesStore();
            if(programmaticAccess.getAccessPage == "quiz"){
              programmaticAccess.setAccessPage(null)
              return true;
            }
            return from
          },
        },
        {
          path: '/lifestyle',
          name: 'lifestyle',
          component: LifestyleView,
          meta: { physician: false, patient: true, stylesheet: 'onboarding' },
          beforeEnter: (to, from) => {
            const programmaticAccess = useProgrammaticAccesStore();
            if(programmaticAccess.getAccessPage == "lifestyle"){
              programmaticAccess.setAccessPage(null)
              return true;
            }
            return from
          },
        },
        {
          path: '/complete-info',
          name: 'complete-info',
          component: CompleteInfoView,
          meta: { physician: false, patient: true, stylesheet: 'onboarding' },
          beforeEnter: (to, from) => {
            const programmaticAccess = useProgrammaticAccesStore();
            if(programmaticAccess.getAccessPage == "complete-info"){
              programmaticAccess.setAccessPage(null)
              return true;
            }
            return from
          },
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
          component: () => isPatient() ? import('@/views/PatientHomeView.vue') : import('@/views/HomeView.vue'),
          meta: { physician: true, patient: true },
        },
        {
          path: '/patients',
          component: { render: () => h(RouterView) },
          meta: { physician: true, patient: false },
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
            },
            {
              path: "/notes/:noteId?",
              name: "notes",
              component: PatientNotesView,
            },
            {
              path: "/soap/:soapId?",
              name: "soap",
              component: SoapView,
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
              component: () => isPatient() ? import('@/views/Diet/PatientDietView.vue') : import('@/views/Diet/DietView.vue'),
              meta: { physician: true, patient: true },
            },
            {
              path: ':id',
              name: 'patient-diet-details',
              component: PatientDietDetailsView,
              meta: { physician: true, patient: true }
            },
            {
              path: '/recipe/:id',
              name: 'patient-recipe-details',
              component: PatientRecipeDetailsView,
              meta: { physician: true, patient: true }
            },
            {
              path: "add-diet/:id?",
              name: "add-diet",
              component: AddDietView,
              meta: { physician: false, patient: false }
            },
            {
              path: "add-recipe/:id?",
              name: "add-recipe",
              component: AddRecipeView,
              meta: { physician: false, patient: false }
            }
          ]
        },
        {
          path: 'profile',
          name: 'profile',
          component: PatientProfileView,
          meta: { physician: false, patient: true },
        },
        {
          path: '/quotes',
          component: { render: () => h(RouterView) },
          children: [
            {
              path: '',
              name: 'quotes',
              component: QuotesView,
              meta: { physician: true, patient: false },
            },
            {
              path: "mass-add",
              name: "quotes-mass-add",
              component: AddQuoteView,
              meta: { physician: true, patient: false },
            }
          ]
        },
        {
          path: "calendar/:id?",
          name: "calendar",
          // component: CalendarView,
          component: () => isPatient() ? import('@/views/PatientCalendarView.vue') : import('@/views/CalendarView.vue'),
          meta: { physician: true, patient: true },
        },
        {
          path: '/lab-results',
          component: { render: () => h(RouterView) },
          children: [
            {
              path: '',
              name: 'lab-results',
              component: LabResultsView,
              meta: { physician: true, patient: false },
            },
            {
              path: "add/:id?",
              name: "add-result",
              component: AddResultView,
              meta: { physician: true, patient: false },
            }
          ]
        },
        {
          path: "patient-lab-results",
          name: "patient-lab-results",
          component: PatientLabResultsView,
          meta: { physician: false, patient: true },
        },
        {
          path: "messages",
          name: "messages",
          component: () => isPatient() ? import('@/views/PatientMessagesView.vue') : import('@/views/MessagesView.vue'),
          meta: { physician: true, patient: true },
        },
        {
          path: "settings",
          name: "settings",
          component: SettingsView,
          meta: { physician: true, patient: true },
        },
        {
          path: '/quizzes',
          component: { render: () => h(RouterView) },
          children: [
            {
              path: '',
              name: 'quizzes',
              component: () => isPatient() ? import('@/views/Questionnaires/QuestionnairesView.vue') : import('@/views/Quizzes/QuizzesView.vue'),
              meta: { physician: true, patient: true },
            },
            {
              path: "add-quiz/:id?",
              name: "add-quiz",
              component: AddQuizView,
              meta: { physician: false, patient: false },
            },
            {
              path: "result/:id",
              name: "result-quiz",
              component: ResultQuizView,
              meta: { physician: true, patient: true },
            },
            {
              path: ':id',
              name: 'question-details',
              component: QuestionDetailsView,
              meta: { physician: false, patient: true },
            },
          ]
        },
        {
          path: "questionnaires",
          name: "questionnaire-results",
          component: QuestionnairesResultsView,
          meta: { physician: true, patient: false },
        },
        // {
        //   path: '/questionnaire',
        //   children: [
        //     {
        //       path: '',
        //       name: 'questionnaire',
        //       component: QuestionnairesView,
        //       meta: { physician: false, patient: true },
        //     },
        //     {
        //       path: 'question-details',
        //       name: 'question-details',
        //       component: QuestionDetailsView,
        //       meta: { physician: false, patient: true },
              
        //     },
        //     {
        //       path: 'question-details/question',
        //       name: 'question',
        //       component: QuestionView,
        //       meta: { physician: false, patient: true },
        //     },
        //     {
        //       path: 'question-details/question/complete',
        //       name: 'complete',
        //       component: CompleteView,
        //       meta: { physician: false, patient: true },
        //     },
        //   ]
        // },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: NotFound,
          meta: { physician: true, patient: true },
        }
      ]
    },
  ]
})

router.beforeEach(async (to) => {

  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/login', '/set-password', '/reset-password' ];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
      authStore.returnUrl = to.fullPath;
      return '/login';
  }

    if (!to.meta.patient && isPatient()) {
      return '/';
    }

    if (!to.meta.physician && !isPatient()) {
      return '/';
    }

});

// router.beforeEach(MiddlewareStylesheet);

export default router