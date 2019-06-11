 <template>
    <div class="payment-page">
        <head-top head-title="在线支付" go-back="true"></head-top>
        <div class="">
            <div v-show="!paySuccess">
                <section class="show_time_amount">
                    <section>
                        <header class="time_last">支付剩余时间</header>
                        <p class="time">{{remaining}}</p>
                    </section>
                </section>
                <div class="pay_way">选择支付方式</div>
                <section class="pay_way_list">
                    <section class="pay_item">
                        <div class="pay_icon_contaienr">
                            <div class="alipay"></div>
                            <span>支付宝</span>
                        </div>
                        <div @click="payWay = 'alipay'" :class=" payWay == 'alipay' ? 'select-icon' : 'no-select-icon' "></div>
                    </section>
                    <section class="pay_item">
                        <div class="pay_icon_contaienr">
                            <div class="weChat"></div>
                            <span>微信</span>
                        </div>
                        <div @click="payWay = 'wechat'" :class=" payWay === 'wechat' ? 'select-icon' : 'no-select-icon' "></div>
                    </section>
                </section>
                <div class="determine">
                    <p @click="confrimPay">确认支付</p>
                </div>
            </div>
            <section v-show="paySuccess">
                <div class="show_time_amount" >
                    <p class="pay-success">支付成功 !</p>
                </div>
                <router-link :to="{ path: '/msite' }" class="goHome">
                    <span>返回首页</span>
                    <span class="goHome-icon"></span>
                </router-link>
            </section>
        </div>
        <alert-tip v-if="showAlert" @closeTip="closeTipFun" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from '@/components/header/headTop'
    import alertTip from '@/components/common/alertTip'
    // import {mapState, mapMutations} from 'vuex'

    export default {
        data () {
            return {
                payDetail: false, // 付款信息详情
                showAlert: false,
                alertText: null,
                payWay: 'alipay', // 付款方式
                countNum: 900, // 倒计时15分钟
                paySuccess: false
            }
        },
        components: {
            headTop,
            alertTip
        },
        created () {
            // 清除已选择信息
        },
        mounted () {
            this.remainingTime()
        },
        beforeDestroy () {
            clearInterval(this.timer)
        },
        props: [],
        computed: {
            // 时间转换
            remaining: function () {
                let minute = parseInt(this.countNum / 60)
                if (minute < 10) {
                    minute = '0' + minute
                }
                let second = parseInt(this.countNum % 60)
                if (second < 10) {
                    second = '0' + second
                }
                return '00 : ' + minute + ' : ' + second
            }
        },
        methods: {
            // 倒计时
            remainingTime () {
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    this.countNum--
                    if (this.countNum === 0) {
                        clearInterval(this.timer)
                        this.showAlert = true
                        this.alertText = '支付超时'
                    }
                }, 1000)
            },
            // 确认付款
            confrimPay () {
                this.showAlert = true
                this.alertText = '支付成功！'
            },
            // 关闭提示框，跳转到订单列表页
            closeTipFun () {
                this.showAlert = false
                this.paySuccess = true
                clearInterval(this.timer)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../common/style/mixin.scss';
    .payment-page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 200;
        padding-top: vw(100);
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .show_time_amount{
        background-color: #fff;
        padding: vw(50);
        text-align: center;
        .time_last{
            @include sc(vw(30), #666);
            margin-top: vw(20);
        }
        .time{
            @include sc(vw(60), #333);
            margin: vw(20) 0 vw(30);
        }
        .pay-success{
            font-size: vw(35);
        }
    }
    .pay_way{
        background-color: #f1f1f1;
        padding: 0 vw(30);
        @include sc(vw(28), #666);
        line-height: vw(80);
    }
    .pay_way_list{
        background-color: #fff;
        .pay_item{
            padding: vw(20) vw(30);
            @include fj;
            align-items: center;
            line-height: vw(100);
            border-bottom: vw(1) solid $border;
            .pay_icon_contaienr{
                @include fj;
                align-items: center;
                .alipay{
                    @include wh(vw(80), vw(80));
                    background: url(../../../assets/alipay.png) no-repeat;
                    background-size: 100% 100%;
                    margin-right: vw(20);
                }
                .weChat{
                    @include wh(vw(80), vw(80));
                    background: url(../../../assets/wechat.png) no-repeat;
                    background-size: 100% 100%;
                    margin-right: vw(20);
                }
                span{
                    @include sc(vw(28), #666);
                }
            }
            .no-select-icon{
                @include wh(vw(45), vw(45));
                background: url(../../../assets/checkbox-no.png) no-repeat;
                background-size: contain;
            }
            .select-icon{
                @include wh(vw(45), vw(45));
                background: url(../../../assets/checkbox-yes.png) no-repeat;
                background-size: contain;
            }
        }
    }
    .determine{
        width: 100%;
        padding: 0 vw(30);
        position: fixed;
        bottom: vw(30);
        p{
            @include wh(100%, vw(80));
            line-height: vw(80);
            text-align: center;
            background: #fe9b01;
            color: #ffffff;
            border-radius: vw(10);
            font-size: vw(35);
        }
    }
    .goHome{
        float: right;
        margin-right: vw(30);
        span{
            line-height: vw(50);
        }
        &-icon{
            @include wh(vw(40), vw(40));
            background: url(../../../assets/arrow-goHome.png) no-repeat;
            background-size: contain;
            display: inline-block;
            vertical-align: middle;
        }
    }
</style>
