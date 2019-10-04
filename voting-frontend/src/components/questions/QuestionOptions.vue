<template>
  <div class="question-options">
    <ul>
      <li class="padx-1 dark pady-1 pointer">
        <button :disabled="question.user_id != user.id" @click="editQuestion">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-edit"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </li>
      <li class="padx-1 dark pady-1 pointer">
        <button :disabled="question.user_id != user.id" @click="remove">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-trash-2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </li>
      <li class="padx-1 dark pady-1 pointer" @click="reportQuestion">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-flag"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "QuestionOptions",
  props: {
    question: Object,
    user: Object
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
        ? this.deleteQuestion(this.question.id).then(() => {
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
button {
  background: none;
  border: none;
}
button:disabled {
  color: grey;
  cursor: not-allowed;
}
.question-options ul {
  display: flex;
  list-style: none;
  justify-content: flex-end;
}
</style>