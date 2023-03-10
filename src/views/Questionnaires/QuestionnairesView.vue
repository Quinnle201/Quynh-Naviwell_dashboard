<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import AttachIcon from '@/components/icons/IconAttach.vue'
import UserIcon from '@/components/icons/IconUser.vue'
import FileIcon from '@/components/icons/IconFile.vue'
import DownloadIcon from '@/components/icons/IconDownload.vue'
import QuestionnaireIcon from '@/components/icons/IconQuestionnaire.vue'

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
        QuestionnaireIcon
    },
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>My Quizzes & Questionnaires</h3>
        </div>

        <div class="page-bg">
            <div class="q-title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ante magna, rutrum sit amet ante a, ultrices aliquet quam.
            </div>

            <ul class="q-list">
                <li>
                    <QuestionnaireIcon />
                    <div class="q-info">
                        <div>Diabetes</div>
                        <span>10 questions</span>
                    </div>
                    <button>Start</button>
                </li>
                <li>
                    <QuestionnaireIcon />
                    <div class="q-info">
                        <div>Anxiety</div>
                        <span>8 questions</span>
                    </div>
                    <button>Start</button>
                </li>
            </ul>
        </div>
    </div>
</template>