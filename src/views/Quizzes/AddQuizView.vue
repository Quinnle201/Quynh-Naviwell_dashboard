<script>
import AddIcon from '@/components/icons/IconAdd.vue'
import VueMultiselect from 'vue-multiselect'
import { Form } from 'vee-validate';

export default {
    components: {
        AddIcon,
        VueMultiselect,
        Form,
    },
    data() {
        return {
            questions: 3,
        }
    },
    methods: {
        addQuestion: function () {
            if (this.questions < 20) this.questions++;
        },
    }
}
</script>

<template>
      <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Add New Quiz</h3>
        </div>

        <div class="addquiz-wrapper page-bg">
            <Form>
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
                
                <div class="addquiz-inner">
                    <div class="addquiz-inner-title">
                        <label>Quiz Title</label>
                        <input type="text" placeholder="Write a title..." />
                    </div>

                    <h4>Questions</h4>
                    
                    <div class="addquiz-inner-input" v-for="(question, index) in questions" :key="question" :id="question">
                        <div>Question {{ index + 1 }}</div>
                        <!-- <input type="text" placeholder="Write a question..." /> -->
                        <textarea name="" placeholder="Write a question..."></textarea>
                    </div>
                </div>

                <div class="add-button">
                    <AddIcon />
                    <button type="button" @click="addQuestion">Add Question</button>
                </div>

                <div class="addquiz-btns">
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