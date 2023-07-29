<script>

import { axiosInstance } from '@/helpers';
import { useAlertStore, useAuthStore } from '@/stores';

export default {
    data() {
        const alertStore = useAlertStore()
        const authStore = useAuthStore()
        return {
            alertStore,
            authStore,
            quizId: null,
            quizData: null,
            userAnswerData: null,
        }
    },
    computed: {
        user() {
            return this.authStore.user
        },
        answerClass() {
            return (questionId, answerId, quiz) => {
                if (quiz.correct == this.userAnswerData[questionId] && answerId == quiz.correct) {
                    return 'right-answer'
                } 
                else if(this.userAnswerData[questionId] == answerId) {
                    return 'wrong-answer'
                } else {
                    return ""
                }
            } 
        },
    },
    watch: {
        '$route.params': {
            handler(toParams, previousParams) {
                const id = toParams.id;
                if (id) {
                    this.getQuiz(id)
                }
            },
            immediate: true
        }
    },
    methods: {
        close() {
            this.$router.replace({ path: '/quizzes' })
        },
        getQuiz(id) {
            axiosInstance.get(`/quizzes/${id}`)
                .then(response => {
                    const data = response.data.data;
                    const userData = data.completedResults.find(({profile_id}) => profile_id == this.user.profile_id)
                    this.userAnswerData = JSON.parse(userData.answer_data)
                    this.quizData = data;
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                    this.close()
                });
        }
    }
}
</script>

<template>
    <div class="page-wrapper" v-if="this.quizData">
        <div class="layout-wrapper quiz">
            <h3>{{this.quizData.title}}</h3>
        </div>

        <div class="quizzes-wrapper page-bg">
            <div v-for="(quiz, index) in this.quizData.questions" :key="quiz.key" class="quiz-result-card">
                <span>Question {{ index + 1 }}</span>
                <div class="quiz-result-card-question">{{ quiz.text }}</div>
                <ul>
                    <li v-for="(answer, idx) in quiz.answers" :class="answerClass(index, idx, quiz)" >{{ answer }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>