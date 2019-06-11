<template>
    <div ref="wrapper" class="wrapper">
        <p class="drop-down-title" v-if="dropDown">松手刷新...</p>
        <slot></slot>
        <p class="pull-up-title" v-if="pullUp">加载中...</p>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        data () {
            return {
                dropDown: false,
                pullUp: false
            }
        },
        props: {
            /**
             * 1 滚动的时候会派发scroll事件，会截流。
             * 2 滚动的时候实时派发scroll事件，不会截流。
             * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
             */
            probeType: {
                type: Number,
                default: 1
            },
            /**
             * 点击列表是否派发click事件
             */
            click: {
                type: Boolean,
                default: true
            },
            /**
             * 是否开启横向滚动
             */
            scrollX: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发滚动事件
             */
            listenScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 列表的数据
             */
            data: {
                type: Array,
                default: null
            },
            /**
             * 是否派发滚动到底部的事件，用于上拉加载
             */
            pullup: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发顶部下拉的事件，用于下拉刷新
             */
            pulldown: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发列表滚动开始的事件
             */
            beforeScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 当数据更新后，刷新scroll的延时。
             */
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        mounted () {
            // 保证在DOM渲染完毕后初始化better-scroll
            this.$nextTick(() => {
                this._initScroll()
            })
        },
        methods: {
            _initScroll () {
                if (!this.$refs.wrapper) {
                    return
                }
                // better-scroll的初始化
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        // probeType: this.probeType,
                        // click: this.click,
                        // scrollX: this.scrollX
                        click: true,
                        scrollY: true,
                        probeType: 3
                    })
                } else {
                    this.scroll.refresh()
                }
                // 是否派发滚动事件
                // if (this.listenScroll) {
                //     let me = this
                //     this.scroll.on('scroll', (pos) => {
                //         me.$emit('scroll', pos)
                //     })
                // }
                // 是否派发滚动到底部事件，用于上拉加载
                // if (this.pullup) {
                // this.scroll.on('scrollEnd', () => {
                //     // 滚动到底部
                //     if (this.scroll.y <= this.scroll.maxScrollY + 50) {
                //         this.$emit('scrollToEnd')
                //     }
                // })
                // }

                this.scroll.on('scroll', (pos) => {
                    // console.log(pos.y)
                    // 如果下拉超过50px 就显示下拉刷新的文字
                    pos.y > 50 ? this.dropDown = true : this.dropDown = false
                    this.scroll.maxScrollY > pos.y + 10 ? this.pullUp = true : this.pullUp = false
                })
                this.scroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if (pos.y > 50) {
                        console.log('下拉刷新成功')
                        this.$emit('pulldown')
                        this.dropDown = false
                    }
                    // 上拉加载 总高度>下拉的高度+10 触发加载更多
                    if (this.scroll.maxScrollY > pos.y + 10) {
                        console.log('上拉加载更多')
                        this.$emit('pullup')
                        // 使用refresh 方法 来更新scroll  解决无法滚动的问题
                        this.scroll.refresh()
                        this.pullUp = false
                    }
                    console.log(this.scroll.maxScrollY + '总距离----下拉的距离' + pos.y)
                })

                // 是否派发顶部下拉事件，用于下拉刷新
                // if (this.pulldown) {
                // this.scroll.on('touchend', (pos) => {
                //     console.log(pos.y)
                //     // 下拉动作
                //     if (pos.y > 50) {
                //         this.$emit('pulldown')
                //     }
                // })
                // }
                // 是否派发列表滚动开始的事件
                // if (this.beforeScroll) {
                //     this.scroll.on('beforeScrollStart', () => {
                //         this.$emit('beforeScroll')
                //     })
                // }
            },
            disable () {
                // 代理better-scroll的disable方法
                this.scroll && this.scroll.disable()
            },
            enable () {
                // 代理better-scroll的enable方法
                this.scroll && this.scroll.enable()
            },
            refresh () { // 代理better-scroll的refresh方法
                this.scroll && this.scroll.refresh()
            },
            scrollTo () { // 代理better-scroll的scrollTo方法
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement () { // 代理better-scroll的scrollToElement方法
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: { // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
            data () {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>

<style lang="scss">
@import '../../common/style/mixin';
    .wrapper{
        width: 100%;
        height: 570px;
        overflow: hidden;
        .drop-down-title{
            /*position: absolute;*/
            /*top:0px;
            lefT:0px;
            width: 100%;
            height: 50px;*/
            line-height: 50px;
            text-align: center;
            /*font-size:0.8rem;
            color:#CCC;*/
        }
        .pull-up-title{
            line-height: 50px;
            text-align: center;
            position: absolute;
            bottom: vw(120);
            width: 100%;
        }
    }
</style>
