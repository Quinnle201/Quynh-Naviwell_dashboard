<script>
import ChatIcon from '@/components/icons/IconChat.vue'
import VideoIcon from '@/components/icons/IconVideo.vue'
import MessagesIcon from '@/components/icons/IconMessages.vue'
import CalendarIcon from '@/components/icons/IconCalendar.vue'
import RoundBtn from '@/components/Buttons/RoundBtn.vue'
import RoundBtnDelete from '@/components/Buttons/RoundBtnDelete.vue'
import LineChart from '@/components/LineChart.vue'
import AddPatientModal from './AddModal.vue'
import Modal from '@/components/Modals/Modal.vue'
import DeleteModal from '@/components/Modals/DeleteModal.vue'
import EditIcon from '@/components/icons/IconEdit.vue'
import RemoveIcon from '@/components/icons/IconRemoveCircle.vue';
import AddIcon from '@/components/icons/IconAdd.vue';

import ScheduleModal from '@/components/Modals/ScheduleModal.vue'
import EmailModal from '@/components/Modals/EmailModal.vue'

import { Form, Field, FieldArray } from 'vee-validate';
import { RouterLink } from 'vue-router'
import { axiosInstance, uploadFile, downloadFile } from '@/helpers';
import { useAlertStore, useFileStore } from '@/stores';
import _find from 'lodash/find'
import userMixin from '@/mixins/user.js'

import { calculateBMI } from '@/helpers';

