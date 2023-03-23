<script>
import Modal from './Modal.vue'

import CheckIcon from '@/components/icons/IconCheck.vue'
import CalendarIcon from '@/components/icons/IconCalendar.vue'
import MapIcon from '@/components/icons/IconMap.vue'

import userMixin from '@/mixins/user.js'

import { useClinicStore } from '@/stores';


export default {
    props: {
        event: {
            type: Object,
        }
    },
    mixins: [
        userMixin
    ],
    components: {
        Modal,
        CheckIcon,
        CalendarIcon,
        MapIcon,
    },
    data() {
        const clinicStore = useClinicStore()
        return {
            clinicStore,
            visit_type: "",
            time: "",
            physician_name: "",
        }
    },
    watch: {
        event: {
            handler(value) {
                if(value != null){
                    const startTime = new Date(value.start_time)
                    const finishTime = new Date(value.finish_time)
                    let month = startTime.toLocaleString('en-us', { month: 'long' });
                    let day = startTime.toLocaleString('en-us', { day: 'numeric' });
                    this.time = `${day} ${month} at ${this.formatAmPmTime(startTime)} - ${this.formatAmPmTime(finishTime)}`
                    this.visit_type = value.visit_type_readable
                    this.physician_name = `Dr. ${this.userName(value.physician.user)}`
                }
            },
            immediate: true
        },
    },
    computed: {
        clinic() {
            return this.clinicStore.clinic;
        },
        formatAmPmTime() {
            return (time) => {
                const date = new Date(time);
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let am_pm = date.getHours() >= 12 ? "pm" : "am";
                hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
                minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
                return `${hours}:${minutes} ${am_pm}`
            }
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    }
}
</script>

<template>
    <Modal @close="closeModal">
        <template #header>{{ visit_type }}</template>
        <template #content>
            <div class="visit-details">
                <div class="visit-details-item">
                    <div class="visit-details-icon">
                        <CalendarIcon />
                    </div>

                    <div class="visit-details-info">
                        <span>Date & Time</span>
                        <div>{{ time }}</div>
                    </div>
                </div>
                <div class="visit-details-item">
                    <div class="visit-details-icon">
                        <img src="@/assets/img/stethoscope.png" alt="Icon" />
                    </div>
                    <div class="visit-details-info">
                        <span>Physician</span>
                        <div>{{ physician_name }}</div>
                    </div>
                </div>
                <div class="visit-details-item">
                    <div class="visit-details-icon">
                        <MapIcon />
                    </div>
                    <div class="visit-details-info">
                        <span>Clinic</span>
                        <div>{{ clinic.name }}</div>
                        <div>{{ clinic.address }}</div>
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