import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import '@/assets/app.scss';

import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);
app.use(VueAxios, axios);
app.use(BootstrapVue3);
app.use(pinia);
app.use(router);
app.mount("#app");
