<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import CameraIcon from '@/components/icons/IconCamera.vue'

export default {
    components: {
        AddIcon,
        CameraIcon
    },
    data() {
        return {
            ingredients: 3,
            steps: 3,
        }
    },
    methods: {
        addIngredient: function () {
            if (this.ingredients < 10) this.ingredients++;
        },
        addStep: function () {
            if (this.steps < 6) this.steps++;
        }
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add New Recipe</h3>
        </div>


        <div class="add-diet-wrapper page-bg">
            <div class="add-diet-head">
                <div class="add-diet upload-photo">
                    <label>Upload Photo</label>
                    <div>
                        <CameraIcon />
                    </div>
                </div>

                <div class="add-diet-inner">
                    <div class="add-diet">
                        <label for="diet">Recipe Title</label>
                        <input name="diet" type="text" placeholder="e.g. Lemon chicken" />
                    </div>

                    <div class="add-diet">
                        <label for="diet">Servings</label>
                        <input name="diet" type="text" placeholder="e.g. 6" />
                    </div>

                    <div class="add-diet">
                        <label for="duration">Cook Time</label>
                        <input name="duration" type="text" placeholder="e.g. 20 min." />
                    </div>
                </div>
            </div>

            <div>
                <div class="add-diet-day-grid-item title">Add Ingredients</div>
                <div class="add-diet-day-grid">
                    <div class="add-diet-day-grid-item" v-for="ingredient in ingredients" :key="ingredient"
                        :id="ingredient">
                        <div class="add-diet">
                            <label>Ingredient</label>
                            <input type="text" placeholder="e.g. 200gr quinoa" />
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
                            <textarea
                                placeholder="e.g. Bring 1 cup water to a boil in a pot, then add the quinoa. Cook for 15 minutes, until water is absorbed. Take off the heat and let cool."></textarea>
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
        </div>
    </div>
</template>