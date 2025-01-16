<template> 
    <div class="container"> 
        
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
    .registrationPage {
        background-color: #f5f5f5;
    }
    
    .container { 
        display: flex;
        text-align: center;
        align-items: center;
        justify-self: center;
    }
</style>
