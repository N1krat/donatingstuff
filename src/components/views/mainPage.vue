<template>
  <!-- NavBar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img :src="require('@/assets/loli.png')" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
        <b>DonatingStuff</b>
      </a>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/registration"><b>Registration</b></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard"><b>Dashboard</b></router-link>
          </li>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            EN
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">RU</a></li><br>
            <li><a class="dropdown-item" href="#">RO</a></li><br>
            <li><a class="dropdown-item" href="#">DE</a></li>
          </ul>
        </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid" id="con"> 
    <h1>Velcome to DonatingStuff!</h1>
    <h3>Made by me</h3>
    <img :src="require('@/assets/loli.png')" /> 
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

#con { 
  background-color: #9bb186;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* navbar css */
#navbarNav {
  justify-content: flex-end;
}

a { 
  text-decoration: none; 
  padding: 5px;
}

a:hover { 
  box-shadow: #2c3e50;
  background-color: rgb(190, 190, 190); 
}
</style>

