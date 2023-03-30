<script>
import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate';
import * as Yup from 'yup';
import LineChart from '@/components/LineChart.vue'
import PatientInputGenerator from '@/components/Patient/PatientInputGenerator.vue'

import AddIcon from '@/components/icons/IconAdd.vue';
import RemoveIcon from '@/components/icons/IconRemoveCircle.vue';

import { axiosInstance } from '@/helpers';
import { useAlertStore, useAuthStore } from '@/stores';

import _get from 'lodash/get';
import _find from 'lodash/find'

export default {
    components: {
        Form,
        Field,
        FieldArray,
        ErrorMessage,
        AddIcon,
        RemoveIcon,
        PatientInputGenerator,
        LineChart
    },
    async mounted() {
        await this.getMedicine();
        this.getPatient()
        this.getPatientHealthData()

    },
    computed: {
        user() {
            return this.authStore.user
        },
    },
    data() {

        const generalInfo = {
            fields: [
                {
                    label: 'First name',
                    name: 'user.first_name',
                    as: 'input',
                    model: 'user.first_name',
                    rules: Yup.string().required('Name is required'),
                },
                {
                    label: 'Last name',
                    name: 'user.last_name',
                    as: 'input',
                    model: 'user.last_name',
                    rules: Yup.string().required('Last name is required'),
                },
                {
                    label: 'DOB',
                    name: 'profile.dob',
                    as: 'input',
                    model: 'dob',
                    rules: Yup.date().nullable(),
                },
                {
                    label: 'Gender',
                    name: 'profile.gender',
                    as: 'select',
                    model: 'gender',
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
                    rules: Yup.string().nullable(),
                },
                {
                    label: 'Race',
                    name: 'profile.race',
                    as: 'input',
                    model: 'race',
                    rules: Yup.string().nullable(),
                },
                {
                    label: 'Ethnicity',
                    name: 'profile.ethnicity',
                    as: 'input',
                    model: 'ethnicity',
                    rules: Yup.string().nullable(),
                },
                {
                    label: 'Language',
                    name: 'profile.language',
                    as: 'input',
                    model: 'language',
                    rules: Yup.string().nullable(),
                },
                {
                    label: 'Religion',
                    name: 'profile.religion',
                    as: 'input',
                    model: 'religion',
                    rules: Yup.string().nullable(),
                },
            ],
        };

        const contactInfo = {
            fields: [
                {
                    label: 'Street Address',
                    name: 'contact.address',
                    as: 'input',
                    model: 'contact_info.address',
                    // classattr: 'fullw-input',
                    rules: Yup.string().nullable()
                },
                {
                    label: 'Street Address cont’d',
                    name: 'contact.current-address',
                    as: 'input',
                    model: 'contact_info.current-address',
                    // classattr: 'fullw-input',
                    rules: Yup.string().nullable()
                },
                {
                    label: 'City, State',
                    name: 'contact.city',
                    as: 'input',
                    model: 'contact_info.city',
                    // classattr: 'fullw-input',
                    rules: Yup.string().nullable()
                },
                {
                    label: 'Zip code',
                    name: 'contact.zip',
                    as: 'input',
                    model: 'contact_info.zip',
                    // classattr: 'fullw-input',
                    rules: Yup.string().nullable()
                },
                {
                    label: 'Phone',
                    name: 'user.phone',
                    as: 'input',
                    model: 'user.phone',
                    // classattr: 'fullw-input',
                    rules: Yup.string().nullable(),
                },
            ]
        }

        const emergencyContactInfo = {
            fields: [
                {
                    label: 'Emergency Contact Name',
                    name: 'emergency.contact',
                    as: 'input',
                    model: 'emergency_contact.contact',
                    classattr: 'fullw-input',
                    rules: Yup.string().nullable()
                },
                {
                    label: 'Phone Number',
                    name: 'emergency.phone',
                    as: 'input',
                    model: 'emergency_contact.phone',
                    classattr: 'fullw-input',
                    rules: Yup.string().nullable()
                },
                {
                    label: 'Relationship',
                    name: 'emergency.relation',
                    as: 'input',
                    model: 'emergency_contact.relation',
                    classattr: 'fullw-input',
                    rules: Yup.string().nullable()
                }
            ]
        }

        const dataChart = {
            data: {
                datasets: [{
                    type: 'line',
                    label: "Weight",
                    id: 'weight',
                    data: [],
                    borderColor: "#4766FF",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'scatter',
                    showLine: true,
                    label: "Blood Presure",
                    id: 'bp',
                    data: [],
                    borderColor: "#73D44D",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    label: "Resting Heart Rate",
                    id: 'resting_hr',
                    data: [],
                    borderColor: "#FF4D4D",
                    borderWidth: 2,
                    fill: false,
                },
                {
                    type: 'line',
                    label: "Body Fat",
                    id: 'bodyfat',
                    data: [],
                    borderColor: "#FFB54F",
                    borderWidth: 2,
                    fill: false,
                },
                ],
                labels: []
            },
            options: {
                responsive: true,
                lineTension: 1,
                scales: {
                    xAxes: [{
                        // display: false
                    }],
                    yAxes: [{
                        // display: false
                    }],
                },
            },
        }

        const alertStore = useAlertStore();
        const authStore = useAuthStore()
        return { generalInfo, contactInfo, emergencyContactInfo, alertStore, authStore, medicine: [], patient: null, dataChart, dataLoaded: false }
    },
    methods: {
        async getMedicine() {
            try {
                const response = await axiosInstance.get('/medicine')
                this.medicine = response.data.map(code => {
                    return { 'name': code.name, 'value': code.id };
                });
            } catch (error) {
                console.log(error)
            }
        },
        getPatient() {
            axiosInstance.get(`/patients/${this.user.profile_id}`)
                .then(response => {
                    const patient = response.data.data;
                    this.patient = patient;
                    this.setPatientData(patient);
                    
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        getPatientHealthData() {
            axiosInstance.get(`/patients/${this.user.profile_id}/health-data`)
                .then(response => {
                    const data = response.data.data
                    this.buildChart(data['health-data'])
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        buildChart(healthData) {
            healthData.forEach(data => {
                var dataCreated = new Date(data.created_at).format('MM/DD/YY')
                this.dataChart.data.labels.push(dataCreated)
                for (const [key, value] of Object.entries(data)) {
                    var chart = _find(this.dataChart.data.datasets, ['id', key]);
                    var finalValue = value
                    if (key == 'bp' && value != null) {
                        const pressure = value.split('/')
                        finalValue = { 'x': pressure[0], 'y': pressure[1] }
                    }
                    if (chart) {
                        chart.data.push(finalValue)
                    }
                }
            });
            this.dataLoaded = true
        },
        setPatientData(patient) {
            const pt = Object.assign({}, patient);;
            pt.dob = new Date(pt.dob).format("YYYY/MM/DD");
            this.generalInfo.fields.forEach((item) => {
                if (item.model) {
                    this.$refs.populatedForm.setFieldValue(item.name, _get(pt, item.model));
                }
            })
            this.contactInfo.fields.forEach((item) => {
                if (item.model) {
                    this.$refs.populatedForm.setFieldValue(item.name, _get(pt, item.model));
                }

            })
            this.emergencyContactInfo.fields.forEach((item) => {
                if (item.model) {
                    this.$refs.populatedForm.setFieldValue(item.name, _get(pt, item.model));
                }
            })


            const drugs = [];
            pt.meds.forEach((med, index) => {
                var medValue = ""
                var medType = ""
                const medArray = med.split(":");
                medType = medArray[0].trim();
                medValue = medArray[1].trim();
                drugs.push({ type: medType, amount: medValue });

            });

            if (drugs.length == 0) {
                drugs.push({ type: '', amount: null });
                drugs.push({ type: '', amount: null });
            }
            this.$refs.populatedForm.setFieldValue("drugs", drugs)
        },

        onSubmit(values) {

            if (!values.profile.dob) {
                this.alertStore.error("Date of birth is required!")
                return;
            }
            if (!values.profile.gender) {
                this.alertStore.error("Your gender is required!")
                return;
            }
            if (!values.user.phone) {
                this.alertStore.error("Phone is required!")
                return;
            }

            const medications = values.drugs.filter(drug => drug.type)
            const keysAndValues = medications.map(med => {
                let amount = parseInt(med.amount, 10)
                let type = med.type
                if (Number.isNaN(amount)) {
                    amount = 0;
                }
                return { type, amount }
            })
            const uniqueMedValues = keysAndValues.reduce(function (res, value) {
                if (!res[value.type]) {
                    res[value.type] = 0;
                }
                res[value.type] += value.amount;
                return res;
            }, {});
            let medicine = []
            Object.keys(uniqueMedValues).forEach(function (key, index) {
                medicine.push(`${key}: ${uniqueMedValues[key]}`)
            });

            values.meds = medicine


            axiosInstance.put(`/patients/${this.user.profile_id}`, values)
                .then(response => {
                    this.alertStore.success('Your profile has been updated.');
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });

        },
    },
};
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Profile</h3>
        </div>

        <div class="page-bg">
            <Form @submit="onSubmit" ref="populatedForm" class="profile-form">
                <div class="profile-inner">

                    <div class="profile-card">
                        <div class="profile-card-title">General Information</div>

                        <div class="profile-card-content">
                            <PatientInputGenerator :schema="generalInfo" />
                        </div>
                    </div>

                    <div class="profile-card">
                        <div class="profile-card-content">
                            <div class="profile-card-title">Contact Information</div>
                            <PatientInputGenerator :schema="contactInfo" />
                        </div>

                        <div class="profile-card-content">
                            <div class="profile-card-title">Emergency Contact Information</div>
                            <PatientInputGenerator :schema="emergencyContactInfo" />
                        </div>
                    </div>

                    <div class="profile-card" v-if="patient">
                        <div class="patient-data light-bg patient-card pt-card">
                            <div class="profile-card-title">Health Data</div>

                            <ul>
                        <li>
                            Height
                            <span>{{ patient.current_health_data?.height ?? '-' }}</span>
                        </li>
                        <li>
                            Body Fat
                            <span>{{ patient.current_health_data?.bodyfat ?? '-' }}</span>
                        </li>
                        <li>
                            Weight
                            <span>{{ patient.current_health_data?.weight ?? '-' }}</span>
                        </li>
                        <li>
                            BP
                            <span>{{ patient.current_health_data?.bp ?? '-' }}</span>
                        </li>
                        <li>
                            BMI
                            <span>{{ patient.current_health_data?.bmi ?? '-' }}</span>
                        </li>
                        <li>
                            Resting HR
                            <span>{{ patient.current_health_data?.resting_hr ?? '-' }}</span>
                        </li>
                    </ul>

                            <div>
                                <LineChart v-if="dataLoaded" :data="dataChart" />
                            </div>
                        </div>

                        <div class="profile-card-title">Current Medications and Supplements</div>

                        <div class="profile-card-content">
                            <div class="medication-block">
                                <FieldArray name="drugs" v-slot="{ fields, push, remove }" v-if="patient">
                                    <fieldset v-for="(field, index) in fields" :key="field.key">
                                        <div class="info-form-item-wrapper">
                                            <label class="info-form-item">
                                                Drug Class
                                                <Field as="select" :name="`drugs[${index}].type`" class="form-select">
                                                    <option value="" disabled>Pick one</option>
                                                    <option v-for="code in medicine" :value="code.value">{{ code.name }}
                                                    </option>
                                                </Field>
                                            </label>
                                            <label class="info-form-item">
                                                Number of Medications
                                                <Field type="number" :name="`drugs[${index}].amount`" placeholder="0" />
                                            </label>
                                            <div class="info-form-add-btn remove" v-if="fields.length > 1"
                                                @click="remove(index);">
                                                <RemoveIcon width="35" height="35" />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div class="info-form-add-btn" v-if="fields.length < 15"
                                        @click="push({ type: '', amount: null });">
                                        <AddIcon />
                                        Add Medicine
                                    </div>
                                </FieldArray>
                            </div>
                        </div>
                    </div>

                </div>
                <button type="submit" class="w-btn w-btn-save profile-btn">Save</button>
            </Form>
        </div>
    </div>
</template>

<style>
.profile-form {
    display: flex;
    flex-direction: column;
}

.profile-inner {
    height: 100%;
    padding-bottom: 30px;
    display: flex;
    justify-content: space-between;
    gap: 32px;
}

.profile-card {
    background-color: #FFFEFE;
    width: 100%;
    padding: 0 30px 24px;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-card:nth-child(2) {
    flex: 0 0 30%;
    justify-content: space-between;
}

.profile-card-title {
    margin-top: 24px;
    margin-bottom: 18px;
    font-size: 20px;
    font-weight: 400;
    line-height: 20px;
    color: #000000;
    text-align: center;
}

.profile-card-content ul {
    list-style: none;
}

.profile-card-content ul li {
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: 30fr 70fr;
    align-items: center;
    gap: 26px;
}

.profile-card-content ul li:last-child {
    margin-bottom: 0;
}

.profile-card-content ul li input+span[role="alert"] {
    background-color: #FF0000;
    width: 65%;
    padding: 3px 6px;
    position: absolute;
    right: 0;
    bottom: -34px;
    color: #FFFFFF;
    border-radius: 3px;
    z-index: 9;
}

.profile-card-content ul li input+span[role="alert"]:before {
    content: '';
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #FF0000;
    position: absolute;
    top: -7px;
    left: 7px;
}

.profile-card-content ul li.fullw-input {
    grid-template-columns: 1fr;
    gap: 0;
    text-align: center;
}

.profile-card-content ul li.fullw-input label {
    margin-bottom: 3px;
}

.profile-card-content ul li label {
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    color: #000000;
    white-space: nowrap;
}

.profile-card-content ul li input {
    background-color: #F4F4FF;
    width: 100%;
    height: 46px;
    padding-left: 22px;
    border-radius: 10px;
    font-size: 16px;
    color: #000000;
    outline: none;
    border: none;
}

.profile-card-content .medication-block {
    width: 100%;
    max-height: 215px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
}

.profile-card-content .medication-block::-webkit-scrollbar {
    width: 8px;
    height: 16px;
}

.profile-card-content .medication-block::-webkit-scrollbar-track {
    background-color: #DBDBDB;
    border-radius: 8px;
}

.profile-card-content .medication-block::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 8px;
}

.profile-card-content .medication-block ul {
    width: 100%;
    max-height: 204px;
    overflow-y: auto;
}

.profile-card-content .medication-block ul::-webkit-scrollbar {
    width: 8px;
}

.profile-card-content .medication-block ul::-webkit-scrollbar-track {
    background-color: #E7E7E7;
    border-radius: 8px;
}

.profile-card-content .medication-block ul::-webkit-scrollbar-thumb {
    background-color: #5C90F1;
    border-radius: 8px;
}

.profile-card-content .medication-block ul li {
    margin-bottom: 16px;
}

.profile-card-content .medication-block button {
    margin-top: 16px;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: #0258BC;
}

.medication-block fieldset {
    width: 100%;
    margin-bottom: 16px;
}

.form-select {
    height: 46px;
}

.medication-block .info-form-item-wrapper {
    padding-right: 35px;
    display: flex;
    justify-content: space-between;
}

.medication-block .info-form-item input {
    background-color: #F4F4FF;
    width: 100%;
    height: 46px;
    padding-left: 22px;
    border-radius: 10px;
    color: #000000;
    outline: none;
    border: none;
}

.info-form-add-btn.remove {
    position: absolute;
    right: 0;
}

.medication-block label.info-form-item {
    flex: 0 0 48%;
    font-size: 16px;
    font-weight: 400;
    color: #000000;
}

.medication-block .info-form-add-btn {
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
}

.profile-form .profile-btn {
    margin-left: auto;
    font-size: 16px;
}

.patient-data.light-bg.patient-card.pt-card {
    margin-bottom: -8px;
    padding: 0;
}

.patient-data.light-bg.patient-card.pt-card ul {
    margin-top: 0;
}

.patient-data.light-bg.patient-card.pt-card ul li {
    margin-bottom: 8px;
}

.patient-data.light-bg.patient-card.pt-card ul li span {
    background-color: #F4F4F4;
    font-size: 16px;
    font-weight: 500;
}
</style>