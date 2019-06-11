<template>
  <div class="film-top-bar">
    <div class="city-entry" @click='goCity'>
      <span>{{currentCity.cname}}</span>
      <i class="city-entry-arrow"></i>
    </div>
    <div class="switch-hot">
      <div class="hot-item" v-for='item in hotToggleData' :key='item.name' :class="{'active':hotActive===item.index}" @click="toggleHotItem(item.index)">{{item.name}}</div>
    </div>
    <div class="search-entry" @click="$router.push('search')">
      <span class="search-icon"></span>
    </div>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                hotToggleData: [{name: '正在热映', index: 0}, {name: '即将上映', index: 1}],
                hotActive: 0
            }
        },
        props: {
            currentCity: Object
        },
        methods: {
            goCity () {
                this.$router.push('/city')
            },
            toggleHotItem (index) {
                this.hotActive = index
                this.$emit('toggleHotItem', this.hotActive)
            }
        }
    }
</script>
<style lang='scss'>
@import '../../../common/style/mixin';
.film-top-bar{
  @include wh(100%, vw(90));
  position: fixed;
  line-height: vw(90);
  color: #666;
  font-size: vw(29);
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  z-index: 1;
  background: #F5F5F5;
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
  .switch-hot{
    flex: 2;
    display: flex;
    .hot-item{
      flex: 1;
      text-align: center;
    }
    .active{
      color: #e54847;
      border-bottom: 3px solid #e54847;
    }
  }
  .search-entry{
    flex: 1;
    text-align: right;
    .search-icon{
      background-image: url(../../../assets/search.png);
      background-size: contain;
      @include wh(vw(40), vw(40));
      @include centerVertical;
      background-repeat: no-repeat;
      display: block;
      right: vw(30);
    }
  }
}
</style>
