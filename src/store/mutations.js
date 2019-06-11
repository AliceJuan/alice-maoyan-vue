import {
    LOCATION_CITY,
    SELECT_CITY,
    UPDATE_PLACE_TAB,
    SAVE_MOVIE_ID,
    SAVE_MOVIE_NAME,
    SAVE_CINEMA_NAME,
    SAVE_VIDEO_INFO,
    SAVE_SEAT_INFO
} from './mutation-types.js'

export default{
    [LOCATION_CITY]: (state, localCity) => {
        state.localCity = localCity
    },
    [SELECT_CITY]: (state, currentCity) => {
        state.currentCity = currentCity
    },
    [UPDATE_PLACE_TAB]: (state, currentPlaceTab) => {
        state.currentPlaceTab = currentPlaceTab
    },
    [SAVE_MOVIE_ID]: (state, movieId) => {
        state.movieId = movieId
    },
    [SAVE_MOVIE_NAME]: (state, movieName) => {
        state.movieName = movieName
    },
    [SAVE_CINEMA_NAME]: (state, cinemaName) => {
        state.cinemaName = cinemaName
    },
    [SAVE_VIDEO_INFO]: (state, videoInfo) => {
        state.videoInfo = videoInfo
    },
    [SAVE_SEAT_INFO]: (state, seatInfo) => {
        state.seatInfo = seatInfo
    }
}
