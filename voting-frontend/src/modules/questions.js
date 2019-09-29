import axios from 'axios';

const state = {
    questions: [],
    question: {}
}
const getters = {
    all_questions: (state) => state.questions,
    question_detail: state => state.question
}
const actions = {
    getQuestionDetails: ({ commit, state }, id) => {

        const found_question = state.questions.find(question => question.id == id);
        if (found_question) {
            commit("setQuestionDetails", found_question);
        } else {
            axios.get(`/questions/${id}`)
                .then(res => {
                    const question = res.data
                    commit("setQuestionDetails", question);
                })
                .catch(err => {
                    alert(err);
                })
        }
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
                                const new_answer = res.data;
                                new_answer.votes = [];
                                new_question.answers.push(new_answer);
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
                console.log(res.data)
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
    },
    addAnswerQuestion: async ({ commit }, answer) => {
        await axios.post('/answers', {
            title: answer.title,
            question_id: answer.question_id
        })
            .then(res => {
                const new_answer = res.data;
                new_answer.votes = [];
                console.log(new_answer);
                commit("insertQuestionAnswer", new_answer);

            })
            .catch(err => {
                console.error(err);
            })
    },
    updateAnswerQuestion: async ({ commit }, answer) => {
        axios.put(`/answers/${answer.id}`, {
            title: answer.title
        })
            .then(res => {
                const updated_answer = res.data;
                commit("updateQuestionAnswer", updated_answer);
                // console.log(updated_answer);
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
        state.question.title = update_question.title; // we update question detail
        state.question.description = update_question.description;
        // console.log(update_question);
        state.questions.forEach(question => {
            if (question.id == update_question.id) {
                // we update the lists of all questions
                question.title = update_question.title;
                question.description = update_question.description;
            }
        })
    },
    insertQuestionAnswer: (state, answer) => {
        state.question.answers.push(answer); // we update the detailed question
        state.questions.forEach(question => {
            if (question.id == answer.question_id) {
                // we update the lists of all questions
                question.answers.push(answer);
            }
        })
    },
    updateQuestionAnswer: (state, updated_answer) => {
        // we find the question_detail answer
        const found_answer = state.question.answers.find(answer => answer.id == updated_answer.id);
        if (found_answer) {
            found_answer.title = updated_answer.title; // we update the found answer title
            // we now have to find the question from lists of questions
            const found_question = state.questions.find(question => question.id == found_answer.question_id);
            const found_question_answer = found_question.answers.find(answer => answer.id == found_answer.id);
            found_question_answer.title = found_answer.title;
        }
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
}