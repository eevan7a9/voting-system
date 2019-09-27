import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import loader from "./modules/loader";
import questions from './modules/questions';
import answers from './modules/answers';

Vue.use(Vuex)
axios.defaults.baseURL = "https://my-json-server.typicode.com/eevan7a9/voting-app-db/";
export default new Vuex.Store({
  modules: {
    loader,
    questions,
    answers
  }
});
