<template>
    <div>
        <input name="patient_name" class="popup-content-item-input" v-model="searchTerm" />
        <Field name="patient_id" type="hidden" v-model="selectedPt.profile_id" />
        <ul v-if="searchPatients.length && isSearchShown">
            <li v-for="patient in searchPatients" :key="patient.id" @click="selectPt(patient)">
                {{ patient.first_name }} {{ patient.last_name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { Field } from 'vee-validate';

export default {
    components: {
        Field
    },
    props: {
        patients: Object
    },
    watch: {
        searchTerm(newS, oldS) {
            if (this.searchTerm == this.name(this.selectedPt).value) {
                return
            }
            this.isSearchShown = true
            this.$emit('search', newS);
        }
    },
    setup(props) {
        const searchPatients = computed(() => {
            if (searchTerm.value === '') {
                return []
            }

            let matches = 0
            return props.patients.filter(patient => {
                if (matches < 10) {
                    matches++
                    return patient
                }
            })
        });

        const name = (patient) => computed(() => {
            return patient.first_name + ' ' + patient.last_name
        });

        let searchTerm = ref('')

        const selectPt = (pt) => {
            searchTerm.value = name(pt).value
            selectedPt.value = pt
            isSearchShown.value = false
        }

        let selectedPt = ref('')
        let isSearchShown = ref(false)
        return {
            isSearchShown,
            searchTerm,
            searchPatients,
            selectPt,
            selectedPt,
            name
        }
    }
}
</script>