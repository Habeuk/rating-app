import './assets/main.css'
import './assets/styles/main.scss'
import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'

import { dataUrlGetReviews, urlAddcomment, paginator } from './general-configs'
;(function (Drupal) {
  Drupal.behaviors.rating_app_reviews = {
    attach: function (context, settings) {
      if (settings.rating_app) {
        const config = settings.rating_app.review
        const application = context.getElementById ? context.getElementById(config.id) : null
        if (application && !application.classList.contains('loaded')) {
          application.classList.add('loaded')
          paginator.commentsPerPages = config.comments_per_pages
          store.commit('INIT_HANDLER', config.entity_id)
          store.commit('SET_ENTITY_TYPE_ID', config.entity_type_id)
          store.commit('SET_COMMENT_TYPE', config.comment_type)
          store.commit('SET_FIELD_NAME', config.field_name)
          store.commit('SET_URL_GET_REVIEWS', application.getAttribute(dataUrlGetReviews))
          store.commit('SET_URLADDCOMMENT', application.getAttribute(urlAddcomment))
          store.dispatch('loadData', {})
          const app = createApp(App)
          //
          app.use(PrimeVue, {})
          //
          app.use(store)
          app.mount('#' + config.id)
        }
      }
    }
  }
})(window.Drupal)
