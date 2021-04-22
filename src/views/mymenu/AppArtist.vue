<template>
  <v-app>

    <appbar :arrow="true">{{ authorProfile ? authorProfile.data().displayName : null }}</appbar>

      <v-col class="black" cols="12" style="padding-bottom:0px;">
        <v-row class="black" v-show="isAuthorShow">

          <v-col cols="4" justify="center" align="center">
            <avatar-view :authorProfile="authorProfile" :isAuthor="isAuthor" @renewAuthorProfile="renewAuthorProfile"></avatar-view>
          </v-col>

          <v-col cols="8" justify="center" align="center">
            <artist-Right :meanRate="meanRate"  :authorProfile="authorProfile" :authorArts="authorArts"></artist-Right>
          </v-col>

          <v-col v-if="isAuthor" cols="12" justify="center" align="center">
            <v-btn small outlined width="100%" :to="'/accountsettings/' + userProfile.data().uid">프로필 수정</v-btn>
          </v-col>
          <v-col v-else cols="12" justify="center" align="center">
            <artistFollowBtn></artistFollowBtn>
          </v-col>
          <v-col v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false" cols="12" justify="center" align="center">
            <consult-btn :artUid="$route.params.id" :userProfile="userProfile" :authorProfile="authorProfile"></consult-btn>
          </v-col>
        </v-row>
        <v-row class="black" style="padding-top:30px;" v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false">
          <v-col cols="12" class="black" style="padding:0px 0px 10px 0px;">
            <backgroundView :authorProfile="authorProfile" :isAuthor="isAuthor" @renewAuthorProfile="renewAuthorProfile"></backgroundView>
            <!-- <tab v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false" :isAuthor="isAuthor" :authorArts="authorArts" :authorProfile="authorProfile"></tab> -->
          </v-col>
        </v-row>
        <v-row align="center" v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false">
          <v-col cols="2" style="padding:0px; font-weight:bold; font-size:13px;" align="left">
            주   소
          </v-col>
          <v-col cols="7" style="padding:0px;font-weight:lighter; font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" align="center">
            {{address}}
          </v-col>
          <v-col cols="3" style="padding:0px;font-weight:lighter; font-size:13px;" align="right">
            <v-btn color="info" :href=findRoad style="padding:0px;font-size:13px;">길찾기</v-btn>
          </v-col>
        </v-row>
        <v-row style="padding-top:20px;" v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false">
          <div id="map" style="width:100%;height:300px;"></div>
        </v-row>
        <v-row style="padding-top:20px;" v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false">
          <review-tab :reviewsDocsToArray="reviewToMe"></review-tab>
        </v-row>
        <v-row class="black" style="padding:30px 0px 30px 0px;" v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false">
          <v-btn width="100%" color="info" @click="showDialog=!showDialog" style="padding:0px;font-size:13px;">견적요청</v-btn>
        </v-row>
      </v-col>
<!--       
      <v-row class="black" style="padding:10px 0px 10px 0px;" v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false">
        <v-btn width="100%" color="info" @click="showDialog=!showDialog" style="padding:0px;font-size:13px;">견적요청</v-btn>
      </v-row> -->

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
      
    

  </v-app>
</template>

