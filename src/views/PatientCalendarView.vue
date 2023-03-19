<script>
import Modal from '@/components/Modals/Modal.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import ScheduleModal from '@/components/Modals/PatientScheduleModal.vue'

import DeleteModal from '@/components/Modals/DeleteModal.vue'

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { axiosInstance } from '@/helpers';
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
        };
    },
    computed: {
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
        eventScheduled(event, isUpdated) {
            if(isUpdated) {
                this.updateVisit(event)
            } else {
                this.addVisit(event)
            }
        },
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
        </div>

        <div class="calendar-wrapper">
            <vue-cal :time-from="8 * 60" :time-to="18 * 60" :time-step="15" today-button
                :disable-views="['years', 'year']" hide-view-selector
                :editable-events="{ title: false, drag: false, resize: false, delete: false, create: false }"
                :events="events" :on-event-click="showModal">
            </vue-cal>
        </div>

        <ScheduleModal v-show="isModalVisible" @close="closeModal" @scheduled="eventScheduled" />
    </div>
</template>