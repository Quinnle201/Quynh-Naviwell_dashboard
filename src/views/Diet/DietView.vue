<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import Tabs from "@/components/Tabs.vue"
import SearchIcon from '@/components/icons/IconSearch.vue'
import EditIcon from '@/components/icons/IconEdit.vue'
import TimeIcon from '@/components/icons/IconTime.vue'
import WeeklyIcon from '@/components/icons/IconWeekly.vue'
import DetailModal from '@/components/Modals/DetailModal.vue'
import Modal from '@/components/Modals/Modal.vue'
import DeleteModal from '@/components/Modals/DeleteModal.vue'
import RoundBtn from '@/components/Buttons/RoundBtn.vue'
import VueMultiselect from 'vue-multiselect'
import PatientsIcon from '@/components/icons/IconPatients.vue'
import Pagination from '@/components/Pagination.vue';

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';
import _findIndex from 'lodash/findIndex';

export default {
    components: {
        AddIcon,
        Tabs,
        SearchIcon,
        EditIcon,
        TimeIcon,
        WeeklyIcon,
        DetailModal,
        Modal,
        DeleteModal,
        RoundBtn,
        VueMultiselect,
        PatientsIcon,
        Pagination
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            tabList: ["Diets", "Recipes"],
            dietList: [],
            selectedDiet: null,
            recipeList: [],
            isDetailModalVisible: false,
            isModalVisible: false,
            isAssignModalVisible: false,
            isDeleteModalVisible: false,
            selectedPatients: null,
            optionsPatients: [{
                label: 'Select All',
                patients: ['Howard Aarons', 'Edward Alvarez', 'Emily Atilla', 'Monkey D. Luffy', 'God Usopp', 'Roronoa Zoro']
            }],
            selectedGroups: null,
            optionsGroups: [{
                label: 'Select All',
                groups: ['Group 1', 'Group 2', 'Group 3', 'Group 4']
            }],
            totalRecipePages: 0,
            totalDietPages: 0,
            currentPage: 1,
            currentDietPage: 1
        };
    },
    methods: {
        getDiets() {
            if(this.dietList[this.currentDietPage]) {
                return
            }
            axiosInstance.get(`/diet?page=${this.currentDietPage}`, { params: { per_page: 20 } })
                .then(response => {
                    const diets = response.data.data.diets
                    this.dietList[this.currentDietPage] = diets
                    this.totalDietPages = response.data.data.meta.last
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        getRecipes() {
            if(this.recipeList[this.currentPage]) {
                return
            }
            axiosInstance.get(`/recipes?page=${this.currentPage}`, { params: { per_page: 16 } })
                .then(response => {
                    const recipes = response.data.data.recipes
                    this.recipeList[this.currentPage] = recipes
                    this.totalRecipePages = response.data.data.meta.last
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        showDetailModal(diet) {
            this.selectedDiet = diet
            this.isDetailModalVisible === diet ? (this.isDetailModalVisible = true) : (this.isDetailModalVisible = diet);
        },
        closeDetails() {
            this.selectedDiet = null
            this.isDetailModalVisible = false;
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.selectedEvent = null
            this.isModalVisible = false;
        },
        showDeleteModal() {
            this.isDetailModalVisible = null;
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal() {
            this.isDetailModalVisible = null;
            this.isDeleteModalVisible = false;
        },
        deleteDiet() {
            if (this.selectedDiet != null) {
                axiosInstance.delete(`/diet/${this.selectedDiet.id}`)
                    .then(response => {
                        this.alertStore.success('Diet deleted')
                        const index = _findIndex(this.dietList, ['id', this.selectedDiet.id])
                        this.dietList.splice(index, 1)
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            } else {
                this.alertStore.error('Unexpected error')
            }
            this.closeDeleteModal()
        },
        updateDiet(id) {
            this.$router.push({ name: 'add-diet', params: { id: id } })
        },
        updateRecipe(id) {
            this.$router.push({ name: 'add-recipe', params: { id: id } })
        },
        onRecipePageChange(page) {
            this.currentPage = page;
            this.getRecipes()
            
        },
        onDietPageChange(page) {
            this.currentDietPage = page;
            this.getDiets()
        }
    },
    computed: {
        ingredientList() {
            return (recipe) => recipe.ingredients.slice(0, 3)
        }
    },
    mounted() {
        this.getDiets()
        this.getRecipes()
    }
}
</script>
<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Nutritional Therapy</h3>
        </div>

        <div class="diet-wrapper">
            <tabs class="diet-tabs" :tabList="tabList">
                <template v-slot:tabPanel-1>
                    <div class="diet-search-wrapper">
                        <form class="" method="get">
                            <label class="search-input">
                                <input placeholder="Search" type="search" autocomplete="off">
                                <SearchIcon />
                            </label>
                        </form>

                        <RouterLink :to="{ name: 'add-diet' }" class="add-button">
                            <AddIcon />
                            <button type="button">Add New Diet</button>
                        </RouterLink>
                    </div>

                    <div class="diet-grid">
                        <div class="diet-grid-item" v-for="diet in dietList[currentDietPage]">
                            <div class="diet-grid-item-content">
                                <h6>{{diet.title}}</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>{{ diet.duration }} days</span>
                                </div>
                            </div>

                            <div class="diet-grid-item-btn">
                                <img src="@/assets/img/details-icon.png" alt="Details Icon" @click="showDetailModal(diet)" />

                                <Transition>
                                    <DetailModal v-if="isDetailModalVisible === diet" @update="updateDiet(diet.id)" @close="closeDetails" @delete="showDeleteModal">
                                    </DetailModal>
                                </Transition>
                            </div>
                        </div>

                    </div>

                    <pagination
                        v-if="totalDietPages > 1"
                        :totalPages="totalDietPages"
                        :currentPage="currentDietPage"
                        @pagechanged="onDietPageChange"
                    />
                </template>

                <template v-slot:tabPanel-2>
                    <div class="diet-search-wrapper">
                        <form class="" method="get">
                            <label class="search-input">
                                <input placeholder="Search" type="search" autocomplete="off">
                                <SearchIcon />
                            </label>
                        </form>

                        <RouterLink :to="{ name: 'add-recipe' }" class="add-button">
                            <AddIcon />
                            <button type="button">Add New Recipe</button>
                        </RouterLink>
                    </div>

                    <div class="diet-grid recipe-grid">
                        <div class="diet-grid-item" v-for="recipe in recipeList[currentPage]">
                            <div class="diet-grid-item-content">
                                <h6>{{ recipe.title }}</h6>

                                <ul class="diet-grid-item-content-list">
                                    <li v-for="ingredient in ingredientList(recipe)">{{ ingredient }}</li>
                                </ul>

                                <div class="diet-grid-item-content-icon">
                                    <TimeIcon />
                                    <span>{{ recipe.cook_time }}min</span>
                                </div>
                            </div>

                            <div class="quotes-grid-item-btn" @click="updateRecipe(recipe.id)">
                                <EditIcon />
                            </div>
                        </div>
                    </div>

                    <pagination
                        v-if="totalRecipePages > 1"
                        :totalPages="totalRecipePages"
                        :currentPage="currentPage"
                        @pagechanged="onRecipePageChange"
                    />
                </template>
            </tabs>
        </div>

        <DeleteModal v-show="isDeleteModalVisible" @close="closeDeleteModal" @delete="deleteDiet">
            <template #content>
                <h4>Delete this diet?</h4>
                <p>You will not be able to recover it</p>
            </template>
        </DeleteModal>
    </div>
</template>