<script>
import Modal from '../components/Dashboard/Layout/Modal.vue'
import AddIcon from '../components/icons/IconAdd.vue'
import CalendarIcon from '../components/icons/IconCalendar.vue'
import CheckIcon from '../components/icons/IconCheck.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';

import moment from 'moment'

import PatientAutocomplete from '@/components/PatientAutocomplete.vue'

export default {
    components: {
        Modal,
        AddIcon,
        VueCal,
        CalendarIcon,
        CheckIcon,
        Form,
        Field,
        PatientAutocomplete
    },
    data() {
        const alertStore = useAlertStore();
        return {
            alertStore,
            isModalVisible: false,
            selectedEvent: {},
            showDialog: false,
            events: [
                {
                    start: '2023-01-23 11:00',
                    end: '2023-01-23 11:30',
                    title: 'Initial NaviWell Visit',
                    content: 'Thomas Edison',
                    class: 'box_blue',
                    label: 'Initial NaviWell Visit'
                },
                {
                    start: '2023-01-23 17:00',
                    end: '2023-01-23 17:30',
                    title: 'Wellness Coach Visit',
                    content: 'Thomas Edison',
                    class: 'box_green',
                    label: 'Wellness Coach Visit'
                },
                {
                    start: '2023-01-24 10:00',
                    end: '2023-01-24 11:30',
                    title: 'Initial NaviWell Visit',
                    content: 'Thomas Edison',
                    class: 'box_blue',
                    label: 'Initial NaviWell Visit'
                },
                {
                    start: '2023-01-24 17:00',
                    end: '2023-01-24 18:30',
                    title: 'Wellness Coach Visit',
                    content: 'Thomas Edison',
                    class: 'box_green',
                    label: 'Wellness Coach Visit'
                },
                {
                    start: '2023-01-25 13:30',
                    end: '2023-01-25 14:30',
                    title: 'Dietitian Visit',
                    content: 'Thomas Edison',
                    class: 'box_pink',
                    label: 'Dietitian Visit'
                },
                {
                    start: '2023-01-25 18:30',
                    end: '2023-01-25 19:30',
                    title: 'Follow-Up Visit',
                    content: 'Thomas Edison',
                    class: 'box_yellow',
                    label: 'Follow-Up Visit'
                },
                {
                    start: '2023-01-26 17:00',
                    end: '2023-01-26 17:30',
                    title: 'Initial NaviWell Visit',
                    content: 'Thomas Edison',
                    class: 'box_blue',
                    label: 'Initial NaviWell Visit'
                },
                {
                    start: '2023-01-26 10:00',
                    end: '2023-01-26 11:30',
                    title: 'Dietitian Visit',
                    content: 'Thomas Edison',
                    class: 'box_pink',
                    label: 'Dietitian Visit'
                },
                {
                    start: '2023-01-27 20:00',
                    end: '2023-01-27 20:30',
                    title: 'Initial NaviWell Visit',
                    content: 'Thomas Edison',
                    class: 'box_blue',
                    label: 'Initial NaviWell Visit'
                },
            ],
            searchList: []
        };
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
        name() {
            return (patient) => patient.user.first_name + ' ' + patient.user.last_name
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
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        onEventClick(event, e) {
            this.selectedEvent = event;
            this.showDialog = true;
            e.stopPropagation()
        },
        closeDialog() {
            this.showDialog = false;
        },
        submitNewVisit(values) {
            console.log(values)
            const selectedDay = values.date
            values.start_time = new Date(`${selectedDay}T${values.from}`);
            values.finish_time = new Date(`${selectedDay}T${values.to}`);
            axiosInstance.post('/appointments', values)
                .then(response => {
                    this.closeModal()
                    this.alertStore.success('Appointment set')
                    this.addVisit(response.data.appointment)
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                });
        },
        addVisit(data) {
            this.events.push({
                start: this.localDate(data.start_time),
                end: this.localDate(data.finish_time),
                title: this.calendarEventClass(data).label,
                content: this.name(data.patient),
                class: this.calendarEventClass(data).class,
                label: this.calendarEventClass(data).label
            })
        },
        getEvents() {
            axiosInstance.get('/appointments')
                .then(response => {
                    console.log(response.data.appointments)
                    response.data.appointments.forEach(appt => {
                        this.addVisit(appt)
                    });

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
                <div @click="showModal" class="add-button">
                    <AddIcon />
                    <button type="button" class="calendar-btn-text">Add New Visit</button>
                </div>

                <Modal v-show="isModalVisible" @close="closeModal">
                    <template #header>Add New Visit</template>
                    <template #content>
                        <div class="type-select">
                            <div class="type-select-item active">Appointment</div>
                            <div class="type-select-item">Telehealth</div>
                            <div class="type-select-item">Personal</div>
                        </div>
                        <Form @submit="submitNewVisit">
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
                                <label>Patient Name</label>
                                <PatientAutocomplete :patients="searchList"
                                    @search="searchPatient" />
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
                                <button type="reset" class="w-btn w-btn-close" @click="closeModal">
                                    Cancel
                                </button>
                                <button type="submit" class="w-btn">
                                    Save Event
                                </button>
                            </div>
                        </form>
                    </template>
                </Modal>
            </div>
        </div>

        <div class="calendar-wrapper">
            <vue-cal selected-date="2023-01-24" :time-from="8 * 60" :time-to="18 * 60" :time-step="15" today-button
                :disable-views="['years', 'year']" hide-view-selector
                :editable-events="{ title: false, drag: false, resize: false, delete: false, create: false }"
                :events="events" :on-event-click="onEventClick">
            </vue-cal>

            <Modal v-show="showDialog" @close="closeDialog">
                <template #header>Edit Visit</template>
                <template #content>
                    <div class="type-select">
                        <div class="type-select-item active">Appointment</div>
                        <div class="type-select-item">Telehealth</div>
                        <div class="type-select-item">Personal</div>
                    </div>
                    <form>
                        <div class="popup-content-item visit-type">
                            <label class="checkbox path">
                                <input type="checkbox">
                                <CheckIcon />
                                <div class="label-bg">Initial NaviWell Visit</div>
                            </label>
                            <label class="checkbox path">
                                <input type="checkbox">
                                <CheckIcon />
                                <div class="label-bg">Wellness Coach Visit</div>
                            </label>
                            <label class="checkbox path">
                                <input type="checkbox">
                                <CheckIcon />
                                <div class="label-bg">Dietitian Visit</div>
                            </label>
                            <label class="checkbox path">
                                <input type="checkbox">
                                <CheckIcon />
                                <div class="label-bg">Follow-Up Visit</div>
                            </label>
                        </div>

                        <div class="popup-content-item">
                            <label>Patient Name</label>
                            <input type="text" class="popup-content-item-input" :value="selectedEvent.content" />
                        </div>

                        <div class="popup-content-item">
                            <label class="label-w-icon">Date
                                <input type="text" class="popup-content-item-input"
                                    :value="selectedEvent.start && selectedEvent.start.format('DD/MM/YYYY')" />
                                <CalendarIcon />
                            </label>
                        </div>

                        <div class="popup-content-item-wrapper">
                            <div class="popup-content-item">
                                <label>From</label>
                                <select>
                                    <option value="selectedEvent.start && selectedEvent.start.formatTime()">{{
                                        selectedEvent.start && selectedEvent.start.formatTime()
                                    }}</option>
                                </select>
                            </div>

                            <div class="popup-content-item">
                                <label>To</label>
                                <select>
                                    <option value="selectedEvent.end && selectedEvent.end.formatTime()">{{
                                        selectedEvent.end && selectedEvent.end.formatTime()
                                    }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="popup-content-item">
                            <label for="textarea">Notes</label>
                            <textarea id="textarea"></textarea>
                        </div>

                        <div class="popup-footer">
                            <button type="button" class="w-btn w-btn-close" @click="closeDialog">
                                Cancel
                            </button>
                            <button type="button" class="w-btn">
                                Save Event
                            </button>
                        </div>
                    </form>
                </template>
            </Modal>
        </div>
    </div>
</template>