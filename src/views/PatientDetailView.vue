<script>
import ChatIcon from '../components/icons/IconChat.vue'
import VideoIcon from '../components/icons/IconVideo.vue'
import MessagesIcon from '../components/icons/IconMessages.vue'
import CalendarIcon from '../components/icons/IconCalendar.vue'
import RoundBtn from '../components/Dashboard/Layout/RoundBtn.vue'

export default {
    components: {
        ChatIcon,
        VideoIcon,
        MessagesIcon,
        CalendarIcon,
        RoundBtn
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
                    <p>Next Appointment Scheduled</p>
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

            <div>
                <div class="light-bg"></div>

                <div>
                    <div class="light-bg"></div>
                    <div class="light-bg"></div>
                </div>

                <div class="light-bg"></div>
            </div>
        </div>
    </div>
</template>