<script>
import Header from '@/components/Dashboard/Layout/Header.vue'
import { Form, Field } from 'vee-validate';
import DateInput from '@/components/DateInput.vue';

export default {
    components: {
        Header, 
        Form, 
        Field, 
        DateInput
    },
    data() {
        return {
            date: "",
        };
    },
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
                <li class="active">
                    <span>1</span>
                    About you
                </li>
                <li>
                    <span>2</span>
                    Contact information
                </li>
                <li>
                    <span>3</span>
                    Health
                </li>
            </ul>

            <Form class="info-form">
                <div>
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

                <button>Next</button>
            </Form>
        </div>
    </div>
</template>

<style>
    .welcome-wrapper {
        background-color: #F4F4FF;
        height: 100vh;
        margin: -4rem -0.5rem 0 -7.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .welcome-inner {
        background-color: #FFFFFF;
        max-width: 75%;
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
        max-width: 80%;
        width: 100%;
        margin: 32px auto 0;
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
        width: 30px;
        height: 30px;
        margin-right: 8px;
        display: block;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        line-height: 32px;
        border-radius: 50%;
    }

    .welcome-progress li.active {
        border-top-color: var(--primary);
    }

    .welcome-progress li.active span {
        background-color: var(--primary);
    }

    .info-form {
        max-width: 35%;
        width: 100%;
        height: 100%;
        margin: 40px auto 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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

    .info-form .info-form-item select {
        background-image: url(/src/assets/img/select-icon.svg);
        background-repeat: no-repeat;
        background-position: top 50% left 96%;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    .info-form button {
        background-color: var(--primary);
        width: 100%;
        height: 56px;
        margin-top: 32px;
        padding: 12px 32px;
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        border-radius: 20px;
    }

    @media (hover: hover) and (pointer: fine) {
        .info-form .info-form-item input:focus, 
        .info-form .info-form-item select:focus {
            border: 1px solid var(--primary);
            box-shadow: 2px 3px 6px rgba(204, 204, 204, 0.2);
        }
    }
</style>