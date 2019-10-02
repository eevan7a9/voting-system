<template>
  <div>
    <div class="answers pady-1 padx-2 bg-bluedient light fw-bold">
      <p class="fs-18">{{ answer.title }}</p>
      <p class="votes padx-1 fs-18">{{ answer.votes.length }}</p>
      <input
        class="pointer"
        type="radio"
        v-on:change="selectedAnswer"
        :name="answer.question_id"
        :value="answer.id"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswersItem",
  props: {
    answer: Object
  },
  methods: {
    selectedAnswer() {
      this.$emit("selectedAnswer", this.answer);
    }
  }
};
</script>

<style scoped>
.answers {
  border: 3px solid #1583c7;
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr auto auto;
}
</style>