<script setup>
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores';

const alertStore = useAlertStore();
const { alerts } = storeToRefs(alertStore);
</script>

<template>
    <TransitionGroup tag="div" name="slide-fade" class="alert-block position-sticky bottom-0 end-0">
        <div v-for="alert in alerts" class="alert alert-dismissible" :class="alert.type" role="alert" :key="alert.uid"
            @click="alertStore.cancelTimer(alert.uid)">
            {{ alert.message }}
            <button @click="alertStore.remove(alert.uid)" type="button" class="btn-close" aria-label="Close"></button>
        </div>
    </TransitionGroup>
</template>

<style>
.alert-block {
    float: right;
}

.slide-fade-move,
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.7s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(30px) !important;
}
</style>