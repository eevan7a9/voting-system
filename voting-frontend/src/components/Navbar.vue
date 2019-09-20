<template>
  <div id="nav" class="bg-violetdient">
    <div class="container tx-upp fw-bold ls-2">
      <div>
        <router-link to="/" class="nav-item light padx-1">Home</router-link>
        <router-link to="/about" class="nav-item light padx-1">About</router-link>
      </div>
      <div class="logo">
        <img class="vue-logo" src="../assets/logo.png" width="35px" />
        <span>+</span>
        <img class="laravel-logo" src="../assets/laravel.svg" width="30px" />
      </div>
      <div>
        <router-link to="/" class="nav-item light padx-1">Register</router-link>
        <router-link to="/about" class="nav-item light padx-1">Login</router-link>
        <router-link to="/about" class="nav-item light padx-1">Logout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.nav-item {
  text-decoration: none;
  padding-top: 15px;
  padding-bottom: 15px;
  line-height: 50px;
}
.nav-item:hover {
  background: rgba(194, 176, 213, 0.28);
}
.logo {
  background: #e8dede;
  border-radius: 100%;
  padding: 0 10px;
}
.logo span {
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
</style>