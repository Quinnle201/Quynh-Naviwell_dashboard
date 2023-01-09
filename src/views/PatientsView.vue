<script setup>
</script>

<template>
    <div class="wrapper">
        <div>
            <h3>My Patients</h3>

            <div class="patients-top-wrapper">
                <div class="patients-button">
                    <a href="#">Create New Patient Account</a>
                </div>

                <form class="" method="get">
                    <label class="">
                        <input class="patients-input" placeholder="Search Patients" type="search" autocomplete="off">
                    </label>
                </form>

                <select class="patient-select">
                    <option value="">Sort</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
        </div>
    </div>
</template>