<script>
import CurrrentTime from '@/components/CurrentTime.vue'
import Card from '@/components/Card.vue'
import LabIcon from '@/components/icons/IconLab.vue'
import RecipeIcon from '@/components/icons/IconRecipe.vue'

import { useAuthStore, useFileStore, useAlertStore } from '@/stores';
import { axiosInstance } from '@/helpers';
import userMixin from '@/mixins/user.js'
import { RouterLink } from 'vue-router'

export default {
  mixins: [
    userMixin
  ],
  components: {
    CurrrentTime,
    Card,
    LabIcon,
    RecipeIcon
  },
  computed: {
    currentDate() {
      let date = new Date();
      let currentWeekdayShort = date.toLocaleString('en-us', { weekday: 'short' });
      let currentWeekday = date.toLocaleString('en-us', { weekday: 'long' });
      let currentMonth = date.toLocaleString('en-us', { month: 'short' });
      let currentDay = date.toLocaleString('en-us', { day: 'numeric' });
      let currentYear = date.toLocaleString('en-us', { year: 'numeric' });
      return { currentWeekdayShort, currentWeekday, currentDay, currentMonth, currentYear };
    },
    dateBanner() {
      const date = this.currentDate
      return date.currentWeekdayShort + ' ' + date.currentDay + ' ' + date.currentMonth + ' ' + date.currentYear;
    },
    localDate() {
      return (time) => new Date(time).format('HH:mm')
    },
    inTime() {
      return (date) => {
        const visitDate = new Date(date);
        const d = new Date()
        let startTimeMilli = d.setMinutes(d.getMinutes() - 90);
        let endTimeMilli = d.setMinutes(d.getMinutes() + 180);
        let timeToCheckMilli = visitDate.getTime();
        if (timeToCheckMilli >= startTimeMilli && timeToCheckMilli <= endTimeMilli) {
          return true
        }
      }
    }
  },
  mounted() {
    this.getTodayVisits()
    this.getLatestChats()
    this.getLatestPatients();
  },
  methods: {
    getTodayVisits() {
      axiosInstance.get('/appointments/today')
        .then(response => {
          response.data.data.appointments.forEach(appt => {
            this.todayVisits.push(appt)
          });

        })
        .catch(error => {
          console.log(error)
          this.alertStore.error(error.response.data.message)
        });
    },
    getLatestChats() {
      axiosInstance.get('/messages', { params: { "limit": 3 } })
        .then(response => {
          response.data.messages.forEach(msg => {
            this.latestChats.push(msg)
          });

        })
        .catch(error => {
          console.log(error)
          this.alertStore.error(error.response.data.message)
        });
    },
    getLatestPatients() {
      axiosInstance.get('/patients', { params: { "limit": 5 } })
        .then(response => {
          response.data.data.patients.forEach(pt => {
            this.patients.push(pt)
            this.fileStore.getPhotoLinkForUser(pt.user)
          });

        })
        .catch(error => {
          console.log(error)
          this.alertStore.error(error.response.data.message)
        });
    }
  },
  data() {
    const userStore = useAuthStore()
    const fileStore = useFileStore()
    const alertStore = useAlertStore()
    return {
      fileStore,
      alertStore,
      user: userStore.user,
      todayVisits: [],
      latestChats: [],
      patients: []
    }
  }
};
</script>

<template>
  <div class="wrapper">
    <div class="top-block">
      <div class="top-block-logo">
        <img src="@/assets/img/variohealth-logo.png" alt="VarioHealth Logo" />
        <div class="top-block-info_text">
          <span>VarioHealth</span>
          <span>Advanced Integrative Medicine</span>
        </div>
      </div>

      <div class="top-block-info">
        <h3>Good Morning Dr. {{ user.last_name }}</h3>
        <div class="top-block-info-date">
          <span>{{ dateBanner }}</span>
          <span>
            <CurrrentTime />
          </span>
        </div>
      </div>
    </div>

    <div class="main-grid">
      <div class="cards-wrapper">
        <div class="dashboard-card calendar-card">
          <h4>Calendar for {{ currentDate.currentWeekday }}, {{ currentDate.currentMonth }} {{ currentDate.currentDay }}
          </h4>

          <div class="calendar-card-list">
            <h4 v-if="todayVisits.length > 0">Visits today</h4>
            <h4 v-else>No visits for today</h4>
            <ul>
              <li :class="inTime(visit.start_time) ? 'active' : ''" v-for="visit in todayVisits">
                <div class="calendar-list-time">{{ localDate(visit.start_time) }}</div>
                <div>{{ userName(visit.patient.user) }}</div>
              </li>
            </ul>
          </div>
        </div>

        <div class="cards-wrapper-grid">
          <Card>
            <template #card-title>Lab Results</template>
            <LabIcon />
            <span class="dashboard-card-btn active-btn">3 New Reports to Review</span>
          </Card>

          <Card>
            <template #card-title>Diet & Recipes</template>
            <RecipeIcon />
            <template #card-btn>
              <RouterLink :to="{ name: 'add-diet' }">Add New Diet/Recipes</RouterLink>
            </template>
          </Card>
        </div>
      </div>

      <div class="cards-wrapper">
        <Card class="messages-card">
          <template #card-title>Messages</template>

          <ul>
            <li v-for="message in latestChats">
              <div class="messages-card-name">{{ userName(message.patient.user) }}</div>
              <div>{{ message.body.message }}</div>
            </li>
          </ul>

          <RouterLink to="/messages" class="dashboard-card-btn active-btn">
            <span>3 New Messages(wip)</span>
          </RouterLink>
        </Card>

        <Card class="patients-card">
          <template #card-title>Patients</template>
          <ul>
            <li v-for="patient in patients">
              <img :src="fileStore.profileAvatars(patient.user)" alt="Patient Photo" />
              <RouterLink :to="{ name: 'patient', params: { id: patient.id } }">
                <div>{{ userName(patient.user) }}</div>
              </RouterLink>
            </li>
          </ul>
          <template #card-btn>
            Add New Patient(wip)
          </template>
        </Card>
      </div>

      <div class="cards-wrapper">
        <div class="dashboard-card education-card">
          <h4>Patient Education</h4>

          <ul>
            <li>
              <img src="@/assets/img/icon-3.png" alt="Icon" />
              <span class="dashboard-card-btn active-btn">4 Quiz Results to Review</span>
            </li>

            <li>
              <img src="@/assets/img/icon-4.png" alt="Icon" />
              <span class="dashboard-card-btn active-btn">2 Questionnaire Results to Review</span>
            </li>
          </ul>
        </div>

        <div class="dashboard-card quotes-card">
          <RouterLink :to="{ name: 'quotes' }">
            <span class="dashboard-card-btn">Manage Quote of the Day</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>