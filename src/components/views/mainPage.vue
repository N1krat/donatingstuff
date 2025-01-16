<template>
  
  <div class="container-fluid" id="con">

    <h1>Velcome to DonatingStuff!</h1>
    <h3>Made by Def4lt</h3>
    <img :src="require('@/assets/loli.png')" /> 
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
 
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
};

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
</style>
