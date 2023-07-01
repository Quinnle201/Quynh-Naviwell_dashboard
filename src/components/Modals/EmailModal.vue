<script>
import Modal from './Modal.vue'
import { Form, Field } from 'vee-validate';

import { useAlertStore } from '@/stores';
import { axiosInstance } from '@/helpers';
import userMixin from '@/mixins/user.js'

export default {
    props: {
        patient_id: String,
        patient: Object
    },
    mixins: [
        userMixin
    ],
    components: {
        Modal,
        Form,
        Field,
    },
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            searchList: [],
        }
    },
    watch: {
        patient_id(value) {
            if (value != null) {
                this.$refs.emailForm.setFieldValue('patient_id', value)
            }

        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        submitEmail(values) {
            console.log(values)
            axiosInstance.post(`/patients/${this.patient_id}/email`, values)
                .then(response => {
                    this.closeModal()
                    this.alertStore.success('Email sent')
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                });
        },
    }
}
</script>
 
<template>
    <Modal @close="closeModal">
        <template #header>Send email to {{ userName(patient?.user) }}</template>
        <template #content>
            <Form  @submit="submitEmail" ref="emailForm">
                <Field v-if="patient_id" type="hidden" name="patient_id" />
                <div class="popup-content-item">
                    <label for="textarea">Subject</label>
                    <Field as="input" name="subject" class="popup-content-item-input"></Field>
                </div>

                <div class="popup-content-item popup-content-item-email">
                    <label for="textarea">Text</label>
                    <Field as="textarea" name="content"></Field>
                </div>

                <div class="popup-footer">
                    <button type="button" class="w-btn w-btn-close" @click="closeModal()">Cancel</button>
                    <button type="submit" class="w-btn">Send</button>
                </div>
            </form>
        </template>
    </Modal>
</template>