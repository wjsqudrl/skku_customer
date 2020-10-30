<template>
  <v-card flat class="black">
        <v-card-title>
          위치설정
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <naver-maps
            v-if="afterSetMapOptions"
            :height="300" 
            :mapOptions="mapOptions"
            :initLayers="['BACKGROUND', 'BACKGROUND_DETAIL', 'BYCYCLE', 'CADASTRAL', 'CTT', 'HIKING_TRAIL', 'PANORAMA', 'POI_KOREAN', 'TRANSIT']"
            @load="onLoad"
            style="z-index:1">
            <naver-marker v-if="afterRenderingMaps" :lat="37" :lng="126" @click="onMarkerClicked" @load="onMarkerLoaded"/>
          </naver-maps>
        </v-card-text>
        <v-icon v-if="isBtn" color="black" style="position:absolute;z-index:9997; margin-top:-200px; margin-left:-20px" x-large>location_on</v-icon>
        <v-card-actions v-if="isBtn">
          <v-btn :disabled="disabled || latLngDisabled" @click="updateLatLng" outlined block elevation="2">
              위치 저장
          </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>

export default {
    props:['authorProfile', 'disabled', 'isBtn'],
    components:{
    },
    data(){
        return{
            afterSetMapOptions:false,
            afterRenderingMaps:false,
            map:'',
            center:'',
            marker: '',
            mapOptions: {
              lat: '',
              lng: '',
              zoom: 11,
              zoomControl: true,
              zoomControlOptions: {position: 'BOTTOM_CENTER'},
              mapTypeControl: true,
            },
            latLngDisabled: false,
        }
    },
    mounted(){
        console.log('mounted')
        this.mapOptions.lat = this.authorProfile ? this.authorProfile.data().latLng ? this.authorProfile.data().latLng.lat : 37.554229748867 : 37.554229748867
        this.mapOptions.lng = this.authorProfile ? this.authorProfile.data().latLng ? this.authorProfile.data().latLng.lng : 126.97474860534089 : 126.97474860534089
        // console.log(this.mapOptions.lat)
        // console.log(this.mapOptions.lng)
        this.afterSetMapOptions = true
        // this.mapOptions.lat = this.lat
        // this.mapOptions.lng = this.lng
        
    },
    watch:{
      marker(){
        console.log('watch marker')
        // console.log(this.marker)
        // console.log(this.map)
        // console.log(this.center)
          this.marker.setOptions({
            map:this.map,
            position: this.center
          })
      },
      // map(){
      //   console.log('watch map')
      //   console.log(this.marker)
      //   console.log(this.map)
      //   console.log(this.center)
      //   this.marker.setOptions({
      //     map:this.map,
      //     position: this.center
      //   })
      // },
      // center(){
      //   console.log('watch center')
      //   console.log(this.marker)
      //   console.log(this.map)
      //   console.log(this.center)
      //     this.marker.setOptions({
      //       map:this.map,
      //       position: this.center
      //     })
      // }
    },
    methods:{
        onLoad(vue) {
          console.log('onLoad')
          this.map = vue.map
          this.center = vue.map.getCenter()
          // console.log(this.center)
          this.afterRenderingMaps = true
        },
        updateLatLng(){
          console.log('updateLatLng')
          // this.latLngDisabled = true
          this.center = this.map.getCenter()
          let lat = this.center.lat()
          let lng = this.center.lng()
          this.marker.setOptions({
            map:this.map,
            position: this.center
          })
          this.$emit('updateLatLng', {lat:lat, lng:lng})
        },
        onMarkerClicked(event) {
        },
        onMarkerLoaded(vue) {
          console.log('onMarkerLoaded')
          this.marker = vue.marker; //naver.maps.Marker
        },
    }
    

}
</script>

<style>
.info-window-container {
    padding: 10px;
    width: 300px;
    height: 100px;
  }
</style>