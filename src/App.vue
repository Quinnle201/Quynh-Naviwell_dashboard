<script setup>
import { ref, onMounted, watch } from 'vue'

import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/stores';
import Alert from '@/components/Alert.vue'

const authStore = useAuthStore();
const route = useRoute()
const currentRoute = ref('')

onMounted(() => {
  if (authStore.user && authStore.claim) {
    authStore.getUser()
  }

})

watch(route, (to) => {
  currentRoute.value = to.path;
});

function checkPath(path) {
  if (currentRoute.value === path) {
    return true;
  }
}

</script>

<template>
  <div class="app-container" :class="authStore.user, checkPath('/home') ? '' : 'pg-header'">
    <RouterView />
    <Alert />
  </div>  
</template>