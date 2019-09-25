<template>
  <div>
    <div class="mgb-2-px" v-for="(answer, index) in answers.slice(0,2)" :key="index">
      <div class="answers pady-1 padx-2 bg-lightdient">
        <p class="fs-18">{{ answer.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswersList",
  props: {
    answers: Array
  }
};
</script>

<style>
.answers {
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr auto;
}
</style>