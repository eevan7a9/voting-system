<template>
  <div>
    <div class="wrapper container mgt-1">
      <div class="creadentials borad-2">
        <div class="inner-creadentials pady-3 padx-1">
          <label class="pady-1 fs-normal fw-bold ls-1 mgt-1 tx-upp">Username :</label>
          <p class="pady-1 fs-18 ls-1 mgt-1">{{ current_user.name }}</p>
          <label class="pady-1 fs-normal fw-bold ls-1 mgt-1 tx-upp">Email :</label>
          <p class="pady-1 fs-18 ls-1 mgt-1">{{ current_user.email }}</p>
          <label class="pady-1 fs-normal fw-bold ls-1 mgt-1 tx-upp">Joined :</label>
          <p class="pady-1 fs-18 ls-1 mgt-1">{{ current_user.created_at }}</p>
        </div>
        <div class="settings">
          <div class="inner-setting">
            <label class="padx-1">Edit Password</label>
            <router-link :to="{name:'updatepassword'}">
              <button class="pady-1 fs-18 light borad-1 padx-1 bg-bluedient pointer">Update Password</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="activity mgt-1">
        <div class="voted-questions pady-2 padx-1">
          <h2 class="pady-1 tx-upp">Recently voted surveys</h2>
          <div class="inner-voted pady-1 padx-5-px">
            <div class="mgt-1 pady1" v-for="(question, index) in current_user.votes" :key="index">
              <router-link :to="{ name:'details', params:{questionId:question.question.id}}">
                <p class="pointer ls-1">{{ question.question.title }}</p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="asked-questions pady-2 padx-1">
          <h2 class="pady-1 tx-upp">Recently asked surveys</h2>
          <div class="inner-asked pady-1 padx-5-px">
            <div
              class="mgt-1 pady1"
              v-for="(question, index) in current_user.questions"
              :key="index"
            >
              <router-link :to="{ name:'details', params:{questionId:question.id}}">
                <p class="pointer ls-1">{{ question.title }}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Account",
  components: {
    Footer
  },
  computed: {
    ...mapGetters(["current_user"])
  },
  methods: {
    ...mapActions(["getUserInfo", "getAccountInfo", "onLoader", "offLoader"])
  },
  created() {
    this.onLoader();
    if (Object.keys(this.current_user).length == 0) {
      // get user's info
      this.getUserInfo().then(() =>
        this.getAccountInfo().then(() => this.offLoader())
      );
    } else {
      this.getAccountInfo().then(() => this.offLoader());
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #333;
}
.wrapper {
  height: 100vh;
}
.settings {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  grid-template-columns: minmax(50px, 200px) auto;
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
  grid-gap: 10px;
}
.activity .voted-questions,
.activity .asked-questions {
  position: relative;
  border: 3px solid #1583c7;
  background: #fff;
}
.inner-voted,
.inner-asked {
  height: 300px;
  overflow: scroll;
  overflow-x: hidden;
  border-bottom: 3px solid #1583c7;
  border-top: 3px solid #1583c7;
}
@media (max-width: 700px) {
  .creadentials {
    grid-template-columns: 1fr;
    padding-bottom: 20px;
  }
  .inner-creadentials label {
    text-align: right;
  }
  .activity {
    grid-template-columns: 1fr;
  }
}
</style>