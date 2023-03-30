<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import PatientAutocomplete from '@/components/Patient/PatientAutocomplete.vue'
import { Form, Field } from 'vee-validate';

export default {
    components: {
        AddIcon,
        Form,
        Field,
        PatientAutocomplete,
    },
}

</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add Lab Result</h3>
        </div>

        <div class="addresult-wrapper page-bg">
            <Form @submit="submitQuotes">
                <div class="input-wrapper">
                    <label>Result Name</label>
                    <input placeholder="" />
                </div>

                <div class="input-wrapper">
                    <label>Patient Name</label>
                    <PatientAutocomplete />
                </div>

                <div class="input-wrapper">
                    <label>Date</label>
                    <input placeholder="" />
                </div>

                <div class="">
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