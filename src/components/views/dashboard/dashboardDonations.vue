<template>
    <div class="con m-2 p-3">
        <h3>Your Donations: </h3>

        <div class="cards">
            <div class="card mb-3" v-for="donation in donationsList" :key="donation.id">
                <div class="row g-0">
                    <div class="col-md-1">
                        <img src="https://placehold.co/100x200" class="img-fluid rounded-start" alt="...">
                    </div>
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
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const donationsList = ref([]);
        const route = useRoute();

        const fetchDonations = async () => {
            try {
                const userId = route.params.id; 
                if (!userId) {
                    console.error("User ID is missing in route parameters!");
                    return;
                }

                const response = await axios.get(`http://localhost:3000/dashboardDonations`, {
                    params: { username: userId } 
                });

                donationsList.value = response.data;
                localStorage.setItem(`donationsList-${userId}`, JSON.stringify(response.data));
            } catch (error) {
                console.error("Error fetching donations:", error);

                const storedList = localStorage.getItem(`donationsList-${route.params.id}`);
                if (storedList) {
                    donationsList.value = JSON.parse(storedList);
                }
            }
        };

        onMounted(fetchDonations);

        return {
            donationsList,
            fetchDonations
        };
    }
}

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

