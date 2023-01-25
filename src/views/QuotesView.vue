<script>
import Modal from '../components/Dashboard/Layout/Modal.vue'
import DeleteModal from '../components/Dashboard/Layout/DeleteModal.vue'
import AddIcon from '../components/icons/IconAdd.vue'
import SearchIcon from '../components/icons/IconSearch.vue'
import EditIcon from '../components/icons/IconEdit.vue'
import VueMultiselect from 'vue-multiselect'

export default {
    components: {
        Modal,
        DeleteModal,
        AddIcon,
        SearchIcon,
        EditIcon,
        VueMultiselect
    }, 
    data() {
        return {
            isModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            selectedPatients: null,
            optionsPatients: ['Howard Aarons', 'Edward Alvarez', 'Emily Atilla'],
            selectedGroups: null,
            optionsGroups: ['Group 1', 'Group 2', 'Group']
        }
    },
    methods: {
        showAddModal() {
            this.isModalVisible = true;
        },
        closeAddModal() {
            this.isModalVisible = false;
        },
        showEditModal() {
            this.isEditModalVisible = true;
        },
        closeEditModal() {
            this.isEditModalVisible = false;
        },
        showDeleteModal() {
            this.isDeleteModalVisible = true;
        },
        closeDeleteModal() {
            this.isDeleteModalVisible = false;
        },
    }
}
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Inspirational quotes</h3>

            <div>
                <div class="add-button" @click="showAddModal">
                    <AddIcon />
                    <button type="button">Add New Quote</button>
                </div> 
            </div>
        </div>

        <div class="quotes-wrapper page-bg">
            <div class="quotes-search-wrapper">
                <label class="quotes-search">
                    <input placeholder="Search" type="search" autocomplete="off">
                    <SearchIcon />
                </label>
            </div>

            <div class="quotes-grid">
                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>A healthy outside starts from the inside.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>The first wealth is health.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>Wellness is a connection of paths: knowledge and action.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>Take care of your body. It's the only place you have to live.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>The mind and body are not separate. What affects one, affects the other.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>Wellness is a connection of paths: knowledge and action.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>The first wealth is health.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>A healthy outside starts from the inside.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>Take care of your body. It's the only place you have to live.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>The first wealth is health.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>A healthy outside starts from the inside.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>

                <div class="quotes-grid-item">
                    <div class="quotes-grid-item-date">
                        <div>12.01.2023</div>
                    </div>
                    <div class="quotes-grid-item-content">
                        <p>Wellness is a connection of paths: knowledge and action.</p>
                    </div>
                    <div class="quotes-grid-item-btn" @click="showEditModal">
                        <EditIcon />
                    </div>
                </div>
            </div>

            <div class="pagination-wrapper">
                <div class="pagination-item pagination-item-arrow-left">
                    <img src="@/assets/img/select-icon.svg" alt="" />
                </div>
                <div class="pagination-item active">1</div>
                <div class="pagination-item">2</div>
                <div class="pagination-item">3</div>
                <div class="pagination-item">...</div>
                <div class="pagination-item">9</div>
                <div class="pagination-item pagination-item-arrow-right">
                    <img src="@/assets/img/select-icon.svg" alt="" />
                </div>
            </div>

            <!-- add modal -->
            <Modal v-show="isModalVisible" @close="closeAddModal">
                <template #header>Add New Quote</template>
                <template #content>
                    <div class="popup-content-item popup-content-item--select">
                        <VueMultiselect
                            v-model="selectedPatients"
                            :options="optionsPatients"
                            :multiple="true"
                            :close-on-select="true"
                            placeholder="Select patient" 
                            >
                        </VueMultiselect>
                    </div>
                    <div class="popup-content-item popup-content-item--select">
                        <VueMultiselect
                            v-model="selectedGroups"
                            :options="optionsGroups"
                            :multiple="true"
                            :close-on-select="true" 
                            placeholder="Select group"
                            >
                        </VueMultiselect>
                    </div>
                    <div class="popup-content-item">
                        <textarea id="textarea" placeholder="Write a quote..."></textarea>
                    </div>

                    <div class="popup-footer">
                        <button type="reset" class="w-btn w-btn-close" @click="closeAddModal">
                            Cancel
                        </button>
                        <button type="submit" class="w-btn">
                            Save
                        </button>
                    </div>
                </template>
            </Modal>
            <!-- edit modal -->
            <Modal v-show="isEditModalVisible" @close="closeEditModal">
                <template #header>Edit Quote</template>
                <template #content>
                    <div class="popup-content-item popup-content-item--select">
                        <VueMultiselect
                            v-model="selectedPatients"
                            :options="optionsPatients"
                            :multiple="true"
                            :close-on-select="true"
                            placeholder="Select patient" 
                            >
                        </VueMultiselect>
                    </div>
                    <div class="popup-content-item popup-content-item--select">
                        <VueMultiselect
                            v-model="selectedGroups"
                            :options="optionsGroups"
                            :multiple="true"
                            :close-on-select="true"
                            placeholder="Select group" 
                            >
                        </VueMultiselect>
                    </div>
                    <div class="popup-content-item">
                        <textarea id="textarea" placeholder="Write a quote..."></textarea>
                    </div>

                    <div class="popup-footer">
                        <button class="w-btn w-btn-delete" @click="showDeleteModal">
                            Delete
                        </button>
                        <button type="submit" class="w-btn">
                            Save
                        </button>
                    </div>
                </template>
            </Modal>
            <!-- delete modal -->
            <DeleteModal v-show="isDeleteModalVisible" @close="closeDeleteModal">
                <template #content>
                    <h4>Delete this quote?</h4>
                    <p>You will not be able to recover it</p>
                </template>
            </DeleteModal>
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>