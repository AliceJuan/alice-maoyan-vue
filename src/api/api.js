import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return Promise.reject(error)
})

// 封装axios的post请求
export function fetch (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(response => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export default {
    getAllCity (params) {
        return fetch('./static/all_city.json', params)
    },
    getAllFilms (params) {
        return fetch('./static/ten-films.json', params)
    },
    searchFilms (keyword) {
        return fetch('./static/all_films.json', keyword)
    },
    getCinemaData (params) {
        return fetch('./static/bj_cinema.json', params)
    },
    getMovieCinemaData (params) {
        return fetch('./static/film-cinema-info.json', params)
    },
    getFilmDetailsData (params) {
        return fetch('./static/film-details.json', params)
    },
    getFilmComments (params) {
        return fetch('./static/movie-comments.json', params)
    },
    getCinemaDetailsData (params) {
        return fetch('./static/cinema_details.json', params)
    }
}
