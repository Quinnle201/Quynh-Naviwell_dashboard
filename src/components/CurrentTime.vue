<script>
import { formatAMPM } from '@/helpers';

    export default {
    data() {
        return {
            time: null,
        }
    },
    mounted() {
        setInterval(() => this.setTime(), 100)
    },
    methods: {
        setTime() {
            const date = new Date();
            this.time = formatAMPM(date);
        }
    }
    }
</script>

<template>
    <div class="time-wrapper">
        <div>{{ time }}</div>
    </div>
</template>

<style>
    .time-wrapper {
        display: flex;
    }
</style>