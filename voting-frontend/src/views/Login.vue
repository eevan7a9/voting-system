<template>
  <div>
    <div class="wrapper pady-2 mgt-3 bg-white borad-1">
      <h1 class="login pady-1 padx-2 tx-upp blue">login</h1>
      <form @submit="submit">
        <div class="email-container mgt-2 padx-1">
          <label for="email" class="tx-upp padx-1 pady-1">email</label>
          <input type="email" class="fs-20" v-model="user.email" id="email" />
        </div>
        <div class="password-container mgt-2 padx-1">
          <label for="password" class="tx-upp padx-1 pady-1">password</label>
          <input type="password" class="fs-20" v-model="user.password" id="password" />
        </div>
        <div class="submit-container pady-2">
          <button
            type="submit"
            class="pady-1 padx-2 borad-1 bg-bluedient light fs-20 pointer"
          >Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script scoped>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["loginUser", "welcomeUser", "authError"]),
    submit(e) {
      e.preventDefault();
      this.loginUser(this.user).then(res => {
        if (res.token) {
          this.welcomeUser();
          this.$router.push("/");
        } else {
          const message = "Oops!!! Sorry, invalid credentials";
          this.authError(message);
        }
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  border: 3px solid #1583c7;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.login {
  text-align: center;
}
.email-container,
.password-container {
  display: grid;
  grid-template-columns: minmax(100px, 150px) 1fr;
  padding-right: 50px;
}
.email-container label,
.password-container label {
  text-align: right;
}
.submit-container {
  text-align: center;
}
.error {
  text-align: center;
}
@media (max-width: 600px) {
  .wrapper {
    width: 100%;
  }
  .email-container,
  .password-container {
    grid-template-columns: 1fr;
  }
  .email-container label,
  .password-container label {
    text-align: center;
  }
}
</style>