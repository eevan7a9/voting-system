<template>
  <div>
    <div class="wrapper padx-1 pady-2 mgt-3 mgb-2 borad-1 bg-lightdient">
      <div class="question-cont dark pady-1 padx-2">
        <h2>{{ questionDetail.title }}</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <div
        class="answers-cont mgt-1"
        v-for="(answer, index) in questionDetail.answers"
        :key="index"
      >
        <div class="answers pady-1 padx-2 bg-bluedient light fw-bold">
          <p class="fs-18">{{ answer.title }}</p>
          <input type="radio" :name="questionDetail.id" id />
        </div>
      </div>
      <div
        class="vote pady-1 padx-2 bg-lightdient fw-bolder pointer"
        v-if="questionDetail.answers.length == 0"
      >None</div>
      <div class="buttons-container pady-3">
        <button class="cancel pady-1 padx-2 fw-bold borad-1 dark bg-lightdient tx-cap">cancel</button>
        <button class="submit pady-1 padx-2 fw-bold borad-1 light bg-vuedient tx-cap">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Details",
  props: {
    questionId: Number
  },
  computed: {
    ...mapGetters(["questionDetail"])
  },
  methods: {
    ...mapActions(["getQuestionDetails"])
  },
  created() {
    if (this.question) {
      console.log(1);
    } else {
      console.log(0);
    }
    this.getQuestionDetails(this.questionId);
  }
};
</script>

<style scoped>
.wrapper {
  border: 3px solid #1583c7;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.question-cont {
  border: 3px solid #1583c7;
  background: white;
}
.answers {
  border: 3px solid #1583c7;
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr auto;
}
.buttons-container {
  display: flex;
  justify-content: space-around;
}
.cancel,
.submit {
  border: 1px solid #1583c7;
}
</style>