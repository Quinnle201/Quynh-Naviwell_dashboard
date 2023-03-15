<script>
import Header from '@/components/Dashboard/Layout/Header.vue'
import { Form, Field } from 'vee-validate';
import DateInput from '@/components/DateInput.vue';
import AddIcon from '@/components/icons/IconAdd.vue';
import CheckmarkIcon from '@/components/icons/IconCheckmark.vue';

export default {
    components: {
        Header, 
        Form, 
        Field, 
        DateInput,
        AddIcon,
        CheckmarkIcon
    },
    data() {
        return {
            date: "",
            text: "Add emergency contact info",
            emergency: false,
            first: true,
            second: false,
            third: false
        }
    },
    methods: {
        showEmergency() {
            this.emergency = true;
            let text = "Remove emergency contact info";
            this.text = text;
        },
    }
}
</script>
<template>
    <Header />
    <div class="welcome-wrapper">
        <div class="welcome-inner">
            <div class="welcome-heading">
                <h4>Before we start</h4>
                <h6>Fill out questions</h6>
            </div>
            
            <ul class="welcome-progress">
                <li class="complete">
                    <span>1</span>
                    <CheckmarkIcon />
                    About you
                </li>
                <li class="active">
                    <span>2</span>
                    Contact information
                </li>
                <li>
                    <span>3</span>
                    Health
                </li>
            </ul>

            <Form class="info-form">
                <div v-show="first" class="info-form-inner">
                    <div class="info-form-inner-item">
                        <label class="info-form-label">
                            Date of birth
                            <div :class="$options.name">
                                <date-input v-model="date"/>
                            </div>
                        </label>
                        <label class="info-form-item">
                            Gender
                            <Field as="select" name="gender">
                                <option></option>
                            </Field>
                        </label>
                        <label class="info-form-item">
                            Ethnicity
                            <Field as="select" name="ethnicity">
                                <option></option>
                            </Field>
                        </label>
                        <label class="info-form-item">
                            Language
                            <Field as="select" name="language">
                                <option></option>
                            </Field>
                        </label>
                    </div>

                    <div class="info-form-button" @click="first = false; second = true">Next</div>
                </div>
            
                <div v-show="second" class="info-form-inner">
                    <div class="info-form-inner-item">
                        <label class="info-form-item">
                            Phone number
                            <Field type="number" name="phone-number" />
                        </label>
                        <label class="info-form-item">
                            Street address
                            <Field type="text" name="street-address" />
                        </label>
                        <div class="info-form-item-wrapper">
                            <label class="info-form-item">
                                City
                                <Field type="text" name="city" />
                            </label>
                            <label class="info-form-item">
                                Zip code
                                <Field type="text" name="zip-code" />
                            </label>
                        </div>

                        <div class="info-form-add-btn" @click="showEmergency()" ref="tessst">
                            <AddIcon />
                            {{ text }}
                        </div>

                        <div class="info-form-emerg" v-show="emergency">
                            <label class="info-form-item">
                                Name
                                <Field type="text" name="name" />
                            </label>
                            <label class="info-form-item">
                                Relationship
                                <Field type="text" name="relationship" />
                            </label>
                            <label class="info-form-item">
                                Phone number
                                <Field type="number" name="phone-number" />
                            </label>
                            <label class="info-form-item">
                                Street address
                                <Field type="text" name="address" />
                            </label>
                            <div class="info-form-item-wrapper">
                                <label class="info-form-item">
                                    City
                                    <Field type="text" name="city" />
                                </label>
                                <label class="info-form-item">
                                    Zip code
                                    <Field type="text" name="zip-code" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="info-form-button" @click="second = false; third = true">Next</div>
                </div>

                <div v-show="third" class="info-form-inner">
                    <div class="info-form-inner-item">
                        <label class="info-form-item">
                            Family history
                            <Field as="select" name="family-history">
                                <option></option>
                            </Field>
                        </label>
                        <label class="info-form-item">
                            Health conditions
                            <Field as="select" name="health-conditions">
                                <option></option>
                            </Field>
                        </label>
                        <div class="info-form-item-wrapper">
                            <label class="info-form-item">
                                Drug name
                                <Field type="text" name="drug" placeholder="e.g.: Thyrozol 10mg" />
                            </label>
                            <label class="info-form-item">
                                Dosage
                                <Field type="text" name="dosage" placeholder="e.g.: one tablet a day" />
                            </label>
                        </div>
                        <div class="info-form-item-wrapper">
                            <label class="info-form-item">
                                Drug name
                                <Field type="text" name="drug" placeholder="e.g.: Thyrozol 10mg" />
                            </label>
                            <label class="info-form-item">
                                Dosage
                                <Field type="text" name="dosage" placeholder="e.g.: one tablet a day" />
                            </label>
                        </div>
                    </div>

                    <button>Next</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped>
    .welcome-wrapper {
        background-color: #F4F4FF;
        height: 100vh;
        margin: -4rem -0.5rem 0 -7.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .welcome-sidebar ul {
        list-style: none;
    }

    .welcome-sidebar ul li {
        margin-bottom: 16px;
        font-size: 18px;
    }

    .welcome-inner {
        background-color: rgba(255, 255, 255, .8);
        max-width: 40%;
        width: 100%;
        height: 80vh;
        margin: 0 auto;
        padding: 32px 40px;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        border-radius: 16px;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .welcome-heading {
        text-align: center;
    }

    .welcome-heading h6 {
        color: var(--primary);
    }

    .welcome-progress {
        width: 100%;
        margin: 16px auto 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
    }

    .welcome-progress li {
        max-width: 30%;
        flex: 0 0 30%;
        display: flex;
        align-items: center;
        padding-top: 8px;
        font-size: 16px;
        font-weight: 500;
        border-top: 4px solid #DBDBDB;
    }

    .welcome-progress li span {
        background-color: #DBDBDB;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        display: block;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        line-height: 26px;
        border-radius: 50%;
    }

    .welcome-progress li svg {
        width: 0;
        height: 0;
        display: none;
        opacity: 0;
        position: absolute;
        left: 6px;
    }

    .welcome-progress li.active {
        border-top-color: var(--primary);
    }

    .welcome-progress li.active span {
        background-color: var(--primary);
    }

    .welcome-progress li.complete {
        border-top-color: #74C973;
        color: #74C973;
    }

    .welcome-progress li.complete svg {
        width: 12px;
        height: 14px;
        display: block;
        opacity: 1;
    }

    .welcome-progress li.complete span {
        background-color: #CCEED0;
        font-size: 0;
    }

    .info-form {
        max-width: 60%;
        width: 100%;
        height: 100%;
        margin: 40px auto 0;
        overflow: auto;
    }

    .info-form-inner-item {
        overflow-y: auto;
    }

    .info-form-inner-item::-webkit-scrollbar {
        width: 8px;
        height: 16px;
    }

    .info-form-inner-item::-webkit-scrollbar-track {
        background-color: #DBDBDB;
        border-radius: 8px;
    }

    .info-form-inner-item::-webkit-scrollbar-thumb {
        background-color: var(--primary);
        border-radius: 8px;
    }

    .info-form-inner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .info-form-inner-item {
        width: 100%;
    }

    .info-form-label {
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: 500;
    }

    .info-form .info-form-item {
        width: 100%;
        font-size: 16px;
        font-weight: 500;
    }

    .info-form .info-form-item input, 
    .info-form .info-form-item select {
        background-color: #FFFEFE;
        width: 100%;
        height: 50px;
        min-height: 50px;
        margin-bottom: 16px;
        padding: 4px 10px;
        display: block;
        font-size: 16px;
        border: 1px solid #CCCCCC;
        border-radius: 16px;
        outline: none;
        transition: .3s ease;
    }

    .info-form .info-form-item input::placeholder {
        font-size: 14px;
    }

    .info-form .info-form-item select {
        background-image: url(/src/assets/img/select-icon.svg);
        background-repeat: no-repeat;
        background-position: top 50% left 96%;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    .info-form .info-form-item-wrapper {
        display: flex;
        justify-content: space-between;
    }

    .info-form .info-form-item-wrapper .info-form-item {
        max-width: 48%;
    }

    .info-form-button, 
    .info-form button {
        background-color: var(--primary);
        width: 100%;
        height: 56px;
        margin-top: 32px;
        padding: 12px 32px;
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
        border-radius: 16px;
        cursor: pointer;
    }

    .info-form-add-btn {
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
    }

    .info-form-add-btn svg {
        margin-right: 8px;
    }

    @media (hover: hover) and (pointer: fine) {
        .info-form .info-form-item input:focus, 
        .info-form .info-form-item select:focus {
            border: 1px solid var(--primary);
            box-shadow: 2px 3px 6px rgba(204, 204, 204, 0.2);
        }
    }
</style>