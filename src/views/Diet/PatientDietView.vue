<script>
import Tabs from "@/components/Tabs.vue"
import { useFileStore, useAlertStore } from '@/stores';
import { axiosInstance } from '@/helpers';

export default {
    components: {
        Tabs,
    },
    data() {
        const fileStore = useFileStore();
        return {
            tabList: ["Diets", "Recipes"],
            dietList: [],
            recipeList: [],
            fileStore,
        }
    },
    methods: {
        getDiets() {
            axiosInstance.get('/diet')
                .then(response => {
                    this.dietList = response.data.data.diets
                    this.dietList.forEach((diet) => {
                        this.fileStore.getPhotoLinkForDiet(diet)       
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        getRecipes() {
            axiosInstance.get('/recipes')
                .then(response => {
                    this.recipeList = response.data.data.recipes
                    this.recipeList.forEach((recipe) => {
                        this.fileStore.getPhotoLinkForRecipe(recipe)       
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
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
                        <RouterLink :to="{ name: 'patient-diet-details', params: { id: diet.id } }" v-for="diet in dietList">
                            <div class="diet-grid-item pt-diet-item">
                                <img :src="fileStore.dietImages(diet)" alt="">
                                <!-- <img src="@/assets/img/mediterranean.jpg" alt="Diet image"> -->

                                <div class="diet-grid-item-content">
                                    <h6>{{diet.title}}</h6>

                                    <p>{{diet.description}}</p>
                                </div>
                            </div>
                        </RouterLink>
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
                    <div class="diet-grid pt-recipe-grid">
                        <RouterLink :to="{ name: 'patient-recipe-details', params: { id: recipe.id } }" v-for="recipe in recipeList">
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