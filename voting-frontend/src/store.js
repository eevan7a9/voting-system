import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import loader from "./modules/loader";
import questions from './modules/questions';

Vue.use(Vuex)
axios.defaults.baseURL = "https://my-json-server.typicode.com/eevan7a9/social-media-db";
export default new Vuex.Store({
  modules: {
    loader,
    questions,
  }
})
