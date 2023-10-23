import Vuex from 'vuex'
import axios from '../rootConfig'
import { paginator as defaultPaginator, likePath, dislikePath } from '../general-configs'

export default new Vuex.Store({
  state: {
    product_handler: '',
    rateSelected: 0,
    comments: [],
    summary: [],
    configs: {},
    commentsNumber: 0,
    paginator: defaultPaginator,
    note: 0,
    entity_type_id: null,
    url_get_reviews: null,
    comment_type: null,
    urlAddcomment: null,
    field_name: null,
    loadingData: true,
    form: {
      titre: '',
      comment: '',
      start: 0
    }
  },
  getters: {
    getFormatedComments(state) {
      const comments = new Array()
      const templateResponse = () => {
        return {
          id: 0,
          name: 'Lelong f.',
          status_user_display: state.configs.review.status_user_display,
          status_user_text: state.configs.review.status_user_text,
          status_user_badge: state.configs.review.status_user_badge,
          rate: 2,
          title: ' Parfait ',
          content: 'Nickel, rentrée en cetose rapidement ',
          date: 1688986905420,
          adminReply: {
            name: 'admin',
            date: null,
            content: ''
          },
          reponse: ''
        }
      }
      state.comments.forEach((element) => {
        const temp = { ...templateResponse(), ...element }
        comments.push(temp)
      })
      return comments
    },
    getResume(state) {
      return Object.values(state.summary).reverse()
    }
  },
  mutations: {
    INIT_HANDLER(state, handler) {
      state.product_handler = handler
    },
    SET_ENTITY_TYPE_ID(state, entity_type_id) {
      state.entity_type_id = entity_type_id
    },
    SET_URL_GET_REVIEWS(state, url) {
      state.url_get_reviews = url
    },
    SET_RATE_SELECTED(state, payload) {
      state.rateSelected = payload
    },
    SET_COMMENTS_NUMBER(state, payload) {
      state.commentsNumber = payload
    },
    SET_COMMENT_TYPE(state, payload) {
      state.comment_type = payload
    },
    SET_URLADDCOMMENT(state, payload) {
      state.urlAddcomment = payload
    },
    SET_FIELD_NAME(state, payload) {
      state.field_name = payload
    },
    RESET_FORM(state) {
      console.log('reset form : ', state.form)
      state.form = {
        titre: '',
        comment: '',
        start: 0
      }
      console.log('reset form : ', state.form)
    },
    SET_DATAS(state, payload) {
      state.comments = payload.reviews
      state.configs = payload.configs
      state.summary = Object.values(payload.summary)
        .reverse()
        .map((element) => {
          return Number(element)
        })
      if (!state.rateSelected) {
        state.commentsNumber = 0
        state.summary?.forEach((element) => {
          state.commentsNumber += Number(element)
        })
      } else state.commentsNumber = state.summary[state.rateSelected - 1]
    },
    UPDATE_FILTER(state, payload) {
      if (payload.note || payload.note == 0) state.rateSelected = payload.note
      if (payload.page) state.paginator.currentPage = payload.page
    },
    UPDATE_LIKES(state, payload) {
      state.comments[payload.index].likes += payload.variation
    },
    UPDATE_DISLIKES(state, payload) {
      state.comments[payload.index].dislikes += payload.variation
    }
  },
  actions: {
    set_selected_rate({ commit }, payload) {
      commit('SET_RATE_SELECTED', payload)
    },
    set_comments_number({ commit }, payload) {
      commit('SET_COMMENTS_NUMBER', payload)
    },
    /**
     *
     * @param {*} param0
     * @param {*} payload
     */
    loadData({ commit, state }, payload) {
      state.loadingData = true
      let url = state.url_get_reviews + '?limit=' + state.paginator.commentsPerPages
      if (payload.note || payload.note == 0) commit('UPDATE_FILTER', { note: payload.note })
      if (state.rateSelected) url += '&note=' + state.rateSelected
      if (payload.page) {
        commit('UPDATE_FILTER', { page: payload.page })
        url += '&page=' + payload.page
      }
      // console.log('loadData  params : ', payload, '\n rateSelected: ', state.rateSelected)
      axios
        .dGet(url)
        .then((response) => {
          commit('SET_DATAS', response.data)
          setTimeout(() => {
            state.loadingData = false
          }, 250)
        })
        .catch((err) => {
          console.log('something went wrong :', err)
          state.loadingData = false
        })
    },
    likeComment({ commit, state }, payload) {
      const index = state.comments.findIndex((element) => element.id == payload.id)
      let url = likePath + '/' + state.comment_type + '/' + payload.id
      axios
        .dPost(url, { value: 1 })
        .then((response) => {
          if (response.status == 200) commit('UPDATE_LIKES', { ...payload, index })
        })
        .catch((err) => {
          console.log('something went wrong :', err)
        })
    },
    dislikeComment({ commit, state }, payload) {
      const index = state.comments.findIndex((element) => element.id == payload.id)
      let url = dislikePath + '/' + state.comment_type + '/' + payload.id
      axios
        .dPost(url, { value: -1 })
        .then((response) => {
          if (response.status == 200) commit('UPDATE_DISLIKES', { ...payload, index })
        })
        .catch((err) => {
          console.log('something went wrong :', err)
        })
    },
    ValidFormAddComment({ state }) {
      if (state.form.start > 0 && state.form.comment && state.form.comment.length > 3) return true
      else return false
    },
    addComment({ state, dispatch }) {
      return new Promise((resolv, reject) => {
        const ValidForm = dispatch('ValidFormAddComment')
        ValidForm.then((resp) => {
          if (resp) {
            const datas = {
              comment_type: state.comment_type,
              field_name: state.field_name,
              ...state.form
            }
            resolv(axios.dPost(state.urlAddcomment, { form: datas }))
          } else reject('error')
        }).catch((er) => {
          reject(er)
        })
      })
    }
  },
  modules: {}
})
