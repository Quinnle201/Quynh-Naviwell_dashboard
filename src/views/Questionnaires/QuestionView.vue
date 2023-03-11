<script>
import { Form, Field, FieldArray } from 'vee-validate';

export default {
    components: {
        Form,
        Field,
        FieldArray,
    },
    data() {
        return {
            answers: [
                {value: '1 in 10'},
                {value: '1 in 4'},
                {value: '1 in 2'},
                {value: 'More than 9 in 10'},
            ]
        }
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Diabetes quiz</h3>
        </div>

        <div class="page-bg">
            <div class="question-wrapper">
                <div>Question 1 of 10</div>
                <h4>How many people with diabetes have type 2 diabetes?</h4>
                <Form>
                    <FieldArray name="questions">
                        <fieldset v-for="answer in answers">
                            <label>
                                {{ answer.value }}
                                <Field type="radio" :name="`1`" :value="answer.value" />
                            </label>
                        </fieldset>
                    </FieldArray>

                    <button>Next question</button>
                </Form>
            </div>
        </div>
    </div>
</template>