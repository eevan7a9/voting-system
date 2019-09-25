<template>
  <div id="nav" class="bg-bluedient">
    <div class="container">
      <div class="nav-container bg-bluedient tx-upp fw-bold ls-2">
        <div class="left-nav notTriggerNav" :class="{triggerNav: mobile_nav}">
          <router-link to="/" class="nav-item">
            <div class="light padx-1" @click="NavTrigger">Home</div>
          </router-link>
          <router-link to="/about" class="nav-item">
            <div class="light padx-1" @click="NavTrigger">About</div>
          </router-link>
        </div>
        <div class="center-nav">
          <div class="logo">
            <img class="vue-logo" src="../assets/logo.png" width="35px" />
            <span>+</span>
            <img class="laravel-logo" src="../assets/laravel.svg" width="30px" />
          </div>
          <div id="hamburger" @click="NavTrigger">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="right-nav notTriggerNav" :class="{triggerNav: mobile_nav}">
          <router-link to="/register" class="nav-item">
            <div class="light padx-1" @click="NavTrigger">Register</div>
          </router-link>
          <router-link to="/login" class="nav-item">
            <div class="light padx-1" @click="NavTrigger">Login</div>
          </router-link>
          <router-link to="/about" class="nav-item">
            <div class="light padx-1" @click="NavTrigger">Logout</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      mobile_nav: 0
    };
  },
  mounted() {
    // this will tell us if screen is being resized
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      // window.addEventListener("resize", this.getWindowHeight);

      //Init
      this.getWindowWidth();
      // this.getWindowHeight();
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    getWindowWidth(event) {
      let windowWidth = document.documentElement.clientWidth;
      if (windowWidth < 601) {
        this.mobile_nav = 0;
      }
    },
    // getWindowHeight(event) {
    //   let windowHeight = document.documentElement.clientHeight;
    //   console.log(windowHeight);
    // },
    NavTrigger() {
      this.mobile_nav = !this.mobile_nav;
    }
  }
};
</script>

<style scoped>
#nav {
  -webkit-box-shadow: 4px 9px 14px -8px #000000;
  box-shadow: 4px 9px 14px -8px #000000;
  top: 0;
  position: sticky;
  z-index: 2;
  /* width: 100%; */
}
.nav-container {
  display: flex;
  /* z-index: 0; */
  justify-content: space-between;
}
.nav-item {
  text-decoration: none;
}
.nav-item div {
  padding: 20px;
}
.right-nav,
.left-nav {
  display: flex;
}
.nav-item:hover {
  background: rgba(194, 176, 213, 0.28);
}
.logo {
  background: #e8dede;
  border-radius: 100%;
  padding: 8px 10px;
  max-width: 100px;
  height: 50px;
}
.center-nav {
  /* width: 100px; */
  min-width: 100px;
}
.center-nav span {
  padding-bottom: 20px;
  position: absolute;
  font-size: 25px;
  color: #1583c7;
}
.vue-logo {
  padding: 2px 0;
  margin-right: 0px;
}
.laravel-logo {
  margin-bottom: -5px;
  margin-left: 15px;
}
.mobile-nav {
  display: none;
}

@media (max-width: 600px) {
  .container {
    padding: 0;
  }
  #nav {
    height: 65px;
    padding: 5px 0;
    width: 100%;
  }
  .nav-container {
    flex-direction: column;
    padding: 0;
    height: 0;
  }
  .center-nav {
    order: -1;
    display: flex;
    justify-content: space-between;
  }
  .logo {
    width: 100px;
    padding: 0px;
  }
  #hamburger {
    cursor: pointer;
    padding-top: 5px;
    padding: 10px;
  }
  #hamburger div {
    background: aliceblue;
    height: 5px;
    width: 50px;
    margin-top: 5px;
  }
  .notTriggerNav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background: #1583c7;
    transform: translateX(100%);
    transition: transform 0.5s ease-in-out;
  }
  .triggerNav {
    /* display: block; */
    /* transition-delay: 1s; */
    transform: translateX(0%);
  }
  .nav-item div {
    padding: 50px;
  }
}
</style>