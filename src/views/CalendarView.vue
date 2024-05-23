<script>
import Modal from '@/components/Modals/Modal.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import ScheduleModal from '@/components/Modals/ScheduleModal.vue'

import DeleteModal from '@/components/Modals/DeleteModal.vue'

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { axiosInstance, formatAMPM } from '@/helpers';
import { useAlertStore } from '@/stores';
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
        ScheduleModal,
        DeleteModal
    },
    data() {
        const alertStore = useAlertStore();
        return {
            alertStore,
            isModalVisible: false,
            selectedEvent: null,
            modalEvent: null,
            showDialog: false,
            isDeleteModalVisible: false,
            events: [],
            currentPage: 1,
            totalPages: 1,
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
                    data.content = value.content
                    this.modalEvent = data
                } else {
                    this.modalEvent = null
                }

            }
        }
    },
    computed: {
        localDate() {
            return (time) => new Date(time).toLocaleString();
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
                    case 'cancelled': 
                        evtType = { class: 'box_red', label: 'No Show' }
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
        },
        showDeleteModal() {
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
        },
        eventScheduled(event, isUpdated) {
            if(isUpdated) {
                this.updateVisit(event)
            } else {
                this.addVisit(event)
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
        loadMoreAppts() {
            if(this.currentPage <= this.totalPages) {
                this.currentPage += 1
                this.getEvents();
            }
        },
        getEvents() {
            axiosInstance.get(`/appointments?page=${this.currentPage}`, { params: { per_page: 100 } })
                .then(response => {
                    this.totalPages = response.data.data.meta.last
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

                <ScheduleModal v-show="isModalVisible" @close="closeModal" :event="modalEvent" @scheduled="eventScheduled" @delete="showDeleteModal" />

            </div>
        </div>

        <DeleteModal v-show="isDeleteModalVisible" @delete="deleteVisit" @close="closeDeleteModal">
            <template #content>
                <h4>Cancel this event?</h4>
                <p>This will delete all data regarding this event.</p>
            </template>
        </DeleteModal>

        <div class="calendar-wrapper">
            <vue-cal :time-from="5 * 60" :time-to="20 * 60.5" :time-step="15" :twelveHour="true" today-button
                :disable-views="['years', 'year']" hide-view-selector
                :editable-events="{ title: false, drag: false, resize: false, delete: false, create: false }"
                :events="events" :on-event-click="showModal" @view-change="loadMoreAppts()">
            </vue-cal>
        </div>
    </div>
</template>