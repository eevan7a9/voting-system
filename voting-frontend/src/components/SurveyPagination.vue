<template>
  <main class="wrapper mgt-1">
    {{ pagination }}
    <button class="prev pady-1 padx-1 blue tx-upp bg-lightdient" muted>prev</button>
    <div class="page-info padx-1">
      <h4>{{ pagination.current_page }} of {{ pagination.last_page }}</h4>
    </div>
    <button class="next pady-1 padx-1 blue tx-upp bg-lightdient">next</button>
  </main>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SurveyPagination",
  computed: mapGetters(["pagination"])
};
</script>
<style scoped>
button {
  border: 3px solid #1583c7;
}
.wrapper {
  display: flex;
}

.page-info {
  margin-top: auto;
  margin-bottom: auto;
}
</style>