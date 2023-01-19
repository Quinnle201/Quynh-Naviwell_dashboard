<script>
    export default {
    data() {
        return {
        hours: null,
        minutes: null,
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
        hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
        minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
        this.hours = hours;
        this.minutes = minutes;
        }
    }
    }
</script>

<template>
    <div class="time-wrapper">
        <div>{{ hours }}</div>
        <div>:</div>
        <div>{{ minutes }}</div>
    </div>
</template>

<style>
    .time-wrapper {
        display: flex;
    }
</style>