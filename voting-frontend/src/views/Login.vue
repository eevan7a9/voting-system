<template>
  <div class="wrapper">
    <div class="login pady-2 bg-white borad-1">
      <h1 class="pady-1 padx-1 tx-upp blue" style="text-align:center">login</h1>
      <form @submit.prevent="submit">
        <div class="input-container">
          <input
            type="email"
            class="fs-20 padx-1 pady-1 borad-2 mgb-1 mgx-1"
            v-model.trim="user.email"
            id="email"
            placeholder="EMAIL"
          />

          <input
            type="password"
            class="fs-20 padx-1 pady-1 borad-2 mgb-1 mgx-1"
            v-model.trim="user.password"
            id="password"
            placeholder="PASSWORD"
          />
        </div>
        <div class="submit-container pady-2">
          <button
            type="submit"
            class="pady-1 padx-2 borad-1 bg-bluedient light fs-20 pointer"
          >Submit</button>
          <p class="pady-1">
            <router-link to="/password/email" class="blue">Forgot Password?</router-link>
          </p>
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
        email: "user1@gmail.com",
        password: "secret"
      }
    };
  },
  methods: {
    ...mapActions([
      "onLoader",
      "offLoader",
      "loginUser",
      "getUserInfo",
      "showAlert",
      "unverifiedEmail"
    ]),
    submit() {
      this.onLoader();
      this.loginUser(this.user).then(res => {
        if (!res.data.error) {
          const content = {
            message: `Welcome ${this.user.email} and remember, Vote wisely`,
            error: 0
          };
          this.getUserInfo();
          this.showAlert(content).then(() => {
            this.$router.push("/").then(() => this.offLoader());
          });
        } else {
          const content = {
            message: res.data.message,
            error: 1
          };
          this.showAlert(content).then(() => {
            if (res.data.error === "email") {
              this.unverifiedEmail(this.user.email);
              this.$router.push({ name: "resendverification" });
            }
            this.offLoader();
          });
        }
      });
    }
  }
};
</script>

<style scoped>
input {
  border: 3px solid #1583c7;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  border: 3px solid #1583c7;
  width: 600px;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
  position: relative;
}
.input-container {
  display: flex;
  flex-direction: column;
}
.input-container input {
  text-align: center;
}
.submit-container {
  text-align: center;
}
.error {
  text-align: center;
}
a {
  text-decoration: none;
}
p {
  width: 200px;
  margin-right: auto;
  margin-left: auto;
}
@media (max-width: 600px) {
  .wrapper {
    padding-top: 2rem;
    display: block;
  }
  .login {
    width: 100%;
  }
}
</style>