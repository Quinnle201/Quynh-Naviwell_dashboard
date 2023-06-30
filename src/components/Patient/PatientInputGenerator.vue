<template>
    <ul ref="list">
        <li v-bind:class="classattr ?? ''" v-for="{ as, name, label, classattr, children, ...attrs } in schema.fields"
            :key="name">
            <label :for="name">{{ label }}</label>
            <date-input v-if="as == 'date-input'" :fieldName="name" ref="dateInput"/>
            <Field v-else :as="as" :id="name" :name="name" v-bind="attrs">
                <template v-if="children && children.length">
                    <component v-for="({ tag, text, ...childAttrs }, idx) in children" :key="idx" :is="tag"
                        v-bind="childAttrs">
                        {{ text }}
                    </component>
                </template>
            </Field>
            <ErrorMessage :name="name" />
        </li>

    </ul>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import DateInput from '@/components/DateInput.vue';

export default {
    name: 'PatientInputGenerator',
    components: {
        Form,
        Field,
        ErrorMessage,
        DateInput
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
    },
};
</script>
