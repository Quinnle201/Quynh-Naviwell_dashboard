<script setup>
import { markRaw, computed } from "vue";

import HomeIcon from '../../icons/IconHome.vue'
import CalendarIcon from '../../icons/IconCalendar.vue'
import DietIcon from '../../icons/IconDiet.vue'
import MessagesIcon from '../../icons/IconMessages.vue'
import PatientsIcon from '../../icons/IconPatients.vue'
import QuotesIcon from '../../icons/IconQuotes.vue'
import QuizzesIcon from '../../icons/IconQuizzes.vue'
import ResultsIcon from '../../icons/IconResults.vue'
import SettingsIcon from '../../icons/IconSettings.vue'

import MedicineIcon from '../../icons/IconMedicine.vue'
import ProfileIcon from '../../icons/IconProfile.vue'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '@/stores';


const patientLinks = [
  {
    route: "/home",
    icon: markRaw(HomeIcon)
  },
  {
    route: "/quizzes",
    icon: markRaw(QuizzesIcon)
  },
  {
    route: "/messages",
    icon: markRaw(MessagesIcon)
  },
  {
    route: "/calendar",
    icon: markRaw(CalendarIcon)
  },
  {
    route: "/patient-lab-results",
    icon: markRaw(ResultsIcon)
  },
  {
    route: "/diet",
    icon: markRaw(DietIcon)
  },
  {
    route: "https://fullscript.com",
    external: true,
    icon: markRaw(MedicineIcon)
  },
  {
    route: "/profile",
    icon: markRaw(ProfileIcon)
  },
  {
    route: "/settings",
    icon: markRaw(SettingsIcon)
  },
]


const physicianLinks = [
  {
    route: "/home",
    icon: markRaw(HomeIcon)
  },
  {
    route: "/calendar",
    icon: markRaw(CalendarIcon)
  },
  {
    route: "/messages",
    icon: markRaw(MessagesIcon)
  },
  {
    route: "/quizzes",
    icon: markRaw(QuizzesIcon)
  },
  {
    route: "/patients",
    icon: markRaw(PatientsIcon)
  },
  {
    route: "/lab-results",
    icon: markRaw(ResultsIcon)
  },
  {
    route: "/diet",
    icon: markRaw(DietIcon)
  },
  {
    route: "/quotes",
    icon: markRaw(QuotesIcon)
  },
  {
    route: "/settings",
    icon: markRaw(SettingsIcon)
  },
]


const authStore = useAuthStore();
const links = computed(() => {
  if(authStore.user) {
    return authStore.isPatient ? patientLinks : physicianLinks
  }
  return [];
})

</script>

<template>
  <div id="sidebarMenu" class="flex-column flex-shrink-0 overflow-auto sidebar px-3">
    <RouterLink to="/home" class="static">
      <img class="logo mx-auto m-2 img-fluid" src="@/assets/naviwell-logo.png" alt="NaviWell" />
    </RouterLink>
    <ul class="nav nav-pills nav-flush mb-auto text-center d-flex justify-content-center py-3 gap-3">
      <li class="nav-item" :class="index == 0 ? 'mx-auto m-2' : ''" v-for="(link, index) in links">
        <RouterLink :to="link.route" class="nav-link p-3 rounded-circle" v-if="!link.external">
          <component :is="link.icon" :key="link.icon.name" width="30" height="30"></component>
        </RouterLink>
        <a v-else :href="link.route" target="_blank" class="nav-link p-3 rounded-circle">
          <component :is="link.icon" :key="link.icon.name" width="30" height="30"></component>
        </a>
      </li>
    </ul>
  </div>
</template>