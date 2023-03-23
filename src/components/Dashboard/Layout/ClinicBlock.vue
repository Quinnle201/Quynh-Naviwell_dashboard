<template>
    <div class="top-block-logo">
        <img v-if="clinicStore.logoRef" :src="clinicStore.logoRef" :alt="clinic.name + ' Logo'" />
        <div class="top-block-info_text">
            <span>{{ clinic.name }}</span>
            <span>{{ clinic.description }}</span>
        </div>
    </div>
</template>

<script>
import { useClinicStore } from '@/stores';

export default {
    data() {
        const clinicStore = useClinicStore();
        return { clinicStore }
    },
    computed: {
        clinic() {
            return this.clinicStore.clinic;
        }
    }
};
</script>