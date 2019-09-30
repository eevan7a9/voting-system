<template>
  <div>
    <div class="wrapper mgt-3 bg-lightdient borad-1">
      <h1 class="register pady-1 padx-2 tx-upp blue">Register</h1>
      <form @submit="submit">
        <div class="username-container mgt-2 padx-1">
          <label for="username" class="tx-upp padx-1 pady-1">username</label>
          <input type="username" class="fs-20" v-model="username" id="username" />
        </div>
        <div class="email-container mgt-2 padx-1">
          <label for="email" class="tx-upp padx-1 pady-1">email</label>
          <input type="email" class="fs-20" v-model="email" id="email" />
        </div>
        <div class="password-container mgt-2 padx-1">
          <label for="password" class="tx-upp padx-1 pady-1">password</label>
          <input type="password" class="fs-20" v-model="password" id="password" />
        </div>
        <div class="confirm-container mgt-2 padx-1">
          <label for="confirm" class="tx-upp padx-1 pady-1">confirm</label>
          <input type="password" class="fs-20" v-model="confirm" id="confirm" />
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
export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirm: "",
      error: {
        username: 0,
        email: 0,
        password: 0
      }
    };
  },
  methods: {
    validEmail() {
      let re = /\S+@\S+\.\S+/;
      return re.test(this.email);
    },
    validate() {
      this.error.username = this.username.trim().length < 6 ? 1 : 0;
      this.error.email = !this.validEmail() ? 1 : 0;
      this.error.password =
        this.password.trim().length < 6 ||
        this.password.trim().length != this.confirm.trim().length
          ? 1
          : 0;
    },
    submit(e) {
      e.preventDefault();
      this.validate();
      if (!this.error.username && !this.error.email && !this.error.password) {
        console.log("no eror");
      } else {
        console.log("has Error");
      }
    }
  }
};
</script>

<style scoped>
.register {
  text-align: center;
}
.wrapper {
  border: 3px solid #1583c7;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.username-container,
.email-container,
.password-container,
.confirm-container {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
}
.username-container label,
.email-container label,
.password-container label,
.confirm-container label {
  text-align: right;
}
.submit-container {
  text-align: center;
}
@media (max-width: 600px) {
  .wrapper {
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
    text-align: center;
  }
}
</style>