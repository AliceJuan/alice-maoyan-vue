<template>
    <div class="cinema">
        <head-top :head-title="headTitle" :go-back="goBack"></head-top>
        <section class="box-container">
            <search-box v-if="!movieSearchCinema" @searchEvent="getCinemaData"></search-box>
            <ul v-if="movieSearchCinema" class="show-days">
                <li v-for="(day,index) in showDays" :key="index" @click="chooseDay(day,index)" :class="{'active': dayIndex===index}">{{ day.date }}</li>
            </ul>
            <cinema-list :cinemaList="cinemaList" :movieSearchCinema="movieSearchCinema"></cinema-list>
        </section>
        <foot-guide v-if="!movieSearchCinema"></foot-guide>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import headTop from '@/components/header/headTop'
    import footGuide from '@/components/footer/footGuide'
    import searchBox from '@/components/common/searchBox'
    import cinemaList from '@/components/common/cinemaList'
    import api from '@/api/api'

    export default {
        data () {
            return {
                headTitle: '影院',
                goBack: false,
                cinemaList: [],
                movieSearchCinema: false,
                showDays: [],
                dayIndex: 0
            }
        },
        created () {
            if (this.$route.query.id) {
                this.goBack = true
                let nowDay = new Date().toLocaleDateString()
                this.getMovieCinemaData(nowDay.replace(/\//g, '-'))
                this.movieSearchCinema = true
                this.headTitle = this.movieName
            } else {
                this.getCinemaData()
            }
        },
        computed: {
            ...mapState([
                'movieId', 'movieName'
            ])
        },
        methods: {
            async getCinemaData (keyword) {
                this.cinemaList = await api.getCinemaData()
            },
            async getMovieCinemaData (day) {
                let param = {
                    'movieId': this.movieId,
                    'day': day
                }
                let respData = await api.getMovieCinemaData(param)
                this.cinemaList = respData.cinemas
                this.showDays = respData.showDays.dates
            },
            chooseDay (day, index) {
                this.dayIndex = index
                this.getMovieCinemaData(day.date)
            }
        },
        components: {
            headTop,
            footGuide,
            searchBox,
            cinemaList
        }
    }
</script>

<style lang="scss">
    @import '../../common/style/mixin.scss';
    .show-days{
        display: flex;
        justify-content: flex-start;
        overflow-x: scroll;
        li{
            flex: none;
            line-height: vw(90);
            width: vw(220);
            text-align: center;
            &.active {
                border-bottom: 2px solid $red;
                color: $red;
            }
        }
    }
</style>
