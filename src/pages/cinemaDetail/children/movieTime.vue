<template>
    <div class="movie-time">
        <section class="day-list">
            <ul>
                <li v-for="(item,index) in movieTime" :key="index">{{ item.movieDay }}</li>
            </ul>
        </section>
        <section class="date-list">
            <ul v-if="movieTime.length">
                <li v-for="(timeObj,index) in movieTime[index].showTime" :key="index">
                    <div class="time-details">
                        <div>
                            <span class="start-time">{{ timeObj.startTime }}</span>
                            <span class="video-type">{{ timeObj.videoType }}</span>
                            <span class="price">{{ timeObj.price }}</span>
                        </div>
                        <div>
                            <span class="end-time">{{ timeObj.endTime + '散场' }}</span>
                            <span class="video-hall">{{ timeObj.videoHall }}</span>
                            <span class="discount-price">{{ '折扣价：' + timeObj.discountPrice }}</span>
                        </div>
                    </div>
                    <div class="buy-btn">
                        <button @click="chooseSeat">购票</button>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                index: 0
            }
        },
        props: {
            movieTime: Array
        },
        mounted () {
        },
        computed: {
        },
        methods: {
            chooseSeat () {
                this.$router.push('./chooseSeat')
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '../../../common/style/mixin';
.movie-time{
    .day-list ul{
        border-top: vw(1) solid #d6d5d5;
        border-bottom: vw(1) solid #d6d5d5;
        display: flex;
        justify-content: flex-start;
        li{
            line-height: vw(80);
            width: vw(200);
            text-align: center;
            font-size: vw(30);
        }
    }
    .date-list ul li{
        display: flex;
        justify-content:flex-start;
        padding: vw(30) 0;
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
                    height: vw(50);
                    text-align: left;
                    @include big-font;
                    padding-left: vw(20);
                }
                .start-time{
                    font-size: vw(40);
                    font-weight: 700;
                    color: #333;
                }
                .price{
                    font-size: vw(40);
                    font-weight: 700;
                    color: $red;
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
                @include wh(vw(100), vw(60));
                background: $red;
                color: #ffffff;
                border-radius: 6%;
                line-height: vw(60);
                font-size: vw(28);
            }
        }
    }
}
</style>
