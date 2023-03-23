import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { getFileUrlFromRef } from '@/helpers';

export const useClinicStore = defineStore('clinic', () => {
    const clinic = ref({ id: '', name: '', description: '', logo: '', address: '' })
    const logoRef = ref(null);


    watch(clinic, async (value, oldVal) => {
        if(value.logo && !logoRef.value) {
            const link = await getFileUrlFromRef(`${value.id}/logo`, value.logo);
            logoRef.value = link
        }
      })


    return { clinic, logoRef }
})