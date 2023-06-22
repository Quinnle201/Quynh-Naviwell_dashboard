<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import DownloadIcon from '@/components/icons/IconDownload.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import _findIndex from 'lodash/findIndex';
import _ from 'lodash';
import { Form, Field } from 'vee-validate';

import { axiosInstance, downloadFile } from '@/helpers';
import { useAlertStore, useFileStore } from '@/stores';

import userMixin from '@/mixins/user.js'


export default {
    components: {
        SearchIcon,
        DownloadIcon,
        AddIcon,
        Form,
        Field,
    },
    mixins: [
        userMixin
    ],
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
    watch: {
        searchTerm(newVal){
            this.searchResults(this, newVal)
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
        searchResults: _.debounce(function(self, newVal) {
            self.currentPage = 1
            self.results = []
            self.getResults()

        }, 250),
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

        <div class="patients-wrapper page-bg">
            <div class="patients-top-wrapper">
                <div class="patient-search-wrapper">
                    <form class="" method="get">
                        <label class="patients-search search-input">
                            <input placeholder="Search" type="search" autocomplete="off" v-model="searchTerm">
                            <SearchIcon />
                        </label>
                    </form>
                </div>

                <RouterLink :to="{ name: 'add-result' }" class="add-button">
                    <AddIcon />
                    <button type="button">Add Diagnostic Result</button>
                </RouterLink>

            </div>

            <div class="patients-table lab-table">
                <table>
                    <thead>
                        <tr>
                            <th>Result name</th>
                            <th>Patient</th>
                            <th>File</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="result in results[currentPage]">
                            <td>{{result.name}}</td>
                            <td>{{userName(result.patient.user)}}</td>
                            <td class="lab-file">
                                <div class="lab-file-inner" @click="clickedDownload(result)">
                                    <span>{{result.file.name}}</span>
                                    <DownloadIcon class="attach-icon" />
                                </div>
                            </td>
                            <td>{{resultDate(result)}}</td>
                            <td>
                                <RouterLink :to="{ name: 'add-result', params: { id: result.id } }">
                                    Edit
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>