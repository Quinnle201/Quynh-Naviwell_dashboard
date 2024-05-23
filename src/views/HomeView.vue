<script>
import CurrrentTime from '@/components/CurrentTime.vue'
import Card from '@/components/Card.vue'
import LabIcon from '@/components/icons/IconLab.vue'
import RecipeIcon from '@/components/icons/IconRecipe.vue'
import ClinicLogoBlock from '@/components/Dashboard/Layout/ClinicBlock.vue'

import { useAuthStore, useFileStore, useAlertStore } from '@/stores';
import { axiosInstance, formatAMPM } from '@/helpers';
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
    RecipeIcon,
    ClinicLogoBlock
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
    greetTime() {
      var myDate = new Date();
      var hrs = myDate.getHours();

      var greet;

      if (hrs < 12)
        greet = 'Good Morning';
      else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
      else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';

        return greet;
    },
    dateBanner() {
      const date = this.currentDate
      return date.currentWeekdayShort + ' ' + date.currentDay + ' ' + date.currentMonth + ' ' + date.currentYear;
    },
    localDate() {
      return (time) => formatAMPM(new Date(time))
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
    },
    newMessagesLabel() {
      //Ideally we add here amount of new messages.
      return "See all messages"
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
          response.data.data.messages.forEach(msg => {
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
      <ClinicLogoBlock/>

      <div class="top-block-info">
        <h3>{{ greetTime }} {{ user.last_name }}</h3>
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
                <RouterLink :to="{ name: 'calendar', params: { id: visit.id } }"  style="color: #000000; width: 100%; ">
                  <div style="width: 100%;">
                    <div class="calendar-list-time">{{ localDate(visit.start_time) }} {{ userName(visit.patient.user) }}</div>
                    <div>{{ visit.visit_type_readable }}</div>
                  </div>
              </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="cards-wrapper-grid">
          <Card>
            <template #card-title>Diagnostic results</template>
            <LabIcon />
            <RouterLink :to="{ name: 'lab-results' }" style="text-align: center;">
              <span class="dashboard-card-btn">Results</span>
            </RouterLink>
          </Card>

          <Card>
            <template #card-title>Diet & Recipes</template>
            <RecipeIcon />
            <template #card-btn>
              <RouterLink :to="{ name: 'diet' }">View Diets</RouterLink>
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

          <RouterLink to="/messages" class="dashboard-card-btn">
            <span>{{newMessagesLabel}}</span>
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
            <RouterLink :to="{ name: 'patients' }">Patient list</RouterLink>
          </template>
        </Card>
      </div>

      <div class="cards-wrapper">
        <div class="dashboard-card education-card">
          <h4>Questionnaire Results</h4>

          <ul>
            <!-- <li>
              <img src="@/assets/img/icon-3.png" alt="Icon" />
              <span class="dashboard-card-btn active-btn">4 Quiz Results to Review</span>
            </li> -->

            <li>
              <RouterLink :to="{ name: 'questionnaire-results' }" style="text-align: center;">
                <img src="@/assets/img/icon-4.png" alt="Icon" />
                <span class="dashboard-card-btn">Results</span>
              </RouterLink>
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