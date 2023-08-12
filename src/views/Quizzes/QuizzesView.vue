<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import SearchIcon from '@/components/icons/IconSearch.vue'
import EditIcon from '@/components/icons/IconEdit.vue'
import DetailModal from '@/components/Modals/DetailModal.vue'
import DeleteModal from '@/components/Modals/DeleteModal.vue'
import Pagination from '@/components/Pagination.vue';

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';
import _ from 'lodash';

import draggable from 'vuedraggable';
import DraggableIcon from '@/components/icons/IconDraggable.vue'

export default {
    components: {
        AddIcon,
        SearchIcon,
        EditIcon,
        DetailModal,
        DeleteModal,
        Pagination,
        draggable,
        DraggableIcon
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            quizzes: [],
            selectedQuizId: null,
            isDetailModalVisible: false,
            isDeleteModalVisible: false,
            totalPages: 1,
            currentPage: 1,
            searchTerm: "",
            drag: false,
            enabled: false,
            dragging: false
        }
    },
    watch: {
        searchTerm(newVal){
            this.searchQuizzes(this, newVal)
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
        searchQuizzes: _.debounce(function(self, newVal) {
            self.currentPage = 1
            this.quizzes = []
            self.getQuizList()

        }, 250),
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
                        const quizIndex = this.quizzes[this.currentPage].findIndex((elem) => elem.id == quizId)
                        this.quizzes[this.currentPage].splice(quizIndex, 1)
                        this.alertStore.success('Quiz deleted')
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            }
        },
        getQuizList() {
            if(this.quizzes[this.currentPage]) {
                return
            }
            axiosInstance.get(`/quizzes?page=${this.currentPage}`, { params: { per_page: 24, searchTerm: this.searchTerm } })
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
        <div class="layout-wrapper quiz">
            <h3>Quizzes</h3>
            
            <div class="quizzes-btns">
                <div class="sort-button">
                    <input
                        id="disabled"
                        type="checkbox"
                        v-model="enabled"
                        class="form-check-input"
                    />
                    <label class="form-check-label" for="disabled">Reorder quizzes</label>
                </div>

                <RouterLink :to="{ name: 'add-quiz' }" class="add-button">
                    <AddIcon />
                    <button type="button">Add New Quiz</button>
                </RouterLink>
            </div>
        </div>

        <div class="quizzes-wrapper page-bg">
            <div class="quotes-search-wrapper">
                <label class="quotes-search">
                    <input placeholder="Search" type="search" autocomplete="off" v-model="searchTerm">
                    <SearchIcon />
                </label>
            </div>

            <draggable v-model="quizzes[currentPage]" class="quizzes-grid" 
            item-key="title" 
            tag="div"
            :disabled="!enabled"
            ghost-class="ghost"
            :move="checkMove" 
            @start="dragging = true"
            @end="dragging = false" handle=".handle">
                <template #item="{ element }">
                    <div class="quizzes-grid-item" :class="{ 'draggable': enabled }">
                        <div class="quizzes-grid-item-content">
                            <h6>{{ element.title }}</h6>
                            <div class="quizzes-grid-item-date">{{ localDate(element.created_at) }}</div>
                        </div>

                        <div class="handle">
                            <DraggableIcon />
                        </div>

                        <div class="quizzes-grid-item-btn">
                            <div class="quizzes-grid-item-btn-img" @click="showDetailModal(index)">
                                <img src="@/assets/img/details-icon.png" alt="Details Icon" />
                            </div>

                            <Transition>
                                <DetailModal v-if="isDetailModalVisible === index" @update="updateQuiz(element.id)"
                                    @close="closeDetails" @delete="showDeleteModal(element.id)" />
                            </Transition>
                        </div>
                    </div>
                </template>
            </draggable>

            <pagination
                v-if="totalPages > 1"
                :totalPages="totalPages"
                :currentPage="currentPage"
                @pagechanged="onPageChange"
            />
        </div>

        <DeleteModal v-show="isDeleteModalVisible" @close="closeDeleteModal" @delete="deleteQuiz">
            <template #content>
                <h4>Delete this quiz?</h4>
                <p>You will not be able to recover it</p>
            </template>
        </DeleteModal>
    </div>
</template>