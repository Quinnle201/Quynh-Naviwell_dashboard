<script setup>
import Header from './Layout/Header.vue'
import Sidebar from './Layout/Sidebar.vue'
</script>

<template>
    <Header />
    <div class="container-fluid">
        <div class="row">
            <Sidebar />
            <main>
                <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </main>
        </div>
    </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>