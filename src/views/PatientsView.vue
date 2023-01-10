<script setup>
</script>

<template>
    <div class="wrapper">
        <div class="layout-wrapper">
            <h3>My Patients</h3>
        </div>
        
        <div class="patients-wrapper">
            <div class="patients-top-wrapper">
                <div class="patients-button">
                    Create New Patient Account
                </div>

                <form class="" method="get">
                    <label class="">
                        <input class="patients-input" placeholder="Search Patients" type="search" autocomplete="off">
                    </label>
                </form>

                <select class="patient-select">
                    <option value="">Sort</option>
                    <option value="1">Last visit</option>
                    <option value="2">Age</option>
                    <option value="3">Name A-Z</option>
                    <option value="4">Name Z-A</option>
                </select>
            </div>

            <div class="patients-table">
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Next Appointment</th>
                            <th>Quiz Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="patients-img">
                                <img src="@/assets/img/image.png" alt="">
                                <span>Howard Aarons</span>
                            </td>
                            <td>36</td>
                            <td>December 22, 2022</td>
                            <td>
                                <div class="patients-status incomplete">Incomplete</div>
                            </td>
                            <td class="patients-details">
                                <img src="@/assets/img/details-icon.png" alt="Details Icon" />
                            </td>
                        </tr>

                        <tr>
                            <td class="patients-img">
                                <img src="@/assets/img/image.png" alt="">
                                <span>Howard Aarons</span>
                            </td>
                            <td>36</td>
                            <td>December 22, 2022</td>
                            <td>
                                <div class="patients-status complete">Complete</div>
                            </td>
                            <td class="patients-details">
                                <img src="@/assets/img/details-icon.png" alt="Details Icon" />
                            </td>
                        </tr>

                        <tr>
                            <td class="patients-img">
                                <img src="@/assets/img/image.png" alt="">
                                <span>Howard Aarons</span>
                            </td>
                            <td>36</td>
                            <td>December 22, 2022</td>
                            <td>
                                <div class="patients-status complete">Complete</div>
                            </td>
                            <td class="patients-details">
                                <img src="@/assets/img/details-icon.png" alt="Details Icon" />
                            </td>
                        </tr>

                        <tr>
                            <td class="patients-img">
                                <img src="@/assets/img/image.png" alt="">
                                <span>Howard Aarons</span>
                            </td>
                            <td>36</td>
                            <td>December 22, 2022</td>
                            <td>
                                <div class="patients-status incomplete">Incomplete</div>
                            </td>
                            <td class="patients-details">
                                <img src="@/assets/img/details-icon.png" alt="Details Icon" />
                            </td>
                        </tr>

                        <tr>
                            <td class="patients-img">
                                <img src="@/assets/img/image.png" alt="">
                                <span>Howard Aarons</span>
                            </td>
                            <td>36</td>
                            <td>December 22, 2022</td>
                            <td>
                                <div class="patients-status complete">Complete</div>
                            </td>
                            <td class="patients-details">
                                <img src="@/assets/img/details-icon.png" alt="Details Icon" />
                            </td>
                        </tr>

                        <tr>
                            <td class="patients-img">
                                <img src="@/assets/img/image.png" alt="">
                                <span>Howard Aarons</span>
                            </td>
                            <td>36</td>
                            <td>December 22, 2022</td>
                            <td>
                                <div class="patients-status incomplete">Incomplete</div>
                            </td>
                            <td class="patients-details">
                                <img src="@/assets/img/details-icon.png" alt="Details Icon" />
                            </td>
                        </tr>

                        <tr>
                            <td class="patients-img">
                                <img src="@/assets/img/image.png" alt="">
                                <span>Howard Aarons</span>
                            </td>
                            <td>36</td>
                            <td>December 22, 2022</td>
                            <td>
                                <div class="patients-status complete">Complete</div>
                            </td>
                            <td class="patients-details">
                                <img src="@/assets/img/details-icon.png" alt="Details Icon" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>