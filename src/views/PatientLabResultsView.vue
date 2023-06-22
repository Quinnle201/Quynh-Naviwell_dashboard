<script>
import DownloadIcon from '@/components/icons/IconDownload.vue'

import { axiosInstance, downloadFile } from '@/helpers';
import { useAlertStore, useFileStore } from '@/stores';

export default {
    components: {
        DownloadIcon,
    },
    data() {
        const alertStore = useAlertStore();
        const fileStore = useFileStore();
        return {
            alertStore,
            fileStore,
            results: [],
            totalPages: 1,
            currentPage: 1,
            searchTerm: "",
        }
    },
    mounted() {
        this.getResults();
    },
    computed: {
        resultDate(){
            return (result) => {
                if (!result) {
                    return ""
                }
                return new Date(result.date).toDateString()
            }
        }
    },
    methods: {
        getResults() {
            if(this.results[this.currentPage]) {
                return
            }
            axiosInstance.get(`/lab-results?page=${this.currentPage}`, { params: { per_page: 4, searchTerm: this.searchTerm } })
                .then(response => {
                    const results = response.data.data.lab_results
                    this.results[this.currentPage] = results
                    this.totalPages = response.data.data.meta.last
                })
                .catch(error => {
                    this.alertStore.error(error.response.data.message)
                });
        },
        async clickedDownload(result) {
            this.alertStore.success(`Downloading ${result.file.name}`)
            downloadFile(result.file, `${result.patient_id}/${result.file.ref}`, 'results')
        },
    }
};
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Diagnostic results</h3>
        </div>

        <div class="results-wrapper page-bg">
            <div class="results-item" v-for="result in results[currentPage]">
                <div>
                    <div class="results-item-name">{{result.name}}</div>
                    <div class="results-item-date">{{resultDate(result)}}</div>
                </div>
                
                <div class="results-item-file lab-file-inner" @click="clickedDownload(result)">
                    <span>{{result.file.name}}</span>
                    <DownloadIcon class="attach-icon" /> 
                </div>
            </div>
        </div>
    </div>
</template>