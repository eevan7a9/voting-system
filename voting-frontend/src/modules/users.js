import axios from "axios";

const state = {
    login: false,
    user: {},
    user_message: {
        message: "Some message",
        error: 1
    },
};
const getters = {
    current_user: state => state.user,
    is_login: state => state.login,
    user_message: state => state.user_message
};
const actions = {
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
    successRegister: (state, user) => (state.user_message = `${user.email} you are now  Registered!!!`)
};
export default {
    state,
    getters,
    actions,
    mutations
};
