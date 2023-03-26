<script>
import QuestionnaireIcon from '@/components/icons/IconQuestionnaire.vue'
import Pagination from '@/components/Pagination.vue';

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

export default {
    components: {
        QuestionnaireIcon,
        Pagination
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            quizzes: [],
            totalPages: 1,
            currentPage: 1,
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
            if(this.quizzes[this.currentPage]) {
                return
            }
            axiosInstance.get(`/quizzes?page=${this.currentPage}`, { params: { per_page: 10 } })
                .then(response => {
                    const quizzes = response.data.data.quizzes
                    this.quizzes[this.currentPage] = quizzes
                    this.totalPages = response.data.data.meta.last
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        onPageChange(page) {
            this.currentPage = page;
            this.getQuizList()
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
                <li v-for="(quiz, index) in quizzes[currentPage]" :key="quiz.id" :class="quiz.isCompleted ? 'completed' : ''">
                    <div class="q-list-icon">
                        <QuestionnaireIcon />
                    </div>
                    <div class="q-info">
                        <div>{{quiz.title}}</div>
                        <span>{{quiz.questions.length}} questions</span>
                    </div>
                    <RouterLink v-if="!quiz.isCompleted" :to="{ name: 'question-details', params: { id: quiz.id } }">Begin</RouterLink>
                    <a v-else href="#">Completed</a>
                </li>
            </ul>

            <pagination
                v-if="totalPages > 1"
                :totalPages="totalPages"
                :currentPage="currentPage"
                @pagechanged="onPageChange"
            />
        </div>
    </div>
</template>