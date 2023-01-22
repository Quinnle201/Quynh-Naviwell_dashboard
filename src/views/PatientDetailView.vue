<script>
import ChatIcon from '../components/icons/IconChat.vue'
import VideoIcon from '../components/icons/IconVideo.vue'
import MessagesIcon from '../components/icons/IconMessages.vue'
import CalendarIcon from '../components/icons/IconCalendar.vue'
import RoundBtn from '../components/Dashboard/Layout/RoundBtn.vue'
import LineChart from '../components/Dashboard/Layout/LineChart.vue'

export default {
    components: {
        ChatIcon,
        VideoIcon,
        MessagesIcon,
        CalendarIcon,
        RoundBtn,
        LineChart
    },
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <div  class="layout-wrapper-nav">
                <h3>My Patients</h3>
                <div class="pagination-wrapper">
                    <ul>
                        <li>></li>
                        <li>Howard Aarons</li>
                    </ul>
                </div>
            </div>

            <div class="patient-btns">
                <button type="button" class="w-btn">Edit Patient Info</button>
                <button type="button" class="w-btn w-btn-delete">Delete Patient</button>
                <a href="/patients">Return to My Patients</a>
            </div>
        </div>
        
        <div class="patients-wrapper">
            <div class="patient-top">
                <div class="patient-profile-left light-bg">
                    <div class="patient-profile-left-info">
                        <img src="@/assets/img/image.png" alt="">
                        <div>
                            <h6>Howard Aarons</h6>
                            <span>howardaarons@gmail.com</span>
                        </div>
                    </div>

                    <div class="patient-profile-left-btn">
                        <RoundBtn>
                            <template #btn-icon>
                                <ChatIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Chat</template>
                        </RoundBtn>
                        <RoundBtn>
                            <template #btn-icon>
                                <VideoIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Video</template>
                        </RoundBtn>
                        <RoundBtn>
                            <template #btn-icon>
                                <MessagesIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Email</template>
                        </RoundBtn>
                        <RoundBtn>
                            <template #btn-icon>
                                <CalendarIcon width="30" height="30" />
                            </template>
                            <template #btn-name>Schedule</template>
                        </RoundBtn>
                    </div>
                </div>
                <div class="patient-profile-right light-bg">
                    <h4 class="patient-heading">Next Appointment Scheduled</h4>
                    <span>January 22, 2022  at  10:00 AM</span>
                    <button>Open in Calendar</button>
                </div>
            </div>

            <div class="patient-info light-bg">
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Date of Birth</div>
                    <div>02/09/1986</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Age</div>
                    <div>36</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Marital Status</div>
                    <div>Married</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Race</div>
                    <div>African-American</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Sexual Orientation</div>
                    <div>Heterosexual</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Social Security Number</div>
                    <div>000-01-001</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Phone Number</div>
                    <div>(972)011-0111</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Gender</div>
                    <div>Male</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Ethnicity</div>
                    <div>Hispanic</div>
                </div>
                <div class="patient-info-item">
                    <div class="patient-info-item-label">Patient Since</div>
                    <div>06/05/2021</div>
                </div>
            </div>

            <div class="patient-grid">
                <div class="light-bg patient-card border-cntr">
                    <h4 class="patient-heading">Quizzes and Questionnaires</h4>

                    <div class="patient-status">
                        <div class="patient-status-item">
                            <div class="patient-status-item-date">
                                <div>Quiz Assigned:</div>
                                <div>11/08/2022</div>  
                            </div>
                            
                            <div class="label-status incomplete">Incomplete</div>
                            <div class="patient-status-item-btn">Send Email or Text Reminder</div>
                            <div class="patient-status-item-btn">View Quiz Report</div>
                        </div>

                        <div class="patient-status-item">
                            <div class="patient-status-item-date">
                                <div>Quarterly Questionnaire Assigned:</div>
                                <div>11/08/2022</div>
                            </div>
                            
                            <div class="label-status complete">Complete</div>

                            <div class="patient-status-item-duration">
                                <div>Completed <span>11/11/2022</span></div>
                                <div>Duration: <span>Approximately 26 minutes</span></div>
                            </div>
                            
                            <div class="patient-status-item-btn">View Questionnaire Report</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="patient-lab light-bg patient-card">
                        <h4 class="patient-heading">Lab Results & Suggested ing</h4>

                        <ul>
                            <li>
                                Sodium
                                <span>150</span>
                            </li>
                            <li>
                                Glucose
                                <span>90 mg/dL</span>
                            </li>
                            <li>
                                Potassium
                                <span>3.5</span>
                            </li>
                            <li>
                                BUN
                                <span>12 mg/dL</span>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                Cholesterol
                                <span>160 mg/dL</span>
                            </li>
                            <li>
                                Triglycerides
                                <span>62 mg/dL</span>
                            </li>
                            <li>
                                HDL
                                <span>48 mg/dL</span>
                            </li>
                            <li>
                                LDL
                                <span>115 mg/dL</span>
                            </li>
                        </ul>

                        <div>
                            <div class="patient-status-item-btn active-btn">New Lipid Panel Results to Review</div>
                        </div>
                    </div>
                    <div class="patient-meds light-bg patient-card">
                        <h4 class="patient-heading">Medications and Supplements</h4>

                        <div>
                            <ul>
                                <li>budesonide-formoterol 160-4.5 mcg/actuation inhaler</li>
                                <li>coenzyme Q10 100 mg capsule</li>
                                <li>cyanocobalamin 1,000 mcg tablet</li>
                                <li>diclofenac sodium 1 % gel</li>
                                <li>ipratropium-albuteroL 20-100 mcg/actuation inhaler</li>
                            </ul>

                            <div class="patient-status-item-btn">View and Edit Medications and Supplements</div>
                        </div>
                    </div>
                </div>

                <div class="patient-data light-bg patient-card">
                    <h4 class="patient-heading">Patient Health Data</h4>

                    <ul>
                        <li>
                            Height
                            <span>5’11”</span>
                        </li>
                        <li>
                            Body Fat
                            <span>22.3%</span>
                        </li>
                        <li>
                            Weight
                            <span>180</span>
                        </li>
                        <li>
                            BP
                            <span>130/80</span>
                        </li>
                        <li>
                            BMI
                            <span>25.1</span>
                        </li>
                        <li>
                            Resting HR
                            <span>62</span>
                        </li>
                    </ul>

                    <div>
                        <LineChart />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>