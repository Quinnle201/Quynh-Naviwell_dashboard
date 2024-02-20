<script>
import Tabs from "@/components/Tabs.vue";
import TagsTextarea from "@/components/Tags.vue";
import DateInput from '@/components/DateInput.vue';
import DownloadIcon from '@/components/icons/IconDownload.vue'
import { Form, Field } from 'vee-validate';
import VueMultiselect from 'vue-multiselect'

export default {
    components: {
        Tabs,
        TagsTextarea,
        DateInput,
        DownloadIcon,
        Form,
        Field,
        VueMultiselect
    },
    data() {
        return {
            tabList: ["Subjective", "Objective", "Assessment", "Plan", "Medications/Allergies", "Billing"],
            assessmentTabList: ["Billing ICD10", "Problems", "Billing ICD9", "Problem History", "Assessments"], 
            planTabList: ["Clinical Info", "Labs"],
            medTabList: ["Medication", "Allergy", "Interactions"],
            tags: [
                { id: '99404 Homework', text: `The patient has been instructed to begin/continue the following:
                -Preventative counseling sessions
                -Tracking macro-nutrients 
                -Specified exercise routine at home
                -Suggested supplements
                -Stretching and mobility routine at home`},
                { id: 'E78.5 Hyperlipidemia, unspecified', text: `E78.5 Hyperlipidemia, unspecified`},
                { id:  'I10 Essential (primary) hyperten', text: `I10	Essential (primary) hypertension`},
                { id:  'R53.81 Other malaise', text: `R53.81 Other malaise`},
                { id: 'Z71.3 Dietary counseling and sur', text: `Z71.3 Dietary counseling and surveillance`},
                { id:  'Z71.82 Exercise counseling', text: `Z71.82 Exercise counseling`},
                { id:  'Z71.9 Counseling, unspecified', text: `Z71.9 Counseling, unspecified`},
                { id:  'E03.9 Hypothyroidism, unspecified', text: `E03.9 Hypothyroidism, unspecified`},
                { id:  'E66.3 Overweight', text: `E66.3 Overweight`},
                { id:  'R63.5 Abnormal weight gain', text: `R63.5 Abnormal weight gain`},
                { id:  'E66.9 Obesity, unspecified', text: `E66.9 Obesity, unspecified`},
                { id:  'M54.50 Low back pain, unspecifie', text: `M54.50 Low back pain, unspecified`},
                { id:  'M54.2 Cervicalgia', text: `M54.2 Cervicalgia`},
            ],
            valueGeneral: null,
            valueSkin: null,
            valueHeent: null,
            valueNeck: null,
            valueCardiovascular: null,
            valueRespiratory: null,
            valueGi: null,
            valueUrinary: null,
            valueVasc: null,
            valueMsk: null,
            valueNeurologic: null,
            valueEndocrine: null,
            valuePsychiatric: null,
            valueGeneralWnl: null,
            valueGeneralWnl: null,
            valueHeentlWnl: null,
            valueNecklWnl: null,
            valueCardiovascularlWnl: null,
            valueLungslWnl: null,
            valueAbdomenlWnl: null,
            valueMsklWnl: null,
            valueNeurolWnl: null,
            valueExtremlWnl: null,
            optionsGeneral: ['Weight gain-', 'Weight loss-', 'Weakness', 'Fatique', 'Subjective fever'],
            optionsSkin: ['Rash present-', 'Lump-', 'Sore-', 'Itching-', 'Dryness-', 'Color change-', 'Changes in hair or nails-'],
            optionsHeent: ['headache-', 'head injury-', 'dizziness-', 'lightheadedness-', 'vision changes-', 'excessive tearing', 'hearing problems-', 'tinnitus-', 'vertigo-', 'nasal stuffiness', 'nasal discharge-', 'nosebleeds-', 'sinus trouble-', 'dry mouth' ,'hoarseness'],
            optionsNeck: ['lump-', 'lumphadenopathy-', 'goiter-', 'pain-', 'stiffness-'],
            optionsCardiovascular: ['chest pain or discomfort-', 'palpitations-', 'dyspnea-', 'orthopnea-', 'paroxysmal nocturnal dyspnea-', 'edema-', 'add something'],
            optionsRespiratory: ['cough-', 'sputum-', 'hemoptysis-', 'dyspnea-', 'wheezing-'],
            optionsGi: ['trouble swallowing-', 'heartburn-', 'nausea-', 'rectal bleeding-', 'constipation-', 'diarrhea-', 'abdominal pain-', 'food intolerance-'],
            optionsUrinary: ['polyuria-', 'nocturia-', 'urgency-', 'burning or pain on urination-', 'hematuria-', 'urinary infections-', 'kidney stones-', 'incontinence-', 'dribbling-'],
            optionsVasc: ['intermittent claudication', 'leg cramps', 'varicose veins'],
            optionsMsk: ['muscle pain-', 'joint pain-', 'stiffness-', 'backache-', 'swelling-', 'redness-', 'tenderness-', 'stiffness-', 'limitation of motion-'],
            optionsNeurologic: ['fainting-', 'blackouts-', 'seizures-', 'weakness-', 'paralysis-', 'numbness or loss of sensation-', 'tingling-', 'tremors or other involuntary movements-'],
            optionsEndocrine: ['heat intolerance', 'cold intolerance', 'excessive sweating', 'excessive thirst', 'excessive hunger', 'change in glove/hat/shoe size'],
            optionsPsychiatric: ['nervousness-', 'depression-', 'memory change-', 'trouble sleeping-'],
            optionsGeneralWnl: ['Patient in distress', 'Cachectic appearance', 'Obese', 'Altered mental status', 'sad today'],
            optionsHeentlWnl: ['traumatic lesion to head', 'coarse hair', 'thin hair', 'visual acuity not intact', 'conjunctivae pale', 'conjunctivae cyanotic', 'sclerae icteric', 'pinpoint pupils', 'enlarged pupils', 'extraocular movements not intact', 'TM erythematous/bulging', 'rhinorrhea', 'sinus tenderness', 'pharyngeal erythema', 'pharyngeal exudate', 'pharyngeal lesion', 'tonsillar erythema', 'tonsillar exudate', 'tonsillar enlargement'],
            optionsNecklWnl: ['lymphadenopathy located', 'goiter present', 'other mass located-', 'carotid bruit-', 'trachea deviation'],
            optionsCardiovascularlWnl: ['JVP present-', 'carotid bruit present-', 'murmur present-', 'rub present-', 'gallop present-', 'S3 present', 'S4 present'],
            optionsLungslWnl: ['respiratory distress', 'increased work of breathing', 'accessory muscle use', 'audible wheezing', 'wheezing in all lungs fields on auscultation', 'rhonchi in all lung fields on auscultation', 'rales in all lung fields on auscultation', 'decreased breath sounds', 'absent breath sounds'],
            optionsAbdomenlWnl: ['bowel sounds hypoactive', 'bowel sounds hyperactive', 'surgical scar-', 'mass palpated RUQ-', 'mass palpated RLQ-', 'mass palpated LUQ-', 'mass palpated LLQ-', 'tenderness RUQ-', 'tenderness RLQ-', 'tenderness LUQ-', 'tenderness LLQ-', 'splenomegaly', 'hepatomegaly', 'distended abdomen', 'abdominal rigidity', 'rebound tenderness', 'voluntary guarding', 'involuntary guarding'],
            optionsMsklWnl: ['abnormal bulk/tone-', 'abnormal range of motion-', 'scoliosis-', 'joint deformities-', 'joint tenderness-'],
            optionsNeurolWnl: ['cranial nerve(s) dysfunction-', 'rapid alternating movements dysfunctional', 'point-to-point movements dysfunctional-', 'pain/temperature/light touch/vibration  /discrimination dysfunctional-', 'DTR abnormal-'],
            optionsExtremlWnl: ['varicose veins present-', 'edema present-'],

            valueLab: null,
            optionsLab: [],
            valueRadiology: null,
            optionsRadiology: [],
            valuePt: null,
            optionsPt: [],
            valueHomeHealth: null,
            optionsHomeHealth: [],
            valueEducation: null,
            optionsEducation: [],
            valueDiet: null,
            optionsDiet: [],
            valueGenInstructions: null,
            optionsGenInstructions: []
        };
    },
};
</script> 

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <!-- <h3>{{this.userName(patient?.user)}}</h3> -->
        </div>
        
        <tabs class="diet-tabs" :tabList="tabList">
            <template v-slot:tabPanel-1>
                <div class="page-bg notes-wrapper">
                    <Form>
                        <div class="notes-input-wrapper">
                            <label for="" class="bg-textarea">
                                <span>HPI</span>
                                <TagsTextarea :tags="tags" fieldName="hpi" />
                            </label>

                            <label for="" class="bg-textarea">
                                <span>Social HX</span>
                                <TagsTextarea :tags="tags" fieldName="hx" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Family HX</span>
                                <TagsTextarea :tags="tags" fieldName="fhx" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Past Medical HX</span>
                                <TagsTextarea :tags="tags" fieldName="phx" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>General [-]</span>
                                <Field type="checkbox" id="general" name="general"/>
                                <label for="general"></label>
                            </label>

                            <label for="">
                                <span>General [+]</span>
                                <VueMultiselect
                                    v-model="valueGeneral"
                                    :options="optionsGeneral"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>General Comments</span>
                                <TagsTextarea :tags="tags" fieldName="phx" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Skin [-]</span>
                                <Field type="checkbox" id="skin" name="skin"/>
                                <label for="skin"></label>
                            </label>

                            <label for="">
                                <span>Skin [+]</span>
                                <VueMultiselect
                                    v-model="valueSkin"
                                    :options="optionsSkin"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Skin Comments</span>
                                <TagsTextarea :tags="tags" fieldName="phx" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>HEENT [-]</span>
                                <Field type="checkbox" id="heent" name="heent"/>
                                <label for="heent"></label>
                            </label>

                            <label for="">
                                <span>HEENT [+]</span>
                                <VueMultiselect
                                    v-model="valueHeent"
                                    :options="optionsHeent"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>HEENT Comments</span>
                                <TagsTextarea :tags="tags" fieldName="phx" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Neck [-]</span>
                                <Field type="checkbox" id="heent" name="heent"/>
                                <label for="heent"></label>
                            </label>

                            <label for="">
                                <span>Neck [+]</span>
                                <VueMultiselect
                                    v-model="valueNeck"
                                    :options="optionsNeck"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Neck Comments</span>
                                <TagsTextarea :tags="tags" fieldName="neck" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Cardiovascular [-]</span>
                                <Field type="checkbox" id="cardiovascular" name="cardiovascular"/>
                                <label for="cardiovascular"></label>
                            </label>

                            <label for="">
                                <span>Cardiovascular [+]</span>
                                <VueMultiselect
                                    v-model="valueCardiovascular"
                                    :options="optionsCardiovascular"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>CV Comments</span>
                                <TagsTextarea :tags="tags" fieldName="cv" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Respiratory [-]</span>
                                <Field type="checkbox" id="respiratory" name="respiratory"/>
                                <label for="respiratory"></label>
                            </label>

                            <label for="">
                                <span>Respiratory [+]</span>
                                <VueMultiselect
                                    v-model="valueRespiratory"
                                    :options="optionsRespiratory"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Resp Comments</span>
                                <TagsTextarea :tags="tags" fieldName="resp" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>GI [-]</span>
                                <Field type="checkbox" id="gi" name="gi"/>
                                <label for="gi"></label>
                            </label>

                            <label for="">
                                <span>GI [+]</span>
                                <VueMultiselect
                                    v-model="valueGi"
                                    :options="optionsGi"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>GI Comments</span>
                                <TagsTextarea :tags="tags" fieldName="resp" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Urinary [-]</span>
                                <Field type="checkbox" id="urinary" name="urinary"/>
                                <label for="urinary"></label>
                            </label>

                            <label for="">
                                <span>Urinary [+]</span>
                                <VueMultiselect
                                    v-model="valueUrinary"
                                    :options="optionsUrinary"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Urinary Comments</span>
                                <TagsTextarea :tags="tags" fieldName="urinary" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Periph. Vasc. [-]</span>
                                <Field type="checkbox" id="periph" name="periph"/>
                                <label for="periph"></label>
                            </label>

                            <label for="">
                                <span>Periph. Vasc. [+]</span>
                                <VueMultiselect
                                    v-model="valueVasc"
                                    :options="optionsVasc"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Periph. Vasc. Comments</span>
                                <TagsTextarea :tags="tags" fieldName="vasc" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>MSK [-]</span>
                                <Field type="checkbox" id="msk" name="msk"/>
                                <label for="msk"></label>
                            </label>

                            <label for="">
                                <span>MSK [+]</span>
                                <VueMultiselect
                                    v-model="valueMsk"
                                    :options="optionsMsk"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>MSK Comments</span>
                                <TagsTextarea :tags="tags" fieldName="msk" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Neurologic [-]</span>
                                <Field type="checkbox" id="neuro" name="neuro"/>
                                <label for="neuro"></label>
                            </label>

                            <label for="">
                                <span>Neurologic [+]</span>
                                <VueMultiselect
                                    v-model="valueNeurologic"
                                    :options="optionsNeurologic"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Neuro Comments</span>
                                <TagsTextarea :tags="tags" fieldName="neuro" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Endocrine [-]</span>
                                <Field type="checkbox" id="endo" name="endo"/>
                                <label for="endo"></label>
                            </label>

                            <label for="">
                                <span>Endocrine [+]</span>
                                <VueMultiselect
                                    v-model="valueEndocrine"
                                    :options="optionsEndocrine"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Endo Comments</span>
                                <TagsTextarea :tags="tags" fieldName="endo" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Psychiatric [-]</span>
                                <Field type="checkbox" id="psychiatric" name="psychiatric"/>
                                <label for="psychiatric"></label>
                            </label>

                            <label for="">
                                <span>Psychiatric [+]</span>
  
                                <VueMultiselect
                                    v-model="valuePsychiatric"
                                    :options="optionsPsychiatric"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Psychiatric Comments</span>
                                <TagsTextarea :tags="tags" fieldName="psychiatric" />
                            </label>
                        </div>
                        
                        <div class="notes-btn-wrapper">
                            <button type="submit" class="w-btn">Save</button>
                        </div>
                    </Form>
                </div>
            </template>

            <template v-slot:tabPanel-2>
                <div class="page-bg notes-wrapper">
                    <Form>
                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>General WNL</span>
                                <Field type="checkbox" name="general"/>
                                <label for="general"></label>
                            </label>

                            <label for="">
                                <span>General Abnormal</span>
                                <VueMultiselect
                                    v-model="valueGeneralWnl"
                                    :options="optionsGeneralWnl"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>General Comments</span>
                                <TagsTextarea :tags="tags" fieldName="generalWnl" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>HEENT WNL</span>
                                <Field type="checkbox" name="general"/>
                                <label for="general"></label>
                            </label>

                            <label for="">
                                <span>HEENT Abnormal</span>
                                <VueMultiselect
                                    v-model="valueHeentlWnl"
                                    :options="optionsHeentlWnl"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>HEENT Comments</span>
                                <TagsTextarea :tags="tags" fieldName="heentWnl" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Skin WNL</span>
                                <Field type="checkbox" name="skinWnl"/>
                                <label for="skinWnl"></label>
                            </label>

                            <label for="">
                                <span>Skin Lesion</span>
                                <Field type="checkbox" name="skinLession"/>
                                <label for="skinLession"></label>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Skin Comments</span>
                                <TagsTextarea :tags="tags" fieldName="skinWnl" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Neck WNL</span>
                                <Field type="checkbox" name="neckWnl"/>
                                <label for="neckWnl"></label>
                            </label>

                            <label for="">
                                <span>Neck Abnormal</span>
                                <VueMultiselect
                                    v-model="valueNecklWnl"
                                    :options="optionsNecklWnl"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Neck Comments</span>
                                <TagsTextarea :tags="tags" fieldName="neckWnl" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Cardiovascular WNL</span>
                                <Field type="checkbox" name="cardiovascularkWnl"/>
                                <label for="cardiovascularkWnl"></label>
                            </label>

                            <label for="">
                                <span>Cardiovascular Abnormal</span>
                                <VueMultiselect
                                    v-model="valueCardiovascularlWnl"
                                    :options="optionsCardiovascularlWnl"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Cardiovascular Comments</span>
                                <TagsTextarea :tags="tags" fieldName="cardiovascularWnl" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Lungs WNL</span>
                                <Field type="checkbox" name="lungskWnl"/>
                                <label for="lungskWnl"></label>
                            </label>

                            <label for="">
                                <span>Lungs Abnormal</span>
                                <VueMultiselect
                                    v-model="valueLungslWnl"
                                    :options="optionsLungslWnl"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Lungs Comments</span>
                                <TagsTextarea :tags="tags" fieldName="lungsWnl" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Abdomen WNL</span>
                                <Field type="checkbox" name="abdomenWnl"/>
                                <label for="abdomenWnl"></label>
                            </label>

                            <label for="">
                                <span>Abdomen Abnormal</span>
                                <VueMultiselect
                                    v-model="valueAbdomenlWnl"
                                    :options="optionsAbdomenlWnl"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Abdomen Comments</span>
                                <TagsTextarea :tags="tags" fieldName="abdomenWnl" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>MSK WNL</span>
                                <Field type="checkbox" name="mskWnl"/>
                                <label for="mskWnl"></label>
                            </label>

                            <label for="">
                                <span>MSK Abnormal</span>
                                <VueMultiselect
                                    v-model="valueMsklWnl"
                                    :options="optionsMsklWnl"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>MSK Comments</span>
                                <TagsTextarea :tags="tags" fieldName="mskWnl" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Neuro WNL</span>
                                <Field type="checkbox" name="neuroWnl"/>
                                <label for="neuroWnl"></label>
                            </label>

                            <label for="">
                                <span>Neuro Abnormal</span>
                                <VueMultiselect
                                    v-model="valueNeurolWnl"
                                    :options="optionsNeurolWnl"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Neuro Comments</span>
                                <TagsTextarea :tags="tags" fieldName="neuroWnl" />
                            </label>
                        </div>

                        <div class="notes-input-wrapper">
                            <label for="">
                                <span>Extremities WNL</span>
                                <Field type="checkbox" name="extremWnl"/>
                                <label for="extremWnl"></label>
                            </label>

                            <label for="">
                                <span>Extrem Abnormal</span>
                                <VueMultiselect
                                    v-model="valueExtremlWnl"
                                    :options="optionsExtremlWnl"
                                    :multiple="true"
                                    :close-on-select="false" 
                                    search="false"
                                    placeholder="Please select at least one option" 
                                    select-label="Select" 
                                    deselect-label="Remove" 
                                    :limit="3" 
                                    select-group-label="Select All" 
                                    deselect-group-label="Clear All" 
                                    >
                                </VueMultiselect>
                            </label>
                        </div>

                        <div class="notes-input-wrapper notes-input-wrapper-sm">
                            <label for="" class="bg-textarea">
                                <span>Extrem Comments</span>
                                <TagsTextarea :tags="tags" fieldName="extremWnl" />
                            </label>
                        </div>

                        <div class="notes-btn-wrapper">
                            <button type="submit" class="w-btn">Save</button>
                        </div>
                    </Form>
                </div>
            </template>

            <template v-slot:tabPanel-3>
                <div class="page-bg notes-wrapper">
                    <tabs class="diet-tabs inner-tablist" :tabList="assessmentTabList">
                        <template v-slot:tabPanel-1>
                            <Form>
                                <div class="notes-input-wrapper">
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div class="notes-btn-wrapper">
                                    <button type="submit" class="w-btn">Save</button>
                                </div>
                            </Form>
                        </template>
                        <template v-slot:tabPanel-2>
                            <Form>
                                <div class="notes-input-wrapper">
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div class="notes-btn-wrapper">
                                    <button type="submit" class="w-btn">Save</button>
                                </div>
                            </Form>
                        </template>
                        <template v-slot:tabPanel-3>
                            <Form>
                                <div class="notes-input-wrapper">
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div class="notes-btn-wrapper">
                                    <button type="submit" class="w-btn">Save</button>
                                </div>
                            </Form>
                        </template>
                        <template v-slot:tabPanel-4>
                            <Form>
                                <div class="notes-input-wrapper">
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div class="notes-btn-wrapper">
                                    <button type="submit" class="w-btn">Save</button>
                                </div>
                            </Form>
                        </template>
                        <template v-slot:tabPanel-5>
                            <Form>
                                <div class="notes-input-wrapper">
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div class="notes-btn-wrapper">
                                    <button type="submit" class="w-btn">Save</button>
                                </div>
                            </Form>
                        </template>
                    </tabs>
                </div>
            </template>

            <template v-slot:tabPanel-4>
                <div class="page-bg notes-wrapper">
                    <tabs class="diet-tabs inner-tablist" :tabList="planTabList">
                        <template v-slot:tabPanel-1>
                            <Form>
                                <div class="notes-input-wrapper">
                                    <label for="">
                                        <span>Lab</span>
                                        <VueMultiselect
                                            v-model="valueLab"
                                            :options="optionsLab"
                                            :multiple="true"
                                            :close-on-select="false" 
                                            search="false"
                                            placeholder="Please select at least one option" 
                                            select-label="Select" 
                                            deselect-label="Remove" 
                                            :limit="3" 
                                            select-group-label="Select All" 
                                            deselect-group-label="Clear All" 
                                            >
                                        </VueMultiselect>
                                    </label>

                                    <label for="" class="bg-textarea">
                                        <span>Labs Comments</span>
                                        <TagsTextarea :tags="tags" fieldName="lab" />
                                    </label>
                                </div>

                                <div class="notes-input-wrapper">
                                    <label for="">
                                        <span>Radiology</span>
                                        <VueMultiselect
                                            v-model="valueRadiology"
                                            :options="optionsRadiology"
                                            :multiple="true"
                                            :close-on-select="false" 
                                            search="false"
                                            placeholder="Please select at least one option" 
                                            select-label="Select" 
                                            deselect-label="Remove" 
                                            :limit="3" 
                                            select-group-label="Select All" 
                                            deselect-group-label="Clear All" 
                                            >
                                        </VueMultiselect>
                                    </label>

                                    <label for="" class="bg-textarea">
                                        <span>Radiology Comments</span>
                                        <TagsTextarea :tags="tags" fieldName="radiology" />
                                    </label>
                                </div>

                                <div class="notes-input-wrapper">
                                    <label for="">
                                        <span>PT Recommendations</span>
                                        <VueMultiselect
                                            v-model="valuePt"
                                            :options="optionsPt"
                                            :multiple="true"
                                            :close-on-select="false" 
                                            search="false"
                                            placeholder="Please select at least one option" 
                                            select-label="Select" 
                                            deselect-label="Remove" 
                                            :limit="3" 
                                            select-group-label="Select All" 
                                            deselect-group-label="Clear All" 
                                            >
                                        </VueMultiselect>
                                    </label>

                                    <label for="" class="bg-textarea">
                                        <span>PT Recommendation Comments</span>
                                        <TagsTextarea :tags="tags" fieldName="pt" />
                                    </label>
                                </div>

                                <div class="notes-input-wrapper">
                                    <label for="">
                                        <span>Home Health</span>
                                        <VueMultiselect
                                            v-model="valueHomeHealth"
                                            :options="optionsHomeHealth"
                                            :multiple="true"
                                            :close-on-select="false" 
                                            search="false"
                                            placeholder="Please select at least one option" 
                                            select-label="Select" 
                                            deselect-label="Remove" 
                                            :limit="3" 
                                            select-group-label="Select All" 
                                            deselect-group-label="Clear All" 
                                            >
                                        </VueMultiselect>
                                    </label>

                                    <label for="" class="bg-textarea">
                                        <span>Home health comments</span>
                                        <TagsTextarea :tags="tags" fieldName="homeHealth" />
                                    </label>
                                </div>

                                <div class="notes-input-wrapper">
                                    <label for="" class="bg-textarea">
                                        <span>Referrals</span>
                                        <TagsTextarea :tags="tags" fieldName="referrals" />
                                    </label>

                                    <label for="" class="bg-textarea">
                                        <span>Referral Comments</span>
                                        <TagsTextarea :tags="tags" fieldName="referralsComments" />
                                    </label>
                                </div>

                                <div class="notes-input-wrapper">
                                    <label for="">
                                        <span>Education</span>
                                        <VueMultiselect
                                            v-model="valueEducation"
                                            :options="optionsEducation"
                                            :multiple="true"
                                            :close-on-select="false" 
                                            search="false"
                                            placeholder="Please select at least one option" 
                                            select-label="Select" 
                                            deselect-label="Remove" 
                                            :limit="3" 
                                            select-group-label="Select All" 
                                            deselect-group-label="Clear All" 
                                            >
                                        </VueMultiselect>
                                    </label>

                                    <label for="" class="bg-textarea">
                                        <span>Education comments</span>
                                        <TagsTextarea :tags="tags" fieldName="education" />
                                    </label>
                                </div>

                                <div class="notes-input-wrapper">
                                    <label for="">
                                        <span>Diet</span>
                                        <VueMultiselect
                                            v-model="valueDiet"
                                            :options="optionsDiet"
                                            :multiple="true"
                                            :close-on-select="false" 
                                            search="false"
                                            placeholder="Please select at least one option" 
                                            select-label="Select" 
                                            deselect-label="Remove" 
                                            :limit="3" 
                                            select-group-label="Select All" 
                                            deselect-group-label="Clear All" 
                                            >
                                        </VueMultiselect>
                                    </label>

                                    <label for="" class="bg-textarea">
                                        <span>Diet Comments</span>
                                        <TagsTextarea :tags="tags" fieldName="psychiatric" />
                                    </label>
                                </div>

                                <div class="notes-input-wrapper">
                                    <label for="">
                                        <span>General Instructions</span>
                                        <VueMultiselect
                                            v-model="valueGenInstructions"
                                            :options="optionsGenInstructions"
                                            :multiple="true"
                                            :close-on-select="false" 
                                            search="false"
                                            placeholder="Please select at least one option" 
                                            select-label="Select" 
                                            deselect-label="Remove" 
                                            :limit="3" 
                                            select-group-label="Select All" 
                                            deselect-group-label="Clear All" 
                                            >
                                        </VueMultiselect>
                                    </label>

                                    <label for="" class="bg-textarea">
                                        <span>General Instruction Comments</span>
                                        <TagsTextarea :tags="tags" fieldName="genInstructions" />
                                    </label>
                                </div>

                                <div class="notes-btn-wrapper">
                                    <button type="submit" class="w-btn">Save</button>
                                </div>
                            </Form>
                        </template>
                        <template v-slot:tabPanel-2>
                            <div>
                                <h3>Manage Lab Orders</h3>
                            </div>
                        </template>
                    </tabs>
                </div>
            </template>

            <template v-slot:tabPanel-5>
                <div class="page-bg notes-wrapper">
                    <tabs class="diet-tabs inner-tablist" :tabList="medTabList">
                        <template v-slot:tabPanel-1>
                            <Form>
                                <div class="notes-input-wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Medication</th>
                                                <th>SIG</th>
                                                <th>Dispense</th>
                                                <th>Refills</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>lorem</td>
                                                <td>ipsum</td>
                                                <td>dolor</td>
                                                <td>sit</td>
                                                <td>amet</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="notes-btn-wrapper">
                                    <button type="submit" class="w-btn">Save</button>
                                </div>
                            </Form>
                        </template>
                        <template v-slot:tabPanel-2>
                            <Form>
                                <div class="notes-input-wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Allergy</th>
                                                <th>Reaction</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>lorem</td>
                                                <td>ipsum</td>
                                                <td>dolor</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="notes-btn-wrapper">
                                    <button type="submit" class="w-btn">Save</button>
                                </div>
                            </Form>
                        </template>
                        <template v-slot:tabPanel-3>
                            <Form>
                                <div class="notes-input-wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Risk</th>
                                                <th>Severity</th>
                                                <th>Drug 1</th>
                                                <th>Drug 2</th>
                                                <th>Interaction Summary</th>		
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>lorem</td>
                                                <td>ipsum</td>
                                                <td>dolor</td>
                                                <td>sit</td>
                                                <td>amet</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="notes-btn-wrapper">
                                    <button type="submit" class="w-btn">Save</button>
                                </div>
                            </Form>
                        </template>
                    </tabs>
                </div>
            </template>

            <template v-slot:tabPanel-6>
                <div class="page-bg notes-wrapper billing-inner">
                    <div class="billing-inner-left">
                        <div class="billing-inner-item">
                            <div class="panel-heading">
                                <span>ICD-9 Codes</span>
                                <input type="text" placeholder="Find Diagnosis codes" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Code</th>
                                        <th colspan="4">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>lorem</td>
                                        <td>ipsum</td>
                                        <td>dolor</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="billing-inner-item">
                            <div class="panel-heading">
                                <span>ICD-10 Codes</span>
                                <input type="text" placeholder="Find Diagnosis codes" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Code</th>
                                        <th colspan="4">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>lorem</td>
                                        <td>ipsum</td>
                                        <td>dolor</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="billing-inner-item">
                            <div class="panel-heading">
                                <span>NDC Codes</span>
                                <input type="text" placeholder="Find NDC codes" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>NDC Code</th>
                                        <th>Quantity</th>
                                        <th>Units</th>
                                        <th>Line Item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>lorem</td>
                                        <td>ipsum</td>
                                        <td>dolor</td>
                                        <td>sit</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="billing-inner-item">
                            <div class="panel-heading">
                                <span>ICD-9 Codes</span>
                                <input type="text" placeholder="Find Custom Procedure codes" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>lorem</td>
                                        <td>ipsum</td>
                                        <td>dolor</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="billing-inner-right">
                        <div class="billing-inner-item">
                            <div class="panel-heading">
                                <span>CPT Codes</span>
                                <input type="text" placeholder="Find CPT Procedure codes" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>lorem</td>
                                        <td>ipsum</td>
                                        <td>dolor</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="billing-inner-item">
                            <div class="panel-heading">
                                <span>HCPCS Codes</span>
                                <input type="text" placeholder="Find HCPCS Procedure codes" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true">
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>lorem</td>
                                        <td>ipsum</td>
                                        <td>dolor</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </template>
        </tabs>
    </div>
