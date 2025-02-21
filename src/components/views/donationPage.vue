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
  <div class="container p-3 mt-2"> 
    <h2>Donations</h2>
    <h3 v-if="user">Donate to {{ username }}</h3>
    <h3 v-else>Loading...</h3>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();
const user = ref(null);
const loading = ref(true);

const username = ref(route.params.username);

onMounted(async () => {
  try {
    console.log("Fetching user data for:", route.params.username);

    const response = await fetch(`http://localhost:3000/donations?username=${route.params.username}`);
    if (!response.ok) throw new Error('User not found');

    const data = await response.json();

    if (Array.isArray(data) && data.length === 0) {
      throw new Error('User not found');
    }

    user.value = Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Error fetching user:", error);
    user.value = null;
    // Optional: Redirect to another page or show a custom message
    // router.push('/404');  // Uncomment to redirect if the user is not found
  } finally {
    loading.value = false;
  }
});
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

/* Main Container */
.container { 
  color: white;
  border-radius: 10px;
  background-color: #56638A;
}
</style>
