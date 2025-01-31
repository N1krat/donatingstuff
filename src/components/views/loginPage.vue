<template> 
  <!-- navbar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
    <div class="container-fluid" id="navbar">
      <router-link class="navbar-brand" to="/" style="color: white;">
        <img :src="require('@/assets/loli.png')" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
        Navbar
      </router-link>
    </div>
  </nav>
  
  <!-- main page -->
  <div class="container mx-5 mx-auto" id="con">  
      <div class="img"> 
        <img :src="require('@/assets/loli.png')" />
      </div>
      <div class="forms"> 
        <h3 style="color: white">Log In</h3>
        <form @submit.prevent="loginUser" class="needs-validation" novalidate>
          <div class="form-floating mb-3">
            <input type="text" v-model="username" class="form-control" id="validationCustom01" placeholder="n1krat" required>
            <label for="floatingInput">Username</label>
            <div class="invalid-feedback">You must enter data before submitting.</div>
          </div>
          <div class="form-floating mb-3">
            <input type="password" v-model="password" class="form-control" id="validationCustom03" placeholder="Password" required>
            <label for="floatingPassword">Password</label>
            <div class="invalid-feedback">You must enter data before submitting.</div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
          <h5 v-if="message" style="color: red">{{ message }}</h5>
          <br>
          <router-link style="color: white" to="/registration">Or Sign In</router-link>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
      name: 'loginPage',
  
      data() {
          return {
              username: '',
              password: '',
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
          async loginUser() {
              const { username, password } = this;
  
              if (!username || !password) {
                this.message = 'All fields are required!';  
                console.log('All fields are required!');
                return;
              }
  
              try {
                  const response = await axios.post('http://localhost:3000/login', { username, password });
                  const { token, user } = response.data;

                  localStorage.setItem('token', token);
                  console.log('Login successful:', user);
                  this.message = '';  // Clear any previous error messages
                  this.$router.push('/dashboard');
              } catch (error) {
                  this.message = error.response ? error.response.data : 'Log in failed';
                  console.log(error.response ? error.response.data : 'Log in failed');
              }

              // Clear form fields
              this.username = '';
              this.password = '';
          },
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
  }
  </style>
