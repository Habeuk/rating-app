import './assets/main.css'
import './assets/styles/main.scss'
import { createApp } from 'vue'
import store from './store'

import App from './App.vue'
const application = document.getElementById("app");


const product_handler = application.getAttribute('data-product-handler');
store.commit("INIT_HANDLER", product_handler);
store.dispatch("loadData", {});

const app = createApp(App);
app.use(store);
app.mount('#app');