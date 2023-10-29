<script>
import { axiosInstance } from '@/helpers';
import { useAlertStore, useFileStore } from '@/stores';

export default {
    data() {
        const alertStore = useAlertStore()
        const fileStore = useFileStore()
        return {
            recipeId: null,
            recipeData: null,
            alertStore,
            fileStore,
        }
    },
    computed: {
        recipePdf() {
            if(this.fileStore.recipePdfFiles(this.recipeData)){
                return this.fileStore.recipePdfFiles(this.recipeData)
            }
            return null
        }
    },
    methods: {

        getRecipe(id) {
            axiosInstance.get(`/recipes/${id}`)
                .then(response => {
                    this.recipeData = response.data.data;
                    this.fileStore.getPhotoLinkForRecipe(this.recipeData)
                    this.fileStore.getPdfLinkForRecipe(this.recipeData)
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                    this.close()
                });
        },
        close() {
            this.$router.back()
        },
    },
    mounted() {
        this.recipeId = this.$route.params.id
        this.getRecipe(this.recipeId)
    }
}
</script>

<template>
    <div class="page-wrapper" v-if="recipeData">
        <div class="diet-wrapper recipe-details">
            <div class="recipe-details-aside">
                <img :src="fileStore.recipeImages(recipeData)" alt="">

                <div class="recipe-details-aside-ing">
                    <h5>Ingredients</h5>
                    <ul>
                        <li v-for="ingredient in recipeData.ingredients">{{ingredient}}</li>
                    </ul>
                </div>
            </div>

            <div class="recipe-details-descr">
                <h3>{{recipeData.title}}</h3>

                <div class="recipe-details-descr-labels">
                    <span>
                        <img src="@/assets/img/servings.svg" alt="Icon">
                        {{recipeData.servings}}
                    </span>
                    <span>
                        <img src="@/assets/img/time.svg" alt="Icon">
                        {{recipeData.cook_time}} min
                    </span>

                    <div class="recipe-details-link">
                        <a v-if="recipePdf" :href="recipePdf" target="_blank">Click here for more recipe details</a>
                    </div>
                </div>

                <div class="recipe-details-dir">
                    <h5>Directions</h5>

                    <div class="recipe-details-dir-item" v-for="(step, index) in recipeData.steps">
                        <span>Step {{ index + 1 }}</span>
                        <div>{{ step }}</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>