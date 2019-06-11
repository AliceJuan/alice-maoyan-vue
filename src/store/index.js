import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
    login: true, // 是否登录
    userInfo: null, // 用户信息
    localCity: {}, // 定位到的城市
    currentCity: {'cname': '北京'}, // 当前选择的城市
    currentPlaceTab: '/msite', // 当前选择的首页下标
    movieId: null, // 电影id
    movieName: null, // 电影名字
    cinemaName: null, // 影院Name
    videoInfo: {}, // 选中的影片时间场次等信息
    seatInfo: {}, // 选中的座位信息
    // orderDetail: { // 订单详情
    //     movieId: null,
    //     movieDay: null,
    //     movieTime: null,
    //     seatInfo: [{
    //         seatNum: null,
    //         price: null
    //     }, {
    //         seatNum: null,
    //         price: null
    //     }]
    // },
    totalPrice: ''
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
