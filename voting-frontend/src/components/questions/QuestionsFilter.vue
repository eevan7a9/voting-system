<template>
  <div>
    <div class="wrapper pady-2 padx-2 bg-white borad-2">
      <div class="sorter">
        <h2 class="tx-upp fs-large">sorter</h2>
        <hr class="mgy-1 mgx-1" />
        <ul>
          <li>
            <p class="pady-8-px tx-cap fs-18">newest</p>
            <input type="radio" name="sorter" id @change="sortQuestions" />
          </li>
          <li>
            <p class="pady-8-px tx-cap fs-18">oldest</p>
            <input type="radio" name="sorter" id @change="sortQuestions" />
          </li>
        </ul>
      </div>
      <div class="filter">
        <h2 class="tx-upp fs-large">filter</h2>
        <hr class="mgy-1 mgx-1" />
        <ul>
          <li>
            <p class="pady-8-px tx-cap fs-18">all</p>
            <input type="radio" name="sorter" id @change="filterQuestions" />
          </li>
          <li>
            <p class="pady-8-px tx-cap fs-18">not voted</p>
            <input type="radio" name="sorter" id @change="filterQuestions" />
          </li>
          <li>
            <p class="pady-8-px tx-cap fs-18">voted</p>
            <input type="radio" name="sorter" id @change="filterQuestions" />
          </li>
        </ul>
      </div>
      <div class="Options">
        <h2 class="tx-upp fs-large">options</h2>
        <hr class="mgy-1 mgx-1" />
        <button
          class="pady-1 padx-1 mgt-1 bg-bluedient light fw-bolder pointer"
          @click="newQuestion"
        >New Question</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "QuestionsFilter",
  data() {
    return {
      test: "Hello World"
    };
  },
  methods: {
    ...mapActions(["showAlert", "closeAlert"]),
    sortQuestions() {
      alert("sort");
    },
    filterQuestions() {
      alert("filter");
    },
    newQuestion() {
      // console.log(1);
      this.$router.push("create").catch(() => {
        const content = {
          message: "Sorry, only login users are allowed.",
          error: 1
        };
        this.showAlert(content);
      });
    }
  },
  destroyed() {
    this.closeAlert();
  }
};
</script>

<style scoped>
.wrapper {
  border: 3px solid #1583c7;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.sorter h2,
.filter h2,
.options h2 {
  width: 100px;
  text-align: right;
}
.sorter ul,
.filter ul {
  list-style: none;
}
.sorter li,
.filter li {
  display: flex;
}
.sorter li p,
.filter li p {
  width: 100px;
  text-align: right;
}
.sorter li input,
.filter li input {
  margin-left: 5px;
}
@media (max-width: 600px) {
  .wrapper {
    margin-top: 30px;
  }
}
</style>