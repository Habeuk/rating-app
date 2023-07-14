import './assets/main.css'
import './assets/styles/main.scss'
import { createApp } from 'vue'
import store from './store'

import App from './App.vue'

const app = createApp(App);
app.use(store);
app.mount('#app');