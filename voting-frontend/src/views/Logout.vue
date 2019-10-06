<template>
  <div>
    <h1>...</h1>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Logout",
  methods: {
    ...mapActions(["logoutUser", "showAlert"])
  },
  created() {
    this.logoutUser().then(res => {
      this.showAlert({
        message: res,
        error: 0
      }).then(() => this.$router.push({ name: "login" }));
    });
  }
};
</script>

<style>
</style>