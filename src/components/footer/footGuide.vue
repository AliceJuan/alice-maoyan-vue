<template>
    <section id="foot-guide">
        <!--<section @click="gotoAddress('/msite')" class="guide-item">
            <span :class="selectedType === '/msite' ? 'selected-film-icon' : 'film-icon'"></span>
            <span>电影</span>
        </section>
        <section @click="gotoAddress('/cinema')" class="guide-item">
            <span :class="selectedType === '/cinema' ? 'selected-ciname-icon' : 'ciname-icon'"></span>
            <span>影院</span>
        </section>
        <section @click="gotoAddress('/user')" class="guide-item">
            <span :class="selectedType === '/user' ? 'selected-mine-icon' : 'mine-icon'"></span>
            <span>我的</span>
        </section>-->

        <section v-for="item in tabData" :key="item.path" @click="gotoAddress(item.path)" class="guide-item">
            <span :class="selectedType === item.path ? item.selectedIcon : item.icon"></span>
            <span :class="{'selected-title': selectedType === item.path}">{{ item.title }}</span>
        </section>

    </section>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default {
        data () {
            return {
                selectedType: this.$route.matched[0].path,
                tabData: [{title: '电影', path: '/msite', icon: 'msite-icon', selectedIcon: 'selected-msite-icon'},
                          {title: '影院', path: '/cinema', icon: 'cinema-icon', selectedIcon: 'selected-cinema-icon'},
                          {title: '我的', path: '/user', icon: 'user-icon', selectedIcon: 'selected-user-icon'}]
            }
        },
        methods: {
            ...mapMutations([
                'UPDATE_PLACE_TAB'
            ]),
            gotoAddress (path) {
                this.UPDATE_PLACE_TAB(path)
                this.$router.push(path)
            }
        }
    }
</script>

<style lang="scss">
    @import '../../common/style/mixin.scss';
    #foot-guide {
        background: #ffffff;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        @include wh(100%, vw(110));
        display: flex;
        z-index: 100;
        border-top: 1px solid #ccc;
    }
    .guide-item{
        flex: 1;
        display: flex;
        text-align: center;
        flex-direction: column;
        align-items: center;
        span:first-child{
            @include wh(vw(50),vw(50));
            background-size: contain;
            margin: vw(10) 0 vw(5) 0;
        }
        span:last-child{
            font-size: vw(28);
        }
        .msite-icon{
            background: url(../../assets/film0.png) no-repeat;
        }
        .cinema-icon{
            background: url(../../assets/cinema0.png) no-repeat;
        }
        .user-icon{
            background: url(../../assets/mine0.png) no-repeat;
        }
        .selected-msite-icon{
            background: url(../../assets/film1.png) no-repeat;
        }
        .selected-cinema-icon{
            background: url(../../assets/cinema1.png) no-repeat;
        }
        .selected-user-icon{
            background: url(../../assets/mine1.png) no-repeat;
        }
        .selected-title{
            color: $red;
        }
    }
</style>
