<script>
import Modal from '@/components/Modals/Modal.vue'
import DeleteModal from '@/components/Modals/DeleteModal.vue'
import AddIcon from '@/components/icons/IconAdd.vue'
import SearchIcon from '@/components/icons/IconSearch.vue'
import EditIcon from '@/components/icons/IconEdit.vue'
import VueMultiselect from 'vue-multiselect'
import { Form, Field } from 'vee-validate';
import { RouterLink } from 'vue-router'
import Pagination from '@/components/Pagination.vue';

import { axiosInstance } from '@/helpers';
import { useAlertStore } from '@/stores';
import _findIndex from 'lodash/findIndex';
import _ from 'lodash';

export default {
    components: {
        Modal,
        DeleteModal,
        AddIcon,
        SearchIcon,
        EditIcon,
        VueMultiselect,
        Form,
        Field,
        RouterLink,
        Pagination
    },
    data() {
        const alertStore = useAlertStore();
        return {
            quotes: [],
            selectedQuote: null,
            alertStore,
            isModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            selectedPatients: null,
            optionsPatients: [{
                label: 'Select All',
                patients: ['Howard Aarons', 'Edward Alvarez', 'Emily Atilla', 'Monkey D. Luffy', 'God Usopp', 'Roronoa Zoro']
            }],
            selectedGroups: null,
            optionsGroups: [{
                label: 'Select All',
                groups: ['Group 1', 'Group 2', 'Group 3', 'Group 4']
            }],
            totalPages: 1,
            currentPage: 1,
            searchTerm: "",
        }
    },
    watch: {
        selectedQuote: {
            handler(value) {
                if (value == null) {
                    this.$refs.quoteForm.setValues({})
                } else {
                    this.$refs.quoteForm.setValues({
                        text: value.text
                    })
                }
            }
        },
        searchTerm(newVal){
            this.searchQuotes(this, newVal)
        }
    },
    mounted() {
        this.getQuotes()
    },
    methods: {
        searchQuotes: _.debounce(function(self, newVal) {
            self.currentPage = 1
            self.quotes = []
            self.getQuotes()

        }, 250),
        showModal(quote) {
            this.selectedQuote = quote
            this.isModalVisible = true;
        },
        closeModal() {
            this.selectedQuote = null
            this.isModalVisible = false;
        },
        showDeleteModal() {
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
        },
        getQuotes() {
            if(this.quotes[this.currentPage]) {
                return
            }
            axiosInstance.get(`/quotes?page=${this.currentPage}`, { params: { per_page: 12, searchTerm: this.searchTerm } })
                .then(response => {
                    const quotes = response.data.data.quotes
                    this.quotes[this.currentPage] = quotes
                    this.totalPages = response.data.data.meta.last
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        deleteQuote() {
            axiosInstance.delete(`/quotes/${this.selectedQuote.id}`)
                .then(response => {
                    const index = _findIndex(this.quotes[this.currentPage], ['id', this.selectedQuote.id])
                    this.quotes[this.currentPage].splice(index, 1);
                    this.closeDeleteModal()
                    this.closeModal()
                    this.alertStore.success('Quote removed')
                })
                .catch(error => {
                    console.log(error)
                    this.alertStore.error(error.response.data.message)
                });
        },
        submitQuote(values) {
            if (this.selectedQuote != null) {
                axiosInstance.put(`/quotes/${this.selectedQuote.id}`, values)
                    .then(response => {
                        const index = _findIndex(this.quotes[this.currentPage], ['id', this.selectedQuote.id])
                        this.quotes[this.currentPage].splice(index, 1, response.data.data)
                        this.closeModal()
                        this.alertStore.success('Quote updated')
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            } else {
                axiosInstance.post('/quotes', values)
                    .then(response => {
                        this.quotes[this.currentPage].push(response.data.data)
                        this.closeModal()
                        this.alertStore.success('Quote added')
                    })
                    .catch(error => {
                        console.log(error)
                        this.alertStore.error(error.response.data.message)
                    });
            }
        },
        onPageChange(page) {
            this.currentPage = page;
            this.getQuotes()
        }
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Inspirational quotes</h3>

            <div class="quotes-btns-wrapper">
                <RouterLink  :to="{ name: 'quotes-mass-add' }" class="add-button">
                    <AddIcon />
                    <button type="button">Add several quotes</button>
                </RouterLink>

                <div class="add-button" @click="showModal(null)">
                    <AddIcon />
                    <button type="button">Add New Quote</button>
                </div>
            </div>
        </div>

        <div class="quotes-wrapper page-bg">
            <div class="quotes-search-wrapper">
                <label class="quotes-search">
                    <input placeholder="Search" type="search" autocomplete="off" v-model="searchTerm">
                    <SearchIcon />
                </label>
            </div>

            <div class="quotes-grid">
                <div class="quotes-grid-item" v-for="quote in quotes[currentPage]">
                    <div class="quotes-grid-item-date">
                        <div>{{ new Date(quote.created_at).format('MM/DD/YYYY') }}</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>{{ quote.text }}</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showModal(quote)">
                        <EditIcon />
                    </div>
                </div>
            </div>

            <pagination
                v-if="totalPages > 1"
                :totalPages="totalPages"
                :currentPage="currentPage"
                @pagechanged="onPageChange"
            />

            <Modal v-show="isModalVisible" @close="closeModal" class="quotes-modal">
                <template #header>{{ selectedQuote? 'Edit Quote': 'Add New Quote' }}</template>
                <template #content>
                    <Form @submit="submitQuote" ref="quoteForm">
                        <div class="popup-content-item popup-content-item--select">
                            <label>Select Patients</label>
                            <VueMultiselect
                                v-model="selectedPatients"
                                :options="optionsPatients"
                                :multiple="true"
                                :close-on-select="false" 
                                search="false"
                                placeholder="Choose Patients" 
                                select-label="Select" 
                                deselect-label="Remove" 
                                :limit="3" 
                                group-values="patients" 
                                group-label="label" 
                                :group-select="true" 
                                select-group-label="Select All" 
                                deselect-group-label="Clear All" 
                                >
                            </VueMultiselect>
                        </div>

                        <div class="popup-content-item popup-content-item--select">
                            <label>Select Patients</label>
                            <VueMultiselect
                                v-model="selectedGroups"
                                :options="optionsGroups"
                                :multiple="true"
                                :close-on-select="false" 
                                search="false"
                                placeholder="Choose Groups" 
                                select-label="Select" 
                                deselect-label="Remove" 
                                :limit="3" 
                                group-values="groups" 
                                group-label="label" 
                                :group-select="true" 
                                select-group-label="Select All" 
                                deselect-group-label="Clear All"  
                                >
                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                            </VueMultiselect>
                        </div>

                        <div class="popup-content-item">
                            <Field as="textarea" placeholder="Write a quote..." name="text" />
                        </div>

                        <div class="popup-footer">
                            <button :type="selectedQuote ? 'button' : 'reset'" class="w-btn w-btn-close"
                                :class="selectedQuote ? 'w-btn-delete' : 'w-btn-close'"
                                @click="selectedQuote ? showDeleteModal() : closeModal()">
                                {{ selectedQuote? 'Delete': 'Cancel' }}
                            </button>
                            <button type="submit" class="w-btn">
                                Save
                            </button>
                        </div>
                    </Form>
                </template>
            </Modal>
            <!-- delete modal -->
            <DeleteModal v-show="isDeleteModalVisible" @close="closeDeleteModal" @delete="deleteQuote">
                <template #content>
                    <h4>Delete this quote?</h4>
                    <p>You will not be able to recover it</p>
                </template>
            </DeleteModal>
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>