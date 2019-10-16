<template>
  <div>
    <div class="wrapper pady-2 padx-2 bg-white borad-2">
      <div class="sorter">
        <h2 class="tx-upp fs-large">sorter</h2>
        <hr class="mgy-1 mgx-1" />
        <ul>
          <li>
            <p class="pady-8-px tx-cap fs-18">newest</p>
            <input
              type="radio"
              name="sorter"
              v-model="sorter"
              :disabled="!is_login"
              value="newest"
              @change="getQuestion"
            />
          </li>
          <li>
            <p class="pady-8-px tx-cap fs-18">oldest</p>
            <input
              type="radio"
              name="sorter"
              v-model="sorter"
              :disabled="!is_login"
              value="oldest"
              @change="getQuestion"
            />
          </li>
        </ul>
      </div>
      <div class="filter">
        <h2 class="tx-upp fs-large">filter</h2>
        <hr class="mgy-1 mgx-1" />
        <ul>
          <li>
            <p class="pady-8-px tx-cap fs-18">all</p>
            <input
              type="radio"
              name="filter"
              v-model="filter"
              :disabled="!is_login"
              value="all"
              @change="getQuestion"
            />
          </li>
          <li>
            <p class="pady-8-px tx-cap fs-18">not voted</p>
            <input
              type="radio"
              name="filter"
              v-model="filter"
              :disabled="!is_login"
              value="not-voted"
              @change="getQuestion"
            />
          </li>
          <li>
            <p class="pady-8-px tx-cap fs-18">voted</p>
            <input
              type="radio"
              name="filter"
              v-model="filter"
              :disabled="!is_login"
              value="voted"
              @change="getQuestion"
            />
          </li>
        </ul>
      </div>
      <div class="create">
        <h2 class="tx-upp fs-large">Create</h2>
        <hr class="mgy-1 mgx-1" />
        <button
          class="pady-1 padx-1 mgt-1 bg-bluedient light fw-bolder pointer borad-1"
          @click="newSurvey"
        >
          <div>
            <p class="padx-5-px tx-upp">Survey</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
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
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "QuestionsFilter",
  data() {
    return {
      sorter: "newest",
      filter: "all"
    };
  },
  computed: mapGetters(["is_login", "onFilter"]),
  methods: {
    ...mapActions([
      "showAlert",
      "closeAlert",
      "filterQuestions",
      "getQuestions",
      "onLoader",
      "offLoader"
    ]),
    getQuestion() {
      this.onLoader();
      if (this.is_login) {
        if (this.sorter == "newest" && this.filter == "all") {
          this.getQuestions().then(() => {
            this.showAlert({
              message: "Success, sorted to: newest and filtered by all"
            });
            this.offLoader();
          });
        } else {
          this.filterQuestions({
            sorter: this.sorter,
            filter: this.filter
          }).then(res => {
            this.showAlert(res);
            this.offLoader();
          });
        }
      } else {
        this.showAlert({
          message: "Only loged in users can use Sorter and Filter",
          error: true
        }).then(() => this.offLoader());
      }
    },
    newSurvey() {
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
  created() {
    this.sorter = this.onFilter.sorter;
    this.filter = this.onFilter.filter;
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
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.sorter h2,
.filter h2,
.create h2 {
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
button div {
  display: flex;
}
button p {
  margin-top: auto;
  margin-bottom: auto;
}
@media (max-width: 600px) {
  .wrapper {
    margin-top: 30px;
  }
  button div {
    justify-content: center;
  }
}
@media (max-width: 490px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
  .sorter li,
  .filter li {
    display: flex;
    justify-content: center;
  }
  .sorter li p,
  .filter li p {
    width: 100px;
    text-align: right;
  }
  .create {
    position: relative;
  }
  .create button {
    display: block;
    width: 200px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>