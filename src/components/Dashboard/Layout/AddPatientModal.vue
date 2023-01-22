<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import PatientInputGenerator  from '@/components/PatientInputGenerator.vue'

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        PatientInputGenerator,
    },
    setup() {

        const generalInfo = {
            fields: [
                {
                    label: 'First name',
                    name: 'user.first-name',
                    as: 'input',
                    rules: Yup.string().required('Name is required'),
                },
                {
                    label: 'Last name',
                    name: 'user.last-name',
                    as: 'input',
                    rules: Yup.string().required('Last name is required'),
                },
                {
                    label: 'DOB',
                    name: 'profile.dob',
                    as: 'input',
                    rules: Yup.date(),
                },
                {
                    label: 'Gender',
                    name: 'profile.gender',
                    as: 'select',
                    class: 'form-select',
                    children: [
                        {
                            label: 'Select gender',
                            value: '',
                            tag: 'option',
                            disabled: ''
                        },
                        {
                            label: 'Male',
                            value: 'm',
                            tag: 'option'
                        },
                        {
                            label: 'Female',
                            value: 'f',
                            tag: 'option'
                        },

                    ],
                    rules: Yup.string(),
                },
                {
                    label: 'Race',
                    name: 'profile.race',
                    as: 'input',
                    rules: Yup.string(),
                },
                {
                    label: 'Ethnicity',
                    name: 'profile.ethnicity',
                    as: 'input',
                    rules: Yup.string(),
                },
                {
                    label: 'Sexual orientation',
                    name: 'profile.sex-orientation',
                    as: 'input',
                    rules: Yup.string(),
                },
                {
                    label: 'Language',
                    name: 'profile.language',
                    as: 'input',
                    rules: Yup.string(),
                },
                {
                    label: 'Religion',
                    name: 'profile.religion',
                    as: 'input',
                    rules: Yup.string(),
                },
                {
                    label: '',
                    name: 'profile.notes',
                    as: 'textarea',
                    rules: Yup.string()
                }
            ],
        };

        const contactInfo = {
            fields: [
                {
                    label: 'Street Address',
                    name: 'contact.address',
                    as: 'input',
                    classattr: 'fullw-input',
                    rules: Yup.string()
                },
                {
                    label: 'Street Address cont’d',
                    name: 'contact.current-address',
                    as: 'input',
                    classattr: 'fullw-input',
                    rules: Yup.string()
                },
                {
                    label: 'City, State',
                    name: 'contact.city',
                    as: 'input',
                    classattr: 'fullw-input',
                    rules: Yup.string()
                },
                {
                    label: 'Zip code',
                    name: 'contact.zip',
                    as: 'input',
                    classattr: 'fullw-input',
                    rules: Yup.string()
                },
                {
                    label: 'Email *',
                    name: 'user.email',
                    as: 'input',
                    rules: Yup.string().required('Email is required'),
                },
                {
                    label: 'Phone *',
                    name: 'user.phone',
                    as: 'input',
                    rules: Yup.string().required('Phone is required'),
                },
            ]
        }

        const emergencyContactInfo = {
            fields: [
                {
                    label: 'Emergency Contact Name',
                    name: 'emergency.contact',
                    as: 'input',
                    classattr: 'fullw-input',
                    rules: Yup.string()
                },
                {
                    label: 'Phone Number',
                    name: 'emergency.phone',
                    as: 'input',
                    classattr: 'fullw-input',
                    rules: Yup.string()
                },
                {
                    label: 'Relation to patient',
                    name: 'emergency.relation',
                    as: 'input',
                    classattr: 'fullw-input',
                    rules: Yup.string()
                }
            ]
        }

        const insuranceInfo = {
            fields: [
                {
                    label: 'Insurance company',
                    name: 'insurance.name',
                    as: 'input',
                    classattr: 'fullw-input',
                    rules: Yup.string()
                },
                {
                    label: 'Subscriber/Member Number',
                    name: 'insurance.number',
                    as: 'input',
                    classattr: 'fullw-input',
                    rules: Yup.string()
                }
            ]
        }

        const patientInfo = {
            fields: [
                {
                    label: 'Weight',
                    name: 'additional-data.weight',
                    as: 'input',
                    rules: Yup.string()
                },
                {
                    label: 'Height',
                    name: 'additional-data.height',
                    as: 'input',
                    rules: Yup.string()
                },
                {
                    label: 'BMI',
                    name: 'additional-data.bmi',
                    as: 'input',
                    rules: Yup.string()
                },
                {
                    label: 'Allergies',
                    name: 'additional-data.allergies',
                    as: 'input',
                    rules: Yup.string()
                },
            ]
        }

        const currentMeds = {
            fields: [
                {
                    label: '',
                    name: 'meds[0]',
                    as: 'input',
                    classattr: 'fullw-input',
                    placeholder: "Medication Name, Dosage, Frequency",
                    rules: Yup.string()
                },
                {
                    label: '',
                    name: 'meds[1]',
                    as: 'input',
                    classattr: 'fullw-input',
                    placeholder: "Medication Name, Dosage, Frequency",
                    rules: Yup.string()
                },
                {
                    label: '',
                    name: 'meds[2]',
                    as: 'input',
                    classattr: 'fullw-input',
                    placeholder: "Medication Name, Dosage, Frequency",
                    rules: Yup.string()
                },
                
            ]
        }

        const alertStore = useAlertStore();
        return { generalInfo, contactInfo, emergencyContactInfo, insuranceInfo, patientInfo,  currentMeds, alertStore }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        onSubmit(values) {
            axiosInstance.post('/patients', values )
            .then(response => {
                this.close()
                this.alertStore.success('Patient created.');
            })
            .catch(error => {
                this.alertStore.error(error.response.data.message)
            });

        },
    },
};
</script>

