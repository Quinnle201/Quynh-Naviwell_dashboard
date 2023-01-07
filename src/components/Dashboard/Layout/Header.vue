<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

</script>

<template>
    <header class="navbar ms-auto fixed-top  flex-md-nowrap">
        <div class="container-fluid">
            <img class="ms-3 my-0" height="48" src="@/assets/naviwell-logo.png" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation" />
            <div class="d-flex flex-row ms-auto gap-1 mx-2">
                <img src="https://github.com/mdo.png" alt="mdo" width="48" height="48" class="rounded-circle">
                <div class="text-center">
                    <a href="#" class="nav-link link-dark px-2 active" aria-current="page">{{authStore.user?.name}}</a>
                    <a href="#" @click="authStore.logout()" class="link-secondary text-decoration-none">Log Out</a>
                </div>
            </div>
        </div>
    </header>
</template>