<script>
import SearchIcon from '../components/icons/IconSearch.vue'
import AddPatientModal from '../components/Dashboard/Layout/AddPatientModal.vue'
import AddIcon from '../components/icons/IconAdd.vue'
import PatientDetails from '../components/Dashboard/Layout/PatientDetails.vue'
import { ref } from 'vue';
import { axiosInstance } from '@/helpers';
import _findIndex from 'lodash/findIndex';
import userMixin from '@/mixins/user.js'

export default {
    components: {
        SearchIcon,
        AddPatientModal,
        AddIcon,
        PatientDetails
    },
    mixins: [
        userMixin
    ],
    data() {
        return {
            patients: [],
            selectedPatient: null,
            isModalVisible: false,
            selected: '',
            options: [
                {
                    text: 'Last visit', value: 'Last visit'
                },
                {
                    text: 'Age', value: 'Age'
                },
                {
                    text: 'Name A-Z', value: 'Name A-Z'
                },
                {
                    text: 'Name Z-A', value: 'Name Z-A'
                },
            ]
        }
    },
    setup() {
        const show = ref(null);

        const showDetails = (idx) => {
            show.value === idx ? (show.value = null) : (show.value = idx);
        };
        
        return {
            show, 
            showDetails
        };
    },
    mounted() {
        this.getPatients();
    },
    computed: {
        age() {
            return (patient) => Math.floor((new Date() - new Date(patient.dob).getTime()) / 3.15576e+10)
        }
    },
    methods: {
        showModal(patient) {
            this.show = null
            this.selectedPatient = patient;
            this.isModalVisible = true;
        },
        closeModal() {
            this.selectedPatient = null;
            this.isModalVisible = false;
        },
        getPatients() {
            axiosInstance.get('/patients')
                .then(response => {
                    this.patients = response.data.patients;
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                });
        },
        updatePatientInfo(patient) {
            const index = _findIndex(this.patients, ['id', patient.id])
            this.patients.splice(index, 1, patient)
        }
    },
};
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>My Patients</h3>
        </div>
        
        <div class="patients-wrapper page-bg">
            <div class="patients-top-wrapper">
                <div class="patient-search-wrapper">
                    <form class="" method="get">
                        <label class="patients-search">
                            <input placeholder="Search" type="search" autocomplete="off">
                            <SearchIcon  class="patients-search-icon" />
                        </label>
                    </form>
                    
                    <select v-model="selected" class="patient-select">
                        <option disabled value="">Sort</option>
                        <option v-for="option in options" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
                
                <div class="add-button" @click="showModal(null)">
                    <AddIcon />
                    <button type="button">Add New Patient</button>
                </div>
            </div>

            <div class="patients-table">
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Next Appointment(incomplete)</th>
                            <th>Quiz Status(incomplete)</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(patient, index) in patients" :key="patient.id">
                            <td class="patients-img">
                                <img src="@/assets/img/image.png" alt="">
                                <RouterLink :to="{ name: 'patient', params: { id: patient.id}}"><span>{{ userName(patient.user) }}</span></RouterLink>
                                
                            </td>
                            <td>{{ age(patient) }}</td>
                            <td>December 22, 2022</td>
                            <td>
                                <div class="label-status incomplete">Incomplete</div>
                                <!-- <div class="label-status complete">Complete</div> -->
                            </td>
                            <td class="patients-details">
                                <img @click="showDetails(index)" src="@/assets/img/details-icon.png" alt="Details Icon" />
                                <Transition>
                                    <PatientDetails v-if="show === index" @update="showModal(patient)" />
                                </Transition>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <AddPatientModal v-show="isModalVisible" :patient="selectedPatient" v-on:update:patient="updatePatientInfo($event)" @close="closeModal"></AddPatientModal>
    </div>
</template>