<template>
  <div class="home pady-1">
    <SurveyOperations />
    <QuestionsList :scrollInto="scrollInto" />
  </div>
</template>

<script>
// @ is an alias to /src
import SurveyOperations from "../components/SurveyOperations";
import QuestionsList from "../components/questions/QuestionsList";
import { mapActions } from "vuex";

export default {
  name: "home",
  components: {
    SurveyOperations,
    QuestionsList
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
</style>
