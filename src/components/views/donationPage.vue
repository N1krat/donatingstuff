<template> 
  <!-- NavBar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
    <div class="container-fluid" id="navbar">
      <router-link class="navbar-brand" to="/" style="color: white">
        <img :src="require('@/assets/loli.png')" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
        DonatingStuff
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

  <!-- Main Page -->
  
  <div class="container d-flex flex-column p-3 mt-2"> 
    <div class="row">
      <img src="https://placehold.co/150x150" class="pfp col-2" alt="pfp">
      <div class="col-12">
        <h3 v-if="user">Donating to: {{ username }}</h3>
        <h3 v-else>Loading...</h3>

        <!-- input form -->
        <form @submit.prevent="submitDonation" class="row g-2" novalidate>
          <div class="col-md-4">
            <label  class="form-label">Send as: </label>
            <input v-model="sender" type="text" class="form-control" placeholder="Anonymous">
          </div>
            <label class="form-label">Ammount:</label>
          <div class="input-group">
            <input v-model="amount" type="text" class="form-control" placeholder="10">
            <span class="input-group-text">$</span>
          </div>
          <div class="col-mb-3">
            <label for="message" class="form-label">Message: </label>
            <textarea v-model="message" class="form-control" id="message" rows="3" cols="30" maxlength="200"></textarea>
          </div>
          <div class="col-12">
            <button class="btn btn-primary px-3 pt-2" type="submit">Submit form</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute();
const user = ref(null);
const loading = ref(true);

const sender = ref("");  
const amount = ref(10);
const message = ref("");
const receiver = computed(() => route.params.username);
const username = computed(() => route.params.username);


onMounted(async () => {
  try {
    console.log("Fetching user data for:", route.params.username);

    const response = await axios.get(`http://localhost:3000/donations?username=${route.params.username}`);
    if (response.status !== 200) throw new Error('User not found');

    const data = response.data;
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

const submitDonation = async () => {
  try {
    // Set default values if not provided by the user
    const donationData = {
      sender: sender.value || 'Anonymous',  // Default to 'Anonymous' if no sender
      receiver: receiver.value,  
      amount: Number(amount.value),
      message: message.value || 'No message',  // Default to 'No message' if no message
    };

    const response = await axios.post('http://localhost:3000/donations', donationData);
    console.log(response.data);
  } catch (error) {
    console.error('Error submitting donation:', error);
  }
};

</script>

<style> 
/* Navbar */
#navbar { 
  background-color: #56638A;
  margin: 0;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
}

#navbarNav {
  justify-content: flex-end;
}

.nav-link { 
  text-decoration: none; 
  color: white; 
  padding: 10px; 
}

.nav-link:hover { 
  box-shadow: #2c3e50;
  color: black;
  background-color: rgb(190, 190, 190); 
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}

/* Main content */
.container { 
  color: white;
  border-radius: 10px;
  background-color: #56638A;
  display: flex;
}

.pfp { 
  border-radius: 10px;
  height: 150px;
  margin: 5px;
}
</style>

