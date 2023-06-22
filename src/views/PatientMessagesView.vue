<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import AttachIcon from '@/components/icons/IconAttach.vue'
import UserIcon from '@/components/icons/IconUser.vue'
import FileIcon from '@/components/icons/IconFile.vue'
import DownloadIcon from '@/components/icons/IconDownload.vue'
import { Form, Field } from 'vee-validate';

import { axiosInstance, downloadFile, uploadFile, formatAMPM } from '@/helpers';
import { useAlertStore, useFileStore, useAuthStore } from '@/stores';
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
        Form,
        Field,
    },
    mixins: [
        userMixin,
    ],
    data() {
        const alertStore = useAlertStore()
        const fileStore = useFileStore()
        const authStore = useAuthStore()
        return {
            alertStore,
            fileStore,
            authStore,
            messages: [],
            files: null,
        }
    },
    watch: {
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
    computed: {
        user() {
            return this.authStore.user
        },
        time() {
            return (time) => formatAMPM(new Date(time))
        },
    },
    methods: {
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
            downloadFile(file, `${this.user.profile_id}/${file.ref}`, 'messages')
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
                const fileData = uploadFile(element, 'messages', this.user.profile_id)
                formBody.attachments.push({
                    name: fileData.name,
                    ref: fileData.ref
                })
            }));

            axiosInstance.post("/messages", { body: formBody, patient_id: this.user.profile_id })
                .then(response => {
                    const element = response.data.data;
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
        </div>

        <div class="pt chat-wrapper page-bg">
            <div class="chat-right">
                <div class="chat-right-head pt">
                    <div class="chat-name">My messages</div>
                    <!-- <div class="chat-avatars">
                        <UserIcon />
                        <UserIcon />
                        <UserIcon />
                        <UserIcon />
                        <UserIcon />
                    </div> -->
                </div>

                <div class="chat-content-wrapper">
                    <div class="chat-content-inner">
                        <div class="chat-main">
                            <div class="messages-inner">
                                <ul class="messages-list" ref="chat">
                                    <li :class="message.from.id == user.id ? '' : 'physician-message'"
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

                                            <div v-if="message.from.id == user.id" class="message-list-time">{{
                                                time(message.time) }}</div>
                                            <div v-else class="message-list-time">Dr. {{ message.from.last_name }} • {{
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
        </div>
    </div>
</template>