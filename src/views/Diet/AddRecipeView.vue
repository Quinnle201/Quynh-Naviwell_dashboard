<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import CameraIcon from '@/components/icons/IconCamera.vue'
import { Form, Field } from 'vee-validate';
import { axiosInstance, uploadFile, generateFileName } from '@/helpers';
import { useAlertStore } from '@/stores';

export default {
    components: {
        AddIcon,
        CameraIcon,
        Form,
        Field
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            ingredients: 2,
            steps: 3,
            file: null,
        }
    },
    methods: {
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
            var filename = null
            if (this.file != null) {
                filename = generateFileName(this.file)
            }

            var formData = {
                title: values.title,
                servings: values.servings,
                cook_time: values.cook_time,
                image: filename,
                ingredients: values.ingredient,
                steps: values.step
            }
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
            <Form @submit="addRecipe">
                <div class="add-diet-head">
                    <input hidden type="file" name="attachment" @change="addFile" ref="fileUpload" />
                    <div class="add-diet upload-photo" @click="selectFile()">
                        <label>Upload Photo</label>
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
                    <div class="add-diet-day-grid-item title">Add Ingredients</div>
                    <div class="add-diet-day-grid">
                        <div class="add-diet-day-grid-item" v-for="(ingredient, index) in ingredients" :key="ingredient"
                            :id="ingredient">
                            <div class="add-diet">
                                <label>Ingredient</label>
                                <Field type="text" :name="'ingredient[' + index + ']'"
                                    placeholder="e.g. 200gr quinoa" />
                            </div>
                        </div>
                    </div>
                    <div class="add-button">
                        <AddIcon />
                        <button type="button" @click="addIngredient">Add Ingredient</button>
                    </div>
                </div>

                <div class="steps-wrapper">
                    <div class="add-diet-day-grid-item title">How to cook</div>
                    <div class="add-diet-day-grid">
                        <div class="add-diet-day-grid-item" v-for="(step, index) in steps" :key="step" :id="step">
                            <div class="add-diet">
                                <label>Step {{ index + 1 }}</label>
                                <Field as="textarea" :name="'step[' + index + ']'"
                                    placeholder="e.g. Bring 1 cup water to a boil in a pot, then add the quinoa. Cook for 15 minutes, until water is absorbed. Take off the heat and let cool.">
                                </Field>
                            </div>
                        </div>
                    </div>
                    <div class="add-button">
                        <AddIcon />
                        <button type="button" @click="addStep">Add Step</button>
                    </div>
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