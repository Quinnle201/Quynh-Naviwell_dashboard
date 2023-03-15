<script>
import Header from '@/components/Dashboard/Layout/Header.vue'
import { Form, Field, FieldArray } from 'vee-validate';
import DateInput from '@/components/DateInput.vue';
import AddIcon from '@/components/icons/IconAdd.vue';
import CheckmarkIcon from '@/components/icons/IconCheckmark.vue';

export default {
    components: {
        Header, 
        Form, 
        Field, 
        FieldArray, 
        DateInput,
        AddIcon,
        CheckmarkIcon
    },
    data() {
        return {
            questions: [
                {value: 'Do you experience heartburn?'},
                {value: 'Do you experience dizziness?'},
                {value: 'Do you have brittle nails?'},
                {value: 'Frequent fast heartbeat?'},
                {value: 'Shortness of breath'},
                {value: 'Do you get headaches'},
                // {value: 'Muscle/leg cramping'},
                // {value: 'Lack of Motivation'},
                // {value: 'Dryness of skin'},
                // {value: 'Experience mental sluggishness'},
                // {value: 'Do you get sick frequently'},
                // {value: 'Slow wound healing'}
            ],
            // options: [
            //     {value: 'Never'},
            //     {value: 'Sometimes'},
            //     {value: 'Often'},
            //     {value: 'Always'},
            // ]
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
                <h4>Cardiovascular</h4>
                <h6>Do you have or have you experienced the following in the past year?</h6>
            </div>

            <div class="lifestyle-form">
                <p>Mark all that apply</p>

                <Form>
                    <FieldArray name="cardiovascular">
                        <fieldset v-for="(question, index) in questions" :key="index">
                                <div class="lifestyle-form-question">{{ index + 1 }}. {{ question.value }}</div>
                                <div class="lifestyle-form-options">
                                    <!-- <label v-for="(option, index) in options" :key="index">
                                        {{ option.value }}
                                        <Field type="radio" :name="'name'" :value="option.value" />
                                    </label> -->
                                    
                                    <div class="lifestyle-form-input">
                                       <Field type="radio" name="name" />
                                        <label>Never</label> 
                                    </div>
                                        
                                    <div class="lifestyle-form-input">
                                        <Field type="radio" name="name" />
                                        <label>Sometimes</label>
                                    </div>

                                    <div class="lifestyle-form-input">
                                        <Field type="radio" name="name" />
                                        <label>Often</label>
                                    </div>
                                    
                                    <div class="lifestyle-form-input">
                                        <Field type="radio" name="name" />
                                        <label>Always</label>
                                    </div>
                                </div>
                        </fieldset>
                    </FieldArray>
                </Form>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .welcome-wrapper {
        background-color: #F4F4FF;
        height: 100vh;
        margin: -4rem -0.5rem 0 -7.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .welcome-inner {
        background-color: rgba(255, 255, 255, .8);
        max-width: 40%;
        width: 100%;
        height: 85vh;
        margin: 0 auto;
        padding: 32px 40px;
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        align-items: center;
        border-radius: 16px;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .welcome-heading {
        text-align: center;
    }

    .welcome-heading h4 {
        margin: 0;
    }

    .welcome-heading h6 {
        margin: 0;
        color: var(--primary);
    }

    .lifestyle-form {
        width: 100%;
        margin-top: 16px;
    }

    .lifestyle-form p {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
    }

    .lifestyle-form fieldset {
        margin-bottom: 16px;
    }

    .lifestyle-form-question {
        font-size: 16px;
        font-weight: 500;
    }

    .lifestyle-form-options {
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
    }

    .lifestyle-form-input {
        max-width: 20%;
        flex: 0 0 20%;
        font-size: 14px;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
    }

    .lifestyle-form-input input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        z-index: 10;
        cursor: pointer;
        appearance: none;
    }

    .lifestyle-form-input input + label {
        background-color: var(--primary);
        width: 100%;
        height: 100%;
        padding: 4px 8px;
        border-radius: 16px;
    }

    .lifestyle-form-input input:checked + label {
        background-color: var(--main-color);
    }
</style>