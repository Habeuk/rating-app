import Vuex from "vuex";
import axios from "../axios-configure";
import { paginator as defaultPaginator, resetActionVar, getRequestPath, likePath, dislikePath } from "../general-configs";

export default new Vuex.Store({
    state: {
        product_handler: "",
        rateSelected: 0,
        comments: [],
        summary: [],
        commentsNumber: 0,
        paginator: defaultPaginator,
        note: 0
    },
    getters: {
        getFormatedComments(state) {
            const comments = new Array();
            const templateResponse = () => {
                return {
                    id: 0,
                    name: "Lelong f.",
                    state: true,
                    rate: 2,
                    title: " Parfait ",
                    content: "Nickel, rentrée en cetose rapidement ",
                    date: 1688986905420,
                    adminReply: {
                        name: "admin",
                        date: null,
                        content: "",
                    },
                    reponse: "",
                }
            }
            state.comments.forEach(element => {
                const temp = { ...templateResponse(), ...element };
                comments.push(temp)
            })
            return comments;
        },
        getResume(state) {
            return Object.values(state.summary).reverse();
        }
    },
    mutations: {
        INIT_HANDLER(state, handler) {
            state.product_handler = handler;
        },
        SET_RATE_SELECTED(state, payload) {
            state.rateSelected = payload;
        },
        SET_COMMENTS_NUMBER(state, payload) {
            state.commentsNumber = payload;
        },
        SET_DATAS(state, payload) {
            state.comments = payload.review;
            state.summary = Object.values(payload.summary).reverse().map(element => {
                return Number(element);
            });
            if (!state.rateSelected) {

                state.commentsNumber = 0;
                state.summary?.forEach(element => {
                    state.commentsNumber += Number(element);
                })
            }
            else
                state.commentsNumber = state.summary[state.rateSelected - 1];
        },
        UPDATE_FILTER(state, payload) {
            if (payload.note || payload.note == 0)
                state.rateSelected = payload.note
            if (payload.page)
                state.paginator.currentPage = payload.page
        },
        UPDATE_LIKES(state, payload) {
            if (payload.variation == 1 || state.comments[payload.index].likes) {
                state.comments[payload.index].likes += payload.variation;
            }
        },
        UPDATE_DISLIKES(state, payload) {
            if (payload.variation == 1 || state.comments[payload.index].dislikes) {
                state.comments[payload.index].dislikes += payload.variation;
            }
        }
    },
    actions: {
        set_selected_rate({ commit }, payload) {
            commit("SET_RATE_SELECTED", payload);
        },
        set_comments_number({ commit }, payload) {
            commit("SET_COMMENTS_NUMBER", payload);
        },
        /**
         * 
         * @param {*} param0 
         * @param {*} payload 
         */
        loadData({ commit, state }, payload) {
            let url = getRequestPath;
            url += "handle=" + state.product_handler;
            if (payload.note || payload.note == 0)
                commit("UPDATE_FILTER", { note: payload.note })
            if (state.rateSelected)
                url += "&note=" + payload.note;
            if (payload.page) {
                commit("UPDATE_FILTER", { page: payload.page })
                url += "&page=" + payload.page;
            }
            axios.get(url)
                .then((response) => {
                    if (response.status == 200)
                        commit("SET_DATAS", response.data);
                })
                .catch((err) => {
                    console.log('something went wrong :', err);
                })
                ;
        },
        likeComment({ commit, state }, payload) {
            const index = state.comments.findIndex((element) =>
                element.id == payload.id);
            let url = likePath + payload.id;
            if (payload.variation == -1) {
                url += resetActionVar;
            }
            axios.get(url)
                .then((response) => {
                    if (response.status == 200)
                        commit("UPDATE_LIKES", { ...payload, index });
                })
                .catch((err) => {
                    console.log('something went wrong :', err);
                })
        },
        dislikeComment({ commit, state }, payload) {
            const index = state.comments.findIndex((element) => element.id == payload.id);
            let url = dislikePath + payload.id;
            if (payload.variation == -1)
                url += resetActionVar;
            axios.get(url)
                .then((response) => {
                    if (response.status == 200)
                        commit("UPDATE_DISLIKES", { ...payload, index });
                })
                .catch((err) => {
                    console.log('something went wrong :', err);
                })
        }

    },
    modules: {},
});