export default {
    components: {
        ChatIcon,
        VideoIcon,
        MessagesIcon,
        CalendarIcon,
        RoundBtn,
        RoundBtnDelete,
        LineChart,
        Modal,
        AddPatientModal,
        ScheduleModal,
        EmailModal,
        DeleteModal,
        Form,
        Field,
        FieldArray,
        EditIcon,
        RemoveIcon,
        AddIcon
    },
    mixins: [
        userMixin
    ],
    data() {
        const patient = null
        const fileStore = useFileStore()
        const alertStore = useAlertStore();

        const dataChart = {
            data: {
                datasets: [{
                    type: 'line',
                    label: "Weight",
                    id: 'weight',
                    data: [],
                    borderColor: "#4766FF",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'scatter',
                    showLine: true,
                    label: "Blood Presure",
                    id: 'bp',
                    data: [],
                    borderColor: "#73D44D",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    label: "Resting Heart Rate",
                    id: 'resting_hr',
                    data: [],
                    borderColor: "#FF4D4D",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    label: "Body Fat",
                    id: 'bodyfat',
                    data: [],
                    borderColor: "#FFB54F",
                    borderWidth: 2,
                    fill: false,
                },
                ],
                labels: []
            },
            options: {
                responsive: true,
                lineTension: 1,
                scales: {
                    xAxes: [{
                        // display: false
                    }],
                    yAxes: [{
                        // display: false
                    }],
                },
            },
        }
        const dataLoaded = false;

        return { patient, patient_id: null, alertStore, fileStore, dataChart, dataLoaded, isModalVisible: false, updateModal: false, healthData: false, isDeleteModalVisible: false, isScheduleModalVisible: false, isEmailModalVisible: false, medsData: false, isChatModalVisible: false, medicineArray: [], patientDrugs: [], userPrimaryDiag: null, dxCodes: [], }
    },
    async mounted() {
        await this.getMedicine()
        await this.getDxCodes()
        const id = this.$route.params.id;
        this.getPatientById(id)
        this.getPatientHealthData(id)
    },
    methods: {
        async getMedicine() {
            try {
                const response = await axiosInstance.get('/medicine')
                this.medicineArray = response.data.map(code => {
                    return { 'name': code.name, 'value': code.id };
                });
            } catch (error) {
                console.log(error)
            }
        },
        getPatientById(id) {
            axiosInstance.get(`/patients/${id}`)
                .then(response => {
                    this.patient = response.data.data;
                    this.userPrimaryDiag = this.patient.dxcode
                    this.fileStore.getPhotoLinkForUser(this.patient.user)

                    this.patientDrugs = []
                    if(this.patient.meds) {
                        this.patient.meds.forEach((med, index) => {
                            var medValue = ""
                            var medType = ""
                            const medArray = med.split(":");
                            medType = medArray[0].trim();
                            medValue = medArray[1].trim();
                            this.patientDrugs.push({ type: medType, amount: medValue });

                        });
                    }

                    if (this.patientDrugs.length == 0) {
                        this.patientDrugs.push({ type: '', amount: null });
                        this.patientDrugs.push({ type: '', amount: null });
                    }

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        getPatientHealthData(id) {
            axiosInstance.get(`/patients/${id}/health-data`)
                .then(response => {
                    const data = response.data.data
                    this.buildChart(data['health-data'])
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        addPatientHealthData(values) {
            const id = this.patient.id
            this.closeModal()

            values.height = values.height_ft + "'" + (values.height_in ? values.height_in : '0') + '"'
            values.bmi = this.bmi(values)
            axiosInstance.post(`/patients/${id}/health-data`, values)
                .then(response => {
                    this.alertStore.success("Data added")
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        buildChart(healthData) {
            healthData.forEach(data => {
                var dataCreated = new Date(data.created_at).format('MM/DD/YY')
                this.dataChart.data.labels.push(dataCreated)
                for (const [key, value] of Object.entries(data)) {
                    var chart = _find(this.dataChart.data.datasets, ['id', key]);
                    var finalValue = value
                    if (key == 'bp' && value != null) {
                        const pressure = value.split('/')
                        finalValue = { 'x': pressure[0], 'y': pressure[1] }
                    }
                    if (chart) {
                        chart.data.push(finalValue)
                    }
                }
            });
            this.dataLoaded = true
        },
        showUpdate() {
            this.updateModal = true;
        },
        showModal(event, e) {
            this.selectedEvent = event
            this.isModalVisible = true;
            if (e != null) {
                e.stopPropagation()
            }
        },
        showHealthData() {
            this.healthData = true;
        },
        showDeleteModal() {
            this.isDeleteModalVisible = true;
        },
        showMeds() {
            this.medsData = true;
            this.$refs.medicationForm.setFieldValue("drugs", this.patientDrugs)
        },
        showChatModal() {
            this.isChatModalVisible = true;
        },
        closeModal() {
            this.selectedEvent = null
            this.isModalVisible = false;
            this.healthData = false;
            this.isDeleteModalVisible = false;
            this.medsData = false;
            this.updateModal = false;
            this.isChatModalVisible = false;
        },
        showScheduleModal() {
            this.isScheduleModalVisible = true
            this.patient_id = this.patient.id
        },
        closeScheduleModal() {
            this.isScheduleModalVisible = false
            this.patient_id = null
        },
        showEmailModal() {
            this.isEmailModalVisible = true
            this.patient_id = this.patient.id
        },
        closeEmailModal() {
            this.isEmailModalVisible = false
            this.patient_id = null
        },
        updatePatientInfo(patient) {
            this.patient = patient
        },
        addMedsData(values) {
            return
            axiosInstance.put(`/patients/${this.patient.id}`, values)
                .then(response => {
                    this.updatePatientInfo(response.data.data)
                    this.alertStore.success('Patient updated.');
                    this.closeModal()
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                });
        },
        sendMessage(values) {
            const formBody = {
                attachments: [],
                message: values.message
            }
            axiosInstance.post("/messages", { body: formBody, patient_id: this.patient.id })
                .then(response => {
                    this.$refs.messageForm.setValues({})
                    this.alertStore.success('Message sent.');
                    this.closeModal()
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        selectFile() {
            const r = this.$refs.fileUpload;
            r.click();
        },
        async downloadReport() {
            let quizReportRef = this.questionnaire.physician_report
            this.alertStore.success(`Opening patient report`)
            downloadFile(null, `${this.patient.user.id}/reports/${quizReportRef}`, 'users')
        },
        addFile(event) {
            const file = event.target.files[0]
            if (!file) { return }
            //upload profile photo
            this.alertStore.success('Uploading photo');
            const uploader = uploadFile(file, 'users', this.patient.user.id + '/photos')
            const imageRef = uploader.ref;
            axiosInstance.put(`/patients/${this.patient.id}`, { user: { image: imageRef } })
                .then(response => {
                    this.updatePatientInfo(response.data.data)
                    this.alertStore.success('Patient updated.');
                    setTimeout(() => this.fileStore.getPhotoLinkForUser(this.patient.user, true), 2000)
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                });
        },
        onPrimaryDiagChange() {
            axiosInstance.put(`/patients/${this.patient.id}`, {'dxcode': this.userPrimaryDiag})
                .then(response => {
                    this.alertStore.success('Patient primary diagnosis set.');

                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                });
        },
        getDxCodes() {
            axiosInstance.get('/dx-codes')
                .then(response => {
                    this.dxCodes = response.data.map(code => {
                        return {'name': code.value, 'value': code.id };
                    });

                })
                .catch(error => {
                    console.log(error)
                });
        },
    },
    computed: {
        isLoaded() {
            return this.patient == null ? false : true
        },
        user() {
            return this.patient.user
        },
        age() {
            return Math.floor((new Date() - new Date(this.patient.dob).getTime()) / 3.15576e+10)
        },
        dob() {
            return new Date(this.patient.dob).format("MM/DD/YYYY");
        },
        gender() {
            return this.patient.gender == 'm' ? 'Male' : 'Female'
        },
        since() {
            return new Date(this.patient.createdAt).format("MM/DD/YYYY");
        },
        bmi() {
            return (values) => {
                var bmi = ''
                if (values.height_ft && values.weight) {
                    const height = values.height_ft + "'" + (values.height_in ? values.height_in : '0') + '"'
                    bmi = calculateBMI(height, values.weight)
                }
                return bmi
            }
        },
        height() {
            var height = this.patient.current_health_data?.height
            if (!height) {
                return ['', '']
            }
            height = height.split("'")
            return height
        },
        heightft() {
            return this.height[0].replace(/[^0-9.]/g, '');
        },
        heightin() {
            return this.height[1].replace(/[^0-9.]/g, '');
        },
        apptDate() {
            return (appt) => {
                if (!appt) {
                    return ""
                }
                const date = this.currentDate(appt.start_time);
                return `${date.month} ${date.day}, ${date.year} at ${date.time}`
            }
        },
        currentDate() {
            return (apptDate) => {
                let date = new Date(apptDate);
                let weekdayShort = date.toLocaleString('en-us', { weekday: 'short' });
                let weekday = date.toLocaleString('en-us', { weekday: 'long' });
                let month = date.toLocaleString('en-us', { month: 'long' });
                let day = date.toLocaleString('en-us', { day: 'numeric' });
                let year = date.toLocaleString('en-us', { year: 'numeric' });
                let time = date.toLocaleTimeString('en-us', { hour: "2-digit", minute: "2-digit" })
                return { weekdayShort, weekday, month, day, year, time };
            }
        },
        questionnaire() {
            return this.patient.questionnaire;
        },
        medicine() {
            return (med) => {
                var medValue = ""
                var medType = ""
                const medArray = med.split(":");
                medType = this.medicineArray.find(({ value }) => value === medArray[0]).name;
                medValue = medArray[1] + " medications";
                return medType + " - " + medValue
            }
        }
    }
}
</script>

<template>
    <div class="page-wrapper" v-if="isLoaded">
        <div class="layout-wrapper">
            <div class="layout-wrapper-nav">
                <RouterLink to="/patients">
                    <h3>My Patients</h3>
                </RouterLink>
                <div class="pagination-wrapper">
                    <ul>
                        <li>></li>
                        <li>{{ userName(user) }}</li>
                    </ul>
                </div>
            </div>

            <div class="patient-btns">
                <button type="button" class="w-btn" @click="showUpdate()">Edit Patient Info</button>
                <button type="button" class="w-btn" @click=showHealthData()>Add Health Data</button>
                <button type="button" class="w-btn w-btn-delete" @click="showDeleteModal()">Delete Patient</button>
                <RouterLink to="/patients">Return to My Patients</RouterLink>
            </div>
        </div>

        <div class="patients-wrapper page-bg">
            <div class="patient-top">
                <div class="patient-profile-left light-bg">
                    <div class="patient-profile-left-info">
                        <div class="patient-profile-left-info-img" @click="selectFile">
                            <img :src="fileStore.profileAvatars(patient.user)" alt="">
                            <input hidden type="file" name="attachment" @change="addFile" ref="fileUpload" />
                            <EditIcon />
                        </div>
                        <div>
                            <h6>{{ userName(user) }}</h6>
                            <span>{{ user.email }}</span>
                        </div>
                    </div>

                    <div class="patient-profile-diagnosis">
                        <div>Primary diagnosis:</div>
                        <select name="LeaveType" v-model="userPrimaryDiag" @change="onPrimaryDiagChange()" class="form-control">
                            <option value="" disabled>Pick one</option>
                            <option v-for="code in dxCodes" :value="code.value">{{ code.name }}</option>
                        </select>
                    </div>

                    <div class="patient-profile-left-btn">
                        <RoundBtn @click="showChatModal()">
                            <template #btn-icon>
                                <ChatIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Chat</template>
                        </RoundBtn>
                        <RoundBtnDelete >
                            <template #btn-icon>
                                <VideoIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Video</template>
                        </RoundBtnDelete>
                        <RoundBtn @click="showEmailModal()">
                            <template #btn-icon>
                                <MessagesIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Email</template>
                        </RoundBtn>
                        <RoundBtn @click="showScheduleModal()">
                            <template #btn-icon>
                                <CalendarIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Schedule</template>
                        </RoundBtn>
                    </div>
                </div>
                <div class="patient-profile-right light-bg" v-if="patient.appointments[0]">
                    <h4 class="patient-heading">Next Appointment Scheduled</h4>
                    <span>{{ apptDate(patient.appointments[0]) }}</span>
                    <RouterLink custom v-slot="{ navigate }"
                        :to="{ name: 'calendar', params: { id: patient.appointments[0].id } }">
                        <button @click="navigate" @keypress.enter="navigate">Open in Calendar</button>
                    </RouterLink>
                </div>
            </div>

            <div class="patient-info light-bg">
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Date of Birth</div>
                    <div>{{ dob }}</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Age</div>
                    <div>{{ age }}</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Language</div>
                    <div>{{ patient.language ?? '-' }}</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Race</div>
                    <div>{{ patient.race ?? '-' }}</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Address</div>
                    <div>{{ patient.contact_info?.address ?? '-' }}</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Insurance number</div>
                    <div>{{ patient.insurance_info?.number ?? '-' }}</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Phone Number</div>
                    <div>{{ user.phone }}</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Gender</div>
                    <div>{{ gender }}</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Ethnicity</div>
                    <div>{{ patient.ethnicity ?? '-' }}</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Patient Since</div>
                    <div>{{ since }}</div>
                </div>
            </div>

            <div class="patient-grid">
                <div class="light-bg patient-card border-cntr">
                    <h4 class="patient-heading">Quizzes and Questionnaires</h4>

                    <div class="patient-status">
                        <div v-if="patient.completed_quizzes[0]" class="patient-status-item">
                            <div class="patient-status-item-date">
                                <div>{{ patient.completed_quizzes[0].title }} quiz:</div>
                                <div>{{ new Date(patient.completed_quizzes[0].completed_at).format("MM/DD/YYYY") }}</div>
                            </div>

                            <div class="label-status complete">Completed</div>
                            <!-- <div class="patient-status-item-btn">Send Email or Text Reminder</div> -->
                            <div class="patient-status-item-btn">Scored: {{ patient.completed_quizzes[0].score }}</div>
                        </div>
                        <div v-else class="patient-status-item">
                            <div class="patient-status-item-date">
                                <div>No completed quizzes</div>
                                <div></div>
                            </div>

                            <div class="label-status incomplete">Incomplete</div>
                            <div class="patient-status-item-btn">Send Email or Text Reminder</div>
                        </div>

                        <div class="patient-status-item">
                            <div class="patient-status-item-date">
                                <div>Next Quarterly Questionnaire Assigned:</div>
                                <div>{{ new Date(patient.questionnaireAssignDate).format("MM/DD/YYYY") }}</div>
                            </div>

                            <div :class="questionnaire && !patient.questionnaireRequired ? 'complete' : 'incomplete'" class="label-status">{{ questionnaire && !patient.questionnaireRequired ?
                                'Complete' : 'Incomplete' }}</div>

                            <div class="patient-status-item-duration">
                                <div v-if="questionnaire">Completed on <span>{{ new
                                    Date(questionnaire.created_at).format("MM/DD/YYYY") }}</span></div>
                            </div>

                            <div v-if="questionnaire" class="patient-status-item-btn" @click="downloadReport">View
                                Questionnaire Report</div>
                        </div>
                    </div>
                </div>

                <div class="patient-card-two">
                    <div class="patient-lab light-bg patient-card">
                        <h4 class="patient-heading">Diagnostic results & Suggested ing</h4>

                        <ul>
                            <li>
                                Sodium
                                <span>-</span>
                            </li>
                            <li>
                                Glucose
                                <span>-</span>
                            </li>
                            <li>
                                Potassium
                                <span>-</span>
                            </li>
                            <li>
                                BUN
                                <span>-</span>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                Cholesterol
                                <span>-</span>
                            </li>
                            <li>
                                Triglycerides
                                <span>-</span>
                            </li>
                            <li>
                                HDL
                                <span>-</span>
                            </li>
                            <li>
                                LDL
                                <span>-</span>
                            </li>
                        </ul>

                        <div>
                            <RouterLink class="patient-status-item-btn active-btn" :to="{ name: 'lab-results' }">Review results</RouterLink>
                        </div>
                    </div>
                    <div class="patient-meds light-bg patient-card">
                        <h4 class="patient-heading">Medications and Supplements</h4>

                        <ul class="patient-meds-list">
                            <li v-for="med in patient.meds">{{ medicine(med) }}</li>
                        </ul>

                        <!-- <div class="patient-status-item-btn" @click=showMeds()>View and Edit Medications and Supplements -->
                        <!-- </div> -->
                    </div>
                </div>

                <div class="patient-data light-bg patient-card doc">
                    <div>
                        <h4 class="patient-heading">Patient Health Data</h4>

                        <ul>
                            <li>
                                <div>Height</div>
                                <span>{{ patient.current_health_data?.height ?? '-' }}</span>
                                
                            </li>
                            <li>
                                <div>Body Fat</div>
                                <span>{{ patient.current_health_data?.bodyfat ?? '-' }}</span>
                                
                            </li>
                            <li>
                                <div>Weight</div>
                                <span>{{ patient.current_health_data?.weight ?? '-' }}</span>
                                
                            </li>
                            <li>
                                <div>BP</div>
                                <span>{{ patient.current_health_data?.bp ?? '-' }}</span>
                                
                            </li>
                            <li>
                                <div>BMI</div>
                                <span>{{ patient.current_health_data?.bmi ?? '-' }}</span>
                                
                            </li>
                            <li>
                                <div>Resting HR</div>
                                <span>{{ patient.current_health_data?.resting_hr ?? '-' }}</span>
                                
                            </li>
                        </ul>
                    </div>

                    <div class="patient-data-chart">
                        <LineChart v-if="dataLoaded" :data="dataChart" />
                    </div>
                </div>
            </div>
        </div>

        <!-- meds modal -->
        <Modal v-show="medsData" @close="closeModal">
            <template #header>Medications and Supplements</template>
            <template #content>
                <Form @submit="addMedsData" ref="medicationForm">
                    <!-- <div class="popup-content-item meds-input bl-bg" ref="medsContainer"> -->
                    <FieldArray name="drugs" v-slot="{ fields, push, remove }">
                        <fieldset v-for="(field, index) in fields" :key="field.key">
                            <div class="info-form-item-wrapper">
                                <label class="info-form-item">
                                    Drug Class
                                    <Field as="select" :name="`drugs[${index}].type`" class="form-select">
                                        <option value="" disabled>Pick one</option>
                                        <option v-for="code in medicineArray" :value="code.value">{{ code.name }}</option>
                                    </Field>
                                </label>
                                <label class="info-form-item">
                                    Number of Medications
                                    <Field type="number" :name="`drugs[${index}].amount`" placeholder="0" />
                                </label>
                                <div class="info-form-add-btn remove" v-if="fields.length > 1" @click="remove(index);">
                                    <RemoveIcon width="35" height="35" />
                                </div>
                            </div>
                        </fieldset>
                        <div class="info-form-add-btn" v-if="fields.length < 15" @click="push({ type: '', amount: null });">
                            <AddIcon />
                            Add Medicine
                        </div>
                    </FieldArray>
                    <!-- </div> -->
                    <div class="popup-footer">
                        <button type="reset" class="w-btn w-btn-close" @click="closeModal">
                            Cancel
                        </button>
                        <button type="submit" class="w-btn">
                            Save
                        </button>
                    </div>
                </Form>
            </template>
        </Modal>
        <!-- health data modal -->
        <Modal v-show="healthData" @close="closeModal">
            <template #header>Add Health Data</template>
            <template #content>
                <Form @submit="addPatientHealthData" ref="healthDataForm" v-slot="{ values }">
                    <div v-show="!patient.current_health_data?.height" class="popup-content-item bl-bg">
                        <label class="label-w-icon">Height</label>
                        <div style="display:inline-flex; margin-top: 6px;">
                            <Field name="height_ft" type="number" class="popup-content-item-input" :value="heightft">
                            </Field>
                            <label style="margin: auto 0 auto 3px;">ft</label>
                            <Field name="height_in" type="number" class="popup-content-item-input" :value="heightin"
                                style="margin-left: 16px;">
                            </Field>
                            <label style="margin: auto 0 auto 3px;">in</label>
                        </div>
                    </div>

                    <div class="popup-content-item bl-bg">
                        <label class="label-w-icon">Weight (lbs)
                            <Field name="weight" type="text" class="popup-content-item-input"></Field>
                        </label>
                    </div>

                    <div class="popup-content-item bl-bg">
                        <label class="label-w-icon">Body Fat (%)
                            <Field name="bodyfat" type="text" class="popup-content-item-input"></Field>
                        </label>
                    </div>

                    <div class="popup-content-item bl-bg">
                        <label class="label-w-icon">BP
                            <Field name="bp" type="text" class="popup-content-item-input"></Field>
                        </label>
                    </div>

                    <div class="popup-content-item bl-bg">
                        <label class="label-w-icon">BMI
                            <input name="bmi" type="text" class="popup-content-item-input" :value="bmi(values)" disabled />
                        </label>
                    </div>

                    <div class="popup-content-item bl-bg">
                        <label class="label-w-icon">Resting HR
                            <Field name="resting_hr" type="text" class="popup-content-item-input"></Field>
                        </label>
                    </div>

                    <div class="popup-footer">
                        <button type="reset" class="w-btn w-btn-close" @click="closeModal">
                            Cancel
                        </button>
                        <button type="submit" class="w-btn">
                            Save
                        </button>
                    </div>
                </form>
            </template>
        </Modal>
        <!-- Scheduling modal -->
        <ScheduleModal v-show="isScheduleModalVisible" @close="closeScheduleModal" :patient_id="patient_id" />
        <!-- Email modal -->
        <EmailModal v-show="isEmailModalVisible" @close="closeEmailModal" :patient_id="patient_id" :patient="patient" />
        <!-- update parient info modal -->
        <AddPatientModal v-show="updateModal" :patient="patient"
            v-on:update:patient="updatePatientInfo($event)" @close="closeModal" @showMeds="showMeds()">
        </AddPatientModal>
        <!-- delete modal -->
        <DeleteModal v-show="isDeleteModalVisible" @close="closeModal">
            <template #content>
                <h4>Delete this patient?</h4>
                <p>This will delete all data regarding this patient.</p>
            </template>
        </DeleteModal>
        <!-- chat modal -->
        <Modal v-show="isChatModalVisible" @close="closeModal">
            <template #header>Send Message</template>
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
    </div>
</template>