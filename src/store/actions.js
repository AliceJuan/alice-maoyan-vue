import { getStore, setStore } from '@/utils/localStorage'

import {
    LOCATION_CITY
} from './mutation-types.js'

export default{
    // 定位
    locationCity ({commit}, city) {
        commit(LOCATION_CITY, city)
    },
    // 切换地市
    selectCity ({commit}, city) {
        city = JSON.parse(JSON.stringify(city))
        setStore('currentCity', city)
        let historyCities = getStore('historyCities') || []
        const flag = historyCities.find(item => item.cname === city.cname)
        if (!flag) {
            historyCities.push(city)
            setStore('historyCities', historyCities)
        }
        commit('SELECT_CITY', city)
    }
}
