<template>
  <div>
    <div class="wrapper mgt-3 bg-white borad-1">
      <section id="question" v-if="!edit_answer">
        <h1 class="create pady-1 padx-2 tx-upp blue">Create Question</h1>
        <div class="create-container pady-1 padx-3">
          <div class="title-container">
            <label for="title" class="pady-1 fs-18 tx-upp">title :</label>
            <input type="text" class="fs-18 pady-1 padx-1 borad-1" v-model="title" id="title" />
            <p class="red" v-show="error.message">Error: {{ error.message }}</p>
          </div>
          <div class="additional-info">
            <label for="additional_info" class="pady-1 fs-13 tx-upp">additional info (optional):</label>
            <textarea
              class="borad-1 pady-1 padx-1 fs-18"
              v-model="additional_info"
              id="additional_info"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div class="submit-container">
            <button
              @click="cancel"
              type="button"
              class="cancel blue pady-1 mgt-3 padx-2 borad-1 bg-lightdient fs-20 pointer"
            >Cancel</button>
            <button
              @click="create"
              class="pady-1 mgt-3 padx-2 borad-1 bg-bluedient light fs-20 pointer"
            >continue</button>
          </div>
        </div>
      </section>
      <section v-if="edit_answer">
        <CreateAnswers :title="title" :additional_info="additional_info" />
      </section>
    </div>
  </div>
</template>

<script>
import CreateAnswers from "../components/answers/CreateAnswers";
export default {
  name: "CreateQuestion",
  components: {
    CreateAnswers
  },
  data() {
    return {
      title: "test Title",
      additional_info: "Test additional info",
      error: {
        message: ""
      },
      edit_answer: 0
    };
  },
  methods: {
    validate() {
      if (this.title) {
        if (this.title.length < 6) {
          this.error.message = "Title must be atleast 6 character long";
        } else {
          this.error.message = "";
        }
      } else {
        this.error.message = "title must not be empty";
      }
    },
    create() {
      this.validate();
      if (!this.error.message) {
        this.edit_answer = 1;
      }
    },
    cancel() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
label {
  min-width: 100px;
  text-align: left;
}
.create {
  text-align: center;
}
.cancel {
  border: 1px solid #1583c7;
}
.wrapper {
  border: 3px solid #1583c7;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.title-container {
  display: flex;
  flex-direction: column;
}
.title-container input {
  width: 100%;
  border: 3px solid #1583c7;
}
.title-container p {
  text-align: center;
}
.additional-info {
  display: flex;
  flex-direction: column;
}
.additional-info textarea {
  width: 100%;
  border: 3px solid #1583c7;
}
.submit-container {
  display: flex;
  justify-content: space-around;
}
@media (max-width: 600px) {
  .wrapper {
    width: 100%;
  }
  .create-container {
    padding: 5px;
  }
  .submit-container {
    padding: 20px 0;
  }
}
</style>