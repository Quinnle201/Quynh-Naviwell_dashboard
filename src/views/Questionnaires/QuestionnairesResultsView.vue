<script>
import DownloadIcon from '@/components/icons/IconDownload.vue'

import Pagination from '@/components/Pagination.vue';

import { axiosInstance, downloadFile } from '@/helpers';
import { useAlertStore } from '@/stores';
import userMixin from '@/mixins/user.js'

export default {
    components: {
        DownloadIcon,
        Pagination
    },
    mixins: [
        userMixin
    ],
    data() {
        const alertStore = useAlertStore()
        return {
            alertStore,
            questionnaires: [],
            totalPages: 1,
            currentPage: 1,
        }
    },
    mounted() {
        this.getList()
    },
    computed: {
        localDate() {
            return (time) => new Date(time).format('DD.MM.YYYY')
        },
    },
    methods: {
        getList() {
            if(this.questionnaires[this.currentPage]) {
                return
            }
            axiosInstance.get(`/questionnaires?page=${this.currentPage}`, { params: { per_page: 10 } })
                .then(response => {
                    const questionnaires = response.data.data.questionnaires
                    this.questionnaires[this.currentPage] = questionnaires
                    this.totalPages = response.data.data.meta.last
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        onPageChange(page) {
            this.currentPage = page;
            this.getList()
        },
        async downloadReport(quiz) {
            this.alertStore.success(`Opening patient report`)
            downloadFile(null, `${quiz.patient.user.id}/reports/${quiz.physician_report}`, 'users')
        },
    }


};
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Questionnaires results</h3>
        </div>

        <div class="results-wrapper page-bg">
            <div v-for="(quiz, index) in questionnaires[currentPage]" :key="quiz.id" class="results-item">
                <div>
                    <div class="results-item-name">{{userName(quiz.patient.user)}}</div>
                    <div class="results-item-date">{{localDate(quiz.created_at)}}</div>
                </div>
                
                <div class="results-item-file lab-file-inner"  @click="downloadReport(quiz)">
                    <span>Download report</span>
                    <DownloadIcon class="attach-icon" /> 
                </div>
            </div>

            <pagination
                v-if="totalPages > 1"
                :totalPages="totalPages"
                :currentPage="currentPage"
                @pagechanged="onPageChange"
            />

        </div>
    </div>
</template>