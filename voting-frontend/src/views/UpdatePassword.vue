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
            v-model="user.currentPassword"
            id="password"
            placeholder="CURRENT PASSWORD"
          />
        </div>
        <div class="password-container mgt-2 padx-1">
          <label for="password" class="tx-upp padx-1 pady-1">new password</label>
          <input
            type="password"
            class="fs-20 padx-1 borad-2"
            v-model="user.newPassword"
            id="password"
            placeholder="NEW PASSWORD"
          />
        </div>
        <div class="password-container mgt-2 padx-1">
          <label for="password" class="tx-upp padx-1 pady-1">confirm password</label>
          <input
            type="password"
            class="fs-20 padx-1 borad-2"
            v-model="user.confirmPassword"
            id="password"
            placeholder="CONFIRM PASSWORD"
          />
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
export default {
  name: "UpdatePassword",
  data() {
    return {
      user: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    submit() {
      alert("submit toggled");
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