<template>
  <div class="wrapper">
    <div class="details padx-3 pady-1 mgt-2 mgb-2 borad-1 bg-white">
      <div class="question-cont dark pady-1 padx-2">
        <h2>{{ question_detail.title }}</h2>
        <p class="ls-2 pady-2">{{ question_detail.description }}</p>
        <viewer class="viewer" :value="question_detail.additional_info" />
      </div>
      <div class="option-icons mgt-1">
        <p class="red" v-if="!already_voted">*If you vote you can see the result.</p>
        <p class="green" v-else>*You voted already, you can see the result.</p>
        <SurveyDetailOptions :question="question_detail" :user="current_user" />
      </div>
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
        />
        <!-- End of iteration -->
      </div>

      <div class="buttons-container pady-1">
        <button
          @click="back"
          class="back pady-1 padx-2 fs-18 fw-bold borad-1 blue bg-lightdient tx-cap pointer"
        >back</button>
        <button
          class="submit pady-1 padx-2 fs-18 fw-bold borad-1 light bg-bluedient tx-cap pointer"
          @click="submit"
          v-if="!already_voted"
        >Submit</button>
        <button
          v-else
          class="result pady-1 padx-2 fs-18 fw-bold borad-1 light bg-bluedient tx-cap pointer"
          @click="viewChart"
        >Result</button>
      </div>
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
import SurveyDetailOptions from "../components/SurveyDetailOptions";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "Details",
  components: {
    SurveyDetailOptions,
    AnswersItem,
    viewer: Viewer // Viewer compnent
  },
  props: {
    questionId: Number
  },
  data() {
    return {
      selected_answer: {},
      already_voted: false,
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
    back() {
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
      this.already_voted = true;
      this.disable_radio = true;
    },
    submit() {
      if (!this.is_login) {
        this.$swal
          .fire("Want to Vote?", "Please login to continue", "info")
          .then(() => this.$router.push({ name: "login" }));
      } else {
        // Submittinga Vote
        if (!this.selected_answer.id) {
          // if user did not select any answers
          this.$swal.fire(
            "You cant submit empty!",
            "Please select one of the choices",
            "info"
          );
        } else {
          const vote = {
            answer_id: this.selected_answer.id,
            user_id: this.current_user.id,
            question_id: this.question_detail.id
          };
          this.onLoader();
          this.addVote(vote).then(res => {
            this.already_voted = true; // after vote is successfull
            this.disable_radio = true; // we disable submit and radio
            const found_question = this.all_questions.find(
              question => question.id == this.question_detail.id
            );
            if (!found_question) {
              // we check if the question id exists in the questios lists
              this.question_detail.id = 0; // set id to 0 so we remove the scroll into question
            }
            this.showAlert({ message: res }).then(() => this.offLoader());
            this.viewChart();
          });
        }
      }
    },
    viewChart() {
      this.$router.push({
        name: "chart",
        params: { questionId: this.question_detail.id }
      });
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
.option-icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.option-icons button {
  cursor: pointer;
  padding: 8px 10px;
  border: 2px solid #1583c7;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 7px;
}
.option-icons button:hover {
  background: #b4dffa;
}

.question-cont {
  border-bottom: 3px solid #1583c7;
  max-width: 100%;
  padding-bottom: 100px;
  margin-right: auto;
  margin-left: auto;
  background: #ffffff;
}

.buttons-container {
  display: flex;
  justify-content: space-around;
}

.back,
.submit {
  border: 1px solid #5ab4ec;
}
.submit:hover {
  background: #1583c7;
}
.result {
  border: 3px solid #2bb110;
  background: #76e296;
  color: #289c10;
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
  .details {
    padding-left: 0px;
    padding-right: 0px;
  }
  .question-cont {
    padding: 10px;
  }
}
</style>
