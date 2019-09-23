<template>
  <div>
    <div class="wrapper mgt-3 bg-lightdient borad-1">
      <h1 class="create pady-1 padx-2 tx-upp blue">Create Question</h1>
      <form @submit="submit">
        <div class="create-container pady-1 padx-3">
          <div class="title-container">
            <label for="title" class="pady-1 fs-18 tx-upp">title :</label>
            <input type="text" class="fs-18 pady-1 padx-1 borad-1" v-model="title" id="title" />
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
              type="submit"
              class="pady-1 mgt-3 padx-2 borad-1 bg-bluedient light fs-20 pointer"
            >Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CreateQuestion",
  data() {
    return {
      title: "",
      additional_info: "",
      error: ""
    };
  },
  methods: {
    ...mapActions(["addQuestion"]),
    validate() {
      if (this.title) {
        if (this.title.length < 6) {
          this.error = "Title must be atleast 6 character long";
        } else {
          this.error = "";
        }
      } else {
        this.error = "title must not be empty";
      }
    },
    submit() {
      this.validate();
      if (this.error) {
        console.log(this.error);
      } else {
        this.addQuestion().then(() => {
          this.title = "";
          this.additional_info = "";
          this.$router.push("/");
        });
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