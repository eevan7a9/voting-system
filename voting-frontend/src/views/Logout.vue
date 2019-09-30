<template>
  <div>
    <h1>Logout</h1>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Logout",
  methods: {
    ...mapActions(["logoutUser"])
  },
  created() {
    this.logoutUser().then(() => {
      this.$router.push({ name: "login" });
    });
  }
};
</script>

<style>
</style>