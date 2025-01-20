<template>
  <!-- NavBar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
  <div class="container-fluid" id="navbar">
    <router-link class="navbar-brand" to="/">
      <img :src="require('@/assets/loli.png')" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
      Navbar
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/registration">Registration</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>


  <!-- main page -->
  <div class="container-fluid" id="con"> 
    <div class="cards" id="card1">
      <div class="card-content">
        <div class="text">
        <h3 class="card-title">Card title</h3>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <router-link to="/registration" class="btn btn-primary">Get Started</router-link>
          <router-link href="#" class="btn btn-secondary">Go somewhere</router-link>
        </div>
      </div>
       <div class="card-image">
             <img src="https://placehold.co/400x300" class="card-img-top" alt="...">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainPage',
}

</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.body { 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


/* navbar css */
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

a { 
  text-decoration: none; 
  padding: 5px;
  color: white; 
  padding: 10px; 
  
}

a:hover { 
  box-shadow: #2c3e50;
  color: black;
  background-color: rgb(190, 190, 190); 
}

/* card css */
#card1 { 
  background-color: #56638A;
  margin: 20px;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
  gap: 40px;
  

  
} 


</style>

