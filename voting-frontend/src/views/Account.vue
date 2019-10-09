<template>
  <div class="wrapper mgt-1">
    <div class="creadentials borad-2">
      <div class="inner-creadentials pady-3 padx-2">
        <label class="pady-1 fs-18 fw-bolder ls-1 mgt-1">Username :</label>
        <p class="pady-1 fs-18 ls-1 bg-white mgt-1">{{ current_user.name }}</p>
        <label class="pady-1 fs-18 fw-bolder ls-1 mgt-1">Email Address :</label>
        <p class="pady-1 fs-18 ls-1 bg-white mgt-1">{{ current_user.email }}</p>
        <label class="pady-1 fs-18 fw-bolder ls-1 mgt-1">Joined :</label>
        <p class="pady-1 fs-18 ls-1 bg-white mgt-1">{{ current_user.created_at }}</p>
      </div>
      <div class="settings">
        <div class="inner-setting">
          <label class="padx-1">Reset Password</label>
          <button class="pady-1 fs-18 light borad-1 padx-1 bg-bluedient pointer">Reset Password</button>
        </div>
      </div>
    </div>
    <div class="activity">
      <div class="voted-questions">
        <h1>Questions Here</h1>
      </div>
      <div class="asked-question">
        <h1>Questions Here</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Account",
  computed: {
    ...mapGetters(["current_user"])
  },
  methods: {
    ...mapActions(["getAccountInfo", "onLoader", "offLoader"])
  },
  created() {
    this.getAccountInfo();
  }
};
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.settings button {
}
.creadentials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  background: #fff;
  /* height: 400px;/ */
  border: 3px solid #1583c7;
}
.inner-creadentials {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
}
.inner-creadentials label {
  text-align: right;
}
.inner-creadentials p {
  border-bottom: 3px solid #1583c7;
  text-align: center;
}
.questions-created {
  grid-row: 3/4;
  grid-column-start: 2;
  grid-gap: 10px;
}
.activity {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
@media (max-width: 600px) {
  .creadentials {
    grid-template-columns: 1fr;
    padding-bottom: 20px;
  }
}
</style>