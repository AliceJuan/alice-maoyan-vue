<template>
  <div class="film-card"  @click="gotoDetail(film.movieId)">
    <div class="film-img">
      <img v-lazy="film.imgSrc" :key="film.imgSrc">
    </div>
    <div class="film-outline">
      <div class="content">
        <p class="title">
          <span>{{film.cname}}</span>
        </p>
        <div class="detail">
            <p class="score" v-if='film.status=="0"'>观众评分：<span class="score-show">{{film.score}}</span></p>
            <p class="score" v-if='film.status=="2"'><span class="score-show">{{film.wannerNum}}</span>人想看</p>
            <p class="actors">主演：<span v-for="(actor,index) in film.actors" :key="index">{{actor.actorName}}<span v-if='index !== film.actors.length-1'>,</span></span></p>
            <p class="show-info" v-if='film.status=="0"'>今天2家电影院放映19场</p>
            <p class="show-info" v-if='film.status=="2"'>{{film.releaseDate}}</p>
        </div>
      </div>
      <div class="buy" :class="{'buy-pre':film.status=='2'}">
        <span v-if='film.status=="0"'>购票</span>
        <span v-if='film.status=="2"'>预售</span>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        props: {
            film: Object
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
  .film-card{
    position: relative;
    padding: vw(21) vw(30);
    height: vw(227);
    display: flex;
    overflow: hidden;
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      right: vw(-177);
      width: 100%;
      height: 1px;
      background: #e1e1e1;
      transform:scale(1,.5);
      z-index: 5;
    }
    .film-img{
      @include wh(vw(128), vw(178));
      img{
        @include wh(100%, 100%);
      }
    }
    .film-outline{
      flex: 1;
      padding-left: vw(23);
      .content{
        font-size: vw(25);
        .title{
          line-height: vw(50);
          font-size: vw(35);
          text-align: left;
          span{
            display: inline-block;
            width: vw(290);
            font-weight: 700;
            @include utils-ellipsis;
          }
        }
        .detail{
          line-height: vw(40);
          color:#666;
          text-align: left;
          .score{
            &-show{
              color: #faaf00;
              font-weight: bold;
            }
          }
          .actors{
            width: vw(400);
            @include utils-ellipsis;
          }
          .show-info{
            @include utils-ellipsis;
          }
        }
      }
      .buy{
        position: absolute;
        right: vw(40);
        top: vw(87);
        @include wh(vw(100), vw(60));
        line-height: vw(60);
        text-align: center;
        color: #fff;
        border-radius: 6%;
        background: $red;
        font-size: vw(28);
        span{
          color: #fff;
        }
        &-pre{
          background: #3c9fe6
        }
      }
    }
  }
</style>
