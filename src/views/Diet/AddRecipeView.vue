<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import CameraIcon from '@/components/icons/IconCamera.vue'
import { Form, Field, FieldArray } from 'vee-validate';
import VueMultiselect from 'vue-multiselect'

import { axiosInstance, uploadFile, generateFileName } from '@/helpers';
import { useAlertStore, useFileStore } from '@/stores';

export default {
    components: {
        AddIcon,
        CameraIcon,
        Form,
        Field,
        FieldArray,
        VueMultiselect
    },
    data() {
        const alertStore = useAlertStore()
        const fileStore = useFileStore()
        return {
            recipeId: null,
            recipeData: null,
            alertStore,
            fileStore,
            file: null,
            dxCodes: [],
            selectedDxCodes: [],
        }
    },
    computed: {
        recipeImage() {
            if(this.file) {
                return URL.createObjectURL(this.file)
            } else if(this.fileStore.recipeImages(this.recipeData)){
                return this.fileStore.recipeImages(this.recipeData)
            }
            return null
        }
    },
    watch: {
        '$route.params': {
            handler(toParams, previousParams) {
                const id = toParams.id;
                if (id) {
                    this.getRecipe(id)
                } else {
                    this.initialRecipe()
                }
            },
            immediate: true
        }
    },
    methods: {
        getDxCodes() {
            axiosInstance.get('/dx-codes')
                .then(response => {
                    console.log(response.data)
                    this.dxCodes = response.data.map(code => {
                        return {'name': code.value, 'value': code.id };
                    });

                    if(this.selectedDxCodes.length > 0) {
                        this.selectedDxCodes = this.dxCodes.filter(({ value }) => this.selectedDxCodes.includes(value));
                    }

                })
                .catch(error => {
                    console.log(error)
                });
        },
        initialRecipe() {
            this.getDxCodes()
            this.recipeId = null
            this.recipeData = {
                codes: [],
                title: '',
                servings: '',
                cook_time: '',
                image: '',
                ingredients: ['', '', ''],
                steps: ['', '', '']
            }
        },
        getRecipe(id) {
            axiosInstance.get(`/recipes/${id}`)
                .then(response => {
                    this.recipeData = response.data.data;
                    this.recipeId = this.recipeData.id;
                    this.selectedDxCodes = this.recipeData.codes;
                    this.getDxCodes()
                    this.fileStore.getPhotoLinkForRecipe(this.recipeData)       
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                    this.$router.replace({ name: 'add-diet' })
                });
        },
        close() {
            this.$router.back()
        },
        selectFile() {
            const r = this.$refs.fileUpload;
            r.click();
        },
        addFile(event) {
            const files = event.target.files
            if (files) {
                this.file = files[0]
            }

        },
        addIngredient: function () {
            if (this.ingredients < 15) this.ingredients++;
        },
        addStep: function () {
            if (this.steps < 20) this.steps++;
        },
        addRecipe(values) {
            values.codes = this.selectedDxCodes.map(v => v.value)


            var filename = null
            if (this.file != null) {
                filename = generateFileName(this.file)
            } else {
                filename = this.recipeData.image
            }

            var formData = {
                title: values.title,
                servings: values.servings,
                cook_time: values.cook_time,
                image: filename,
                ingredients: values.ingredients,
                steps: values.steps,
                codes: values.codes,
            }

            if(this.recipeId) {
                axiosInstance.put(`/recipes/${this.recipeId}`, formData)
                .then(response => {
                    if (this.file != null) {
                        const recipeId = response.data.data.id;
                        const uploader = uploadFile(this.file, 'recipes', recipeId, filename)
                        uploader.axios
                            .then(response => {
                                setTimeout(() => this.fileStore.getPhotoLinkForRecipe(this.recipeData, true), 1000)
                                this.alertStore.success("Recipe updated!")
                                this.$router.back()
                            }).catch(error => {
                                console.log(error)
                                this.alertStore.error(error.response.data.message)
                            });
                    } else {
                        this.alertStore.success("Recipe updated!")
                        this.$router.back()
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
            } else {

            axiosInstance.post('/recipes', formData)
                .then(response => {
                    if (this.file != null) {
                        const recipeId = response.data.data.id;
                        const uploader = uploadFile(this.file, 'recipes', recipeId, filename)
                        uploader.axios
                            .then(response => {
                                this.alertStore.success("Recipe created!")
                                this.$router.back()
                            }).catch(error => {
                                console.log(error)
                                this.alertStore.error(error.response.data.message)
                            });
                    } else {
                        this.alertStore.success("Recipe created!")
                        this.$router.back()
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
            }
        },
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add New Recipe</h3>
        </div>


        <div class="add-diet-wrapper page-bg">
            <!-- <Form @submit="addRecipe"> -->
            <Form v-if="recipeData" @submit="addRecipe" :initial-values="recipeData">

                <div class="addquote-selects">
                    <div class="popup-content-item popup-content-item--select">
                        <label>Medical codes</label>
                        <VueMultiselect
                            v-model="selectedDxCodes"
                            :options="dxCodes"
                            :multiple="true"
                            :close-on-select="false" 
                            track-by="value"
                            label="name"
                            search="false"
                            placeholder="Choose Medical codes" 
                            select-label="Select" 
                            :allow-empty="false"
                            deselect-label="Remove"
                            :limit="5" 
                            select-group-label="Select All" 
                            deselect-group-label="Clear All" 
                            >
                        </VueMultiselect>
                    </div>
                </div> 

                <div class="add-diet-head">
                    <input hidden type="file" name="attachment" @change="addFile" ref="fileUpload" />
                    <div class="add-diet upload-photo" @click="selectFile()">
                        <label>Upload Photo</label>
                        
                        <img v-if="recipeImage" :src="recipeImage" style="width:150px;height:150px;aspect-ratio: 1;"/>
                        <div>
                            <CameraIcon />
                        </div>
                        
                    </div>

                    <div class="add-diet-inner">
                        <div class="add-diet">
                            <label for="diet">Recipe Title</label>
                            <Field name="title" type="text" placeholder="e.g. Lemon chicken" />
                        </div>

                        <div class="add-diet">
                            <label for="diet">Servings</label>
                            <Field name="servings" type="text" placeholder="e.g. 6" />
                        </div>

                        <div class="add-diet">
                            <label for="duration">Cook Time</label>
                            <div class="add-diet-fl">
                                <Field name="cook_time" type="number" placeholder="e.g. 20" />
                                <span>min.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                <FieldArray :name="`ingredients`" v-slot="{ fields, push, remove }">
                    <div class="add-diet-day-grid-item title">Add Ingredients</div>
                    <div class="add-diet-day-grid">
                        <fieldset v-for="(field, index) in fields" :key="field.key">
                            <button v-if="fields.length > 1" type="button" @click="remove(index)">Remove Ingredient</button>
                            <div class="add-diet">
                                <label>Ingredient</label>
                                <Field type="text" :name="`ingredients[${index}]`" placeholder="e.g. 200gr quinoa" />
                            </div>
                         </fieldset>
                    </div>

                    <div class="add-button"  v-if="fields.length < 20">
                        <AddIcon />
                        <button type="button"  @click="push('')">Add Ingredient</button>
                    </div>
                </FieldArray>
                </div>


                <div class="steps-wrapper">
                    <FieldArray :name="`steps`" v-slot="{ fields, push, remove }">
                        <div class="add-diet-day-grid-item title">How to cook</div>
                        <div class="add-diet-day-grid">
                            <fieldset v-for="(field, index) in fields" :key="field.key">
                                <button v-if="fields.length > 1" type="button" @click="remove(index)">Remove Step</button>
                                <div class="add-diet">
                                    <label>Step {{ index + 1 }}</label>
                                    <Field as="textarea" :name="`steps[${index}]`" placeholder="e.g. Bring 1 cup water to a boil in a pot, then add the quinoa. Cook for 15 minutes, until water is absorbed. Take off the heat and let cool." />
                                </div>
                            </fieldset>
                        </div>


                        <div class="add-button"  v-if="fields.length < 20">
                            <AddIcon />
                            <button type="button"  @click="push('')">Add Step</button>
                        </div>
                    </FieldArray>
                </div>

                <div class="add-diet-btns">
                    <button type="button" class="w-btn w-btn-close" @click="close">
                        Cancel
                    </button>
                    <button type="submit" class="w-btn">
                        Save
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>