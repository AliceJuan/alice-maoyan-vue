<template>
    <div>
        <head-top :head-title="headTitle" :go-back="true"></head-top>
        <div class="box-container">
            <search-box :keyword="keyword" @searchEvent="searchFilms"></search-box>
            <section class="search-content">
                <div v-if="showHistoryPanel" class="">
                    <section class="search-history" v-if="historySearch.length">
                        <div class="search-title">最近搜索</div>
                        <ul>
                            <li v-for="(historyKey, index) in historySearch" :key="index" @click="searchFilms(historyKey)">
                                <span>{{historyKey}}</span>
                                <span class="del-icon" @click.stop="deleteHistoryKey(index)"></span>
                            </li>
                        </ul>
                    </section>
                    <p class="divide-line"></p>
                    <section class="search-hot" v-if="hotSearch.length">
                        <div class="search-title">热门搜索</div>
                        <ul>
                            <li v-for="(hotKey,index) in hotSearch" :key="index" @click="searchFilms(hotKey)">
                                <span>{{hotKey}}</span>
                            </li>
                        </ul>
                    </section>
                </div>
                <div v-else-if="searchResFilms.length">
                    <div class="search-title">电影/电视剧/综艺</div>
                    <film-list :film='film' placeNow="search" v-for="(film,index) in searchResFilms" :key='index'></film-list>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import headTop from '@/components/header/headTop'
    import searchBox from '@/components/common/searchBox'
    import filmList from '@/components/common/filmList'
    import { getStore, setStore } from '@/utils/localStorage'
    import api from '@/api/api'

    export default {
        data () {
            return {
                headTitle: '搜索',
                showHistoryPanel: true,
                searchResFilms: [],
                hotSearch: [],
                historySearch: [],
                keyword: ''
            }
        },
        components: {
            headTop,
            searchBox,
            filmList
        },
        mounted () {
            setStore('hotSearch', ['后来的我们', '宝贝儿', '海王', '我不是药神', '小时代'])

            this.hotSearch = getStore('hotSearch') || []
            this.historySearch = getStore('historySearch') || []
        },
        methods: {
            async searchFilms (keyword) {
                this.keyword = keyword
                if (!keyword) {
                    this.searchResFilms = []
                    this.showHistoryPanel = true
                    return
                }

                this.showHistoryPanel = false

                this.searchResFilms = await api.searchFilms(keyword)

                const flag = this.historySearch.find(item => item === keyword)
                if (!flag) {
                    this.historySearch.push(keyword)
                    setStore('historySearch', this.historySearch)
                }
            },
            deleteHistoryKey (index) {
                this.historySearch.splice(index, 1)
                setStore('historySearch', this.historySearch)
            }
        }
    }
</script>

<style lang="scss">
    @import '../../common/style/mixin.scss';
    .search-content{
        background: #ffffff;
        .search-history{
            padding-bottom: vw(30);
            li{
                line-height: vw(60);
                margin: 0 vw(30);
                font-size: vw(30);
                display: flex;
                justify-content: space-between;
                align-items: center;
                &:not(:last-child){
                    border-bottom: vw(1) solid #e6e6e6;
                }
                span{
                    color: #585757;
                }
                .del-icon{
                    background-image: url(../../assets/delete.png);
                    background-size: contain;
                    @include wh(vw(30), vw(30));
                    background-repeat: no-repeat;
                }
            }
        }
        .search-hot{
            padding-bottom: vw(40);
            li{
                @include wh(vw(188), vw(63));
                line-height: vw(63);
                margin: vw(10) vw(30);
                text-align: center;
                border: vw(1) solid #F5F5F5;
                border-radius: vw(3);
                /*float: left;*/
                background: #F5F5F5;
                display: inline-block;
                @include utils-ellipsis;
            }
        }
        .divide-line {
            background-color: rgb(226, 226, 226);
            height: vw(10);
        }
    }
    .search-title{
        line-height: vw(100);
        margin: 0 vw(30);
        /*border-bottom: vw(1) solid #e6e6e6;*/
    }
</style>
