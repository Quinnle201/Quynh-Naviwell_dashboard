<script>
import Modal from '../components/Dashboard/Layout/Modal.vue'
import AddIcon from '../components/icons/IconAdd.vue'
import CalendarIcon from '../components/icons/IconCalendar.vue'
import CheckIcon from '../components/icons/IconCheck.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
    components: {
        Modal, 
        AddIcon,
        VueCal, 
        CalendarIcon,
        CheckIcon
    },
    data() {
      return {
        isModalVisible: false,
        selectedEvent: {},
        showDialog: false,
        events: [
            {
                start: '2023-01-23 11:00',
                end: '2023-01-23 14:30',
                title: 'Initial NaviWell Visit',
                content: 'Thomas Edison',
                class: 'box_blue',
                label: 'Initial NaviWell Visit'
            },
            {
                start: '2023-01-23 17:00',
                end: '2023-01-23 19:30',
                title: 'Wellness Coach Visit',
                content: 'Thomas Edison',
                class: 'box_green',
                label: 'Wellness Coach Visit'
            },
            {
                start: '2023-01-24 10:00',
                end: '2023-01-24 13:30',
                title: 'Initial NaviWell Visit',
                content: 'Thomas Edison',
                class: 'box_blue',
                label: 'Initial NaviWell Visit'
            },
            {
                start: '2023-01-24 16:00',
                end: '2023-01-24 18:30',
                title: 'Wellness Coach Visit',
                content: 'Thomas Edison',
                class: 'box_green',
                label: 'Wellness Coach Visit'
            },
            {
                start: '2023-01-25 12:00',
                end: '2023-01-25 14:30',
                title: 'Dietitian Visit',
                content: 'Thomas Edison',
                class: 'box_pink',
                label: 'Dietitian Visit'
            },
            {
                start: '2023-01-25 17:30',
                end: '2023-01-25 19:30',
                title: 'Follow-Up Visit',
                content: 'Thomas Edison',
                class: 'box_yellow',
                label: 'Follow-Up Visit'
            },
            {
                start: '2023-01-26 14:00',
                end: '2023-01-26 17:30',
                title: 'Initial NaviWell Visit',
                content: 'Thomas Edison',
                class: 'box_blue',
                label: 'Initial NaviWell Visit'
            },
            {
                start: '2023-01-26 9:00',
                end: '2023-01-26 11:30',
                title: 'Dietitian Visit',
                content: 'Thomas Edison',
                class: 'box_pink',
                label: 'Dietitian Visit'
            },
            {
                start: '2023-01-27 17:00',
                end: '2023-01-27 20:30',
                title: 'Initial NaviWell Visit',
                content: 'Thomas Edison',
                class: 'box_blue',
                label: 'Initial NaviWell Visit'
            },
        ]
      };
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        onEventClick (event, e) {
            this.selectedEvent = event;
            this.showDialog = true;
            e.stopPropagation()
        },
        closeDialog() {
            this.showDialog = false;
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
                                <input type="text" class="popup-content-item-input" />
                            </div>

                            <div class="popup-content-item">
                                <label class="label-w-icon">Date
                                    <input type="text" class="popup-content-item-input" />
                                    <CalendarIcon />
                                </label>
                            </div>

                            <div class="popup-content-item-wrapper">
                                <div class="popup-content-item">
                                    <label>From</label>
                                    <select>
                                        <option value="">09:00</option>
                                    </select>
                                </div>

                                <div class="popup-content-item">
                                    <label>To</label>
                                    <select>
                                        <option value="">09:30</option>
                                    </select>
                                </div>
                            </div>

                            <div class="popup-content-item">
                                <label for="textarea">Notes</label>
                                <textarea id="textarea"></textarea>
                            </div>

                            <div class="popup-footer">
                                <button type="button" class="w-btn w-btn-close" @click="closeModal">
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

        <div class="calendar-wrapper">
            <vue-cal selected-date="2023-01-24"
                :time-from="8 * 60"
                :time-to="23 * 60"
                :disable-views="['years', 'year']"
                hide-view-selector
                :editable-events="{ title: false, drag: false, resize: false, delete: false, create: false }"
                :events="events" 
                :on-event-click="onEventClick">
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
                                <input type="text" class="popup-content-item-input" :value="selectedEvent.start && selectedEvent.start.format('DD/MM/YYYY')" />
                                <CalendarIcon />
                            </label>
                        </div>

                        <div class="popup-content-item-wrapper">
                            <div class="popup-content-item">
                                <label>From</label>
                                <select>
                                    <option value="selectedEvent.start && selectedEvent.start.formatTime()">{{ selectedEvent.start && selectedEvent.start.formatTime() }}</option>
                                </select>
                            </div>

                            <div class="popup-content-item">
                                <label>To</label>
                                <select>
                                    <option value="selectedEvent.end && selectedEvent.end.formatTime()">{{ selectedEvent.end && selectedEvent.end.formatTime() }}</option>
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