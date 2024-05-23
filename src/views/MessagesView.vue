<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import AttachIcon from '@/components/icons/IconAttach.vue'
import UserIcon from '@/components/icons/IconUser.vue'
import FileIcon from '@/components/icons/IconFile.vue'
import DownloadIcon from '@/components/icons/IconDownload.vue'
import PatientDetails from '@/components/Patient/PatientDetails.vue'
import { Form, Field } from 'vee-validate';
import Modal from '@/components/Modals/Modal.vue'
import ScheduleModal from '@/components/Modals/ScheduleModal.vue'
import Tabs from "@/components/Tabs.vue"


import AddIcon from '@/components/icons/IconAdd.vue'
import PatientAutocomplete from '@/components/Patient/PatientAutocomplete.vue'

import { axiosInstance, downloadFile, uploadFile, getFileUrlFromRef, formatAMPM } from '@/helpers';
import { useAlertStore, useFileStore, useAuthStore } from '@/stores';
import userMixin from '@/mixins/user.js'

import _forEach from 'lodash/forEach';
import _findIndex from 'lodash/findIndex'

export default {
    components: {
        SearchIcon,
        Tabs,
        AttachIcon,
        UserIcon,
        FileIcon,
        DownloadIcon,
        PatientDetails,
        Form,
        Field,
        AddIcon,
        PatientAutocomplete,
        Modal,
        ScheduleModal
    },
    mixins: [
        userMixin,
    ],
    data() {
        const userStore = useAuthStore()
        const alertStore = useAlertStore()
        const fileStore = useFileStore()
        return {
            alertStore,
            fileStore,
            isModalVisible: false,
            isChatModalVisible: false,
            isScheduleModalVisible: false,
            list: [],
            physician_list: [],
            filteredList: [],
            filteredPhysicianList: [],
            selectedPatient: null,
            selectedConversation: null,
            messages: [],
            searchList: [],
            searchPhysicianList: [],
            files: null,
            chatSearchTerm: "",
            tabList: ['Patients', 'Physicians'],
            tabListN: ['Patient', 'Physician'],
            user: userStore.user,
        }
    },
    computed: {
        localDate() {
            return (time) => new Date(time).format('DD.MM')
        },
        time() {
            return (time) => formatAMPM(new Date(time))
        },
        getMessageType() {
            return (msgObject) => {
                if (msgObject.attachments.length > 0) {
                    return 'attachment'
                }
                return 'message'
            }
        },
        unreadCount() {
            return this.list.filter((value) => {
                return !value.isRead
            }).length
        }
    },
    watch: {
        chatSearchTerm: {
            handler(value) {
                if (value != null) {
                    this.filteredList = this.list.filter(o => o.name.toLowerCase().includes(value.toLowerCase()));

                } else {
                    this.filteredList = list
                }
            }
        },
        list: {
            handler(value) {
                this.filteredList = value
            },
            immediate: true,
        },
        physician_list: {
            handler(value) {
                this.filteredPhysicianList = value
            },
            immediate: true
        },
        selectedPatient: {
            handler(value) {
                if (value != null) {
                    this.getMessagesForPatient(value.id)
                }
            }
        },
        selectedConversation: {
            handler(value) {
                if (value != null) {
                    this.getMessagesForConversation(value.id)
                }
            } 
        },
        messages: {
            handler() {
                const container = this.$refs.chat;
                this.$nextTick(() => {
                    container.scrollTop = container.scrollHeight;
                });

            },
            deep: true,
        },
    },
    methods: {
        timeAgo(value) {
            const seconds = Math.floor((new Date().getTime() - new Date(value).getTime()) / 1000)
            let interval = seconds / 31536000
            const rtf = new Intl.RelativeTimeFormat("en", { numeric: 'auto', style: 'short' })
            if (interval > 1) { return rtf.format(-Math.floor(interval), 'year') }
            interval = seconds / 2592000
            if (interval > 1) { return rtf.format(-Math.floor(interval), 'month') }
            interval = seconds / 86400
            if (interval > 1) { return rtf.format(-Math.floor(interval), 'day') }
            interval = seconds / 3600
            if (interval > 1) { return rtf.format(-Math.floor(interval), 'hour') }
            interval = seconds / 60
            if (interval > 1) { return rtf.format(-Math.floor(interval), 'minute') }
            return rtf.format(-Math.floor(interval), 'second')
        },
        showModal(event, e) {
            this.selectedEvent = event
            this.isModalVisible = !this.isModalVisible;
            if (e != null) {
                e.stopPropagation()
            }
        },
        showChatModal() {
            this.isChatModalVisible = true;
        },
        closeChatModal() {
            this.isChatModalVisible = false;
            this.$refs.newMessageForm?.setValues({})
            this.$refs.newPhysicianMessageForm?.setValues({})
            if(this.$refs.patientAutocomplete){
                this.$refs.patientAutocomplete.searchTerm = ''
            }
            if(this.$refs.physicianAutocomplete) {
                this.$refs.physicianAutocomplete.searchTerm = ''
            }
            
            
        },
        searchPatient(term) {
            axiosInstance.post('patients/search', { name: term })
                .then(res => {
                    this.searchList = []
                    res.data.data.forEach(pt => {
                        this.searchList.push(pt)
                    });

                })
        },

        searchPhysician(term) {
            axiosInstance.post('physicians/search', { name: term })
                .then(res => {
                    this.searchPhysicianList = []
                    res.data.data.forEach(pt => {
                        this.searchPhysicianList.push(pt)
                    });

                })
        },
        populateMessages(responseMessage) {
            this.messages.push({
                id: responseMessage.id,
                from: responseMessage.from,
                to: responseMessage.to,
                body: responseMessage.body,
                time: responseMessage.created_at,
                pic: '/src/assets/img/usericon.png'
            })
            this.fileStore.getPhotoLinkForUser(responseMessage.from)

        },
        getMessagesList() {
            axiosInstance.get('/messages')
                .then(response => {
                    response.data.data.messages.forEach(element => {
                        this.fileStore.getPhotoLinkForUser(element.patient.user)
                        this.list.push({
                            patient: element.patient,
                            patient_id: element.patient_id,
                            name: this.userName(element.patient.user),
                            message: element.body,
                            date: element.created_at,
                            isRead: element.is_read
                        })
                    });

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },

        getPhysicianMessagesList() {
            axiosInstance.get('/physician-messages')
                .then(response => {
                    response.data.data.conversations.forEach(element => {
                        this.fileStore.getPhotoLinkForUser(element.other_participant)
                        
                        this.physician_list.push({
                            id: element.id,
                            name: element.name,
                            message: element.last_message,
                            other_participant: element.other_participant,
                            date: element.last_message.created_at,
                            isRead: element.last_message.is_read
                        })
                    });

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        getMessagesForPatient(id) {
            axiosInstance.get(`/messages/${id}`)
                .then(response => {
                    this.messages = []
                    response.data.data.messages.forEach(async element => {
                        this.populateMessages(element)
                    });

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },

        getMessagesForConversation(id) {
            axiosInstance.get(`/physician-messages/${id}`)
                .then(response => {
                    this.messages = []
                    response.data.data.messages.forEach(async element => {
                        this.populateMessages(element)
                    });

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        selectChat(message) {
            this.messages = []
            this.selectedPatient = null
            this.selectedConversation = null
            const idx = _findIndex(this.list, ['patient_id', message.patient_id]);
            this.list[idx].isRead = true
            this.selectedPatient = message.patient
        },
        selectConversation(conversation) {
            this.messages = []
            this.selectedPatient = null
            this.selectedConversation = null
            const idx = _findIndex(this.physician_list, ['id', conversation.id]);
            this.physician_list[idx].isRead = true
            this.selectedConversation = conversation
        },
        selectFile() {
            const r = this.$refs.fileUpload;
            r.click();
        },
        addFile(event) {
            const files = event.target.files
            this.files = files
        },
        deleteFile() {
            this.files = null
        },
        async clickedDownload(file) {
            this.alertStore.success(`Downloading ${file.name}`)
            if(this.selectedPatient) {
                downloadFile(file, `${this.selectedPatient.id}/${file.ref}`, 'messages')
            } else if(this.selectedConversation) {
                downloadFile(file, `${this.selectedConversation.id}/${file.ref}`, 'conversations')
            }
           
        },
        sendNewMessage(values) {
            const formBody = {
                attachments: [],
                message: values.message
            }
            axiosInstance.post("/messages", { body: formBody, patient_id: values.patient_id })
                .then(response => {
                    this.alertStore.success('Message sent.');
                    this.closeChatModal()
                    this.updateLeftChatSide(response.data.data)

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },

        sendNewPhysicianMessage(values) {
            const formBody = {
                attachments: [],
                message: values.message
            }

            axiosInstance.post("/physician-messages", { body: formBody, to_id: values.patient_id })
            .then(response => {
                    this.alertStore.success('Message sent.');
                    this.closeChatModal()
                    this.updateLeftChatSide(response.data.data, true)

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });

        },
        submitMessage(values) {

            // No values specified
            if (!values.message && !this.files) {
                return
            }

            const formBody = {
                attachments: [],
                message: values.message
            }

            _forEach(this.files, (element => {
                const fileData = uploadFile(element, 'messages', this.selectedPatient.id)
                formBody.attachments.push({
                    name: fileData.name,
                    ref: fileData.ref
                })
            }));

            axiosInstance.post("/messages", { body: formBody, patient_id: this.selectedPatient.id })
                .then(response => {
                    const element = response.data.data;
                    this.populateMessages(element)
                    this.updateLeftChatSide(response.data.data)
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });

            this.files = null
            this.$refs.messageForm.setValues({})


        },

        submitPhyisicianMessage(values) {

            // No values specified
            if (!values.message && !this.files) {
                return
            }

            const formBody = {
                attachments: [],
                message: values.message
            }

            _forEach(this.files, (element => {
                const fileData = uploadFile(element, 'conversations', this.selectedConversation.id)
                formBody.attachments.push({
                    name: fileData.name,
                    ref: fileData.ref
                })
            }));

            axiosInstance.post("/physician-messages", { body: formBody, conversation_id: this.selectedConversation.id })
                .then(response => {
                    const element = response.data.data;
                    this.populateMessages(element)
                    this.updateLeftChatSide(response.data.data, true)
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });

            this.files = null
            this.$refs.physicianMessageForm.setValues({})


        },
        

        updateLeftChatSide(element, isPhysician = false) {

            if(isPhysician) {
                console.log(element)
                this.fileStore.getPhotoLinkForUser(element.other_participant)
                const msgObject = {
                    id: element.conversation_id,
                    name: element.conversation.name,
                    message: element,
                    other_participant: element.conversation.other_participant,
                    date: element.created_at,
                    isRead: true,
                }
                const index = this.physician_list.findIndex((obj) => obj.id === msgObject.id);
                console.log("found index", index);

                if (index === -1) {
                    this.physician_list.push(msgObject);
                } else {
                    this.physician_list[index] = msgObject;
                }

            } else {
                this.fileStore.getPhotoLinkForUser(element.patient.user)
                const msgObject = {
                    patient: element.patient,
                    patient_id: element.patient_id,
                    name: this.userName(element.patient.user),
                    message: element.body,
                    date: element.created_at,
                    isRead: true
                }
                const index = this.list.findIndex((obj) => obj.patient_id === msgObject.patient_id);

                if (index === -1) {
                    this.list.push(msgObject);
                } else {
                    this.list[index] = msgObject;
                }

                this.list.splice(index, 1, this.list.splice(0, 1, this.list[index])[0])
            }
        },

        gotoPatientDetails() {
            this.$router.push({ name: 'patient', params: { id: this.selectedPatient.id } })
        },
        showScheduleModal() {
            this.isScheduleModalVisible = true
        },
        closeScheduleModal() {
            this.isScheduleModalVisible = false
        },

    },
    mounted() {
        this.getMessagesList()
        this.getPhysicianMessagesList()
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Messages</h3>

            <div class="add-button" @click="showChatModal">
                <AddIcon />
                <button type="button">Start a conversation</button>
            </div>
        </div>

        <div class="chat-wrapper page-bg">
            <div class="chat-left">
                <div class="chat-left-head">
                    <div v-if="unreadCount > 0" class="chat-notifications">
                        <span>{{ `${unreadCount} new` }}</span>
                    </div>

                    <div>
                        <form class="" method="get">
                            <label class="search-input">
                                <input placeholder="Search" type="search" autocomplete="off" v-model="chatSearchTerm">
                                <SearchIcon />
                            </label>
                        </form>
                    </div>
                </div> 
                
                <tabs :tabList="tabList">
                    <template v-slot:tabPanel-1>
                        <div class="chat-content-wrapper">
                            <div class="chat-content-inner">
                                <ul class="chat-list">
                                    <li :key="msg.patient_id" :class="msg.patient_id == selectedPatient?.id ? 'active-chat' : ''" class="chat-list-item"
                                        v-for="msg in filteredList" @click="selectChat(msg)">
                                        <div class="chat-list-item-img">
                                            <img :src="fileStore.profileAvatars(msg.patient.user)" alt="User photo" />
                                        </div>
                                        <div class="chat-list-item-content">
                                            <div class="chat-list-item-content-name">{{ msg.name }}</div>
                                            <div class="chat-list-item-content-message">{{ getMessageType(msg.message) ==
                                                'attachment' ? msg.message.attachments[0].name : msg.message.message }}
                                            </div>
                                        </div>
                                        <div class="chat-list-item-info">
                                            <div class="chat-list-item-info-date">{{ localDate(msg.date) }}</div>
                                            <div class="chat-list-item-info-icon">
                                                <span v-if="!msg.isRead">1</span>
                                                <AttachIcon v-if="getMessageType(msg.message) == 'attachment'" />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>

                    <template v-slot:tabPanel-2>
                        <div class="chat-content-wrapper">
                            <div class="chat-content-inner">
                                <ul class="chat-list">
                                    <li :key="conversation.id" class="chat-list-item"
                                        v-for="conversation in filteredPhysicianList" @click="selectConversation(conversation)">
                                        <div class="chat-list-item-img">
                                            <img :src="fileStore.profileAvatars(conversation.other_participant)" alt="User photo" />
                                        </div>
                                        <div class="chat-list-item-content">
                                            <div class="chat-list-item-content-name">{{ conversation.name }}</div>
                                            <div class="chat-list-item-content-message">{{ getMessageType(conversation.message.body) ==
                                                'attachment' ? conversation.message.body.attachments[0].name : conversation.message.body.message }}
                                            </div>
                                        </div>
                                        <div class="chat-list-item-info">
                                            <div class="chat-list-item-info-date">{{ localDate(conversation.date) }}</div>
                                            <div class="chat-list-item-info-icon">
                                                <span v-if="!conversation.isRead">1</span>
                                                <AttachIcon v-if="getMessageType(conversation.message.body) == 'attachment'" />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>

                </tabs>
            </div>

            <div v-if="selectedPatient" class="chat-right">
                <div class="chat-right-head">
                    <div class="chat-right-head-info">
                        <img :src="fileStore.profileAvatars(selectedPatient?.user)" alt="Patient photo" loading="lazy" />
                        <div class="chat-right-head-info-name">{{ userName(selectedPatient?.user) }}</div>
                    </div>

                    <div class="chat-right-head-details" @click="showModal()">
                        <img src="@/assets/img/details-icon.png" alt="Details Icon" />

                        <Transition>
                            <PatientDetails v-show="isModalVisible" :items="['update', 'calendar']" @update="gotoPatientDetails" @calendar="showScheduleModal"  />
                        </Transition>
                    </div>
                </div>

                <div class="chat-content-wrapper">
                    <div class="chat-content-inner">
                        <div class="chat-main">
                            <div class="messages-inner">
                                <ul class="messages-list" ref="chat">
                                    <li :class="message.from?.profile.id == selectedPatient.id ? '' : 'physician-message'"
                                        v-for="message in messages">
                                        <img :src="fileStore.profileAvatars(message.from)" alt="User photo"
                                            loading="lazy" />
                                        <div class="message-list-text">
                                            <div v-if="message.body.message != null" class="message-list-bubble">{{
                                                message.body.message
                                            }}</div>
                                            <div v-for="att in message.body.attachments" class="message-list-bubble attach"
                                                @click="clickedDownload(att)">
                                                <div class="download-icon">
                                                    <FileIcon />
                                                </div>
                                                {{ att.name }}
                                                <DownloadIcon class="attach-icon" />
                                            </div>

                                            <div v-if="message.from?.profile.id == selectedPatient.id"
                                                class="message-list-time">{{ time(message.time) }}</div>
                                            <div v-else class="message-list-time">{{ message.from?.last_name }} • {{
                                                time(message.time) }}</div>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                            <div class="send-inner">
                                <Form @submit="submitMessage" ref="messageForm">
                                    <div class="send-inner-text">
                                        <Field as="textarea" name="message" placeholder="Write a message..." />
                                    </div>

                                    <div class="send-inner-btns">
                                        <div class="send-inner-btns-file">
                                            <input hidden type="file" name="attachment" @change="addFile"
                                                ref="fileUpload" />
                                            <button type="button" @click="selectFile()" class="attach-btn">
                                                <AttachIcon />
                                            </button>
                                            <div v-if="files">{{ files[0].name }}
                                                <span @click="deleteFile">x</span>
                                            </div>
                                        </div>

                                        <button type="submit" class="w-btn send-btn">Send</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div v-else-if="selectedConversation" class="chat-right">
                <div class="chat-right-head">
                    <div class="chat-right-head-info">
                        <img :src="fileStore.profileAvatars(selectedConversation.other_participant)" alt="User photo" />
                        <div class="chat-right-head-info-name">{{ selectedConversation.name }}</div>
                    </div>
                </div>

                <div class="chat-content-wrapper">
                    <div class="chat-content-inner">
                        <div class="chat-main">
                            <div class="messages-inner">
                                <ul class="messages-list" ref="chat">
                                    <li :class="message.from?.id != user.id ? '' : 'physician-message'"
                                        v-for="message in messages">
                                        <img :src="fileStore.profileAvatars(message.from)" alt="User photo"
                                            loading="lazy" />
                                        <div class="message-list-text">
                                            <div v-if="message.body.message != null" class="message-list-bubble">{{
                                                message.body.message
                                            }}</div>
                                            <div v-for="att in message.body.attachments" class="message-list-bubble attach"
                                                @click="clickedDownload(att)">
                                                <div class="download-icon">
                                                    <FileIcon />
                                                </div>
                                                {{ att.name }}
                                                <DownloadIcon class="attach-icon" />
                                            </div>

                                            <div class="message-list-time">{{ message.from?.first_name[0] }}. {{ message.from?.last_name }} • {{
                                                time(message.time) }}</div>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                            <div class="send-inner">
                                <Form @submit="submitPhyisicianMessage" ref="physicianMessageForm">
                                    <div class="send-inner-text">
                                        <Field as="textarea" name="message" placeholder="Write a message..." />
                                    </div>

                                    <div class="send-inner-btns">
                                        <div class="send-inner-btns-file">
                                            <input hidden type="file" name="attachment" @change="addFile"
                                                ref="fileUpload" />
                                            <button type="button" @click="selectFile()" class="attach-btn">
                                                <AttachIcon />
                                            </button>
                                            <div v-if="files">{{ files[0].name }}
                                                <span @click="deleteFile">x</span>
                                            </div>
                                        </div>

                                        <button type="submit" class="w-btn send-btn">Send</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ScheduleModal v-show="isScheduleModalVisible" @close="closeScheduleModal" :patient_id="selectedPatient?.id"/>

        <Modal v-show="isChatModalVisible" @close="closeChatModal">
            <template #header>Send Message</template>
            <template #content>
                <tabs :tabList="tabListN">
                    <template v-slot:tabPanel-1>
                        <Form @submit="sendNewMessage" ref="newMessageForm">
                            <div class="popup-content-item popup-content-item--search">
                                <label>Patient Name</label>
                                <PatientAutocomplete :patients="searchList" @search="searchPatient" ref="patientAutocomplete" />
                            </div>

                            <div class="popup-content-item popup-content-item-textarea">
                                <label for="textarea">Message</label>
                                <Field as="textarea" name="message" placeholder="Type a message..."></Field>
                            </div>

                            <div class="popup-footer">
                                <button type="reset" class="w-btn w-btn-close" @click="closeChatModal">
                                    Cancel
                                </button>
                                <button type="submit" class="w-btn">
                                    Send
                                </button>
                            </div>
                        </Form>
                    </template>

                    <template v-slot:tabPanel-2>
                        <Form @submit="sendNewPhysicianMessage" ref="newPhysicianMessageForm">
                            <div class="popup-content-item popup-content-item--search">
                                <label>Physician Name</label>
                                <PatientAutocomplete :patients="searchPhysicianList" @search="searchPhysician" ref="physicianAutocomplete" />
                            </div>

                            <div class="popup-content-item popup-content-item-textarea">
                                <label for="textarea">Message</label>
                                <Field as="textarea" name="message" placeholder="Type a message..."></Field>
                            </div>

                            <div class="popup-footer">
                                <button type="reset" class="w-btn w-btn-close" @click="closeChatModal">
                                    Cancel
                                </button>
                                <button type="submit" class="w-btn">
                                    Send
                                </button>
                            </div>
                        </Form>
                    </template>
                </tabs>
            </template>
        </Modal>
    </div>
</template>