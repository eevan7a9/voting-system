<template>
  <div id="nav" class="bg-purpledient">
    <div class="container tx-upp fw-bold ls-2">
      <div class="left-nav">
        <router-link to="/" class="nav-item light padx-1">Home</router-link>
        <router-link to="/about" class="nav-item light padx-1">About</router-link>
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
      <div class="right-nav">
        <router-link to="/register" class="nav-item light padx-1">Register</router-link>
        <router-link to="/login" class="nav-item light padx-1">Login</router-link>
        <router-link to="/about" class="nav-item light padx-1">Logout</router-link>
      </div>
    </div>
    <div
      class="mobile-nav bg-purpledient tx-upp fw-bold ls-2"
      :style="mobile_nav ? 'display:flex;' : 'display:none;'"
      @click="NavTrigger"
    >
      <router-link to="/" class="nav-item light padx-1">Home</router-link>
      <router-link to="/about" class="nav-item light padx-1">About</router-link>
      <router-link to="/register" class="nav-item light padx-1">Register</router-link>
      <router-link to="/login" class="nav-item light padx-1">Login</router-link>
      <router-link to="/about" class="nav-item light padx-1">Logout</router-link>
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
  methods: {
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
}
.container {
  display: flex;
  justify-content: space-between;
}
.nav-item {
  text-decoration: none;
  padding-top: 15px;
  padding-bottom: 15px;
  line-height: 60px;
}
.nav-item:hover {
  background: rgba(194, 176, 213, 0.28);
}
.logo {
  background: #e8dede;
  border-radius: 100%;
  padding: 0 10px;
  max-width: 100px;
}
.center-nav span {
  padding-bottom: 20px;
  position: absolute;
  font-size: 25px;
  color: blueviolet;
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
  #nav {
    height: 60px;
    position: fixed;
    padding: 5px 0;
    width: 100%;
  }
  .container {
    flex-direction: column;
  }
  .center-nav {
    order: -1;
    display: flex;
    justify-content: space-between;
  }
  .logo {
    width: 100px;
  }
  #hamburger {
    cursor: pointer;
    padding-top: 5px;
  }
  #hamburger div {
    background: aliceblue;
    height: 5px;
    width: 50px;
    margin-top: 5px;
  }
  .left-nav,
  .right-nav {
    display: none;
  }
  .mobile-nav {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh;
  }
}
</style>