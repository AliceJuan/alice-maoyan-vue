<template>
    <div class="login">
        <head-top :head-title="headTitle" :go-back="true"></head-top>
        <section class="login-container">
            <section class="login-type">
                <div class="login-type-container">
                    <div @click="changeLoginType('account')" :class="{'current-login-type': accountLogin }">美团账号登录</div>
                    <div @click="changeLoginType('phone')" :class="{'current-login-type': !accountLogin }">手机验证登录</div>
                </div>
            </section>
            <section v-show="accountLogin" class="account-login">
                <input type="text" placeholder="帐户名/手机号/Email" />
                <input type="passwprd" placeholder="请输入您的密码" />
            </section>
            <section v-show="!accountLogin" class="phone-login">
                <input type="text" class="left" placeholder="请输入手机号" />
                <span class="right">获取验证码</span>
                <input type="passwprd" placeholder="请输入短信验证码" />
            </section>
            <section class="login-operation">
                <div class="btn-group clear">
                    <button @click="loginEvent">登录</button>
                    <span class="left">立即注册</span>
                    <span class="right">找回密码</span>
                </div>
                <span>猫眼电影 客服电话：400-670-5335</span>
            </section>
        </section>
    </div>
</template>

<script>
    import headTop from '../../components/header/headTop.vue'
    export default {
        data () {
            return {
                headTitle: '猫眼电影',
                accountLogin: true
            }
        },
        components: {
            headTop
        },
        methods: {
            changeLoginType (type) {
                if (type === 'account') {
                    this.accountLogin = true
                } else {
                    this.accountLogin = false
                }
            },
            loginEvent () {
                this.$router.push('./msite')
            }
        }
    }
</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .login-container{
        position: absolute;
        width: 100%;
        top: vw(104);
        .login-type{
            @include wh (100%, vw(85));
            line-height: vw(85);
            position: relative;
            &-container{
                display: flex;
                div{
                    width: 50%;
                    border-bottom: 3px solid #ccc;
                    font-size: vw(30);
                    text-align: center;
                }
            }
        }
        .current-login-type{
            border-bottom: 3px solid $red !important;
            color: $red;
        }
        .account-login, .phone-login{
            margin-top: vw(5);
            input{
                @include wh(100%, vw(90));
                font-size: vw(30);
                padding-left: vw(20);
                border-bottom: 1px solid $border;
            }
        }
        .phone-login{
            span{
                @include wh(vw(250),vw(75));
                line-height: vw(75);
                margin: vw(10) vw(15);
                background: #dcdcdc;
                position: absolute;
                right: 0;
                border-radius: vw(5);
                text-align: center;
            }
            input:first-child{
                @include wh(100%, vw(100));
            }
        }
        .login-operation{
            .btn-group{
                padding: vw(30) vw(15) vw(10) vw(15);
                button{
                    @include wh(100%, vw(90));
                    background: $red;
                    color: $white;
                    font-size: vw(40);
                    border-radius: vw(3);
                }
                span{
                    font-size: vw(30);
                    color: $red;
                    line-height: vw(80);
                }
            }
            >span{
                font-size: vw(28);
                padding: 0 vw(15);
            }
        }
    }
</style>
