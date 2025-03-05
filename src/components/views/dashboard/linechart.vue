<template>
  <Line
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData || {}"
  />
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'lineChart',
  components: { Line },
  data() {
    return {
      chartData: {
        datasets: [{
          label: 'Donations',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1, 
          tension: 0.3, 
          fill: false, 
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

