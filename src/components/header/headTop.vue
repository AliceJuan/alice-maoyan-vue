<template>
    <header class="head-top">
        <span v-show="goBack" @click="$router.go(-1)" class="head-top-back left"></span>
        <span class="head-top-text">{{ headTitle }}</span>
    </header>
</template>

<script>
    export default {
        data () {
            return {}
        },
        props: ['headTitle', 'goBack']
    }
</script>

<style lang="scss" scoped>
@import '../../common/style/mixin.scss';
.head-top{
    background: $red;
    @include wh(100%, vw(100));
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    z-index: 100;
    &-text{
        color: $white;
        line-height: vw(104);
        font-size: vw(40);
    }
    &-back{
        background-image: url(../../assets/back.png);
        background-size: contain;
        @include wh(vw(60), vw(60));
        @include centerVertical;
        left :0;
    }
}
</style>
