<template>
    <div class="con m-2 p-3">
        <h3>Settings: </h3>

        <div class="form-check form-switch mb-4">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">Dark Theme</label>
        </div>
        
        <h5>Change Language:</h5>
        <select class="form-select mb-2" aria-label="Default select example">
            <option selected>English</option>
            <option value="1">Russian</option>
            <option value="2">German</option>
            <option value="3">Romanian</option>
        </select>
    </div>

    <img :src="require('@/assets/loli.png')">
</template>

<script>
export default {
    name: "dashboardSettings"
}
</script>

<style scoped>  
.con { 
    background-color: #d3eafc;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
}
</style>