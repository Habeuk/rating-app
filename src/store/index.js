import Vuex from "vuex";
import axios from "../axios-configure";
export default new Vuex.Store({
    state: {
        rateSelected: 0,
        comments: [],
        summary: {},
        commentsNumber: 4,
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
            console.log(state.comments);
            state.summary = payload.summary;
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
            axios.get("/shopify/get-reviews.php?product_handler=" + "mct-pure-huile-mct-coco-bouteille-en-verre")
                .then((response) => {
                    if (response.status == 200)
                        commit("SET_DATAS", response.data);
                    console.log(response.data.review);
                })
                .catch((err) => {
                    console.log("couldn't get comments: ", err);
                })
                ;
        }
    },
    modules: {},
});
