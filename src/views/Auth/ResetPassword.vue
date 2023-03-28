<script setup>
import { useAuthStore, useClinicStore } from '@/stores';
import { ref, computed } from 'vue'

const email = ref("")
const password = ref("")
const isLoading = ref(false)
const clinicStore = useClinicStore();

 const clinic = computed(() => {
    return clinicStore.clinic
})

async function onSubmit() {
    isLoading.value = true
    const authStore = useAuthStore();
    const loggedIn = await authStore.login(email.value, password.value);
    if(!loggedIn) {
        isLoading.value = false
    }
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
                    <img v-if="clinicStore.logoRef" :src="clinicStore.logoRef" :alt="clinic.name + ' Logo'">
                    <div>
                        <span>{{clinic.name}}</span>
                        <span>{{clinic.description}}</span>
                    </div>
                </div>

                <div class="forgot-pass-text">
                    <h6>Forgot password?</h6>
                    <p>Please, enter the email address associated with your account</p>
                </div>
                
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>Enter email address</label>
                        <input name="password"  v-model="password" type="password" class="form-control" />
                    </div>
                    <div class="form-group login-btn">
                        <button :disabled="isLoading">
                            <div v-if="isLoading" id="loading"></div>
                            <template v-else>Reset password</template>
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .login-wrapper {
        background-color: #F4F4FF;
        height: 100vh;
        margin: -4rem -0.5rem 0 -7rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-inner {
        max-width: 480px;
        width: 100%;
        margin-top: -100px;
    }

    .login-inner-logo img {
        max-height: 19vh;
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
        margin-top: 16px;
    }

    .login-form .form-group {
        margin-bottom: 16px;
    }

    .login-form .form-group:last-child {
        margin-bottom: 0;
    }

    .login-form .form-group label {
        font-size: 16px;
        font-weight: 500;
    }

    .login-form .form-group input {
        height: 50px;
    }

    .login-form .login-btn {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-form .login-btn button {
        background-color: #5C90F1;
        min-width: 155px;
        width: auto;
        height: 40px;
        padding: 0 32px;
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 40px;
        border-radius: 20px;
    }

    .forgot-pass-text {
        margin-top: 35px;
        text-align: center;
    }

    .forgot-pass-text h6 {
        margin: 0 0 8px;
        font-size: 24px;
        color: var(--text-color);
    }

    .forgot-pass-text p {
        margin: 0;
        font-size: 18px;
        color: var(--text-color);
    }

    @media screen and (max-width: 768px), 
    screen and (max-height: 700px) {
        .login-inner {
            margin-top: 0;
        }

        .forgot-pass-text h6 {
            font-size: 20px;
        }

        .forgot-pass-text p {
            font-size: 16px;
        }
    }

    @media screen and (max-width: 576px) {
       .login-inner {
            max-width: 85%;
       }

       .login-inner-logo img {
            max-width: 180px;
       }

       .login-form {
            margin-top: 40px;
            padding: 18px 16px;
       }

       .login-form .login-btn {
            margin-top: 8px;
            align-items: center;
       }

       .login-form .login-btn button {
            min-width: auto;
            width: auto;
            height: 40px;
            font-size: 16px;
            line-height: 40px;
        }
    }

    @media screen and (max-width: 375px) {
        .login-inner {
            max-width: 95%;
       }
    }
</style>