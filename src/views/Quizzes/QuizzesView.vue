<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import SearchIcon from '@/components/icons/IconSearch.vue'
import EditIcon from '@/components/icons/IconEdit.vue'
import DetailModal from '@/components/Modals/DetailModal.vue'
import DeleteModal from '@/components/Modals/DeleteModal.vue'

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

export default {
    components: {
        AddIcon,
        SearchIcon,
        EditIcon,
        DetailModal,
        DeleteModal
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            quizzes: [],
            selectedQuizId: null,
            isDetailModalVisible: false,
            isDeleteModalVisible: false,
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
        showDetailModal(idx) {
            this.isDetailModalVisible === idx ? (this.isDetailModalVisible = true) : (this.isDetailModalVisible = idx);
        },
        closeDetails() {
            this.isDetailModalVisible = false;
        },
        showDeleteModal(quizId) {
            this.selectedQuizId = quizId;
            this.isDetailModalVisible = null;
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal() {
            this.selectedQuizId = null;
            this.isDetailModalVisible = null;
            this.isDeleteModalVisible = false;
        },
        updateQuiz(id) {
            this.$router.push({ name: 'add-quiz', params: { id: id } })
        },
        deleteQuiz() {
            if (this.selectedQuizId) {
                const quizId = this.selectedQuizId
                this.closeDeleteModal()
                axiosInstance.delete(`/quizzes/${quizId}`)
                    .then(response => {
                        const quizIndex = this.quizzes.findIndex((elem) => elem.id == quizId)
                        this.quizzes.splice(quizIndex, 1)
                        this.alertStore.success('Quiz deleted')
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            }
        },
        getQuizList() {
            axiosInstance.get('/quizzes')
                .then(response => {
                    this.quizzes = response.data.quizzes
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
            <h3>Quizzes</h3>

            <RouterLink :to="{ name: 'add-quiz' }" class="add-button">
                <AddIcon />
                <button type="button">Add New Quiz</button>
            </RouterLink>
        </div>

        <div class="quizzes-wrapper page-bg">
            <div class="quotes-search-wrapper">
                <label class="quotes-search">
                    <input placeholder="Search" type="search" autocomplete="off">
                    <SearchIcon />
                </label>
            </div>

            <div class="quizzes-grid">
                <div class="quizzes-grid-item" v-for="(quiz, index) in quizzes" :key="quiz.id">
                    <div class="quizzes-grid-item-content">
                        <h6>{{ quiz.title }}</h6>
                        <div class="quizzes-grid-item-date">{{ localDate(quiz.created_at) }}</div>
                    </div>
                    <div class="quizzes-grid-item-btn">
                        <div class="quizzes-grid-item-btn-img" @click="showDetailModal(index)">
                            <img src="@/assets/img/details-icon.png" alt="Details Icon" />
                        </div>

                        <Transition>
                            <DetailModal v-if="isDetailModalVisible === index" @update="updateQuiz(quiz.id)"
                                @close="closeDetails" @delete="showDeleteModal(quiz.id)" />
                        </Transition>
                    </div>
                </div>
            </div>

            <div class="pagination-wrapper">
                <div class="pagination-item pagination-item-arrow-left">
                    <img src="@/assets/img/select-icon.svg" alt="" />
                </div>
                <div class="pagination-item active">1</div>
                <div class="pagination-item">2</div>
                <div class="pagination-item">3</div>
                <div class="pagination-item">...</div>
                <div class="pagination-item">9</div>
                <div class="pagination-item pagination-item-arrow-right">
                    <img src="@/assets/img/select-icon.svg" alt="" />
                </div>
            </div>
        </div>

        <DeleteModal v-show="isDeleteModalVisible" @close="closeDeleteModal" @delete="deleteQuiz">
            <template #content>
                <h4>Delete this quiz?</h4>
                <p>You will not be able to recover it</p>
            </template>
        </DeleteModal>
    </div>
</template>