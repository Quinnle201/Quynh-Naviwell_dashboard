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

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

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
        PatientsIcon
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            tabList: ["Diets", "Recipes"],
            dietList: [],
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
        };
    },
    methods: {
        getDiets() {
            axiosInstance.get('/diet')
                .then(response => {
                    this.dietList = response.data.diets
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        getRecipes() {
            axiosInstance.get('/recipes')
                .then(response => {
                    this.recipeList = response.data.recipes
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        showDetailModal(diet) {
            this.isDetailModalVisible === diet ? (this.isDetailModalVisible = true) : (this.isDetailModalVisible = diet);
        },
        closeDetails() {
            this.isDetailModalVisible = false;
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.selectedEvent = null
            this.isModalVisible = false;
        },
        showAssignModal() {
            this.isDetailModalVisible = null;
            this.isAssignModalVisible = true;
        },
        closeAssignModal() {
            this.isDetailModalVisible = null;
            this.isAssignModalVisible = false;
        },
        showDeleteModal() {
            this.isDetailModalVisible = null;
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal() {
            this.isDetailModalVisible = null;
            this.isDeleteModalVisible = false;
        },
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
                        <div class="diet-grid-item" v-for="diet in dietList">
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
                                    <DetailModal v-if="isDetailModalVisible === diet" @update="showModal()" @close="closeDetails" @delete="showDeleteModal">
                                        <template #btn>
                                            <RoundBtn @click="showAssignModal()">
                                                <template #btn-icon>
                                                    <PatientsIcon width="30" height="30" />
                                                </template>
                                                <template #btn-name>Assign</template>
                                            </RoundBtn>
                                        </template>
                                    </DetailModal>
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
                        <div class="diet-grid-item" v-for="recipe in recipeList">
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

                            <div class="quotes-grid-item-btn">
                                <EditIcon />
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
                </template>
            </tabs>
        </div>

        <Modal v-show="isAssignModalVisible" @close="closeAssignModal" class="overflow">
            <template #header>Test Diet</template>
            <template #content>
                <div class="popup-content-item popup-content-item--select">
                    <label>Select Patients</label>
                    <VueMultiselect
                        v-model="selectedPatients"
                        :options="optionsPatients"
                        :multiple="true"
                        :close-on-select="false" 
                        search="false"
                        placeholder="Choose Patients" 
                        select-label="Select" 
                        deselect-label="Remove" 
                        :limit="3" 
                        group-values="patients" 
                        group-label="label" 
                        :group-select="true" 
                        select-group-label="Select All" 
                        deselect-group-label="Clear All" 
                        >
                    </VueMultiselect>
                </div>
                <div class="popup-content-item popup-content-item--select">
                    <label>Select Patients</label>
                    <VueMultiselect
                        v-model="selectedGroups"
                        :options="optionsGroups"
                        :multiple="true"
                        :close-on-select="false" 
                        search="false"
                        placeholder="Choose Groups" 
                        select-label="Select" 
                        deselect-label="Remove" 
                        :limit="3" 
                        group-values="groups" 
                        group-label="label" 
                        :group-select="true" 
                        select-group-label="Select All" 
                        deselect-group-label="Clear All"  
                        >
                        <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                    </VueMultiselect>
                </div>
                <div class="popup-footer">
                    <button type="submit" class="w-btn w-btn-close">
                        Cancel
                    </button>
                    <button type="submit" class="w-btn">
                        Save Changes
                    </button>
                </div>
            </template>
        </Modal>

        <DeleteModal v-show="isDeleteModalVisible" @close="closeDeleteModal">
            <template #content>
                <h4>Delete this diet?</h4>
                <p>You will not be able to recover it</p>
            </template>
        </DeleteModal>
    </div>
</template>