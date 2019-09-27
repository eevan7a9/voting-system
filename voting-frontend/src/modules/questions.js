import axios from 'axios';

const state = {
    questions: [],
    // question: {
    //     "id": 0,
    //     "user_id": 0,
    //     "title": "",
    //     "created_at": "null",
    //     "updated_at": "",
    //     "description": "",
    //     "answers": []
    // }
}
const getters = {
    allQuestions: (state) => state.questions,
    // questionDetail: state => state.question

}
const actions = {
    getQuestionDetails: ({ commit, state }, id) => {
        setTimeout(() => {
            const question = state.questions.find(question => question.id == id)
            commit("setQuestionDetails", question);
        }, 2000);
    },
    getQuestions: async ({commit}) => {
        await axios.get('/questions')
        .then(res => {
            commit("setQuestions", res.data);
        });
    },
    addQuestion: async ({ commit }, question) => {
        await axios.post('/posts', {
            user_id: 1,
            title: 'tester',
            created_at: '2019-20-1'
        })
            .then(res => {
                commit("insertQuestion", question)
                console.log(res, question);
                question.answers.forEach(answer => {
                    axios.post(`/likes`, {
                        post_id: 1,
                        user_id: 1
                    })
                        .then(res => {
                            console.log(res, answer.id)
                        })
                        .catch(err => {
                            console.error(err);
                        })
                });
            })
            .catch(err => {
                console.error(err);
            })
    },
    deleteQuestion: async ({ commit }, id) => {
        await axios.delete(`/posts/${id}`)
            .then(res => {
                console.log(res)
                commit("removeQuestion", id);
                console.log(id);
            })
            .catch(err => {
                console.error(err);
            })
    },
    editQuestion: async ({ commit }, question) => {
        await axios.put(`/posts/${question.id}`, {
            title: "hello",
            user_id: "1"
        })
            .then(res => {
                console.log(res)
                console.log(question);
                commit("updateQuestion", question);
            })
            .catch(err => {
                console.error(err);
            })
    }
}
const mutations = {
    setQuestions:(state, questions) => state.questions = questions,
    insertQuestion: (state, question) => state.questions.unshift(question),
    setQuestionDetails: (state, question) => {
        state.question = question;
    },
    removeQuestion: (state, id) => state.questions = state.questions.filter(question => question.id != id),
    updateQuestion: (state, update_question) => {
        state.questions.forEach(question => {
            if (question.id == 1) {
                question.title = update_question.title;
            }
        })
    }

}
export default {
    state,
    getters,
    actions,
    mutations,
}