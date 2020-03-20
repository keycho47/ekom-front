import Vuex from 'vuex';
import Vue from 'vue';
import User from './modules/user.js';
import Stock from './modules/stock.js';
import Auth from './modules/auth.js';



Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        User,
        Stock,
        Auth
    }
})
