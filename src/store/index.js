import Vuex from "vuex";

export default new Vuex.Store({
    state: {
        rateSelected: 0,
    },
    getters: {},
    mutations: {
        SET_RATE_SELECTED(state, payload) {
            state.rateSelected = payload;
        },

    },
    actions: {

        set_selected_rate({ commit }, payload) {
            commit("SET_RATE_SELECTED", payload);
        },

    },
    modules: {},
});
