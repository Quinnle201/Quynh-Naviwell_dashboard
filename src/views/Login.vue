<script setup>
import { useAuthStore } from '@/stores';
import { ref } from 'vue'

const email = ref("")
const password = ref("")

async function onSubmit() {
    const authStore = useAuthStore();
    await authStore.login(email.value, password.value);
}
</script>

<template>
    <div class="card m-3">
        <h4 class="card-header">Login</h4>
        <div class="card-body">
            <form @submit.prevent="onSubmit">
                <div class="form-group">
                    <label>Email</label>
                    <input name="email" v-model="email" type="email" class="form-control" />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input name="password"  v-model="password" type="password" class="form-control" />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary">
                        Login
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>
