<script setup>
import { storeToRefs } from 'pinia';

import { useAlertStore } from '@/stores';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
    <div v-if="alert" class="position-absolute bottom-0 end-0">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            {{alert.message}}
            <button @click="alertStore.clear()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
</template>