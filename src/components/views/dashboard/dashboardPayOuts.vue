<template>
    <div class="con m-2 p-3">
        <h3>Your Payouts: </h3>
        <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Create a payout</button>

        <div class="table mb-4" style="width: 80vw;">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Receiver</th>
                        <th scope="col">Summ</th>
                        <th scope="col">Timestamp</th>
                        <th scope="col">Progress</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="payouts in payoutsLists" :key="payouts.id">
                        <th scope="row">{{ payouts.id }}</th>
                        <td>{{ payouts.receiver }}</td>
                        <td>{{ payouts.amount }}$</td>
                        <td>{{ payouts.timestamp }}</td>
                        <td>
                          <span v-if="payouts.status === 0" class="badge text-bg-danger px-4 py-2">{{ payouts.status }}</span>
                          <span v-else class="badge text-bg-success px-4 py-2">{{ payouts.status }}</span>
                        </td>
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
                        <form @submit.prevent="submitPayout">
                            <div class="mb-3">
                              <label for="receiver" class="form-label">Send Payout to:</label>
                              <input v-model="newPayout.receiver" type="text" class="form-control" placeholder="Receiver" aria-label="receiver">
                            </div>
                            <div class="mb-3">
                                <label for="amount" class="form-label">Sum:</label>
                                <input v-model="newPayout.amount" type="text" class="form-control" default="10" placeholder="10$" aria-label="amount">
                            </div>
                            <button type="submit" class="btn btn-primary">Save payout</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            payoutsLists: [],
            newPayout: { receiver: '', amount: '' }
        };
    },
    mounted() {
        this.fetchPayouts();
    },
    methods: {
        async fetchPayouts() {
            try {
                const userId = this.$route.params.id; 
                if (!userId) {
                    console.error("User ID is missing in route parameters!");
                    return;
                }

                const response = await axios.get(`http://localhost:3000/dashboardPayouts`, {
                    params: { username: userId } 
                });

                if (response.status !== 200) throw new Error('Failed to fetch payouts');

                this.payoutsLists = response.data;
            } catch (error) {
                console.error("Error fetching payouts:", error);
                
            }
        },

        async submitPayout() {
          try {
              const sender = this.$route.params.id;
              console.log("Submitting payout from sender:", sender);

              if (!sender) {
                  console.error("Sender username is missing in route parameters!");
                  return;
              }

              const response = await axios.post('http://localhost:3000/payouts', {
                  sender: sender,  
                  receiver: this.newPayout.receiver, 
                  amount: this.newPayout.amount
              });

              console.log("Payout Response:", response.data);
              this.fetchPayouts(); // Refresh the payouts list after submission
          } catch (error) {
              console.error('Error submitting payout:', error);
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

