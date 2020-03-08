import axios from 'axios';

const state = {
    questions: [], // lists of questions from database
    question: {}, // single question for details
    filtered: { sorter: "newest", filter: "all" },
    paginate: {
        current_page: null,
        first_page_url: null,
        last_page: null,
        last_page_url: null,
        next_page_url: null,
        path: null,
        prev_page_url: null,
    },
    search: ""
}
const getters = {
    all_questions: state => state.questions,
    question_detail: state => state.question,
    onFilter: state => state.filtered,
    pagination: state => state.paginate,
    mySearch: state => state.search
}
const actions = {
    getQuestionDetails: async ({ commit }, id) => {
        return axios.get(`questions/${id}`)
            .then(res => {
                commit("setQuestionDetails", res.data);
                return res.data
            })
            .catch(err => {
                alert(err);
                return err.response
            })

    },
    resetQuestionDetails: ({ commit }) => {
        commit("clearQuestionDetails")
    },
    getQuestions: async ({ commit }, path) => {
        const url = path || '/questions';
        await axios.get(url)
            .then(res => {
                commit("setPagination", res.data);
                commit("setQuestions", res.data.data);
            });
    },
    resetQuestions: ({ commit }) => {
        commit("clearQuestions");
    },
    addQuestion: async ({ commit, rootState }, question) => {
        const new_question = await axios.post('/questions', {
            user_id: question.user_id,
            title: question.title,
            description: question.description,
            additional_info: question.additional_info
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
        return await axios.post(`/questions/${id}`, {
            _method: 'delete'
        }, {
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
            description: question.description,
            additional_info: question.additional_info
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
    addVote: async ({ commit, state, rootState }, vote) => {
        return axios.post('votes/', {
            answer_id: vote.answer_id,
            user_id: vote.user_id,
            question_id: vote.question_id
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.users.user_token}`
            }
        })
            .then(res => {
                if (state.filtered.filter == "all" || state.filtered.filter == "search") {
                    commit("insertNewVote", res.data);
                } else {
                    commit("insertNewVote", res.data);
                    commit("removeQuestion", res.data.question_id);
                }
                return res.data.message
            })
            .catch(err => {
                alert(err);
            });
    },
    filterQuestions: async ({ commit, rootState }, operation) => {
        const url = operation.url || `questions/filter/${operation.sorter}/${operation.filter}`;
        return await axios.get(url, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.users.user_token}`
            }
        })
            .then(res => {
                commit("setQuestions", res.data.data);
                commit("setFilter", { sorter: operation.sorter, filter: operation.filter }); // set state filter to true
                commit("setPagination", res.data);
                return { message: `Success, sorted to: ${operation.sorter} and filtered by ${operation.filter}`, error: false };
            })
            .catch(err => {
                alert(err);
                return { message: "Something went wrong", error: true };
            })
    },
    searchQuestions: async ({ commit }, { find, sorter }) => {
        return await axios.post(`questions/search`, {
            find: find,
            sort: sorter
        })
            .then(res => {
                commit("setQuestions", res.data.data);
                commit("setFilter", { sorter: sorter, filter: "search" }); // set state filter to true
                commit("setPagination", res.data);
                commit("setMySearch", find);
            })
            .catch(err => {
                alert(err);
            });
    },
    searchErase: ({ commit }) => commit("clearSearch"),
}
const mutations = {
    setQuestions: (state, questions) => state.questions = questions,
    clearQuestions: (state) => state.questions = [],
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
        state.question.additional_info = update_question.additional_info;
        // we update the lists of questions
        const found_question = state.questions.find(question => question.id === update_question.id);
        if (found_question) {
            found_question.title = update_question.title;
            found_question.description = update_question.description;
            found_question.additional_info = update_question.additional_info;
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
        // we update question answer's votes
        const found_answer = state.question.answers.find(answer => answer.id === vote.answer_id);
        if (found_answer) {
            found_answer.votes.push(vote);
        }
    },
    setFilter: (state, status) => state.filtered = status,
    setPagination: (state, data) => {
        state.paginate.current_page = data.current_page;
        state.paginate.first_page_url = data.first_page_url;
        state.paginate.last_page = data.last_page;
        state.paginate.last_page_url = data.last_page_url;
        state.paginate.next_page_url = data.next_page_url;
        state.paginate.path = data.path;
        state.paginate.prev_page_url = data.prev_page_url;
    },
    setMySearch: (state, search) => state.search = search,
    clearSearch: state => state.search = ""
}
export default {
    state,
    getters,
    actions,
    mutations,
}