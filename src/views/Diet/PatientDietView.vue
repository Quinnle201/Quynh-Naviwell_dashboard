<script>
import Tabs from "@/components/Tabs.vue"
import { useFileStore, useAlertStore } from '@/stores';
import { axiosInstance } from '@/helpers';

import Pagination from '@/components/Pagination.vue';

export default {
    components: {
        Tabs,
        Pagination
    },
    data() {
        const fileStore = useFileStore();
        return {
            tabList: ["Diets", "Recipes"],
            dietList: [],
            recipeList: [],
            totalRecipePages: 0,
            totalDietPages: 0,
            fileStore,
            currentPage: 1,
            currentDietPage: 1
        }
    },
    methods: {
        getDiets() {
            if(this.dietList[this.currentDietPage]) {
                return
            }
            axiosInstance.get(`/diet?page=${this.currentDietPage}`, { params: { per_page: 4 } })
                .then(response => {
                    const diets = response.data.data.diets
                    this.dietList[this.currentDietPage] = diets
                    diets.forEach((diet) => {
                        this.fileStore.getPhotoLinkForDiet(diet)       
                    })
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
            axiosInstance.get(`/recipes?page=${this.currentPage}`, { params: { per_page: 4 } })
                .then(response => {
                    const recipes = response.data.data.recipes
                    this.recipeList[this.currentPage] = recipes

                    recipes.forEach((recipe) => {
                        this.fileStore.getPhotoLinkForRecipe(recipe)       
                    })
                    console.log(response.data.data.meta)
                    this.totalRecipePages = response.data.data.meta.last
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
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
    mounted() {
        this.getDiets();
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
                    <div class="diet-grid pt-diet-grid" >
                        <RouterLink :to="{ name: 'patient-diet-details', params: { id: diet.id } }" v-for="diet in dietList[currentDietPage]">
                            <div class="diet-grid-item pt-diet-item">
                                <img :src="fileStore.dietImages(diet)" alt="">

                                <div class="diet-grid-item-content">
                                    <h6>{{diet.title}}</h6>

                                    <p>{{diet.description}}</p>
                                </div>
                            </div>
                        </RouterLink>
                    </div>

                    <pagination
                        v-if="totalDietPages > 1"
                        :totalPages="totalDietPages"
                        :currentPage="currentDietPage"
                        @pagechanged="onDietPageChange"
                    />
                </template>

                <template v-slot:tabPanel-2>
                    <div class="diet-grid pt-recipe-grid">
                        <RouterLink :to="{ name: 'patient-recipe-details', params: { id: recipe.id } }" v-for="recipe in recipeList[currentPage]">
                            <div class="diet-grid-item pt-recipe-item">
                                <img :src="fileStore.recipeImages(recipe)" alt="">
                                <!-- <img src="@/assets/img/shrimp-pho.jpg" alt="Recipe image"> -->

                                <div class="pt-recipe-item-content">
                                    <div class="time">{{recipe.cook_time}} min</div>
                                    <h6>{{recipe.title}}</h6>
                                </div>
                            </div>
                        </RouterLink>
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
    </div>
</template>