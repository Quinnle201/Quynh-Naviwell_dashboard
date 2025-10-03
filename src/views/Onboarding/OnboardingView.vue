<script>
import Header from "@/components/Dashboard/Layout/Header.vue";
import { Form, Field, FieldArray } from "vee-validate";

import DateInput from "@/components/DateInput.vue";
import AddIcon from "@/components/icons/IconAdd.vue";
import RemoveIcon from "@/components/icons/IconRemoveCircle.vue";
import CheckmarkIcon from "@/components/icons/IconCheckmark.vue";

import { axiosInstance } from "@/helpers";
import {
  useAlertStore,
  useAuthStore,
  useProgrammaticAccesStore,
} from "@/stores";
import VueMultiselect from "vue-multiselect";

export default {
  components: {
    Header,
    Form,
    Field,
    FieldArray,
    VueMultiselect,
    DateInput,
    AddIcon,
    RemoveIcon,
    CheckmarkIcon,
  },
  data() {
    const alertStore = useAlertStore();
    const authStore = useAuthStore();
    const progAccess = useProgrammaticAccesStore();
    return {
      alertStore,
      authStore,
      progAccess,
      emergencyContactShown: false,
      screen: 0,
      dobError: false,
      genderError: false,
      phoneError: false,
      genderValues: [
        {
          value: "m",
          label: "Male",
        },
        {
          value: "f",
          label: "Female",
        },
      ],
      medCodes: [],
      famHx: [],
      selectedFamHx: [],
      medConditions: [],
      selectedMedConditions: [],
      ptData: {
        drugs: [
          { type: "", amount: null },
          { type: "", amount: null },
        ],
      },
    };
  },
  computed: {
    progressClass() {
      return (index) => {
        var progressClass = [];
        if (this.screen == index) {
          progressClass.push("active");
        }
        if (this.screen > index) {
          progressClass.push("complete");
        }

        return progressClass.join(" ");
      };
    },
    patientId() {
      return this.authStore.user.profile_id;
    },
  },
  methods: {
    toggleEmergency() {
      this.emergencyContactShown = !this.emergencyContactShown;
    },
    getFamilyHistory() {
      axiosInstance
        .get("/family-history")
        .then((response) => {
          this.famHx = response.data.map((i) => ({
            label: i.name,
            value: i.id,
          }));
        })
        .catch((error) => {
          console.log(error);
          this.alertStore.error(error.response.data.message);
        });
    },
    getMedConditions() {
      axiosInstance
        .get("/medical-conditions")
        .then((response) => {
          this.medConditions = response.data.map((i) => ({
            label: i.name,
            value: i.id,
          }));
        })
        .catch((error) => {
          console.log(error);
          this.alertStore.error(error.response.data.message);
        });
    },
    getMedine() {
      axiosInstance
        .get("/medicine")
        .then((response) => {
          this.medCodes = response.data.map((i) => ({
            label: i.name,
            value: i.id,
          }));
        })
        .catch((error) => {
          console.log(error);
          this.alertStore.error(error.response.data.message);
        });
    },
    onSubmit(values) {
      this.$refs.dateInput.isError = false;
      this.genderError = false;
      this.phoneError = false;
      console.log("submitting data", values);
      if (!values.profile.dob) {
        this.$refs.dateInput.isError = true;
        this.alertStore.error("Date of birth is required!");
        this.screen = 0;
        return;
      }
      if (!values.profile.gender) {
        this.genderError = true;
        this.alertStore.error("Your gender is required!");
        this.screen = 0;
        return;
      }
      if (!values.user.phone) {
        this.phoneError = true;
        this.alertStore.error("Phone is required!");
        this.screen = 1;
        return;
      }

      const medications = values.drugs.filter((drug) => drug.type);
      const keysAndValues = medications.map((med) => {
        let amount = parseInt(med.amount, 10);
        let type = med.type;
        if (Number.isNaN(amount)) {
          amount = 0;
        }
        return { type, amount };
      });
      const uniqueMedValues = keysAndValues.reduce(function (res, value) {
        if (!res[value.type]) {
          res[value.type] = 0;
        }
        res[value.type] += value.amount;
        return res;
      }, {});
      let medicine = [];
      Object.keys(uniqueMedValues).forEach(function (key, index) {
        medicine.push(`${key}: ${uniqueMedValues[key]}`);
      });

      values.meds = medicine;

      axiosInstance
        .put(`/patients/${this.patientId}`, values)
        .then(async (response) => {
          try {
            //sync famHx and medConditions
            await axiosInstance.post(`/patients/${this.patientId}/history`, {
              id: this.selectedFamHx.map((item) => item.value),
            });
            await axiosInstance.post(`/patients/${this.patientId}/condition`, {
              id: this.selectedMedConditions.map((item) => item.value),
            });
          } catch (error) {
            this.alertStore.error(
              "Syncing profile data failed. Please report to administrator"
            );
            console.log(error);
          }
          this.progAccess.setAccessPage("get-started");
        })
        .catch((error) => {
          console.log(error);
          this.alertStore.error(error.response.data.message);
        });
    },
  },
  mounted() {
    this.getFamilyHistory();
    this.getMedConditions();
    this.getMedine();
  },
};
</script>
<template>
  <Header />
  <div class="welcome-wrapper">
    <div class="quiz-progressbar">
      <ul>
        <li :class="progressClass(0)" @click="screen = 0">About you</li>
        <li class="quiz-progressbar-separator">
          <CheckmarkIcon />
        </li>
        <li :class="progressClass(1)" @click="screen = 1">
          Contact information
        </li>
        <li class="quiz-progressbar-separator">
          <CheckmarkIcon />
        </li>
        <li :class="progressClass(2)" @click="screen = 2">Health</li>
      </ul>
    </div>

    <div class="welcome-inner">
      <div class="welcome-heading">
        <h4>Before we start</h4>
        <h6>Fill out questions</h6>
      </div>

      <Form class="info-form" @submit="onSubmit" :initial-values="ptData">
        <div v-show="screen == 0" class="info-form-inner">
          <div class="info-form-inner-item">
            <label class="info-form-label">
              Date of birth <span class="required">*</span>
              <div :class="$options.name">
                <date-input fieldName="profile.dob" ref="dateInput" />
              </div>
            </label>
            <label class="info-form-item">
              Gender
              <Field
                as="select"
                name="profile.gender"
                :class="genderError ? 'info-form-item-error' : ''"
                @change="genderError = false"
              >
                <option value="" disabled>Select your gender</option>
                <option v-for="gender in genderValues" :value="gender.value">
                  {{ gender.label }}
                </option>
              </Field>
            </label>
            <label class="info-form-item">
              Ethnicity
              <Field
                placeholder="Enter your ethnicity group"
                name="profile.ethnicity"
              ></Field>
            </label>
            <label class="info-form-item">
              Spoken Languages
              <Field
                placeholder="Enter languages that you speak"
                name="profile.language"
              ></Field>
            </label>
          </div>

          <div class="info-form-button" @click="screen = 1">Next</div>
        </div>

        <div v-show="screen == 1" class="info-form-inner">
          <div class="info-form-inner-item">
            <label
              class="info-form-item"
              :class="phoneError ? 'info-form-item-error' : ''"
            >
              Phone number <span class="required">*</span>
              <Field name="user.phone" v-slot="{ field }">
                <input
                  v-bind="field"
                  v-mask="'(###) ###-####'"
                  placeholder="(123) 456-7890"
                  type="tel"
                  @input="phoneError = false"
                />
              </Field>
            </label>
            <label class="info-form-item">
              Street address
              <Field
                placeholder="Street address"
                type="text"
                name="contact.address"
              />
            </label>
            <div class="info-form-item-wrapper">
              <label class="info-form-item">
                City
                <Field placeholder="City" type="text" name="contact.city" />
              </label>
              <label class="info-form-item">
                Zip code
                <Field placeholder="ZIP code" type="text" name="contact.zip" />
              </label>
            </div>

            <div class="info-form-add-btn" @click="toggleEmergency()">
              <AddIcon v-if="!emergencyContactShown" />
              <RemoveIcon v-else width="35" height="35" />
              {{
                emergencyContactShown
                  ? "Remove emergency contact info"
                  : "Add emergency contact info"
              }}
            </div>
            <Transition>
              <div class="info-form-emerg" v-show="emergencyContactShown">
                <label class="info-form-item">
                  Name
                  <Field type="text" name="emergency.contact" />
                </label>
                <label class="info-form-item">
                  Relationship
                  <Field type="text" name="emergency.relationship" />
                </label>
                <label class="info-form-item">
                  Phone number
                  <Field type="number" name="emergency.phone" />
                </label>
              </div>
            </Transition>
          </div>

          <div class="info-form-button" @click="screen = 2">Next</div>
        </div>

        <div v-show="screen == 2" class="info-form-inner">
          <div class="info-form-inner-item">
            <label class="info-form-item">
              Family history
              <VueMultiselect
                v-model="selectedFamHx"
                :options="famHx"
                :multiple="true"
                :close-on-select="false"
                track-by="value"
                label="label"
                search="false"
                placeholder="Family history"
                select-label="Select"
                :allow-empty="false"
                deselect-label="Remove"
              >
              </VueMultiselect>
            </label>
            <label class="info-form-item">
              Health conditions
              <VueMultiselect
                v-model="selectedMedConditions"
                :options="medConditions"
                :multiple="true"
                :close-on-select="false"
                track-by="value"
                label="label"
                search="false"
                placeholder="Health conditions"
                select-label="Select"
                :allow-empty="false"
                deselect-label="Remove"
              >
              </VueMultiselect>
            </label>
            <label class="info-form-item">
              Number of active physicians
              <Field placeholder="0" type="number" name="profile.physicians" />
            </label>

            <FieldArray name="drugs" v-slot="{ fields, push, remove }">
              <fieldset v-for="(field, index) in fields" :key="field.key">
                <div class="info-form-item-wrapper">
                  <label class="info-form-item">
                    Drug Class
                    <Field as="select" :name="`drugs[${index}].type`">
                      <option value="" disabled>Pick one</option>
                      <option v-for="code in medCodes" :value="code.value">
                        {{ code.label }}
                      </option>
                    </Field>
                  </label>
                  <label class="info-form-item">
                    Number of Medications
                    <Field
                      type="number"
                      :name="`drugs[${index}].amount`"
                      placeholder="0"
                    />
                  </label>
                  <div
                    class="info-form-add-btn"
                    v-if="fields.length > 1"
                    @click="remove(index)"
                  >
                    <RemoveIcon width="35" height="35" />
                  </div>
                </div>
              </fieldset>
              <div
                class="info-form-add-btn"
                v-if="fields.length < 15"
                @click="push({ type: '', amount: null })"
              >
                <AddIcon />
                Add Medicine
              </div>
            </FieldArray>
          </div>

          <button type="submit">Next</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.welcome-wrapper {
  background-color: #f4f4ff;
  height: 100vh;
  margin: -64px -1.2rem 0 -8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quiz-progressbar {
  background-color: #ffffff;
  max-width: 40%;
  width: 100%;
  height: auto;
  margin: 0 auto 16px;
  padding: 8px 16px;
  border-radius: 16px;
  z-index: 1999;
}

.quiz-progressbar ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}

