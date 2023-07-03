<script setup>
import { ref, onMounted, watch } from 'vue'

import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

import { useAuthStore, useAlertStore, useClinicStore } from '@/stores';
import { axiosInstance } from '@/helpers';

import Alert from '@/components/Alert.vue'

const authStore = useAuthStore();
const alertStore = useAlertStore();
const clinicStore = useClinicStore();
const route = useRoute()
const currentRoute = ref('')

onMounted(() => {

  var subdomain = window.location.host.split('.')[0];
  var domain = import.meta.env.VITE_DOMAIN;

  if (subdomain != domain && subdomain != "www") {
    axiosInstance.defaults.baseURL = `${import.meta.env.VITE_API_URL}/${subdomain}`
  } else {
    alert("Should not be accessed")
  }

  //Check that this tenant exists:
  axiosInstance.get('/')
    .then(response => {
      clinicStore.clinic = response.data.data;
    })
    .catch(error => {
      alertStore.error(error.response.data.message) // -> TODO - change to 404 or redirect to naviwell main page
    });

  if (authStore.user && authStore.claim) {
    authStore.getUser()
  }

})
</script>

<template>
  <div class="app-container"
    :class="authStore.isPatient ? 'pt-header' : 'pg-header'">
    <RouterView />
    <Alert />
  </div>
</template>