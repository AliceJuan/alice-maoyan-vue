<template>
  <div class="loading">
    <div class="loading-content">
      <img src="@/assets/loading.gif">
      <!--<p class="desc">{{title}}</p>-->
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '正在载入...'
            }
        }
    }
</script>

<style scoped lang="scss">
@import '../../common/style/mixin';
  .loading{
    width: 100%;
    height: 100%;
    text-align: center;
    position: fixed;
    top: 0;
    .loading-content{
      @include center;
      img{
        @include wh(vw(90), vw(90));
      }
      .desc{
        line-height: 20px;
        font-size: vw(40);
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
</style>
