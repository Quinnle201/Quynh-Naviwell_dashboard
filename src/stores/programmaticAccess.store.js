import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProgrammaticAccesStore = defineStore('programmaticAccess', () => {
  const accessPage = ref(null)
  const getAccessPage = computed(() => accessPage.value)
  function setAccessPage(val) {
    accessPage.value = val
    if(val){
        this.router.replace({name: val})
    }
    
  }

  return { setAccessPage, getAccessPage }
})
