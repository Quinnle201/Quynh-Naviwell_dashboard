<script>
import Modal from './Modal.vue'
import PatientAutocomplete from '@/components/Patient/PatientAutocomplete.vue'

import { Form, Field } from 'vee-validate';
import CheckIcon from '@/components/icons/IconCheck.vue'
import CalendarIcon from '@/components/icons/IconCalendar.vue'

import { axiosInstance, formatAMPM } from '@/helpers';
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
                    const ms = new Date().setHours(hour, min[m])
                    const date = new Date(ms)
                    array.push({ 'label': formatAMPM(date), 'value': `${hour}:${min[m]}` })
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
        <template #header>{{ event ? 'Edit Visit' : 'Add New Visit' }}</template>
        <template #content>
            <div class="type-select">
                <div class="type-select-item active">Appointment</div>
                <div class="type-select-item">Telehealth</div>
                <div class="type-select-item">Personal</div>
            </div>
            <Form @submit="submitVisit" ref="visitForm">
                <Field v-if="patient_id" type="hidden" name="patient_id" />
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

                    <label class="checkbox path">
                        <Field type="radio" name="visit_type" value="cancelled"></Field>
                        <CheckIcon />
                        <div class="label-bg">No Show</div>
                    </label>
                </div>

                <div v-if="patient_id == null" class="popup-content-item popup-content-item--search">
                    <label>Patient Name</label>
                    <PatientAutocomplete :patient="event?.content" :patients="searchList" @search="searchPatient"
                        ref="patientAutocomplete" />
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
                    <button :type="event ? 'button' : 'reset'"
                        :class='event ? "w-btn w-btn-delete" : "w-btn w-btn-close"'
                        @click="event ? showDeleteModal() : closeModal()">
                        {{ event ? 'Delete' : 'Cancel' }}
                    </button>
                    <button type="submit" class="w-btn">
                        {{ event ? 'Edit Event' : 'Save Event' }}
                    </button>
                </div>
            </form>
        </template>
    </Modal>
</template>

<style>
.details-inner.grid-two {
    display: flex;
    align-items: center;
    transform: translateX(-50%);
}
</style>