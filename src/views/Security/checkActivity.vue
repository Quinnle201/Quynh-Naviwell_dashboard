<template>
  <div class="review-access-wrapper">
    <div class="review-access-container">
      <!-- Logo & Company Name -->
      <div class="logo-header">
        <img src="@/assets/img/naviwell-logo.png" alt="NaviWell Logo" class="login-logo" />
      </div>
      <div class="header-line"></div>

      <!-- Notification body -->
      <div class="email-body">

        <!-- Access details -->
        <div class="details-block">
          <p><strong>Access Details:</strong></p>
          <p>Device/Browser: <strong>{{ device }}</strong></p>
          <p>IP Address: <strong>{{ ip }}</strong></p>
          <p>Time of Access: <strong>{{ time }}</strong></p>
        </div>

        <!-- Action -->
        <p class="instruction-text">
          Please review this access immediately by clicking one of the buttons below:
        </p>

        <div class="action-button-container">
          <button @click="confirmDevice" class="action-button">
            Confirm Device
          </button>
          <button @click="resetPassword" class="action-button btn-danger">
            Reset Password
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const device = route.query.device || "Unknown Device";
const ip = route.query.ip || "Unknown IP";
const time = route.query.time || "Unknown Time";
const recipient = route.query.recipient || "User";
const supportLink = "/support";

const confirmDevice = async () => {
  try {
    await authStore.trustDevice({ device, ip, recipient });
    alert("Device confirmed.");
  } catch {
    alert("Failed to confirm device.");
  }
};

const resetPassword = async () => {
  try {
    await authStore.requestResetPassword(recipient);
    alert("Password reset requested.");
    router.push({ name: "resetpassword" });
  } catch {
    alert("Failed to reset password.");
  }
};
</script>

<style scoped>
.review-access-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
}

.logo-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}
.login-logo {
  max-height: 80px;
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

.details-block {
  background-color: #f4f8fb;
  padding: 20px;
  margin: 20px 0;
  border-radius: 4px;
}

.section-title {
  font-weight: bold;
  font-size: 1.1em;
  color: #0056b3;
  margin-top: 20px;
}
.instruction-text {
  margin-bottom: 15px;
}

.action-button-container {
  display: flex;          /* side by side */
  justify-content: center;/* center the buttons */
  gap: 10px;              /* spacing between buttons */
  margin: 20px 0;
}

.action-button {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;      /* smaller padding for shorter buttons */
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  min-width: 120px;       /* consistent button width */
  text-align: center;
}

.action-button:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #bd2130;
}


.security-note {
  font-style: italic;
  font-size: 0.85em;
  text-align: center;
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
  text-align: center;
}
</style>
