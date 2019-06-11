<template>
    <div>
        <head-top :head-title="cinemaInfo.name" :go-back="true"></head-top>
        <section class="box-container">
            <section class="cinema-title">
                <div>
                    <h3>{{ cinemaInfo.name }}</h3>
                    <span>{{ cinemaInfo.address }}</span>
                </div>
                <span><i></i></span>
            </section>
            <!--<movie-list :items="movieList"></movie-list>-->
            <section class="cinema-nav">
                <div class="cinema-nav-list">
                    <div class="post-bg"></div>
                    <div class="post-bg-filter">
                        <!--背景图-->
                    <div class="box" v-if="movieList.length">
                        <img style="width:100%;height:100%;filter: blur(30px);" :src='picFix(movieList[movieIndex].imgSrc)' alt="" />
                    </div>
                    </div>
                    <div class="swiper-box">
                        <!-- 轮播 -->
                        <transition name="slide">
                            <swiper ref="mySwiper" :options="swiperOption">
                            <swiper-slide  v-for="(movies, index) in movieList" :key="movies.id">
                                <div :class="{active:(movieIndex== index)}">
                                    <img :src="picFix(movies.imgSrc)" alt="" @click="switchThis($event)">
                                </div>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                            </swiper>
                    </transition>
                    </div>
                </div>
                <!-- 电影介绍 -->
                <div class="movie-details" v-if="movieList.length">
                <h3>{{ movieList[movieIndex].cname }}</h3>
                <p>{{ movieList[movieIndex].duration}} | {{movieList[movieIndex].categoryCat}} | {{movieList[movieIndex].actors.join(",") }}</p>
                </div>
            </section>
            <!--<movie-time :movieTime="movieTime"></movie-time>-->
            <section class="movie-time">
                <ul class="day-list">
                    <li v-for="(item,index) in movieTime" :key="index" @click="changeMoiveTime(index)" :class="{active:timeIndex==index}">{{ item.movieDay }}</li>
                </ul>
                <section class="date-list">
                    <ul v-if="movieTime.length">
                        <li v-for="(timeObj,index) in movieTime[timeIndex].showTime" :key="index">
                            <div class="time-details">
                                <div>
                                    <span class="start-time">{{ timeObj.startTime }}</span>
                                    <span class="video-type">{{ timeObj.videoType }}</span>
                                    <span class="price"><i>￥</i><i class="price-str">{{ timeObj.price }}</i></span>
                                </div>
                                <div>
                                    <span class="end-time">{{ timeObj.endTime + '散场' }}</span>
                                    <span class="video-hall">{{ timeObj.videoHall }}</span>
                                    <span class="discount-price">{{ '折扣卡首单' }}</span>
                                </div>
                            </div>
                            <div class="buy-btn">
                                <button @click="chooseSeat(timeObj)">购票</button>
                            </div>
                        </li>
                    </ul>
                </section>
            </section>
            <p class="divide-line"></p>
            <video-snack :deal-list="dealList"></video-snack>
        </section>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import api from '@/api/api'
    import headTop from '@/components/header/headTop'
    import videoSnack from '@/components/common/videoSnack'
    //  import movieList from './children/movieList'
    //  import movieTime from './children/movieTime'

    export default {
        data () {
            return {
                cinemaId: '', // 影院id
                cinemaInfo: {}, // 影院信息
                movieList: [], // 影院上映的电影
                movieIndex: 0, // 当前电影索引
                movieTime: [], // 电影场次时间
                timeIndex: 0, // 当前日期索引
                // selectDay: '',
                dealList: [], // 观影小吃
                swiperOption: {
                    slidesPerView: 'auto', // 两侧的张数设为auto
                    spaceBetween: 30, // swiper-slide之间的空隙（margin值）
                    centeredSlides: true, // 是否居中
                    slideToClickedSlide: true // 点击slider会居中
                }
            }
        },
        created () {
            this.cinemaId = this.$route.query.cinemaId
            this.cinemaName = this.$route.query.cinemaName
            this.SAVE_CINEMA_NAME(this.cinemaName)
        },
        async mounted () {
            this.cinemaInfo = await api.getCinemaDetailsData({'cinemaId': this.cinemaId})
            this.movieList = this.cinemaInfo.movies
            this.movieTime = this.cinemaInfo.movies[this.movieIndex].movieTime
            this.dealList = this.cinemaInfo.dealList.dealList
            this.movieList.forEach((item, index) => {
                if (item.cname === this.movieName) {
                    this.movieIndex = index
                }
            })
            // 轮播
            this.$nextTick(() => {
                this.swiper.slideTo(this.movieIndex, 1000, false)
                this.$refs.mySwiper.$on('transitionEnd', () => {
                    this.movieIndex = this.swiper.snapIndex
                    this.movieTime = this.movieList[this.movieIndex].movieTime
                })
            })
        },
        computed: {
            ...mapState([
                'movieName'
            ]),
            swiper () {
                return this.$refs.mySwiper.swiper
            },
            selectDay () {
                return this.movieTime[this.timeIndex].movieDay
            }
        },
        methods: {
            ...mapMutations([
                'SAVE_MOVIE_NAME', 'SAVE_CINEMA_NAME', 'SAVE_VIDEO_INFO'
            ]),
            picFix (wh) {
                if (wh !== undefined) {
                    return wh.replace('w.h', '65.94')
                }
            },
            // 点击图片切换影片
            switchThis (e) {
                this.movieIndex = this.swiper.snapIndex
            },
            changeMoiveTime (index) {
                this.timeIndex = index
            },
            chooseSeat (timeObj) {
                timeObj.day = this.selectDay
                this.SAVE_VIDEO_INFO(timeObj)
                this.SAVE_MOVIE_NAME(this.movieList[this.movieIndex].cname)
                this.$router.push('./chooseSeat')
            }
        },
        components: {
            headTop,
            videoSnack
            // movieList,
            // movieTime
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../common/style/mixin.scss';
    .cinema-title{
        display: flex;
        justify-content: space-between;
        align-content: center;
        padding: vw(30) 0;
        > div{
            flex: 3;
            @include utils-ellipsis;
            padding: 0 vw(30);
            border-right: vw(1) solid #838282;
            h3{
                font-weight: 700;
            }
            span{
                line-height: vw(70);
                font-size: vw(30);
                color: #585757;
            }
        }
        > span{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                background: url('../../assets/location.png') no-repeat;
                background-size: contain;
                @include wh(vw(60), vw(60));
            }
        }
    }
    .cinema-nav{
        .cinema-nav-list {
            // padding: vw(30) vw(15) vw(30) vw(5);
            padding: vw(50);
            margin-left: auto;
            margin-right: auto;
            position: relative;
            overflow: hidden;
            z-index: 1;
            .swiper-box {
                position: relative;
                z-index: 10;
                width: 100%;
                .swiper-container {
                    margin: 0 auto;
                    position: relative;
                    overflow: visible;
                    list-style: none;
                    padding: 0;
                    z-index: 1;
                }
                .swiper-slide {
                    @include wh(vw(140), vw(200));
                    .active {
                        position: relative;
                        @include wh(vw(140), vw(200));
                        border: vw(4) solid #fff;
                        transform: scale(1.2);
                        -webkit-transform: scale(1.2);
                        box-sizing: content-box;
                        &::after {
                            width: 0;
                            height: 0;
                            content: "";
                            position: absolute;
                            left: 50%;
                            -webkit-transform: translateX(-50%);
                            transform: translateX(-50%);
                            bottom: vw(-23);
                            z-index: 100;
                            border: vw(10) solid transparent;
                            border-top: vw(10) solid #fff;
                        }
                    }
                }
                img {
                    @include wh(vw(140), vw(200));
                    cursor: pointer;
                }
            }
        }
        .post-bg, .post-bg-filter {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        .post-bg {
            z-index: -1;
            overflow: hidden;
            -webkit-filter: blur(30px);
            filter: blur(30px);
            background-position-y: 40%;
        }
        .post-bg-filter {
            background-color: #40454d;
            opacity: .55;
        }
    }
    .movie-details{
        text-align: center;
        padding: vw(20) 0;
        h3{
            font-weight: 700;
        }
        p{
            line-height: vw(50);
            @include small-font;
        }
    }
    .movie-time{
        .day-list{
            border-top: vw(1) solid #d6d5d5;
            border-bottom: vw(1) solid #d6d5d5;
            display: flex;
            justify-content: flex-start;
            li{
                line-height: vw(80);
                width: 30%;
                text-align: center;
                font-size: vw(28);
                &.active {
                    border-bottom: 2px solid $red;
                    color: $red;
                }
            }
        }
        .date-list ul li{
            display: flex;
            justify-content:flex-start;
            padding: vw(25) vw(8);
            .time-details{
                flex: 4;
                > div{
                    display: flex;
                    align-items: flex-start;
                    &:first-child{
                        display: flex;
                        justify-content: flex-start;
                        align-items: baseline;
                    }
                    span{
                        height: vw(45);
                        text-align: left;
                        @include small-font;
                        padding-left: vw(20);
                    }
                    .start-time{
                        font-size: vw(38);
                        color: #333;
                    }
                    .price i{
                        color: $red;
                    }
                    .price-str{
                        font-size: vw(38);
                    }
                    .start-time, .end-time{
                        width: 25%;
                    }
                    .video-type, .video-hall{
                        width: 45%;
                    }
                    .price, .discount-price{
                        width: 35%;
                    }
                }
            }
            .buy-btn{
                flex: 1;
                align-items: center;
                justify-content: center;
                display: flex;
                button{
                    @include wh(vw(90), vw(50));
                    background: $red;
                    color: #ffffff;
                    border-radius: 6%;
                    line-height: vw(50);
                    font-size: vw(25);
                }
            }
        }
    }
</style>
