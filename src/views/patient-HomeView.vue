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
    },
  },
  data() {
    const userStore = useAuthStore()
    const fileStore = useFileStore()
    const alertStore = useAlertStore()
    return {
      fileStore,
      alertStore,
      user: userStore.user,
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
      <div class="pat cards-wrapper">
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

      <div class="pat cards-wrapper">
        <Card class="messages-card">
          <template #card-title>Messages</template>

          <ul>
            <li>
              <div class="messages-card-name">Dr. Wendell</div>
              <div>Re: Question about results</div>
            </li>
            <li>
              <div class="messages-card-name">Dr. Olivier</div>
              <div>Re: Prescription Refill</div>
            </li>
          </ul>

          <RouterLink to="/messages" class="dashboard-card-btn active-btn">
            <span>1 New Message</span>
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

      <div class="pat cards-wrapper">
        <Card class="visits-card">
          <template #card-title>Calendar & Virtual Care</template>
          <div class="visits-content">
            <h4>Today</h4>

            <div class="visits-content-item active">
              <div>9:00 AM</div>
              <div>Appointment</div>
              <div class="physician">Dr. Wendell at VaroHealth</div>
            </div>

            <h4>Upcoming</h4>
            <div class="visits-content-item">
              <span>You have no scheduled appointments</span>
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