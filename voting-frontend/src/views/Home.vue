<template>
  <div class="home pady-1">
    <QuestionsFilter />
    <QuestionsList :scrollInto="scrollInto" />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionsFilter from "../components/questions/QuestionsFilter";
import QuestionsList from "../components/questions/QuestionsList";

export default {
  name: "home",
  components: {
    QuestionsFilter,
    QuestionsList
  },
  props: {
    scrollInto: String
  }
};
</script>
<style scoped>
</style>
