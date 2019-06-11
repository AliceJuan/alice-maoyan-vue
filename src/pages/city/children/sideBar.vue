<template>
  <section class="city-picker-sidecontainer">
    <ul class="city-side" :class='{"city-side-hover":touching}' @touchstart.prevent='start' @touchmove.prevent='move' @touchend.prevent='end'>
      <li class="city-side-item" v-for='side in sideData' :key="side">{{side}}</li>
    </ul>
  </section>
</template>
<script>
    export default {
        data () {
            return {
                touching: false
            }
        },
        props: {
            sideData: Array,
            option: Object
        },
        methods: {
            /**
             * 指尖触摸开始的回调
             */
            start (e) {
                if (!this.touching) {
                    this.touching = !this.touching
                    this.$emit('showChar', true)
                    this.move(e)
                }
            },
            /**
             * 指尖触摸移动的回调
             */
            move (e) {
                if (this.touching) {
                    const boxRect = this.$el.getBoundingClientRect()
                    const offset = this.calcRelativePosition(e.touches[0].clientY)
                    const percent = offset / boxRect.height
                    const ch = this.getPositionChar(percent)
                    this.updateChar(e.touches[0].clientX, e.touches[0].clientY, ch)
                }
            },
            /**
             * 指尖触摸结束的回调
             */
            end (e) {
                if (this.touching) {
                    this.touching = !this.touching
                    this.$emit('showChar', false)
                }
            },
            /**
             * 更新提示字母
             */
            updateChar (clientX, clientY, ch) {
                this.$emit('updateChar', ch)
            },
            /**
             * 获取当前指尖位置上的字母
             */
            getPositionChar (yPercent) {
                var min = 1
                var max = this.sideData.length
                var index = Math.ceil(yPercent * max)
                if (index < min) {
                    index = min
                } else if (index > max) {
                    index = max
                }
                return this.sideData[index - 1]
            },
            /**
             * 计算位置
             */
            calcRelativePosition (clientY) {
                const boxRect = this.$el.getBoundingClientRect()
                let y = clientY - boxRect.top
                if (y < 0) {
                    y = 0
                } else if (y > boxRect.height) {
                    y = boxRect.height
                }
                return y
            }
        }
    }
</script>
<style lang="scss">
@import '../../../common/style/mixin.scss';
.city-picker-sidecontainer{
    position: fixed;
    top: 0;
    right: 0;
    bottom:0;
    width: vw(60);
    z-index: 10;
    text-align: center;
    .city-side{
        height: 100%;
        padding-top: 3vh;
        &-hover{
          background: rgba(0,0,0,.3);
        }
        &-item{
          font-size: vw(30);
          height: 3.3vh;
        }
    }
}
</style>
