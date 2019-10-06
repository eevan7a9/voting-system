import axios from 'axios';
import router from "../router";

const state = {
    questions: [], // lists of questions from database
    question: {} // single question for details
}
const getters = {
    all_questions: (state) => state.questions,
    question_detail: state => state.question
}
const actions = {
    getQuestionDetails: ({ commit, state }, id) => {
        const found_question = state.questions.find(question => question.id == id);
        if (found_question) {
            axios.get(`questions/${found_question.id}`)
                .then(res => {
                    const question = res.data
                    commit("setQuestionDetails", question);
                })
                .catch(err => {
                    alert(err);
                })

        } else {
            router.push("/")
        }
    },
    resetQuestionDetails: ({ commit }) => {
        commit("clearQuestionDetails")
    },
    getQuestions: async ({ commit }) => {
        await axios.get('/questions')
            .then(res => {
                commit("setQuestions", res.data);
            });
    },
    addQuestion: async ({ commit, rootState }, question) => {
        const new_question = await axios.post('/questions', {
            user_id: question.user_id,
            title: question.title,
            description: question.description
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.users.user_token}`
            }
        })
            .then(res => {
                // console.log(res);
                return res.data;
            })
            .catch(err => {
                alert(err);
            })
        // we check if we success in creating question
        if (new_question.id) {
            question.answers.forEach(answer => answer.question_id = new_question.id);
            // we now create answers
            axios.post(`/answers/multiple`, {
                answers: question.answers,
            }, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${rootState.users.user_token}`
                }
            })
                .then((res) => {
                    const answer = res.data;
                    answer.votes = [];
                    new_question.answers = answer
                    commit("insertQuestion", new_question);    // if all are success we update the state
                    // console.log(new_question);
                })
                .catch(err => {
                    alert(err);
                });
        }
    },
    deleteQuestion: async ({ commit, rootState }, id) => {
        return await axios.delete(`/questions/${id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.users.user_token}`
            }
        })
            .then((res) => {
                commit("removeQuestion", res.data.id);
                return "Delete survey, successful";
            })
            .catch(err => {
                alert(err);
            })
    },
    editQuestion: async ({ commit, rootState }, question) => {
        return await axios.put(`/questions/${question.id}`, {
            title: question.title,
            description: question.description
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.users.user_token}`
            }
        })
            .then(res => {
                const updated_question = res.data;
                commit("updateQuestion", updated_question);
                return res.data
            })
            .catch(err => {
                const res = {
                    message: err.response.data.errors.title[0],
                    error: true
                }
                return res;
            })
    },
    addAnswerQuestion: async ({ commit, rootState }, answer) => {
        return await axios.post('/answers', {
            title: answer.title,
            question_id: answer.question_id
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.users.user_token}`
            }
        })
            .then(res => {
                const new_answer = res.data;
                new_answer.votes = [];
                commit("insertQuestionAnswer", new_answer);
                return "New answer successfully added.";
            })
            .catch(err => {
                return err.response.data;
            })
    },
    updateAnswerQuestion: async ({ commit, rootState }, answer) => {
        return await axios.put(`/answers/${answer.id}`, {
            title: answer.title
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.users.user_token}`
            }
        })
            .then(res => {
                const updated_answer = res.data;
                commit("updateQuestionAnswer", updated_answer);
                return res;
            })
            .catch(err => {
                return err.response;
            })
    },
    removeAnswerQuestion: async ({ commit, rootState }, answer) => {
        return await axios.delete(`/answers/${answer.id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.users.user_token}`
            }
        })
            .then((res) => {
                commit("removeQuestionAnswer", res.data);
                return { success: "Remove answer, successful" };
            })
            .catch(err => {
                alert(err);
                return { error: "Something went wrong!!!" };
            })
    },
    addVote: async ({ commit }, vote) => {
        await axios.post('votes/', {
            answer_id: vote.answer_id,
            user_id: vote.user_id,
            question_id: vote.question_id
        })
            .then(res => {
                const new_vote = res.data;
                commit("insertNewVote", new_vote);
                alert("Vote Submitted");
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
    clearQuestionDetails: (state) => state.question = {},
    removeQuestion: (state, id) => state.questions = state.questions.filter(question => question.id != id),
    updateQuestion: (state, update_question) => {
        // we update question detail
        state.question.title = update_question.title;
        state.question.description = update_question.description;
        // we update the lists of questions
        const found_question = state.questions.find(question => question.id === update_question.id);
        if (found_question) {
            found_question.title = update_question.title;
            found_question.description = update_question.description;
        }
    },
    insertQuestionAnswer: (state, answer) => {
        state.question.answers.push(answer); // we update the detailed question
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
    },
    removeQuestionAnswer: (state, deleted_answer) => {
        // remove answer from question details
        state.question.answers = state.question.answers.filter(answer => answer.id != deleted_answer.id);
        // remove answer from questions lists
        const found_question = state.questions.find(question => question.id === deleted_answer.question_id);
        if (found_question) {
            found_question.answers = found_question.answers.filter(answer => answer.id !== deleted_answer.id);
        }
    },
    insertNewVote: (state, vote) => {
        // we update the question fron questions
        const found_question = state.questions.find(question => question.id == vote.question_id);
        const found_question_answer = found_question.answers.find(answer => answer.id == vote.answer_id);
        found_question_answer.votes.push(vote);
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
}