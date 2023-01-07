<script setup>
import { RouterView } from 'vue-router'

import { useAuthStore } from '@/stores';
import Alert from '@/components/Alert.vue'

const authStore = useAuthStore();

</script>

<template>
  <div class="app-container" :class="authStore.user">
    <Alert />
    <RouterView />
  </div>  
</template>