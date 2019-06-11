<template>
    <div class="star-score">
      <div class="star-rating">
        <img v-for="item in fullStars" src="../../assets/star-full-new.png" :key='item+"full"'/>
        <img v-if='halfStarFlag' src="../../assets/star-half-new.png"/>
        <img v-for="item in emptyStars" src="../../assets/star-empty-new.png" :key='item+"empty"'/>
        <span>{{score}}</span>
      </div>
      <div class="star-num">
        <span>{{"("+people+"人评分)"}}</span>
      </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                fullStars: 3,
                halfStarFlag: false,
                emptyStars: 2,
                people: '无'
            }
        },
        props: {
            score: String,
            peopleNum: String
        },
        mounted () {
            const scoreNum = Number.parseFloat(this.score)
            const halfNum = scoreNum / 2
            this.fullStars = Number.parseInt(halfNum)
            const decimal = halfNum - this.fullStars
            if (decimal >= 0.25 && decimal < 0.75) {
                this.halfStarFlag = true
            } else {
                this.halfStarFlag = false
            }
            this.emptyStars = 5 - this.fullStars
            if (this.halfStarFlag) {
                this.emptyStars -= 1
            }
            if (this.peopleNum >= 10000) {
                this.people = this.peopleNum / 10000 + '万'
            } else {
                this.people = this.peopleNum
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '../../common/style/mixin.scss';
.star-score{
  margin-bottom: vw(10);
  .star-rating{
    height: vw(38);
    line-height: vw(40);
    font-weight: bold;
    font-size: vw(30);
    color:#ffc600;
    img{
      vertical-align:middle;
      @include wh(vw(38),vw(38));
    }
    span{
      vertical-align: middle;
    }
  }
  .star-num{
    font-size: vw(25);
    line-height: vw(50);
  }
}
</style>
