// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mock/mock.js'
import Axios from 'axios'
// import LazyLoad from '@/utils/lazyLoad.js'   // 自定义指令懒加载
import LazyLoad from 'vue-lazyload'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.prototype.$http = Axios

Vue.prototype.$BMap = window.BMap
Vue.use(VueAwesomeSwiper)

Vue.use(LazyLoad, {
    loading: 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
