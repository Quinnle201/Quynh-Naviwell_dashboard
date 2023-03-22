<script>
import Header from '@/components/Dashboard/Layout/Header.vue'
import { Form, Field, FieldArray } from 'vee-validate';
import DateInput from '@/components/DateInput.vue';
import AddIcon from '@/components/icons/IconAdd.vue';
import CheckmarkIcon from '@/components/icons/IconCheckmark.vue';

import { useAlertStore, useProgrammaticAccesStore } from '@/stores';


export default {
    components: {
        Header, 
        Form, 
        Field, 
        FieldArray, 
        CheckmarkIcon
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            sections: [
                {
                    title: "Cardiovascular",
                    codename: "cardio",
                    questions: [
                        {text: 'Do you experience heartburn?', value: -1},
                        {text: 'Do you experience dizziness?', value: -1},
                        {text: 'Do you have brittle nails?', value: -1},
                        {text: 'Frequent fast heartbeat?', value: -1},
                        {text: 'Shortness of breath', value: -1},
                        {text: 'Do you get headaches', value: -1},
                        {text: 'Muscle/leg cramping', value: -1},
                        {text: 'Lack of Motivation', value: -1},
                        {text: 'Dryness of skin', value: -1},
                        {text: 'Experience mental sluggishness', value: -1},
                        {text: 'Do you get sick frequently', value: -1},
                        {text: 'Slow wound healing', value: -1},
                    ],
                },
                {
                    title: "Glucose",
                    codename: "glucose",
                    questions: [
                        {text: 'Experienced recent weight gain?', value: -1},
                        {text: 'Get light-headed if meals are missed?', value: -1},
                        {text: 'Fatigue after meals?', value: -1},
                        {text: 'Crave sweets during the day?', value: -1},
                        {text: 'Frequent thirst or appetite?', value: -1},
                        {text: 'Feel shaky, jittery, or moody if missed meals?', value: -1},
                        {text: 'Do you snore at night?', value: -1},
                        {text: 'Difficulty losing weight?', value: -1},
                        {text: 'Edema or swelling in ankles, feet, hands or wrists?', value: -1},
                        {text: 'Decreased physical stamina?', value: -1},
                        {text: 'Heart palpitations?', value: -1},
                        {text: 'Hungry after meals?', value: -1},
                    ],
                },
                {
                    title: "Endocrine",
                    codename: "endo",
                    questions: [
                        {text: 'Do you experience mood changes?', value: -1},
                        {text: 'Inability to concentrate?', value: -1},
                        {text: 'Menstruation changes/infrequency (female)', value: -1},
                        {text: 'Difficulty with erections? (males)', value: -1},
                        {text: 'Cannot fall/stay asleep?', value: -1},
                        {text: 'Crave salt or salty foods?', value: -1},
                        {text: 'Perspire easily?', value: -1},
                        {text: 'Gain weight easily?', value: -1},
                        {text: 'Feel cold frequently?', value: -1},
                        {text: 'Decreased or low libido?', value: -1},
                        {text: 'Thinning of hair?', value: -1},
                        {text: 'Time of day with low energy?', value: -1},
                    ],
                },
                {
                    title: "GI & Hepatic",
                    codename: "gi",
                    questions: [
                        {text: 'Frequent diarrhea/constipation?', value: -1},
                        {text: 'Acne/Unhealthy Skin?', value: -1},
                        {text: 'Sensitive to smells and odors?', value: -1},
                        {text: 'Increased food reactions?', value: -1},
                        {text: 'Bloating, belching, burping?', value: -1},
                        {text: 'Skin outbreaks or rash?', value: -1},
                        {text: 'Stool color abnormal?', value: -1},
                        {text: 'Taking more than 2 medications?', value: -1},
                        {text: 'Hemorrhoids?', value: -1},
                        {text: 'Frequent gas?', value: -1},
                        {text: 'Experience irritable bowels?', value: -1},
                        {text: 'Dry flaky skin or hair?', value: -1},
                    ],
                },
            ],
            currentSectionIdx: 0,
            currentPartIdx: 0,
        }
    },
    methods: {
        actionNext() {
            if(this.currentPartIdx == 1) {

                if(this.currentSectionIdx == this.sections.length-1) {
                    this.checkQuizAnswers()                    
                    return
                }
                this.currentSectionIdx +=1
                this.currentPartIdx = 0
            } else {
                this.currentPartIdx = 1
            }
        },
        checkQuizAnswers() {
            let errors = false;
            let answers = {};
            this.sections.forEach(section => {
                answers[section.codename] = []
                section.questions.forEach(question => {
                    if(!question.value || question.value == -1) {
                        errors = true;
                    }
                    answers[section.codename].push(question.value)
                });
            });

            if(errors) {
                this.currentSectionIdx = 0;
                this.currentPartIdx = 0
                this.alertStore.error("Please provide answers to all of the questions!")
                return;
            }

            //proceed to lifestyle:
            const programmaticAccess = useProgrammaticAccesStore();
            programmaticAccess.tempData.quiz = answers
            programmaticAccess.setAccessPage('lifestyle')
        },
    },
    computed: {
        questionIndex() {
            return (originalIndex) => {
                return originalIndex + (this.currentPartIdx*6)
            }
        },
        currentSection() {
            return this.sections[this.currentSectionIdx]
        },
        questionsArray() {
            let q = this.currentSection.questions;
            let idx = this.currentPartIdx
            return q.slice(idx * 6, (6 * (idx+1)) )
            
        },
        progressClass() {
            return (index) => {
                var progressClass = []
                if (this.currentSectionIdx == index) {
                    progressClass.push("active")
                }
                if (this.currentSectionIdx > index) {
                    progressClass.push("complete")
                }

                return progressClass.join(" ")
            }
        },
    }
}
</script>
<template>
    <Header />
    <div class="welcome-wrapper">
        <div class="quiz-progressbar"> 
            <ul>
                <template v-for="(section, index) in sections" >
                <li :class="progressClass(index)">{{section.title}}</li>
                <li class="quiz-progressbar-separator" v-if="index < sections.length-1">
                    <CheckmarkIcon />
                </li>
                </template>
            </ul>
        </div>
        
        <div class="welcome-inner">
            
            <div class="welcome-heading">
                <span>{{ currentPartIdx+1 }}/2</span>
                <transition-group name="list">
                    <h4 :key="currentSectionIdx">{{currentSection.title}}</h4>
                </transition-group>
                <h6>Do you have or have you experienced the following in the past year?</h6>
            </div>
            <div class="quiz-form">
                <p>Mark all that apply</p>
                
                <Form :keepValues="true">
                    
                    <FieldArray :name="currentSection.codename">
                        <transition-group name="list">
                            <fieldset v-for="(question, index) in questionsArray" :key="questionIndex(index)">
                                    <div class="quiz-form-question">{{ questionIndex(index) + 1 }}. {{ question.text }}</div>
                                    <div class="quiz-form-options">
                                        <div class="quiz-form-input">
                                            <Field type="radio" :name="`${currentSection.codename}[${questionIndex(index)}]`" v-model="currentSection.questions[questionIndex(index)].value" value="0" />
                                            <label>Never</label> 
                                        </div>
                                            
                                        <div class="quiz-form-input">
                                            <Field type="radio" :name="`${currentSection.codename}[${questionIndex(index)}]`" v-model="currentSection.questions[questionIndex(index)].value" value="1" />
                                            <label>Sometimes</label>
                                        </div>

                                        <div class="quiz-form-input">
                                            <Field type="radio" :name="`${currentSection.codename}[${questionIndex(index)}]`" v-model="currentSection.questions[questionIndex(index)].value" value="2" />
                                            <label>Often</label>
                                        </div>
                                        
                                        <div class="quiz-form-input">
                                            <Field type="radio" :name="`${currentSection.codename}[${questionIndex(index)}]`" v-model="currentSection.questions[questionIndex(index)].value" value="3" />
                                            <label>Always</label>
                                        </div>
                                    </div>
                            </fieldset>
                        </transition-group>
                    </FieldArray>
                    
                    <button type="button" @click="actionNext" class="quiz-form-button">Next</button>
                </Form>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
    .list-enter-from {
        opacity: 0;
        transform: translateX(50px);
    }
    .list-move, /* apply transition to moving elements */
    .list-enter-active  
    {
        transition: all 0.8s ease;
    }
    .list-leave-active {
        transition: all 0s ease;
        opacity: 0;
        position: absolute;
    }

    .welcome-wrapper {
        background-color: #F4F4FF;
        min-height: calc(100vh - 64px);
        margin: 0px -0.5rem 0 -7.5rem;
        padding-bottom: 32px;
        display: flex;
        flex-direction: column;
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
        /* min-height: 78vh; */
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

    @media screen and (max-width: 1440px) {
        /* .welcome-wrapper {
            height: 94vh;
        } */
        
        .quiz-progressbar, 
        .welcome-inner {
            max-width: 60%;
        }
    }

    @media screen and (max-width: 1199px) {
        .quiz-progressbar, 
        .welcome-inner {
            max-width: 80%;
        }
    }

    @media screen and (max-width: 768px) {
        .quiz-progressbar ul li {
            font-size: 14px;
        }

        .quiz-progressbar ul li.active {
            font-size: 16px;
        }

        .welcome-inner {
            padding: 16px 24px;
        }

        .welcome-heading h4 {
            font-size: 20px;
        }

        .welcome-heading h6 {
            font-size: 14px;
        }

        .quiz-form-button {
            margin-top: 16px;
            font-size: 16px;
        }
    }

    @media screen and (max-width: 576px) {
        .quiz-progressbar, 
        .welcome-inner {
            max-width: 90%;
        }

        .quiz-form-input {
            max-width: 100%;
            flex: auto;
        }

        .quiz-form-options {
            gap: 8px;
        }

        .quiz-form-input input + label:before {
            display: none;
        }

        .quiz-progressbar ul {
            display: grid;
            grid-template-columns: 35fr 15fr 35fr 15fr;
        }

        .quiz-progressbar ul li {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .quiz-progressbar ul li.quiz-progressbar-separator {
            max-width: 50%;
            margin: 0 4px;
            overflow: visible;
        }

        .quiz-form-button {
            min-width: 100%;
        }
    }

    @media screen and (max-width: 375px) {
        

        .welcome-heading h4 {
            font-size: 18px;
            margin-bottom: 4px;
        }

        .welcome-inner {
            padding: 16px 12px;
        }
    }
</style>