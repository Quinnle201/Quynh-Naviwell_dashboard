<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import SearchIcon from '@/components/icons/IconSearch.vue'
import EditIcon from '@/components/icons/IconEdit.vue'
import DetailModal from '@/components/Modals/DetailModal.vue'
import DeleteModal from '@/components/Modals/DeleteModal.vue'

export default {
    components: {
        AddIcon,
        SearchIcon,
        EditIcon,
        DetailModal,
        DeleteModal
    },
    data() {
        return {
            quizzes: 16,
            isDetailModalVisible: false,
            isDeleteModalVisible: false,
        }
    },
    methods: {
        showDetailModal(idx) {
            this.isDetailModalVisible === idx ? (this.isDetailModalVisible = true) : (this.isDetailModalVisible = idx);
        },
        closeDetails() {
            this.isDetailModalVisible = false;
        },
        showDeleteModal() {
            this.isDetailModalVisible = null;
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal() {
            this.isDetailModalVisible = null;
            this.isDeleteModalVisible = false;
        },
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
                        <h6>Quiz title</h6>
                        <div class="quizzes-grid-item-date">04/02/2023</div>
                    </div>
                    <div class="quizzes-grid-item-btn">
                        <div class="quizzes-grid-item-btn-img" @click="showDetailModal(index)">
                            <img src="@/assets/img/details-icon.png" alt="Details Icon" />
                        </div>

                        <Transition>
                            <DetailModal v-if="isDetailModalVisible === index" @update="showModal()" @close="closeDetails" @delete="showDeleteModal" />
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

        <DeleteModal v-show="isDeleteModalVisible" @close="closeDeleteModal">
            <template #content>
                <h4>Delete this quiz?</h4>
                <p>You will not be able to recover it</p>
            </template>
        </DeleteModal>
    </div>
</template>