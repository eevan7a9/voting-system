<template>
  <div>
    <div class="about container">
      <section class="top-img">
        <div class="borad-2 padx-3">
          <h1 class="light tx-upp">Survey-Maker</h1>
        </div>
      </section>
      <div class="survey-intro">
        <h1 class="pady-3">What is This?</h1>
        <hr class="blue" />
        <p class="ls-2 fs-20 padx-3 mgt-3" style="line-height:30px;">
          Survey-Maker it is a
          <b>Demo Project</b>
          built using some of the latest technology:
          <br />
          <br />Laravel for Backend
          <span>
            <img class="laravel" src="../assets/laravel.svg" alt="laravel" />
          </span>
          and Vuejs for Frontend
          <span>
            <img src="../assets/logo.png" alt="vuejs" />
          </span>
          together using Rest-Api
          <span>
            <img src="../assets/rest-api.svg" alt="Restapi" />
          </span>
        </p>
        <p class="src pady-2">
          @2019:
          <a
            class="blue fs-20"
            href="https://github.com/eevan7a9/survey-voting-system"
          >https://github.com/eevan7a9/survey-voting-system</a>
        </p>
        <h1 class="pady-3">What we Do?</h1>
        <hr class="blue" />
        <p class="ls-2 fs-20 padx-3 mgt-3">
          Surveys-Maker we offer people platform where they can post questions in a form of a
          <b>Survey</b>
          and recieve answers from the people anonymously.
          The anonymity of surveys allows respondents to answer with more candid and valid answers
        </p>
        <div class="ask-banner"></div>

        <h1 class="pady-3">What is a Survey?</h1>
        <hr class="blue" />
        <p
          class="ls-2 fs-20 padx-3 mgt-3"
        >Surveys are a method of gathering information from individuals. Surveys have a variety of purposes, and can be conducted in many ways. Surveys may be conducted to gather information through a printed questionnaire, over the telephone, by mail, in person, by diskette, or on the web. This information is collected through use of standardized procedures so that every participant is asked the same questions in the same way. It involves asking people for information in some structured format. Depending on what is being analyzed, the participants being surveyed may be representing themselves, their employer, or some organization to which they belong.</p>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/Footer";
import { mapActions } from "vuex";
export default {
  components: {
    Footer
  },
  methods: {
    ...mapActions(["closeAlert"])
  },
  created() {
    this.closeAlert();
  }
};
</script>
<style scoped>
.about {
  min-height: 100vh;
  padding-bottom: 200px;
}
.top-img {
  background: url("https://cdn.pixabay.com/photo/2016/04/14/08/41/questions-1328466_960_720.jpg");
  height: 450px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.top-img div {
  margin: auto 0;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  background: #07141cba;
  padding: 50px;
  border: 3px solid #1583c7;
}
.top-img h1 {
  font-size: 50px;
}
.top-img p {
  text-align: center;
  font-style: italic;
}
.ask-banner {
  background: url("https://cdn.pixabay.com/photo/2016/02/06/18/33/question-mark-1183408_960_720.jpg");
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin-top: 30px;
}

.survey-intro h1 {
  text-align: center;
}
a {
  text-decoration: none;
}
span img {
  width: 30px;
  margin-bottom: -10px;
}
.src {
  text-align: center;
}
</style>