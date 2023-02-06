<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import VueMultiselect from 'vue-multiselect'
import { Form, Field } from 'vee-validate';

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';

export default {
    components: {
        AddIcon,
        VueMultiselect,
        Form,
        Field
    },
    data() {
        const alertStore = useAlertStore();
        return {
            alertStore,
            count: 2,
        }
    },
    methods: {
        addQuote: function () {
            if (this.count < 20) this.count++;
        },
        submitQuotes(values) {
            axiosInstance.post('/quotes/mass', values)
                .then(response => {
                    this.alertStore.success('Quotes added')
                    this.$router.back()
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        close(){
            this.$router.back()
        }
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add New Quote</h3>
        </div>

        <div class="addquote-wrapper page-bg">
            <Form @submit="submitQuotes">
                <!-- Locked out until backend has the capability of grouping quotes -->
                <!-- <div class="addquote-selects">
                <div class="popup-content-item popup-content-item--select">
                    <label>Select Patients</label>
                    <VueMultiselect
                        v-model="selectedPatients"
                        :options="optionsPatients"
                        :multiple="true"
                        :close-on-select="false" 
                        search="false"
                        placeholder="Choose Patients" 
                        select-label="Select" 
                        deselect-label="Remove" 
                        :limit="5" 
                        group-values="patients" 
                        group-label="label" 
                        :group-select="true" 
                        select-group-label="Select All" 
                        deselect-group-label="Clear All" 
                        >
                    </VueMultiselect>
                </div>
                <div class="popup-content-item popup-content-item--select">
                    <label>Select Patients</label>
                    <VueMultiselect
                        v-model="selectedGroups"
                        :options="optionsGroups"
                        :multiple="true"
                        :close-on-select="false" 
                        search="false"
                        placeholder="Choose Groups" 
                        select-label="Select" 
                        deselect-label="Remove" 
                        :limit="5" 
                        group-values="groups" 
                        group-label="label" 
                        :group-select="true" 
                        select-group-label="Select All" 
                        deselect-group-label="Clear All"  
                        >
                    </VueMultiselect>
                </div>
            </div> -->
                <div class="popup-content-item addquote-grid">
                    <Field as="textarea" placeholder="Write a quote..." :name="`text[${key - 1}]`" v-for="key in count" :key="key" :id="key" />
                </div>

                <div class="add-quote-btn">
                    <AddIcon />
                    <button type="button" @click="addQuote">Add New Quote</button>
                </div>

                <div class="addquote-btns">
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

<style src="vue-multiselect/dist/vue-multiselect.css"></style>