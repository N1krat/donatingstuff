<template>
  <h3>Dashboard Main</h3>

  <div class="grid-container">
    <div class="grid-item1">
      <h3>Dynamics: </h3>
      <LineChart v-if="loaded" :data="lineChartData" ref="linechart" :chartData="lineChartData" :options="options" />
    </div>

    <div class="grid-item2" style="height: 900px;position:relative; overflow-y: auto;">
      <div id="div2" style="max-height:100%; margin-right: 10px;">
        <div id="div3" style="height:100%; margin-right: 10px;">
          <h4>Donations: </h4>
          <div class="card mb-3" v-for="donation in donationsList" :key="donation.id" Style="box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);">
            <div class="row g-0">
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">From: {{donation.sender}}</h5>
                  <p class="card-amount">Tipped: {{donation.amount}}$</p>
                  <p class="card-text">{{donation.message}}</p>
                  <p class="card-text"><small class="text-body-secondary">{{donation.timestamp}}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- active goals -->
    <div class="grid-item3">
      <h3>Active donation goals: </h3>
      <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#goalModal" style="width: 100%;">Create a goal</button> 
      <DoughnutChart v-if="doughnutChartData" :data="doughnutChartData" :options="options" />
    </div>

    <!-- stats -->
    <div class="grid-item4">
      <h3>Statistics</h3>
      <div class="time d-flex align-items-center"> 
        <p class="mb-0" style="font-weight: bold; font-size: 16px; margin-right: 10px;">Time period: </p>
        <div class="input">
          <select class="form-select" id="inputGroupSelect01">
            <option value="1">Last week</option>
            <option value="2">Last month</option>
            <option value="3">Last year</option>
          </select>
        </div>
      </div>
      <br>
      <div class="donation d-flex align-items-center" style="gap: 12px;"> 
        <p style="font-weight: bold; font-size: 16px;">Donations: </p>
        <h4>{{ totalDonations }}</h4>
      </div>
      <br>
      <div class="subs d-flex align-items-center" style="gap: 12px;">
        <p style="font-weight: bold; font-size: 16px;">Total money made: </p>
        <h4>{{ totalMoney }}</h4>
      </div>
    </div>

  </div>

  <!-- modal for donation goal-->
  <div class="modal fade" id="goalModal" tabindex="-1" aria-labelledby="goalModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="goalModalLabel">Create a donation goal</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <input type="text" class="form-control" id="goalName" placeholder="Goal name"  style="box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="goalAmount" placeholder="Goal amount"  style="box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveModalData()">Save changes</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import LineChart from './linechart.vue';
import DoughnutChart from './doughnutchart.vue';

export default {
  components: {
    LineChart,
    DoughnutChart,
  },

  setup() {
    const donationsList = ref([]);
    const lineChartData = ref(null);
    const doughnutChartData = ref(null);
    const options = ref(null);
    const route = useRoute();
    const loaded = ref(false);

    // getting donations info
    const fetchDonations = async () => {
      try {
        const userId = route.params.id;
        if (!userId) {
          console.error("User ID is missing in route parameters!");
          return;
        } 
        const response = await axios.get(`http://localhost:3000/dashboardDonations?username=${userId}`);

        donationsList.value = response.data;
        localStorage.setItem(`donationsList-${userId}`, JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching donations:", error);

        // Correct retrieval from localStorage
        const storedList = localStorage.getItem(`donationsList-${route.params.id}`);
        if (storedList) {
          donationsList.value = JSON.parse(storedList);
        }
      }
    };

    // getting data for charts 
    const loadChartData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/donationsChart', {
        params: { username: route.params.id }
      });
      const donationsList = response.data;
      const donationsByMonth = {};

      donationsList.forEach(donation => {
        const month = new Date(donation.timestamp).toLocaleString('en-US', { year: 'numeric', month: '2-digit' });
        if (!donationsByMonth[month]) {
          donationsByMonth[month] = 0;
        }
        donationsByMonth[month] += Number(donation.amount);
      });

      // Retrieve and parse the goal amount from localStorage
      const goals = JSON.parse(localStorage.getItem('goals')) || {};
      const goalAmount = parseFloat(goals[route.params.id]?.goalAmount) || 0; // Ensure it's a number

      // Update line chart data
      lineChartData.value = {
        labels: Object.keys(donationsByMonth),
        datasets: [{
          data: Object.values(donationsByMonth),
          tension: 0.4,
          backgroundColor: '#0000FF',
          borderColor: '#4682B4',
          fill: true,
        }]
      };

      // Calculate total donated and remaining amount
      const totalDonated = Object.values(donationsByMonth).reduce((acc, value) => acc + value, 0);
      const remainingAmount = Math.max(0, goalAmount - totalDonated);  // Ensure the remaining amount is non-negative

      // Update doughnut chart data
      doughnutChartData.value = {
        labels: ['Remaining', 'Donated'],
        datasets: [{
          data: [remainingAmount, totalDonated],
          backgroundColor: ['#f3f4f6', '#4caf50'],
        }]
      };

      // Chart options
      options.value = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };

      loaded.value = true;
    } catch (e) {
      console.error(e);
    }
  };




    onMounted(async () => {
      await fetchDonations();
      await loadChartData();
    });

    const totalDonations = computed(() => {
      return donationsList.value.length;
    });

    const totalMoney = computed(() => {
      return donationsList.value.reduce((total, donation) => total + parseFloat(donation.amount), 0).toFixed(2);
    });

    const saveModalData = () => {
      const goalNameInput = document.getElementById('goalName');
      const goalAmountInput = document.getElementById('goalAmount');

      const goalName = goalNameInput.value;
      const goalAmount = goalAmountInput.value;

      const goals = JSON.parse(localStorage.getItem('goals')) || {};
      goals[route.params.id] = {
        goalName,
        goalAmount
      };

      localStorage.setItem('goals', JSON.stringify(goals));
      
    }
    return {
      donationsList,
      fetchDonations,
      lineChartData,
      options,
      totalDonations,
      totalMoney,
      saveModalData,
      loaded, 
      doughnutChartData, // Ensure to return doughnutChartData
    };
  }
};
</script>

<style scoped>  
.grid-container {
  display: grid;
  gap: 10px;
  background-color: #2196F3;
  padding: 10px;
  width: 87vw;
  border-radius: 12px; 
 
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 
    "item1 item1 item2"
    "item3 item4 item2";
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: left;
  padding: 10px;
  border-radius: 10px; 
}
.grid-item1 {
  grid-area: item1;
  width: 100%; 
  max-width: 100%; 
}

.grid-item1 img {
  display: block;
  max-width: 100%; 
  height: 400px;
}

.grid-item2 {
  grid-area: item2;
}

.grid-item3 {
  grid-area: item3;
  width: 100%;
}

.grid-item4 {
  grid-area: item4;
}

@media (max-width: 600px) {
  .grid-container  {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    grid-template-areas: 
      "item1"
      "item2"
      "item3"
      "item4";
  }
}
</style>
