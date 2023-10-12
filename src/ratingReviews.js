import './assets/main.css'
import './assets/styles/main.scss'
import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import {
  appIdReviews,
  dataEntityIdSelector,
  dataEntityTypeIdSelector,
  dataUrlGetReviews,
  datacommentType
} from './general-configs'
console.log('appIdReviews : ', appIdReviews)
const application = document.getElementById(appIdReviews)

const product_handler = application.getAttribute(dataEntityIdSelector)
const entity_type_id = application.getAttribute(dataEntityTypeIdSelector)
const urlGetReviews = application.getAttribute(dataUrlGetReviews)
const commentType = application.getAttribute(datacommentType)
store.commit('INIT_HANDLER', product_handler)
store.commit('SET_ENTITY_TYPE_ID', entity_type_id)
store.commit('SET_URL_GET_REVIEWS', urlGetReviews)
store.commit('SET_COMMENT_TYPE', commentType)
store.dispatch('loadData', {})

const app = createApp(App)
app.use(store)
app.mount('#' + appIdReviews)
