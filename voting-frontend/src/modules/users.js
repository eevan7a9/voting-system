import axios from "axios";

const state = {
    login: false,
    user_token: localStorage.getItem("auth") || null,
    user: {},
    user_message: {
        message: "Some message",
        error: 0,
        show: 0
    },
};
const getters = {
    current_user: state => state.user,
    is_login: state => state.user_token,
    alert_user: state => state.user_message,
    getToken: state => state.user_token
};
const actions = {
    closeAlert: ({ commit }) => commit("clearAlert"),
    showAlert: ({ commit }, content) => {
        // content.message & content.error
        commit("setAlert", content);
    },
    registerUser: async ({ commit }, user) => {
        const result = await axios
            .post("users", {
                name: user.username,
                email: user.email,
                password: user.password
            })
            .then(res => {
                commit("successRegister", res.data);
                return res.data;
            })
            .catch(err => {
                alert(err);
            });
        return result;
    },
    loginUser: async ({ commit }, user) => {
        const result = await axios.post('https://reqres.in/api/login', {
            email: user.email,
            password: user.password
        })
            .then(res => {
                const login_user = res.data;
                login_user.email = user.email;
                commit("setUserToken", login_user);
                localStorage.setItem("auth", login_user.token);
                return login_user;
            })
            .catch(err => {
                // alert(err)
                return err;
            })
        return result;
    },
    logoutUser: async ({ commit }) => {
        // alert("logout");
        localStorage.removeItem("auth");
        commit("removeUserToken");
    }
};
const mutations = {
    successRegister: (state, user) => {
        state.user_message.show = 1;
        state.user_message.message = `${user.email} you are now  Registered!!!`;
        state.user_message.error = 0;
    },
    setUserToken: (state, user) => {
        state.user_token = user.token;
        state.user.email = user.email;
    },
    removeUserToken: (state) => {
        state.user_token = null;
        state.user = {}
    },
    clearAlert: (state) => {
        state.user_message.message = "";
        state.user_message.show = 0;
    },
    setAlert: (state, content) => {
        state.user_message.message = content.message;
        state.user_message.error = content.error;
        state.user_message.show = true;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
