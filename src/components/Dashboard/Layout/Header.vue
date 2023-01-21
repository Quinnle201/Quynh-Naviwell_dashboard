<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <header class="navbar ms-auto fixed-top flex-md-nowrap">
        <div class="container-fluid">
            <img class="ms-3 my-0" height="48" src="@/assets/naviwell-logo.png" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation" />
                <div class="header-datetime">
                    <span><CurrentTime /></span>
                    <span>{{currentDate()}}</span>
                </div>
                <div class="header-logo">
                    <div class="top-block-logo">
                        <img src="@/assets/img/variohealth-logo.png" alt="VarioHealth Logo" />
                        <div class="top-block-info_text">
                            <span>VarioHealth</span>
                            <span>Advanced Integrative Medicine</span>
                        </div>
                    </div>
                </div>
            <div class="d-flex flex-row gap-1 user-block">
                <img src="https://github.com/mdo.png" alt="mdo" width="48" height="48" class="rounded-circle">
                <div class="text-center">
                    <a href="#" class="nav-link link-dark px-2 active" aria-current="page">{{authStore.user?.name}}</a>
                    <a href="#" @click="authStore.logout()" class="link-secondary text-decoration-none">Log Out</a>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import CurrentTime from '../Layout/CurrentTime.vue';

    export default {
        components: {
            CurrentTime,
        },
        methods: {
            currentDate() {
                let date = new Date();
                let currentWeekday = date.toLocaleString('en-us', {weekday: 'short'});
                let currentMonth = date.toLocaleString('en-us', {month: 'short'});
                let currentDay = date.toLocaleString('en-us', {day: 'numeric'});
                let currentYear = date.toLocaleString('en-us', {year: 'numeric'});
                let currentDate = currentWeekday + ' ' + currentDay + ' ' + currentMonth + ' ' + currentYear;
                return currentDate;
            },
        }
    };
</script>