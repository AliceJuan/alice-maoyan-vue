<template>
    <section class="search-box">
        <router-link :to="{path:'city'}" v-if="placeNowTab == '/cinema'" class="city-entry">
            <span>{{currentCity}}</span>
            <i class="city-entry-arrow"></i>
        </router-link>
        <i class="search-icon"></i>
        <input v-model="keyword" placeholder="搜电影、搜影院" @input="checkInput" />
        <div v-if="placeNowTab == '/msite'" @click="searchEvent()">搜索</div>
    </section>
</template>

<script>
    export default {
        data () {
            return {
                placeNowTab: '',
                currentCity: ''
            }
        },
        props: {
            keyword: String
        },
        mounted () {
            this.placeNowTab = this.$store.state.currentPlaceTab
            this.currentCity = this.$store.state.currentCity.cname
        },
        methods: {
            searchEvent () {
                this.$emit('searchEvent', this.keyword)
            },
            checkInput () {
                if (this.keyword === '') {
                    this.$emit('searchEvent', this.keyword)
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../../common/style/mixin.scss';
    .search-box{
        @include wh(100%, vw(105));
        line-height: vw(100);
        background: #f5f5f5;
        border-bottom: vw(1) solid #d6d5d5;
        display: flex;
        /*padding: 0 vw(30);*/
        .search-icon{
            background: url(../../assets/search.png) no-repeat;
            @include wh(vw(35), vw(35));
            background-size: contain;
            position: relative;
            left: vw(50);
            top: vw(35);
        }
        input{
            border: vw(2) solid #d8d4d4;
            margin: vw(20) 0;
            border-radius: vw(8);
            flex: 4;
            padding-left: vw(70);
            font-size: vw(28);
            line-height: vw(32);
        }
        div{
            flex: 1;
            text-align: center;
            color: $red;
            font-size: vw(40);
        }
        .city-entry{
            flex: 1;
            padding-left: vw(30);
            &-arrow{
                width: 0;
                height: 0;
                border: vw(9) solid #b0b0b0;
                border-left-color: transparent;
                border-right-color: transparent;
                border-bottom-color: transparent;
                display: inline-block;
                margin-top: vw(12);
            }
        }
    }
</style>
