<script>
  import { Chart } from 'chart.js'
  
  export default {
    name: 'LineChart',
    props: {
      'data': Object
    },
    mounted() {
      const ctx = document.getElementById('Line-chart');
      new Chart(ctx, this.data);
    }
  }
</script>

<template>
  <div>
  <canvas id="Line-chart" height="120"></canvas>
  </div>
</template>