// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mock/mock.js'
import Axios from 'axios'
import LazyLoad from '@/utils/lazyLoad.js'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.prototype.$http = Axios

Vue.prototype.$BMap = window.BMap
Vue.use(VueAwesomeSwiper)

Vue.use(LazyLoad)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
