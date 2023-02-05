<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import AttachIcon from '@/components/icons/IconAttach.vue'
import UserIcon from '@/components/icons/IconUser.vue'
import FileIcon from '@/components/icons/IconFile.vue'
import DownloadIcon from '@/components/icons/IconDownload.vue'
import PatientDetails from '@/components/Patient/PatientDetails.vue'
import { Form, Field } from 'vee-validate';
import Modal from '@/components/Modals/Modal.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import PatientAutocomplete from '@/components/Patient/PatientAutocomplete.vue'

import { axiosInstance, downloadFile, uploadFile, getFileUrlFromRef } from '@/helpers';
import { useAlertStore, useFileStore } from '@/stores';
import userMixin from '@/mixins/user.js'

import _forEach from 'lodash/forEach';
import _findIndex from 'lodash/findIndex'

export default {
    components: {
        SearchIcon,
        AttachIcon,
        UserIcon,
        FileIcon,
        DownloadIcon,
        PatientDetails,
        Form,
        Field,
        AddIcon,
        PatientAutocomplete,
        Modal
    },
    mixins: [
        userMixin,
    ],
    data() {
        const alertStore = useAlertStore()
        const fileStore = useFileStore()
        return {
            alertStore,
            fileStore,
            isModalVisible: false,
            isChatModalVisible: false,
            list: [],
            selectedPatient: null,
            messages: [],
            searchList: [],
            files: null,
        }
    },
    computed: {
        localDate() {
            return (time) => new Date(time).format('DD.MM')
        },
        time() {
            return (time) => new Date(time).format('hh:mm')
        },
        getMessageType() {
            return (msgObject) => {
                if (msgObject.attachments.length > 0) {
                    return 'attachment'
                }
                return 'message'
            }
        },
    },
    watch: {
        selectedPatient: {
            handler(value) {
                if (value != null) {
                    this.getMessagesForPatient(value.id)
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
            this.$refs.newMessageForm.setValues({})
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
        populateMessages(responseMessage) {
            this.messages.push({
                id: responseMessage.id,
                from: responseMessage.from,
                body: responseMessage.body,
                time: responseMessage.created_at,
                pic: '/src/assets/img/usericon.png'
            })
            this.fileStore.getPhotoLinkForUser(responseMessage.from)
            
        },
        getMessagesList() {
            axiosInstance.get('/messages')
                .then(response => {
                    console.log(response.data)
                    response.data.messages.forEach(element => {
                        this.fileStore.getPhotoLinkForUser(element.patient.user)
                        this.list.push({
                            patient: element.patient,
                            patient_id: element.patient_id,
                            name: this.userName(element.patient.user),
                            message: element.body,
                            date: element.created_at
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
                    response.data.messages.forEach(async element => {
                        this.populateMessages(element)
                    });

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        selectChat(patient) {
            this.selectedPatient = patient
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
            downloadFile(file, `${this.selectedPatient.id}/${file.ref}`, 'messages')
        },
        sendNewMessage(values) {
            const formBody = {
                attachments: [],
                message: values.message
            }
            axiosInstance.post("/messages", { body: formBody, patient_id: values.patient_id })
                .then(response => {
                    console.log(response.data)
                    this.alertStore.success('Message sent.');
                    this.closeChatModal()
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
                    const element = response.data.message;
                    this.populateMessages(element)

                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });

            this.files = null
            this.$refs.messageForm.setValues({})


        },

    },
    mounted() {
        this.getMessagesList()
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
                            <li :class="msg.patient_id == selectedPatient?.id ? 'active-chat' : ''"
                                class="chat-list-item" v-for="msg in list" @click="selectChat(msg.patient)">
                                <div class="chat-list-item-img">
                                    <img :src="fileStore.profileAvatars(msg.patient.user)" alt="User photo" />
                                </div>
                                <div class="chat-list-item-content">
                                    <div class="chat-list-item-content-name">{{ msg.name }}</div>
                                    <div class="chat-list-item-content-message">{{ getMessageType(msg.message) ==
                                    'attachment' ? msg.message.attachments[0].name : msg.message.message}}
                                    </div>
                                </div>
                                <div class="chat-list-item-info">
                                    <div class="chat-list-item-info-date">{{ localDate(msg.date) }}</div>
                                    <div v-if="getMessageType(msg.message) == 'attachment'"
                                        class="chat-list-item-info-icon">
                                        <AttachIcon />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <div v-show="selectedPatient" class="chat-right">
                <div class="chat-right-head">
                    <div class="chat-right-head-info">
                        <img :src="fileStore.profileAvatars(selectedPatient?.user)" alt="Patient photo" loading="lazy" />
                        <div class="chat-right-head-info-name">{{ userName(selectedPatient?.user) }}</div>
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
                                    <li :class="message.from.profile.id == selectedPatient.id ? '' : 'physician-message'"
                                        v-for="message in messages">
                                        <img :src="fileStore.profileAvatars(message.from)" alt="User photo" loading="lazy" />
                                        <div class="message-list-text">
                                            <div v-if="message.body.message != null" class="message-list-bubble">{{
                                                message.body.message
                                            }}</div>
                                            <div v-for="att in message.body.attachments"
                                                class="message-list-bubble attach" @click="clickedDownload(att)">
                                                <div class="download-icon">
                                                    <FileIcon />
                                                </div>
                                                {{ att.name }}
                                                <DownloadIcon class="attach-icon" />
                                            </div>

                                            <div v-if="message.from.profile.id == selectedPatient.id" class="message-list-time">{{ time(message.time) }}</div>
                                            <div v-else class="message-list-time">Dr. {{ message.from.last_name }} • {{ time(message.time) }}</div>
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
        </div>

        <Modal v-show="isChatModalVisible" @close="closeChatModal">
            <template #header>Send Message</template>
            <template #content>
                <Form @submit="sendNewMessage" ref="newMessageForm">
                    <div class="popup-content-item popup-content-item--search">
                        <label>Patient Name</label>
                        <PatientAutocomplete :patients="searchList" @search="searchPatient" />
                    </div>

                    <div class="popup-content-item popup-content-item-textarea">
                        <label for="textarea">Message</label>
                        <Field as="textarea" name="message" placeholder="Type a message..."></Field>
                    </div>

                    <div class="popup-footer">
                        <button type="reset" class="w-btn w-btn-close" @click="closeScheduleModal">
                            Cancel
                        </button>
                        <button type="submit" class="w-btn">
                            Send
                        </button>
                    </div>
                </Form>
            </template>
        </Modal>
    </div>
</template>