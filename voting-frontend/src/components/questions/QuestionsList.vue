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
          <p>{{ question.description }}</p>
        </router-link>
      </div>
      <hr class="blue" />
      <AnswersList :answers="question.answers" />
      <div
        class="more pady-1 padx-2 bg-lightdient fw-bolder mgb-2-px"
        v-if="question.answers.length > 2"
      >...</div>
      <router-link :to="{ name:'details', params:{questionId:question.id}}">
        <div
          class="vote pady-1 padx-2 bg-lightdient fw-bolder pointer"
          v-if="question.answers.length !== 0"
        >Vote Now!</div>
      </router-link>
      <div
        class="vote pady-1 padx-2 bg-lightdient fw-bolder pointer"
        v-if="question.answers.length == 0"
      >None</div>
    </div>
  </div>
</template>

<script>
import AnswersList from "../answers/AnswersList";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "QuestionsList",
  components: {
    AnswersList
  },
  props: {
    scrollInto: String
  },
  computed: mapGetters(["all_questions"]),
  methods: {
    ...mapActions(["getQuestions"]),
    scrollTo(id) {
      document.getElementById(`${id}`).scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center"
      });
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
      this.getQuestions();
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
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.question-container {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.question-container h2:hover {
  color: #1583c7;
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