</template>

<style>
    .notes-input-wrapper {
        width: 100%;
        margin-bottom: 16px;
        padding-bottom: 16px;
        display: flex;
        justify-content: space-between;
        gap: 32px;
        border-bottom: 1px solid #E1E1E1;
    }

    .notes-input-wrapper:last-child {
        border: none;
    }

    .notes-input-inner {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 16px;
    }

    .notes-input-wrapper .notes-input-inner textarea {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding: 8px 12px;
        border-radius: 10px;
        color: #000000;
        outline: none;
        border: 1px solid #E7E7E7;
    }

    .notes-input-wrapper.notes-input-wrapper-sm textarea {
        max-width: calc(50% - 16px);
    }

    .notes-input-wrapper label {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .notes-input-wrapper label span {
        margin-bottom: 4px;
        font-size: 14px;
        font-weight: 500;
    }

    .notes-input-wrapper label input {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding: 8px 12px;
        border-radius: 10px;
        color: #000000;
        outline: none;
        border: 1px solid #E7E7E7;
    }

    .notes-input-wrapper label textarea {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding: 8px 12px;
        color: #000000;
        outline: none;
        resize: none;
        border: 1px solid #E7E7E7;
        border-radius: 10px;
    }

    .notes-input-wrapper .bg-textarea textarea {
        height: 165px;
    }

    .notes-input-wrapper.notes-health-input {
        padding: 0;
        border: none;
    }

    .notes-height-wrapper {
        width: 100%;
    }

    .notes-height-wrapper > label {
        margin-bottom: 4px;
        font-size: 14px;
        font-weight: 500;
    }

    .notes-height-input {
        display: flex;
        gap: 16px;
    }

    .notes-height-input input {
        background-color: #FFFFFF;
        width: 100%;
        height: 56px;
        padding-left: 22px;
        border-radius: 10px;
        color: #000000;
        outline: none;
        border: 1px solid #E7E7E7;
    }

    .notes-height-input > label {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }

    .notes-height-input > label span {
        margin: 0 0 0 4px;
    }

    .notes-wrapper .w-btn {
        min-width: auto;
        margin-top: 32px;
        margin-left: auto;
        padding: 16px 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
    }

    .notes-health-btn {
        background-color: var(--primary);
        margin-bottom: 8px;
        padding: 8px 16px;
        font-size: 16px;
        color: #FFFFFF;
        border-radius: 16px;
    }

    .notes-btn-wrapper {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
    }

    .notes-wrapper .notes-btn-wrapper .w-btn {
        margin-left: 0;
    }

    .notes-wrapper .attach-icon {
        padding-left: 16px;
        box-sizing: content-box;
    }

    .notes-wrapper .attach-icon path {
        fill: var(--main-color);
    }

    input[type=checkbox] {
        width: 0!important;
        height: 0!important;
        visibility: hidden;
    }

    input[type=checkbox] + label {
        background-color: #8E8E8E;
        width: 80px;
        height: 42px;
        display: block;
        position: relative;
        cursor: pointer;
        text-indent: -99px;
        border-radius: 100px;
    }

    input[type=checkbox] + label:after {
        content: "";
        background-color: #FFFFFF;
        width: 32px;
        height: 32px;
        position: absolute;
        top: 5px;
        left: 5px;
        border-radius: 50%;
        transition: 0.3s;
    }

    input[type=checkbox]:checked + label {
        background-color: #74C973;
    }

    input[type=checkbox]:checked + label:after {
        left: calc(100% - 5px);
        transform: translateX(-100%);
    }

    input[type=checkbox] + label:active:after {
        width: 32px;
    }

    .notes-input-wrapper .multiselect__tags input {
        border: none;
    }

    .notes-input-wrapper textarea {
        width: 100%;
        padding: 8px 16px;
        font-size: 18px;
        border: 1px solid #E1E1E1;
        border-radius: 16px;
        outline: 1px solid #E1E1E1;
        resize: none;
    }

    .notes-input-wrapper table {
        background-color: #F4F4FF;
        width: 100%;
        border-collapse: separate;
    }

    .notes-input-wrapper table, 
    .notes-input-wrapper th, 
    .notes-input-wrapper td {
        border: 1px solid #E1E1E1;
        border-collapse: collapse;
    }

    .notes-input-wrapper th, 
    .notes-input-wrapper td {
        padding: 8px 16px;
    }

    .page-bg.notes-wrapper.billing-inner {
        display: grid;
        grid-template-columns: 50fr 50fr;
        gap: 0 32px;
    }

    .billing-inner-item {
        background-color: #F4F4FF;
        margin-bottom: 8px;
        padding: 8px;
        border: 1px solid #E1E1E1;
        border-radius: 16px;
    }

    .billing-inner-item .panel-heading {
        width: 100%;
        margin-bottom: 8px;
        padding: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E1E1E1;
    }

    .billing-inner-item .panel-heading span {
        width: 100%;
        font-size: 18px;
        font-weight: 500;
    }

    .billing-inner-item .panel-heading input {
        width: 100%;
        padding: 4px 8px;
        border: 1px solid #E1E1E1;
        border-radius: 6px;
    }

    .billing-inner-item table {
        width: 100%;
    }
</style>