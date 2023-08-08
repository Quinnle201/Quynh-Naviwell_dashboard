<script setup>
import { markRaw, computed, ref, watch } from "vue";

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
import QuestionnaireResultsIcon from '../../icons/IconQResults.vue'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '@/stores';
import { useRoute } from 'vue-router'


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
    route: "/questionnaires",
    icon: markRaw(QuestionnaireResultsIcon)
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
  if (authStore.user) {
    return authStore.isPatient ? patientLinks : physicianLinks
  }
  return [];
})

const showMobileMenu = ref(false)

function showMenu() {
  showMobileMenu.value = !showMobileMenu.value;
}

const route = useRoute()
watch(route, (to) => {
  showMobileMenu.value = false;
})


</script>

<template>
  <div class="burger-menu" @click="showMenu()" :class="showMobileMenu === false ? '' : 'active'">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <div id="sidebarMenu" class="flex-column flex-shrink-0 overflow-auto sidebar px-3"
    :class="showMobileMenu ? 'open-menu' : 'closed-menu'">
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
  <div class="overlay" :class="showMobileMenu === false ? '' : 'active'" @click="showMenu(false)"></div>
</template>

<style>
.burger-menu {
  background-color: var(--main-color);
  min-width: 40px;
  width: auto !important;
  height: 40px;
  padding: 0 !important;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 11px;
  left: 8px;
  border-radius: 50%;
  z-index: 10000;
}

.burger-menu span {
  background-color: #FFFFFF;
  width: 17px;
  height: 2px;
  margin-bottom: 3px;
  display: block;
  border-radius: 3px;
  transform-origin: 4px 0px;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0), opacity 0.55s ease;
}

.burger-menu span:first-child {
  transform-origin: 0% 0%;
}

.burger-menu span:last-child {
  margin-bottom: 0;
  transform-origin: 0% 100%;
}

.burger-menu.active span {
  opacity: 1;
  transform: rotate(45deg) translate(2px, -2px);
}

.burger-menu.active span:nth-child(2) {
  opacity: 0;
  transform: rotate(45deg) translate(2px, -2px);
}

.burger-menu.active span:last-child {
  transform: rotate(-45deg) translate(1px, 3px);
}

@media screen and (max-width: 768px) {
  .sidebar .static {
    display: none;
  }

  .sidebar {
    transition: .5s ease;
  }

  .overlay {
    background-color: rgb(0, 0, 0);
    width: 100vw;
    height: 100%;
    position: absolute;
    opacity: 0;
    z-index: -1;
    transition: .2s ease;
  }

  .overlay.active {
    opacity: .4;
    z-index: 1000;
  }

  .sidebar.open-menu {
    transform: none;

  }

  .sidebar.closed-menu {
    transform: translateX(-116px);
  }

  .burger-menu {
    display: flex;
  }
}
</style>