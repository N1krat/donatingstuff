<template>
    <div class="con m-2 p-3">
        <h3>Your Payouts: </h3>
        <button class="btn btn-primary mb-3"  data-bs-toggle="modal" data-bs-target="#exampleModal">Create a payout</button>

        <div class="table mb-4" style="width: 80vw;">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Sender</th>
                    <th scope="col">Summ</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Progress</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                        <td>{{ user.username }}</td>
                        <td>$1220.34</td>
                        <td>12.3.2025</td>
                        <td><span class="badge text-bg-success p-2">Success</span></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>{{ user.username }}</td>
                        <td>$343533.34</td>
                        <td>22.3.2025</td>
                        <td><span class="badge text-bg-danger p-2">Warning</span></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>{{ user.username }}</td>
                        <td>$5675.34</td>
                        <td>1.7.2025</td>
                        <td><span class="badge text-bg-success p-2">Success</span></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Future input for payout info
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "dashboardPayouts", 

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
.con { 
  background-color: #d3eafc;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
}

</style>