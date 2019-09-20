<template>
  <div id="app">
    <Navbar />
    <router-view class="container main-view" />
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>
<style>
@import url("./assets/css/style.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
@media (max-width: 600px) {
  .main-view {
    padding-top: 60px;
  }
}
</style>