.quiz-progressbar ul li {
  flex: 0 0 14%;
  font-size: 16px;
  font-weight: 500;
  color: #cccccc;
  white-space: nowrap;
}

.quiz-progressbar ul li:nth-child(1) {
  padding-right: 16px;
  text-align: right;
}

.quiz-progressbar ul li:nth-child(3) {
  padding: 0 16px;
  text-align: center;
}

.quiz-progressbar ul li:nth-child(5) {
  padding-left: 16px;
  text-align: left;
}

.quiz-progressbar ul li.quiz-progressbar-separator {
  background-color: #cccccc;
  min-width: auto;
  width: 100%;
  height: 1px;
  margin: 0 8px;
}

.quiz-progressbar ul li.quiz-progressbar-separator svg {
  background-color: #ffffff;
  width: 28px;
  height: 28px;
  padding: 0 8px;
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.quiz-progressbar ul li.complete {
  color: #74c973;
}

.quiz-progressbar ul li.complete + li.quiz-progressbar-separator {
  background-color: #cceed0;
}

.quiz-progressbar ul li.complete + li.quiz-progressbar-separator svg {
  display: block;
}

.quiz-progressbar ul li.active {
  font-size: 18px;
  color: var(--main-color);
}

.quiz-progressbar ul li.active + li.quiz-progressbar-separator {
  background-color: var(--main-color);
  opacity: 0.4;
}

.welcome-sidebar ul {
  list-style: none;
}

.welcome-sidebar ul li {
  margin-bottom: 16px;
  font-size: 18px;
}

.welcome-inner {
  background-color: rgba(255, 255, 255, 0.8);
  max-width: 40%;
  width: 100%;
  height: 78vh;
  margin: 0 auto;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
}

.welcome-heading {
  text-align: center;
}

.welcome-heading h6 {
  color: var(--primary);
}

.welcome-progress {
  width: 100%;
  margin: 16px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}

.welcome-progress li {
  max-width: 30%;
  flex: 0 0 30%;
  display: flex;
  align-items: center;
  padding-top: 8px;
  font-size: 16px;
  font-weight: 500;
  border-top: 4px solid #dbdbdb;
  cursor: pointer;
}

.welcome-progress li span {
  background-color: #dbdbdb;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: block;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 26px;
  border-radius: 50%;
}

.welcome-progress li svg {
  width: 0;
  height: 0;
  display: none;
  opacity: 0;
  position: absolute;
  left: 6px;
}

.welcome-progress li.active {
  border-top-color: var(--primary);
}

.welcome-progress li.active span {
  background-color: var(--primary);
}

.welcome-progress li.complete {
  border-top-color: #74c973;
  color: #74c973;
}

.welcome-progress li.complete svg {
  width: 12px;
  height: 14px;
  display: block;
  opacity: 1;
}

.welcome-progress li.complete span {
  background-color: #cceed0;
  font-size: 0;
}

.info-form {
  width: 100%;
  height: 100%;
  margin: 16px auto 0;
  overflow-x: auto;
  overflow-y: hidden;
}

.info-form-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.info-form-inner-item {
  max-width: calc(75% + 24px);
  width: 100%;
  margin-left: 24px;
  padding-right: 24px;
  overflow-y: auto;
  overflow-x: hidden;
}

.info-form-inner-item::-webkit-scrollbar {
  width: 8px;
  height: 16px;
}

.info-form-inner-item::-webkit-scrollbar-track {
  background-color: #dbdbdb;
  border-radius: 8px;
}

.info-form-inner-item::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 8px;
  background-clip: padding-box;
}

