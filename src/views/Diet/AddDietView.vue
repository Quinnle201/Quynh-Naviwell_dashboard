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
            days: 5,
        }
    },
    methods: {
        addDay: function () {
            if (this.days < 10) this.days++;
        }
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add New Diet</h3>
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
                        <input name="diet" type="text" placeholder="e.g. Mediterranean Diet" />
                    </div>

                    <div class="add-diet">
                        <label for="duration">Diet Duration</label>
                        <input name="duration" type="text" placeholder="e.g. 5 days" />
                    </div>
                </div>
            </div>

            <div class="add-diet-day-grid">
                <div class="add-diet-day-grid-item" v-for="(day, index) in days" :key="day" :id="day">
                    <div class="add-diet-day-grid-item title">Day {{ index + 1 }}</div>

                    <div class="add-diet">
                        <label>Breakfast</label>
                        <textarea placeholder="e.g. Greek yogurt with strawberries and chia seeds"></textarea>
                    </div>

                    <div class="add-diet">
                        <label>Lunch</label>
                        <textarea placeholder="e.g. A whole grain sandwich with hummus and vegetables"></textarea>
                    </div>

                    <div class="add-diet">
                        <label>Dinner</label>
                        <textarea
                            placeholder="e.g. A tuna salad with greens and olive oil, as well as a fruit salad"></textarea>
                    </div>
                </div>
            </div>

            <div class="add-button">
                <AddIcon />
                <button type="button" @click="addDay">Add Day</button>
            </div>

            <div class="add-diet description">
                <label for="description">Description</label>
                <textarea name="description"
                    placeholder="e.g. The Mediterranean diet is a way of eating that's based on the traditional cuisines of Greece, Italy and other countries that border the Mediterranean Sea."></textarea>
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