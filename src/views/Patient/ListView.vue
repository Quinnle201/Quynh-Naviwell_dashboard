<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import AddPatientModal from './AddModal.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import PatientDetails from '@/components/Patient/PatientDetails.vue'
import Modal from '@/components/Modals/Modal.vue'
import DeleteModal from '@/components/Modals/DeleteModal.vue'
import ScheduleModal from '@/components/Modals/ScheduleModal.vue'

import { axiosInstance } from '@/helpers';
import { useAlertStore, useFileStore } from '@/stores';
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
        DeleteModal,
        ScheduleModal
    },
    mixins: [
        userMixin
    ],
    data() {
        const alertStore = useAlertStore();
        const fileStore = useFileStore();
        return {
            alertStore,
            fileStore,
            show: null,
            patients: [],
            selectedPatient: null,
            isModalVisible: false,
            isScheduleModalVisible: false,
            isDeleteModalVisible: false,
            isChatModalVisible: false,
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
        apptDate(){
            return (appt) => {
                if (!appt) {
                    return ""
                }
                return new Date(appt.start_time).toDateString()
            }
        }
    },
    methods: {
        showScheduleModal(patient) {
            this.show = null
            this.isScheduleModalVisible = true
            this.selectedPatient = patient
        },
        closeScheduleModal() {
            this.isScheduleModalVisible = false
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
        showChatModal(patient) {
            this.show = null;
            this.isChatModalVisible = true;
            this.selectedPatient = patient
        },
        closeChatModal() {
            this.show = null;
            this.isChatModalVisible = false;
            this.selectedPatient = null
        },
        getPatients() {
            axiosInstance.get('/patients')
                .then(response => {
                    this.patients = response.data.data.patients;
                    this.patients.forEach(pt => {
                        this.fileStore.getPhotoLinkForUser(pt.user)
                    });
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                });
        },
        updatePatientInfo(patient) {
            const index = _findIndex(this.patients, ['id', patient.id])
            this.patients.splice(index, 1, patient)
        },
        sendMessage(values) {
            const formBody = {
                attachments: [],
                message: values.message
            }
            axiosInstance.post("/messages", { body: formBody, patient_id: this.selectedPatient.id })
                .then(response => {
                    this.$refs.messageForm.setValues({})
                    this.alertStore.success('Message sent.');
                    this.closeChatModal()
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
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
                            <th>Next Appointment</th>
                            <th>Quiz Status(incomplete)</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(patient, index) in patients" :key="patient.id">
                            <td class="patients-img">
                                <img :src="fileStore.profileAvatars(patient.user)" alt="">
                                <RouterLink :to="{ name: 'patient', params: { id: patient.id } }"><span>{{
                                    userName(patient.user)
                                }}</span></RouterLink>

                            </td>
                            <td>{{ age(patient) }}</td>
                            <td> {{ apptDate(patient.appointments[0]) }}</td>
                            <td>
                                <div class="label-status incomplete">Incomplete</div>
                                <!-- <div class="label-status complete">Complete</div> -->
                            </td>
                            <td class="patients-details">
                                <img @click="showDetails(index)" src="@/assets/img/details-icon.png"
                                    alt="Details Icon" />
                                <Transition>
                                    <PatientDetails v-if="show === index" @update="showModal(patient)"
                                        @chat="showChatModal(patient)" @calendar="showScheduleModal(patient)"
                                        @close="closeDetails" @delete="showDeleteModal" />
                                </Transition>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <AddPatientModal v-show="isModalVisible" :patient="selectedPatient"
            v-on:update:patient="updatePatientInfo($event)" @close="closeModal"></AddPatientModal>

        <Modal v-show="isChatModalVisible" @close="closeChatModal">
            <template #header>Send Message  {{ selectedPatient ? 'to ' + userName(selectedPatient.user) : '' }}</template>
            <template #content>
                <Form @submit="sendMessage" ref="messageForm">
                    <div class="popup-content-item popup-content-item-textarea">
                        <Field as="textarea" name="message" placeholder="Type a message..."></Field>
                    </div>

                    <div class="popup-footer">
                        <button type="reset" class="w-btn w-btn-close" @click="closeScheduleModal">
                            Cancel
                        </button>
                        <button type="submit" class="w-btn">
                            Send
                        </button>
                    </div>
                </Form>
            </template>
        </Modal>

        <ScheduleModal v-show="isScheduleModalVisible" @close="closeScheduleModal" :patient_id="selectedPatient?.id" />

        <DeleteModal v-show="isDeleteModalVisible" @close="closeDeleteModal">
            <template #content>
                <h4>Delete this patient?</h4>
                <p>You will not be able to recover it</p>
            </template>
        </DeleteModal>
    </div>
</template>