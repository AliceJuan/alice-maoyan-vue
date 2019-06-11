<template>
  <div class="">
    <p class="expect-title">{{ showType === "actor" ? "" : '近期最受期待' }}</p>
    <div class="horizontal-container noscroll-bar">
      <div class="horizontal-scroll" :style="containerWidth">
        <div v-for="(item,index) in items" :key='index' class="horizontal-scroll-item" @click="gotoDetail(item.movieId)">
          <img :src="showImgSrc(item)" alt="">
          <div class="horizontal-scroll-item-toggle" v-if="!showType">
            <span></span>
          </div>
          <div v-if="!showType" class="horizontal-scroll-item-wanner">{{item.wannerNum}}人想看</div>

          <div v-if="!showType" class="horizontal-scroll-item-title">{{item.cname}}</div>
          <div v-else class="horizontal-scroll-item-title">{{item.actorName}}</div>

          <div v-if="!showType" class="horizontal-scroll-item-date">{{item.releaseDate}}</div>
          <div v-else class="horizontal-scroll-item-date">{{item.actorMask}}</div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import px2Vw from '@/utils/vw'
    export default {
        props: {
            items: Array,
            showType: String
        },
        computed: {
            containerWidth () {
                return {
                    width: (px2Vw(196) * this.items.length) + 'vw'
                }
            },
            showImgSrc () {
                return function (item) {
                    return this.showType === 'actor' ? item.actorSrc : item.imgSrc
                }
            }
        },
        methods: {
            gotoDetail (movieId) {
                this.$router.push('/film/' + movieId)
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '../../common/style/mixin';
.expect-title{
  width: 100%;
  color: #333;
  padding: vw(20) 0 vw(20) vw(30);
}
.horizontal{
  &-container{
    width: 100%;
    overflow-y: hidden;
  }
  &-scroll{
    height: vw(350);
    &-item{
      position: relative;
      @include wh(vw(165), 100%);
      margin-left: vw(30);
      float: left;
      font-size: vw(26);
      text-align: left;
      img{
        @include wh(100%, vw(230));
      }
      &-wanner{
        @include wh(100%, vw(40));
        position: absolute;
        left: 0;
        top: vw(190);
        font-size: vw(12);
        text-align: center;
        line-height: vw(40);
        color: #faaf00;
        @include utils-ellipsis;
        background-image: linear-gradient(-180deg,rgba(77,77,77,0),#000);
      }
      &-toggle{
        @include wh(vw(48), vw(48));
        line-height: vw(56);
        background: rgba(61,63,71,.6);
        text-align: center;
        border-bottom-right-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        span{
          display: inline-block;
          @include wh(vw(25), vw(25));
          background-size: 100%;
          background-repeat: no-repeat;
          background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAABGdBTUEAALGPC/xhBQAAAytJREFUWAnVmLtrFFEUh3cWFAtRE5FEEUREsFAkooUIgl3+CUEU7LVR1LBIMERCLFLZRG1CrFJYpLBQENRGC4n4wBeKRUQ2PlAQX+v3m70z7MzemZ3HZp05cPbce86553w7O7Mzc51KjDQaDYfwDvSAseux69Cv6Ef0LXoHXXAc5y82UqhVJbgLPYhuQTega9DPaB19ht6VpVYDaxUBWYUGewkcQzdbE4LOJabXaHQ76G7OqHWI0RG0v+mJ/XxPdJpaD2xZbcAUX0XiSXS/bUEH3yPil2imL1Chln6RE+huzVPKffJV60frugAwDfoI1tBtrUkpx4vknzVrLmAHU65vTX/F5DzQnzynDwzsCpwX0e1eMIfV+S3ReZpXXlDgFNC/VEgXgifHGXQDVvUE2g1Y1RKT2FxxgTm6cg4bXxHNsGH0j/DhIlKGmFzGKuSbCAyFgkWcDsG6UaeE/m/LIvsEvKcstGIV8ECJgAcErJtFWaRPwCvLQitWAbv3/ZJALwlYj3ZlkbqA9YBRFnkp4HtloRWrgJ+g/uNbgeHF+LTKY5tebWYLDOqhzYpVR1hyE33njor5ITYxNp/WIP/DeBINvI4ooQAipknD6D9eVnC8JjCOxr799vgLiGXcsLmtvVPCnRB4yGDanRTjQ2/PYvIlACwvCTcwM37G/xvMGJYAQRuwoiRex8wFMns7mTMMbV2twMpiwVXMfNuK5XfMm97WTpHAJvsy9pZ15fI41Us9IyUWmG+qPa4ptBe3b/WYMj2zAWsVBfQfPYEGrlbFuiiqPWF6xZaNPcLeSgr9ZjyGLni+LlrVHDM9OpZNBKwqFPyJGUWfa94lUa1RUztRSX9vLVE2SewNrMboaG9NuiYi7w3+M8B+i4hb3amBVQXotRjdxpPsHWtJWLQHfBrYL+FAp3kmYBUFWnu/2u1Mu03wgTXajaxjU0tmYHUCehAj6H7NE4ggBSvoTJL4orNVp/Eifm1eJ/lplXMuD6wYcgGrAAA6H0fQ75pHiGIjJjciJZk7N7DaAKIrvobarnj5aiaHYT7JdQ6HW5sL8Sj+nSb2GHsF2EwXWLi+5v8ArR6xIZ+h44wAAAAASUVORK5CYII=);
        }
      }
      &-title{
        @include wh(100%, vw(53));
        font-weight: bold;
        line-height: vw(53);
        @include utils-ellipsis;
      }
      &-date{
        color: #999;
        height: vw(48);
        line-height: vw(48);
      }
    }
  }
}
</style>
