<template>
  <div>
    <div class="wrapper padx-1 pady-2 mgt-3 mgb-2 borad-1 bg-lightdient" v-if="question">
      <QuestionOptions v-show="!editMode" @edit="edit" @delete="remove" @report="reportQuestion" />
      <h2 class="edit-mode green tx-upp pady-1" v-show="editMode">Edit Mode :</h2>
      <div class="question-cont dark pady-1 padx-2" v-show="!editMode">
        <h2>{{ question.title }}</h2>

        <p>{{ question.description }}</p>
      </div>
      <!-- Edit Question Starts -->
      <div class="wrapper-edit-question dark pady-1 padx-2" v-show="editMode">
        <input class="fs-25 bg-lightdient pady-1 padx-1 mgb-1" type="text" v-model="editTitle" />
        <textarea
          class="bg-lightdient pady-1 padx-1 fs-18 mgb-1"
          v-model="editDescription"
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
        <div class="answers pady-1 padx-2 bg-bluedient light fw-bold" v-if="!editMode">
          <p class="fs-18">{{ answer.title }}</p>
          <input type="radio" :name="question.id" :value="answer.id" v-model="selected" />
        </div>
        <!-- Edit Answers Starts -->
        <EditAnswer :answer="answer" @removeChoices="removeChoices" v-if="editMode" />
        <!-- Edit Answers Ends -->
      </div>
      <!-- Add Answers Starts -->
      <AddAnswer :question_id="question.id" @newAnswer="addChoice" v-if="editMode" />
      <!-- Add Answers Ends -->
      <div class="buttons-container pady-3" v-show="!editMode">
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
          v-show="editMode"
          class="pady-1 padx-2 fs-18 fw-bold borad-1 light bg-reddient tx-cap pointer"
        >Exit Edit Mode</button>
      </div>
      <!-- Edit Buttons Ends -->
    </div>
  </div>
</template>

<script>
import EditAnswer from "../components/answers/EditAnswer";
import AddAnswer from "../components/answers/AddAnswer";
import QuestionOptions from "../components/questions/QuestionOptions";
import { mapActions } from "vuex";
export default {
  name: "Details",
  components: {
    QuestionOptions,
    EditAnswer,
    AddAnswer
  },
  props: {
    question: Object
  },
  data() {
    return {
      selected: null,
      editMode: false,
      saved: false,
      editTitle: "",
      editDescription: ""
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
      if (!this.selected) {
        alert("you have not selected any of the choices");
      } else {
        alert(this.selected);
      }
    },
    exitEditMode() {
      this.editTitle = this.question.title;
      this.editDescription = this.question.description;
      this.editMode = false;
      this.saved = false;
    },
    save() {
      // Save Edits of title and description
      this.editQuestion(this.question);
      this.question.title = this.editTitle;
      this.question.description = this.editDescription;
      this.saved = true;
    },
    edit() {
      // Enable Edit Mode
      this.editTitle = this.question.title;
      this.editDescription = this.question.description;
      this.editMode = !this.editMode;
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
      console.log(1);
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

.question-cont {
  border: 3px solid #1583c7;
  background: white;
}
.answers {
  border: 3px solid #1583c7;
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr auto;
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