<template>
  <div class="review-access-wrapper">
    <div class="review-access-container">
      <!-- Logo -->
      <div class="logo-header">
        <img src="@/assets/img/naviwell-logo.png" alt="NaviWell Logo" class="login-logo" />
      </div>

      <!-- Centered heading -->
      <h1 class="center-heading">A new sign-in device detected!</h1>
      <div class="header-line"></div>

      <!-- Notification body -->
      <div class="email-body">
        <p>We've detected a new sign-in to your account from an {{ device }}.</p>

        <!-- Action -->
        <p class="instruction-text">
          Please review this access immediately by clicking the button below:
        </p>

        <div class="action-button-container">
          <button @click="checkActivity" class="action-button">
            Check Activity
          </button>
        </div>

        <p class="security-note">
          Clicking the button above will take you to a secure page where you
          <strong>confirm this device is legitimate</strong> or
          <strong>trigger a password reset</strong> if you don't recognize
          the activity.
        </p>

        <div class="footer-line"></div>

        <p class="footer-help">
          If you have issues accessing your account, please
          <router-link :to="supportLink" class="action-link">
            contact support
          </router-link>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const device = route.query.device || "Unknown Device";
const recipient = route.query.recipient || "User";
const supportLink = "/support";

const checkActivity = () => {
  router.push({
    name: "checkActivity",
    query: { device, recipient },
  });
};
</script>

<style scoped>
.review-access-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #ffffff;
  font-family: 'Montserrat', sans-serif;
}

.review-access-container {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  text-align: center;
}

.logo-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}
.login-logo {
  max-height: 80px;
}

.center-heading {
  text-align: center;
  margin-bottom: 20px;
}

.header-line, .footer-line {
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
}

.email-body p {
  margin: 10px 0;
  color: #333;
  line-height: 1.5;
}

.instruction-text {
  margin-bottom: 15px;
}

.action-button-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.action-button {
  background-color: #007bff;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
.action-button:hover {
  background-color: #0056b3;
}

.security-note {
  font-style: italic;
  font-size: 0.85em;
  margin-bottom: 20px;
}

.action-link {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}
.action-link:hover {
  text-decoration: underline;
}

.footer-help {
  color: #666;
  font-size: 0.85em;
}
</style>
