<template>
  <div>
    <div class="wrapper pady-2 mgt-3 bg-white borad-1">
      <h1 class="login pady-1 padx-2 tx-upp blue">UPDATE PASSWORD</h1>
      <form @submit="submit">
        <div class="password-container mgt-2 padx-1">
          <label for="password" class="tx-upp padx-1 pady-1">current password</label>
          <input
            type="password"
            class="fs-20 padx-1 borad-2"
            v-model="password.current"
            id="password"
            placeholder="CURRENT PASSWORD"
          />
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UpdatePassword",
  data() {
    return {
      password: {
        current: "",
        new: "",
        confirm: ""
      },
      error: {
        new: 0,
        confirm: 0
      }
    };
  },
  computed: mapGetters(["current_user"]),
  methods: {
    ...mapActions(["showAlert", "onLoader", "offLoader"]),
    validate() {
      this.error.new = this.password.new.trim().length < 6 ? 1 : 0;
      this.error.confirm = this.password.confirm != this.password.new ? 1 : 0;
    },
    async submit() {
      this.onLoader();
      this.validate();
      if (!this.error.new && !this.error.confirm) {
        await axios
          .post(
            "http://localhost:8000/api/update/password",
            {
              current: this.password.current,
              new: this.password.new,
              new_confirmation: this.password.confirm
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${this.current_user.token}`
              }
            }
          )
          .then(res => {
            this.showAlert({
              message: res.data.message,
              error: false
            }).then(() => {
              this.offLoader();
              this.$router.push({ name: "account" });
            });
          })
          .catch(err => {
            const alert = [];
            for (const key in err.response.data.errors) {
              if (err.response.data.errors.hasOwnProperty(key)) {
                const element = err.response.data.errors[key];
                alert.push({
                  message: element[0],
                  error: true
                });
              }
            }
            this.showAlert(alert).then(() => this.offLoader());
          });
      } else {
        this.offLoader();
      }
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