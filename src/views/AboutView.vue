<script setup>
import { ref, onMounted, computed } from 'vue';

import { axiosInstance } from '@/helpers';


const response = ref()

const patients = computed(() => {
  if (response.value) {
    return response.value.patients
  }
})

const age = (dob) => computed(() => Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10));

onMounted(async () => {
  let res = await axiosInstance.get('/patients')
  response.value = res.data
})

</script>

<template>
  <div class="table-responsive">
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(patient, index) in patients">
          <td>{{index}}</td>
          <td>{{patient.user.name}}</td>
          <td>{{age(patient.dob)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
