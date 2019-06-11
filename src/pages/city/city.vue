<template>
    <div class="city-picker noscroll-bar">
        <locate-city title='定位城市'></locate-city>
        <section v-if="cityHistory.length">
            <div class="city-inline" data-ch="最近">
                <div class='city-title city-title-left'>最近访问城市</div>
                <div class="city-inline-list">
                    <div class="city-inline-cell" v-for="city in cityHistory" :key='city.cname' @click="selectCityEvent(city)">{{city.cname}}</div>
                </div>
            </div>
        </section>
        <section>
            <div class="city-inline" data-ch="热门">
                <div class='city-title city-title-left'>热门城市</div>
                <div class="city-inline-list">
                    <div class="city-inline-cell" v-for="city in cityList.hot" :key='city.cname' @click="selectCityEvent(city)">{{city.cname}}</div>
                </div>
            </div>
        </section>
        <section>
            <div v-for="cityGroup in cityList.nomal" :key="cityGroup.capital" class="city-group" :data-ch="cityGroup.capital">
                <div class="city-title">{{cityGroup.capital}}</div>
                <div class="city-group-list">
                    <div v-for="city in cityGroup.cities" :key="city.cname" class="city-group-cell" @click="selectCityEvent(city)">{{city.cname}}</div>
                </div>
            </div>
        </section>
        <side-bar :sideData="sideData" @updateChar="updateChar" @showChar="showChar"></side-bar>
        <div class="city-picker-current-char" :class="showCurrentChar">{{currentChar}}</div>
    </div>
</template>

<script>
    import sideBar from './children/sideBar'
    import locateCity from './children/locateCity'
    import { getStore } from '@/utils/localStorage'
    import { mapActions } from 'vuex'
    import api from '@/api/api'

    export default {
        data () {
            return {
                currentCity: '',
                currentChar: '',
                cityHistory: [],
                charFlag: false,
                sideData: ['定位', '最近', '热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                cityList: {}
            }
        },
        async mounted () {
            this.cityList = await api.getAllCity()
            this.cityHistory = getStore('historyCities') || []
        },
        computed: {
            showCurrentChar () {
                return {
                    'city-picker-current-char-show': this.charFlag
                }
            }
        },
        methods: {
            ...mapActions(['selectCity']),
            selectCityEvent (city) {
                this.selectCity(city)
                this.$router.go(-1)
            },
            updateChar (msg) {
                this.currentChar = msg.substr(0, 1)
                const target = this.$el.querySelector('[data-ch="' + msg + '"]')
                if (target) {
                    target.scrollIntoView()
                }
            },
            showChar (flag) {
                this.charFlag = flag
            }
        },
        components: {
            locateCity,
            sideBar
        }
    }
</script>

<style lang="scss">
@import '../../common/style/mixin.scss';
.city-inline{
    &-list{
      padding: vw(15) vw(60) vw(30) 0;
      @include utils-clearfix;
    }
    &-cell{
        @include wh(vw(188), vw(63));
        line-height: vw(63);
        margin-left: vw(28);
        margin-top: vw(16);
        text-align: center;
        border: vw(1) solid #e6e6e6;
        border-radius: vw(3);
        float: left;
        background: #fff;
        @include utils-ellipsis;
    }
}
.city-title{
    line-height: vw(60);
    padding-left: vw(50);
    background: #e8e8e8;
    &-left{
        padding-left: vw(30);
    }
}
.city-group{
    &-list{
      padding-left: vw(30);
      padding-right: vw(50);
    }
    &-cell{
      height: vw(80);
      margin-right: vw(15);
      line-height: vw(80);
      border-bottom: vw(1) solid #c8c7cc;
      &:last-child{
        border-bottom:none;
      }
    }
}
.city-picker {
  @include wh(100%, 100%);
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  background:#f5f5f5;
  color:#494949;
  overflow-y: scroll;
  &-current-char{
    position: fixed;
    @include wh(vw(100), vw(100));
    line-height: vw(100);
    font-size: vw(60);
    top: vw(620);
    left: vw(325);
    background: #000;
    opacity: .6;
    text-align: center;
    color: #fff;
    display: none;
    border-radius: 50%;
    &-show{
      display: block;
    }
  }
}
</style>
