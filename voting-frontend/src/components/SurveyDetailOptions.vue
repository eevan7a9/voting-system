<template>
  <div class="question-options">
    <ul>
      <li class="padx-1 dark pady-1">
        <button class="pointer" @click="editQuestion">
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
        <button class="pointer" @click="remove">
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
  name: "SurveyDetailOptions",
  props: {
    question: Object,
    user: Object
  },
  methods: {
    ...mapActions(["deleteQuestion", "showAlert"]),
    editQuestion() {
      if (this.user.id == undefined) {
        this.$swal.fire(
          "Is this your survey?",
          "Please login to continue",
          "question"
        );
      } else if (this.user.id != this.question.user_id) {
        this.$swal.fire(
          "Not allowed to Edit",
          "Only owners of the survey can edit",
          "info"
        );
      } else {
        this.$router.push({
          name: "edit",
          params: { questionId: this.question.id }
        });
      }
    },
    remove() {
      if (this.user.id == undefined) {
        this.$swal.fire(
          "Is this your survey?",
          "Please login to continue",
          "question"
        );
      } else if (this.user.id != this.question.user_id) {
        this.$swal.fire(
          "Not allowed to Delete",
          "Only owners of the survey can Delete",
          "info"
        );
      } else {
        this.$swal
          .fire({
            title: "Delete this Survey?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes!"
          })
          .then(result => {
            if (result.value) {
              this.deleteQuestion(this.question.id).then(res => {
                this.showAlert({
                  message: res,
                  error: 0
                }).then(() => this.$router.push({ name: "home" }));
              });
            }
          });
      }
    },
    reportQuestion() {
      // confirm("Are you sure you want to Report this Survey?");
      if (this.user.id == undefined) {
        this.$swal.fire(
          "Is there something wrong?",
          "Please login to continue",
          "question"
        );
      } else {
        this.$swal
          .fire({
            title: "Report this Survey?",
            text: "Survey will be reviewed.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            // cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          })
          .then(result => {
            if (result.value) {
              /**
               *   Code here....
               *
               *   Functionality is Pending for development
               */
              this.$swal.fire({
                position: "top-end",
                icon: "success",
                title: "Our staff will take a look on this.",
                showConfirmButton: false,
                timer: 2500
              });
            }
          });
      }
    }
  }
};
</script>

<style>
button {
  background: none;
  border: none;
}

.question-options ul {
  display: flex;
  list-style: none;
  justify-content: flex-end;
}
</style>