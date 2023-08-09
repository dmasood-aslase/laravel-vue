import Vue from 'vue';
import router from './router/router';
import App from './App.vue';

require('./bootstrap');
window.Vue = require('vue').default;

new Vue({
    el: '#app',
    router,
    components: {
        App
    }
});