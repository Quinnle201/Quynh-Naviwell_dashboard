<script>
import Modal from '@/components/Modals/Modal.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import CalendarIcon from '@/components/icons/IconCalendar.vue'
import CheckIcon from '@/components/icons/IconCheck.vue'
import PatientAutocomplete from '@/components/Patient/PatientAutocomplete.vue'
import DeleteModal from '@/components/Modals/DeleteModal.vue'

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';
import { Form, Field } from 'vee-validate';
import userMixin from '@/mixins/user.js'
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

export default {
    mixins: [
        userMixin
    ],
    components: {
        Modal,
        AddIcon,
        VueCal,
        CalendarIcon,
        CheckIcon,
        Form,
        Field,
        PatientAutocomplete,
        DeleteModal
    },
    data() {
        const alertStore = useAlertStore();
        return {
            alertStore,
            isModalVisible: false,
            selectedEvent: null,
            showDialog: false,
            isDeleteModalVisible: false,
            events: [],
            searchList: [],
        };
    },
    watch: {
        '$route.params': {
            handler(toParams, previousParams) {
                const id = toParams.id;
                if (id) {
                    this.getEventById(id)
                }
            },
            immediate: true
        },
        selectedEvent: {
            handler(value) {
                if (value != null) {
                    const visitEvent = _find(this.events, ['id', value.id])
                    const data = Object.assign({}, visitEvent.dataObject);
                    const startTime = new Date(data.start_time)
                    const finishTime = new Date(data.finish_time)
                    this.$refs.visitForm.setValues({
                        visit_type: data.visit_type,
                        date: startTime.toISOString().substring(0, 10),
                        patient_name: this.userName(data.patient.user),
                        patient_id: data.patient.id,
                        from: startTime.format('HH:mm'),
                        to: finishTime.format('HH:mm'),
                        notes: data.notes
                    });
                } else {
                    this.$refs.visitForm.setValues({})
                }

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
        localDate() {
            return (time) => new Date(time).toLocaleString()
        },
        calendarEventClass() {
            return (appt) => {
                var evtType = { class: 'box_blue', label: 'Initial NaviWell Visit' }
                switch (appt.visit_type) {
                    case 'initial':
                        evtType = { class: 'box_blue', label: 'Initial NaviWell Visit' }
                        break;
                    case 'wellness':
                        evtType = { class: 'box_green', label: 'Wellness Coach Visit' }
                        break;
                    case 'dietitian':
                        evtType = { class: 'box_pink', label: 'Dietitian Visit' }
                        break;
                    case 'followup':
                        evtType = { class: 'box_yellow', label: 'Follow-Up Visit' }
                        break;

                }
                return evtType
            }
        }
    },
    mounted() {
        this.getEvents();
    },
    methods: {
        searchPatient(term) {
            axiosInstance.post('patients/search', { name: term })
                .then(res => {
                    this.searchList = []
                    res.data.data.forEach(pt => {
                        this.searchList.push(pt)
                    });

                })
        },
        showModal(event, e) {
            this.selectedEvent = event
            this.isModalVisible = true;
            if (e != null) {
                e.stopPropagation()
            }
        },
        closeModal() {
            this.selectedEvent = null
            this.isModalVisible = false;
            this.$refs.patientAutocomplete.searchTerm = ''
        },
        showDeleteModal() {
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
        },
        submitVisit(values) {
            const selectedDay = values.date
            values.start_time = new Date(`${selectedDay}T${values.from}`);
            values.finish_time = new Date(`${selectedDay}T${values.to}`);
            if (this.selectedEvent != null) {
                axiosInstance.put(`/appointments/${this.selectedEvent.id}`, values)
                    .then(response => {
                        this.closeModal()
                        this.alertStore.success('Appointment updated')
                        this.updateVisit(response.data.data)
                        this.$refs.visitForm.setValues({})
                    })
                    .catch(error => {
                        this.alertStore.error(error.response.data.message)
                    });
            } else {
                axiosInstance.post('/appointments', values)
                    .then(response => {
                        this.closeModal()
                        this.alertStore.success('Appointment set')
                        this.addVisit(response.data.data)
                        this.$refs.visitForm.setValues({})
                        this.$refs.patientAutocomplete.searchTerm = ''
                    })
                    .catch(error => {
                        this.alertStore.error(error.response.data.message)
                    });
            }
         

        },
        updateVisit(data) {
            const index = _findIndex(this.events, ['id', data.id])
            const updatedEvent = {
                dataObject: data,
                id: data.id,
                start: this.localDate(data.start_time),
                end: this.localDate(data.finish_time),
                title: this.calendarEventClass(data).label,
                content: this.userName(data.patient.user),
                class: this.calendarEventClass(data).class,
                label: this.calendarEventClass(data).label
            }
            this.events.splice(index, 1, updatedEvent)
        },
        addVisit(data) {
            if(this.events.some(event => event.id === data.id)){
                return null
            }
            const visitObject = 
            {
                dataObject: data,
                id: data.id,
                start: this.localDate(data.start_time),
                end: this.localDate(data.finish_time),
                title: this.calendarEventClass(data).label,
                content: this.userName(data.patient.user),
                class: this.calendarEventClass(data).class,
                label: this.calendarEventClass(data).label
            }
            this.events.push(visitObject)
            return visitObject
        },
        deleteVisit() {
            if (this.selectedEvent != null) {
                axiosInstance.delete(`/appointments/${this.selectedEvent.id}`)
                    .then(response => {
                        this.alertStore.success('Appointment cancelled')
                        const index = _findIndex(this.events, ['id', this.selectedEvent.id])
                        this.events.splice(index, 1)
                        this.closeModal()
                        this.closeDeleteModal()
                    })
                    .catch(error => {
                        this.alertStore.error(error.response.data.message)
                    });
            } else {
                this.alertStore.error('Unexpected error')
            }
        },
        getEvents() {
            axiosInstance.get('/appointments')
                .then(response => {
                    response.data.data.appointments.forEach(appt => {
                        this.addVisit(appt)
                    });

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        getEventById(id) {
            axiosInstance.get(`/appointments/${id}`)
                .then(response => {
                    const visit = this.addVisit(response.data.data)
                    this.showModal(visit, null)

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        }
    },
}
</script>

<template>
    <div class="wrapper">
        <div class="layout-wrapper">
            <h3>Calendar</h3>

            <div class="calendar-visit-type">
                <ul>
                    <li>
                        <p>Initial NaviWell Visit</p>
                        <span></span>
                    </li>
                    <li>
                        <p>Wellness Coach Visit</p>
                        <span></span>
                    </li>
                    <li>
                        <p>Dietitian Visit</p>
                        <span></span>
                    </li>
                    <li>
                        <p>Follow-Up Visit</p>
                        <span></span>
                    </li>
                </ul>
            </div>

            <div class="calendar-btn">
                <div @click="showModal(null, null)" class="add-button">
                    <AddIcon />
                    <button type="button" class="calendar-btn-text">Add New Visit</button>
                </div>

                <Modal v-show="isModalVisible" @close="closeModal">
                    <template #header>{{ selectedEvent? 'Edit Visit': 'Add New Visit' }}</template>
                    <template #content>
                        <div class="type-select">
                            <div class="type-select-item active">Appointment</div>
                            <div class="type-select-item">Telehealth</div>
                            <div class="type-select-item">Personal</div>
                        </div>
                        <Form @submit="submitVisit" ref="visitForm">
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

                            <div class="popup-content-item popup-content-item--search">
                                <label>Patient Name</label>
                                <PatientAutocomplete :patient="selectedEvent?.content" :patients="searchList"
                                    @search="searchPatient" ref="patientAutocomplete" />
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
                                <button :type="selectedEvent? 'button': 'reset'" :class='selectedEvent ? "w-btn w-btn-delete" : "w-btn w-btn-close"' @click="selectedEvent? showDeleteModal() : closeModal()">
                                    {{ selectedEvent? 'Delete': 'Cancel' }}
                                </button>
                                <button type="submit" class="w-btn">
                                    {{ selectedEvent? 'Edit Event': 'Save Event' }}
                                </button>
                            </div>
                        </form>
                    </template>
                </Modal>
            </div>
        </div>

        <DeleteModal v-show="isDeleteModalVisible" @delete="deleteVisit" @close="closeDeleteModal">
            <template #content>
                <h4>Cancel this event?</h4>
                <p>This will delete all data regarding this event.</p>
            </template>
        </DeleteModal>

        <div class="calendar-wrapper">
            <vue-cal :time-from="8 * 60" :time-to="18 * 60" :time-step="15" today-button
                :disable-views="['years', 'year']" hide-view-selector
                :editable-events="{ title: false, drag: false, resize: false, delete: false, create: false }"
                :events="events" :on-event-click="showModal">
            </vue-cal>
        </div>
    </div>
</template>