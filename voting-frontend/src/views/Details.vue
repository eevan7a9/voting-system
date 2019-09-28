<template>
  <div>
    <div class="wrapper padx-1 pady-2 mgt-3 mgb-2 borad-1 bg-lightdient" v-if="question">
      <h2 class="reminder tx-upp pady-1" v-show="!edit_mode">Vote Wisely!!!</h2>
      <h2 class="edit-mode green tx-upp pady-1" v-show="edit_mode">Edit Mode :</h2>
      <QuestionOptions
        class="option-icons"
        v-show="!edit_mode"
        @edit="edit"
        :question_id="question.id"
      />
      <div class="question-cont dark pady-1 padx-2" v-show="!edit_mode">
        <h2>{{ question.title }}</h2>

        <p>{{ question.description }}</p>
      </div>

      <!-- Edit Question Starts -->
      <div class="wrapper-edit-question dark pady-1 padx-2" v-show="edit_mode">
        <input class="fs-25 bg-lightdient pady-1 padx-1 mgb-1" type="text" v-model="edit_title" />
        <textarea
          class="bg-lightdient pady-1 padx-1 fs-18 mgb-1"
          v-model="edit_description"
          cols="10"
          rows="3"
        ></textarea>
        <div class="save-container">
          <p class="pady-5-px green" v-show="saved">Successfully Saved</p>
          <button
            @click="save"
            class="submit pady-10-px padx-2 mgb-1 fs-18 fw-bold borad-1 light bg-bluedient tx-cap pointer"
          >Save</button>
        </div>
      </div>
      <!-- Edit Question Ends -->
      <div class="answers-cont mgt-1" v-for="(answer, index) in question.answers" :key="index">
        <div class="answers pady-1 padx-2 bg-bluedient light fw-bold" v-if="!edit_mode">
          <p class="fs-18">{{ answer.title }}</p>
          <p class="votes padx-1 fs-18">{{ answer.votes.length }}</p>
          <input
            class="pointer"
            type="radio"
            v-on:change="selected_answer = answer;"
            :name="question.id"
            :value="answer.id"
          />
        </div>

        <!-- Edit Answers Starts -->
        <AnswerEdit :answer="answer" @removeChoices="removeChoices" v-if="edit_mode" />
        <!-- Edit Answers Ends -->
      </div>
      <!-- Add Answers Starts -->
      <AnswerAdd :question_id="question.id" @newAnswer="addChoice" v-if="edit_mode" />
      <!-- Add Answers Ends -->
      <div class="buttons-container pady-3" v-show="!edit_mode">
        <button
          @click="cancel"
          class="cancel pady-1 padx-2 fs-18 fw-bold borad-1 dark bg-lightdient tx-cap pointer"
        >cancel</button>
        <button
          @click="submit"
          class="submit pady-1 padx-2 fs-18 fw-bold borad-1 light bg-bluedient tx-cap pointer"
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
import AnswerEdit from "../components/answers/AnswerEdit";
import AnswerAdd from "../components/answers/AnswerAdd";
import QuestionOptions from "../components/questions/QuestionOptions";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Details",
  components: {
    QuestionOptions,
    AnswerEdit,
    AnswerAdd
  },
  props: {
    question: Object
  },
  data() {
    return {
      selected_answer: null,
      edit_mode: false,
      saved: false,
      edit_title: "",
      edit_description: ""
    };
  },
  methods: {
    ...mapActions(["onLoader", "offLoader", "deleteQuestion", "editQuestion"]),
    cancel() {
      // Return to Home
      this.$router.push({
        name: "home",
        params: { scrollInto: `${this.question.id}` }
      });
    },
    submit() {
      // Submittinga Vote
      if (!this.selected_answer) {
        alert("you have not selected any of the choices");
      } else {
        // console.log(this.selected.title);
        const vote = {
          answer_id: this.selected_answer.id,
          user_id: 1,
          question_id: this.question.id
        };
        axios
          .post(
            `https://my-json-server.typicode.com/eevan7a9/voting-app-db/votes`,
            {
              answer_id: vote.answer_id,
              user_id: vote.user_id,
              question_id: vote.question_id
            }
          )
          .then(res => {
            const new_vote = res.data;
            this.selected_answer.votes.push(new_vote);
          })
          .catch(err => {
            alert(err);
          });
      }
    },
    exitEditMode() {
      this.edit_title = this.question.title;
      this.edit_description = this.question.description;
      this.edit_mode = false;
      this.saved = false;
    },
    save() {
      // Save Edits of title and description

      this.question.title = this.edit_title;
      this.question.description = this.edit_description;
      this.editQuestion(this.question);

      this.saved = true;
    },
    edit() {
      // Enable Edit Mode
      this.edit_title = this.question.title;
      this.edit_description = this.question.description;
      this.edit_mode = !this.edit_mode;
    },
    removeChoices(id) {
      const answer = confirm("are you sure you want to remove this answer?");
      if (answer) {
        this.question.answers = this.question.answers.filter(
          answer => answer.id != id
        );
      }
    },
    addChoice(answer) {
      this.question.answers.push(answer);
    }
  },
  created() {
    if (this.question == undefined) {
      this.$router.push("/");
      // console.log(1);
    } else {
      this.onLoader();
      setTimeout(() => {
        this.offLoader();
      }, 2000);
    }
  }
};
</script>

<style scoped>
input {
  border: 0px solid #1583c7;
  border-bottom: 3px solid #1583c7;
  width: 100%;
}
textarea {
  border: 0px solid #1583c7;
  border-bottom: 3px solid #1583c7;
  width: 100%;
  resize: vertical;
}
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
.save-container {
  text-align: right;
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
  .wrapper-edit-question {
    padding: 0;
  }
}
</style>