import axios from "axios";

const state = {
    login: false,
    user: {}
}
const getters = {
    current_user: state => state.user,
    is_login: state => state.login
}
const actions = {
    registerUser: async ({ commit }, user) => {
        await axios.post('users', {
            name: user.username,
            email: user.email,
            password: user.password
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err);
            })
    }
}
const mutations = {

}
export default {
    state,
    getters,
    actions,
    mutations
}