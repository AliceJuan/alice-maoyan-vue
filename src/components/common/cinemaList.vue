<template>
    <div class="cinema-list-container">
        <ul>
            <router-link :to="{path:'cinemaDetail', query:{cinemaId:cinema.cinemaId, cinemaName: cinema.name}}" v-for="cinema in cinemaList" :key="cinema.cinemaId" tag="li">
                <div class="cinema-item cinema-title">
                    <p>{{ cinema.name }}</p>
                    <span><i class="color">48</i><span class="color">元</span>起</span>
                </div>
                <div class="cinema-item cinema-address">
                    <p>{{ cinema.address }}</p>
                    <span>2.2km</span>
                </div>
                <ul class="cinema-tag" v-if="!movieSearchCinema && cinema.tags.length > 1">
                    <li v-for="(tag,index) in cinema.tags" :key="index">{{ tag }}</li>
                </ul>
                <ul class="cinema-activity" v-if="cinemaActivity.length">
                    <li v-for="(item,index) in cinemaActivity" :key="index">
                        <i :style="{background: item.type==='1' ? '#FAAF00' : '#3C9FE6'}">{{ item.title }}</i>
                        <span>{{ item.desc }}</span>
                    </li>
                </ul>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cinemaActivity: [{'type': '1', 'title': '惠', 'desc': '宝贝儿等三部影片特惠'},
                                 {'type': '2', 'title': '卡', 'desc': '开卡特惠，首单2张立减10元'}]
            }
        },
        props: {
            cinemaList: Array,
            movieSearchCinema: Boolean
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../../common/style/mixin.scss';
    .cinema-list-container{
        >ul>li{
            position: relative;
            padding: vw(21) vw(30);
            /*height: vw(227);*/
            overflow: hidden;
            border-bottom: vw(1) solid #d6d5d5;
            .cinema-item{
                display: flex;
                justify-content: space-between;
                /*align-items: center;*/
            }
            .cinema-title{
                line-height: vw(70);
                p{
                    font-size: vw(38);
                    font-weight: 700;
                }
                span{
                    font-size: vw(25);
                }
                i{
                    font-size: vw(35);
                }
                .color{
                    color: $red;
                }
            }
            .cinema-address{
                line-height: vw(50);
                font-size: vw(30);
                p{
                    padding-right: vw(10);
                    @include utils-ellipsis;
                }
            }
            .cinema-tag{
                height: vw(70);
                display: flex;
                align-items: center;
                li{
                    line-height: vw(40);
                    text-align: center;
                    border: vw(1) solid $red;
                    font-size: vw(20);
                    color: $red;
                    padding: 0 vw(6);
                    margin-right: vw(15);
                }
            }
            .cinema-activity{
                li{
                    line-height: vw(45);
                    i{
                        @include wh(vw(40), vw(40));
                        line-height: vw(40);
                        color: #FFFFFF;
                        font-size: vw(22);
                        padding: 0 vw(6);
                        margin-right: vw(10);
                    }
                    span{
                        line-height: vw(40);
                        font-size: vw(22);
                        color: #585757;
                    }
                }
            }
        }
    }
</style>
