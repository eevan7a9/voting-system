<template>
  <div>
    <div class="home container pady-1">
      <SurveyOperations class="mgt-1" />
      <div class="wrapper-page-search mgt-2">
        <SurveyPagination id="paginate" />
        <Searchbar id="search" />
      </div>
      <QuestionsList class="question-lists" :scrollInto="scrollInto" />
      <SurveyPagination id="bottom_paginate" class="mgb-2" />
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import SurveyOperations from "../components/SurveyOperations";
import QuestionsList from "../components/questions/QuestionsList";
import SurveyPagination from "../components/SurveyPagination";
import Searchbar from "../components/Searchbar";
import Footer from "@/components/Footer";
import { mapActions } from "vuex";

export default {
  name: "home",
  components: {
    SurveyOperations,
    QuestionsList,
    SurveyPagination,
    Searchbar,
    Footer
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
.wrapper-page-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#paginate {
  margin-top: auto;
  margin-bottom: auto;
}

@media (max-width: 700px) {
  .wrapper-page-search {
    flex-direction: column;
  }
  #search {
    order: 0;
    margin-top: 10px;
    margin-bottom: 20px;
    -webkit-box-shadow: 4px 9px 17px -8px #000000;
    box-shadow: 4px 9px 17px -8px #000000;
  }
  #paginate {
    order: 1;
  }
  #bottom_paginate {
    text-align: center;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
