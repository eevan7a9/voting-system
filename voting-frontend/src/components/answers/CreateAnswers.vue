<template>
  <div class="wrapper mgt-3 bg-white borad-1">
    <div class="dark pady-1 padx-2">
      <h2 class="mgt-1">{{ title }}</h2>
      <p class="ls-2 pady-1">{{ description }}</p>
      <viewer :value="additional_info" />
    </div>
    <transition-group name="slide-fade">
      <div class="answers-cont mgt-3-px" v-for="(answer) in answers" :key="answer.title">
        <div class="answers pady-1 padx-2 bg-bluedient light fw-bold">
          <p class="fs-18">{{ answer.title | truncate(30,'...') }}</p>

          <img src="@/assets/trash-2.svg" alt="delete" @click="removeChoice(answer.title)" />
        </div>
      </div>
    </transition-group>
    <hr class="blue" />
    <div class="add_choice pady-1 padx-2 dark fw-bold">
      <label class="pady-1 padx-1" for="choice">Add Choices</label>
      <input class="pady-1 fs-18" type="text" v-model="choice" id="choice" />
      <button @click="addChoice" class="bg-lightdient pady-1 padx-2 fs-18 fw-bold blue pointer">Add</button>
    </div>
    <hr class="blue" />
    <div class="submit-cont pady-1 padx-2 dark fw-bold">
      <button
        class="cancel bg-lightdient pady-1 padx-2 fs-18 fw-bold blue pointer borad-1"
        @click="cancel"
      >Cancel</button>
      <button
        class="bg-bluedient pady-1 padx-2 fs-18 fw-bold light pointer borad-1"
        @click="submit"
      >Submit</button>
    </div>
  </div>
</template>

<script>
// Importing Viewer for WYSIWYG
import "tui-editor/dist/tui-editor-contents.css";
import "highlight.js/styles/github.css";
import { Viewer } from "@toast-ui/vue-editor";
// viewer imports ends
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CreateAnswers",
  components: {
    viewer: Viewer // Viewer compnent
  },
  props: {
    title: String,
    description: String,
    additional_info: String
  },
  data() {
    return {
      choice: "",
      answers: []
    };
  },
  computed: mapGetters(["current_user"]),
  methods: {
    ...mapActions([
      "onLoader",
      "offLoader",
      "addQuestion",
      "showAlert",
      "closeAlert"
    ]),
    removeChoice(title) {
      this.answers = this.answers.filter(answer => answer.title != title);
    },
    addChoice() {
      if (this.choice) {
        const alreadyExists = this.answers.some(
          answer => answer.title == this.choice
        );
        if (!alreadyExists) {
          this.answers.push({
            title: this.choice
          });
        }

        this.choice = "";
      }
    },
    cancel() {
      const x = confirm("Are you sure you want to cancel?");
      if (x) {
        this.$emit("returnCreateQuestion");
      }
    },
    submit() {
      if (this.answers.length < 2) {
        this.showAlert({
          message: "must Provide atleast two choices",
          error: true
        });
      } else {
        this.onLoader(); // turn loader on while sending request
        this.addQuestion({
          user_id: this.current_user.id, // for testing
          title: this.title,
          description: this.description,
          additional_info: this.additional_info,
          answers: this.answers
        }).then(() => {
          const content = {
            message: `Success, new Survey created.`,
            error: 0
          };
          this.showAlert(content).then(() => {
            this.$router.push({ name: "home" });
            this.offLoader(); // turn loader off when request is done
          });
        });
      }
    }
  },
  destroyed() {
    this.choice = "";
    this.answers = [];
    this.closeAlert();
  }
};
</script>

<style scoped>
.add_choice {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr 100px;
}
.add_choice button {
  border: 1px solid #1583c7;
}
.cancel {
  border: 1px solid #1583c7;
}
.submit-cont {
  display: flex;
  justify-content: space-between;
}
.answers {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.answers p {
  overflow: hidden;
}
.answers img {
  cursor: pointer;
}
@media (max-width: 700px) {
  .add_choice {
    grid-template-columns: 1fr;
  }
}
</style>