<script>
import appbar from '../../components/appbar'
import mapComponent from '../../components/mapComponent'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { userProfiles } from '../../firebase.js';
import { follows } from '../../firebase.js';
import { dbQuery, dbWrite,dbUpdate } from '../../firebase.js'
import artistFollowBtn from '../../components/AppArtist/artistFollowBtn.vue'
import artistRight from '../../components/artistRight'
import avatarView from '../../components/avatarView'
import backgroundView from '../../components/backgroundView.vue'
import consultBtn from '../../components/consultBtn'
import tab from '../../components/tab'
import bus from '../../utils/bus.js';
import IsAuthor from '../../mixins/IsAuthor.js'
import reviewTab from '../../components/reviewTab'
import imgView from '../../components/imgView'
import mapHome from '../../components/mapHome'
import { VueDaumPostcode } from "vue-daum-postcode"
export default {
  mixins : [IsAuthor],
  components: {
    appbar,
    artistRight,
    artistFollowBtn,
    avatarView,
    backgroundView,
    tab,
    consultBtn,
    reviewTab,
    imgView,
    mapComponent,
    VueDaumPostcode,
    mapHome

  },
  data() {
    return {
      authorDocType: 'mypage',
      authorArts: [],
      followsDocsArray: [],
      deleteList: '',
      userFavoriteTattoos: [],
      followings:[],
      followers:[],
      map: null,
      lng:0,
      lat:0,
      showDialog:false,
      showDialog1:false,

      // 이미지 관련 변수
      uploadedImg:[],
      disabled:false,

      cancel: true,
      tab:null,
      snackbar: false,
      askAddr:'',
      // 입력 관련 변수
      LatLng:{},
      latNow:0,
      lngNow:0,
      title: '',
      content: '',
      hashtag: '',
      where:'',
      valid: false,
      imgVisible: false, // 수정으로들어왔을때, img-view 컴포넌트가 좀 나중에 떠야 props로 제대로 변수값을 넘겨주기 가능
      noLocation: false,
    }
  },
  methods: {
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
    searchAddrFromCoords(coords, callback) {
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);        
    },
    infoUpdate(item){
      // console.log(this.map.getCenter().getLng())
      console.log(item.getCenter())
      this.LatLng.lat=item.getCenter().getLat()
      this.LatLng.lng=item.getCenter().getLng()
      this.searchAddrFromCoords(item.getCenter(), this.displayCenterInfo);
      this.showDialog1 = false
    },
    async getCurrentLocation(){
        await navigator.geolocation.getCurrentPosition(pos => {
        this.latNow = pos.coords.latitude
        this.lngNow = pos.coords.longitude
        // alert("send")
        },
        err => {
          this.noLocation =true          
        })
    },
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

              // let bounds = new kakao.maps.LatLngBounds();

              result.forEach(async (data)=>{
                  // bounds.extend(new kakao.maps.LatLng(data.y, data.x));
                  console.log(data.y, data.x)
                  this.LatLng={lat:data.y, lng:data.x}
                  // var markerPosition  = new kakao.maps.LatLng(data.y, data.x); 
                  // var marker = new kakao.maps.Marker({
                  //     position: markerPosition
                  // });
                  // marker.setMap(this.map);

              })
              // console.log(data.y, data.x)
              // await dbUpdate('userProfiles', this.authorProfile.id, {latLng: {lat:data.y, lng:data.x} })
              // this.map.setBounds(bounds);
              
          }
      });
    },
    event(){
      navigator.geolocation.getCurrentPosition(pos => {
      this.latNow = pos.coords.latitude
      this.lngNow = pos.coords.longitude
      this.showDialog1 = !this.showDialog1
      }, err => {
          alert("해당 브라우저의 위치 접근 허용이 필요합니다.")    
      })
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
      this.title = ''
      this.content = ''
      this.hashtag = ''
      this.where=''
      await bus.$emit('end:spinner')
      this.$store.commit('changeNavBtnDisabled')
      this.showDialog = false
      this.disabled = false
    },
    renewAuthorProfile(){
      console.log('accountsetting')
      this.getAuthorProfile(this.authorDocType)
    },
    fileUpdate(imgList) {
      this.setWriteModifyImg(imgList)
    },
  
    ...mapActions({
      fetchReviewToMe: 'fetchReviewToMe',
    }),
    ...mapMutations({
        setWriteModifyImg: 'setWriteModifyImg',
        setWriteModifyTitle: 'setWriteModifyTitle',
        setWriteModifyContent: 'setWriteModifyContent',
        setWriteModifyHashTag: 'setWriteModifyHashTag',
    }),
    getFollowsDocsArray(){
      this.$store.commit('changeNavBtnDisabled')
      follows.where("from", "==", this.userProfile.data().uid).where("to", "==", this.$route.params.id)
      .get().then(querySnapshot => {
          querySnapshot.forEach(          
              item => {
                this.followsDocsArray.push(item)
                
              })         
        }).then().catch()
      this.$store.commit('changeNavBtnDisabled')

    },
    clickFollow(){
      this.$store.commit('changeNavBtnDisabled')
        follows.add({
          from : this.userProfile.data().uid,
          to : this.$route.params.id,
          createdAt : new Date() 
          }
        ).then(this.getFollowsDocsArray()).catch()
      this.$store.commit('changeNavBtnDisabled')
    },
    clickUnFollow(){
      this.$store.commit('changeNavBtnDisabled')
      follows.doc(this.followsDocsArray[0].id).delete().then(this.followsDocsArray = []).catch(console.log(this.followsDocsArray.length))
      this.$store.commit('changeNavBtnDisabled')
    },
    initMap() {
        console.log(this.lat, this.lng)
        let container = document.getElementById('map');
        let options = {
            center: new kakao.maps.LatLng(this.lat, this.lng),
            level: 3
        };
        var markerPosition  = new kakao.maps.LatLng(this.lat, this.lng); 
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
  },
  computed: {
    meanRate(){
      let a = []
      this.reviewToMe.filter(item => {
          a.push(item.data().rating)
      })
      const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
      return Math.round(average(a)*10)/10
    },
    ...mapGetters({
      currentUser: 'getCurrentUser',
      userProfile: 'getUserProfile',
      navBtnDisabled: 'getNavBtnDisabled',
      // 리뷰 어레이
      reviewToMe: 'getReviewToMe', // myreviews.js

      titleRules: 'getTitleRules', // write.js
      contentRules: 'getContentRules', // write.js

      writeModifyImg: 'getWriteModifyImg',

      writeModifyTitle: 'getWriteModifyTitle',
      writeModifyContent: 'getWriteModifyContent',
      writeModifyHashTag: 'getWriteModifyHashTag',
    }),
    findRoad(){
      return "https://map.kakao.com/link/search/"+this.userProfile.data().address
    },
    address(){
      return this.authorProfile ? this.authorProfile.data().address ? this.authorProfile.data().address : '':''
    },
    writeResult() {
      let a = {
        // 글 쓰기 관련 변수
        title: this.writeModifyTitle,
        content: this.writeModifyContent,
        hashtag: this.writeModifyHashTag,
        // 자동으로 입력되어야 할 변수
        authorEmail: this.currentUser.email,
        authorUid: this.currentUser.uid,
        storeUid: this.authorProfile.data().uid,
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
  async created() {
    await bus.$emit('start:spinner')
    await this.getFollowsDocsArray()
    this.fetchReviewToMe(this.$route.params.id)
    
    // await this.setAuthorArts()
    // await bus.$emit('end:spinner')
    // this.fileName = this.authorProfile.data().fileName
    // this.uploadEnd = this.authorProfile.data().uploadEnd    
  },
  async mounted(){
    await this.getAuthorProfile(this.authorDocType)
    this.getCurrentLocation()
    if (this.authorProfile){
      if (this.authorProfile.data().isArtist){
        this.lat = this.authorProfile ? this.authorProfile.data().latLng ? this.authorProfile.data().latLng.lat : 37.554229748867 : 37.554229748867
        this.lng = this.authorProfile ? this.authorProfile.data().latLng ? this.authorProfile.data().latLng.lng : 126.97474860534089 : 126.97474860534089
        this.afterSetMapOptions = true

        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e9daeb105d5f14b828789e6a2a50b1f4&libraries=services';
            document.head.appendChild(script);
        }
      }
    }
    this.title = this.writeModifyTitle
    this.content = this.writeModifyContent
    this.hashtag = this.writeModifyHashTag
    await bus.$emit('end:spinner')
    //  
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

</style>