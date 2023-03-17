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
        CheckmarkIcon
    },
    data() {
        return {
            questions: [
                {text: 'Do you experience heartburn?', value: ''},
                {text: 'Do you experience dizziness?', value: ''},
                {text: 'Do you have brittle nails?', value: ''},
                {text: 'Frequent fast heartbeat?', value: ''},
                {text: 'Shortness of breath', value: ''},
                {text: 'Do you get headaches', value: ''},
                // {value: 'Muscle/leg cramping'},
                // {value: 'Lack of Motivation'},
                // {value: 'Dryness of skin'},
                // {value: 'Experience mental sluggishness'},
                // {value: 'Do you get sick frequently'},
                // {value: 'Slow wound healing'}
            ],
        }
    },
    methods: {
    },
}
</script>
<template>
    <Header />
    <div class="welcome-wrapper">
        <div class="quiz-progressbar">
            <ul>
                <li class="complete">Glucose</li>
                <li class="quiz-progressbar-separator">
                    <CheckmarkIcon />
                </li>
                <li class="active">Cardiovascular</li>
                <li class="quiz-progressbar-separator">
                    <CheckmarkIcon />
                </li>
                <li>Endocrine</li>
                <li class="quiz-progressbar-separator">
                    <CheckmarkIcon />
                </li>
                <li>GI & Hepatic</li>
            </ul>
        </div>
        
        <div class="welcome-inner">
            <div class="welcome-heading">
                <span>1/2</span>
                <h4>Cardiovascular</h4>
                <h6>Do you have or have you experienced the following in the past year?</h6>
            </div>

            <div class="quiz-form">
                <p>Mark all that apply</p>

                <Form>
                    <FieldArray name="cardiovascular">
                        <fieldset v-for="(question, index) in questions" :key="index">
                                <div class="quiz-form-question">{{ index + 1 }}. {{ question.text }}</div>
                                <div class="quiz-form-options">
                                    <div class="quiz-form-input">
                                        <Field type="radio" :name="`${question.text}`" v-model="question.value" />
                                        <label>Never</label> 
                                    </div>
                                        
                                    <div class="quiz-form-input">
                                        <Field type="radio" :name="`${question.text}`" v-model="question.value" />
                                        <label>Sometimes</label>
                                    </div>

                                    <div class="quiz-form-input">
                                        <Field type="radio" :name="`${question.text}`" v-model="question.value" />
                                        <label>Often</label>
                                    </div>
                                    
                                    <div class="quiz-form-input">
                                        <Field type="radio" :name="`${question.text}`" v-model="question.value" />
                                        <label>Always</label>
                                    </div>
                                </div>
                        </fieldset>
                    </FieldArray>

                    <button class="quiz-form-button">Next</button>
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .quiz-progressbar {
        background-color: #FFFFFF;
        max-width: 40%;
        width: 100%;
        height: auto;
        margin: 0 auto 16px;
        padding: 8px 16px;
        border-radius: 16px;
    }

    .quiz-progressbar ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
    }

    .quiz-progressbar ul li {
        font-size: 14px;
        font-weight: 500;
        color: #CCCCCC;
        white-space: nowrap;
    }

    .quiz-progressbar ul li.quiz-progressbar-separator {
        background-color: #CCCCCC;
        width: 100%;
        height: 1px;
        margin: 0 8px;
    }

    .quiz-progressbar ul li.quiz-progressbar-separator svg {
        background-color: #FFFFFF;
        width: 28px;
        height: 28px;
        padding: 0 8px;
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .quiz-progressbar ul li.complete {
        color: #74C973;
    }

    .quiz-progressbar ul li.complete + li.quiz-progressbar-separator {
        background-color: #CCEED0;
        /* opacity: .4; */
    }

    .quiz-progressbar ul li.complete + li.quiz-progressbar-separator svg {
        display: block;
    }

    .quiz-progressbar ul li.active {
        font-size: 16px;
        color: var(--main-color);
    }

    .quiz-progressbar ul li.active + li.quiz-progressbar-separator {
        background-color: var(--main-color);
        opacity: .4;
    }

    .welcome-inner {
        background-color: rgba(255, 255, 255, .8);
        max-width: 40%;
        width: 100%;
        min-height: 78vh;
        height: auto;
        margin: 0 auto;
        padding: 26px 40px;
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
        color: var(--main-color);
    }

    .welcome-heading span {
        background-color: #CCCCCC;
        margin: 0;
        padding: 4px 8px;
        font-size: 16px;
        color: #FFFFFF;
        border-radius: 16px;
    }

    .welcome-heading h6 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        margin-top: 4px;
    }

    .quiz-form {
        width: 100%;
        margin-top: 16px;
    }

    .quiz-form p {
        margin: 0 0 4px 0;
        font-size: 14px;
        font-weight: 400;
        color: var(--primary);
    }

    .quiz-form fieldset {
        margin-bottom: 16px;
    }

    .quiz-form-question {
        font-size: 16px;
        font-weight: 500;
    }

    .quiz-form-options {
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
    }

    .quiz-form-input {
        max-width: 24%;
        flex: 0 0 24%;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
    }

    .quiz-form-input input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        z-index: 10;
        cursor: pointer;
        appearance: none;
    }

    .quiz-form-input input + label {
        /* background-color: var(--primary); */
        width: 100%;
        height: 100%;
        padding: 4px 0;
        position: relative;
        border: 1px solid #CCCCCC;
        border-radius: 16px;
    }

    .quiz-form-input input:checked + label {
        background-color: var(--primary);
        color: #FFFFFF;
        border: 1px solid var(--primary);
    }

    .quiz-form-input input + label:before {
        content: '';
        background-color: #FFFFFF;
        width: 16px;
        height: 16px;
        position: absolute;
        left: 8px;
        top: 8px;
        border: 1px solid #CCCCCC;
        border-radius: 50%;
        z-index: 2;
    }

    .quiz-form-input input:checked + label:before {
        background-color: var(--main-color);
        border: 4px solid #FFFFFF;
    }

    .quiz-form form {
        display: flex;
        flex-direction: column;
    }

    .quiz-form-button {
        background-color: var(--primary);
        min-width: 220px;
        width: auto;
        height: 56px;
        margin-top: 32px;
        padding: 12px 32px;
        align-self: center;
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
        border-radius: 16px;
        cursor: pointer;
    }
</style>