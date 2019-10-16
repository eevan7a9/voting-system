<template>
  <main class="wrapper">
    <button
      class="prev pady-1 padx-1 blue tx-upp bg-lightdient pointer"
      @click="prev"
      :disabled="pagination.prev_page_url == null"
    >prev</button>
    <div class="page-info padx-1">
      <h4>{{ pagination.current_page }} of {{ pagination.last_page }}</h4>
    </div>
    <button
      class="next pady-1 padx-1 blue tx-upp bg-lightdient pointer"
      @click="next"
      :disabled="pagination.next_page_url == null"
    >next</button>
  </main>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SurveyPagination",
  computed: mapGetters(["pagination", "onFilter"]),
  methods: {
    ...mapActions(["getQuestions", "filterQuestions", "onLoader", "offLoader"]),
    prev() {
      this.loadQuestions(this.pagination.prev_page_url);
    },
    next() {
      this.loadQuestions(this.pagination.next_page_url);
    },
    loadQuestions(url) {
      this.onLoader();
      if (this.onFilter.sorter == "newest" && this.onFilter.filter == "all") {
        this.getQuestions(url).then(() => this.offLoader());
      } else {
        this.filterQuestions({
          sorter: this.onFilter.sorter,
          filter: this.onFilter.filter,
          url: url
        }).then(() => this.offLoader());
      }
    }
  }
};
</script>
<style scoped>
button {
  border: 3px solid #1583c7;
  width: 80px;
}
button:hover {
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
  transition: 0.5s;
  width: 100px;
}
button:disabled {
  border: 3px solid grey;
  color: grey;
  cursor: not-allowed;
}
button:disabled:hover {
  width: 80px;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.wrapper {
  display: flex;
}

.page-info {
  margin-top: auto;
  margin-bottom: auto;
}
@media (max-width: 700px) {
  button {
    -webkit-box-shadow: 4px 9px 17px -8px #000000;
    box-shadow: 4px 9px 17px -8px #000000;
    transition: 1s;
    width: 100px;
  }
}
</style>