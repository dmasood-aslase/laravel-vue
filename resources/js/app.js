import Vue from 'vue';
import router from './router/router';
import App from './App.vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import temperatureStore from './store/temperature.js';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(VueAxios, axios)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

require('./bootstrap');
window.Vue = require('vue').default;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: {
        temperatureStore
    },
    components: {
        App
    }
});