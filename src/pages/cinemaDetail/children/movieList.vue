<template>
  <div>
    <section class="horizontal-container" ref="movieListPanel">
      <div :style="containerWidth">
        <div v-for="(item,index) in items" :key='index' :data-index="index" class="horizontal-item" :class="{'show-current-img': index === currentIndex}" >
          <img :src="item.imgSrc" alt="">
        </div>
      </div>
    </section>
    <section class="movie-details" v-if="items.length">
      <h3>{{ items[currentIndex].cname }}</h3>
      <p>{{ items[currentIndex].duration}} | {{items[currentIndex].categoryCat}} | {{items[currentIndex].actors.join(",") }}</p>
    </section>
  </div>
</template>

<script>
    import px2Vw from '@/utils/vw'
    export default {
        data () {
            return {
                index: 0, // 图片索引
                currentIndex: 0, // 需要放大的图片索引
                translateXnum: 0 // 图片滚动时的偏移量
            }
        },
        props: {
            items: Array
        },
        computed: {
            containerWidth () {
                return {
                    width: (px2Vw(220) * (this.items.length + 1.6)) + 'vw',
                    paddingLeft: px2Vw(750 / 2 - 95) + 'vw',
                    paddingRight: px2Vw(750 / 2 - 95) + 'vw',
                    position: 'relative'
                }
            }
        },
        methods: {
            // handleScroll (event) {
            //     console.log(this.$refs.movieListPanel.scrollLeft)
            //     let itemList = Array.from(this.$refs.movieListPanel.getElementsByClassName('horizontal-item'))
            //     itemList.forEach((item, index) => {
            //         const minLeftNum = window.screen.width / 2 - item.offsetWidth / 2
            //         const maxLeftNum = minLeftNum + item.offsetWidth
            //         if (item.offsetLeft > minLeftNum && item.offsetLeft < maxLeftNum) {
            //             this.currentIndex = item.getAttribute('data-index')
            //         }
            //     })
            // }
        }
    }
</script>
<style lang="scss" scoped>
@import '../../../common/style/mixin';
.horizontal{
  &-container{
    width: 100%;
    height: vw(320);
    overflow: scroll;
    padding: vw(20) 0;
    background: rgba(0,0,0,.4);
    &::after{
      content: '';
      width: 0;
      height: 0;
      border: vw(16) solid #F5F5F5;
      border-left-color: transparent;
      border-right-color: transparent;
      border-top-color: transparent;
      display: inline-block;
      position: absolute;
      margin-left: 50%;
      margin-top: vw(2);
    }
  }
  &-item{
    position: relative;
    @include wh(vw(165), 100%);
    margin-left: vw(30);
    // float: left;
    display: inline-block;
    font-size: vw(26);
    // text-align: left;
    img{
      @include wh(100%, vw(230));
    }
  }
}
.show-current-img{
  @include wh(vw(190), vw(260));
  img{
    @include wh(vw(180), vw(250));
    border: vw(5) solid #FFFFFF;
  }
}
.movie-details{
  text-align: center;
  padding: vw(20) 0;
  h3{
    font-weight: 700;
  }
  p{
    line-height: vw(50);
    @include big-font;
  }
}
</style>
