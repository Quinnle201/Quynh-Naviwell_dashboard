<script>
import CurrrentTime from '@/components/CurrentTime.vue'
import Card from '@/components/Card.vue'
import LabIcon from '@/components/icons/IconLab.vue'
import RecipeIcon from '@/components/icons/IconRecipe.vue'

import { useAuthStore } from '@/stores';
import { axiosInstance } from '@/helpers';
import userMixin from '@/mixins/user.js'

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
        console.log(timeToCheckMilli, startTimeMilli, endTimeMilli)
        if (timeToCheckMilli >= startTimeMilli && timeToCheckMilli <= endTimeMilli) {
          return true
        }
      }
    }
  },
  mounted() {
    this.getTodayVisits()
  },
  methods: {
    currentDate() {
      let date = new Date();
      let currentWeekday = date.toLocaleString('en-us', { weekday: 'short' });
      let currentMonth = date.toLocaleString('en-us', { month: 'short' });
      let currentDay = date.toLocaleString('en-us', { day: 'numeric' });
      let currentYear = date.toLocaleString('en-us', { year: 'numeric' });
      let currentDate = currentWeekday + ' ' + currentDay + ' ' + currentMonth + ' ' + currentYear;
      return currentDate;
    },
    getTodayVisits() {
      axiosInstance.get('/appointments/today')
        .then(response => {
          response.data.appointments.forEach(appt => {
            this.todayVisits.push(appt)
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
    return {
      user: userStore.user,
      todayVisits: [],
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
          <span>{{ currentDate() }}</span>
          <span>
            <CurrrentTime />
          </span>
        </div>
      </div>
    </div>

    <div class="main-grid">
      <div class="cards-wrapper">
        <div class="dashboard-card calendar-card">
          <h4>Calendar for Monday, November 28</h4>

          <div class="calendar-card-list">
            <h4>Visits today</h4>

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
            <template #card-btn>Add New Diet/Recipes</template>
          </Card>
        </div>
      </div>

      <div class="cards-wrapper">
        <Card class="messages-card">
          <template #card-title>Messages</template>

          <ul>
            <li>
              <div class="messages-card-name">Tony B.</div>
              <div>Question about results</div>
            </li>
            <li>
              <div class="messages-card-name">Sandy B.</div>
              <div>Diabetes recipes</div>
            </li>
            <li>
              <div class="messages-card-name">Howard B.</div>
              <div>Reschedule Appt.</div>
            </li>
          </ul>

          <span class="dashboard-card-btn active-btn">3 New Messages</span>
        </Card>

        <Card class="patients-card">
          <template #card-title>Patients</template>
          <ul>
            <li>
              <img src="@/assets/img/image.png" alt="Patient Photo" />
              <div>Howard Aarons</div>
            </li>
            <li>
              <img src="@/assets/img/image.png" alt="Patient Photo" />
              <div>Edward Alvarez</div>
            </li>
            <li>
              <img src="@/assets/img/image.png" alt="Patient Photo" />
              <div>Emily Atilla</div>
            </li>
            <li>
              <img src="@/assets/img/image.png" alt="Patient Photo" />
              <div>Courtney Bailey</div>
            </li>
            <li>
              <img src="@/assets/img/image.png" alt="Patient Photo" />
              <div>Karen Bartley</div>
            </li>
          </ul>
          <template #card-btn>Add New Patient</template>
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
          <span class="dashboard-card-btn">Manage Quote of the Day</span>
        </div>
      </div>
    </div>
  </div>
</template>