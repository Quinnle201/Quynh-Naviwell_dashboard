<script setup>
import { RouterView } from 'vue-router'

import { useAuthStore } from '@/stores';
import Alert from '@/components/Alert.vue'

const authStore = useAuthStore();

</script>

<template>
  <div class="app-container" :class="authStore.user, checkPath('/home') ? '' : 'pg-header'">
    <RouterView />
    <Alert />
  </div>  
</template>

<script>
  export default {
    data() {
      return {
          currentRoute: ''
      };
    },
    watch: {
      $route (to, from) {
        this.currentRoute = to.path;
      }
    },
    mounted() {
      this.currentRoute = this.$route.path;
    },
    methods: {
      checkPath(path) {
        if(this.currentRoute === path) {
            return true;
        }
      }
    }
  }
</script>