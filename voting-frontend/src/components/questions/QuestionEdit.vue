<template>
  <div class="wrapper-edit-question dark pady-1 padx-2">
    <input
      @focus="saved = false"
      class="fs-25 bg-lightdient pady-1 padx-1 mgb-1"
      type="text"
      v-model="edit_title"
    />
    <textarea
      @focus="saved = false"
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
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "QuestionEdit",
  props: {
    question: Object
  },
  data() {
    return {
      saved: false,
      edit_title: "",
      edit_description: ""
    };
  },
  methods: {
    ...mapActions(["editQuestion", "onLoader", "offLoader", "showAlert"]),
    save() {
      this.onLoader();
      // Save Edits of title and description
      this.question.title = this.edit_title;
      this.question.description = this.edit_description;
      this.editQuestion(this.question).then(res => {
        if (!res.error) {
          this.saved = true;
          const content = {
            message: "Question, Updated successfully",
            error: false
          };
          this.showAlert(content).then(() => {
            this.offLoader();
          });
        } else {
          const content = {
            message: res.message,
            error: true
          };
          this.showAlert(content).then(() => {
            this.offLoader();
          });
        }
      });
    }
  },
  created() {
    this.edit_title = this.question.title;
    this.edit_description = this.question.description;
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