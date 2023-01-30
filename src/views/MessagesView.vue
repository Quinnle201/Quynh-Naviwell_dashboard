<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import AttachIcon from '@/components/icons/IconAttach.vue'
import UserIcon from '@/components/icons/IconUser.vue'
import FileIcon from '@/components/icons/IconFile.vue'
import DownloadIcon from '@/components/icons/IconDownload.vue'
import PatientDetails from '@/components/Patient/PatientDetails.vue'
import { Form, Field } from 'vee-validate';

import { axiosInstance, downloadFile, uploadFile } from '@/helpers';
import { useAlertStore } from '@/stores';
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
        Field
    },
    mixins: [
        userMixin,
    ],
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            isModalVisible: false,
            list: [],
            selectedPatient: null,
            messages: [],
        }
    },
    computed: {
        localDate() {
            return (time) => new Date(time).format('DD.MM')
        },
        time() {
            return (time) => new Date(time).format('DD.MM.YYYY hh:mm')
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
        populateMessages(responseMessage) {
            this.messages.push({
                id: responseMessage.id,
                from: responseMessage.from,
                body: responseMessage.body,
                time: responseMessage.created_at
            })
        },
        getMessagesList() {
            axiosInstance.get('/messages')
                .then(response => {
                    console.log(response.data)
                    response.data.messages.forEach(element => {
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
            this.$refs.messageForm.setFieldValue('files', files)
        },
        async clickedDownload(file) {
            this.alertStore.success(`Downloading ${file.name}`)
            downloadFile(file, `${this.selectedPatient.id}/${file.ref}`, 'messages')
        },
        submitMessage(values) {

            // No values specified
            if (!values.message && !values.files) {
                return
            }

            const formBody = {
                attachments: [],
                message: values.message
            }

            _forEach(values.files, (element => {
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
                                    <img src="@/assets/img/image.png" alt="Patient photo" />
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
                        <img src="@/assets/img/image.png" alt="Patient photo" />
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
                                    <li :class="message.from == selectedPatient.id ? '' : 'physician-message'"
                                        v-for="message in messages">
                                        <UserIcon />
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
                                                <DownloadIcon />
                                            </div>
                                            <div class="message-list-time">{{ time(message.time) }}</div>
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
                                        <input hidden type="file" name="attachment" @change="addFile"
                                            ref="fileUpload" />
                                        <button type="button" @click="selectFile()" class="attach-btn">
                                            <AttachIcon />
                                        </button>

                                        <button type="submit" class="w-btn send-btn">Send</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>