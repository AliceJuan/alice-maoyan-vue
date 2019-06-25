<template>
    <div>
        <head-top :head-title="headTitle"></head-top>
        <section class="box-container msite-container">
            <top-bar :currentCity='currentCity' @toggleHotItem='toggleHotItem'></top-bar>
            <section class="onshow" :class="{'hotshow' : hotShowFlag}" v-show="hotShowFlag">
                <bscroll-view :data="films" :pulldown="pulldown" @pulldown="refreshData" :pullup="true" @pullup="loadMoreData">
                    <div class="list">
                        <film-list :film='film' v-for="(film,index) in films" :key='index'></film-list>
                    </div>
                </bscroll-view>
            </section>
            <section class="onshow" :class="{'hotshow' : !hotShowFlag}" v-show="!hotShowFlag">
                <div class="list">
                    <film-horizontal-list :items='expect'></film-horizontal-list>
                    <p class="divide-line"></p>
                    <!-- <bscroll-view :data="preFilms" :pulldown="pulldown" @pulldown="loadData"> -->
                        <film-list :film='film' v-for="(film,index) in preFilms" :key='index'></film-list>
                    <!-- </bscroll-view> -->
                </div>
            </section>
        </section>
        <foot-guide></foot-guide>
        <loading v-show="showLoading"></loading>
    </div>
</template>

<script>
    import headTop from '@/components/header/headTop'
    import footGuide from '@/components/footer/footGuide'
    import loading from '@/components/common/loading'
    import topBar from './children/topBar'
    //  import filmList from './children/filmList'
    import filmList from '@/components/common/filmList'
    import filmHorizontalList from '@/components/common/horizontalList'
    import bscrollView from '@/components/common/bscrollView'

    import api from '@/api/api'

    export default {
        data () {
            return {
                headTitle: '猫眼电影',
                showLoading: true,
                currentCity: {},
                hotShowFlag: true,
                films: [],
                preFilms: [],
                expect: [],
                pulldown: true
            }
        },
        components: {
            headTop,
            footGuide,
            loading,
            topBar,
            filmList,
            filmHorizontalList,
            bscrollView
        },
        created () {
            this.initData()
            // this.loadData()
        },
        mounted () {
            this.currentCity = this.$store.state.currentCity
        },
        methods: {
            async initData () {
                let respData = await api.getAllFilms()
                this.expect = this.expect.concat(respData)
                this.preFilms = this.preFilms.concat(respData)
                this.films = this.films.concat(respData)
                this.showLoading = false
            },
            async loadMoreData () {
                let respData = await api.getAllFilms()
                this.films = this.films.concat(respData)
            },
            async refreshData () {
                this.films = await api.getAllFilms()
            },
            toggleHotItem (hotActive) {
                this.hotShowFlag = hotActive === 0
                this.$nextTick(() => {
                    document.documentElement.scrollTop = 1
                })
            }
        }
    }
</script>

<style lang="scss">
@import "../../common/style/mixin.scss";
.onshow{
    padding-top: vw(90);
}
.divide-line {
  background-color: rgb(226, 226, 226);
  height: vw(10);
}
</style>
