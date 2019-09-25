<template>
  <div class="question-options">
    <ul>
      <li class="padx-1 pady-1" @click="editQuestion">
        <img src="../../assets/edit.svg" alt="edit" />
      </li>
      <li class="padx-1 pady-1" @click="deleteQuestion">
        <img src="../../assets/trash.svg" alt="delete" />
      </li>
      <li class="padx-1 pady-1" @click="reportQuestion">
        <img src="../../assets/flag.svg" alt="report" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "QuestionOptions",
  methods: {
    editQuestion() {
      this.$emit("edit");
    },
    deleteQuestion() {
      this.$emit("delete");
    },
    reportQuestion() {
      this.$emit("report");
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