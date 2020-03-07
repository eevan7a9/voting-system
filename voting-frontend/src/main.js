import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./filter/myFilter";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if user_token exists
    if (!store.state.users.user_token) {
      next({
        path: "/"
      });
    } else {
      if (to.matched.some(record => record.meta.requiresOwner)) {
        // this route requires owner, check if user is owner
        if (
          store.state.users.user.id != store.state.questions.question.user_id
        ) {
          next({
            path: "/"
          });
        } else {
          next();
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires visitor, check if not login
    if (store.state.users.user_token) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
