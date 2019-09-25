<template>
  <div>
    <div class="wrapper padx-1 pady-2 mgt-3 mgb-2 borad-1 bg-lightdient">
      <QuestionOptions v-show="!editMode" @edit="edit" @delete="remove" @report="reportQuestion" />
      <h2 class="edit-mode green tx-upp pady-1" v-show="editMode">Edit Mode :</h2>
      <div class="question-cont dark pady-1 padx-2" v-show="!editMode">
        <h2>{{ questionDetail.title }}</h2>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <div class="dark pady-1 padx-2" v-show="editMode">
        <input class="fs-25 pady-1 padx-1 mgb-1 borad-1" type="text" v-model="questionDetail.title" />
        <textarea class="pady-1 padx-1 fs-18 mgb-1 borad-1" cols="10" rows="3"></textarea>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <div
        class="answers-cont mgt-1"
        v-for="(answer, index) in questionDetail.answers"
        :key="index"
      >
        <div class="answers pady-1 padx-2 bg-bluedient light fw-bold" v-if="!editMode">
          <p class="fs-18">{{ answer.title }}</p>
          <input type="radio" :name="questionDetail.id" :value="answer.id" v-model="selected" />
        </div>
        <div class="answers pady-5-px padx-2 bg-bluedient light fw-bold" v-if="editMode">
          <input class="fs-18 pady-5-px padx-5-px" type="text" v-model="answer.title" />
        </div>
      </div>
      <div
        class="vote pady-1 padx-2 bg-lightdient fw-bolder pointer"
        v-if="questionDetail.answers.length == 0"
      >None</div>
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
      editMode: false
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
      "deleteQuestion"
    ]),
    cancel() {
      this.$router.push({
        name: "home",
        params: { scrollInto: `${this.questionDetail.id}` }
      });
    },
    submit() {
      if (!this.selected) {
        alert("you have not selected any of the choices");
      } else {
        alert(this.selected);
      }
    },
    save() {
      console.log(JSON.stringify(this.questionDetail));
      this.editMode = false;
    },
    edit() {
      this.editMode = !this.editMode;
    },
    remove() {
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