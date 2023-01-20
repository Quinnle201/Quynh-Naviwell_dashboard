<script>
    export default {
        
            methods: {
            close() {
                this.$emit('close');
            },
        },
    };
</script>

<template>
    <Transition>
        <div class="addpatient-wrapper">
            <div class="addpatient-head">
                <h4>Create New Patient</h4>
                <div>
                    <button type="button" class="w-btn w-btn-save">Save</button>
                    <button type="button" class="w-btn w-btn-close" @click="close">Cancel</button>
                </div>
            </div>

            <div class="add-patient-inner">
                <div class="add-patient-card">
                    <div class="add-patient-card-title">General Information</div>

                    <div class="addpatient-card-content">
                        <ul>
                            <li>
                                <label>First Name *</label>
                                <input type="text" />
                            </li>
                            <li>
                                <label>Last Name *</label>
                                <input type="text" />
                            </li>
                            <li>
                                <label>DOB</label>
                                <input type="text" />
                            </li>
                            <li>
                                <label>Gender</label>
                                <input type="text" />
                            </li>
                            <li>
                                <label>Race</label>
                                <input type="text" />
                            </li>
                            <li>
                                <label>Ethnicity</label>
                                <input type="text" />
                            </li>
                            <li>
                                <label>Sexual Orientation</label>
                                <input type="text" />
                            </li>
                            <li>
                                <label>Language</label>
                                <input type="text" />
                            </li>
                            <li>
                                <label>Religion</label>
                                <input type="text" />
                            </li>
                            <li>
                                <!-- <label for="textarea">Notes</label> -->
                                <textarea id="textarea" placeholder="Notes"></textarea>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="add-patient-card">
                    <div class="add-patient-card-title">Contact Information</div>

                    <div class="addpatient-card-content">
                        <ul>
                            <li class="fullw-input">
                                <label>Street Address</label>
                                <input type="text" />
                            </li>
                            <li class="fullw-input">
                                <label>Street Address cont’d</label>
                                <input type="text" />
                            </li>
                            <li class="fullw-input">
                                <label>City, State</label>
                                <input type="text" />
                            </li>
                            <li class="fullw-input">
                                <label>Zip Code</label>
                                <input type="text" />
                            </li>
                            <li>
                                <label>Email *</label>
                                <input type="text" />
                            </li>
                            <li>
                                <label>Phone *</label>
                                <input type="text" />
                            </li>
                        </ul>

                        <div class="addpatient-card-content">
                            <div class="add-patient-card-title">Emergency Contact Information</div>

                            <ul>
                                <li class="fullw-input">
                                    <label>Emergency Contact Name</label>
                                    <input type="text" />
                                </li>
                                <li class="fullw-input">
                                    <label>Phone Number</label>
                                    <input type="text" />
                                </li>
                                <li class="fullw-input">
                                    <label>Relation to patient</label>
                                    <input type="text" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="addpatient-card-two">
                    <div class="add-patient-card">
                        <div class="add-patient-card-title">Insurance Provider</div>

                        <div class="addpatient-card-content">
                            <ul>
                                <li class="fullw-input">
                                    <label>Insurance Company</label>
                                    <input type="text" />
                                </li>
                                <li class="fullw-input">
                                    <label>Subscriber/Member Number</label>
                                    <input type="text" />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="add-patient-card">
                        <div class="add-patient-card-title">Patient Information</div>

                        <div class="addpatient-card-content">
                            <ul>
                                <li>
                                    <label>Weight</label>
                                    <input type="text" />
                                </li>
                                <li>
                                    <label>Height</label>
                                    <input type="text" />
                                </li>
                                <li>
                                    <label>BMI</label>
                                    <input type="text" />
                                </li>
                                <li>
                                    <label>Allergies</label>
                                    <input type="text" />
                                </li>
                            </ul>

                            <div class="addpatient-card-content-title">Current Medications and Supplements</div>

                            <div class="medication-block">
                                <ul>
                                    <li class="fullw-input">
                                        <input type="text" placeholder="Medication Name, Dosage, Frequency" />
                                    </li>
                                    <li class="fullw-input">
                                        <input type="text" placeholder="Medication Name, Dosage, Frequency" />
                                    </li>
                                    <li class="fullw-input">
                                        <input type="text" placeholder="Medication Name, Dosage, Frequency" />
                                    </li>
                                </ul>

                                <button>Add Medication or Supplement</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.4s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .addpatient-wrapper {
        background-color: #FFFFFF;
        width: 100%;
        height: 100%;
        padding: 28px 32px;
        position: absolute;
        top: 0;
    }

    .addpatient-head {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
    }

    .addpatient-head h4 {
        font-size: 24px;
        font-weight: 400;
        line-height: 24px;
        color: #000000;
    }

    .addpatient-head button.w-btn.w-btn-save {
        margin-right: 36px;
    }

    .add-patient-inner {
        height: 98%;
        padding-bottom: 30px;
        display: grid;
        grid-template-columns: 35fr 30fr 35fr;
        gap: 26px;
    }

    .add-patient-card {
        background-color: #FFFEFE;
        padding: 0 30px 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 16px;
        box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
    }

    .addpatient-card-two .add-patient-card:first-child {
        margin-bottom: 26px;
    }

    .add-patient-card-title {
        margin-top: 24px;
        margin-bottom: 18px;
        font-size: 20px;
        font-weight: 400;
        line-height: 20px;
        color: #000000;
        text-align: center;
    }

    .addpatient-card-content ul {
        list-style: none;
    }

    .addpatient-card-content ul li {
        margin-bottom: 16px;
        display: grid;
        grid-template-columns: 30fr 70fr;
        align-items: center;
        gap: 26px;
    }

    .addpatient-card-content ul li:last-child {
        margin-bottom: 0;
    }

    .addpatient-card-content ul li.fullw-input {
        grid-template-columns: 1fr;
        gap: 0;
        text-align: center;
    }

    .addpatient-card-content ul li.fullw-input label {
        margin-bottom: 3px;
    }

    .addpatient-card-content ul li label {
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
        color: #000000;
        white-space: nowrap;
    }

    .addpatient-card-content ul li input, 
    .addpatient-card-content ul li textarea {
        background-color: #F4F4FF;
        width: 100%;
        padding-left: 22px;
        border-radius: 10px;
        color: #000000;
        outline: none;
        border: none;
    }

    .addpatient-card-content ul li input {
        height: 40px;
    }

    .addpatient-card-content ul li textarea {
        height: 100%;
        grid-row: span 6;
        grid-column: span 2;
        padding-top: 16px;
        resize: none;
    }

    .addpatient-card-content ul li textarea::placeholder {
        color: #000000;
    }

    .addpatient-card-content-title {
        margin: 8px 0;
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
        color: #000000;
        text-align: center;
    }

    .addpatient-card-content .medication-block {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .addpatient-card-content .medication-block ul {
        width: 100%;
        height: 180px;
        overflow-y: auto;
    }

    .addpatient-card-content .medication-block ul::-webkit-scrollbar {
        width: 8px;
    }

    .addpatient-card-content .medication-block ul::-webkit-scrollbar-track {
        background-color: #E7E7E7;
        border-radius: 8px;
    }

    .addpatient-card-content .medication-block ul::-webkit-scrollbar-thumb {
        background-color: #5C90F1;
        border-radius: 8px;
    }
    

    .addpatient-card-content .medication-block button {
        margin-top: 4px;
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        color: #0258BC;
    }
</style>