<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import AddPatientModal from './AddModal.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import PatientDetails from '@/components/Patient/PatientDetails.vue'
import CheckIcon from '@/components/icons/IconCheck.vue'
import CalendarIcon from '@/components/icons/IconCalendar.vue'
import Modal from '@/components/Modals/Modal.vue'
import DeleteModal from '@/components/Modals/DeleteModal.vue'

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';
import _findIndex from 'lodash/findIndex';
import userMixin from '@/mixins/user.js'
import { Form, Field } from 'vee-validate';

export default {
    components: {
        SearchIcon,
        AddPatientModal,
        AddIcon,
        PatientDetails,
        Modal,
        Form,
        Field,
        CheckIcon,
        CalendarIcon,
        DeleteModal
    },
    mixins: [
        userMixin
    ],
    data() {
        const alertStore = useAlertStore();
        return {
            alertStore,
            show: null,
            patients: [],
            selectedPatient: null,
            isModalVisible: false,
            isScheduleModalVisible: false,
            isDeleteModalVisible: false,
            medsData: false,
            count: 3,
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
    mounted() {
        this.getPatients();
    },
    computed: {
        age() {
            return (patient) => Math.floor((new Date() - new Date(patient.dob).getTime()) / 3.15576e+10)
        },
        hoursSelect() {
            const array = []
            var min = ['00', '15', '30', '45'];
            for (var h = 8; h < 18; h++) {
                for (var m = 0; m < min.length; m++) {
                    var hour = h;
                    if (hour < 10) {
                        hour = `0${h}`
                    }
                    array.push({ 'label': `${hour}:${min[m]}`, 'value': `${hour}:${min[m]}` })
                }
            }
            return array
        },
    },
    methods: {
        submitVisit(values) {
            const selectedDay = values.date
            values.start_time = new Date(`${selectedDay}T${values.from}`);
            values.finish_time = new Date(`${selectedDay}T${values.to}`);
            axiosInstance.post('/appointments', values)
                    .then(response => {
                        this.closeScheduleModal()
                        this.alertStore.success('Appointment set')
                    })
                    .catch(error => {
                        this.alertStore.error(error.response.data.message)
                    });
        },
        showScheduleModal(patient) {
            this.show = null
            this.isScheduleModalVisible = true
            this.$refs.visitForm.setFieldValue('patient_id', patient.id)
        },
        closeScheduleModal(){
            this.isScheduleModalVisible = false
            this.$refs.visitForm.setValues({})
        },
        showDetails(idx) {
            this.show === idx ? (this.show = true) : (this.show = idx);
        },
        closeDetails() {
            this.show = false;
        },
        showModal(patient) {
            this.show = null;
            this.selectedPatient = patient;
            this.isModalVisible = true;
        },
        closeModal() {
            this.selectedPatient = null;
            this.isModalVisible = false;
        },
        showDeleteModal() {
            this.show = null;
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal() {
            this.show = null;
            this.isDeleteModalVisible = false;
        },
        showMedsModal() {
            this.medsData = true;
        },
        closeMedsModal() {
            this.medsData = false;
        },
        addMeds: function () {
            if (this.count < 50) this.count++;
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
                        <label class="patients-search search-input">
                            <input placeholder="Search" type="search" autocomplete="off">
                            <SearchIcon />
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
                                    <PatientDetails v-if="show === index" @update="showModal(patient)" @calendar="showScheduleModal(patient)" @close="closeDetails" @delete="showDeleteModal" />
                                </Transition>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <AddPatientModal v-show="isModalVisible" :patient="selectedPatient" v-on:update:patient="updatePatientInfo($event)" @close="closeModal" @showMeds="showMedsModal()"></AddPatientModal>

        <Modal v-show="medsData" @close="closeMedsModal">
            <template #header>Medications and Supplements</template>
            <template #content>
                <form>
                    <div class="popup-content-item meds-input bl-bg">
                        <input class="popup-content-item-input" type="text" placeholder="Medication Name, Dosage, Frequency" :name="`text[${key - 1}]`" v-for="key in count"
                            :key="key" :id="key" />
                    </div>

                    <button type="button" class="meds-button" @click="addMeds">Add Medication or Supplement</button>
                    
                    <div class="popup-footer">
                        <button type="reset" class="w-btn w-btn-close" @click="closeMedsModal">
                            Cancel
                        </button>
                        <button type="submit" class="w-btn">
                            Save
                        </button>
                    </div>
                </form>
            </template>
        </Modal>

        <Modal v-show="isScheduleModalVisible" @close="closeScheduleModal">
            <template #header>Schedule</template>
            <template #content>
                <div class="type-select">
                    <div class="type-select-item active">Appointment</div>
                    <div class="type-select-item">Telehealth</div>
                    <div class="type-select-item">Personal</div>
                </div>
                <Form @submit="submitVisit" ref="visitForm">
                    <Field type="hidden" name="patient_id"/>
                    <div class="popup-content-item visit-type">
                        <label class="checkbox path">
                            <Field type="radio" name="visit_type" value="initial"></Field>
                            <CheckIcon />
                            <div class="label-bg">Initial NaviWell Visit</div>
                        </label>
                        <label class="checkbox path">
                            <Field type="radio" name="visit_type" value="wellness"></Field>
                            <CheckIcon />
                            <div class="label-bg">Wellness Coach Visit</div>
                        </label>
                        <label class="checkbox path">
                            <Field type="radio" name="visit_type" value="dietitian"></Field>
                            <CheckIcon />
                            <div class="label-bg">Dietitian Visit</div>
                        </label>
                        <label class="checkbox path">
                            <Field type="radio" name="visit_type" value="followup"></Field>
                            <CheckIcon />
                            <div class="label-bg">Follow-Up Visit</div>
                        </label>
                    </div>

                    <div class="popup-content-item">
                        <label class="label-w-icon">Date
                            <Field name="date" type="date" class="popup-content-item-input"></Field>
                            <CalendarIcon />
                        </label>
                    </div>

                    <div class="popup-content-item-wrapper">
                        <div class="popup-content-item">
                            <label>From</label>
                            <Field as="select" name="from">
                                <option v-for="item in hoursSelect" :value="item.value">{{ item.label }}
                                </option>
                            </Field>
                        </div>

                        <div class="popup-content-item">
                            <label>To</label>
                            <Field as="select" name="to">
                                <option v-for="item in hoursSelect" :value="item.value">{{ item.label }}
                                </option>
                            </Field>
                        </div>
                    </div>

                    <div class="popup-content-item">
                        <label for="textarea">Notes</label>
                        <Field as="textarea" name="notes"></Field>
                    </div>

                    <div class="popup-footer">
                        <button type="reset" class="w-btn w-btn-close" @click="closeScheduleModal">
                            Cancel
                        </button>
                        <button type="submit" class="w-btn">
                            Save Event
                        </button>
                    </div>
                </form>
            </template>
        </Modal>

        <DeleteModal v-show="isDeleteModalVisible" @close="closeDeleteModal">
            <template #content>
                <h4>Delete this patient?</h4>
                <p>You will not be able to recover it</p>
            </template>
        </DeleteModal>
    </div>
</template>