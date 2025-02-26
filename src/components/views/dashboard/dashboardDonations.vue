<template>
    <div class="con m-2 p-3">
        <h3>Your Donations: </h3>

        <div class="cards">

            <div class="card mb-3" >
                <div class="row g-0">
                    <div class="col-md-1">
                        <img src="https://placehold.co/100x200" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">From: {{sender}}</h5>
                        <p class="card-amount">Tipped: {{amount}}</p>
                        <p class="card-text">Donation {{message}}</p>
                        <p class="card-text"><small class="text-body-secondary">{{timestap}}</small></p>
                    </div>
                    </div>
                </div>
            </div>

            <div class="card mb-3" >
                <div class="row g-0">
                    <div class="col-md-1">
                        <img src="https://placehold.co/100x200" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">From: username</h5>
                        <p class="card-amount">Tipped: amount</p>
                        <p class="card-text">Donation message</p>
                        <p class="card-text"><small class="text-body-secondary">timestap</small></p>
                    </div>
                    </div>
                </div>
            </div>

            <div class="card mb-3" >
                <div class="row g-0">
                    <div class="col-md-1">
                        <img src="https://placehold.co/100x200" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">From: username</h5>
                        <p class="card-amount">Tipped: amount</p>
                        <p class="card-text">Donation message</p>
                        <p class="card-text"><small class="text-body-secondary">timestap</small></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'


export default {
    name: "dashboardDonations",
} 

const route = useRoute();
const user = null;
const loading = true;

onMounted(async () => {
  try {
    console.log("Fetching user data for:", route.params.username);

    const response = await fetch(`http://localhost:3000/donationsDashboard?username=${route.params.username}`);
    if (!response.ok) throw new Error('User not found');

    const data = await response.json();
    console.log("Fetched Data:", data); // Check what the backend is sending

    if (!data || data.length === 0) {
      throw new Error('No donations found for this user');
    }

    user.value = data[0]; // Assign the first matching donation
    console.log("User set to:", user.value);
  } catch (error) {
    console.error("Error fetching user:", error);
    user.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>  
.con { 
    background-color: #d3eafc;
    justify-content: center;
    align-items: center;
    border-radius: 12px;

    width: 83vw;
}
</style>