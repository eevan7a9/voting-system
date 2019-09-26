<template>
  <div>
    <!-- Add Answers Starts -->
    <div class="answers mgt-1 pady-5-px padx-2 bg-bluedient light fw-bold">
      <input class="fs-normal pady-1-px padx-5-px" type="text" v-model="title" />
      <span @click="addChoices" class="pady-5-px padx-1 pointer">
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
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddAnswer",
  props: {
    question_id: Number
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    ...mapActions(["onLoader", "offLoader"]),
    addChoices() {
      this.onLoader();
      axios
        .post(
          `https://my-json-server.typicode.com/eevan7a9/social-media-db/likes`,
          {
            post_id: 1,
            user_id: 1
          }
        )
        .then(() => {
          this.$emit("newAnswer", {
            id: 11,
            title: this.title,
            question_id: this.question_id
          });
          this.title = "";
          this.offLoader();
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
}
</style>