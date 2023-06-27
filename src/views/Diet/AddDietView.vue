<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import CameraIcon from '@/components/icons/IconCamera.vue'
import AttachmentIcon from '@/components/icons/IconAttach.vue'
import { Form, Field, FieldArray } from 'vee-validate';
import VueMultiselect from 'vue-multiselect'

import { axiosInstance, uploadFile, generateFileName } from '@/helpers';
import { useAlertStore, useFileStore } from '@/stores';

export default {
    components: {
        AddIcon,
        CameraIcon,
        AttachmentIcon,
        Form,
        Field,
        FieldArray,
        VueMultiselect
    },
    data() {
        const alertStore = useAlertStore()
        const fileStore = useFileStore()
        return {
            dietId: null,
            dietData: null,
            alertStore,
            fileStore,
            file: null,
            pdf_file: null,
            dxCodes: [],
            selectedDxCodes: [],
        }
    },
    computed: {
        dietImage() {
            if(this.file) {
                return URL.createObjectURL(this.file)
            } else if(this.fileStore.dietImages(this.dietData)){
                return this.fileStore.dietImages(this.dietData)
            }
            return null
        },
        dietPdf() {
            if(this.pdf_file) {
                return URL.createObjectURL(this.pdf_file)
            } else if(this.fileStore.dietPdfFiles(this.dietData)){
                return this.fileStore.dietPdfFiles(this.dietData)
            }
            return null
        }
    },
    watch: {
        '$route.params': {
            handler(toParams, previousParams) {
                const id = toParams.id;
                if (id) {
                    this.getDiet(id)
                } else {
                    this.initialDiet()
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
        initialDiet() {
            this.getDxCodes()
            this.dietId = null
            this.dietData = {
                codes: [],
                title: '',
                description: '',
                image: '',
                duration: 1,
                days: [
                    {
                        "morning-snack": '',
                        breakfast: '',
                        "afternoon-snack": '',
                        lunch: '',
                        dinner: ''
                    },
                    {
                        "morning-snack": '',
                        breakfast: '',
                        "afternoon-snack": '',
                        lunch: '',
                        dinner: ''
                    }
                ]
            }
        },
        getDiet(id) {
            axiosInstance.get(`/diet/${id}`)
                .then(response => {
                    this.dietData = response.data.data;
                    this.dietId = this.dietData.id;
                    this.selectedDxCodes = this.dietData.codes;
                    this.getDxCodes()
                    this.fileStore.getPhotoLinkForDiet(this.dietData)   
                    this.fileStore.getPdfLinkForDiet(this.dietData)       
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
        selectPdfFile() {
            const r = this.$refs.pdfFileUpload;
            r.click();
        },
        addFile(event) {
            const files = event.target.files
            if (files) {
                this.file = files[0]
            }

        },
        addPdfFile(event) {
            const files = event.target.files
            if (files) {
                this.pdf_file = files[0]
            }

        },
        addDiet(values) {
            values.codes = this.selectedDxCodes.map(v => v.value)

            var filename = null
            var pdf_filename = null
            if (this.file != null) {
                filename = generateFileName(this.file)
            } else {
                filename = this.dietData.image
            }

            if (this.pdf_file != null) {
                pdf_filename = generateFileName(this.pdf_file)
            } else {
                pdf_filename = this.dietData.attachment
            }

            var formData = {
                title: values.title,
                description: values.description,
                image: filename,
                attachment: pdf_filename,
                days: values.days,
                codes: values.codes,
            }
            if (this.dietId) {
                axiosInstance.put(`/diet/${this.dietId}`, formData)
                    .then(response => {
                        const dietid = response.data.data.id;
                        if(this.pdf_file != null) {
                            const pdf_uploader = uploadFile(this.pdf_file, 'diets', dietid, pdf_filename)
                            pdf_uploader.axios
                                .then(response => {
                                    setTimeout(() => this.fileStore.getPdfLinkForDiet(this.dietData, true), 1000)
                                })
                        }
                        if (this.file != null) {
                            const uploader = uploadFile(this.file, 'diets', dietid, filename)
                            uploader.axios
                                .then(response => {
                                    setTimeout(() => this.fileStore.getPhotoLinkForDiet(this.dietData, true), 1000)
                                    this.alertStore.success("Diet updated!")
                                    this.$router.back()
                                }).catch(error => {
                                    console.log(error)
                                    this.alertStore.error(error.response.data.message)
                                });
                        } else {
                            this.alertStore.success("Diet updated!")
                            this.$router.back()
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            } else {
                axiosInstance.post('/diet', formData)
                    .then(response => {
                        const dietid = response.data.data.id;
                        if(this.pdf_file != null) {
                            const pdf_uploader = uploadFile(this.pdf_file, 'diets', dietid, pdf_filename)
                            pdf_uploader.axios
                                .then(response => {
                                    setTimeout(() => this.fileStore.getPdfLinkForDiet(this.dietData, true), 1000)
                                })
                        }
                        if (this.file != null) {
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
            }
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
            <Form v-if="dietData" @submit="addDiet" :initial-values="dietData">

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
                    <input hidden type="file" name="attachment" @change="addFile" ref="fileUpload" accept="image/*" />
                    <div class="document-btn" @click="selectFile()">
                        <CameraIcon />
                        <span>Upload Photo</span>
                        <img v-if="dietImage" :src="dietImage" style="width:150px;height:150px;aspect-ratio: 1;"/>
                    </div>

                    <input hidden type="file" name="pdf-attachment" @change="addPdfFile" ref="pdfFileUpload" accept="application/pdf" />
                    <a v-if="dietPdf" :href="dietPdf" target="_blank">Download attachment</a>
                    <div class="document-btn" @click="selectPdfFile()">
                        <AttachmentIcon />
                        <span>Upload Attachment</span>
                    </div>

                    <div class="add-diet-inner">
                        <div class="add-diet">
                            <label for="diet">Diet Title</label>
                            <Field name="title" type="text" placeholder="e.g. Mediterranean Diet" />
                        </div>

                        <div class="add-diet">
                            <label for="duration">Diet Duration</label>
                            <input disabled type="text" :value="dietData.duration + ' days'" size="6" />
                        </div>
                    </div>
                </div>

                <FieldArray :name="`days`" v-slot="{ fields, push, remove }">
                    <div class="add-diet-day-grid">
                        <fieldset v-for="(field, index) in fields" :key="field.key">
                            <div class="add-diet-day-grid-item title">Day {{ index + 1 }}</div>
                            <button v-if="fields.length > 1" type="button" @click="remove(index);dietData.duration--" class="remove">Remove Day</button>
                            <div class="add-diet">
                                <label>Snack</label>
                                <Field as="textarea" :name="`days[${index}].morning-snack`" placeholder="Morning snack" />
                            </div>
                            <div class="add-diet">
                                <label>Breakfast</label>
                                <Field as="textarea" :name="`days[${index}].breakfast`" placeholder="e.g. Greek yogurt with strawberries and chia seeds" />
                            </div>
                            <div class="add-diet">
                                <label>Afternoon snack</label>
                                <Field as="textarea" :name="`days[${index}].afternoon-snack`" placeholder="Afternoon snack" />
                            </div>
                            <div class="add-diet">
                                <label>Lunch</label>
                            <Field as="textarea" :name="`days[${index}].lunch`" placeholder="e.g. A whole grain sandwich with hummus and vegetables" />
                            </div>
                            <div class="add-diet">
                                <label>Dinner</label>
                                <Field as="textarea" :name="`days[${index}].dinner`" placeholder="e.g. A tuna salad with greens and olive oil, as well as a fruit salad" />
                            </div>
                         </fieldset>
                    </div>

                    <div class="add-button"  v-if="fields.length < 40">
                        <AddIcon />
                        <button type="button"  @click="push({ breakfast: '', lunch: '', dinner: '' });dietData.duration++">Add Day</button>
                    </div>
                    </FieldArray>

                <!-- <div class="add-diet-day-grid">
                    <div class="add-diet-day-grid-item" v-for="(day, index) in dietData.days" :key="day" :id="day">
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
                </div> -->

                <!-- <div class="add-button">
                    <AddIcon />
                    <button type="button" @click="addDay">Add Day</button>
                </div> -->

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