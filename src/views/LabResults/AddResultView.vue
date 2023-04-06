<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import AttachIcon from '@/components/icons/IconAttach.vue'
import FileIcon from '@/components/icons/IconFile.vue'
import PatientAutocomplete from '@/components/Patient/PatientAutocomplete.vue'
import CalendarIcon from '@/components/icons/IconCalendar.vue'

import { Form, Field } from 'vee-validate';

import { axiosInstance, uploadFile, generateFileName } from '@/helpers';
import { useAlertStore, useFileStore } from '@/stores';

import userMixin from '@/mixins/user.js'


export default {
    components: {
        AddIcon,
        Form,
        Field,
        AttachIcon,
        FileIcon,
        PatientAutocomplete,
        CalendarIcon,
    },
    mixins: [
        userMixin
    ],
    data() {
        const alertStore = useAlertStore()
        const fileStore = useFileStore()
        return {
            resultId: null,
            resultData: null,
            alertStore,
            fileStore,
            file: null,
            searchList: [],
        }
    },
    watch: {
        '$route.params': {
            handler(toParams, previousParams) {
                const id = toParams.id;
                if (id) {
                    this.getResult(id)
                } else {
                    this.initialResult()
                }
            },
            immediate: true
        }
    },
    methods: {
        searchPatient(term) {
            axiosInstance.post('patients/search', { name: term })
                .then(res => {
                    this.searchList = []
                    res.data.data.forEach(pt => {
                        this.searchList.push(pt)
                    });

                })
        },
        initialResult() {
            this.resultId = null
            this.resultData = {
                name: '',
                patient_id: '',
                file: '',
                created_at: '',
            }
        },
        getResult(id) {
            axiosInstance.get(`/lab-results/${id}`)
                .then(response => {
                    this.resultData = response.data.data;
                    this.resultId = this.resultData.id;
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                    this.$router.replace({ name: 'add-result' })
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
        deleteFile() {
            this.file = null
        },
        addResult(values) {

            let filename = null
            let fileref = null
            if (this.file != null) {
                fileref = generateFileName(this.file)
                filename = this.file.name
            } else {
                fileref = this.resultData.file.ref
                filename = this.resultData.file.name
            }

            let formData = {
                name: values.name,
                patient_id: values.patient_id,
                file: {"name": filename, "ref": fileref},
                date: values.date
            }

            if (this.resultId) {
                axiosInstance.put(`/lab-results/${this.resultId}`, formData)
                    .then(response => {
                        if (this.file != null) {
                            const uploader = uploadFile(this.file, 'results', values.patient_id, fileref)
                            uploader.axios
                                .then(response => {
                                    this.alertStore.success("Result updated!")
                                    this.$router.back()
                                }).catch(error => {
                                    console.log(error)
                                    this.alertStore.error(error.response.data.message)
                                });
                        } else {
                            this.alertStore.success("Result updated!")
                            this.$router.back()
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            } else {
                axiosInstance.post('/lab-results', formData)
                    .then(response => {
                        if (this.file != null) {
                            const uploader = uploadFile(this.file, 'results', values.patient_id, filename)
                            uploader.axios
                                .then(response => {
                                    this.alertStore.success("Result created!")
                                    this.$router.back()
                                }).catch(error => {
                                    console.log(error)
                                    this.alertStore.error(error.response.data.message)
                                });
                        } else {
                            this.alertStore.success("Result created!")
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
            <h3>Add Lab Result</h3>
        </div>

        <div class="addresult-wrapper page-bg">
            <Form v-if="resultData" @submit="addResult" :initial-values="resultData">
                <input hidden type="file" name="attachment" @change="addFile" ref="fileUpload" accept="application/pdf" />
                <div class="upload-photo" @click="selectFile()">
                    <label>Upload Result</label>
                    <div class="upload-btn">
                        <AttachIcon />
                    </div>

                    <div v-if="file" class="result-file">{{ file.name }}
                        <span @click="deleteFile">x</span>
                    </div>
                </div>
                
                <div class="input-wrapper">
                    <label>Result Name</label>
                    <Field name="name" type="text" placeholder="" />
                </div>

                <div class="input-wrapper">
                    <label>Patient Name</label>
                    <PatientAutocomplete :patient="resultData.patient ? userName(resultData.patient.user) : null" :patients="searchList" @search="searchPatient"
                        ref="patientAutocomplete" />
                </div>

                <div class="input-wrapper">
                    <label class="label-w-icon">Date
                        <Field name="date" type="date" class="popup-content-item-input"></Field>
                        <CalendarIcon />
                    </label>
                </div>

                <div class="addresult-btn">
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