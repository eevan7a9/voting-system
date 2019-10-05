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
    deleteQuestion: async ({ commit }, id) => {
        await axios.delete(`/questions/${id}`)
            .then(() => {
                alert("Delete Question, Successful")
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
                alert(new_answer);
                commit("insertQuestionAnswer", new_answer);

            })
            .catch(err => {
                alert(err);
            })
    },
    updateAnswerQuestion: async ({ commit }, answer) => {
        await axios.put(`/answers/${answer.id}`, {
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
    },
    removeAnswerQuestion: async ({ commit }, answer) => {
        await axios.delete(`/answers/${answer.id}`)
            .then(() => {
                commit("removeQuestionAnswer", answer);
            })
            .catch(err => {
                alert(err);
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
        state.question.title = update_question.title; // we update question detail
        state.question.description = update_question.description;
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