import axios from 'axios';

const state = {
    questions: [],
    question: {}
}
const getters = {
    allQuestions: (state) => state.questions,
    questionDetail: state => state.question
}
const actions = {
    getQuestionDetails: ({ commit }, id) => {
        axios.get(`/questions/${id}`)
            .then(res => {
                const question = res.data
                commit("setQuestionDetails", question);
            })
            .catch(err => {
                alert(err);
            })
    },
    getQuestions: async ({ commit }) => {
        await axios.get('/questions')
            .then(res => {
                commit("setQuestions", res.data);
            });
    },
    addQuestion: async ({ commit }, question) => {
        await axios.post('/questions', {
            user_id: 1,
            title: question.title,
            description: question.description
        })
            .then(res => {
                const new_question = res.data;
                new_question.answers = [];
                // we check if we success in creating question
                if (new_question.id) {
                    let ctr = 0;
                    // we now create answers
                    question.answers.forEach(answer => {
                        axios.post(`/answers`, {
                            title: answer.title,
                            question_id: new_question.id
                        })
                            .then((res) => {
                                new_question.answers.push(res.data);
                                ctr++;
                                if (ctr == question.answers.length) {
                                    // if all are success we update the state
                                    commit("insertQuestion", new_question);
                                    // console.log(new_question);
                                }
                            })
                            .catch(err => {
                                alert(err);
                            });
                    });
                }
            })
            .catch(err => {
                alert(err);
            })
    },
    deleteQuestion: async ({ commit }, id) => {
        await axios.delete(`/questions/${id}`)
            .then(res => {
                // console.log(res)
                commit("removeQuestion", id);
            })
            .catch(err => {
                alert(err);
            })
    },
    editQuestion: async ({ commit }, question) => {
        await axios.put(`/questions/${question.id}`, {
            title: question.title,
            description: question.description
        })
            .then(res => {
                const updated_question = res.data;
                commit("updateQuestion", updated_question);
            })
            .catch(err => {
                alert(err);
            })
    }
}
const mutations = {
    setQuestions: (state, questions) => state.questions = questions,
    insertQuestion: (state, question) => state.questions.unshift(question),
    setQuestionDetails: (state, question) => {
        state.question = question;
    },
    removeQuestion: (state, id) => state.questions = state.questions.filter(question => question.id != id),
    updateQuestion: (state, update_question) => {
        state.question.title = update_question.title;
        state.question.description = update_question.description;
        console.log(update_question);
        state.questions.forEach(question => {
            if (question.id == update_question.id) {
                question.title = update_question.title;
                question.description = update_question.description;
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