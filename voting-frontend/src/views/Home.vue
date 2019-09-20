<template>
  <div class="home pady-1">
    <QuestionsList />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionsList from "../components/questions/QuestionsList";

export default {
  name: "home",
  components: {
    QuestionsList
  }
};
</script>
<style scoped>
</style>
