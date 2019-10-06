<template>
  <div>
    <div class="answers pdy-1 padx-2 bg-bluedient light fw-bold">
      <p class="fs-18">{{ answer.title }}</p>
      <span class="pady-5-px padx-1 pointer" @click="remove">
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
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </span>
    </div>
    <div class="current-answer pady-1 padx-2 mgt-1 fs-18">
      <input
        type="text"
        class="bg-lightdient fs-18"
        v-model="title"
        placeholder="Press Enter To Update"
        @keypress.enter="update"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AnswerEdit",
  props: {
    answer: Object
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    ...mapActions([
      "updateAnswerQuestion",
      "removeAnswerQuestion",
      "onLoader",
      "offLoader",
      "showAlert"
    ]),
    remove() {
      const ans = confirm("are you sure you want to remove this answer?");
      if (ans) {
        this.removeAnswerQuestion(this.answer).then(res => {
          if (res.success) {
            this.showAlert({
              message: res.success,
              error: 0
            });
          }else{
            this.showAlert({
              message: res.error,
              error: 1
            });
          }
        });
      }
    },
    update() {
      this.onLoader();
      this.updateAnswerQuestion({
        id: this.answer.id,
        title: this.title
      }).then(res => {
        if (res.request.statusText === "OK") {
          this.title = "";
          this.showAlert({
            message: "Answer, updated successfully",
            error: 0
          });
          this.offLoader();
        } else {
          const content = {
            message: res.data.errors.title[0],
            error: true
          };
          this.showAlert(content).then(() => this.offLoader());
        }
      });
    }
  }
};
</script>

<style scoped>
.answers {
  border: 3px solid #1583c7;
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr auto;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.answers p {
  margin-top: auto;
  margin-bottom: auto;
}
.current-answer {
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
}
input {
  border: 0px solid #1583c7;
  border-bottom: 3px solid #1583c7;
  width: 100%;
}
@media (max-width: 600px) {
  .answers {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .current-answer {
    padding: 0;
  }
}
</style>