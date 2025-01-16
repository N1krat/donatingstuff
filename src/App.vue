<template>
  <div class="con">
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav class="nav">
    <RouterLink to="/">HomePage</RouterLink>
    <RouterLink to="/registration">RegistrationPage</RouterLink>
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
