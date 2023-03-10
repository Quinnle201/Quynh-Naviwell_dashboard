<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import AttachIcon from '@/components/icons/IconAttach.vue'
import UserIcon from '@/components/icons/IconUser.vue'
import FileIcon from '@/components/icons/IconFile.vue'
import DownloadIcon from '@/components/icons/IconDownload.vue'
import { Form, Field } from 'vee-validate';

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
        Form,
        Field,
    },
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
                    <div class="chat-name">Physicians</div>
                    <div class="chat-avatars">
                        <UserIcon />
                        <UserIcon />
                        <UserIcon />
                        <UserIcon />
                        <UserIcon />
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
                                            <div class="message-list-bubble">lorem ipsum</div>
                                            <div class="message-list-bubble attach">
                                                <div class="download-icon">
                                                    <FileIcon />
                                                </div>
                                                hhh
                                                <DownloadIcon class="attach-icon" />
                                            </div>

                                            <div class="message-list-time">09.09.23</div>
                                            <div class="message-list-time">Dr. Wendell • 09.08.23</div>
                                        </div>
                                    </li>
                                    <li>
                                        <img src="@/assets/img/image.png" alt="Patient photo" />
                                        <div class="message-list-text">
                                            <div class="message-list-bubble">message</div>
                                            <div class="message-list-time">27.01.2023 15:01</div>
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
                                            <input hidden type="file" name="attachment" />
                                            <button type="button"  class="attach-btn">
                                                <AttachIcon />
                                            </button>
                                            <div>file.pdf
                                                <span>x</span>
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