import './assets/main.css'
import './assets/styles/main.scss'
import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import { appId, dataSelector } from './general-configs'

const application = document.getElementById(appId);


const product_handler = application.getAttribute(dataSelector);
store.commit("INIT_HANDLER", product_handler);
store.dispatch("loadData", {});

const app = createApp(App);
app.use(store);
app.mount('#' + appId);