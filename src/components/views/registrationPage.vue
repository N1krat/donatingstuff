<template> 
<!-- navbar -->
<nav class="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
  <div class="container-fluid" id="navbar">
    <router-link class="navbar-brand" to="/" style="color: white;">
      <img :src="require('@/assets/loli.png')" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
      DonatingStuff
    </router-link>
    
    
  </div>
</nav>

<!-- main page -->
<div class="container" id="con"  style="color: black">  
    <div class="img"> 
      <img :src="require('@/assets/loli.png')" />
    </div>
    <div class="forms"> 
      <h3 style="color: white">Registration</h3>
      <form @submit.prevent="registerUser" class="needs-validation" novalidate>
        <div class="form-floating mb-3">
          <input type="text" v-model="username" class="form-control" id="validationCustom01 floatingInput" placeholder="username" required>
          <label for="floatingInput">Username</label>
          <div class="invalid-feedback">You must enter data before submitting.</div>
        </div>
        <div class="form-floating mb-3">
          <input type="email" v-model="email" class="form-control" id="validationCustom02 floatingInput" placeholder="name@example.com" required>
          <label for="floatingInput">Email address</label>
          <div class="invalid-feedback">You must enter data before submitting.</div>
        </div>
        <div class="form-floating mb-3">
          <input type="password" v-model="password" class="form-control" id="validationCustom03" placeholder="password" required>
          <label for="floatingPassword">Password</label>
          <div class="invalid-feedback">You must enter data before submitting.</div>
        </div>
        <div class="col-12" style="color: white">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="agreeTerms" id="invalidCheck" required>
            <label class="form-check-label" for="invalidCheck">Agree to terms and conditions</label>
            <div class="invalid-feedback">You must agree before submitting.</div>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal" >Submit</button>
        </div>
        <br>
        <router-link style="color: white" to="/login">Or Log In</router-link>
      </form>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p v-if="message">{{ message }}</p>
            </div>
            <div class="modal-footer" >
              <router-link to="/dashboard" class="btn btn-primary" data-bs-dismiss="modal" @click="$router.push('/dashboard')">Go to Dashboard</router-link>
            </div>
          </div>
        </div>
      </div>
    <!-- 
      //     clearForm() {
    //       this.username = '';
    //       this.email = '';
    //       this.password = '';
    //       this.agreeTerms = false;
    //   }
    // }


    -->


    <!-- main page -->
      





    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'registrationPage',

    data() {
        return {
            username: '',
            email: '',
            password: '',
            agreeTerms: false,
            message: '',
        };
    },
    mounted() {
        (() => {
            'use strict';
            const forms = document.querySelectorAll('.needs-validation');
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        })();
    },
    methods: {
        async registerUser(event) {
            event.preventDefault(); // Prevent default form submission

            if (!this.username || !this.email || !this.password || !this.agreeTerms) {
                this.message = 'All fields are required!';
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                });
                this.message = response.data;
            } catch (error) {
                this.message = error.response?.data || 'Registration failed';
            }
        }
      }
}
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


#con { 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
  gap: 20px;
  padding-left: 150px;
  padding-right: 150px;
  margin-top: 20px;
  
}

.forms { 
    display: flex;
    flex-direction: column;
    background-color: #56638A; 
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
    gap: 15px;
}

@media screen and (max-width: 750px) {
  .img { 
    display: none; 
  }

  #con { 
    padding: 25px;
    margin: 20px;
    margin-right: 20px;
  }
}

</style>
