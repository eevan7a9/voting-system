<template>
  <div>
    <div
      class="wrapper bg-bluedient mgt-2 mgb-3"
      v-for="(question, index) in all_questions"
      :key="index"
    >
      <div class="question-container bg-white dark pady-1 padx-2" :id="question.id">
        <!-- <router-link :to="{ name:'details', params:{questionId:question.id}}"> -->
        <div @click="viewQuestion(question.id)">
          <div style="display:flex; justify-content:space-between;">
            <h2 class="mgb-5-px">{{ question.title }}</h2>
            <span>{{question.created_at}}</span>
          </div>
          <p class="ls-2 pady-1">{{ question.description | truncate(150,'...') }}</p>
        </div>
        <!-- </router-link> -->
      </div>
      <hr class="blue" />
      <div v-for="(answer, index) in question.answers.slice(0,2)" :key="index">
        <div class="answers pady-1 padx-2 bg-lightdient">
          <p class="fs-18">{{ answer.title }}</p>
        </div>
        <hr class="blue" />
      </div>
      <div v-if="question.answers.length > 2">
        <div class="more pady-1 padx-2 bg-lightdient fw-bolder">...</div>
        <hr class="blue" />
      </div>
      <router-link :to="{ name:'details', params:{questionId:question.id}}">
        <div
          class="vote pady-1 padx-2 bg-lightdient fw-bolder tx-upp pointer"
          v-if="question.answers.length !== 0"
        >view</div>
      </router-link>
      <div
        class="vote pady-1 padx-2 bg-lightdient fw-bolder pointer"
        v-if="question.answers.length == 0"
      >None</div>
    </div>
    <div class="empty" v-if="all_questions.length === 0">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="124"
          height="124"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-frown"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
        <h1>EMPTY</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "QuestionsList",
  props: {
    scrollInto: String
  },
  computed: mapGetters(["all_questions"]),
  methods: {
    ...mapActions(["getQuestions", "onLoader", "offLoader", "onFilter"]),
    scrollTo(id) {
      if (this.scrollInto != 0) {
        document.getElementById(`${id}`).scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center"
        });
      }
    },
    viewQuestion(id) {
      this.$router.push({ name: "details", params: { questionId: id } });
    }
  },
  mounted() {
    if (this.scrollInto) {
      this.scrollTo(this.scrollInto);
    }
  },
  created() {
    // incase questions are empty
    if (this.all_questions.length < 1) {
      this.onLoader();
      this.getQuestions().then(() => this.offLoader());
    } // fetch questions
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #333;
}
hr {
  max-width: 900px;
  margin: auto;
}
.wrapper {
  margin-right: auto;
  margin-left: auto;
  border: 3px solid #1583c7;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 98%;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}

.question-container {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.question-container > div {
  cursor: pointer;
}
.question-container div h2:hover {
  color: #1583c7;
}
.answers {
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr auto;
}
.vote {
  max-width: 900px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  color: #1583c7;
}
.more {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.empty {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty h1 {
  margin-right: 5px;
}
</style>