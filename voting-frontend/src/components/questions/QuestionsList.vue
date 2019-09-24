<template>
  <div>
    <div
      class="wrapper bg-bluedient mgt-1 mgb-2"
      v-for="(question, index) in allQuestions"
      :key="index"
    >
      <div class="question-cont bg-lightdient dark pady-1 padx-2" :id="question.id">
        <h2>{{ question.title }}</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <hr />
      <div
        class="answers-cont mgb-2-px"
        v-for="(answer, index) in question.answers.slice(0,2)"
        :key="index"
      >
        <div class="answers pady-1 padx-2 bg-lightdient">
          <p class="fs-18">{{ answer.title }}</p>
          <input type="radio" :name="question.id" id />
        </div>
      </div>
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
import { mapGetters } from "vuex";
export default {
  name: "QuestionsList",
  props: {
    scrollInto: String
  },
  data() {
    return {
      radio_name: "this"
    };
  },
  computed: mapGetters(["allQuestions"]),
  methods: {
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
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.wrapper {
  border: 3px solid #1583c7;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.question-cont {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
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