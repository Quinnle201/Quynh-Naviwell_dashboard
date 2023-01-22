<script>
  import { Chart } from 'chart.js'
  import LineChartData from '../../../line-data.js'
  
  export default {
    name: 'LineChart',
    data() {
      return {
        LineChartData: LineChartData
      }
    },
    mounted() {
      const ctx = document.getElementById('Line-chart');
      new Chart(ctx, this.LineChartData);
    }
  }
</script>

<template>
  <div>
  <canvas id="Line-chart" height="120"></canvas>
  </div>
</template>