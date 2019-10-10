const state = {
    loader: false
}
const getters = {
    loader: (state) => state.loader,
}
const actions = {
    onLoader: ({ commit }) => {
        commit("setLoader", true);
    },
    offLoader: ({ commit }) => {
        commit("setLoader", false);
    }
}
const mutations = {
    setLoader: (state, action) => action ? state.loader = true : state.loader = false
}
export default {
    state,
    getters,
    actions,
    mutations
}