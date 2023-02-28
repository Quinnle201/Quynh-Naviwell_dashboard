<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import VueMultiselect from 'vue-multiselect'
import { Form, Field, FieldArray } from 'vee-validate';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

export default {
    components: {
        AddIcon,
        VueMultiselect,
        Form,
        Field,
        FieldArray,
        ckeditor: CKEditor.component
    },
    data() {
        const alertStore = useAlertStore();
        return {
            quizId: null,
            alertStore,
            quizData: null,
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the editor.
            },
            selectedDxCodes: [],
            dxCodes: []
        }
    },
    watch: {
        '$route.params': {
            handler(toParams, previousParams) {
                const id = toParams.id;
                if (id) {
                    this.getQuiz(id)
                } else {
                    this.initialQuiz()
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
        initialQuiz() {
            this.getDxCodes()
            this.quizId = null
            this.quizData = {
                codes: [],
                title: '',
                article: '',
                questions: [
                    {
                        text: '',
                        answers: ['', '', '']
                    }
                ]
            }
        },
        submitQuiz(values) {
            values.codes = this.selectedDxCodes.map(v => v.value)

            if (this.quizId) {
                axiosInstance.put(`/quizzes/${this.quizId}`, values)
                    .then(response => {
                        this.alertStore.success('Quiz updated')
                        this.$router.back()
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            } else {
                axiosInstance.post('/quizzes', values)
                    .then(response => {
                        this.alertStore.success('Quiz added')
                        this.$router.back()
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            }
        },
        getQuiz(id) {
            axiosInstance.get(`/quizzes/${id}`)
                .then(response => {
                    this.quizData = response.data.quiz;
                    this.quizId = this.quizData.id;
                    this.selectedDxCodes = this.quizData.codes;
                    this.getDxCodes()
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                    this.$router.replace({ name: 'add-quiz' })
                });
        },
        close() {
            this.$router.back()
        }
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add New Quiz</h3>
        </div>

        <div class="addquiz-wrapper page-bg">
            <Form v-if="quizData" @submit="submitQuiz" :initial-values="quizData">
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

                <div class="addquiz-inner">
                    <div class="addquiz-inner-title">
                        <label>Quiz Title</label>
                        <Field type="text" name="title" placeholder="Write a title..." />
                    </div>

                    <div class="editor-container">
                        <Field name="article">
                            <ckeditor :editor="editor" v-model="quizData.article" :config="editorConfig"></ckeditor>
                        </Field>
                    </div>

                    <h4>Questions</h4>

                    <FieldArray :name="`questions`" v-slot="{ fields, push, remove }">
                        <div class="addquiz-inner-grid">
                            <fieldset v-for="(field, index) in fields" :key="field.key" class="addquiz-inner-item">
                                <div class="addquiz-inner-item-head">
                                    <div>Question {{ index + 1 }}</div>
                                    <button v-if="fields.length > 1" type="button"
                                        @click="remove(index)">Remove Question</button>
                                </div>

                                <Field as="textarea" :name="`questions[${index}].text`" placeholder="Write a question..." />

                                <div class="addquiz-inner-item-list">Answers
                                    <FieldArray :name="`questions[${index}].answers`" v-slot="{ fields, push, remove }">
                                        <fieldset v-for="(a_field, idx) in fields" :key="a_field.key">
                                            <Field type="radio" :name="`questions[${index}].correct`" :value="idx">
                                            </Field>
                                            <Field type="text" :name="`questions[${index}].answers[${idx}]`" placeholder="Write a question..."/>

                                            <button v-if="fields.length > 2" type="button"
                                                @click="remove(idx)">X</button>
                                        </fieldset>
                                        <button type="button" v-if="fields.length < 5" @click="push('')">Add Another Answer</button>
                                    </FieldArray>
                                </div>
                            </fieldset>
                        </div>

                        <div class="add-button" v-if="fields.length < 20">
                            <AddIcon />
                            <button type="button" @click="push({ text: '', answers: ['', '', ''] })">Add
                                Question</button>
                        </div>
                    </FieldArray>

                </div>

                <div class="addquiz-btns">
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


<style>
#editor-container {
    width: 1000px;
    margin: 20px auto;
}

.ck-editor__editable[role="textbox"] {
    /* editing area */
    min-height: 200px;
}

.ck-content .image {
    /* block images */
    max-width: 80%;
    margin: 20px auto;
}
</style>