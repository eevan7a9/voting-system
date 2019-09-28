<template>
  <div class="question-options">
    <ul>
      <li class="padx-1 pady-1 pointer" @click="editQuestion">
        <img src="../../assets/edit.svg" alt="edit" />
      </li>
      <li class="padx-1 pady-1 pointer" @click="remove">
        <img src="../../assets/trash.svg" alt="delete" />
      </li>
      <li class="padx-1 pady-1 pointer" @click="reportQuestion">
        <img src="../../assets/flag.svg" alt="report" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "QuestionOptions",
  props: {
    question_id: Number
  },
  methods: {
    ...mapActions(["deleteQuestion"]),
    editQuestion() {
      this.$emit("edit");
    },
    remove() {
      // Removing the question and all it's answers
      const answer = confirm("Are you sure you want to Delete this question?");
      answer
        ? this.deleteQuestion(this.question_id).then(() => {
            this.$router.push({ name: "home" });
          })
        : "";
    },
    reportQuestion() {
      alert("Are you sure you want to Report this question?");
    }
  }
};
</script>

<style>
.question-options ul {
  display: flex;
  list-style: none;
  justify-content: flex-end;
}
</style>