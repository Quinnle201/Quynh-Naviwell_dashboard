<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import CameraIcon from '@/components/icons/IconCamera.vue'

export default {
    components: {
        AddIcon, 
        CameraIcon
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add New Recipe</h3>
        </div>
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
                    <input name="diet" type="text" />
                </div>
                
                <div class="add-diet">
                    <label for="diet">Portions</label>
                    <input name="diet" type="text" />
                </div>
                
                <div class="add-diet">
                    <label for="duration">Cooking Time</label>
                    <input name="duration" type="text" />
                </div>
            </div>
        </div>

        <div>
            <div class="add-diet-day-grid-item title">Add Ingredients</div>
            <div class="add-diet-day-grid">
                <div class="add-diet-day-grid-item">
                    <div class="add-diet">
                        <label>Ingredient</label>
                        <input type="text" />
                    </div>
                </div>
                <div class="add-diet-day-grid-item">
                    <div class="add-diet">
                        <label>Ingredient</label>
                        <input type="text" />
                    </div>
                </div>
                <div class="add-diet-day-grid-item">
                    <div class="add-diet">
                        <label>Ingredient</label>
                        <input type="text" />
                    </div>
                </div>
            </div>
            <div class="add-button">
                <AddIcon />
                <button type="button">Add Ingredient</button>
            </div>
        </div>

        <div>
            <div class="add-diet-day-grid-item title">How to cook</div>
            <div class="add-diet-day-grid">
                <div class="add-diet-day-grid-item">
                    <div class="add-diet">
                        <label>Step 1</label>
                        <textarea></textarea>
                    </div>
                </div>
                <div class="add-diet-day-grid-item">
                    <div class="add-diet">
                        <label>Step 2</label>
                        <textarea></textarea>
                    </div>
                </div>
                <div class="add-diet-day-grid-item">
                    <div class="add-diet">
                        <label>Step 3</label>
                        <textarea></textarea>
                    </div>
                </div>
            </div>
            <div class="add-button">
                <AddIcon />
                <button type="button">Add Step</button>
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
</template>