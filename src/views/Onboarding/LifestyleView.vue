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
    },
    methods: {
    }
}
</script>
<template>
    <Header />
    <div class="welcome-wrapper">
        <div class="welcome-inner">
            <div class="welcome-heading">
                <h4>Glucose</h4>
                <h6>Do you have or have you experienced the following in the past year?</h6>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .welcome-wrapper {
        background-color: #F4F4FF;
        height: 100vh;
        margin: -4rem -0.5rem 0 -7.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
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
        width: 14px;
        height: 14px;
        display: block;
        opacity: 1;
    }

    .welcome-progress li.complete span {
        background-color: #CCEED0;
        font-size: 0;
    }

    .info-form {
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