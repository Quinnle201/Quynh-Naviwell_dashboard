<script>
import TagsTextarea from "@/components/Tags.vue";
import DateInput from '@/components/DateInput.vue';

import DownloadIcon from '@/components/icons/IconDownload.vue'

import { useAlertStore } from '@/stores';
import { axiosInstance, calculateBMI } from '@/helpers';

import userMixin from '@/mixins/user.js'
import { h } from "vue";

import { Form, Field } from 'vee-validate';

export default {
    components: {
        TagsTextarea,
        DateInput,
        DownloadIcon,
        Form,
        Field,
    },
    mixins: [
        userMixin
    ],
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            patient: null,
            appointment: null,
            note: null,
            discussed: null,

            health_data: {
                height: null,
                height_in: null,
                height_ft: null,
                bp: null,
                weight: null,
                bmi: null,
                bodyfat: null,
                resting_hr: null,
            },

            tags: [
                { id: '99404 Homework', text: `The patient has been instructed to begin/continue the following:
-Preventative counseling sessions
-Tracking macro-nutrients 
-Specified exercise routine at home
-Suggested supplements
-Stretching and mobility routine at home`},
                { id: 'E78.5 Hyperlipidemia, unspecified', text: `E78.5 Hyperlipidemia, unspecified`},
                { id:  'I10 Essential (primary) hyperten', text: `I10	Essential (primary) hypertension`},
                { id:  'R53.81 Other malaise', text: `R53.81 Other malaise`},
                { id: 'Z71.3 Dietary counseling and sur', text: `Z71.3 Dietary counseling and surveillance`},
                { id:  'Z71.82 Exercise counseling', text: `Z71.82 Exercise counseling`},
                { id:  'Z71.9 Counseling, unspecified', text: `Z71.9 Counseling, unspecified`},
                { id:  'E03.9 Hypothyroidism, unspecified', text: `E03.9 Hypothyroidism, unspecified`},
                { id:  'E66.3 Overweight', text: `E66.3 Overweight`},
                { id:  'R63.5 Abnormal weight gain', text: `R63.5 Abnormal weight gain`},
                { id:  'E66.9 Obesity, unspecified', text: `E66.9 Obesity, unspecified`},
                { id:  'M54.50 Low back pain, unspecifie', text: `M54.50 Low back pain, unspecified`},
                { id:  'M54.2 Cervicalgia', text: `M54.2 Cervicalgia`},
            ]
        };
    },
    computed: {
        bmi() {
            return (values) => {
                const health_data = values['health-data']
                if(!health_data){
                    return "";
                }
                var bmi = ''
                if (health_data.height_ft && health_data.weight) {
                    const height = health_data.height_ft + "'" + (health_data.height_in ? health_data.height_in : '0') + '"'
                    bmi = calculateBMI(height, health_data.weight)

                }
                return bmi
            }
        },
    
        height() {
            return (value) => {
                let height = ['', '']
                if(value) {
                    height = value
                } else if(this.patient.current_health_data) {
                    height = this.patient.current_health_data?.height
                }
                height = height.split("'")
                return height
            }
        },
        heightft() {
            return this.height()[0].replace(/[^0-9.]/g, '');
        },
        heightin() {
            return this.height()[1].replace(/[^0-9.]/g, '');
        },
        parseHeight() {
            return (value) => {
                return value.replace(/[^0-9.]/g, '');
            }
        }
    },
    mounted() {
        const state = history.state;

        if(state.noteId) {
            this.getNote(state.noteId)
        } else {
            if(state.patientId) {
                this.getPatient(state.patientId)
            } else {
                this.alertStore.error("Patient is undefined. Please report to administrator.")
            }

            if(state.apptId) {
                this.getAppointment(state.apptId)
            } else {
                this.alertStore.error("Appointment is undefined. Please report to administrator.")
            }


        }
    },
    methods: {
        getPatient(id) {
            axiosInstance.get(`/patients/${id}`)
                .then(response => {
                    this.patient = response.data.data;
                    this.getLastQuiz(id)

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },

        getAppointment(id) {
            axiosInstance.get(`/appointments/${id}`)
                .then(response => {
                    this.appointment = response.data.data;
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },

        getNote(id) {
            axiosInstance.get(`/notes/${id}`)
                .then(response => {
                    const note = response.data.data;
                    this.note = note;
                    this.patient = note.patient;
                    this.appointment = note.appointment;
                    let health_data = note.health_data;
                    let height = null
                    if(health_data?.height) {
                        height = this.height(health_data?.height) ?? ['', ''];
                    }
                    
                    this.$refs.noteForm.setValues({
                        appt_id: note.appointment.id,
                        patient_id: note.patient.id,
                        time_in: note.time_in,
                        time_out: note.time_out,
                        counselling: note.counselling,
                        discussed: note.discussed,
                        next_appt: note.next_appt,
                        homework: note.homework,
                        next_followup_physical: new Date(note.next_followup_physical).toISOString().substring(0, 10),
                        next_followup_labs: new Date(note.next_followup_labs).toISOString().substring(0, 10),
                        'health-data.height_ft': height ? this.parseHeight(height[0]) : '', 
                        'health-data.height_in': height ? this.parseHeight(height[1]) : '',
                        'health-data.weight': health_data?.weight,
                        'health-data.bodyfat': health_data?.bodyfat,
                        'health-data.bp': health_data?.bp,
                        'health-data.resting_hr': health_data?.resting_hr,

                    });

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },

        //get last active quiz for this patient:
        getLastQuiz(id) {
            axiosInstance.get(`/patients/${id}/last-quiz`)
                .then(response => {
                    const quiz = response.data.data
                    if(quiz){
                        this.discussed = quiz.title
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },

        prefillFromLastHealth() {
            const h_d = this.patient.current_health_data;
            h_d.height_ft = this.heightft
            h_d.height_in =  this.heightin
            this.health_data = h_d
        },

        downloadPdf(id) {
            axiosInstance.get(`/notes/pdf/${id}`, {responseType: 'arraybuffer'})
                .then(response => {
                    let blob = new Blob([response.data], { type: 'application/pdf' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = 'report.pdf'
                    link.click()
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },


        submitNote(values) {

            if(values['health-data'].height_ft &&  values['health-data'].height_in){
                values['health-data'].height = values['health-data'].height_ft + "'" + (values['health-data'].height_in ? values['health-data'].height_in : '0') + '"'
            }
            values['health-data'].bmi = this.bmi(values)
            values.appt_id = this.appointment.id;
            values.patient_id = this.patient.id;
            if(!this.note) { 
                axiosInstance.post(`/notes`, values)
                    .then(response => {
                        this.note = response.data.data
                        history.state.noteId = this.note.id
                        this.alertStore.success('Note saved')
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            } else {
                axiosInstance.put(`/notes/${this.note.id}`, values)
                    .then(response => {
                        this.alertStore.success('Note updated')
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            }
        }
    }
};
</script> 

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>{{this.userName(patient?.user)}}</h3>
        </div>

        <div class="page-bg notes-wrapper">
            <Form @submit="submitNote" ref="noteForm" v-slot="{ values }">
                <div class="notes-input-wrapper">
                    <div class="notes-input-inner">
                        <label for="">
                            <span>Time In</span>
                            <TagsTextarea :tags="tags" fieldName="time_in" />
                        </label>
                        <label for="">
                            <span>Time Out</span>
                            <TagsTextarea :tags="tags" fieldName="time_out" />
                        </label>
                    </div>

                    <label for="" class="bg-textarea">
                        <span>Counselling</span>
                        <TagsTextarea :tags="tags" fieldName="counselling" />
                    </label>
                </div>

                <div class="notes-input-wrapper">
                    <label for="">
                        <span>Discussed the following:</span>
                        <Field as="textarea" v-model="discussed" name="discussed"></Field>
                    </label>

                    <label for="">
                        <span>Next session date</span>
                        <Field as="textarea" name="next_appt"></Field>
                    </label>
                </div>

                <div class="notes-input-wrapper">
                    <label for="">
                        <span>Patient homework</span>
                        <TagsTextarea :tags="tags" fieldName="homework" />
                    </label>

                    <label for="">
                        <span>Date of next scheduled office visit with provider: ___ Physical</span>
                        <Field type="date" name="next_followup_physical"/>
                    </label>

                    <label for="">
                        <span>Date of next scheduled office visit with provider: ___ Labs</span>
                        <Field type="date" name="next_followup_labs"/>
                    </label>
                </div>

                <button type="button" @click="prefillFromLastHealth" class="notes-health-btn">Fill from last health data</button>

                <div class="notes-input-wrapper notes-health-input">
                    <div class="notes-height-wrapper">
                        <label>Height</label>
                        <div class="notes-height-input">
                            <label for="">
                                <Field type="text" v-model="health_data.height_ft" name="health-data.height_ft"/>
                                <span>ft</span>
                            </label>
                            <label for="">
                                <Field type="text" v-model="health_data.height_in" name="health-data.height_in"/>
                                <span>in</span>
                            </label>
                        </div>
                    </div>

                    <label>
                        <span>Weight (lbs)</span>
                        <Field type="text" v-model="health_data.weight" name="health-data.weight"/>
                    </label>

                    <label>
                        <span>Body Fat (%)</span>
                        <Field type="text" v-model="health_data.body_fat" name="health-data.bodyfat"/>
                    </label>
                </div>

                <div class="notes-input-wrapper notes-health-input">
                    <label>
                        <span>BP</span>
                        <Field type="text" v-model="health_data.bp" name="health-data.bp"/>
                    </label>

                    <label>
                        <span>BMI</span>
                        <input name="bmi" type="text" :value="bmi(values)" disabled />
                    </label>
                
                    <label>
                        <span>Resting HR</span>
                        <Field type="text" v-model="health_data.resting_hr" name="health-data.resting_hr"/>
                    </label>
                </div>

                <div class="notes-btn-wrapper">
                    <button type="button" @click="downloadPdf(note.id)" class="w-btn" v-if="note">
                        <span>Download pdf</span>
                        <DownloadIcon class="attach-icon" /> 
                    </button>
                    <button type="submit" class="w-btn" v-if="note">Update</button>
                    <button type="submit" class="w-btn" v-else>Save</button>
                </div>
            </Form>
        </div>

        <div>
    </div>
    </div>
</template>

<style>
    .notes-input-wrapper {
        width: 100%;
        margin-bottom: 16px;
        padding-bottom: 16px;
        display: flex;
        justify-content: space-between;
        gap: 32px;
        border-bottom: 1px solid #E1E1E1;
    }

    .notes-input-wrapper:last-child {
        border: none;
    }

    .notes-input-inner {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 16px;
    }

    .notes-input-wrapper .notes-input-inner textarea {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding: 8px 12px;
        border-radius: 10px;
        color: #000000;
        outline: none;
        border: 1px solid #E7E7E7;
    }

    .notes-input-wrapper label {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .notes-input-wrapper label span {
        margin-bottom: 4px;
        font-size: 14px;
        font-weight: 500;
    }

    .notes-input-wrapper label input {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding: 8px 12px;
        border-radius: 10px;
        color: #000000;
        outline: none;
        border: 1px solid #E7E7E7;
    }

    .notes-input-wrapper label textarea {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding: 8px 12px;
        color: #000000;
        outline: none;
        resize: none;
        border: 1px solid #E7E7E7;
        border-radius: 10px;
    }

    .notes-input-wrapper .bg-textarea textarea {
        height: 165px;
    }

    .notes-input-wrapper.notes-health-input {
        padding: 0;
        border: none;
    }

    .notes-height-wrapper {
        width: 100%;
    }

    .notes-height-wrapper > label {
        margin-bottom: 4px;
        font-size: 14px;
        font-weight: 500;
    }

    .notes-height-input {
        display: flex;
        gap: 16px;
    }

    .notes-height-input input {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding-left: 22px;
        border-radius: 10px;
        color: #000000;
        outline: none;
        border: 1px solid #E7E7E7;
    }

    .notes-height-input > label {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }

    .notes-height-input > label span {
        margin: 0 0 0 4px;
    }

    .notes-wrapper .w-btn {
        min-width: auto;
        margin-top: 32px;
        margin-left: auto;
        padding: 16px 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
    }

    .notes-health-btn {
        background-color: var(--primary);
        margin-bottom: 8px;
        padding: 8px 16px;
        font-size: 16px;
        color: #FFFFFF;
        border-radius: 16px;
    }

    .notes-btn-wrapper {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
    }

    .notes-wrapper .notes-btn-wrapper .w-btn {
        margin-left: 0;
    }

    .notes-wrapper .attach-icon {
        padding-left: 16px;
        box-sizing: content-box;
    }

    .notes-wrapper .attach-icon path {
        fill: var(--main-color);
    }
</style>