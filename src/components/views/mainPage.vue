<template>
  <!-- NavBar -->
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
          <router-link class="nav-link" to="/registration">Registration</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>


  <!-- main page -->
  
  <div class="container-fluid" id="con">
    <!-- Card1 -->
    <div class="card text-white position-relative" id="card1">
    <!-- Image -->
    <img src="https://placehold.co/700x300" id="card1-img" class="card-img" alt="...">
    
    <!-- Overlay Content -->
    <div class="card-img-overlay d-flex flex-column m-3 mt-5">
      <h1 class="card-title display-3 fw-bold">Card title</h1> 
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> 
      
      <div> 
        <router-link to="/registration" class="btn btn-primary me-3">Get Started</router-link> 
        <a href="#card4" class="btn btn-secondary" id="how">How it works</a>
      </div> 
    </div> 
  </div>

    <!-- Card2 -->
    <div class="cards" id="card2">
      <div class="card-image">
             <img src="https://placehold.co/700x400" class="card-img-top" alt="...">
        </div>
      <div class="card-content">
        
        <div class="text">
        <h3 class="card-title">Card title</h3>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          
        </div>
      </div>
    </div>

<!-- Card3 -->
  <div class="cards" id="card3">
      <div class="card-content">
        <div class="text">
        <h3 class="card-title">Card title</h3>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          
        </div>
      </div>
       <div class="card-image">
             <img src="https://placehold.co/700x400" class="card-img-top" alt="...">
        </div>
    </div>

    <!-- Card4 -->
    <div class="container text-center mt-4" id="card4">
  <h1 class="mb-3 text-light">How It Works</h1>
  <p class="text-light">Take a look at service's basic features.</p>

  <!-- Feature buttons -->
 <div class="d-flex justify-content-center mb-4">
  <button
    v-for="section in sections"
    :key="section.id"
    :class="['btn', section.id === currentSection ? 'btn-dark text-light' : 'btn-outline-light']"
    @click="currentSection = section.id"
    class="me-2 d-flex align-items-center"
  >
    {{ section.label }}
  </button>
</div>
 
  <!-- Card section -->
  <div class="row align-items-center g-5" id="card-section">
      <!-- Card Image -->
      <div class="col-md-4">
        <div class="card bg-dark text-center text-light border-0">
          <img
            :src="currentCardData.image"
            class="card-img-top rounded-circle mx-auto mt-3"
            alt="Feature Image"
            style="width: 100px;"
          />
          <div class="card-body">
            <h5 class="card-title text-warning">{{ currentCardData.title }}</h5>
            <p class="card-text text-secondary">{{ currentCardData.text }}</p>
          </div>
        </div>
      </div>
      <!-- Description Section -->
      <div class="col-md-8 text-start text-light">
        <h3>{{ currentCardData.descriptionTitle }}</h3>
        <p class="text-white">
          {{ currentCardData.descriptionText }}
        </p>
        <button class="btn btn-primary fw-bold"><router-link to="/registration">Try Now</router-link></button>
      </div>
    </div>
    </div>


    

    <!-- Card5 -->
    <div class="cards" id="card5">
      <div class="card-image">
             <img src="https://placehold.co/700x400" class="card-img-top" alt="...">
        </div>
      <div class="card-content">
        
        <div class="text">
        <h3 class="card-title">Card title</h3>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          
        </div>
      </div>
    </div>


    
    
  </div>

  <div class="footer">
    <h4>Footer</h4>
  </div>
</template>

<script>
export default {
  name: "mainPage",


  data() {
    return {
      currentSection: "donations", // Default section
      sections: [
        { id: "donations", label: "DONATIONS" },
        { id: "subscriptions", label: "SUBSCRIPTIONS" },
        { id: "goals", label: "DONATION GOALS" },
        { id: "poll", label: "POLL" },
        { id: "media", label: "MEDIA" },
      ],
      cardData: {
        donations: {
          image: require("@/assets/loli.png"),
          title: "John Doe - $15",
          text: "Thanks for streaming!",
          descriptionTitle: "Receive Donations",
          descriptionText:
            "Receive donations from viewers and display them on your live broadcast. Customize the appearance of alerts by adjusting many available settings.",
        },
        subscriptions: {
          image: require("@/assets/loli.png"), 
          title: "Subscription Tier 1",
          text: "Thank you for subscribing!",
          descriptionTitle: "Gain Subscriptions",
          descriptionText:
            "Encourage viewers to subscribe and enjoy exclusive benefits while supporting your content creation journey.",
        },
        goals: {
          image: require("@/assets/loli.png"),
          title: "Donation Goal Reached!",
          text: "Congratulations on reaching your goal!",
          descriptionTitle: "Set Donation Goals",
          descriptionText:
            "Set goals for your stream and motivate viewers to contribute. Watch as the progress bar fills!",
        },
        poll: {
          image: require("@/assets/loli.png"),
          title: "Interactive Poll",
          text: "Engage your audience with live polls!",
          descriptionTitle: "Create Live Polls",
          descriptionText:
            "Create interactive polls and let your audience vote in real-time. Make your streams fun and engaging.",
        },
        media: {
          image: require("@/assets/loli.png"), 
          title: "Media Integration",
          text: "Share your media seamlessly.",
          descriptionTitle: "Integrate Media",
          descriptionText:
            "Display media directly on your stream, including videos, images, and more, for better engagement.",
        },
      },
    };
  },
  computed: {
    currentCardData() {
      return this.cardData[this.currentSection] || {
        image: "",
        title: "",
        text: "",
        descriptionTitle: "",
        descriptionText: "",
      };
    },
  }, 

  
    
};

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
  color: white;
  text-decoration: none;
}
.body { 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


/* navbar css */
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

.chooser { 
  box-shadow: #2c3e50;
  color: black;
  background-color: rgb(190, 190, 190); 
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;

}



/* card css */
.cards { 
  background-color: #56638A;
  margin: 20px;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
  gap: 20px;
  padding-left: 50px;
} 

#card1 { 
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
}

.card-img-overlay { 
  color: black;
  width: 30%;
}

#card1Text { 
  display: flex;
  position: relative;
}

#card4 { 
  background-color: #56638A; 
  margin-left: 50px;
  padding: 20px;
  padding-left: 50px;
  padding-right: 50px;

  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
}

#card2 { 
  padding-right: 50px;
  
}

.footer { 
  background-color: #2c3e50;
  margin: 0px; 
  padding: 0px; 
  display: flex; 
  justify-content: center;
  align-items: center;
  color: white;
}

@media only screen and (max-width: 600px) {
  #navbar { 
    background-color: #56638A;
    margin: 0px;
    padding: 10px;
    color: white;
    padding-bottom: 10px;
    padding-top: 3px;

  }

  #con {
    flex-direction: column;
    align-items: center;
    
  }

  .cards {
    flex-direction: column-reverse;
    padding-left: 20px;
    padding-right: 20px;
    margin: 5px;
    margin-top: 20px;
  }

  #how { 
    display: none;
  }

  .card-text, .card-title {
    font-size: 1rem;
  }


 .card-img-overlay {
  position: static;
  width: 85%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
}


#card1 .card-title {
  font-size: 1.2rem;
}

#card1 .card-text {
  font-size: 0.9rem;
} 

#card1 .btn {
  font-size: 0.9rem;
  padding: 15px 20px;
  border-radius: 20px;
}


  #card2 { 
    padding-right: 20px;
  }

  #card4 { 
    display: none;
  }

  #card5 { 
    margin-bottom: 20px;
  }
}




</style>


