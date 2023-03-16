<script>
import QuestionnaireIcon from '@/components/icons/IconQuestionnaire.vue'

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

export default {
    components: {
        QuestionnaireIcon
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            quizzes: [],
        }
    },
    mounted() {
        this.getQuizList()
    },
    computed: {
        localDate() {
            return (time) => new Date(time).format('DD.MM.YYYY')
        },
    },
    methods: {
        getQuizList() {
            axiosInstance.get('/quizzes')
                .then(response => {
                    this.quizzes = response.data.data.quizzes
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        }
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>My Quizzes & Questionnaires</h3>
        </div>

        <div class="page-bg">
            <div class="q-title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ante magna, rutrum sit amet ante a, ultrices
                aliquet quam.
            </div>

            <ul class="q-list">
                <li v-for="(quiz, index) in quizzes" :key="quiz.id">
                    <div class="q-list-icon">
                        <QuestionnaireIcon />
                    </div>
                    <div class="q-info">
                        <div>{{quiz.title}}</div>
                        <span>{{quiz.questions.length}} questions</span>
                    </div>
                    <RouterLink :to="{ name: 'question-details', params: { id: quiz.id } }">Begin</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>