<template>
  <div>
    <div
      class="answers pady-1 padx-2 light fw-bold"
      v-bind:class="[checked|| selected_answer.id == answer.id? 'active-green' : 'bg-bluedient' ]"
    >
      <p class="fs-18">{{ answer.title }}</p>
      <p class="votes padx-1 fs-18">{{ answer.votes.length }}</p>
      <input
        class="pointer"
        type="radio"
        v-on:change="selectedAnswer"
        :name="answer.question_id"
        :value="answer.id"
        :checked="checked"
        :disabled="disable_radio"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswersItem",
  props: {
    answer: Object,
    user: Object,
    disable_radio: Boolean,
    selected_answer: Object
  },
  data() {
    return {
      checked: false
    };
  },
  methods: {
    selectedAnswer() {
      this.$emit("selectedAnswer", this.answer);
    },
    isVoted() {
      return "bg-bluedient";
    },
    disableSubmit() {
      this.$emit("disableSubmit");
    }
  },
  created() {
    const found_vote = this.answer.votes.find(
      vote => vote.user_id == this.user.id
    );
    if (found_vote) {
      this.checked = true;
      this.disableSubmit();
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
.active-green {
  border: 3px solid #2bb110;
  background: #76e296;
  color: #289c10;
}
</style>