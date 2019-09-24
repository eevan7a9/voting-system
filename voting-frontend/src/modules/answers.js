import axios from 'axios';

const state = {
};
const getters = {
};
const actions = {
    addAnswer: async ({ }, answer) => {
        await answer.forEach(ans => {
            axios.post('/likes', {
                post_id: 1,
                user_id: 1
            })
                .then(res => {
                    console.log(res)
                    console.log(ans);
                })
                .catch(err => {
                    console.error(err);
                })
        });

    },
};
const mutations = {

};
export default {
    state,
    getters,
    actions,
    mutations
}