.info-form-label {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
}

.info-form .info-form-item {
  width: 100%;
  font-size: 16px;
  font-weight: 500;
}

.info-form .info-form-item input,
.info-form .info-form-item select {
  background-color: #fffefe;
  width: 100%;
  height: 50px;
  min-height: 50px;
  margin-bottom: 16px;
  padding: 4px 10px;
  display: block;
  font-size: 16px;
  border: 1px solid #cccccc;
  border-radius: 16px;
  outline: none;
  transition: 0.3s ease;
}

.info-form-item-error {
  border: 1px solid red !important;
}

.info-form .info-form-item input::placeholder {
  font-size: 16px;
  color: var(--text-color);
}

.info-form .info-form-item select {
  background-image: url(/src/assets/img/select-icon.svg);
  background-repeat: no-repeat;
  background-position: top 50% left 96%;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: var(--text-color);
}

.info-form .info-form-item-wrapper {
  display: flex;
  justify-content: space-between;
}

.info-form .info-form-item-wrapper .info-form-item {
  max-width: 48%;
}

.info-form-button,
.info-form button {
  background-color: var(--primary);
  max-width: 75%;
  width: 100%;
  height: 56px;
  margin-top: 32px;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  line-height: 56px;
  border-radius: 16px;
  cursor: pointer;
}

