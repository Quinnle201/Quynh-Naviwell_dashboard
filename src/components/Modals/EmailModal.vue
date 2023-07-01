<script>
import Modal from './Modal.vue'
import { Form, Field } from 'vee-validate';

export default {
    components: {
        Modal,
        Form,
        Field,
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    }
}
</script>

<template>
    <Modal @close="closeModal">
        <template #header>Send email to Patient Name</template>
        <template #content>
            <Form ref="">
                <div class="popup-content-item">
                    <label for="textarea">Subject</label>
                    <Field as="input" name="subject" class="popup-content-item-input"></Field>
                </div>

                <div class="popup-content-item popup-content-item-email">
                    <label for="textarea">Text</label>
                    <Field as="textarea" name="notes"></Field>
                </div>

                <div class="popup-footer">
                    <button type="button" class="w-btn w-btn-close" @click="closeModal()">Cancel</button>
                    <button type="submit" class="w-btn">Send</button>
                </div>
            </form>
        </template>
    </Modal>
</template>