<template>
    <div>
        <head-top :head-title="'万画影城(四季青店)'" go-back="true"></head-top>
        <section class="box-container choose-seat">
            <section class="movie-info">
                <h3>{{ movieName }}</h3>
                <p>{{ videoInfo.day + ' ' + videoInfo.startTime + ' ' +  videoInfo.videoType }}</p>
            </section>
            <section>
                <div class="seat-wrapper">
                    <div class="screen">{{ videoInfo.videoHall }}</div>
                    <div class="screen-center">银幕中央<div class="mid-line"></div></div>
                    <div class="inner-seat-wrapper" ref="innerSeatWrapper" >
                        <div v-for="(row,i) in seatRow" :key="i">
                            <div v-for="(col,j) in seatCol" :key="j" class="seat" v-if="seatArray.length > 0" :style="{width:seatSize+'px',height:seatSize+'px'}">
                                <div class="inner-seat" @click="handleChooseSeat(row-1,col-1)" v-if="seatArray[row-1][col-1]!==-1"
                                :class="seatArray[row-1][col-1]===2?'bought-seat':(seatArray[row-1][col-1]===1?'selected-seat':'unselected-seat')">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="seat-tip-info">
                <ul class="seat-tip">
                    <li><i class="unselected-seat"></i><span>可选</span></li>
                    <li><i class="selected-seat"></i><span>不可选</span></li>
                    <li><i class="bought-seat"></i><span>已选</span></li>
                </ul>
                <div class="seat-recommend">
                    <div class="seat-recommend-num">
                        <span>推荐座位</span>
                        <ul>
                            <li v-for="(item,index) in smartChooseMaxNum" :key="index" @click="smartChoose(index+1)">{{ index + 1 + '人' }}</li>
                        </ul>
                    </div>
                    <div class="confirmBtn">请先选座</div>
                </div>
            </section>
            <section class="seat-info" v-show="selectSeatInfo.length > 0">
                <p>已选座位</p>
                <ul class="seat-info-details">
                    <li v-for="(item,index) in selectSeatInfo" :key="index">
                        <p>{{ item.place }}</p>
                        <p>{{ item.price + '元' }}</p>
                        <span class="del-icon" @click="delSelectSeat(item.place)"></span>
                    </li>
                </ul>
                <div class="confirmBtn" @click="confirmChooseSeat">{{ totalPrice }}元 确认选座</div>
            </section>
        </section>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import headTop from '@/components/header/headTop'
    export default {
        data () {
            return {
                selectSeatInfo: [],
                seatArray: [], // 影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
                seatRow: 10, // 影院座位行数
                seatCol: 20, // 影院座位列数
                seatSize: '', // 座位尺寸
                smartChooseMaxNum: 4 // 推荐选座最大数量
            }
        },
        props: {

        },
        mounted () {
            this.initSeatArray(10, 20)
        },
        computed: {
            ...mapState(['cinemaId', 'movieName', 'videoInfo']),
            totalPrice () {
                let price = 0
                this.selectSeatInfo.map((item) => { price += item.price - 0 })
                return price.toFixed(2)
            }
        },
        methods: {
            ...mapMutations([
                'SAVE_SEAT_INFO'
            ]),
            // 初始座位数组
            initSeatArray () {
                let seatArray = Array(this.seatRow).fill(0).map(() => Array(this.seatCol).fill(0))
                this.seatArray = seatArray
                this.seatSize = this.$refs.innerSeatWrapper
                    ? parseInt(parseInt(window.getComputedStyle(this.$refs.innerSeatWrapper).width, 10) / this.seatCol, 10)
                    : 0
                // 初始化不是座位的地方
                this.initNonSeatPlace()
            },
            // 初始化不是座位的地方
            initNonSeatPlace () {
                for (let i = 0; i < 9; i++) {
                    this.seatArray[i][0] = -1
                }
                for (let i = 0; i < 8; i++) {
                    this.seatArray[i][this.seatArray[0].length - 1] = -1
                    this.seatArray[i][this.seatArray[0].length - 2] = -1
                }
                for (let i = 0; i < 9; i++) {
                    this.seatArray[i][this.seatArray[0].length - 3] = -1
                }
                for (let i = 0; i < this.seatArray[0].length; i++) {
                    this.seatArray[2][i] = -1
                }
            },
            // 处理座位选择逻辑
            handleChooseSeat (row, col) {
                let seatValue = this.seatArray[row][col]
                let newArray = this.seatArray
                // 如果是已购座位，直接返回
                if (seatValue === 2) return
                // 如果是已选座位点击后变未选
                let place = row + '排' + col + '坐'
                if (seatValue === 1) {
                    newArray[row][col] = 0
                    this.selectSeatInfo = this.selectSeatInfo.filter((item) => { return item.place !== place })
                } else if (seatValue === 0) {
                    if (this.selectSeatInfo.length >= this.smartChooseMaxNum) {
                        alert('一次最多选择4个座位')
                    } else {
                        newArray[row][col] = 1
                        this.selectSeatInfo.push({place: place, price: '19.9'})
                    }
                }
                // 必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
                this.seatArray = newArray.slice()
            },
            delSelectSeat (place) {
                this.selectSeatInfo = this.selectSeatInfo.filter(item => item.place !== place)
                let row = place.substring(0, place.indexOf('排'))
                let col = place.substring(place.indexOf('排') + 1, place.indexOf('坐'))
                let oldArray = this.seatArray.slice()
                oldArray[row][col] = 0
                this.seatArray = oldArray
            },
            confirmChooseSeat () {
                if (this.$store.state.login) {
                    // 存数据-->跳页面
                    this.SAVE_SEAT_INFO(this.selectSeatInfo)
                    this.$router.push('./orderConfirm')
                } else {
                    this.$router.push('./login')
                }
            },

            // 向前后某个方向进行搜索的函数,参数是起始行，终止行,推荐座位个数
            searchSeatByDirection (fromRow, toRow, num) {
                /* 推荐座位规则
                * (1)初始状态从座位行数的一半处的后一排的中间开始向左右分别搜索，取离中间最近的，如果满足条件，
                *    记录下该结果离座位中轴线的距离，后排搜索完成后取距离最小的那个结果座位最终结果，优先向后排进行搜索，
                *    后排都没有才往前排搜，前排逻辑同上
                * (2)只考虑并排且连续的座位，不能不在一排或者一排中间有分隔
                * */
                /*
                * 保存当前方向搜索结果的数组,元素是对象,result是结果数组，offset代表与中轴线的偏移距离
                * {
                *   result:Array([x,y])
                *   offset:Number
                * }
                */
                let currentDirectionSearchResult = []
                let largeRow = fromRow > toRow ? fromRow : toRow
                let smallRow = fromRow > toRow ? toRow : fromRow
                for (let i = smallRow; i <= largeRow; i++) {
                    // 每一排的搜索,找出该排里中轴线最近的一组座位
                    let tempRowResult = []
                    let minDistanceToMidLine = Infinity
                    for (let j = 0; j <= this.seatCol - num; j++) {
                        // 如果有合法位置
                        if (this.checkRowSeatContinusAndEmpty(i, j, j + num - 1)) {
                            // 计算该组位置距离中轴线的距离:该组位置的中间位置到中轴线的距离
                            let resultMidPos = parseInt((j + num / 2), 10)
                            let distance = Math.abs(parseInt(this.seatCol / 2) - resultMidPos)
                            // 如果距离较短则更新
                            if (distance < minDistanceToMidLine) {
                                minDistanceToMidLine = distance
                                // 该行的最终结果
                                tempRowResult = this.generateRowResult(i, j, j + num - 1)
                            }
                        }
                    }
                    // 保存该行的最终结果
                    currentDirectionSearchResult.push({
                        result: tempRowResult,
                        offset: minDistanceToMidLine
                    })
                }
                // 处理后排的搜索结果:找到距离中轴线最短的一个
                // 注意这里的逻辑需要区分前后排，对于后排是从前往后，前排则是从后往前找
                let isBackDir = fromRow < toRow
                let finalReuslt = []
                let minDistanceToMid = Infinity
                if (isBackDir) {
                    // 后排情况,从前往后
                    currentDirectionSearchResult.forEach((item) => {
                        if (item.offset < minDistanceToMid) {
                            finalReuslt = item.result
                            minDistanceToMid = item.offset
                        }
                    })
                } else {
                    // 前排情况，从后往前找
                    currentDirectionSearchResult.reverse().forEach((item) => {
                        if (item.offset < minDistanceToMid) {
                            finalReuslt = item.result
                            minDistanceToMid = item.offset
                        }
                    })
                }
                // 直接返回结果
                return finalReuslt
            },
            // 推荐选座,参数是推荐座位数目
            smartChoose (num) {
                // 找到影院座位水平垂直中间位置的后一排
                let rowStart = parseInt((this.seatRow - 1) / 2, 10) + 1
                // 先从中间排往后排搜索
                let backResult = this.searchSeatByDirection(rowStart, this.seatRow - 1, num)
                if (backResult.length > 0) {
                    this.chooseSeat(backResult)
                    return
                }
                // 再从中间排往前排搜索
                let forwardResult = this.searchSeatByDirection(rowStart - 1, 0, num)
                if (forwardResult.length > 0) {
                    this.chooseSeat(forwardResult)
                    return
                }
                // 提示用户无合法位置可选
                alert('无合法位置可选!')
            },
            // 辅助函数，判断每一行座位从i列到j列是否全部空余且连续
            checkRowSeatContinusAndEmpty (rowNum, startPos, endPos) {
                let isValid = true
                for (let i = startPos; i <= endPos; i++) {
                    if (this.seatArray[rowNum][i] !== 0) {
                        isValid = false
                        break
                    }
                }
                return isValid
            },
            // 辅助函数：返回每一行的某个合理位置的座位数组
            generateRowResult (row, startPos, endPos) {
                let result = []
                for (let i = startPos; i <= endPos; i++) {
                    result.push([row, i])
                }
                return result
            },
            // 辅助函数:智能推荐的选座操作
            chooseSeat (result) {
                this.selectSeatInfo = []
                let oldArray = this.seatArray.slice()
                for (let i = 0; i < result.length; i++) {
                    // 选定座位
                    oldArray[result[i][0]][result[i][1]] = 1
                    let place = result[i][0] + '排' + result[i][1] + '坐'
                    this.selectSeatInfo.push({place: place, price: '19.9'})
                }
                this.seatArray = oldArray
            }
        },
        components: {
            headTop
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../common/style/mixin';
    .choose-seat{
        .movie-info {
            padding: vw(30);
            background: #ffffff;
            h3{
                font-size: vw(40);
                margin-bottom: vw(10);
            }
            p{
                font-size: vw(25);
                color: #7b7b7b;
            }
        }
        .seat-info{
            @include wh(100%, vw(300));
            position: fixed;
            bottom: 0;
            background: #ffffff;
            padding: vw(20) vw(30);
            &-details{
                // height: vw(100);
                display: flex;
                justify-content: flex-start;
                margin: vw(26) 0;
                li{
                    width: 23%;
                    @include wh(23%, vw(80));
                    border: vw(1) solid #ccc;
                    padding: 0 vw(10);
                    margin-right: vw(20);
                    font-size: vw(25);
                    p{
                        line-height: vw(40);
                    }
                    .del-icon{
                        background: url(../../assets/delete.png) no-repeat;
                        background-size: contain;
                        @include wh(vw(25), vw(25));
                        position: relative;
                        top: vw(-50);
                        display: block;
                        float: right;
                    }
                    &:nth-child(4){
                        margin-right: 0;
                    }
                }
            }
            .confirmBtn{
                @include wh(100%, vw(80));
                line-height: vw(80);
                text-align: center;
                background: #fe9b01;
                color: #ffffff;
                border-radius: vw(10);
                font-size: vw(35);
            }
        }
        .seat-tip-info{
            @include wh(100%, vw(280));
            position: fixed;
            bottom: 0;
            background: #ffffff;
            // padding: 0 vw(30);
            .seat-tip{
                display: flex;
                padding: vw(15) 0;
                background: #F5F5F5;
                li{
                    flex: 1;
                    display: inline-block;
                    text-align: center;
                }
                i{
                    @include wh(vw(28), vw(28));
                    position: relative;
                    top: 50%;
                    display: inline-block;
                    transform: translateY(-50%);
                    margin-right: vw(10);
                }
                span{
                    display: inline-block;
                    font-size: vw(26);
                }
            }
            .seat-recommend{
                padding: 0 vw(30);
                &-num{
                    padding: vw(26) 0;
                    span{
                        font-size: vw(28);
                        float: left;
                        margin-right: vw(20);
                        line-height: vw(50);
                    }
                    ul{
                        display: flex;
                        justify-content: flex-start;
                        li{
                            flex: 1;
                            border: vw(1) solid #ccc;
                            margin-right: vw(20);
                            line-height: vw(50);
                            text-align: center;
                            font-size: vw(26);
                        }
                    }
                }
            }
            .confirmBtn{
                @include wh(100%, vw(80));
                line-height: vw(80);
                text-align: center;
                background: #fe9b01;
                color: #ffffff;
                border-radius: vw(10);
                font-size: vw(35);
                opacity: .5;
            }
        }
    }
    .seat-wrapper{
        @include wh(100%, vw(600));
        padding: 0 vw(10);
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        .screen{
            margin: 0 auto;
            @include wh(vw(400), vw(40));
            background-color: #e3e3e3;
            border-radius: 0 0 vw(30) vw(30);
            font-size: vw(25);
            color: #585858;
            line-height: vw(40);
            text-align: center;
        }
        .screen-center{
            position: absolute;
            left:50%;
            transform: translateX(-50%);
            padding: vw(5);
            font-size: vw(20);
            border-radius: vw(2);
            top: vw(100);
            color: #bbbbbb;
            border: vw(1) solid #999;
            .mid-line{
                position: absolute;
                left:50%;
                transform: translateX(-50%);
                top:100%;
                @include wh(vw(5), vw(500));
                border-left: vw(2) dashed #d4d3d3;
            }
        }
        .inner-seat-wrapper{
            position: absolute;
            top: vw(160);
            bottom:0;
            width:100%;
            box-sizing: border-box;
            .seat{
                float:left;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .inner-seat{
                width:80%;
                height:80%;
                cursor: pointer;
            }
        }
    }
    .selected-seat{
        background: url('../../assets/selected.png') center center no-repeat;
        background-size: 100% 100%;
    }
    .unselected-seat{
        background: url('../../assets/unselected.png') center center no-repeat;
        background-size: 100% 100%;
    }
    .bought-seat{
        background: url('../../assets/bought.png') center center no-repeat;
        background-size: 100% 100%;
    }
</style>
