const state = {
    questions: [
        {
            "id": 1,
            "user_id": 2,
            "title": "updated Questions",
            "created_at": null,
            "updated_at": "2019-09-16 10:27:45",
            "answers": [
                {
                    "id": 1,
                    "title": "first answer",
                    "question_id": 1,
                    "created_at": "2019-09-16 23:30:31",
                    "updated_at": "2019-09-16 23:30:31"
                },
                {
                    "id": 2,
                    "title": "second answer",
                    "question_id": 1,
                    "created_at": "2019-09-16 23:32:44",
                    "updated_at": "2019-09-16 23:32:44"
                },
                {
                    "id": 3,
                    "title": "updated third",
                    "question_id": 1,
                    "created_at": "2019-09-16 23:34:33",
                    "updated_at": "2019-09-17 00:16:05"
                }
            ],
            "user": {
                "id": 2,
                "name": "user2",
                "email": "user2@gmail.com",
                "email_verified_at": null,
                "created_at": "2019-09-15 08:53:41",
                "updated_at": "2019-09-15 08:53:41"
            }
        },
        {
            "id": 2,
            "user_id": 1,
            "title": "first of all first user",
            "created_at": null,
            "updated_at": null,
            "answers": [
                {
                    "id": 4,
                    "title": "first  answer",
                    "question_id": 2,
                    "created_at": "2019-09-16 23:36:03",
                    "updated_at": "2019-09-16 23:36:03"
                },
                {
                    "id": 7,
                    "title": "second  answer",
                    "question_id": 2,
                    "created_at": "2019-09-16 23:39:35",
                    "updated_at": "2019-09-16 23:39:35"
                },
                {
                    "id": 8,
                    "title": "updated third answer",
                    "question_id": 2,
                    "created_at": "2019-09-16 23:48:34",
                    "updated_at": "2019-09-16 23:55:25"
                }
            ],
            "user": {
                "id": 1,
                "name": "user1s",
                "email": "user1@gmail.com",
                "email_verified_at": null,
                "created_at": "2019-09-15 07:46:23",
                "updated_at": "2019-09-15 07:46:23"
            }
        },
        {
            "id": 3,
            "user_id": 2,
            "title": "question created first",
            "created_at": "2019-09-16 09:56:14",
            "updated_at": "2019-09-16 09:56:14",
            "answers": [
                {
                    "id": 5,
                    "title": "first  answer",
                    "question_id": 3,
                    "created_at": "2019-09-16 23:37:52",
                    "updated_at": "2019-09-16 23:37:52"
                },
                {
                    "id": 6,
                    "title": "second  answer",
                    "question_id": 3,
                    "created_at": "2019-09-16 23:39:30",
                    "updated_at": "2019-09-16 23:39:30"
                }
            ],
            "user": {
                "id": 2,
                "name": "user2",
                "email": "user2@gmail.com",
                "email_verified_at": null,
                "created_at": "2019-09-15 08:53:41",
                "updated_at": "2019-09-15 08:53:41"
            }
        },
        {
            "id": 4,
            "user_id": 2,
            "title": "to test with auth",
            "created_at": "2019-09-16 20:54:50",
            "updated_at": "2019-09-16 20:54:50",
            "answers": [
                {
                    "id": 12,
                    "title": "answer to A",
                    "question_id": 4,
                    "created_at": "2019-09-17 00:07:58",
                    "updated_at": "2019-09-17 00:07:58"
                },
                {
                    "id": 13,
                    "title": "answer to Bas",
                    "question_id": 4,
                    "created_at": "2019-09-17 22:32:36",
                    "updated_at": "2019-09-17 22:32:36"
                },
                {
                    "id": 15,
                    "title": "updated bas",
                    "question_id": 4,
                    "created_at": "2019-09-17 22:34:27",
                    "updated_at": "2019-09-17 22:35:05"
                }
            ],
            "user": {
                "id": 2,
                "name": "user2",
                "email": "user2@gmail.com",
                "email_verified_at": null,
                "created_at": "2019-09-15 08:53:41",
                "updated_at": "2019-09-15 08:53:41"
            }
        },
        {
            "id": 5,
            "user_id": 2,
            "title": "to test with auth 2nd",
            "created_at": "2019-09-16 20:57:33",
            "updated_at": "2019-09-16 20:57:33",
            "answers": [
                {
                    "id": 10,
                    "title": "answer to A",
                    "question_id": 5,
                    "created_at": "2019-09-17 00:02:18",
                    "updated_at": "2019-09-17 00:02:18"
                },
                {
                    "id": 11,
                    "title": "answer to B",
                    "question_id": 5,
                    "created_at": "2019-09-17 00:02:23",
                    "updated_at": "2019-09-17 00:02:23"
                }
            ],
            "user": {
                "id": 2,
                "name": "user2",
                "email": "user2@gmail.com",
                "email_verified_at": null,
                "created_at": "2019-09-15 08:53:41",
                "updated_at": "2019-09-15 08:53:41"
            }
        },
        {
            "id": 6,
            "user_id": 1,
            "title": "question created by user 1",
            "created_at": "2019-09-16 21:00:03",
            "updated_at": "2019-09-16 21:00:03",
            "answers": [],
            "user": {
                "id": 1,
                "name": "user1s",
                "email": "user1@gmail.com",
                "email_verified_at": null,
                "created_at": "2019-09-15 07:46:23",
                "updated_at": "2019-09-15 07:46:23"
            }
        }
    ],
    question: {
        "id": 0,
        "user_id": 0,
        "title": "",
        "created_at": "null",
        "updated_at": "",
        "answers": []
    }
}
const getters = {
    allQuestions: (state) => state.questions,
    questionDetail: state => state.question

}
const actions = {
    getQuestionDetails: ({ commit, state }, id) => {
        setTimeout(() => {
            const question = state.questions.find(question => question.id == id)
            commit("setQuestionDetails", question);
        }, 2000);
    }
}
const mutations = {
    setQuestionDetails: (state, question) => {
        state.question = question;
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
}