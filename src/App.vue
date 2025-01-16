<template>
   <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">HomePage</RouterLink>
    <RouterLink to="/registration">RegistrationPage</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

</style>
