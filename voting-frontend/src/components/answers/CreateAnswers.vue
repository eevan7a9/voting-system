<template>
  <div>
    <div class="dark pady-1 padx-2">
      <h2>{{ title }}</h2>
      <p>{{ additional_info }}</p>
    </div>
    <transition-group name="slide-fade">
      <div class="answers-cont mgt-3-px" v-for="(answer) in answers" :key="answer.id">
        <div class="answers pady-1 padx-2 bg-bluedient light fw-bold">
          <p class="fs-18">{{ answer.title }}</p>
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
import { mapActions } from "vuex";
export default {
  name: "CreateAnswers",
  props: {
    title: String,
    additional_info: String
  },
  data() {
    return {
      id: 1,
      choice: "",
      answers: []
    };
  },
  methods: {
    ...mapActions(["onLoader", "offLoader", "addQuestion", "addAnswer"]),
    addChoice() {
      if (this.choice) {
        this.answers.push({
          id: this.id,
          title: this.choice
        });
        this.id++;
        this.choice = "";
      }
    },
    cancel() {
      const x = confirm("Are you sure you want to cancel?");
      if (x) {
        this.$router.push("/");
      }
    },
    submit() {
      if (this.answers.length < 2) {
        alert("must Provide atleast two choices");
      } else {
        this.onLoader(); // turn loader on while sending request
        this.addQuestion({
          title: this.title,
          additional_info: this.additional_info,
          answers: this.answers
        }).then(() => {
          this.offLoader(); // turn loader off when request is done
        });
      }
    }
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
@media (max-width: 700px) {
  .add_choice {
    grid-template-columns: 1fr;
  }
}
</style>