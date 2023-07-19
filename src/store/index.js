import Vuex from "vuex";
import axios from "../axios-configure";
export default new Vuex.Store({
    state: {
        rateSelected: 0,
        comments: [],
        summary: [],
        commentsNumber: 0,
        paginator: {
            currentPage: 1,
            commentsPerPages: 2,
            indexPrinted: 3,
        },
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
                }
            }
            state.comments.forEach(element => {
                comments.push({ ...templateResponse(), ...element })
            })
            return comments;
        },
        getResume(state) {
            return Object.values(state.summary).reverse();
        }
    },
    mutations: {
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
            console.log(state.summary);
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
        loadData({ commit }, payload) {
            let url = "/shopify/get-reviews.php?";
            url += "product_handler=" + payload.product_handler;
            if (payload.note)
                url += "&note=" + payload.note;
            if (payload.page)
                url += "&page=" + payload.page;
            axios.get(url)
                .then((response) => {
                    if (response.status == 200)
                        commit("SET_DATAS", response.data);
                })
                .catch((err) => {
                    console.log('something went wrong :', err)
                })
                ;
        }
    },
    modules: {},
});
