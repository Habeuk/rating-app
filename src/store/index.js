import Vuex from "vuex";

export default new Vuex.Store({
    state: {
        rateSelected: 0,
        comments:{},
        commentsNumber: 0,
    },
    getters: {},
    mutations: {
        SET_RATE_SELECTED(state, payload) {
            state.rateSelected = payload;
        },
        SET_COMMENTS_NUMBER(state, payload){
            state.commentsNumber = payload;
        }

    },
    actions: {

        set_selected_rate({ commit }, payload) {
            commit("SET_RATE_SELECTED", payload);
        },
        set_comments_number({commit}, payload){
            commit("SET_COMMENTS_NUMBER", payload);
        }
    },
    modules: {},
});
