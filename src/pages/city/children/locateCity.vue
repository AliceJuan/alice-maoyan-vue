<template>
  <div class="city-location" :data-ch="title.substring(0,2)">
    <div class='city-title city-title-left'>{{title}}</div>
    <div class="city-location-row">
      <div class="city-location-cell" @click="selectCity(localCity)">{{cityName}}</div>
    </div>
  </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data () {
            return {
                cityName: '定位中...'
            }
        },
        props: {
            title: String
        },
        computed: {
            ...mapGetters([
                'localCity'
            ])
        },
        mounted () {
            this.reLocation()
        },
        methods: {
            ...mapActions(['locationCity', 'selectCity']),
            selectCity (city) {
                if (this.localCity.cname) {
                    this.selectCity(city)
                    this.$router.go(-1)
                } else {
                    this.reLocation()
                }
            },
            reLocation () {
                this.cityName = this.localCity.cname || '正在定位...'
                const loca = {}
                if (!this.localCity.cname) {
                    var geolocation = new this.$BMap.Geolocation()
                    geolocation.enableSDKLocation()
                    geolocation.getCurrentPosition((r) => {
                        if (geolocation.getStatus() === 0) {
                            loca.point = {
                                lng: r.point.lng,
                                lat: r.point.lat
                            }
                            var myGeo = new this.$BMap.Geocoder()
                            myGeo.getLocation(new this.$BMap.Point(116.364, 39.993), (result) => {
                                if (result) {
                                    loca.cname = result.addressComponents.city
                                    this.cityName = loca.cname
                                    this.locationCity(loca)
                                }
                            })
                        } else {
                            loca.cname = ''
                            this.cityName = '定位失败，请点击重试'
                            this.locationCity(loca)
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="scss">
@import '../../../common/style/mixin.scss';
.city-location{
  &-row{
    padding: vw(15) vw(60) vw(30) 0;
    @include utils-clearfix;
  }
  &-cell{
    min-width: vw(188);
    max-width: vw(365);
    height: vw(63);
    line-height: vw(63);
    margin-left: vw(28);
    margin-top: vw(16);
    padding: 0 vw(20);
    text-align: center;
    border: vw(1) solid #e6e6e6;
    border-radius: vw(3);
    float: left;
    background: #fff;
    @include utils-ellipsis;
  }
}
</style>
