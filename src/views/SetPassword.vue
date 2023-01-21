<script setup>
import { useAuthStore } from '@/stores';
import { ref } from 'vue'

const authStore = useAuthStore();
const data = JSON.parse(window.atob(authStore.user));
const email = ref(data['email'])
const password = ref(data['password'])
const newPasword = ref("")
const newPasswordConfirmation = ref("")

async function onSubmit() {
    await authStore.changePassword(email.value, password.value, newPasword.value, newPasswordConfirmation.value, true);
}
</script>

<template>
    <div class="login-wrapper">
        <div class="login-inner">
            <div class="login-inner-logo">
                <img src="@/assets/img/naviwell-logo.png" alt="NaviWell Logo">
            </div>

            <div class="login-form">
                <div class="login-form-img">
                    <img src="@/assets/img/variohealth-logo.png" alt="VarioHealth Logo">
                    <div>
                        <span>VarioHealth</span>
                        <span>Advanced Integrative Medicine</span>
                    </div>
                </div>
                
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>Email</label>
                        <input name="email" v-model="email" type="email" class="form-control" disabled />
                    </div>
                    <div class="form-group">
                        <label>Temporary password</label>
                        <input name="password"  v-model="password" type="password" class="form-control" disabled />
                    </div>
                    <div class="form-group">
                        <label>New password</label>
                        <input name="password"  v-model="newPasword" type="password" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label>New password confirmation</label>
                        <input name="password"  v-model="newPasswordConfirmation" type="password" class="form-control" />
                    </div>
                    <div class="form-group login-btn">

                        <button>Proceed</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<style>
    .login-wrapper {
        background-color: #F4F4FF;
        height: 100vh;
        margin: -4.5rem -0.5rem -0.5rem -7.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-inner {
        max-width: 25vw;
        width: 100%;
        margin-top: -100px;
    }

    .login-inner-logo img {
        max-height: 180px;
        margin: 0 auto;
    }

    .login-form {
        background-color: #FFFFFF;
        width: 100%;
        margin: 80px auto 0;
        padding: 35px 30px;
        border-radius: 10px;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
    }

    .login-form-img {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-form-img img {
        max-width: 90px;
        max-height: 90px;
    }

    .login-form-img div {
        margin-left: 4px;
        display: flex;
        flex-direction: column;
        font-family: 'Montserrat';
        color: #3D77A2;
    }

    .login-form-img div span {
        font-weight: 500;
        font-size: 10px;
        line-height: 15px;
        white-space: nowrap;
    }

    .login-form-img div span:first-child {
        font-weight: 600;
        font-size: 20px;
        line-height: 29px;
    }

    .login-form form {
        margin-top: 35px;
    }

    .login-form .form-group {
        margin-bottom: 20px;
    }

    .login-form .form-group:last-child {
        margin-bottom: 0;
    }

    .login-form .form-group label {
        font-size: 16px;
        font-weight: 500;
    }

    .login-form .login-btn {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .login-form .login-btn button {
        background-color: #5C90F1;
        width: 155px;
        height: 40px;
        font-size: 18px;
        color: #FFFFFF;
        border-radius: 20px;
    }

    .login-form .login-btn .login-checkbox {
        display: flex;
        align-items: center;
    }

    .login-form .login-btn .login-checkbox label {
        margin-left: 5px;
        font-size: 14px;
    }

    .login-form .login-btn .login-checkbox input {
        width: 20px;
        height: 20px;
    }
</style>