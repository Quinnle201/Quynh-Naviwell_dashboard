<script>
import CurrrentTime from '@/components/CurrentTime.vue'
import Card from '@/components/Card.vue'
import LabIcon from '@/components/icons/IconLab.vue'
import RecipeIcon from '@/components/icons/IconRecipe.vue'
import ClinicLogoBlock from '@/components/Dashboard/Layout/ClinicBlock.vue'

import { useAuthStore, useFileStore, useAlertStore, useClinicStore } from '@/stores';
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
    RecipeIcon,
    ClinicLogoBlock
  },
  computed: {
    clinic() {
      return this.clinicStore.clinic;
    },
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
    todayDate() {
      return (time) => {
            const date = new Date(time);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let am_pm = date.getHours() >= 12 ? "pm" : "am";
            hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
            minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
            return `${hours}:${minutes} ${am_pm}`
      }
    },
    localDate() {
      return (time) => {
          const date = new Date(time);
            let month = date.toLocaleString('en-us', { month: 'short' });
            let day = date.toLocaleString('en-us', { day: 'numeric' });
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let am_pm = date.getHours() >= 12 ? "pm" : "am";
            hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
            minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
            return `${day} ${month} at ${hours}:${minutes} ${am_pm}`
      }
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
  },
  data() {
    const userStore = useAuthStore()
    const fileStore = useFileStore()
    const alertStore = useAlertStore()
    const clinicStore = useClinicStore()
    return {
      fileStore,
      alertStore,
      clinicStore,
      user: userStore.user,
      messages: [],
      appointments: []
    }
  },
  methods: {
    getMessages() {
      axiosInstance.get('/messages', { params: { "limit": 2 } })
                .then(response => {
                  console.log(response.data.data)
                  this.messages = response.data.data.messages

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
    },
    getAppointments() {
      axiosInstance.get('/appointments', { params: { "upcoming": 0, "limit": 2 } })
                .then(response => {
                  console.log(response.data.data)
                  this.appointments = response.data.data.appointments

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
    }
  },
  mounted() {
    this.getMessages();
    this.getAppointments()
  }

};
</script>

<template>
  <div class="wrapper">
    <div class="top-block">
      <ClinicLogoBlock/>

      <div class="top-block-info">
        <h3>Good Morning {{ user.first_name }}</h3>
        <div class="top-block-info-date">
          <span>{{ dateBanner }}</span>
          <span>
            <CurrrentTime />
          </span>
        </div>
      </div>
    </div>

    <div class="main-grid">
      <div class="pt cards-wrapper">
        <Card class="quiz-card">
          <template #card-title>My Quizzes & Questionnaires</template>
          <div class="quiz-card-inner">
            <div class="quiz-card-content">
              <img src="@/assets/img/icon-5.svg" alt="Icon">

              <ul>
                <li>Daily Health & Wellness Questions</li>
                <li>Weekly Health & Wellness Tracker</li>
                <li>Test My Knowledge!</li>
              </ul>
            </div>

            <RouterLink to="/" class="dashboard-card-btn">
              <span>*1 New Quiz* Go to Quizzes</span>
            </RouterLink>
          </div>

          <div class="quiz-card-inner">
            <div class="quiz-card-content">
              <img src="@/assets/img/icon-4.png" alt="Icon">

              <div>
                <h4>Quarterly Health & Wellness Evaluation</h4>
                <span>See improvement over a larger period of time during your health improvement journey</span>
              </div>
            </div>

            <RouterLink to="/" class="dashboard-card-btn">
              <span>Go to Questionnaires</span>
            </RouterLink>
          </div>
        </Card>

        <div class="cards-wrapper-grid">
          <Card>
            <template #card-title>Lab Results</template>
            <LabIcon />
            <span class="dashboard-card-btn active-btn">New Results Available</span>
          </Card>

          <Card>
            <template #card-title>Diet & Recipes</template>
            <RecipeIcon />
            <template #card-btn>
              <RouterLink :to="{}" class="dashboard-card-btn active-btn">New Recipes for You</RouterLink>
            </template>
          </Card>
        </div>
      </div>

      <div class="pt cards-wrapper">
        <Card class="messages-card">
          <template #card-title>Messages</template>

          <ul>
            <li v-for="msg in messages">
              <div class="messages-card-name">Dr. {{msg.from.last_name}}</div>
              <div>Re: {{msg.body.message}}</div>
            </li>
          </ul>

          <RouterLink to="/messages" class="dashboard-card-btn active-btn">
            <span>Open messages</span>
          </RouterLink>
        </Card>

        <Card class="fullscript-card">
          <template #card-title>FullScript</template>
          <img src="@/assets/img/icon-6.svg" alt="Icon" />
          <template #card-btn>Go to FullScript Account</template>
        </Card>

        <Card class="list-card">
          <template #card-title>Medical History & Data</template>
          <ul>
            <li>Age, Gender & Ethnicity</li>
            <li>Family History</li>
            <li>Health Conditions</li>
            <li>Current Medications</li>
          </ul>
          <template #card-btn>Go to Medical History & Data</template>
        </Card>
      </div>

      <div class="pt cards-wrapper">
        <Card class="visits-card">
          <template #card-title>Calendar & Virtual Care</template>
          <div class="visits-content">
            <h4>Today</h4>

            <div v-if="appointments[0]" class="visits-content-item active">
              <div>{{ todayDate(appointments[0].start_time) }}</div>
              <div>Appointment</div>
              <div class="physician">Dr. {{ appointments[0].physician.user.last_name }} at {{clinic.name}}</div>
            </div>
            <div v-else>
              <div class="visits-content-item">
                <span>You have no scheduled appointments for today</span>
              </div>
            </div>

            <h4>Upcoming</h4>
            <div v-if="appointments[1]" class="visits-content-item active">
              <div>{{ localDate(appointments[1].start_time) }}</div>
              <div>Appointment</div>
              <div class="physician">Dr. {{ appointments[1].physician.user.last_name }} at {{clinic.name}}</div>
            </div>
            <div v-else>
              <div class="visits-content-item">
                <span>You have no scheduled appointments</span>
              </div>
            </div>
          </div>
          <template #card-btn>Go to Visits & Virtual Care</template>
        </Card>

        <Card class="list-card">
          <template #card-title>Account Settings</template>
          <ul>
            <li>Name, Date of Birth, Address</li>
            <li>Email Address</li>
            <li>Password and Security</li>
          </ul>
          <template #card-btn>Go to Account Settings</template>
        </Card>
      </div>
    </div>
  </div>
</template>