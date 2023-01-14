<script>
import Modal from '../components/Dashboard/Layout/Modal.vue'
import AddIcon from '../components/icons/IconAdd.vue'
import CalendarIcon from '../components/icons/IconCalendar.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
    components: {
        Modal, 
        AddIcon,
        VueCal, 
        CalendarIcon
    },
    data() {
      return {
        isModalVisible: false,
        specialHours: {
            1: [{
                from: 9 * 60,
                to: 13 * 60,
                class: 'appointment',
                label: 'Appointment'
                },{
                    from: 14 * 60,
                    to: 16 * 60,
                    class: 'new-patient-visit',
                    label: 'New Patient Visit'
                }],
            2: {
                from: 9 * 60,
                to: 12 * 60,
                class: 'new-patient-visit',
                label: 'New Patient Visit'
            },
            3: [
                {
                from: 10 * 60,
                to: 12 * 60,
                class: 'appointment',
                label: 'Appointment',
                },
                {
                from: 14 * 60,
                to: 17 * 60,
                class: 'telehealth-visit',
                label: 'Telehealth Visit'
                }
            ],
            4: {
                from: 12 * 60,
                to: 16 * 60,
                class: 'personal',
                label: 'Personal'
            },
            5: {
                from: 9 * 60,
                to: 11 * 60,
                class: 'telehealth-visit',
                label: 'Telehealth Visit'
            },
            }
      };
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
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
                        <p>Appointment</p>
                        <span></span>
                    </li>
                    <li>
                        <p>New Patient Visit</p>
                        <span></span>
                    </li>
                    <li>
                        <p>Telehealth Visit</p>
                        <span></span>
                    </li>
                    <li>
                        <p>Personal</p>
                        <span></span>
                    </li>
                </ul>
            </div>

            <div class="calendar-btn" @click="showModal">
                <AddIcon />
                <button type="button" class="calendar-btn-text">Add New Event</button>
                <Modal v-show="isModalVisible" @close="closeModal">
                    <template #header>Add New Event</template>
                    <template #content>
                        <div class="type-select">
                            <div class="type-select-item active">Appointment</div>
                            <div class="type-select-item">Telehealth</div>
                            <div class="type-select-item">Personal</div>
                        </div>
                        <form>
                            <div class="popup-content-item">
                                <label>Patient Name</label>
                                <input type="text" />
                            </div>

                            <div class="popup-content-item">
                                <label class="label-w-icon">Date
                                    <input type="text" />
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
                        </form>
                    </template>
                    <template #footer></template>
                </Modal>
            </div>
        </div>

        <div class="calendar-wrapper">
            <vue-cal hide-view-selector :disable-views="['years', 'year', 'month']" :time-from="8 * 60" :time-to="18 * 60" :special-hours="specialHours">
                <template v-slot:no-event>
                    <div></div>
                </template>
            </vue-cal>
        </div>
    </div>
</template>