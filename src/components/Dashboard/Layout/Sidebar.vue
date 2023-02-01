<script setup>
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

</script>

<template>

  <div id="sidebarMenu" class="d-md-flex flex-column flex-shrink-0 overflow-auto sidebar collapse px-3">
    <a href="/">
      <img class="logo mx-auto m-2 img-fluid" src="@/assets/naviwell-logo.png"  alt="NaviWell" />
    </a>
    <ul class="nav nav-pills nav-flush mb-auto text-center d-flex justify-content-center py-3 gap-3">
      <li class="nav-item mx-auto m-2">
        <RouterLink to="/home" class="nav-link p-3 rounded-circle">
          <HomeIcon width="30" height="30" />
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/calendar" class="nav-link p-3 rounded-circle">
          <CalendarIcon width="30" height="30" />
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/messages" class="nav-link p-3 rounded-circle">
          <MessagesIcon width="30" height="30" />
        </RouterLink>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link p-3 rounded-circle" aria-current="page" title="" data-bs-toggle="tooltip"
          data-bs-placement="right" data-bs-original-title="Home">
          <QuizzesIcon width="30" height="30" />
        </a>
      </li>
      <li class="nav-item">
        <RouterLink to="/patients" class="nav-link p-3 rounded-circle">
          <PatientsIcon width="30" height="30" />
        </RouterLink>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link p-3 rounded-circle" aria-current="page" title="" data-bs-toggle="tooltip"
          data-bs-placement="right" data-bs-original-title="Home">
          <ResultsIcon width="30" height="30" />
        </a>
      </li>
      <li class="nav-item">
        <RouterLink to="/diet" class="nav-link p-3 rounded-circle">
          <DietIcon width="30" height="30" />
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/quotes" class="nav-link p-3 rounded-circle">
          <QuotesIcon width="30" height="30" />
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/settings" class="nav-link p-3 rounded-circle">
          <SettingsIcon width="30" height="30" />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>