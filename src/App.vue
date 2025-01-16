<template>
  <div class="con">
  <nav class="nav">
    <RouterLink to="/">HomePage</RouterLink>
    <RouterLink to="/registration">RegistrationPage</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
  </nav>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
.nav { 
  gap: 20px;
  margin: 15px;
}
</style>
