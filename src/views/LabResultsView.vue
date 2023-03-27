<script>
import SearchIcon from '@/components/icons/IconSearch.vue'
import DownloadIcon from '@/components/icons/IconDownload.vue'
import _findIndex from 'lodash/findIndex';
import _ from 'lodash';
import { Form, Field } from 'vee-validate';

export default {
    components: {
        SearchIcon,
        DownloadIcon,
        Form,
        Field,
    },
};
</script>

<template>
    <div class="page-wrapper">
        <div class="layout-wrapper">
            <h3>Lab results</h3>
        </div>

        <div class="patients-wrapper page-bg">
            <!-- <div class="patients-top-wrapper">
                <div class="patient-search-wrapper">
                    <form class="" method="get">
                        <label class="patients-search search-input">
                            <input placeholder="Search" type="search" autocomplete="off" v-model="searchTerm">
                            <SearchIcon />
                        </label>
                    </form>

                    <select v-model="selected" class="patient-select">
                        <option disabled value="">Sort</option>
                        <option v-for="option in options" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
            </div> -->

            <div class="patients-table lab-table">
                <table>
                    <thead>
                        <tr>
                            <th>File</th>
                            <th>Result name</th>
                            <th>Patient</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Blood test</td>
                            <td>John Doe</td>
                            <td>27.03.23</td>
                            <td class="lab-file">
                                <div class="lab-file-inner">
                                    <span>blood-test.pdf</span>
                                    <DownloadIcon class="attach-icon" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>lorem ipsum dolor sit amet consectetur adipiscing elit</td>
                            <td>John Doe</td>
                            <td>27.03.23</td>
                            <td class="lab-file">
                                <div class="lab-file-inner">
                                    <span>lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit.pdf</span>
                                    <DownloadIcon class="attach-icon" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>