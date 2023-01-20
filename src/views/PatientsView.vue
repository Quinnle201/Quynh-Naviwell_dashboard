<script>
import SearchIcon from '../components/icons/IconSearch.vue'
import AddPatientModal from '../components/Dashboard/Layout/AddPatientModal.vue'
import AddIcon from '../components/icons/IconAdd.vue'
import PatientDetails from '../components/Dashboard/Layout/PatientDetails.vue'
import { ref } from 'vue';

export default {
    components: {
        SearchIcon,
        AddPatientModal,
        AddIcon,
        PatientDetails
    },
    data() {
        return {
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
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
    },
};
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>My Patients</h3>
        </div>
        
        <div class="patients-wrapper">
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
                
                <div class="add-button" @click="showModal">
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
                            <th>Next Appointment</th>
                            <th>Quiz Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index) in 6" :key="index">
                            <td class="patients-img">
                                <img src="@/assets/img/image.png" alt="">
                                <span>Howard Aarons</span>
                            </td>
                            <td>36</td>
                            <td>December 22, 2022</td>
                            <td>
                                <div class="patients-status incomplete">Incomplete</div>
                                <!-- <div class="patients-status complete">Complete</div> -->
                            </td>
                            <td class="patients-details">
                                <img @click="showDetails(index)" src="@/assets/img/details-icon.png" alt="Details Icon" />
                                <Transition>
                                    <PatientDetails v-if="show === index" />
                                </Transition>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <AddPatientModal v-show="isModalVisible" @close="closeModal"></AddPatientModal>
    </div>
</template>