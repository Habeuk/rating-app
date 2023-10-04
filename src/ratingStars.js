import { createApp } from 'vue'
import axios from './rootConfig'
import StarsRate from './components/StarsRate.vue'
import './assets/styles/rateStars.scss'
import { appClassStart } from './general-configs'
const element = Array.prototype.slice.call(document.getElementsByClassName(appClassStart))
let count = 1
element.forEach((element) => {
  const product_handler = element.getAttribute('data-product-handler')
  const url = '/shopify/get-reviews.php?minify=1&' + 'product_handler=' + product_handler
  const temp = count
  axios
    .get(url)
    .then((response) => {
      alert('à traiter 1')
      console.log('response : ', response)
      if (response.status == 200) {
        createApp(StarsRate, {
          percentage: response.data.minify.mean,
          label: response.data.minify.count + ' Avis',
          id: temp
        }).mount(element)
      }
    })
    .catch((err) => {
      console.log('something went wrong: ', err)
      createApp(StarsRate, {
        percentage: 0,
        id: temp,
        label: '0 Avis'
      }).mount(element)
    })
  count += 1
})
