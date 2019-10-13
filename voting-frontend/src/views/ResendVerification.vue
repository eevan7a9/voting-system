<template>
  <div>
    <div class="wrapper pady-2 mgt-3 bg-white borad-1">
      <h1 class="login pady-1 padx-2 tx-upp blue">Email to Verify</h1>
      <form @submit="submit">
        <div class="email-container mgt-2 padx-1">
          <label for="email" class="tx-upp padx-1 pady-1">email</label>
          <input
            type="email"
            class="fs-20 padx-1 borad-2"
            v-model="email"
            id="email"
            placeholder="EMAIL"
          />
        </div>
        <div class="submit-container pady-2">
          <button
            type="submit"
            class="pady-1 padx-2 borad-1 bg-bluedient light fs-20 pointer"
          >Resend</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ResendVerification",
  data() {
    return {
      email: ""
    };
  },
  computed: mapGetters(["email_to_verify"]),
  methods: {
    ...mapActions(["showAlert", "onLoader", "offLoader"]),
    validEmail() {
      let re = /\S+@\S+\.\S+/;
      return re.test(this.email);
    },
    submit() {
      if (this.validEmail()) {
        this.onLoader();
        axios
          .post("email/resend", {
            email: this.email
          })
          .then(res => {
            this.showAlert({
              message: res.data.message,
              error: 0
            });
            if (res.data.success === "verified") {
              this.$router.push({ name: "login" });
            }
            this.offLoader();
          })
          .catch(err => {
            this.showAlert({
              message: err.response.data.message,
              error: 1
            }).then(() => this.offLoader());
          });
      } else {
        alert("email invalid");
      }
    }
  },
  created() {
    this.email = this.email_to_verify;
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
.email-container {
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
@media (max-width: 800px) {
  label {
    text-align: center;
  }
  input {
    padding: 20px;
    text-align: center;
    width: 100%;
  }
  .email-container {
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