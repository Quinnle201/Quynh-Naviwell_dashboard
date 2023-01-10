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

            <div class="calendar-btn">
                <AddIcon />
                <button type="button" class="calendar-btn-text" @click="showModal">Add New Event</button>
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
            <vue-cal />
        </div>
    </div>
</template>