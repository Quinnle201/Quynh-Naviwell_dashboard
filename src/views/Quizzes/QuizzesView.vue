<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import SearchIcon from '@/components/icons/IconSearch.vue'
import EditIcon from '@/components/icons/IconEdit.vue'
import DetailModal from '@/components/Modals/DetailModal.vue'
import DeleteModal from '@/components/Modals/DeleteModal.vue'
import Pagination from '@/components/Pagination.vue';

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';
import _, { get, set } from 'lodash';

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
            dragging: false,
            show: false,
            //Quiz reorder:
            dxCodes: [],
            sortQuizzes: [],
            showReorder: false,
            showReorderCategory: false,
            reorderCategory: null,
        }
    },
    watch: {
        searchTerm(newVal){
            this.searchQuizzes(this, newVal)
        }
        
    },
    mounted() {
        this.getQuizList()
        this.getDxCodes()
    },
    computed: {
        localDate() {
            return (time) => new Date(time).format('MM/DD/YYYY')
        },
        quizList: {
            get() {
                return this.enabled ? this.sortQuizzes : this.quizzes[this.currentPage]
            },
            set(val) {
                this.sortQuizzes = val
            }
            
        }
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
        },


        // Quiz reordering logic:
        setOrderCategory(val) {
            this.enabled = true
            this.reorderCategory = val
            this.showReorderCategory = false
            this.sortQuizzes = []
            this.getQuizzesByCode(val)
        },
        startReorder() {
            this.showReorder = true
            this.showReorderCategory = true
        },

        cancelReorder() {
            this.enabled = false
            this.reorderCategory = null
            this.showReorder = false
            this.showReorderCategory = false
        },

        saveReorderValues() {
            this.enabled = false
            this.showReorder = false
            this.showReorderCategory = false
            // axiosInstance.put('/quizzes/set-order', { quizzes: this.sortQuizzes, code: this.reorderCategory } )
            //     .then(response => {
            //         this.alertStore.success(response.data.data)
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     });
            
        },

        getDxCodes() {
            axiosInstance.get('/dx-codes')
                .then(response => {
                    this.dxCodes = response.data.map(code => {
                        return {'name': code.value, 'value': code.id };
                    });
                })
                .catch(error => {
                    console.log(error)
                });
        },

        getQuizzesByCode(code) {
            axiosInstance.get(`/quizzes`, { params: { code: code, per_page: 1000 } })
                .then(response => {
                    const quizzes = response.data.data.quizzes
                    let quizOrder = 1;
                    quizzes.forEach(element => {
                        element.order = quizOrder
                        quizOrder++;
                    });
                    this.sortQuizzes = quizzes;
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },

        updateListSortOrder ({ moved }) {
            const newList = [...this.sortQuizzes].map((item, index) => {
                const newSort = index + 1;
                let hasChanged = item.order !== newSort;
                if (hasChanged) {
                    item.order = newSort;
                }
                return item;
            });
            this.sortQuizzes = newList;
        },

    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper quiz">
            <h3>Quizzes</h3>
            
            <div class="quizzes-btns">
                <div class="sort-button">
                    
                    <div  v-if="showReorder && !showReorderCategory">
                        <label class="form-check-label" style="background-color: var(--primary); color: white;" @click="cancelReorder">Cancel</label>
                        <label class="form-check-label" style="background-color: var(--primary); color: white;" @click="saveReorderValues">Save values</label>
                    </div>

                    <!-- <label v-else class="form-check-label" @click="startReorder">Reorder quizzes</label>

                    <transition name="slide">
                        <div class="dropdown-menu" v-if="showReorderCategory">
                            <a v-for="code in dxCodes" class="dropdown-item" href="#" @click="setOrderCategory(code.value)">{{code.name}}</a>
                        </div>
                    </transition> -->
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

            <draggable v-model="quizList" class="quizzes-grid" 
            item-key="id" 
            tag="div"
            :disabled="!enabled"
            ghost-class="ghost"
            @change="updateListSortOrder"
            @start="dragging = true"
            @end="dragging = false" handle=".handle">
                <template #item="{ element, index }">
                    <div class="quizzes-grid-item" :class="{ 'draggable': enabled }">
                        <div class="quizzes-grid-item-content">
                            <h6><span style="color:#0258BC">{{index+1}}.</span> {{ element.title }}</h6>
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