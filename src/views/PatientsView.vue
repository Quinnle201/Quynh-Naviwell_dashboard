<script>
import SearchIcon from '../components/icons/IconSearch.vue'
import AddIcon from '../components/icons/IconAdd.vue'
import PatientDetails from '../components/Dashboard/Layout/PatientDetails.vue'
import { ref } from "vue";

export default {
    components: {
        SearchIcon,
        AddIcon,
        PatientDetails
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
    }
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

                    <select class="patient-select">
                        <option value="">Sort</option>
                        <option value="1">Last visit</option>
                        <option value="2">Age</option>
                        <option value="3">Name A-Z</option>
                        <option value="4">Name Z-A</option>
                    </select>
                </div>
                
                <div class="patients-button">
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
    </div>
</template>