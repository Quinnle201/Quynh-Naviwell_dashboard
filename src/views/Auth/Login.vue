<script setup>
import { useAuthStore, useClinicStore } from "@/stores";
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

const email = ref("");
const password = ref("");
const checked = ref(false);
const isLoading = ref(false);
const clinicStore = useClinicStore();

const clinic = computed(() => {
  return clinicStore.clinic;
});

async function onSubmit() {
  isLoading.value = true;
  const authStore = useAuthStore();
  const loggedIn = await authStore.login(email.value, password.value);
  if (!loggedIn) {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-inner">
      <div class="login-inner-logo">
        <img src="@/assets/img/naviwell-logo.png" alt="NaviWell Logo" />
      </div>

      <div class="login-form">
        <div class="login-form-img">
          <img
            v-if="clinicStore.logoRef"
            :src="clinicStore.logoRef"
            :alt="clinic.name + ' Logo'"
          />
          <div>
            <span>{{ clinic.name }}</span>
            <span>{{ clinic.description }}</span>
          </div>
        </div>

        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label>Email</label>
            <input
              name="email"
              v-model="email"
              type="email"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              name="password"
              v-model="password"
              type="password"
              class="form-control"
            />
            <div style="text-align: right;">
            <RouterLink to="/reset-password" class="forgot-pass"
              >Forgot password?</RouterLink
            >
            </div>
          </div>
          <div class="form-group login-btn">
            <div class="login-checkbox">
              <label for="remenber">
                <input
                  type="checkbox"
                  id="remember"
                  v-model="checked"
                  name="remember"
                  value=""
                />
                Remember me
              </label>
            </div>

            <button :disabled="isLoading">
              <div v-if="isLoading" id="loading"></div>
              <template v-else>Login</template>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  background-color: #f4f4ff;
  height: 100vh;
  margin: -4rem -0.5rem 0 -7rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-inner {
  max-width: 480px;
  width: 100%;
  margin-top: -100px;
}

.login-inner-logo img {
  max-height: 19vh;
  margin: 0 auto;
}

.login-form {
  background-color: #ffffff;
  width: 100%;
  margin: 80px auto 0;
  padding: 35px 30px;
  border-radius: 10px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
}

.login-form-img {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form-img img {
  max-width: 90px;
  max-height: 90px;
}

.login-form-img div {
  margin-left: 4px;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat";
  color: #5c90f1;
}

.login-form-img div span {
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
}

.login-form-img div span:first-child {
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
}

.login-form form {
  margin-top: 35px;
}

.login-form .form-group {
  margin-bottom: 16px;
}

.login-form .form-group:last-child {
  margin-bottom: 0;
}

.login-form .form-group label {
  all: revert;
  appearance: auto !important;
  font-size: 16px;
  font-weight: 500;
}

.login-form .form-group input {
  height: 50px;
}

.login-form .login-btn {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.login-form .login-btn button {
  background-color: #5c90f1;
  min-width: 155px;
  width: auto;
  height: 40px;
  padding: 0 32px;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  line-height: 40px;
  border-radius: 20px;
}

.login-form .login-btn .login-checkbox input[type="checkbox"] {
  all: revert;
  appearance: auto !important;
  -webkit-appearance: checkbox !important;
  -moz-appearance: checkbox !important;

  width: 16px !important;
  height: 16px !important;
  margin-right: 3px;
  cursor: pointer;
  accent-color: #5c90f1;
}

.login-checkbox label::after,
.login-checkbox label::before {
  content: none !important;
}

.login-checkbox {
  display: flex;
  align-items: center;
  gap: 1px;
}

.forgot-pass {
  margin-top: 8px;
  font-size: 16px;
  color: var(--primary);
  text-align: right;
  cursor: pointer;
}

@media screen and (max-width: 768px), screen and (max-height: 700px) {
  .login-wrapper {
    margin: -4rem 0 0;
  }
  .login-inner {
    margin-top: 0;
  }
}

@media screen and (max-width: 576px) {
  .login-inner {
    max-width: 85%;
  }

  .login-inner-logo img {
    max-width: 180px;
  }

  .login-form {
    margin-top: 40px;
    padding: 18px 16px;
  }

  .login-form .login-btn {
    margin-top: 8px;
    align-items: center;
  }

  .login-form .login-btn button {
    min-width: auto;
    width: auto;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
  }
}

@media screen and (max-width: 375px) {
  .login-inner {
    max-width: 95%;
  }
}
</style>
