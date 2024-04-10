import { createApp } from 'vue'
import axios from './rootConfig'
import StarsRate from './components/StarsRate.vue'
import './assets/styles/rateStars.scss'
;(function (Drupal) {
  Drupal.behaviors.rating_app_start = {
    attach: function (context, settings) {
      if (settings.rating_app) {
        //const config = settings.rating_app.start
        const elements = context.querySelectorAll
          ? context.querySelectorAll('.rating-app-start')
          : null
        if (elements && elements.length) {
          elements.forEach((element) => {
            if (!element.classList.contains('loaded')) {
              element.classList.add('loaded')
              const url = element.getAttribute('data_url_get_start')
              const id = element.getAttribute('data_entity_id')
              axios
                .dGet(url)
                .then((response) => {
                  createApp(StarsRate, {
                    percentage: response.data.percent,
                    label: response.data.count + ' Avis',
                    id: id,
                    'label-class': 'pl-2'
                  }).mount(element)
                })
                .catch((err) => {
                  console.log('something went wrong: ', err)
                  createApp(StarsRate, {
                    percentage: 0,
                    id: id,
                    label: '0 Avis'
                  }).mount(element)
                })
            }
          })
        }
      }
    }
  }
})(window.Drupal)
