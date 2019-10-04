import axios from "axios";

const state = {
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
                const content = {
                    message: `${res.data.email} you are now Registered!!!`,
                    error: 0
                };
                commit("setAlert", content);
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
                login_user.id = 7;
                login_user.email = user.email;
                commit("setUser", login_user);
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
    },
    getUserInfo: async ({ commit, state }) => {
        if (state.user_token) {
            const user = {}
            user.token = state.user_token;
            user.id = 1;
            user.email = "eve.holt@reqres.in";
            commit("setUser", user);
            // console.log("getting user info");
        }
    }
};
const mutations = {
    setUser: (state, user) => {
        state.user_token = user.token; // set user token
        state.user = user;
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
