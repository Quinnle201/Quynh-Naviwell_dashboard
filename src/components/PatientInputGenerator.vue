<template>
    <ul>
        <li v-bind:class="classattr ?? ''" v-for="{ as, name, label, classattr, children, ...attrs } in schema.fields"
            :key="name">
            <label :for="name">{{ label }}</label>
            <Field :as="as" :id="name" :name="name" v-bind="attrs">
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
export default {
    name: 'PatientInputGenerator',
    components: {
        Form,
        Field,
        ErrorMessage
    },
    props: {
        schema: {
            type: Object,
            required: true,
        },
    },
};
</script>