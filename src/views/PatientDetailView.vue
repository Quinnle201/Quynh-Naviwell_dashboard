<script>
import ChatIcon from '../components/icons/IconChat.vue'
import VideoIcon from '../components/icons/IconVideo.vue'
import MessagesIcon from '../components/icons/IconMessages.vue'
import CalendarIcon from '../components/icons/IconCalendar.vue'
import RoundBtn from '../components/Dashboard/Layout/RoundBtn.vue'
import LineChart from '../components/Dashboard/Layout/LineChart.vue'
import { RouterLink } from 'vue-router'
import Modal from '../components/Dashboard/Layout/Modal.vue'
import { Form, Field } from 'vee-validate';

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

import _find from 'lodash/find'
import userMixin from '../mixins/user.js'


export default {
    components: {
        ChatIcon,
        VideoIcon,
        MessagesIcon,
        CalendarIcon,
        RoundBtn,
        LineChart,
        Modal,
        Form,
        Field
    },
    mixins: [
        userMixin
    ],
    data() {
        const patient = null
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

        return { patient, alertStore, dataChart, dataLoaded, isModalVisible: false, healthData: false, medsData: false }
    },
    mounted() {
        const id = this.$route.params.id;

        this.getPatientById(id)
        this.getPatientHealthData(id)
    },
    methods: {
        getPatientById(id) {
            axiosInstance.get(`/patients/${id}`)
                .then(response => {
                    this.patient = response.data.patient;
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        getPatientHealthData(id) {
            axiosInstance.get(`/patients/${id}/health-data`)
                .then(response => {
                    console.log(response.data)
                    this.buildChart(response.data['health-data'])
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        addPatientHealthData(values) {
            const id = this.patient.id
            this.closeModal()
            axiosInstance.post(`/patients/${id}/health-data`, values)
                .then(response => {
                    console.log(response.data)
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
                    if(key == 'bp' && value != null) {
                        const pressure = value.split('/')
                        finalValue = {'x': pressure[0], 'y': pressure[1]}
                    }
                    if(chart){
                        chart.data.push(finalValue)
                    } 
                }
            });
            this.dataLoaded = true
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
        showMeds() {
            this.medsData = true;
        },
        closeModal() {
            this.selectedEvent = null
            this.isModalVisible = false;
            this.healthData = false;
            this.medsData = false;
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
            return new Date(this.patient.dob).format("YYYY/MM/DD");
        },
        gender() {
            return this.patient.gender == 'm' ? 'Male' : 'Female'
        },
        since() {
            return new Date(this.patient.createdAt).format("YYYY/MM/DD");
        }
    },
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
                <button type="button" class="w-btn">Edit Patient Info</button>
                <button type="button" class="w-btn" @click=showHealthData()>Add Health Data</button>
                <button type="button" class="w-btn w-btn-delete">Delete Patient</button>
                <RouterLink to="/patients">Return to My Patients</RouterLink>
            </div>
        </div>

        <div class="patients-wrapper page-bg">
            <div class="patient-top">
                <div class="patient-profile-left light-bg">
                    <div class="patient-profile-left-info">
                        <img src="@/assets/img/image.png" alt="">
                        <div>
                            <h6>{{ userName(user) }}</h6>
                            <span>{{ user.email }}</span>
                        </div>
                    </div>

                    <div class="patient-profile-left-btn">
                        <RoundBtn>
                            <template #btn-icon>
                                <ChatIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Chat</template>
                        </RoundBtn>
                        <RoundBtn>
                            <template #btn-icon>
                                <VideoIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Video</template>
                        </RoundBtn>
                        <RoundBtn>
                            <template #btn-icon>
                                <MessagesIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Email</template>
                        </RoundBtn>
                        <RoundBtn>
                            <template #btn-icon>
                                <CalendarIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Schedule</template>
                        </RoundBtn>
                    </div>
                </div>
                <div class="patient-profile-right light-bg">
                    <h4 class="patient-heading">Next Appointment Scheduled (WIP)</h4>
                    <span>January 22, 2022 at 10:00 AM</span>
                    <button>Open in Calendar</button>
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
                    <div class="patient-info-item-label">Sexual Orientation</div>
                    <div>{{ patient.sex_orientation ?? '-' }}</div>
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
                    <h4 class="patient-heading">Quizzes and Questionnaires(WIP)</h4>

                    <div class="patient-status">
                        <div class="patient-status-item">
                            <div class="patient-status-item-date">
                                <div>Quiz Assigned:</div>
                                <div>11/08/2022</div>
                            </div>

                            <div class="label-status incomplete">Incomplete</div>
                            <div class="patient-status-item-btn">Send Email or Text Reminder</div>
                            <div class="patient-status-item-btn">View Quiz Report</div>
                        </div>

                        <div class="patient-status-item">
                            <div class="patient-status-item-date">
                                <div>Quarterly Questionnaire Assigned:</div>
                                <div>11/08/2022</div>
                            </div>

                            <div class="label-status complete">Complete</div>

                            <div class="patient-status-item-duration">
                                <div>Completed <span>11/11/2022</span></div>
                                <div>Duration: <span>Approximately 26 minutes</span></div>
                            </div>

                            <div class="patient-status-item-btn">View Questionnaire Report</div>
                        </div>
                    </div>
                </div>

                <div class="patient-card-two">
                    <div class="patient-lab light-bg patient-card">
                        <h4 class="patient-heading">Lab Results & Suggested ing(WIP)</h4>

                        <ul>
                            <li>
                                Sodium
                                <span>150</span>
                            </li>
                            <li>
                                Glucose
                                <span>90 mg/dL</span>
                            </li>
                            <li>
                                Potassium
                                <span>3.5</span>
                            </li>
                            <li>
                                BUN
                                <span>12 mg/dL</span>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                Cholesterol
                                <span>160 mg/dL</span>
                            </li>
                            <li>
                                Triglycerides
                                <span>62 mg/dL</span>
                            </li>
                            <li>
                                HDL
                                <span>48 mg/dL</span>
                            </li>
                            <li>
                                LDL
                                <span>115 mg/dL</span>
                            </li>
                        </ul>

                        <div>
                            <div class="patient-status-item-btn active-btn">New Lipid Panel Results to Review</div>
                        </div>
                    </div>
                    <div class="patient-meds light-bg patient-card">
                        <h4 class="patient-heading">Medications and Supplements</h4>

                        <ul class="patient-meds-list">
                            <li v-for="med in patient.meds">{{ med }}</li>
                        </ul>

                        <div class="patient-status-item-btn" @click=showMeds()>View and Edit Medications and Supplements</div>
                    </div>
                </div>

                <div class="patient-data light-bg patient-card">
                    <h4 class="patient-heading">Patient Health Data(WIP)</h4>

                    <ul>
                        <li>
                            Height
                            <span>{{ patient.current_health_data?.height ?? '-' }}</span>
                        </li>
                        <li>
                            Body Fat
                            <span>{{ patient.current_health_data?.bodyfat ?? '-' }}</span>
                        </li>
                        <li>
                            Weight
                            <span>{{ patient.current_health_data?.weight ?? '-' }}</span>
                        </li>
                        <li>
                            BP
                            <span>{{ patient.current_health_data?.bp ?? '-' }}</span>
                        </li>
                        <li>
                            BMI
                            <span>{{ patient.current_health_data?.bmi ?? '-' }}</span>
                        </li>
                        <li>
                            Resting HR
                            <span>{{ patient.current_health_data?.resting_hr ?? '-' }}</span>
                        </li>
                    </ul>

                    <div>
                        <LineChart v-if="dataLoaded" :data="dataChart"/>
                    </div>
                </div>
            </div>
        </div>
   
    <!-- meds modal -->
    <Modal v-show="medsData" @close="closeModal">
        <template #header>Medications and Supplements</template>
        <template #content>
            <form>
                <div class="popup-content-item meds-input bl-bg">
                    <input class="popup-content-item-input" type="text" placeholder="Medication Name, Dosage, Frequency" />

                    <input class="popup-content-item-input" type="text" placeholder="Medication Name, Dosage, Frequency" />

                    <input class="popup-content-item-input" type="text" placeholder="Medication Name, Dosage, Frequency" />

                    <button type="button">Add Medication or Supplement</button>
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
    <!-- health data modal -->
    <Modal v-show="healthData" @close="closeModal">
        <template #header>Add Health Data</template>
        <template #content>
            <Form @submit="addPatientHealthData" ref="healthDataForm">
                <div class="popup-content-item bl-bg">
                    <label class="label-w-icon">Height
                        <Field name="height" type="text" class="popup-content-item-input"></Field>
                    </label>
                </div>

                <div class="popup-content-item bl-bg">
                    <label class="label-w-icon">Weight
                        <Field name="weight" type="text" class="popup-content-item-input"></Field>
                    </label>
                </div>

                <div class="popup-content-item bl-bg">
                    <label class="label-w-icon">Body Fat
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
                        <Field name="bmi" type="text" class="popup-content-item-input"></Field>
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
</div>
</template>