<script>
import AddIcon from '../components/icons/IconAdd.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
    components: {
        VueCal, 
        AddIcon
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
                <div class="calendar-btn-text">Add New Event</div>
            </div>
        </div>

        <div class="calendar-wrapper">
            <vue-cal />
        </div>
    </div>
</template>