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
            days: 3,
            file: null,
        }
    },
    methods: {
        close() {
            this.$router.back()
        },
        addDay: function () {
            if (this.days < 20) this.days++;
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
        addDiet(values) {
            var filename = null
            if (this.file != null) {
                filename = generateFileName(this.file)
            }
            var formData = {
                title: values.title,
                description: values.description,
                image: filename,
                days: values.day,
            }
            axiosInstance.post('/diet', formData)
                .then(response => {
                    if (this.file != null) {
                        const dietid = response.data.diet.id;
                        const uploader = uploadFile(this.file, 'diets', dietid, filename)
                        uploader.axios
                            .then(response => {
                                this.alertStore.success("Diet created!")
                                this.$router.back()
                            }).catch(error => {
                                console.log(error)
                                this.alertStore.error(error.response.data.message)
                            });
                    } else {
                        this.alertStore.success("Diet created!")
                        this.$router.back()
                    }

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
    },

}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add New Diet</h3>
        </div>


        <div class="add-diet-wrapper page-bg">
            <Form @submit="addDiet">
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
                            <label for="diet">Diet Title</label>
                            <Field name="title" type="text" placeholder="e.g. Mediterranean Diet" />
                        </div>

                        <div class="add-diet">
                            <label for="duration">Diet Duration</label>
                            <input disabled type="text" :value="days + ' days'" />
                        </div>
                    </div>
                </div>

                <div class="add-diet-day-grid">
                    <div class="add-diet-day-grid-item" v-for="(day, index) in days" :key="day" :id="day">
                        <div class="add-diet-day-grid-item title">Day {{ index + 1 }}</div>

                        <div class="add-diet">
                            <label>Breakfast</label>

                            <Field as="textarea" :name="'day[' + index + '].breakfast'"
                                placeholder="e.g. Greek yogurt with strawberries and chia seeds"></Field>
                        </div>

                        <div class="add-diet">
                            <label>Lunch</label>
                            <Field as="textarea" :name="'day[' + index + '].lunch'"
                                placeholder="e.g. A whole grain sandwich with hummus and vegetables"></Field>
                        </div>

                        <div class="add-diet">
                            <label>Dinner</label>
                            <Field as="textarea" :name="'day[' + index + '].dinner'"
                                placeholder="e.g. A tuna salad with greens and olive oil, as well as a fruit salad">
                            </Field>
                        </div>
                    </div>
                </div>

                <div class="add-button">
                    <AddIcon />
                    <button type="button" @click="addDay">Add Day</button>
                </div>

                <div class="add-diet description">
                    <label for="description">Description</label>
                    <Field as="textarea" name="description"
                        placeholder="e.g. The Mediterranean diet is a way of eating that's based on the traditional cuisines of Greece, Italy and other countries that border the Mediterranean Sea.">
                    </Field>
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