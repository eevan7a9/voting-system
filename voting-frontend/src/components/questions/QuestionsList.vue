<template>
  <div>
    <div
      class="wrapper bg-bluedient mgt-1 mgb-2"
      v-for="(question, index) in allQuestions"
      :key="index"
    >
      <div class="question-cont bg-lightdient dark pady-1 padx-2">
        <h2>{{ question.title }}</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <hr />
      <div
        class="answers-cont mgb-2-px"
        v-for="(answer, index) in question.answers.slice(0,2)"
        :key="index"
      >
        <div class="answers pady-1 padx-2 bg-lightdient pointer">
          <p class="fs-18">{{ answer.title }}</p>
          <input type="radio" :name="question.id" id />
        </div>
      </div>
      <div
        class="more pady-1 padx-2 bg-lightdient fw-bolder pointer"
        v-if="question.answers.length > 2"
      >View more</div>
      <div
        class="more pady-1 padx-2 bg-lightdient fw-bolder pointer"
        v-if="question.answers.length == 0"
      >None</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "QuestionsList",
  data() {
    return {
      radio_name: "this"
    };
  },
  computed: mapGetters(["allQuestions"])
};
</script>

<style scoped>
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
.more {
  max-width: 900px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  color: #1583c7;
}
</style>