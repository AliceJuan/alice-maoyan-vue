<template>
    <div>
        <head-top :head-title="headTitle"></head-top>
        <div class="user">
            <header class="header" @click="$router.push('login')">
                <div class="user-icon"></div>
                <span>登录/注册</span>
            </header>
            <div class="user-info">
                <router-link class="user-order" :to="{ name: ''}">
                    <span class="user-order-left">我的订单</span>
                    <div class="user-order-right">
                        <span>全部订单</span>
                        <i class="icon-go"></i>
                    </div>
                </router-link>
                <ul class="user-operation">
                    <router-link :to="{ name: ''}" tag="li">
                        <span class="wait-pay-icon"></span>
                        <p>待付款</p>
                    </router-link>
                    <router-link :to="{ name: ''}" tag="li">
                        <span class="wait-comment-icon"></span>
                        <p>待评价</p>
                    </router-link>
                    <router-link :to="{ name: ''}" tag="li">
                        <span class="refund-icon"></span>
                        <p>退款</p>
                    </router-link>
                </ul>
                <ul class="user-activity">
                    <router-link class="" :to="{ name: ''}" tag="li">
                        <span>会员福利</span><i class="icon-go"></i>
                    </router-link>
                    <router-link class="" :to="{ name: ''}" tag="li">
                        <span>我的优惠</span><i class="icon-go"></i>
                    </router-link>
                    <router-link class="" :to="{ name: ''}" tag="li">
                        <span>服务中心</span><i class="icon-go"></i>
                    </router-link>
                    <router-link class="" :to="{ name: ''}" tag="li">
                        <span>电商之家</span><i class="icon-go"></i>
                    </router-link>
                    <router-link class="" :to="{ name: ''}" tag="li">
                        <span>F码通道</span><i class="icon-go"></i>
                    </router-link>
                    <router-link class="" :to="{ name: ''}" tag="li">
                        <span>设置</span><i class="icon-go"></i>
                    </router-link>
                </ul>
            </div>
        </div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import headTop from '../../components/header/headTop.vue'
    import footGuide from '../../components/footer/footGuide.vue'
    export default {
        data () {
            return {
                headTitle: '我的'
            }
        },
        components: {
            headTop,
            footGuide
        }
    }
</script>

<style lang="scss">
@import '../../common/style/mixin.scss';
.user{
    position: fixed;
    top: $--tab-height;
    left: 0;
    bottom: 0;
    right: 0;
    .header {
        @include wh(100%, vw(140));
        background: $red;
        display: flex;
        align-items: center;
        .user-icon {
            @include wh(vw(100), vw(100));
            border: vw(5) solid $border;
            background-color: #FFAA00;
            margin: 0 vw(30);
            border-radius: 50%;
        }
        >span {
            font-size: vw(30);
            color: #ffffff;
        }
    }
    &-info {
        width: 100%;
        .user-order{
            @include wh(100%, vw(100));
            display: block;
            display: flex;
            justify-content: space-between;
            padding: 0 vw(30);
            line-height: vw(100);
            background-color: #fff;
            &:active {
                background-color: rgb(224, 227, 230);
            }
            &-right span{
                display: inline-block;
                font-size: vw(28);
                color: #9f9c9c;
                position: relative;
            }
        }
        .user-operation{
            display: flex;
            width: 100%;
            padding: vw(10) 0;
            background-color: #fff;
            border-bottom: vw(1) solid #dcd8d8;
            li{
                display: block;
                width: 33.33%;
                color: #999;
                padding-top: vw(10);
                &:active {
                    background-color: rgb(224, 227, 230);
                }
                >span {
                    display: block;
                    @include wh(vw(40), vw(40));
                    margin: 0 auto;
                }
                p {
                    padding: vw(20) 0;
                    text-align: center;
                    font-size: vw(26);
                }
                .wait-pay-icon{
                    background: url(../../assets/waitPay.png) no-repeat;
                    background-size: contain;
                }
                .wait-comment-icon{
                    background: url(../../assets/waitComment.png) no-repeat;
                    background-size: contain;
                }
                .refund-icon{
                    background: url(../../assets/refund.png) no-repeat;
                    background-size: contain;
                }
            }
        }
        .user-activity{
            background: #FFF;
            margin-top: vw(10);
            li{
                display: flex;
                justify-content: space-between;
                padding: vw(30);
                border-bottom: vw(1) solid #e5e3e3;
                &:active {
                    background-color: rgb(224, 227, 230);
                }
            }
        }
    }
}
.icon-go {
    @include wh(vw(40), vw(40));
    background: url(../../assets/arrow-right.png) no-repeat;
    background-size: contain;
    display: inline-block;
    vertical-align: middle;
}
</style>