.info-form-add-btn {
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.info-form-item-wrapper .info-form-add-btn {
  position: absolute;
  top: -10px;
  right: 0;
}

.info-form-item-wrapper .info-form-add-btn svg {
  widows: 33px;
  height: 33px;
  margin-right: 0;
}

.info-form-add-btn svg {
  margin-right: 8px;
}

@media (hover: hover) and (pointer: fine) {
  .info-form .info-form-item input:focus,
  .info-form .info-form-item select:focus {
    border: 1px solid var(--primary);
    box-shadow: 2px 3px 6px rgba(204, 204, 204, 0.2);
  }
}

@media screen and (max-width: 1440px) {
  .welcome-wrapper {
    margin-top: -2rem;
  }

  .quiz-progressbar,
  .welcome-inner {
    max-width: 60%;
  }

  .quiz-progressbar ul li:nth-child(1) {
    padding-right: 8px;
  }

  .quiz-progressbar ul li:nth-child(3) {
    padding: 0 8px;
  }

  .quiz-progressbar ul li:nth-child(5) {
    padding-left: 8px;
  }
}

@media screen and (max-width: 1199px) {
  .quiz-progressbar,
  .welcome-inner {
    max-width: 80%;
  }
}

@media screen and (max-width: 768px) {
  .quiz-progressbar ul li {
    font-size: 14px;
  }

  .quiz-progressbar ul li.active {
    font-size: 16px;
  }

  .quiz-progressbar ul li.quiz-progressbar-separator {
    flex: 0 0 8%;
  }

  .quiz-progressbar ul li:nth-child(1),
  .quiz-progressbar ul li:nth-child(3),
  .quiz-progressbar ul li:nth-child(5) {
    padding: 0;
  }

  .welcome-inner {
    padding: 16px 24px;
  }

  .welcome-heading h4 {
    font-size: 20px;
  }

  .welcome-heading h6 {
    font-size: 14px;
  }

  .info-form-inner-item {
    max-width: 90%;
    margin-left: 8px;
    padding-right: 8px;
  }

  .info-form-inner-item::-webkit-scrollbar {
    width: 4px;
  }

  .info-form-label {
    margin-bottom: 8px;
    font-size: 14px;
  }

  .info-form .info-form-item {
    font-size: 14px;
  }

  .info-form .info-form-item input,
  .info-form .info-form-item select {
    font-size: 14px;
  }

  .info-form .info-form-item input::placeholder {
    font-size: 14px;
  }

  .info-form-button,
  .info-form button {
    max-width: 90%;
    margin-top: 16px;
    font-size: 16px;
  }

  .info-form-add-btn {
    font-size: 14px;
  }
}

@media screen and (max-width: 576px) {
  .quiz-progressbar,
  .welcome-inner {
    max-width: 90%;
  }
}

@media screen and (max-width: 375px) {
  .quiz-progressbar ul li {
    font-size: 12px;
  }

  .quiz-progressbar ul li.active {
    font-size: 14px;
  }

  .quiz-progressbar ul li.quiz-progressbar-separator {
    flex: 0 0 6%;
  }

  .welcome-heading h4 {
    font-size: 18px;
    margin-bottom: 4px;
  }

  .welcome-inner {
    padding: 16px 12px;
  }
}
</style>

<style>
.info-form-item .multiselect__tags {
  background-color: #fffefe;
  width: 100%;
  min-height: 50px;
  padding: 4px 10px;
  display: block;
  border: 1px solid #cccccc;
  border-radius: 16px;
}

.info-form-item .multiselect {
  margin-bottom: 16px;
}

.info-form-item .multiselect--active.multiselect {
  margin-bottom: 0;
}

.info-form-item .multiselect__placeholder {
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 400;
  color: var(--text-color);
  line-height: 36px;
}

.info-form-item .multiselect--active.multiselect .multiselect__input {
  font-size: 12px;
}

.info-form-item .multiselect--active.multiselect .multiselect__tags {
  border-color: var(--primary);
}

.info-form-item .multiselect__content-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 16px;
}

.info-form-item .multiselect__content-wrapper::-webkit-scrollbar-track {
  background-color: #dbdbdb;
  border-radius: 8px;
}

.info-form-item .multiselect__content-wrapper::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 8px;
  background-clip: padding-box;
}

.info-form-item .multiselect__content-wrapper {
  max-height: 250px !important;
}

.info-form-item .multiselect--active.multiselect .multiselect__content-wrapper {
  border-color: var(--primary);
}

@media screen and (max-width: 768px) {
  .info-form-item .multiselect__placeholder {
    font-size: 14px;
  }
}
.required {
  color: red;
  margin-left: 4px;
}
.error {
  color: red;
  font-size: 0.85em;
  margin-top: 2px;
}
</style>
