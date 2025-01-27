<template> 
<!-- navbar -->
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
          <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- main page -->
<div class="container-fluid mt-5" id="con">  
    <div class="img"> 
        aasfaf
    </div>
    <div class="forms"> 
        asfafa
    </div>
</div>

</template>

<script>
export default {
    name: 'registrationPage',

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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 100%;

}

.forms { 
    display: flex;
    flex-direction: column;
    background-color: #56638A
}

</style>
