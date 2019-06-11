<template>
    <div>
        <section>
            <head-top :head-title="'确认订单'" go-back="true"></head-top>
            <section class="box-container order">
                <div class="order-info">
                    <div class="movie-info">
                        <span class="movie-name">{{ movieName }}</span><span>{{ seatInfo.length + '张' }}</span>
                        <p>{{ videoInfo.day + ' ' + videoInfo.startTime + '~' + videoInfo.endTime + ' ' +  videoInfo.videoType }}</p>
                        <p>{{ cinemaName }}</p>
                        <p>{{ videoInfo.videoHall }} {{ seatList }}</p>
                    </div>
                    <ul class="cinema-activity">
                        <li>
                            <span>特惠活动</span>
                            <span>暂无</span>
                        </li>
                        <li>
                            <span>电影优惠卷</span>
                            <span>无优惠卷 <i></i></span>
                        </li>
                        <li>
                            <span>兑换卷</span>
                            <span>无兑换卷 <i></i></span>
                        </li>
                        <li>
                            <span>票价总计</span>
                            <span class="total-price">{{ totalPrice + '元' }}</span>
                        </li>
                    </ul>
                </div>
                <p class="divide-line"></p>
                <video-snack :deal-list="dealList"></video-snack>
                <div class="order-footer">
                    <div class="price-info">
                        <span>退改签须知</span>
                        <span class="price">应付 <i class="big">{{ totalPrice }}</i><i>元</i></span>
                    </div>
                    <div class="immediatePay" @click="immediatePay">立即付款</div>
                </div>
            </section>
        </section>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import headTop from '@/components/header/headTop'
    import videoSnack from '@/components/common/videoSnack'
    import api from '@/api/api'
    export default {
        data () {
            return {
                dealList: []
            }
        },
        async mounted () {
            let cinemaInfo = await api.getCinemaDetailsData({'cinemaId': this.cinemaId})
            this.dealList = cinemaInfo.dealList.dealList
        },
        computed: {
            ...mapState(['movieName', 'cinemaName', 'videoInfo', 'seatInfo']),
            seatList () {
                let seatList = this.seatInfo.map(item => item.place)
                return seatList.join(' ')
            },
            totalPrice () {
                let totalPrice = 0
                this.seatInfo.map((item) => { totalPrice += item.price - 0 })
                return totalPrice.toFixed(2)
            }
        },
        methods: {
            ...mapMutations([]),
            immediatePay () {
                this.$router.push('/orderConfirm/payment')
            }
        },
        components: {
            headTop,
            videoSnack
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../common/style/mixin.scss';
    .order{
        &-info{
            .movie-info{
                padding: vw(40);
                background: #769eb0;
                span, p{
                    color: #FFF;
                }
                .movie-name{
                    font-size: vw(38);
                    line-height: vw(90);
                    margin-right: vw(10);
                }
                p{
                    line-height: vw(45);
                }
            }
            .cinema-activity{
                padding: 0 vw(30);
                li{
                    display: flex;
                    justify-content: space-between;
                    line-height: vw(100);
                    .total-price{
                        color: $red;
                    }
                    i{
                        background: url(../../assets/arrow-right.png) no-repeat;
                        background-size: contain;
                        @include wh(vw(35), vw(35));
                        display: inline-block;
                        vertical-align: middle;
                        position: relative;
                        top: vw(-2);
                    }
                }
                li:not(:last-child){
                    border-bottom: vw(1) solid $border;
                }
            }
        }
        &-footer{
            position: fixed;
            bottom: 0;
            z-index: 111;
            width: 100%;
            div{
                @include wh(100%, vw(100));
            }
            .price-info{
                background: #F5F5F5;
                border-top: vw(1) solid $border;
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
                line-height: vw(100);
                .price{
                    i{
                        color: $red;
                    }
                    .big{
                        font-size: vw(38);
                    }
                }
            }
            .immediatePay{
                background: #fe9b01;
                font-size: vw(38);
                text-align: center;
                color: #FFF;
                line-height: vw(100);
            }
        }
    }
</style>
