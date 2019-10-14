<template>
  <div>
    <div class="wrapper pady-2 mgt-3 bg-white borad-1">
      <h1 class="login pady-1 padx-2 tx-upp blue">RESET PASSWORD</h1>
      <form @submit="submit">
        <div class="email-container mgt-2 padx-1">
          <label for="email" class="tx-upp padx-1 pady-1">Email</label>
          <input
            type="email"
            class="fs-20 padx-1 borad-2"
            v-model="user_email"
            id="email"
            placeholder="Email Address"
          />
          <p class="red mgt-1 fs-small tx-upp" v-if="error.email">Error : Email Invalid</p>
        </div>
        <div class="password-container mgt-2 padx-1">
          <label for="password" class="tx-upp padx-1 pady-1">new password</label>
          <input
            type="password"
            class="fs-20 padx-1 borad-2"
            v-model="password.new"
            id="password"
            placeholder="NEW PASSWORD"
          />
          <p
            class="red mgt-1 fs-small tx-upp"
            v-if="error.new"
          >Error : new password must be atleast 6 char long</p>
        </div>
        <div class="password-container mgt-2 padx-1">
          <label for="password" class="tx-upp padx-1 pady-1">confirm password</label>
          <input
            type="password"
            class="fs-20 padx-1 borad-2"
            v-model="password.confirm"
            id="password"
            placeholder="CONFIRM PASSWORD"
          />
          <p
            class="red mgt-1 fs-small tx-upp"
            v-if="error.confirm"
          >Error : password confirmation failed</p>
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
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "UpdatePassword",
  props: {
    token: String,
    email: String
  },
  data() {
    return {
      user_email: "",
      password: {
        new: "",
        confirm: ""
      },
      error: {
        email: 0,
        new: 0,
        confirm: 0
      }
    };
  },
  methods: {
    ...mapActions(["showAlert", "onLoader", "offLoader"]),
    validEmail(email) {
      let re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    validate() {
      this.error.email = this.validEmail(this.user_email) ? 0 : 1;
      this.error.new = this.password.new.trim().length < 6 ? 1 : 0;
      this.error.confirm = this.password.confirm != this.password.new ? 1 : 0;
    },
    submit() {
      this.onLoader();
      this.validate();
      if (!this.error.new && !this.error.confirm && !this.error.email) {
        axios
          .post("password/reset", {
            token: this.token,
            email: this.user_email,
            password: this.password.new,
            password_confirmation: this.password.confirm
          })
          .then(res => {
            this.showAlert({
              message: res.data.message,
              error: false
            }).then(() => {
              this.offLoader();
              this.$router.push({ name: "login" });
            });
          })
          .catch(err => {
            const alert = [];
            if (err.response.data.errors) {
              for (const key in err.response.data.errors) {
                if (err.response.data.errors.hasOwnProperty(key)) {
                  const element = err.response.data.errors[key];
                  alert.push({
                    message: element[0],
                    error: true
                  });
                }
              }
            } else {
              alert.push({
                message: err.response.data.error,
                error: true
              });
            }
            this.showAlert(alert).then(() => this.offLoader());
          });
      } else {
        this.offLoader();
      }
    }
  },
  created() {
    this.user_email = this.email;
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
  grid-template-columns: minmax(100px, 250px) 1fr;
  padding-right: 50px;
}
p {
  grid-column: 2/3;
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