<template>
    <Transition>
        <div class="addpatient-wrapper">
            <Form @submit="onSubmit">
                <div class="addpatient-head">
                    <h4>Create New Patient</h4>
                    <div>
                        <button type="submit" class="w-btn w-btn-save">Save</button>
                        <button type="reset" class="w-btn w-btn-close" @click="close">Cancel</button>
                    </div>
                </div>

                <div class="add-patient-inner">
                    <div class="add-patient-card">
                        <div class="add-patient-card-title">General Information</div>

                        <div class="addpatient-card-content">
                            <PatientInputGenerator :schema="generalInfo" />
                        </div>
                    </div>

                    <div class="add-patient-card">
                        <div class="add-patient-card-title">Contact Information</div>

                        <div class="addpatient-card-content">
                            <PatientInputGenerator :schema="contactInfo" />

                            <div class="addpatient-card-content">
                                <div class="add-patient-card-title">Emergency Contact Information</div>
                                <PatientInputGenerator :schema="emergencyContactInfo" />
                            </div>
                        </div>
                    </div>

                    <div class="addpatient-card-two">
                        <div class="add-patient-card">
                            <div class="add-patient-card-title">Insurance Provider</div>

                            <div class="addpatient-card-content">
                                <PatientInputGenerator :schema="insuranceInfo" />
                            </div>
                        </div>

                        <div class="add-patient-card">
                            <div class="add-patient-card-title">Patient Information</div>

                            <div class="addpatient-card-content">
                                <PatientInputGenerator :schema="patientInfo" />

                                <div class="addpatient-card-content-title">Current Medications and Supplements</div>

                                <div class="medication-block">
                                    <PatientInputGenerator :schema="currentMeds" />

                                    <button type="button">Add Medication or Supplement</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

    .addpatient-wrapper {
        background-color: #FFFFFF;
        width: 100%;
        height: 100%;
        padding: 28px 32px;
        position: absolute;
        top: -8px;
    }

    .addpatient-head {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

.addpatient-head h4 {
    font-size: 24px;
    font-weight: 400;
    line-height: 24px;
    color: #000000;
}

    .addpatient-head button.w-btn.w-btn-close {
        margin-left: 36px;
    }

.add-patient-inner {
    height: 98%;
    padding-bottom: 30px;
    display: grid;
    grid-template-columns: 35fr 30fr 35fr;
    gap: 26px;
}

.add-patient-card {
    background-color: #FFFEFE;
    padding: 0 30px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 16px;
    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
}

.addpatient-card-two .add-patient-card:first-child {
    margin-bottom: 26px;
}

.add-patient-card-title {
    margin-top: 24px;
    margin-bottom: 18px;
    font-size: 20px;
    font-weight: 400;
    line-height: 20px;
    color: #000000;
    text-align: center;
}

.addpatient-card-content ul {
    list-style: none;
}

.addpatient-card-content ul li {
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: 30fr 70fr;
    align-items: center;
    gap: 26px;
}

.addpatient-card-content ul li:last-child {
    margin-bottom: 0;
}

.addpatient-card-content ul li.fullw-input {
    grid-template-columns: 1fr;
    gap: 0;
    text-align: center;
}

.addpatient-card-content ul li.fullw-input label {
    margin-bottom: 3px;
}

.addpatient-card-content ul li label {
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    color: #000000;
    white-space: nowrap;
}

.addpatient-card-content ul li input,
.addpatient-card-content ul li textarea {
    background-color: #F4F4FF;
    width: 100%;
    padding-left: 22px;
    border-radius: 10px;
    color: #000000;
    outline: none;
    border: none;
}

.addpatient-card-content ul li input {
    height: 40px;
}

.addpatient-card-content ul li textarea {
    height: 100%;
    grid-row: span 6;
    grid-column: span 2;
    padding-top: 16px;
    resize: none;
}

.addpatient-card-content ul li textarea::placeholder {
    color: #000000;
}

.addpatient-card-content-title {
    margin: 8px 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    color: #000000;
    text-align: center;
}

.addpatient-card-content .medication-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.addpatient-card-content .medication-block ul {
    width: 100%;
    height: 180px;
    overflow-y: auto;
}

.addpatient-card-content .medication-block ul::-webkit-scrollbar {
    width: 8px;
}

.addpatient-card-content .medication-block ul::-webkit-scrollbar-track {
    background-color: #E7E7E7;
    border-radius: 8px;
}

.addpatient-card-content .medication-block ul::-webkit-scrollbar-thumb {
    background-color: #5C90F1;
    border-radius: 8px;
}


.addpatient-card-content .medication-block button {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    color: #0258BC;
}
</style>