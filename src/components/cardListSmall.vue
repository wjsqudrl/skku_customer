<template>
    <!-- <v-row class="black" v-if="!checkPage">
        <v-col @click.stop="$router.push('/artist/' + item.uid)" style="margin:-10px -5px -10px -5px;" v-for="(item, i) in arts" :key="item.id" cols="12">
            <v-card style="padding:0px 0px 0px 0px;margin-bottom:0px;" class="black" tile elevation="12">
                <v-row style="margin:0px 0px 0px 0px;" align="center">

                    <v-col cols="5" style="padding:13px 0px 0px 0px;">
                        <card-list-small-img :item="item"></card-list-small-img>
                    </v-col>
                    
                    <v-col cols="7" style="padding:0px 0px 0px 10px;">
                        <v-card-title  style="max-width: 100%; font-weight:600; font-size: 14px; padding:0px;">
                            {{ item.displayName }}                        
                        </v-card-title>
                        <v-card-text style="padding:0px;">
                            <v-col cols="12" style="color:rgba(255, 255, 255, 0.7);padding:0px 0px 0px 0px; overflow:hidden; font-size:12px; text-overflow:ellipsis; white-space:nowrap;">
                                {{item.address}}
                            </v-col>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-divider style="border-color:#333333; color:#333333;"></v-divider>
                </v-row>
            </v-card>
        </v-col>
    </v-row> -->
    <v-row class="black">
        <v-col style="margin:-10px -5px -10px -5px;" v-for="(item, i) in arts" :key="item.id" cols="12">
            <v-card style="padding:0px 0px 0px 0px;margin-bottom:0px;" class="black" tile elevation="12">
                <v-row style="margin:0px 0px 0px 0px;" align="center">

                    <v-col cols="5" style="padding:13px 0px 0px 0px;">
                        <!-- {{item.data()}} -->
                        <div v-if="item.data().img ? item.data().img[0].url ? true : false : false">
                            <v-img style="height:8.6rem; width:8.6rem;" class="rounded-img grey darken-4" aspect-ratio="1" :src="item.data().img[0].url">
                            </v-img>
                        </div>
                        <div v-else>
                            <v-img class="rounded-img grey darken-4" aspect-ratio="0.995" src="../assets/back.jpg"> 
                            </v-img>
                        </div>
                    </v-col>
                    
                    <v-col cols="7" style="padding:0px 0px 0px 10px;">
                        <v-card-title  style="max-width: 100%; font-weight:600; font-size: 15px; padding:0px;">
                            <v-col cols="6" style="padding:0px;">
                            {{ item.data().title }}
                            </v-col>
                            <v-col cols="6" style="padding:0px;" align="end" v-if="item.data().reserved ? item.data().reserved===true ? true :false:false">
                            <v-btn :ripple="false" outlined color="green">예약확정</v-btn>
                            </v-col>
                        </v-card-title>
                        <v-card-text style="padding:0px;font-size:11px;color:rgba(255, 255, 255, 0.7);">
                            {{ dateTimeToFormatted(item.data().createdAt.toDate()) }}
                        </v-card-text>
                        <v-card-text style="padding:0px;">
                            <v-btn style="background-color:black" outlined @click="clickBtn(item)">
                                <v-col cols="12" style="color:#3884FF;padding:0px 0px 0px 0px; overflow:hidden; font-size:12px; text-overflow:ellipsis; white-space:nowrap;">
                                    받은 견적서 보기  <span v-show="item.data().count ? item.data().count.length!=0 ? true : false : false" style="color:red;">*</span>
                                </v-col>
                            </v-btn>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-divider style="border-color:#333333; color:#333333;"></v-divider>
                </v-row>
            </v-card>
        </v-col>
        <v-bottom-sheet v-model="show" max-width="calc(100% - 0px)" scrollable inset>
            <v-card style="border-top-left-radius:30px; border-top-right-radius:30px; background-color:#1a1c1f;">
                <v-card-title>
                    받은 견적서
                    <v-spacer></v-spacer>
                    <v-btn class="mt-6" text @click="clickClose">
                        닫기
                    </v-btn>
                </v-card-title>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>

                <v-card-text>
                    <v-row>
                        <v-col style="" v-for="(item, i) in items" :key="item.id" cols="12">
                            <v-card style="padding:0px 0px 0px 0px;margin-bottom:0px;" class="" tile elevation="12">
                                <v-row style="margin:0px 0px 0px 0px;" align="center">

                                    <!-- <v-col cols="5" style="padding:13px 0px 0px 0px;">
                                        <div v-if="item.data().img ? item.data().img[0].url ? true : false : false">
                                            <v-img style="height:8.6rem; width:8.6rem;" class="rounded-img grey darken-4" aspect-ratio="1" :src="item.data().img[0].url">
                                            </v-img>
                                        </div>
                                        <div v-else>
                                            <v-img class="rounded-img grey darken-4" aspect-ratio="0.995" src="../assets/back.jpg"> 
                                            </v-img>
                                        </div>
                                    </v-col> -->
                                    
                                    <v-col cols="12" style="padding:10px;">
                                        <v-card-title  style="max-width: 100%; font-weight:600; font-size: 15px; padding:0px;">
                                            <v-col cols="6">
                                            {{ item.data().storeName }}
                                            </v-col>
                                            <v-col cols="6" align="end" v-if="item.data().reserved ? item.data().reserved===true ? true :false:false">
                                            <v-btn :ripple="false" outlined color="green">예약확정</v-btn>
                                            </v-col>
                                        </v-card-title>
                                        <v-card-text style="padding:0px;font-size:11px;color:rgba(255, 255, 255, 0.7);overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                                            {{ item.data().address }}
                                        </v-card-text>
                                        <v-card-text style="padding:0px;font-size:11px;color:rgba(255, 255, 255, 0.7);">
                                            {{ dateTimeToFormatted(item.data().createdAt.toDate()) }}
                                        </v-card-text>
                                        <v-divider style="border-color:#333333; color:#333333;"></v-divider>
                                        <v-card-text style="padding:2px 0px 2px 0px;color:#3884FF">
                                            <v-row>
                                                <v-col cols="6" style="color:rgba(255, 255, 255, 0.7);font-size:12px;">견적 금액</v-col>
                                                <v-col align="end" cols="6" style="font-size:16px;">{{ item.data().title }} 만원</v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-text style="padding:5px;">
                                            <v-btn width="100%" style="background-color:black" outlined @click="clickBtn1(item)">
                                                <v-col cols="12" style="color:#3884FF;padding:0px 0px 0px 0px; overflow:hidden; font-size:12px; text-overflow:ellipsis; white-space:nowrap;">
                                                    상세 견적 확인하기  <span v-show="!item.data().check" style="color:red;">*</span>
                                                </v-col>
                                            </v-btn>
                                        </v-card-text>
                                    </v-col>
                                
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>
                
            </v-card>
        </v-bottom-sheet>
        <v-bottom-sheet v-model="show1" max-width="calc(100% - 0px)" scrollable inset>
            <v-card style="border-top-left-radius:30px; border-top-right-radius:30px; background-color:#1a1c1f; ">
                <v-card-title>
                    견적서
                    <v-spacer></v-spacer>
                    <v-btn class="mt-6" text @click="clickClose1">
                        닫기
                    </v-btn>
                </v-card-title>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>

                <v-card-text style="padding:20px;">
                    
                    <v-row align="center" >
                        <v-col cols="2" @click="$router.push('/artist/' + storeUid)">
                            <v-avatar v-if="!storeAvatarUrl" >
                                <!-- 만약 저장된 아바타가 없다면 그냥 아이콘 -->
                                <!-- {{backgroudColor}} -->
                                <span class="white--text headline">{{storeName}}</span>
                                <!-- <v-icon v-if="userProfile.data().userAvatarUrl === null" x-large>account_circle</v-icon> -->
                            </v-avatar>
                            <v-avatar v-else>
                                <!-- 만약 저장된 아바타가 있다면 보여준다 --> 
                                <v-img class="grey darken-4" :src="storeAvatarUrl ? storeAvatarUrl : null"></v-img>
                                
                            </v-avatar>
                        </v-col>
                        <v-col cols="10" @click="$router.push('/artist/' + storeUid)">
                            <span style="">{{storeName}}</span>
                        </v-col>
                        <v-col cols="2" style="font-weight:bold; font-size:13px;" align="left">
                            주   소
                        </v-col>
                        <v-col cols="7" style="padding:0px;font-weight:lighter; font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" align="center">
                            {{address}}
                        </v-col>
                        <v-col cols="3" style="font-weight:lighter; font-size:13px;" align="right">
                            <v-btn color="info" :href=findRoad style="padding:0px;font-size:13px;">길찾기</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-btn class="info" block @click="call(storePhoneNum)">
                                전화하기
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row style="padding-top:10px;" >
                        <v-col cols="6" style="color:rgba(255, 255, 255, 0.7);font-size:14px;">견적 금액</v-col>
                        <v-col align="end" cols="6" style="font-size:16px;"><span style="color:#3884FF;">{{ won }}</span> 만원</v-col>
                        
                        <v-col cols="12" style="color:rgba(255, 255, 255, 0.7);font-size:14px;padding:30px 12px 30px 12px;">{{content}}</v-col>

                        <v-col cols="3" style="color:rgba(255, 255, 255, 0.7);font-size:12px;">예상수리기간</v-col>
                        <v-col align="start" cols="9" style="font-size:12px; color:rgba(255, 255, 255, 0.5)"><span style="">{{day}}</span> 일</v-col>

                        <v-col cols="3" style="color:rgba(255, 255, 255, 0.7);font-size:12px;">기타 서비스</v-col>
                        <v-col cols="9" align="start" style="padding-bottom:20px;"><v-chip style="font-size:12px; color:rgba(255, 255, 255, 0.5);" v-for="(tag, i) in service" :key="i">{{ tag }}</v-chip></v-col>
                        
                        <v-col cols="12" v-if="checkReserved&&storeUid===reservedStoreUid">
                            <v-btn style="width:100%;" :disabled="disabled || navBtnDisabled" color="green" rounded outlined @click="clickBtn2">리뷰 쓰기</v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-if="!checkReserved">
                        <v-col cols="12" align="center" style="font-size:20px">
                            예약날짜 선택
                            <v-card flat>
                                    <v-date-picker
                                        flat
                                        v-model="dates"
                                        show-current
                                        full-width 
                                        color="success"
                                        header-color="transparent"
                                        min="2020-01-01"
                                        max="2021-12-31"
                                        :disabled="disabled"
                                        
                                    ></v-date-picker>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-form ref="form" v-model="valid">
                                <v-text-field  :disabled="disabled" v-model="name" outlined :counter="10" label="예약자명" required></v-text-field>
                                <v-text-field type="number" :disabled="disabled" v-model="number" outlined :counter="20" label="연락처" required></v-text-field>
                            </v-form>
                            <v-btn :disabled="disabled" v-show="name.length!==0&&dates.length!==0" width="100%" color="info" @click="reserve" style="padding:0px;font-size:13px;">예약하기</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>
            
            </v-card>
        </v-bottom-sheet>
        
    </v-row>
    
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import favoriteBtn from './favoriteBtn'
import { dbRead, dbQuery,dbUpdate} from '../firebase'
import numLikes from './numLikes'
import cardListSmallImg from './cardListSmallImg'
import rating from './rating'
import bus from "../utils/bus"
import firebase from 'firebase/app'
export default {
    name:'cardListSmall',
    computed:{
        ...mapGetters({
            currentUser: 'getCurrentUser',
            navBtnDisabled: 'getNavBtnDisabled'
        }),
        checkPage(){
            return this.type==="favorite"
        },
        findRoad(){
            return "https://map.kakao.com/link/search/"+this.address
        },
        // checkNew(item){

        //     return 
        // }
    },
    components: {
        favoriteBtn,
        cardListSmallImg,
        numLikes,
        rating
    },
    data(){
        return {
            items: [],
            items1: [],
            loadingImg: true,
            show:false,
            show1:false,
            askId:'',
            storeUid:'',
            address:'',
            lat:37.554229748867,
            lng:126.97474860534089,
            map: null,
            won:'',
            content:'',
            service:'',
            day:'',
            dates:'',
            disabled:false,
            valid:false,
            name:'',
            number:'',
            writeDocId:'',
            checkReserved:false,
            storePhoneNum:'',
            storeAvatarUrl:'',
            storeName:'',
            reservedStoreUid:'',
        }
    },
    props: ['arts','type'],
    created(){
        console.log(this.type)
        if(this.currentUser === null){
            console.log('if')
            
        }else{
            console.log('else')
            //this.arts = this.arts.sort((t1,t2) => t1.createdAt > t2.createdAt ? -1 : 1)
        }
        
        
    },
    mounted(){
        // if (window.kakao && window.kakao.maps) {
        //     this.initMap();
        // } else {
        //     const script = document.createElement('script');
        //     /* global kakao */
        //     script.onload = () => kakao.maps.load(this.initMap);
        //     script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=66e112bad6ed1c35267171235fc42344&libraries=services';
        //     document.head.appendChild(script);
        // }
    },
    methods:{
        ...mapMutations({
        changeGridNum: 'changeGridNum',
        }),
        dateTimeToFormatted(dt) {
            let min = 60 * 1000;
            let c = new Date()
            let d = new Date(dt);
            let minsAgo = Math.floor((c - d) / (min));

            let result = {
                'raw': d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) + '-' + (d.getDate() > 9 ? '' : '0') +  d.getDate() + ' ' + (d.getHours() > 9 ? '' : '0') +  d.getHours() + ':' + (d.getMinutes() > 9 ? '' : '0') +  d.getMinutes() + ':'  + (d.getSeconds() > 9 ? '' : '0') +  d.getSeconds(),
                'formatted': '',
            };

            if (minsAgo < 60) { // 1시간 내
                result.formatted = minsAgo + '분 전';
            } else if (minsAgo < 60 * 24) { // 하루 내
                result.formatted = Math.floor(minsAgo / 60) + '시간 전';
            } else { // 하루 이상
                result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
            };

            return result.formatted;
        },
        async clickBtn(item){
            var input2 = {check:true}
            await dbUpdate('ask', item.id, input2)
            // this.items=item.
            // var a=[]
            // this.items=[]
            await this.$db.collection('ask').doc(item.id).collection('write').orderBy("createdAt", "desc").onSnapshot(querySnapshot=> {
                var a =[]
                querySnapshot.forEach(doc => {
                    a.push(doc)

                })
                // console.log(a)
                this.items=a
            });
            // this.items=a
            this.askId=item.id
            this.checkReserved=item.data().reserved
            this.reservedStoreUid=item.data().storeUid
            // console.log(a)
            // console.log(this.items)
            this.show=!this.show
            console.log(this.show)

        },
        async clickBtn1(item){
            var input2 = {check:true}
            await this.$db.collection('ask').doc(this.askId).collection('write').doc(item.id).update({  
            ...input2
            })
            await this.$db.collection('ask').doc(this.askId).update({
                count:firebase.firestore.FieldValue.arrayRemove(item.data().storeUid)
            })
            // let a = await dbRead("userProfiles",item.data().storeUid)
            // let b = a.data().storeUid
            // console.log(a.data())
            // this.checkReserved=item.data().reserved
            this.storeName=item.data().storeName
            this.storeAvatarUrl=item.data().storeAvatarUrl
            this.storePhoneNum=item.data().phoneNum
            this.address=item.data().address
            this.writeDocId=item.id
            this.storeUid=item.data().storeUid
            this.won=item.data().title
            this.content=item.data().content
            this.service=item.data().hashtag
            this.day=item.data().day
            // this.initMap()
            this.show1=!this.show1
            console.log(this.show1)

        },
        clickClose(){
            this.items=[]
            this.show=false
        },
        clickClose1(){
            this.show1=false
        },
        async reserve(){
            this.disabled = true
            this.$store.commit('changeNavBtnDisabled')
            await bus.$emit('start:spinner')
            var input3={name:this.name, number:this.number, date:this.dates, storeUid:this.storeUid ,reserved:true, writeDocId:this.writeDocId}
            await this.$db.collection('ask').doc(this.askId).update({  
            ...input3
            })
            await this.$db.collection('ask').doc(this.askId).collection('write').doc(this.writeDocId).update({  
            reserved:true
            })
            await bus.$emit('end:spinner')
            this.$store.commit('changeNavBtnDisabled')
            this.show1 = false
            this.show = false
            this.disabled = false
        },
        async call(reservedNumber){
            this.$store.commit('changeNavBtnDisabled')
            await bus.$emit('start:spinner')
            this.disabled = true
            window.location.href = "tel:"+reservedNumber

            this.disabled = false
            await bus.$emit('end:spinner')
            this.$store.commit('changeNavBtnDisabled')
        },
        clickBtn2(){
            this.disabled = true
            this.setWriteIdFromArt(this.storeUid)
            // this.fetchArtAuthorUid(this.storeUid)
            this.$router.push('/reviewwrite/new')
            this.disabled = false
            
        },
        ...mapMutations({
            setWriteIdFromArt: 'setWriteIdFromArt', // reviewwrite.js
        }),
        ...mapActions({
            fetchArtAuthorUid: 'fetchArtAuthorUid',
        }),
        // initMap() {
        //     console.log(this.lat, this.lng)
        //     let container = document.getElementById('map3');
        //     let options = {
        //         center: new kakao.maps.LatLng(0, 0),
        //         level: 3
        //     };
        //     var markerPosition  = new kakao.maps.LatLng(0,0); 
        //     var marker = new kakao.maps.Marker({
        //         position: markerPosition
        //     });

        //     let map = new kakao.maps.Map(container, options);

        //     // this.map = map;
        //     marker.setMap(map);
        //     map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        //     // this.geocoder = new kakao.maps.services.Geocoder();
        //     this.map=map
        // },
    },
    watch: {
        async dates() {
            console.log('watch')
             
            this.disabled = true
            let input = {dates: this.dates}
            // await dbUpdate('userProfiles', this.userProfile.id, input)
            this.disabled = false
             
        }
    },
}
</script>

<style scoped>

/* 무료타투 버튼 */
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
    opacity: 0;
}
.inner {
    transition: transform 0.3s;
}
.inner:hover {
    -webkit-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95)
}

.card{
    padding:20px;
    /* margin-top:14px; */
}
/* 조회수, 좋아요 card-text */
.v-card__text{
    /* padding:0px 0px 0px 0px;
    line-height: 0rem;
    align-items: baseline; */
}
/* 조회수, 좋아요 아이콘 높낮이 조절 */
.v-icon.v-icon{
    line-height: 0.02;
    align-items: center;
}
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}
/* 이미지 둥글게 */
.rounded-img{
    border-radius: 12px 12px 12px 12px;
}
</style>