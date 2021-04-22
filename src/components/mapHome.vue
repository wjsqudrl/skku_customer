<template>
    <v-card flat style="background-color:#1a1c1f;">
        <v-col>
            <div id="map1" style="width:100%;height:300px;"></div>
        </v-col>
        
        <v-col align="center" style="background-color:#1a1c1f;">
            <v-icon color="black" style="position:absolute;z-index:98; margin-top:-217px; margin-left:55px" >add_location</v-icon>
            <v-btn @click="clickLabelBtn" class="white--text" style="margin-top:-80px;z-index:100;" color="info" width="150px" height="50px" elevation="5">
                위치 지정 완료
            </v-btn>
        </v-col>
    </v-card>
</template>


<style>
.col   .v-application--wrap {
    min-height: 1vh !important;
}
</style>


<script>


export default {
    props:['latNow', 'lngNow'],
    data(){
        return{
            //지도관련
            map:null,

            
        }
    },
    mounted(){
        // this.getCurrentLocation()
        console.log('mounted')
        // this.lat = this.authorProfile ? this.authorProfile.data().latLng ? this.authorProfile.data().latLng.lat : 37.554229748867 : 37.554229748867
        // this.lng = this.authorProfile ? this.authorProfile.data().latLng ? this.authorProfile.data().latLng.lng : 126.97474860534089 : 126.97474860534089
        // // console.log(this.mapOptions.lat)
        // // console.log(this.mapOptions.lng)
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e9daeb105d5f14b828789e6a2a50b1f4&libraries=services';
            document.head.appendChild(script);
        }
    },
    methods:{
        // async getCurrentLocation(){
        //     await navigator.geolocation.getCurrentPosition(pos => {
        //     this.latNow, this.mapOptions.lat = pos.coords.latitude
        //     this.lngNow, this.mapOptions.lng = pos.coords.longitude
        //     }, err => {
        //     })
        // },
        initMap() {
            let container = document.getElementById('map1');
            let options = {
                center: new kakao.maps.LatLng(this.latNow , this.lngNow),
                level: 3
            };
            var markerPosition  = new kakao.maps.LatLng(this.latNow, this.lngNow);
            var marker = new kakao.maps.Marker({
                position: markerPosition
            });

            let map = new kakao.maps.Map(container, options);

            // this.map = map;
            marker.setMap(map);
            map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
            // this.geocoder = new kakao.maps.services.Geocoder();
            this.map=map
        },
        clickLabelBtn(){
            this.$emit('infoUpdate', this.map)
            
			    
		},
		
    }
}
</script>

<style>
</style>