<script>
import Modal from './Modal.vue'
import PatientAutocomplete from '@/components/Patient/PatientAutocomplete.vue'

import { Form, Field } from 'vee-validate';
import CheckIcon from '@/components/icons/IconCheck.vue'
import CalendarIcon from '@/components/icons/IconCalendar.vue'
import MapIcon from '@/components/icons/IconMap.vue'

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

import _find from 'lodash/find';
import userMixin from '@/mixins/user.js'

export default {
    props: {
        patient_id: String,
        event: Object
    },
    mixins: [
        userMixin
    ],
    components: {
        Modal,
        Form,
        Field,
        CheckIcon,
        CalendarIcon,
        MapIcon,
        PatientAutocomplete,
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            searchList: [],
        }
    },
    watch: {
        event(value) {
            if (value != null) {
                const startTime = new Date(value.start_time)
                const finishTime = new Date(value.finish_time)
                this.$refs.visitForm.setValues({
                    visit_type: value.visit_type,
                    date: startTime.toISOString().substring(0, 10),
                    patient_name: this.userName(value.patient.user),
                    patient_id: value.patient.id,
                    from: startTime.format('HH:mm'),
                    to: finishTime.format('HH:mm'),
                    notes: value.notes
                });
            } else {
                this.$refs.visitForm.setValues({})
            }
        },
        patient_id(value) {
            if (value != null) {
                this.$refs.visitForm.setFieldValue('patient_id', value)
            }

        }
    },
    computed: {
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
        closeModal() {
            this.$emit('close');
            this.$refs.visitForm.setValues({})
            if(this.$refs.patientAutocomplete){
                this.$refs.patientAutocomplete.searchTerm = ''
            }
            
        },
        showDeleteModal() {
            this.$emit('delete');
        },
        submitVisit(values) {
            const selectedDay = values.date
            values.start_time = new Date(`${selectedDay}T${values.from}`);
            values.finish_time = new Date(`${selectedDay}T${values.to}`);
            axiosInstance.post('/appointments', values)
                .then(response => {
                    this.closeModal()
                    this.alertStore.success('Appointment set')
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                });
        },
        submitVisit(values) {
            const selectedDay = values.date
            values.start_time = new Date(`${selectedDay}T${values.from}`);
            values.finish_time = new Date(`${selectedDay}T${values.to}`);
            if (this.event != null) {
                axiosInstance.put(`/appointments/${this.event.id}`, values)
                    .then(response => {
                        this.closeModal()
                        this.$emit("scheduled", response.data.data, true)
                        this.alertStore.success('Appointment updated')
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            } else {
                axiosInstance.post('/appointments', values)
                    .then(response => {
                        this.closeModal()
                        this.alertStore.success('Appointment set')
                        this.$emit("scheduled", response.data.data, false)
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            }
         

        },
        searchPatient(term) {
            axiosInstance.post('patients/search', { name: term })
                .then(res => {
                    this.searchList = []
                    res.data.data.forEach(pt => {
                        this.searchList.push(pt)
                    });

                })
        },
    }
}
</script>

<template>
    <Modal @close="closeModal">
        <template #header>Follow-Up Appointment</template>
        <template #content>
            <div class="visit-details">
                <div class="visit-details-item">
                    <div class="visit-details-icon">
                        <CalendarIcon />
                    </div>
                    
                    <div class="visit-details-info">
                        <span>Date & Time</span>
                        <div>9:00 am</div>
                    </div>
                </div>
                <div class="visit-details-item">
                    <div class="visit-details-icon">
                        <img src="@/assets/img/stethoscope.png" alt="Icon" />
                    </div>
                    <div class="visit-details-info">
                        <span>Physician</span>
                        <div>Dr. Wendell</div>
                    </div>
                </div>
                <div class="visit-details-item">
                    <div class="visit-details-icon">
                        <MapIcon />
                    </div>
                    <div class="visit-details-info">
                        <span>Clinic</span>
                        <div>VarioHealth Advanced Integrated Medicine</div>
                        <div>9456 SH 121 S, Frisco, TX 75035</div>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<style>
    .visit-details-item {
        margin-bottom: 16px;
        display: flex;
        align-items: flex-start;
    }

    .visit-details-item:last-child {
        margin-bottom: 0;
    }

    .visit-details-icon {
        background-color: #F4F4FF;
        width: 32px;
        height: 32px;
        margin-right: 16px;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    .visit-details-icon svg, 
    .visit-details-icon img {
        width: 14px;
        height: 14px;
    }

    .visit-details-icon svg path {
        fill: var(--primary);
    }

    .visit-details-info {
        display: flex;
        flex-direction: column;
        font-size: 20px;
        font-weight: 500;
    }

    .visit-details-info span {
        font-size: 12px;
        font-weight: 500;
        color: #464646;
    }
</style>