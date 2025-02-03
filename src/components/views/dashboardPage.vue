<template>
  <!-- navbar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
    <div class="container-fluid" id="navbar">
      <router-link class="navbar-brand" to="/" style="color: white;">
        <img :src="require('@/assets/loli.png')" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
        Navbar
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Log Out</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- main page -->
  <h2 style="margin: 200px;">Velcome, {{ user.username }}</h2>
</template>

<script>
import axios from 'axios';

export default {
  name: 'dashboardPage',
  data() {
    return {
      user: {}, // Make sure user is reactive
      errorMessage: '', // To store error messages
    };
  },
  created() {
    this.fetchUserData();
  },
  watch: {
    // This will reactively update the user when localStorage changes
    '$route': function() {
      this.fetchUserData();
    },
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found, redirecting to login...');
          this.$router.push('/login');
          return;
        }

        console.log('Token found:', token);

        const response = await axios.get('http://localhost:3000/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('User data fetched:', response.data);
        this.user = response.data; // Update user data reactively
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          // Handle specific HTTP status code errors
          if (error.response.status === 401) {
            console.log('Unauthorized: Invalid token');
            this.$router.push('/login');
          } else {
            console.log('Server error:', error.response.data);
            this.errorMessage = 'An error occurred while fetching your data. Please try again later.';
          }
        } else {
          // Handle network errors or other unexpected issues
          console.log('Unknown error:', error.message);
          this.errorMessage = 'An unknown error occurred. Please check your network connection.';
        }
        this.$router.push('/login'); // Redirect to login on error
      }
    }
  }
};
</script>

<style scoped>
#con { 
  background-color: #9bb186;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#navbar { 
  background-color: #56638A;
  margin: 0px;
  padding: 0px;
  color: white;
  padding-bottom: 10px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
}

#navbarNav {
  justify-content: flex-end;
}

.navbar-brand:hover {
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
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
</style>
