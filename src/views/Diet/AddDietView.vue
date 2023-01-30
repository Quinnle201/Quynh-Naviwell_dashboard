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
            <h3>Add New Diet</h3>
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
                    <label for="diet">Diet Title</label>
                    <input name="diet" type="text" />
                </div>
                
                <div class="add-diet">
                    <label for="duration">Diet Duration</label>
                    <input name="duration" type="text" />
                </div>
            </div>
        </div>

        <div class="add-diet-day-grid">
            <div class="add-diet-day-grid-item">
                <div class="add-diet-day-grid-item title">Day 1</div>

                <div class="add-diet">
                    <label>Breakfast</label>
                    <textarea></textarea>
                </div>

                <div class="add-diet">
                    <label>Lunch</label>
                    <textarea></textarea>
                </div>

                <div class="add-diet">
                    <label>Dinner</label>
                    <textarea></textarea>
                </div>
            </div>
            
            <div class="add-diet-day-grid-item">
                <div class="add-diet-day-grid-item title">Day 2</div>

                <div class="add-diet">
                    <label>Breakfast</label>
                    <textarea></textarea>
                </div>

                <div class="add-diet">
                    <label>Lunch</label>
                    <textarea></textarea>
                </div>

                <div class="add-diet">
                    <label>Dinner</label>
                    <textarea></textarea>
                </div>
            </div>

            <div class="add-diet-day-grid-item">
                <div class="add-diet-day-grid-item title">Day 3</div>

                <div class="add-diet">
                    <label>Breakfast</label>
                    <textarea></textarea>
                </div>

                <div class="add-diet">
                    <label>Lunch</label>
                    <textarea></textarea>
                </div>

                <div class="add-diet">
                    <label>Dinner</label>
                    <textarea></textarea>
                </div>
            </div>

            <div class="add-diet-day-grid-item">
                <div class="add-diet-day-grid-item title">Day 4</div>

                <div class="add-diet">
                    <label>Breakfast</label>
                    <textarea></textarea>
                </div>

                <div class="add-diet">
                    <label>Lunch</label>
                    <textarea></textarea>
                </div>

                <div class="add-diet">
                    <label>Dinner</label>
                    <textarea></textarea>
                </div>
            </div>

            <div class="add-diet-day-grid-item">
                <div class="add-diet-day-grid-item title">Day 5</div>

                <div class="add-diet">
                    <label>Breakfast</label>
                    <textarea></textarea>
                </div>

                <div class="add-diet">
                    <label>Lunch</label>
                    <textarea></textarea>
                </div>

                <div class="add-diet">
                    <label>Dinner</label>
                    <textarea></textarea>
                </div>
            </div>
        </div>

        <div class="add-button">
            <AddIcon />
            <button type="button">Add Day</button>
        </div>

        <div class="add-diet description">
            <label for="description">Description</label>
            <textarea name="description"></textarea>
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