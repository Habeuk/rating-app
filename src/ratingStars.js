import { createApp } from 'vue'
import axios from './rootConfig'
import StarsRate from './components/StarsRate.vue'
import './assets/styles/rateStars.scss'
;(function (Drupal) {
  Drupal.behaviors.rating_app_start = {
    attach: function (context, settings) {
      if (settings.rating_app) {
        const config = settings.rating_app.start
        const url = config.url_get_start
        const element = context.getElementById ? context.getElementById(config.id) : null
        if (element) {
          if (!element.classList.contains('loaded')) {
            element.classList.add('loaded')
            axios
              .dGet(url)
              .then((response) => {
                createApp(StarsRate, {
                  percentage: response.data.percent,
                  label: response.data.count + ' Avis',
                  id: config.id
                }).mount(element)
              })
              .catch((err) => {
                console.log('something went wrong: ', err)
                createApp(StarsRate, {
                  percentage: 0,
                  id: config.id,
                  label: '0 Avis'
                }).mount(element)
              })
          }
        }
      }
    }
  }
})(window.Drupal)
