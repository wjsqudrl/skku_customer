<template>
    <v-row>
        <v-card flat style="width:100%;" class="black">
            <v-card-text>
                
                    <v-row style="">
                        <v-col v-for="item in searchItems" :key="item.name" cols="3" align="center" style="">
                            <v-card flat color="black" v-if="item.use" @click="clickBtn">
                                <v-sheet height="10px" class="black"></v-sheet>
                                <!-- <v-img width="32px" height="32px" :src="item.src">
                                </v-img> -->
                                <v-icon>{{item.icon}}</v-icon>
                                <v-card-actions style="font-size:11px">
                                    <v-spacer></v-spacer>
                                    {{ item.name }}
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                            <v-card flat color="black" v-else>
                                <v-sheet height="10px" class="black"></v-sheet>
                                <!-- <v-img width="32px" height="32px" :src="item.src">
                                </v-img> -->
                                <v-icon>{{item.icon}}</v-icon>
                                <v-card-actions style="font-size:11px;padding:10px 0px 0px 0px;">
                                    <v-spacer></v-spacer>
                                    {{ item.name }}
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row> 

            </v-card-text>
        </v-card>
        <v-bottom-sheet v-model="showDialog" max-width="calc(100% - 0px)" scrollable inset>
            <v-card style="border-top-left-radius:30px; border-top-right-radius:30px; background-color:black;">
                <v-divider style="border-color:#707070; color:#707070;"></v-divider>
                <v-card-title>
                    견적요청서
                    <v-spacer></v-spacer>
                    <v-btn class="" text @click="showDialog = !showDialog">
                        닫기
                    </v-btn>
                </v-card-title>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>

                <v-card-text>
                    <v-row>
                    <v-col cols="12">
                        <!-- 이미지 업로드 시작-->
                        <img-view :disabled="disabled" type="write" @fileUpdate="fileUpdate" :img="writeModifyImg"></img-view>
                        <!-- 이미지 업로드 끝-->
                    </v-col>
                    <v-col cols="12">
                        
                        <v-form ref="form" v-model="valid">
                            <!-- <map-component :authorProfile="userProfile" :disabled="disabled" :isBtn="true"></map-component> -->
                            <v-text-field @click="event" :disabled="disabled" v-model="where" outlined :counter="50" label="위치설정" required prepend-icon="map"></v-text-field>
                            <!-- 제목 -->
                            <v-text-field :disabled="disabled" outlined v-model="title" :counter="50" :rules="titleRules" label="기종" required prepend-icon="title"></v-text-field>
                            <!-- 제목 끝 -->
                            <!-- 내용 -->
                            <v-textarea :disabled="disabled" outlined v-model="content" :counter="400" :rules="contentRules" label="사진상세설명" required prepend-icon="border_color"></v-textarea>
                            <!-- 내용 끝 -->
                        <!-- 해시태그  -->
                            <v-combobox
                                :disabled="disabled"
                                v-model="hashtag"
                                hide-selected
                                label="수리유형"
                                multiple
                                dense
                                small-chips
                                outlined
                                prepend-icon="tag"
                                :delimiters="[' ', ',']"
                                hint="최대 3개 까지">
                            </v-combobox>
                            
                        <!-- 해시 태그 끝 -->
                        </v-form>
                    </v-col>
                    <v-btn :disabled="disabled" v-show="valid&&hashtag.length!==0&&where.length!==0&&writeModifyImg.length!==0" width="100%" color="info" @click="clickWriteModify" style="padding:0px;font-size:13px;">견적요청</v-btn>
                </v-row>
                </v-card-text>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>
                
            </v-card>
        </v-bottom-sheet>
        <v-bottom-sheet v-model="showDialog1" max-width="calc(100% - 0px)" scrollable inset>
            <v-card style="border-top-left-radius:30px; border-top-right-radius:30px; background-color:#1a1c1f;">
                <v-card-title>
                    위치설정
                    <v-spacer></v-spacer>
                    <v-btn class="mt-6" text @click="showDialog1 = !showDialog1">
                        닫기
                    </v-btn>
                </v-card-title>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>

                <v-card-text>
                <v-row>
                    <v-col style="background-color:#1a1c1f;margin:0;padding:0" cols="12">
                        <v-tabs v-model="tab" center grow>
                            <v-tab>
                                지도로 찾기
                            </v-tab>
                            <v-tab>
                                주소로 찾기
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab" touchless>
                            <v-tab-item>
                                <map-home :latNow="latNow" :lngNow="lngNow" @infoUpdate="infoUpdate"></map-home>
                            </v-tab-item>
                            <v-tab-item>
                                <!-- <daum-post @address="address"></daum-post> -->
                                <v-container style="background-color:#1a1c1f;">
                                    <v-col class="overflow-y-auto" style="background-color:#1a1c1f;">
                                        <v-card flat style="background-color:#1a1c1f;">    
                                            <template>
                                                <VueDaumPostcode style="width:100%; height: 420px; overflow: scroll;" @complete="clickCode($event)" />
                                            </template>
                                        </v-card>
                                    </v-col>
                                </v-container>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-col>
                </v-row>
                </v-card-text>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>
                
            </v-card>
        </v-bottom-sheet>
    </v-row>
