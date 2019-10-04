<template>
  <div>
    <div class="wrapper padx-1 pady-2 mgt-3 mgb-2 borad-1 bg-lightdient">
      <h2 class="reminder tx-upp pady-1" v-show="!edit_mode">Vote Wisely!!!</h2>
      <h2 class="edit-mode green tx-upp pady-1" v-show="edit_mode">Edit Mode :</h2>
      <QuestionOptions
        class="option-icons"
        v-show="!edit_mode"
        @edit="edit"
        :question="question_detail"
        :user="current_user"
      />
      <div class="question-cont dark pady-1 padx-2" v-show="!edit_mode">
        <h2>{{ question_detail.title }}</h2>

        <p class="ls-2 pady-2">{{ question_detail.description }}</p>
      </div>
      <!-- Edit Question Starts -->
      <QuestionEdit
        :question="{id:question_detail.id, title:question_detail.title, description:question_detail.description}"
        v-if="edit_mode"
      />
      <!-- Edit Question Ends -->
      <div
        class="answers-cont mgt-1"
        v-for="(answer, index) in question_detail.answers"
        :key="index"
      >
        <!-- We iterate the answers -->
        <AnswersItem
          :answer="answer"
          :user="current_user"
          :selected_answer="selected_answer"
          :disable_radio="disable_radio"
          @selectedAnswer="setSelected"
          @disableSubmit="disableSubmit"
          v-if="!edit_mode"
        />
        <!-- End of iteration -->
        <!-- Edit Answers Starts -->
        <AnswerEdit :answer="answer" v-if="edit_mode" />
        <!-- Edit Answers Ends -->
      </div>
      <!-- Add Answers Starts -->
      <AnswerAdd :question_id="question_detail.id" @newAnswer="addChoice" v-if="edit_mode" />
      <!-- Add Answers Ends -->
      <div class="buttons-container pady-3" v-show="!edit_mode">
        <button
          @click="cancel"
          class="cancel pady-1 padx-2 fs-18 fw-bold borad-1 dark bg-lightdient tx-cap pointer"
        >cancel</button>
        <button
          v-if="!disable_btn"
          class="submit pady-1 padx-2 fs-18 fw-bold borad-1 light bg-bluedient tx-cap pointer"
          @click="submit"
        >Submit</button>
        <button
          v-if="disable_btn"
          class="disable-submit pady-1 padx-2 fs-18 fw-bold borad-1 light bg-bluedient tx-cap pointer"
        >Submit</button>
      </div>
      <!-- Edit Buttons Starts -->
      <div class="buttons-container pady-1">
        <button
          @click="exitEditMode"
          v-show="edit_mode"
          class="pady-1 padx-2 fs-18 fw-bold borad-1 light bg-reddient tx-cap pointer"
        >Exit Edit Mode</button>
      </div>
      <!-- Edit Buttons Ends -->
    </div>
  </div>
</template>

<script>
import AnswersItem from "../components/answers/AnswersItem";
import AnswerEdit from "../components/answers/AnswerEdit";
import AnswerAdd from "../components/answers/AnswerAdd";
import QuestionOptions from "../components/questions/QuestionOptions";
import QuestionEdit from "../components/questions/QuestionEdit";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Details",
  components: {
    QuestionEdit,
    QuestionOptions,
    AnswersItem,
    AnswerEdit,
    AnswerAdd
  },
  props: {
    questionId: Number
  },
  data() {
    return {
      selected_answer: {},
      edit_mode: false,
      disable_btn: false,
      disable_radio: false
    };
  },
  computed: mapGetters(["question_detail", "current_user", "is_login"]),
  methods: {
    ...mapActions([
      "onLoader",
      "offLoader",
      "getQuestionDetails",
      "resetQuestionDetails",
      "addVote",
      "showAlert"
    ]),
    cancel() {
      // Return to Home
      this.$router.push({
        name: "home",
        params: { scrollInto: `${this.question_detail.id}` }
      });
    },
    setSelected(answer) {
      this.selected_answer = answer;
    },
    disableSubmit() {
      //  created() method of answer lists will $emit an event if user ID is found in votes
      // will disable  submit button and radio if user already voted
      this.disable_btn = true;
      this.disable_radio = true;
    },
    submit() {
      // Submittinga Vote
      if (!this.selected_answer) {
        alert("you have not selected any of the choices");
      } else {
        const vote = {
          answer_id: this.selected_answer.id,
          user_id: this.current_user.id,
          question_id: this.question_detail.id
        };
        this.onLoader();
        this.addVote(vote).then(() => {
          this.disable_btn = true; // after vote is successfull
          this.disable_radio = true; // we disable submit and radio
          this.offLoader();
        });
      }
    },
    exitEditMode() {
      this.edit_mode = false;
      this.saved = false;
    },
    edit() {
      this.edit_mode = !this.edit_mode;
    },
    addChoice(answer) {
      this.question_detail.answers.push(answer);
    }
  },
  created() {
    this.onLoader();
    this.getQuestionDetails(this.questionId).then(() => this.offLoader());
    if (!this.is_login) {
      this.disableSubmit();
      const content = {
        message: `Ooops only "Logged in" users are allowed to vote.`,
        error: 1
      };
      this.showAlert(content);
    }
  },
  destroyed() {
    this.resetQuestionDetails();
  }
};
</script>

<style scoped>
.wrapper {
  border: 3px solid #1583c7;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.option-icons {
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
}
.reminder {
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}
.question-cont {
  border: 3px solid #1583c7;
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  background: white;
}
.answers {
  border: 3px solid #1583c7;
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr auto auto;
}
.buttons-container {
  display: flex;
  justify-content: space-around;
}
.edit-mode {
  width: 100%;
  text-align: center;
}
.cancel,
.submit {
  border: 1px solid #5ab4ec;
}
.submit:hover {
  background: #1583c7;
}
.disable-submit {
  cursor: not-allowed;
  background: grey;
  border: 0;
}
.disable-submit:hover {
  cursor: not-allowed;
  background: rgb(107, 107, 107);
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
  .edit-mode {
    padding: 0;
  }
}
</style>