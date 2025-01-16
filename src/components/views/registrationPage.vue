<template> 
    <div class="container-fluid" id="con"> 
        <h1>Registration Page</h1>
        <img :src="require('@/assets/loli.png')" />
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
</style>
