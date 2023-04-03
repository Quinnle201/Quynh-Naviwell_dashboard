<template>
    <div>
        <input name="patient_name" class="popup-content-item-input" v-model="searchTerm" />
        <Field name="patient_id" type="hidden" v-model="selectedPt.profile_id"/>
        <ul v-if="searchPatients.length && isSearchShown">
            <li v-for="patient in searchPatients" :key="patient.id" @click="selectPt(patient)">
                {{userName(patient)}}
            </li>
        </ul>
    </div>
</template>

<script>
import { Field } from 'vee-validate';
import userMixin from '@/mixins/user.js'

export default {
    mixins: [
        userMixin
    ],
    components: {
        Field
    },
    props: {
        patients: Object,
        patient: String,
    },
    watch: {
        patient: {
            handler(value) {
                this.searchTerm = value
            },
            immediate: true
            
        },
        searchTerm(newS, oldS) {
            if (this.searchTerm == this.userName(this.selectedPt.name) || this.patient == this.searchTerm) {
                return
            }
            if (this.searchTerm === '') {
                return
            }
            this.isSearchShown = true
            this.$emit('search', newS);
        }
    },
    computed: {
        searchPatients() {
            if (this.searchTerm === '') {
                return []
            }

            let matches = 0
            return this.patients.filter(patient => {
                if (matches < 10) {
                    matches++
                    return patient
                }
            })

        }
    },
    data() {
        return {
            searchTerm: '',
            selectedPt: {profile_id: ''},
            isSearchShown: false
        }
    },
    methods: {
        selectPt(pt) {
            this.searchTerm = this.userName(pt)
            this.selectedPt = pt
            setTimeout(() => {
                this.isSearchShown = false
            }, 100);
            
        }
    },
}
</script>