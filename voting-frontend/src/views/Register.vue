<template>
  <div class="wrapper">
    <div class="register mgt-3 bg-white borad-1">
      <h1 class="pady-1 padx-2 tx-upp blue" style="text-align:center">Register</h1>
      <form @submit="submit">
        <div class="username-container mgt-2 padx-1">
          <label for="username" class="tx-upp padx-1 pady-1">username</label>
          <input
            type="username"
            class="fs-20 padx-1 borad-2"
            v-model="user.username"
            id="username"
            placeholder="USERNAME"
          />
          <p
            class="error red pady-5-px tx-upp"
            v-if="error.username.status"
          >{{ this.error.username.message }}</p>
        </div>

        <div class="email-container mgt-2 padx-1">
          <label for="email" class="tx-upp padx-1 pady-1">email</label>
          <input
            type="email"
            class="fs-20 padx-1 borad-2"
            v-model="user.email"
            id="email"
            placeholder="EMAIL ADDRESS"
          />
          <p class="error red tx-upp" v-if="error.email.status">{{ this.error.email.message }}</p>
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
          <p class="error red tx-upp" v-if="error.password.status">{{ this.error.password.message }}</p>
        </div>
        <div class="confirm-container mgt-2 padx-1">
          <label for="confirm" class="tx-upp padx-1 pady-1">confirm</label>
          <input
            type="password"
            class="fs-20 padx-1 borad-2"
            v-model="user.confirm"
            id="confirm"
            placeholder="CONFIRM PASSWORD"
          />
          <p class="error red tx-upp" v-if="error.confirm.status">{{ this.error.confirm.message }}</p>
        </div>
        <div class="submit-container pady-3">
          <button
            type="submit"
            class="pady-1 padx-2 borad-1 bg-bluedient light fs-20 pointer"
          >Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        confirm: ""
      },
      error: {
        username: {
          status: 0,
          message: "USERNAME be atleast 6 characters long"
        },
        email: {
          status: 0,
          message: "valid EMAIL address required"
        },
        password: {
          status: 0,
          message: "PASSWORD must be atleast 6 characters long"
        },
        confirm: {
          status: 0,
          message: "PASSWORD is not confirmed"
        }
      }
    };
  },
  methods: {
    ...mapActions(["registerUser", "onLoader", "offLoader", "showAlert"]),

    validEmail() {
      let re = /\S+@\S+\.\S+/;
      return re.test(this.user.email);
    },
    validate() {
      this.error.username.status = this.user.username.trim().length < 6 ? 1 : 0;
      this.error.email.status = !this.validEmail() ? 1 : 0;
      this.error.password.status = this.user.password.trim().length < 6 ? 1 : 0;
      this.error.confirm.status =
        this.user.password.trim().length != this.user.confirm.trim().length
          ? 1
          : 0;
    },
    submit(e) {
      e.preventDefault();
      this.validate();
      if (
        !this.error.username.status &&
        !this.error.email.status &&
        !this.error.password.status &&
        !this.error.confirm.status
      ) {
        this.onLoader();
        this.registerUser(this.user).then(res => {
          if (res.errors) {
            // console.log(res, "has error");
            const alert = [];
            for (const key in res.errors) {
              if (res.errors.hasOwnProperty(key)) {
                const element = res.errors[key];
                alert.push({
                  message: element[0],
                  error: true
                });
              }
            }
            this.showAlert(alert);
            this.offLoader();
          } else {
            this.$router.push({ name: "login" }).then(() => this.offLoader());
          }
        });
      }
    }
  }
};
</script>

<style scoped>
input {
  width: 90%;
  border: 3px solid #1583c7;
}
label {
  width: 100%;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.register {
  border: 3px solid #1583c7;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.username-container,
.email-container,
.password-container,
.confirm-container {
  display: grid;
  grid-template-columns: minmax(100px, 150px) 1fr;
  /* grid-template-rows: auto auto; */
}
.username-container label,
.email-container label,
.password-container label,
.confirm-container label {
  text-align: right;
}
.error {
  grid-column-start: 2;
}
.submit-container {
  text-align: center;
}
@media (max-width: 600px) {
  input {
    width: 100%;
    padding: 20px;
    text-align: center;
  }
  .register {
    width: 100%;
  }
  .username-container,
  .email-container,
  .password-container,
  .confirm-container {
    grid-template-columns: 1fr;
  }
  .username-container label,
  .email-container label,
  .password-container label,
  .confirm-container label {
    display: none;
  }
  .error {
    grid-column-start: 1;
  }
}
</style>