<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import Tabs from "@/components/Tabs.vue"
import SearchIcon from '@/components/icons/IconSearch.vue'
import EditIcon from '@/components/icons/IconEdit.vue'
import TimeIcon from '@/components/icons/IconTime.vue'
import WeeklyIcon from '@/components/icons/IconWeekly.vue'

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

export default {
    components: {
        AddIcon,
        Tabs,
        SearchIcon,
        EditIcon,
        TimeIcon,
        WeeklyIcon
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            tabList: ["Diets", "Recipes"],
            dietList: [],
            recipeList: []
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
                        <div class="diet-grid-item" v-for="diet in dietList">
                            <div class="diet-grid-item-content">
                                <h6>{{diet.title}}</h6>

                                <div class="diet-grid-item-content-icon">
                                    <WeeklyIcon />
                                    <span>{{ diet.duration }} days</span>
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
    </div>
</template>