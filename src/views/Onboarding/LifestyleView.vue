<script>
import Header from '@/components/Dashboard/Layout/Header.vue'
import { Form, Field, FieldArray } from 'vee-validate';

export default {
    components: {
        Header, 
        Form, 
        Field, 
        FieldArray, 
    },
    data() {
        return {
        }
    },
    methods: {
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

            <Form class="info-form">
                <div class="info-form-inner">
                    <div class="info-form-inner-item">
                        <label class="info-form-item">
                            <Field as="select" name="sleep">
                                <option value="" disabled selected>Average hours of sleep</option>
                                <option></option>
                            </Field>
                        </label>
                        <label class="info-form-item">
                            <Field as="select" name="activity">
                                <option value="" disabled selected>Activity Level (minimum of 30 minutes of activity/day)</option>
                                <option></option>
                            </Field>
                        </label>
                        <label class="info-form-item">
                            <Field as="select" name="bmi">
                                <option value="" disabled selected>BMI</option>
                                <option></option>
                            </Field>
                        </label>
                        <label class="info-form-item">
                            <Field as="select" name="stress">
                                <option value="" disabled selected>Stress levels</option>
                                <option></option>
                            </Field>
                        </label>
                        <label class="info-form-item">
                            <Field as="select" name="waist">
                                <option value="" disabled selected>Waist</option>
                                <option></option>
                            </Field>
                        </label>
                        <label class="info-form-item">
                            <Field as="select" name="alcohol">
                                <option value="" disabled selected>Alcoholic beverages per week</option>
                                <option></option>
                            </Field>
                        </label>
                        <label class="info-form-item">
                            <Field as="select" name="caffeine">
                                <option value="" disabled selected>Caffeinated Bev per day</option>
                                <option></option>
                            </Field>
                        </label>
                        <label class="info-form-item">
                            <Field as="select" name="eatout">
                                <option value="" disabled selected>Do you eat out more than 3x/week?</option>
                                <option></option>
                            </Field>
                        </label>

                        <label class="info-form-checkbox">
                            <Field type="checkbox" name="yes" value="yes" />
                            I am interested in learning about living a healthier lifestyle
                        </label>
                    </div>

                    <div class="info-form-button">Next</div>
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