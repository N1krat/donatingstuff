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
          <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- main page -->
<div class="container mx-5 mx-auto" id="con">  
    <div class="img"> 
        <img :src="require('@/assets/loli.png')">
    </div>
    <div class="forms"> 
        <h3>Registration</h3>
        <form class="needs-validation" novalidate>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="validationCustom01" placeholder="n1krat" required>
            <label for="floatingInput">Username</label>
            <div class="invalid-feedback">
              You must enter data before submitting.    
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="validationCustom02" placeholder="name@example.com" required>
            <label for="floatingInput">Email address</label>
            <div class="invalid-feedback">
              You must enter data before submitting.
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="validationCustom03" placeholder="Password" required>
            <label for="floatingPassword">Password</label>
            <div class="invalid-feedback">
                You must enter data before submitting.
            </div>
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
              <label class="form-check-label" for="invalidCheck">
                Agree to terms and conditions
              </label>
              <div class="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
        
    </div>
</div>

</template>

<script>
export default {
    name: 'registrationPage',
    mounted() {
      (() => {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
            form.classList.add('was-validated')
          }, false)
        })
      })()
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

</style>
