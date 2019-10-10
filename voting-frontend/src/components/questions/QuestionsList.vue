<template>
  <div>
    <div
      class="wrapper bg-bluedient mgt-1 mgb-2"
      v-for="(question, index) in all_questions"
      :key="index"
    >
      <div class="question-container bg-white dark pady-1 padx-2" :id="question.id">
        <router-link :to="{ name:'details', params:{questionId:question.id}}">
          <h2 class="mgb-1">{{ question.title }}</h2>
          <p class="ls-2 pady-1">{{ question.description | truncate(150,'...') }}</p>
        </router-link>
      </div>
      <hr class="blue" />
      <div class="mgb-2-px" v-for="(answer, index) in question.answers.slice(0,2)" :key="index">
        <div class="answers pady-1 padx-2 bg-lightdient">
          <p class="fs-18">{{ answer.title }}</p>
        </div>
      </div>
      <div
        class="more pady-1 padx-2 bg-lightdient fw-bolder mgb-2-px"
        v-if="question.answers.length > 2"
      >...</div>
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
    }
  },
  mounted() {
    if (this.scrollInto) {
      this.scrollTo(this.scrollInto);
    }
  },
  created() {
    // we are using Free limited server resource,
    // we want to get questions from server once
    if (this.all_questions.length < 1) {
      this.onLoader();
      this.getQuestions().then(() => this.offLoader());
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
  border: 3px solid #1583c7;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.question-container {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.question-container h2:hover {
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
</style>