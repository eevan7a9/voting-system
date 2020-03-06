<template>
  <div class="wrapper">
    <div class="details padx-3 pady-1 mgt-2 mgb-2 borad-1 bg-white">
      <h2 class="edit-mode green tx-upp pady-1">Edit Mode :</h2>

      <!-- Edit Question Starts -->
      <QuestionEdit />
      <!-- Edit Question Ends -->
      <div
        class="answers-cont mgt-1"
        v-for="(answer, index) in question_detail.answers"
        :key="index"
      >
        <!-- Edit Answers Starts -->
        <AnswerEdit :answer="answer" />
        <!-- Edit Answers Ends -->
      </div>
      <!-- Add Answers Starts -->
      <AnswerAdd :question_id="question_detail.id" @newAnswer="addChoice" />
      <!-- Add Answers Ends -->

      <!-- Edit Buttons Starts -->
      <div class="buttons-container pady-1">
        <button
          @click="exitEditMode"
          class="pady-1 padx-2 fs-18 fw-bold borad-1 light bg-reddient tx-cap pointer"
        >Exit Edit Mode</button>
      </div>
      <!-- Edit Buttons Ends -->
    </div>
  </div>
</template>

<script>
import AnswerEdit from "../components/answers/AnswerEdit";
import AnswerAdd from "../components/answers/AnswerAdd";
import QuestionEdit from "../components/questions/QuestionEdit";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Details",
  components: {
    QuestionEdit,
    AnswerEdit,
    AnswerAdd
  },
  props: {
    questionId: Number
  },
  computed: mapGetters(["question_detail", "is_login"]),
  methods: {
    ...mapActions(["onLoader", "offLoader", "getQuestionDetails", "showAlert"]),

    exitEditMode() {
      this.$router.push({
        name: "details",
        params: { questionId: this.questionId }
      });
    },

    addChoice(answer) {
      this.question_detail.answers.push(answer);
    }
  },
  created() {
    this.onLoader();
    this.getQuestionDetails(this.questionId).then(() => {
      setTimeout(() => {
        this.offLoader();
      }, 1000);
    });
    if (!this.is_login) {
      // this.disableSubmit();
      const content = {
        message: `Ooops only "Logged in" users are allowed to edit.`,
        error: 1
      };
      this.showAlert(content);
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  position: relative;
}
.details {
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  border: 3px solid #1583c7;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}

.buttons-container {
  display: flex;
  justify-content: space-around;
}
.edit-mode {
  width: 100%;
  text-align: center;
}

button:disabled {
  cursor: not-allowed;
  border: 3px solid #2bb110;
  background: #76e296;
  color: #289c10;
}
button:disabled:hover {
  background: #76e296;
}

@media (max-width: 600px) {
  textarea {
    padding: 0;
    font-size: 15px;
  }
  input {
    padding: 0;
    font-size: 15px;
  }
  .details {
    padding-left: 0px;
    padding-right: 0px;
  }
  .edit-mode {
    padding: 0;
  }
}
</style>