</template>
<script>
import { mapGetters, mapMutations} from 'vuex'
import { dbRead,dbWrite,dbUpdate } from '../firebase'
import imgView from './imgView'
import mapHome from './mapHome'
import { VueDaumPostcode } from "vue-daum-postcode"
import bus from "../utils/bus"

export default {
    props:['num'],
    components: {
        imgView,
        mapHome,
        VueDaumPostcode

    },
    data() {
        return {                
            swiperOption: {
                freeMode: true,
                slidesPerView: this.num,
                centeredSlides: false,
                spaceBetween: 3,
                speed: 0,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
            },
            searchItems: [
                {name: '수리견적',class: 'slide-1', icon:'build', url: '', src:'', use:true},
                {name: '쇼핑하기',class: 'slide-2', icon:'shopping_cart', url: '', src:'', use:false},
                {name: '자전거보험',class: 'slide-3', icon:'mail_outline', url: '', src:'', use:false},
                {name: '자전거정비',class: 'slide-4', icon:'directions_bike', url: '', src:'', use:false},
                
            ],
            date: new Date(),
            showDialog:false,
            showDialog1:false,
            disabled:false,
            valid: false,
            where:'',
            title: '',
            content: '',
            hashtag: '',
            tab:null,
            LatLng:{},
            latNow:0,
            lngNow:0,
            map: null,
            uploadedImg:[],
            // lng:0,
            // lat:0,


            
        }
    },
    computed: {
        ...mapGetters({
            arts: 'getArts', // commons.js
            currentUser: 'getCurrentUser',
            navBtnDisabled: 'getNavBtnDisabled',
            // 리뷰 어레이

            titleRules: 'getTitleRules', // write.js
            contentRules: 'getContentRules', // write.js

            writeModifyImg: 'getWriteModifyImg',

            writeModifyTitle: 'getWriteModifyTitle',
            writeModifyContent: 'getWriteModifyContent',
            writeModifyHashTag: 'getWriteModifyHashTag',
        }),
        writeResult() {
            let a = {
                // 글 쓰기 관련 변수
                title: this.writeModifyTitle,
                content: this.writeModifyContent,
                hashtag: this.writeModifyHashTag,
                // 자동으로 입력되어야 할 변수
                authorEmail: this.currentUser.email,
                authorUid: this.currentUser.uid,
                storeUid: '',
                LatLng: this.LatLng,
                address: this.where,
                // 자동으로 입력되어야 할 변수
                createdAt: new Date(),
                check:true,
                state:"noCheck",
                reserved:false,
                consult:[],
                
            }
            return a 
        },
        
    },
    async created(){
        this.getCurrentLocation()
    },
    async mounted(){

        // if (window.kakao && window.kakao.maps) {
        //     this.initMap();
        // } else {
        //     const script = document.createElement('script');
        //     /* global kakao */
        //     script.onload = () => kakao.maps.load(this.initMap);
        //     script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=66e112bad6ed1c35267171235fc42344&libraries=services';
        //     document.head.appendChild(script);
        // }
        this.title = this.writeModifyTitle
        this.content = this.writeModifyContent
        this.hashtag = this.writeModifyHashTag
    },
    methods:{
        event(){
            navigator.geolocation.getCurrentPosition(pos => {
            this.latNow = pos.coords.latitude
            this.lngNow = pos.coords.longitude
            this.showDialog1 = !this.showDialog1
            }, err => {
                alert("해당 브라우저의 위치 접근 허용이 필요합니다.")    
            })
        },
        clickBtn(){
            this.showDialog = !this.showDialog
        },
        async clickWriteModify(type){
            this.disabled = true
            // storage에 이미지 업로드
            this.$store.commit('changeNavBtnDisabled')
            await bus.$emit('start:spinner')

            let input = {...this.writeResult}

            // firestore에 업로드
            let w = await dbWrite('ask', input)
            
            for(var i in this.writeModifyImg) { 
                var uploadTaskSnapshot = await this.$storage.child('ask').child(this.currentUser.uid).child(w.id).child(i).child('ask_'+i).put(this.writeModifyImg[i].file)
                var url = await uploadTaskSnapshot.ref.getDownloadURL()
                //let name = uploadTaskSnapshot.metadata.name

                this.uploadedImg.push({url:url})
            }

            var input2 = {...this.writeResult, img:this.uploadedImg}
            await dbUpdate('ask', w.id, input2)
            this.setWriteModifyImg([])
            // this.writeModifyImg=[]
            // await this.fetchArts()
            this.uploadedImg=[]
            this.title = ''
            this.content = ''
            this.hashtag = ''
            this.where=''
            await bus.$emit('end:spinner')
            this.$store.commit('changeNavBtnDisabled')
            this.showDialog = false
            this.disabled = false
        },
        infoUpdate(item){
            // console.log(this.map.getCenter().getLng())
            console.log(item.getCenter())
            this.LatLng.lat=item.getCenter().getLat()
            this.LatLng.lng=item.getCenter().getLng()
            this.searchAddrFromCoords(item.getCenter(), this.displayCenterInfo);
            this.showDialog1 = false
        },
        fileUpdate(imgList) {
            this.setWriteModifyImg(imgList)
            console.log(this.writeModifyImg)
        },
        ...mapMutations({
            setWriteModifyImg: 'setWriteModifyImg',
            setWriteModifyTitle: 'setWriteModifyTitle',
            setWriteModifyContent: 'setWriteModifyContent',
            setWriteModifyHashTag: 'setWriteModifyHashTag',
        }),
        async clickCode(result){
            let a = {
                name:result.address
            }
            this.askAddr=a
            this.where=this.askAddr.name
            await this.searchSubmit(this.askAddr.name)
            console.log(this.LatLng)
            this.showDialog1 = false
            // this.$emit('address', a)
        },
        searchSubmit(addr) {
            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(addr, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    result.forEach(async (data)=>{
                        console.log(data.y, data.x)
                        this.LatLng={lat:data.y, lng:data.x}
                    })
                }
            });
        },
        async getCurrentLocation(){
            await navigator.geolocation.getCurrentPosition(pos => {
            this.latNow = pos.coords.latitude
            this.lngNow = pos.coords.longitude
            }, err => {
                this.noLocation =true    
            })
        },
        searchAddrFromCoords(coords, callback) {
            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);        
        },
        displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                for(var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        this.where = result[i].address_name;
                        break;
                    }
                }
            }
        },
    },
    watch: {
        title(){
            this.setWriteModifyTitle(this.title)
        },
        content(){
            this.setWriteModifyContent(this.content)
        },
        hashtag (val) {
        if (val.length > 3) {
            this.$nextTick(() => this.hashtag.pop())
        }
        this.setWriteModifyHashTag(this.hashtag)
        },  
    
    }

}
</script>

<style scoped>
.inner {
    transition: transform 0.3s;
}
.inner:hover {
    -webkit-transform: scale(0.92);
    -ms-transform: scale(0.92);
    transform: scale(0.92)
}
.artTitle{
    width:120px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* word-wrap: break-word; */
    white-space:nowrap;
}
.trendy{
    width:185px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* word-wrap: break-word; */
    white-space:nowrap;
}
.v-card__text .likeFavorite{
    font-size:8px !important;
}
</style>