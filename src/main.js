import Vue from 'vue'
//import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCookies from 'vue-cookies'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//axios.defaults.baseURL = 'http://127.0.0.1:8001/api/';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueCookies);

Vue.config.productionTip = false;

Vue.$cookies.config('7d');

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
