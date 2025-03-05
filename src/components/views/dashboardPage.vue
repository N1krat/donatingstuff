<template>
  <!-- navbar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
    <div class="container-fluid" id="navbar">
      <router-link class="navbar-brand" to="/" style="color: white;">
        <img :src="require('@/assets/loli.png')" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
        DonatingStuff
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" style="gap: 20px;">
          <li style="margin-top: 13px">
            <h5>Balance: {{ user.balance !== undefined ? user.balance : 'Loading...' }}$</h5> <!-- Ensure user.balance is available -->
          </li>
          <li style="margin-top: 5px">
            <img :src="require('@/assets/loli.png')" alt="Logo" width="40" height="40" class="d-inline-block align-text-top rounded-circle bg-light ms-auto">
          </li>
          <li style="margin-top: 10px">
            <h5 style="display: flex; justify-content: flex-end;">{{ user.username }}</h5>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Log Out</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- main page -->
  <div class="d-flex">
    <nav class="nav flex-column p-3" style="width: 200px; height: 130vh; background-color: #56638A; border-radius: 6px;">
        <router-link v-if="user.username" class="nav-link" :to="`/dashboard/${user.username}`" exact-active-class="active">Dashboard</router-link>
        <router-link v-if="user.username" class="nav-link" :to="`/dashboard/${user.username}/donations`" exact-active-class="active">My Donations</router-link>
        <router-link v-if="user.username" class="nav-link" :to="`/dashboard/${user.username}/payouts`" exact-active-class="active">My Payouts</router-link>
        <router-link v-if="user.username" class="nav-link" :to="`/dashboard/${user.username}/settings`" exact-active-class="active">Settings</router-link>
        <router-link v-if="user.username" class="nav-link" :to="`/dashboard/${user.username}/help`" exact-active-class="active">Help</router-link>
    </nav>

    <div class="p-2 mx-3">
        <router-view></router-view>
    </div>
  </div>

  <div class="footer">
    FOOTER
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'dashboardPage',
  data() {
    return {
      user: { balance: 0, username: '' }, // Ensure user object is initialized
      errorMessage: '', // To store error messages
    };
  },
  created() {
    this.fetchUserData();
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
        
        if (response.data) {
          this.user.username = response.data.username;
          this.user.balance = response.data.balance;
        } else {
          console.log('No user data received');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          if (error.response.status === 401) {
            console.log('Unauthorized: Invalid token');
            this.$router.push('/login');
          } else {
            console.log('Server error:', error.response.data);
            this.errorMessage = 'An error occurred while fetching your data. Please try again later.';
          }
        } else {
          console.log('Unknown error:', error.message);
          this.errorMessage = 'An unknown error occurred. Please check your network connection.';
        }
      }
    }
  }
};
</script>

<style scoped>
#navbar { 
  background-color: #56638A;
  padding: 5px 20px;
  border-radius: 5px;
  color: white;
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
  background-color: rgb(190, 190, 190); 
  color: black;
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}

.active { 
  background-color: rgb(190, 190, 190);
  color: black;
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}

.footer { 
  background-color: #2c3e50;
  display: flex; 
  justify-content: center;
  align-items: center;
  color: white;
  padding: 10px;
}
</style>
