import Vue from 'vue'
import Router from 'vue-router'

// const msite = resolve => require(['@/pages/msite/msite'], resolve)
// const city = resolve => require(['@/pages/city/city'], resolve)
// const cinema = resolve => require(['@/pages/cinema/cinema'], resolve)
// const cinemaDetail = resolve => require(['@/pages/cinemaDetail/cinemaDetail'], resolve)
// const user = resolve => require(['@/pages/user/user'], resolve)
// const login = resolve => require(['@/pages/login/login'], resolve)
// const film = resolve => require(['@/pages/film/film'], resolve)
// const search = resolve => require(['@/pages/search/search'], resolve)
// const chooseSeat = resolve => require(['@/pages/chooseSeat/chooseSeat'], resolve)
// const orderConfirm = resolve => require(['@/pages/orderConfirm/orderConfirm'], resolve)
// const payment = resolve => require(['@/pages/orderConfirm/children/payment'], resolve)

// const testScroll = resolve => require(['@/components/common/testScroll'], resolve)

const msite = r => require.ensure([], () => r(require('@/pages/msite/msite')), 'msite')
const city = r => require.ensure([], () => r(require('@/pages/city/city')), 'city')
const cinema = r => require.ensure([], () => r(require('@/pages/cinema/cinema')), 'cinema')
const cinemaDetail = r => require.ensure([], () => r(require('@/pages/cinemaDetail/cinemaDetail')), 'cinemaDetail')
const user = r => require.ensure([], () => r(require('@/pages/user/user')), 'user')
const login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const film = r => require.ensure([], () => r(require('@/pages/film/film')), 'film')
const search = r => require.ensure([], () => r(require('@/pages/search/search')), 'search')
const chooseSeat = r => require.ensure([], () => r(require('@/pages/chooseSeat/chooseSeat')), 'chooseSeat')
const orderConfirm = r => require.ensure([], () => r(require('@/pages/orderConfirm/orderConfirm')), 'orderConfirm')
const payment = r => require.ensure([], () => r(require('@/pages/orderConfirm/children/payment')), 'payment')

const testScroll = r => require.ensure([], () => r(require('@/components/common/testScroll')), 'testScroll')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/msite'
        }, {
            path: '/testScroll',
            component: testScroll
        }, {
            path: '/msite',
            component: msite
        }, {
            path: '/city',
            component: city
        }, {
            path: '/cinema',
            component: cinema
        }, {
            path: '/cinemaDetail',
            component: cinemaDetail
        }, {
            path: '/chooseSeat',
            component: chooseSeat
        }, {
            path: '/orderConfirm',
            component: orderConfirm,
            children: [{
                path: 'payment',
                component: payment
            }]
        }, {
            path: '/user',
            component: user
        }, {
            path: '/login',
            component: login
        }, {
            path: '/film/:movieId',
            component: film
        }, {
            path: '/search',
            component: search
        }
    ]
})
