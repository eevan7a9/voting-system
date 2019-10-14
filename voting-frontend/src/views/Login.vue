<template>
  <div>
    <div class="wrapper pady-2 mgt-3 bg-white borad-1">
      <h1 class="login pady-1 padx-2 tx-upp blue">login</h1>
      <form @submit.prevent="submit">
        <div class="email-container mgt-2 padx-1">
          <label for="email" class="tx-upp padx-1 pady-1">email</label>
          <input
            type="email"
            class="fs-20 padx-1 borad-2"
            v-model="user.email"
            id="email"
            placeholder="EMAIL"
          />
        </div>
        <div class="password-container mgt-2 padx-1">
          <label for="password" class="tx-upp padx-1 pady-1">password</label>
          <input
            type="password"
            class="fs-20 padx-1 borad-2"
            v-model="user.password"
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
        email: "",
        password: ""
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
  border: 3px solid #1583c7;
  width: 70%;
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
label {
  text-align: right;
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
@media (max-width: 800px) {
  label {
    text-align: center;
  }
  input {
    padding: 20px;
    text-align: center;
    width: 100%;
  }
  .email-container,
  .password-container {
    grid-template-columns: 1fr;
    padding: 10px;
  }
}
@media (max-width: 600px) {
  .wrapper {
    width: 100%;
  }
}
</style>