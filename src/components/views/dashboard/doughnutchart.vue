<template>
    <Doughnut
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData || {}"
    />
  </template>
  
  <script>
  import { Doughnut } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)
  
  // variables
  const goal = 140; 
  const donations = 400;
  
  
  export default {
    name: 'DoughnutChart',
    components: { Doughnut },

    
    data() {
      return {
        chartData: {
          labels: [ 'Goal', 'Donations' ],
          datasets: [{
            label: 'Money',
            data: [goal, donations],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
          }]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }
  </script>
