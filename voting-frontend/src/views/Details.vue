<template>
  <div>
    <div class="wrapper padx-1 pady-2 mgt-3 mgb-2 borad-1 bg-lightdient">
      <QuestionOptions v-show="!editMode" @edit="edit" @delete="remove" @report="reportQuestion" />
      <h2 class="edit-mode green tx-upp pady-1" v-show="editMode">Edit Mode :</h2>
      <div class="question-cont dark pady-1 padx-2" v-show="!editMode">
        <h2>{{ questionDetail.title }}</h2>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <!-- Edit Question Starts -->
      <div class="dark pady-1 padx-2" v-show="editMode">
        <input class="fs-25 pady-1 padx-1 mgb-1 borad-1" type="text" v-model="questionDetail.title" />
        <textarea class="pady-1 padx-1 fs-18 mgb-1 borad-1" cols="10" rows="3"></textarea>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <!-- Edit Question Ends -->
      <div
        class="answers-cont mgt-1"
        v-for="(answer, index) in questionDetail.answers"
        :key="index"
      >
        <div class="answers pady-1 padx-2 bg-bluedient light fw-bold" v-if="!editMode">
          <p class="fs-18">{{ answer.title }}</p>
          <input type="radio" :name="questionDetail.id" :value="answer.id" v-model="selected" />
        </div>
        <!-- Edit Answers Starts -->
        <div class="answers pady-5-px padx-2 bg-bluedient light fw-bold" v-if="editMode">
          <input class="fs-normal pady-1-px padx-5-px" type="text" v-model="answer.title" />
          <span class="pady-5-px padx-1 pointer" @click="removeChoices">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </span>
        </div>
        <!-- Edit Answers Ends -->
      </div>
      <!-- Add Answers Starts -->
      <div class="answers mgt-1 pady-5-px padx-2 bg-bluedient light fw-bold" v-if="editMode">
        <input class="fs-normal pady-1-px padx-5-px" type="text" v-model="new_answer" />
        <span class="pady-5-px padx-1 pointer" @click="addChoices">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus-square"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </span>
      </div>
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
      <div class="buttons-container pady-1" v-show="editMode">
        <button
          @click="edit"
          class="cancel pady-1 padx-2 fs-18 fw-bold borad-1 light bg-reddient tx-cap pointer"
        >cancel</button>
        <button
          @click="save"
          class="submit pady-1 padx-2 fs-18 fw-bold borad-1 light bg-greendient tx-cap pointer"
        >Save</button>
      </div>
      <!-- Edit Buttons Ends -->
    </div>
  </div>
</template>

<script>
import QuestionOptions from "../components/questions/QuestionOptions";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Details",
  components: {
    QuestionOptions
  },
  props: {
    questionId: Number
  },
  data() {
    return {
      selected: null,
      editMode: false,
      new_answer: ""
    };
  },
  computed: {
    ...mapGetters(["questionDetail"])
  },
  methods: {
    ...mapActions([
      "onLoader",
      "offLoader",
      "getQuestionDetails",
      "deleteQuestion",
      "editQuestion"
    ]),
    cancel() {
      // Return to Home
      this.$router.push({
        name: "home",
        params: { scrollInto: `${this.questionDetail.id}` }
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
    save() {
      // Save Edits of both question and answers
      this.editQuestion(this.questionDetail);
      this.editMode = false;
    },
    edit() {
      // Enable Edit Mode
      this.editMode = !this.editMode;
    },
    addChoices() {
      alert("toggle Add choices");
    },
    removeChoices() {
      alert("toggle remove choices");
    },
    remove() {
      // Removing the question and all it's answers
      const answer = confirm("Are you sure you want to Delete this question?");
      answer
        ? this.deleteQuestion(this.questionDetail.id).then(() => {
            this.$router.push({ name: "home" });
          })
        : "";
    },
    reportQuestion() {
      alert("Are you sure you want to Report this question?");
    }
  },
  created() {
    this.onLoader();
    this.getQuestionDetails(this.questionId);
    setTimeout(() => {
      this.offLoader();
    }, 2000);
  }
};
</script>

<style scoped>
input {
  border: 3px solid #1583c7;
  width: 100%;
}
textarea {
  border: 3px solid #1583c7;
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
  border: 1px solid #1583c7;
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
}
</style>