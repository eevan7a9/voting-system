import axios from "axios";

const state = {
    login: false,
    user: {},
    user_message: {
        message: "Some message",
        error: 0,
        show: 1
    },
};
const getters = {
    current_user: state => state.user,
    is_login: state => state.login,
    alert_user: state => state.user_message
};
const actions = {
    closeUserMessage: ({ commit }) => commit("clearUserMessage"),
    registerUser: async ({ commit }, user) => {
        const new_user = await axios
            .post("users", {
                name: user.username,
                email: user.email,
                password: user.password
            })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                alert(err);
            });
        commit("successRegister", new_user);
    }
};
const mutations = {
    successRegister: (state, user) => {
        state.user_message.show = 1;
        state.user_message.message = `${user.email} you are now  Registered!!!`;
        state.user_message.error = 0;
    },
    clearUserMessage: (state) => {
        state.user_message.message = "";
        state.user_message.show = 0;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};
