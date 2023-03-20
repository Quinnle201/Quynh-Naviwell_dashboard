<script>
import Header from '@/components/Dashboard/Layout/Header.vue'
import { Form, Field, FieldArray } from 'vee-validate';

import { useAlertStore, useAuthStore, useProgrammaticAccesStore } from '@/stores';

import { axiosInstance } from '@/helpers';


export default {
    components: {
        Header, 
        Form, 
        Field, 
        FieldArray, 
    },
    data() {
        const alertStore = useAlertStore()
        const authStore = useAuthStore();
        return {
            alertStore,
            authStore,
            quizData: null,
            lifestyleDropdowns: [],
            interested_healthier: "1"
        }
    },
    computed: {
        patientId() {
            return this.authStore.user.profile_id
        }

    },
    methods: {
        submitQuizForm(values) {
            let errors = false;
            Object.entries(values).forEach(element => {
                if(!element[1]) {
                    errors = true;
                }
            });
            if(errors) {
                this.alertStore.error("Please provide answers to all of the questions!");
                return;
            }
            const formData = {
                sections: this.quizData,
                lifestyle_data: values
            }
            axiosInstance.post(`/patients/${this.patientId}/questionnaire`, formData)
                .then(response => {
                    const programmaticAccess = useProgrammaticAccesStore();
                    programmaticAccess.tempData.pdf = response.data.data.questionnaire?.patient_report
                    programmaticAccess.setAccessPage('complete-info')
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        getLifestyleData() {
            axiosInstance.get('/patients/data')
                .then(response => {
                    const lifestyleData = response.data.data
                    this.lifestyleDropdowns.push({
                        label: "Average hours of sleep",
                        codename: "sleep_hours",
                        values: Object.entries(lifestyleData.sleep_hours).map(item => ({value: item[0], label: item[1]}))
                    })
                    this.lifestyleDropdowns.push({
                        label: "Activity Level (minimum of 30 minutes of activity/day)",
                        codename: "activity_level",
                        values: Object.entries(lifestyleData.activity_level).map(item => ({value: item[0], label: item[1]}))
                    })

                    this.lifestyleDropdowns.push({
                        label: "Stress levels",
                        codename: "stress_levels",
                        values: Object.entries(lifestyleData.stress_levels).map(item => ({value: item[0], label: item[1]}))
                    })
                    this.lifestyleDropdowns.push({
                        label: "Waist",
                        codename: "waist_size",
                        values: Object.entries(lifestyleData.waist_size).map(item => ({value: item[0], label: item[1]}))
                    })
                    this.lifestyleDropdowns.push({
                        label: "Alcoholic beverages per week",
                        codename: "alcohol_consumption",
                        values: Object.entries(lifestyleData.alcohol_consumption).map(item => ({value: item[0], label: item[1]}))
                    })
                    this.lifestyleDropdowns.push({
                        label: "Caffeinated Bev per day",
                        codename: "caffeine_consumption",
                        values: Object.entries(lifestyleData.caffeine_consumption).map(item => ({value: item[0], label: item[1]}))
                    })
                    this.lifestyleDropdowns.push({
                        label: "Do you eat out more than 3x/week?",
                        codename: "eat_out_level",
                        values: [{label: "Yes", value: "1"}, {label: "No", value: "0"}]
                    })
                    

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        }
    },
    mounted() {
        const programmaticAccess = useProgrammaticAccesStore();
        this.quizData = programmaticAccess.tempData.quiz

        this.getLifestyleData()
    }
}
</script>
<template>
    <Header />
    <div class="welcome-wrapper">
        <div class="welcome-inner">
            <div class="welcome-heading">
                <h4>Lifestyle</h4>
                <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h6>
            </div>

            <Form class="info-form" @submit="submitQuizForm">
                <div class="info-form-inner">
                    <div class="info-form-inner-item">

                        <label class="info-form-item" v-for="dropdown in lifestyleDropdowns">
                            <Field as="select" :name="dropdown.codename">
                                <option value="" disabled selected>{{dropdown.label}}</option>
                                <option v-for="option in dropdown.values" :value="option.value">{{ option.label }}</option>
                            </Field>
                        </label>

                        <label class="info-form-checkbox">
                            <Field type="checkbox" name="interested_healthier" value="1" unchecked-value="0" v-model="interested_healthier"/>
                            I am interested in learning about living a healthier lifestyle
                        </label>
                    </div>

                    <button class="info-form-button">Next</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped>
    .welcome-wrapper {
        background-color: #F4F4FF;
        height: 100vh;
        margin: -4rem -0.5rem 0 -7.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .welcome-inner {
        background-color: rgba(255, 255, 255, .8);
        max-width: 40%;
        width: 100%;
        height: 85vh;
        margin: 0 auto;
        padding: 26px 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 16px;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
        /* overflow-y: auto; */
    }

    .welcome-heading {
        text-align: center;
    }

    .welcome-heading h6 {
        color: var(--primary);
    }

    .info-form {
        max-width: 80%;
        width: 100%;
        height: 100%;
        margin: 24px auto 0;
        overflow: auto;
    }

    .info-form-inner-item {
        overflow-y: auto;
    }

    .info-form-inner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .info-form-inner-item {
        width: 100%;
    }

    .info-form-label {
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: 500;
    }

    .info-form .info-form-item {
        width: 100%;
        font-size: 16px;
        font-weight: 500;
    }

    .info-form .info-form-item input, 
    .info-form .info-form-item select {
        background-color: #FFFEFE;
        width: 100%;
        height: 50px;
        min-height: 50px;
        margin-bottom: 16px;
        padding: 4px 10px;
        display: block;
        font-size: 16px;
        border: 1px solid #CCCCCC;
        border-radius: 16px;
        outline: none;
        transition: .3s ease;
    }

    .info-form .info-form-item input::placeholder {
        font-size: 14px;
    }

    .info-form .info-form-item select {
        background-image: url(/src/assets/img/select-icon.svg);
        background-repeat: no-repeat;
        background-position: top 50% left 96%;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    .info-form-button, 
    .info-form button {
        background-color: var(--primary);
        width: 100%;
        height: 56px;
        margin-top: 32px;
        padding: 12px 32px;
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
        border-radius: 16px;
        cursor: pointer;
    }

    .info-form-checkbox {
        display: flex;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
    }

    .info-form-checkbox input[type='checkbox'] {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        accent-color: var(--main-color);
        cursor: pointer;
    }
</style>