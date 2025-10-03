<template>
  <div class="email-container">
    <div class="email-header">
      <div class="logo-placeholder">
        <svg viewBox="0 0 100 100" class="logo-icon">
          <circle cx="50" cy="50" r="45" fill="#007bff" />
          <path d="M50 20L30 80H70L50 20Z" fill="#fff" />
        </svg>
      </div>
      <div class="header-line"></div>
    </div>

    <div class="email-body">
      <p>Dear {{ recipientName }},</p>

      <p>
        This is an important security notification. Your
        <strong>{{ accountService }}</strong> patient account was just accessed
        from a <strong>new device or location</strong>.
      </p>

      <div class="details-block">
        <p><strong>Access Details:</strong></p>
        <p>Device/Browser: <strong>{{ deviceApp }}</strong></p>
        <p>IP address: <strong>{{ ipAddress }}</strong></p>
        <p>Time of Access: {{ loginTime }}</p>
      </div>

      <p class="section-title">What should I do now?</p>

      <p class="instruction-text">
        Please review this access immediately by clicking one of the buttons below:
      </p>

      <div class="action-button-container">
        <button @click="goToReviewAccess" class="action-button">
          Review
        </button>
        <button @click="triggerReset" class="action-button btn-danger">
          Reset
        </button>
      </div>

      <p class="security-note">
        Clicking the buttons above will take you to a secure page where you can
        <strong>confirm this device is legitimate</strong> or
        <strong>trigger a password reset</strong> if you don't recognize the
        activity.
      </p>

      <div class="footer-line"></div>

      <p class="recommendation-text">
        For your security, we also strongly recommend you
        <router-link :to="twoFactorLink" class="action-link">
          enable <strong>two-factor authentication</strong> (2FA)
        </router-link>
        on your account.
      </p>

      <p class="footer-help">
        If you are unable to access your account or have concerns, please
        <router-link :to="supportLink" class="action-link">contact our support team</router-link>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  recipientName: { type: String, required: true },
  accountService: { type: String, required: true },
  deviceApp: { type: String, required: true },
  ipAddress: { type: String, required: true },
  loginTime: { type: String, required: true },
  alertActionLink: { type: String, default: '/security/review-access' },
  twoFactorLink: { type: String, default: '/my-settings/security#2fa' },
  supportLink: { type: String, default: '/support' },
});

const router = useRouter();

// Navigate to ReviewAccess page with query parameters
const goToReviewAccess = () => {
  router.push({
    path: props.alertActionLink,
    query: {
      device: props.deviceApp,
      ip: props.ipAddress,
      time: props.loginTime,
      recipient: props.recipientName,
    },
  });
};

// Navigate to Reset Password page
const triggerReset = () => {
  router.push({
    path: '/reset-password',
    query: { recipient: props.recipientName }
  });
};
</script>

<style scoped>
.email-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 30px;
  background-color: #fff;
  font-family: 'Montserrat', sans-serif;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.email-header { text-align: center; padding-bottom: 20px; }
.logo-placeholder { width: 50px; height: 50px; margin: 0 auto 10px; }
.logo-icon { width: 100%; height: 100%; }
.header-line, .footer-line { height: 1px; background-color: #e0e0e0; margin: 20px 0; }

.details-block {
  background-color: #f4f8fb;
  padding: 20px;
  margin: 25px 0;
  border-radius: 4px;
}

.section-title { font-weight: bold; font-size: 1.1em; color: #0056b3; margin-top: 25px; }
.instruction-text { margin-bottom: 15px; }

/* Buttons inline */
.action-button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.action-button {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  min-width: 120px;
  text-align: center;
}
.action-button:hover { background-color: #0056b3; }

.btn-danger {
  background-color: #dc3545;
}
.btn-danger:hover { background-color: #bd2130; }

.security-note {
  font-style: italic;
  font-size: 0.85em;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
}

.action-link { color: #007bff; text-decoration: none; font-weight: bold; }
.action-link:hover { text-decoration: underline; }
.footer-help { color: #666; font-size: 0.85em; }
</style>
