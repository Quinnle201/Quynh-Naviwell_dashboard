<script>
import Modal from '../components/Dashboard/Layout/Modal.vue'
import DeleteModal from '../components/Dashboard/Layout/DeleteModal.vue'
import AddIcon from '../components/icons/IconAdd.vue'
import SearchIcon from '../components/icons/IconSearch.vue'
import EditIcon from '../components/icons/IconEdit.vue'
export default {
    components: {
        Modal,
        DeleteModal,
        AddIcon,
        SearchIcon,
        EditIcon
    }, 
    data() {
        return {
            selectedPatients: '',
            isModalVisible: false,
            isEditModalVisible: false,
            isDeleteModalVisible: false,
            options: [
                {
                    text: 'patient 1', value: 'patient 1'
                },
                {
                    text: 'patient 2', value: 'patient 2'
                },
                {
                    text: 'patient 3', value: 'patient 3'
                },
            ],
            selectedGroups: '',
            groups: [
                {
                    text: 'Group', value: 'group'
                },
                {
                    text: 'group', value: 'group'
                },
                {
                    text: 'Group', value: 'group'
                },
            ]
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
                    <div class="popup-content-item">
                        <select v-model="selectedPatients" class="" id="patients-select">
                            <option disabled value="">Select Patients</option>
                            <option v-for="option in options" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                    <div class="popup-content-item">
                        <select v-model="selectedGroups" class="" id="groups-select">
                            <option disabled value="">Select Groups</option>
                            <option v-for="group in groups" :value="group.value">
                                {{ group.text }}
                            </option>
                        </select>
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
                    <div class="popup-content-item">
                        <select v-model="selectedPatients" class="" id="patients-select">
                            <option disabled value="">Select Patients</option>
                            <option v-for="option in options" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                    <div class="popup-content-item">
                        <select v-model="selectedGroups" class="" id="groups-select">
                            <option disabled value="">Select Groups</option>
                            <option v-for="group in groups" :value="group.value">
                                {{ group.text }}
                            </option>
                        </select>
                    </div>
                    <div class="popup-content-item selected-list">
                        <span>Selected Patients:</span>

                        <ul>
                            <li>
                                <span>x</span>
                                John Doe
                            </li>
                            <li>
                                <span>x</span>
                                John Doe
                            </li>
                            <li>
                                <span>x</span>
                                John Doe
                            </li>
                            <li>
                                <span>x</span>
                                John Doe
                            </li>
                        </ul>
                    </div>
                    <div class="popup-content-item selected-list">
                        <span>Selected Groups:</span>

                        <ul>
                            <li>
                                <span>x</span>
                                Group
                            </li>
                            <li>
                                <span>x</span>
                                Group
                            </li>
                            <li>
                                <span>x</span>
                                Group
                            </li>
                        </ul>
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