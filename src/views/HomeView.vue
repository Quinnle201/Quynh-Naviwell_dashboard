<script setup>
</script>

<template>
  <!-- <div class="table-responsive">
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Header</th>
          <th scope="col">Header</th>
          <th scope="col">Header</th>
          <th scope="col">Header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1,001</td>
          <td>random</td>
          <td>data</td>
          <td>placeholder</td>
          <td>text</td>
        </tr>
        <tr>
          <td>1,002</td>
          <td>placeholder</td>
          <td>irrelevant</td>
          <td>visual</td>
          <td>layout</td>
        </tr>
        <tr>
          <td>1,003</td>
          <td>data</td>
          <td>rich</td>
          <td>dashboard</td>
          <td>tabular</td>
        </tr>
        <tr>
          <td>1,003</td>
          <td>information</td>
          <td>placeholder</td>
          <td>illustrative</td>
          <td>data</td>
        </tr>
        <tr>
          <td>1,004</td>
          <td>text</td>
          <td>random</td>
          <td>layout</td>
          <td>dashboard</td>
        </tr>
        <tr>
          <td>1,005</td>
          <td>dashboard</td>
          <td>irrelevant</td>
          <td>text</td>
          <td>placeholder</td>
        </tr>
        <tr>
          <td>1,006</td>
          <td>dashboard</td>
          <td>illustrative</td>
          <td>rich</td>
          <td>data</td>
        </tr>
        <tr>
          <td>1,007</td>
          <td>placeholder</td>
          <td>tabular</td>
          <td>information</td>
          <td>irrelevant</td>
        </tr>
        <tr>
          <td>1,008</td>
          <td>random</td>
          <td>data</td>
          <td>placeholder</td>
          <td>text</td>
        </tr>
        <tr>
          <td>1,009</td>
          <td>placeholder</td>
          <td>irrelevant</td>
          <td>visual</td>
          <td>layout</td>
        </tr>
        <tr>
          <td>1,010</td>
          <td>data</td>
          <td>rich</td>
          <td>dashboard</td>
          <td>tabular</td>
        </tr>
        <tr>
          <td>1,011</td>
          <td>information</td>
          <td>placeholder</td>
          <td>illustrative</td>
          <td>data</td>
        </tr>
        <tr>
          <td>1,012</td>
          <td>text</td>
          <td>placeholder</td>
          <td>layout</td>
          <td>dashboard</td>
        </tr>
        <tr>
          <td>1,013</td>
          <td>dashboard</td>
          <td>irrelevant</td>
          <td>text</td>
          <td>visual</td>
        </tr>
        <tr>
          <td>1,014</td>
          <td>dashboard</td>
          <td>illustrative</td>
          <td>rich</td>
          <td>data</td>
        </tr>
        <tr>
          <td>1,015</td>
          <td>random</td>
          <td>tabular</td>
          <td>information</td>
          <td>text</td>
        </tr>
      </tbody>
    </table>
  </div> -->

  <div class="wrapper">
    <div class="top-block">
      <div class="top-block-logo">
        <img src="/img/variohealth-logo.png" alt="VarioHealth Logo" />
        <div class="top-block-info_text">
          <span>VarioHealth</span>
          <span>Advanced Integrative Medicine</span>
        </div>
      </div>

      <div class="top-block-info">
        <h3>Good Morning Dr. Wendell</h3>
        <div class="top-block-info-date">
          <span>{{currentDate()}}</span>
          <span>{{currentTime()}}</span>
        </div>
      </div>
    </div>

    <div class="main-grid">
      <div class="cards-wrapper">
        <div class="dashboard-card calendar-card">
          <h4>Calendar for Monday, November 28</h4>

          <div class="calendar-card-list">
            <span>Today</span>

            <ul>
              <li class="active">
                <div class="calendar-list-time">9:00 AM</div>
                <div>Appointment - Denis S.</div>
              </li>
              <li class="active">
                <div class="calendar-list-time">10:00 AM</div>
                <div>Appointment - Jordan M.</div>
              </li>
              <li>
                <div class="calendar-list-time">11:15 AM</div>
                <div>Follow-Up Call - Alex P.</div>
              </li>
              <li>
                <div class="calendar-list-time">11:45 AM</div>
                <div>Lunch with Stakeholders</div>
              </li>
            </ul>
          </div>
        </div>

        <div class="cards-wrapper-grid">
          <div class="dashboard-card">
            <h4>Lab Results</h4>
            <img src="/img/icon.svg" alt="Icon" />
            <span class="dashboard-card-btn active-btn">3 New Reports to Review</span>
          </div>

          <div class="dashboard-card">
            <h4>Diet & Recipes</h4>
            <img src="/img/icon-2.svg" alt="Icon" />
            <span class="dashboard-card-btn">Add New Diet/Recipes</span>
          </div>
        </div>
      </div>

      <div class="cards-wrapper">
        <div class="dashboard-card messages-card">
          <h4>Messages</h4>

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
        </div>

        <div class="dashboard-card patients-card">
          <h4>Patients</h4>

          <ul>
            <li>
              <img src="/img/image.png" alt="Patient Photo" />
              <div>Howard Aarons</div>
            </li>
            <li>
              <img src="/img/image.png" alt="Patient Photo" />
              <div>Edward Alvarez</div>
            </li>
            <li>
              <img src="/img/image.png" alt="Patient Photo" />
              <div>Emily Atilla</div>
            </li>
            <li>
              <img src="/img/image.png" alt="Patient Photo" />
              <div>Courtney Bailey</div>
            </li>
            <li>
              <img src="/img/image.png" alt="Patient Photo" />
              <div>Karen Bartley</div>
            </li>
            <li>
              <img src="/img/image.png" alt="Patient Photo" />
              <div>Jack Black</div>
            </li>
          </ul>

          <span class="dashboard-card-btn">Add New Patient</span>
        </div>
      </div>

      <div class="cards-wrapper">
        <div class="dashboard-card education-card">
          <h4>Patient Education</h4>

          <ul>
            <li>
              <img src="/img/icon-3.png" alt="Icon" />
              <span class="dashboard-card-btn active-btn">4 Quiz Results to Review</span>
            </li>

            <li>
              <img src="/img/icon-4.png" alt="Icon" />
              <span class="dashboard-card-btn active-btn">2 Questionnaire Results to Review</span>
            </li>
          </ul>
        </div>

        <div class="dashboard-card quotes-card">
          <h4>Inspirational Quotes</h4>

          <p>“Wellness is a connection of paths: knowledge and action.”</p>

          <span class="dashboard-card-btn">Manage Quote of the Day</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      currentDate() {
        let date = new Date();
        let currentWeekday = date.toLocaleString('en-us', {weekday: 'short'});
        let currentMonth = date.toLocaleString('en-us', {month: 'short'});
        let currentDay = date.toLocaleString('en-us', {day: 'numeric'});
        let currentYear = date.toLocaleString('en-us', {year: 'numeric'});
        let currentDate = currentWeekday + ' ' + currentDay + ' ' + currentMonth + ' ' + currentYear;
        return currentDate;
      },

      currentTime() {
        let date = new Date();
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        let am_pm = date.getHours() >= 12 ? "pm" : "am";
        hours = hours < 10 ? "0" + hours : hours;
        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let currentTime = hours + ":" + minutes + " " + am_pm;
        return currentTime;
      }
    }
  };
</script>