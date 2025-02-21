<template>
    <h3>Dashboard Main</h3>
    
    <div class="grid-container">
        <div class="grid-item1">
            <h3>Dynamics: </h3>
            <img src="https://placehold.co/650x400">
        </div>
        <div class="grid-item2 p-2">
          <h4>Donations: </h4>
        </div>
        <div class="grid-item3">
            <h3>Active doantion goals: </h3>
            <img src="https://placehold.co/300x300">
        </div>
        <div class="grid-item4">
            <h3>Statistics</h3>
            <div class="time d-flex align-items-center"> 
              <p class="mb-0" style="font-weight: bold; font-size: 16px; margin-right: 10px;">Time period: </p>
              <div class="input">
                <select class="form-select" id="inputGroupSelect01">
                  <option value="1">Last week</option>
                  <option value="2">Last month</option>
                  <option value="3">Last year</option>
                </select>
              </div>
            </div>
            <br>
            <div class="donation d-flex align-items-center" style="gap: 12px;"> 
              <p style="font-weight: bold; font-size: 16px;">Donations: </p>
              <h4>$200000.34</h4>
            </div>
            <br>
            <div class="subs d-flex align-items-center" style="gap: 12px;">
              <p style="font-weight: bold; font-size: 16px;">Subscriptions: </p>
              <h4>2003 subs</h4>
            </div>
           
            
        </div>

        
    </div>

</template>

<script>
export default {
    name: "dashboardMain"
}
</script>

<style scoped>  
.grid-container {
  display: grid;
  gap: 10px;
  background-color: #2196F3;
  padding: 10px;
  width: 87vw;
  border-radius: 12px; 
 
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 
    "item1 item1 item2"
    "item3 item4 item2";
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: left;
  padding: 10px;
  border-radius: 10px; 
}
.grid-item1 {
  grid-area: item1;
  width: 100%; 
  max-width: 100%; 
}

.grid-item1 img {
  display: block;
  max-width: 100%; 
  height: 400px;
}

.grid-item2 {
  grid-area: item2;
}

.grid-item3 {
  grid-area: item3;
  width: 100%;
}

.grid-item4 {
  grid-area: item4;
}

@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr; 
    grid-template-rows: auto auto auto auto;
    grid-template-areas: 
      "item1"
      "item2"
      "item3"
      "item4";
  }
}
</style>
