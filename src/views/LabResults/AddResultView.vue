<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import AttachIcon from '@/components/icons/IconAttach.vue'
import FileIcon from '@/components/icons/IconFile.vue'
import PatientAutocomplete from '@/components/Patient/PatientAutocomplete.vue'
import CalendarIcon from '@/components/icons/IconCalendar.vue'

import { Form, Field } from 'vee-validate';

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
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add Lab Result</h3>
        </div>

        <div class="addresult-wrapper page-bg">
            <Form>
                <input hidden type="file" name="attachment" @change="addFile" ref="fileUpload" />
                <div class="upload-photo">
                    <label>Upload Result</label>
                    <div>
                        <AttachIcon />
                    </div>
                    
                </div>
                <div class="input-wrapper">
                    <label>Result Name</label>
                    <input placeholder="" />
                </div>

                <div class="input-wrapper">
                    <label>Patient Name</label>
                    <PatientAutocomplete />
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