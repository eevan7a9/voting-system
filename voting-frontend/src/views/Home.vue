<template>
  <div class="home pady-1">
    <SurveyOperations />
    <SurveyPagination />
    <QuestionsList class="question-lists" :scrollInto="scrollInto" />
    <SurveyPagination />
  </div>
</template>

<script>
// @ is an alias to /src
import SurveyOperations from "../components/SurveyOperations";
import QuestionsList from "../components/questions/QuestionsList";
import SurveyPagination from "../components/SurveyPagination";
import { mapActions } from "vuex";

export default {
  name: "home",
  components: {
    SurveyOperations,
    QuestionsList,
    SurveyPagination
  },
  props: {
    scrollInto: String
  },
  methods: {
    ...mapActions(["welcomeUser", "closeAlert"])
  },
  destroyed() {
    this.closeAlert();
  }
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
.question-lists {
  flex-grow: 1;
}
</style>
