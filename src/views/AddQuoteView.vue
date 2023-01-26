<script>
import AddIcon from '../components/icons/IconAdd.vue'
import VueMultiselect from 'vue-multiselect'
import { Form, Field } from 'vee-validate';

export default {
    components: {
        AddIcon,
        VueMultiselect,
        Form,
        Field
    },
    data() {
        return {
            selectedPatients: null,
            optionsPatients: [{
                label: 'Select All',
                patients: ['Howard Aarons', 'Edward Alvarez', 'Emily Atilla', 'Monkey D. Luffy', 'God Usopp', 'Roronoa Zoro']
            }],
            selectedGroups: null,
            optionsGroups: [{
                label: 'Select All',
                groups: ['Group 1', 'Group 2', 'Group 3', 'Group 4']
            }],
            count: 1,
        }
    },
    methods: {
        addQuote: function(){
            if (this.count < 20) this.count++;
        },
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add New Quote</h3>
        </div>

        <div class="addquote-wrapper page-bg">
            <div class="addquote-selects">
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
                        :limit="3" 
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
                        :limit="3" 
                        group-values="groups" 
                        group-label="label" 
                        :group-select="true" 
                        select-group-label="Select All" 
                        deselect-group-label="Clear All"  
                        >
                        <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                    </VueMultiselect>
                </div>
            </div>
            <div class="popup-content-item addquote-grid">
                <Field as="textarea" placeholder="Write a quote..." name="text" v-for="key in count" :key="key" :id="key" />
            </div>

            <div class="add-quote-btn">
                <AddIcon />
                <button @click="addQuote">Add New Quote</button>
            </div>

            <div class="addquote-btns">
                <button :type="selectedQuote ? 'button' : 'reset'" class="w-btn w-btn-close"
                    :class="selectedQuote ? 'w-btn-delete' : 'w-btn-close'"
                    @click="selectedQuote ? showDeleteModal() : closeModal()">
                    {{ selectedQuote? 'Delete': 'Cancel' }}
                </button>
                <button type="submit" class="w-btn">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>