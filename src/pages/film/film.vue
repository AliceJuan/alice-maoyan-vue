<template>
    <div>
        <head-top :head-title="currentFilm.cname" :go-back="true"></head-top>
        <section class="movie-details">
            <section class="movie-headers">
                <div class="movie-img">
                    <img :src="currentFilm.imgSrc" alt="电影海报">
                </div>
                <div class="movie-content">
                    <div class="movie-name">{{currentFilm.cname}}</div>
                    <div class="movie-ename">{{currentFilm.ename}}</div>
                    <star-score v-if='currentFilm.score' :score='currentFilm.score' :peopleNum='currentFilm.peopleNum'></star-score>
                    <div class="movie-wanner" v-if='!currentFilm.score'></div>
                    <div class="movie-category">{{currentFilm.categoryCat}}</div>
                    <div class="movie-date">{{currentFilm.releaseDate}}</div>
                </div>
            </section>
            <section class="movie-desc">
                <span :class="{'expand-desc': expandDescFlag}">{{currentFilm.desc}}</span>
                <div @click="expandDesc" :class="{'desc-arrow': expandDescFlag}"></div>
            </section>
            <p class="divide-line"></p>
            <actor-list :items="actors" showType="actor"></actor-list>
            <p class="divide-line"></p>
            <section class="movie-comments">
                <h3>讨论</h3>
                <ul>
                    <li v-for="comment in comments" :key="comment.id">
                        <img :src="comment.avatarUrl" alt="">
                        <div class="comment-info">
                            <div>
                                <p>{{ comment.nick }}</p>
                                <p class="score">{{ '给这部作品打了' + comment.score + '分' }}</p>
                            </div>
                            <div class="content">{{ comment.content }}</div>
                            <div class="">
                                <span class="time">{{ comment.time }}</span>
                                <span class="up-count">{{ comment.upCount }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
            <!--<router-link :to="{path:'/cinema', query:{id:currentFilm.movieId, cname: currentFilm.cname}}" class="buy-btn">特惠购票</router-link>-->
            <div @click="goToCinema()" class="buy-btn">特惠购票</div>
        </section>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import headTop from '@/components/header/headTop'
    import starScore from '@/components/common/starScore'
    import actorList from '@/components/common/horizontalList'
    import api from '@/api/api'

    export default {
        data () {
            return {
                currentFilm: {},
                actors: [],
                comments: [],
                expandDescFlag: false
            }
        },
        components: {
            headTop,
            starScore,
            actorList
        },
        created () {
            this.getInitData()
        },
        computed: {
            movieBg () {
                return {
                    backgroundImage: `url(${this.currentFilm.imgSrc})`
                }
            }
        },
        methods: {
            ...mapMutations([
                'SAVE_MOVIE_ID', 'SAVE_MOVIE_NAME'
            ]),
            async getInitData () {
                let filmId = this.$route.params.movieId
                // 获取电影详情及演员列表
                this.currentFilm = await api.getFilmDetailsData({'filmId': filmId})
                this.actors = this.currentFilm.actors
                // 获取评论
                this.comments = (await api.getFilmComments({'filmId': filmId})).data.hotComments
            },
            expandDesc () {
                this.expandDescFlag = !this.expandDescFlag
            },
            goToCinema () {
                this.SAVE_MOVIE_ID(this.currentFilm.movieId)
                this.SAVE_MOVIE_NAME(this.currentFilm.cname)
                this.$router.push({path: '/cinema', query: { id: this.currentFilm.movieId }})
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../common/style/mixin.scss';

.movie-details{
    position: absolute;
    top: $--tab-height;
    left: 0;
    bottom: 0;
    right: 0;
    .movie-headers{
        @include wh(100%, vw(370));
        position: relative;
        overflow: hidden;
        padding: vw(30);
        background: #ccc;
        div{
            float: left;
            display: block;
        }
        img{
            @include wh(vw(220), vw(300));
        }
        .movie-content{
            width: calc(100% - 30vw);
            padding-left: vw(30);
            color: #fff;
            .movie-name{
                width: 100%;
                font-size: vw(40);
                @include utils-ellipsis;
            }
            .movie-ename{
                width: 100%;
                font-size: vw(25);
                line-height: vw(50);
                @include utils-ellipsis;
            }
            .movie-category, .movie-date{
                width: 100%;
                font-size: vw(30);
                line-height: vw(50);
            }
        }
    }
    .movie-desc{
        padding: vw(30) vw(30) 0 vw(30);
        span{
            height: vw(120);
            display: block;
            overflow: hidden;
        }
        .expand-desc{
            height: vw(200);
        }
        div{
            @include wh(vw(50), vw(50));
            background: url('../../assets/arrow-down.png') no-repeat;
            background-size: contain;
            margin: vw(5) auto;
            transition: all .8s ease;
        }
        .desc-arrow{
            transform: rotate(180deg);
        }
    }
    .divide-line{
        background-color: rgb(226,226,226) !important;
        height: vw(10) !important;
    }
    .buy-btn{
        margin: vw(10) vw(20);
        @include wh(95%, vw(80));
        position: fixed;
        bottom: 0;
        line-height: vw(80);
        text-align: center;
        background: $red;
        color: #ffffff;
        border-radius: vw(10);
        font-size: vw(35);
    }
    .movie-comments{
        margin: 0 vw(30) vw(90) vw(30);
        h3{
            line-height: vw(80);
            font-size: vw(32);
        }
        ul li{
            position: relative;
            width: 100%;
            padding: vw(20) 0;
            overflow: hidden;
            border-bottom: vw(1) solid #d6d5d5;
            img{
                @include wh(vw(70), vw(70));
                border-radius: 50%;
                float: left;
            }
            .comment-info{
                margin-left: vw(90);
                p{
                    font-size: vw(26);
                }
                .score, .time, .up-count{
                    font-size: vw(24);
                    color: #969494;
                }
                .content{
                    padding: vw(15) 0;
                }
                .time{
                    float: left;
                }
                .up-count{
                    float: right;
                    &::before{
                        content: url('../../assets/dianzan.png');
                        margin-right: vw(10);
                    }
                }
            }
        }
    }
}
</style>
