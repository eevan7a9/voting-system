<template>
  <div>
    <div class="wrapper padx-3 pady-2 mgt-2 mgb-2 borad-1 bg-white">
      <h2 class="edit-mode green tx-upp pady-1" v-show="edit_mode">Edit Mode :</h2>

      <div class="question-cont dark pady-1 padx-2" v-show="!edit_mode">
        <h2>{{ question_detail.title }}</h2>
        <p class="ls-2 pady-2">{{ question_detail.description }}</p>
        <viewer class="viewer" :value="question_detail.additional_info" />
      </div>
      <SurveyDetailOptions
        class="option-icons"
        v-show="!edit_mode"
        @edit="edit"
        :question="question_detail"
        :user="current_user"
      />
      <!-- Edit Question Starts -->
      <QuestionEdit
        :question="{id:question_detail.id, title:question_detail.title, description:question_detail.description, additional_info:question_detail.additional_info}"
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
          class="cancel pady-1 padx-2 fs-18 fw-bold borad-1 blue bg-lightdient tx-cap pointer"
        >cancel</button>
        <button
          :disabled="disable_btn"
          class="submit pady-1 padx-2 fs-18 fw-bold borad-1 light bg-bluedient tx-cap pointer"
          @click="submit"
        >
          <span v-if="!disable_btn">Submit</span>
          <span v-if="disable_btn">Voted</span>
        </button>
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
// Importing Viewer for WYSIWYG
import "tui-editor/dist/tui-editor-contents.css";
import "highlight.js/styles/github.css";
import { Viewer } from "@toast-ui/vue-editor";
// viewer imports ends
import AnswersItem from "../components/answers/AnswersItem";
import AnswerEdit from "../components/answers/AnswerEdit";
import AnswerAdd from "../components/answers/AnswerAdd";
import SurveyDetailOptions from "../components/SurveyDetailOptions";
import QuestionEdit from "../components/questions/QuestionEdit";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Details",
  components: {
    QuestionEdit,
    SurveyDetailOptions,
    AnswersItem,
    AnswerEdit,
    AnswerAdd,
    viewer: Viewer // Viewer compnent
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
  computed: mapGetters([
    "question_detail",
    "all_questions",
    "current_user",
    "is_login",
    "onFilter"
  ]),
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
      const found_question = this.all_questions.find(
        question => question.id == this.question_detail.id
      );
      if (!found_question) {
        // we check if the question id exists in the questios lists
        this.question_detail.id = 0; // set id to 0 so we remove the scroll into question
      }
      this.$router.push({
        name: "home",
        params: { scrollInto: `${this.question_detail.id}` }
      });
    },
    setSelected(answer) {
      this.selected_answer = answer;
    },
    disableSubmit() {
      //  created() method of AnswersItem will $emit an event if user ID is found in votes
      // will disable  submit button and radio if user already voted
      this.disable_btn = true;
      this.disable_radio = true;
    },
    submit() {
      if (!this.is_login) {
        this.showAlert({
          message: "You can't vote if you're not logged in",
          error: true
        });
        this.$router.push({ name: "login" });
      } else {
        // Submittinga Vote
        if (!this.selected_answer.id) {
          // if user did not select any answers
          this.showAlert({
            message: "you have not selected any of the choices",
            error: true
          });
        } else {
          const vote = {
            answer_id: this.selected_answer.id,
            user_id: this.current_user.id,
            question_id: this.question_detail.id
          };
          this.onLoader();
          this.addVote(vote).then(res => {
            this.disable_btn = true; // after vote is successfull
            this.disable_radio = true; // we disable submit and radio
            const found_question = this.all_questions.find(
              question => question.id == this.question_detail.id
            );
            if (!found_question) {
              // we check if the question id exists in the questios lists
              this.question_detail.id = 0; // set id to 0 so we remove the scroll into question
            }
            this.showAlert({ message: res }).then(() => this.offLoader());
          });
        }
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
    this.getQuestionDetails(this.questionId).then(() => {
      setTimeout(() => {
        this.offLoader();
      }, 1000);
    });
    if (!this.is_login) {
      // this.disableSubmit();
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
.question-cont {
  border-bottom: 3px solid #1583c7;
  max-width: 100%;
  padding-bottom: 100px;
  margin-right: auto;
  margin-left: auto;
  background: #ffffff;
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
button:disabled {
  cursor: not-allowed;
  border: 3px solid #2bb110;
  background: #76e296;
  color: #289c10;
}
button:disabled:hover {
  background: #76e296;
}
.viewer {
  font-size: 30px;
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
  .wrapper {
    padding-left: 0px;
    padding-right: 0px;
  }
  .question-cont {
    padding: 10px;
  }
  .edit-mode {
    padding: 0;
  }
}
</style>