<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import AttachIcon from '@/components/icons/IconAttach.vue'
import UserIcon from '@/components/icons/IconUser.vue'
import FileIcon from '@/components/icons/IconFile.vue'
import DownloadIcon from '@/components/icons/IconDownload.vue'
import PatientDetails from '@/components/Patient/PatientDetails.vue'

export default {
    components: {
        SearchIcon,
        AttachIcon,
        UserIcon,
        FileIcon,
        DownloadIcon,
        PatientDetails
    },
    data() {
        return {
            isModalVisible: false,
        }
    },
    methods: {
        showModal(event, e) {
            this.selectedEvent = event
            this.isModalVisible = !this.isModalVisible;
            if (e != null) {
                e.stopPropagation()
            }
        },
    },
    mounted() {
        const container = this.$refs.chat;
        container.scrollTop = container.scrollHeight;
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Messages</h3>
        </div>

        <div class="chat-wrapper page-bg">
            <div class="chat-left">
                <div class="chat-left-head">
                    <div class="chat-notifications">
                        <span>2 new</span>
                    </div>

                    <div>
                        <form class="" method="get">
                            <label class="search-input">
                                <input placeholder="Search" type="search" autocomplete="off">
                                <SearchIcon />
                            </label>
                        </form>
                    </div>
                </div>

                <div class="chat-content-wrapper">
                    <div class="chat-content-inner">
                        <ul class="chat-list">
                            <li class="chat-list-item active-chat">
                                <div class="chat-list-item-img">
                                    <img src="@/assets/img/image.png" alt="Patient photo" />
                                </div>
                                <div class="chat-list-item-content">
                                    <div class="chat-list-item-content-name">Howard Aarons</div>
                                    <div class="chat-list-item-content-message">howard-diet.pdf</div>
                                </div>
                                <div class="chat-list-item-info">
                                    <div class="chat-list-item-info-date">fri</div>
                                    <div class="chat-list-item-info-icon">
                                        <AttachIcon />
                                    </div>
                                </div>
                            </li>
                            <li class="chat-list-item">
                                <div class="chat-list-item-img">
                                    <img src="@/assets/img/image.png" alt="" />
                                </div>
                                <div class="chat-list-item-content">
                                    <div class="chat-list-item-content-name">Karen Bartley</div>
                                    <div class="chat-list-item-content-message">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, atque!</div>
                                </div>
                                <div class="chat-list-item-info">
                                    <div class="chat-list-item-info-date">12.01</div>
                                    <div class="chat-list-item-info-icon"></div>
                                </div>
                            </li>
                            <li class="chat-list-item">
                                <div class="chat-list-item-img">
                                    <img src="@/assets/img/image.png" alt="" />
                                </div>
                                <div class="chat-list-item-content">
                                    <div class="chat-list-item-content-name">Edward Alvarez</div>
                                    <div class="chat-list-item-content-message">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, atque!</div>
                                </div>
                                <div class="chat-list-item-info">
                                    <div class="chat-list-item-info-date">10.01</div>
                                    <div class="chat-list-item-info-icon">
                                        <span>2</span>
                                    </div>
                                </div>
                            </li>
                            <li class="chat-list-item">
                                <div class="chat-list-item-img">
                                    <img src="@/assets/img/image.png" alt="" />
                                </div>
                                <div class="chat-list-item-content">
                                    <div class="chat-list-item-content-name">Emily Atilla</div>
                                    <div class="chat-list-item-content-message">howard-diet.pdf</div>
                                </div>
                                <div class="chat-list-item-info">
                                    <div class="chat-list-item-info-date">09.01</div>
                                    <div class="chat-list-item-info-icon">
                                        <AttachIcon />
                                    </div>
                                </div>
                            </li>
                            <li class="chat-list-item">
                                <div class="chat-list-item-img">
                                    <img src="@/assets/img/image.png" alt="" />
                                </div>
                                <div class="chat-list-item-content">
                                    <div class="chat-list-item-content-name">Courtney Bailey</div>
                                    <div class="chat-list-item-content-message">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, atque!</div>
                                </div>
                                <div class="chat-list-item-info">
                                    <div class="chat-list-item-info-date">02.01</div>
                                    <div class="chat-list-item-info-icon"><span>1</span></div>
                                </div>
                            </li>
                        </ul> 
                    </div>
                    
                </div>
            </div>

            <div class="chat-right">
                <div class="chat-right-head">
                    <div class="chat-right-head-info">
                        <img src="@/assets/img/image.png" alt="Patient photo" />
                        <div class="chat-right-head-info-name">Howard Aarons</div>
                    </div>

                    <div class="chat-right-head-details" @click="showModal()">
                        <img src="@/assets/img/details-icon.png" alt="Details Icon" />

                        <Transition>
                            <PatientDetails v-show="isModalVisible" />
                        </Transition>
                    </div>
                </div>

                <div class="chat-content-wrapper">
                    <div class="chat-content-inner">
                        <div class="chat-main">
                            <div class="messages-inner">
                                <ul class="messages-list" ref="chat">
                                    <li class="physician-message">
                                        <UserIcon />
                                        <div class="message-list-text">
                                            <div class="message-list-bubble">Good Morning, mr. Aarons! How are you feeling today?</div>
                                            <div class="message-list-time">27.01.2023 15:00</div>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="@/assets/img/image.png" alt="Patient photo" />
                                        <div class="message-list-text">
                                            <div class="message-list-bubble">Good afternoon! I'm fine.</div>
                                            <div class="message-list-time">27.01.2023 15:01</div>
                                        </div>
                                    </li>
                                    <li class="physician-message">
                                        <UserIcon />
                                        <div class="message-list-text">
                                            <div class="message-list-bubble">In the attached file you can find information about your prescribed diet. Have a nice day!</div>
                                            <div class="message-list-bubble attach">
                                                <div class="download-icon">
                                                    <FileIcon />
                                                </div>
                                                <a href="#">howard-diet.pdf</a>

                                                <a href="#" class="attach-icon">
                                                   <DownloadIcon /> 
                                                </a>
                                            </div>
                                            <div class="message-list-time">27.01.2023 15:03</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="send-inner">
                                <div class="send-inner-text">
                                    <textarea placeholder="Write a message..."></textarea>
                                </div>

                                <div class="send-inner-btns">
                                    <button class="attach-btn">
                                        <AttachIcon />
                                    </button>

                                    <button class="w-btn send-btn">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>