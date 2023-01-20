<script>
    export default {
    data() {
        return {
            hours: null,
            minutes: null,
            am_pm: null
        }
    },
    mounted() {
        setInterval(() => this.setTime(), 100)
    },
    methods: {
        setTime() {
            const date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let am_pm = date.getHours() >= 12 ? "pm" : "am";
            hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
            minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
            this.hours = hours;
            this.minutes = minutes;
            this.am_pm = am_pm;
        }
    }
    }
</script>

<template>
    <div class="time-wrapper">
        <div>{{ hours }}</div>
        <div>:</div>
        <div>{{ minutes }}</div>
        <div>&nbsp;</div>
        <div>{{ am_pm }}</div>
    </div>
</template>

<style>
    .time-wrapper {
        display: flex;
    }
</style>