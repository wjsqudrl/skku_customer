<template>
    <div>
    <appbar>이용내역</appbar>


          <!-- 카드시작 -->
          <div v-if="favoritesDocsToArray.length === 0">
            <v-card text >
              <v-card-text>
                아직 이용내역이 없습니다.
              </v-card-text>
            </v-card>
          </div>
          <div v-else>

                <!-- <card-list v-if="gridSix" :arts="favoriteFilteredArray"></card-list> -->
                <card-list-small :arts="favoritesDocsToArray" type="favorite" ></card-list-small>
              
          </div>
          <!-- 카드 끝 -->

    </div>

</template>

<script>
import PullTo from 'vue-pull-to'
import appbar from '../components/appbar'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import cardList from './../components/cardList'
import cardListSmall from './../components/cardListSmall'
import bus from '../utils/bus.js';
import { Capacitor, Plugins } from '@capacitor/core';
const { Device } = Plugins;


export default {
  name:'favorite',
  components: {
    PullTo,
    appbar,
    cardList,
    cardListSmall,
  },
  data(){
    return {
      circleShow:false,
      isTouchSensitive:false,
      timeout:'',
      info:'',
      followEmail:'',
      followList:[],
      fab: false,
      favoriteFilteredArray:[],
    }
  },
  watch:{
    top(){
      if(this.$route.name === 'favorite'){
      if(this.top === 0){
        this.isTouchSensitive = true
      }
      else{
        this.isTouchSensitive = false
      }

      }
    }
  },
  computed: {
    gridBtnStyle(){
      return  this.info.operatingSystem === 'ios' ? 'top: 105px; right: 15px;' : 'top: 90px; right: 15px;'
    },

    ...mapGetters({
      top: 'getTop',
      prevTop: 'getPrevTop',
      gridSix: 'getGridSix',
      currentUser: 'getCurrentUser',
        
      userProfile: 'getUserProfile',
      
      // 좋아요 관련 변수
      favoritesDocsToArray: 'getFavoritesDocsToArray', //favorite.js  

      arts: 'getArts',
    }),
  },
  async created() {
    await bus.$emit('start:spinner')
    
    if(this.currentUser !== null){
        this.fetchFavoritesDocsToArray(this.currentUser.uid) // favorite.js
    }
  },
  async mounted(){
    this.info = await Device.getInfo()
    // let a = this.favoritesDocsToArray.map(item => item.data().artId)
    // this.favoriteFilteredArray = this.arts.filter(item => a.includes(item.id)).map(item => {
    //   return { ...item.data(), id:item.id }
    //   })
    if(this.currentUser){
      console.log('fetchasdfsdf')
      await this.fetchFavoritesDocsToArray(this.currentUser.uid)
    }
    await bus.$emit('end:spinner')
    // 
  },
  methods: {
      
      stateChange(state) {
        if (state === 'trigger') {
          this.circleShow = true
        } else if (state === 'pull') {
          this.circleShow = true
        } else if (state === 'loading') {
          this.circleShow = true
        } else if (state === 'loaded-done') {
          this.circleShow = false
        }
      },
    bottomLoad(loaded){
      this.circleShow = false
      this.isTouchSensitive = false
      loaded('done')
    },
    refresh(loaded) {
      
      this.circleShow = true
      this.forceUpdate()
      loaded('done')
       this.isTouchSensitive = false
    },
    async forceUpdate(){
    console.log('forceupdate')
    this.$store.commit('changeNavBtnDisabled')
    this.timeout = setTimeout(() => this.doForceUpdate(), 1000);
    this.$store.commit('changeNavBtnDisabled')

    },
    async doForceUpdate(){

        await bus.$emit('start:spinner')
        
        // if(this.$route.name === 'favorite'){
        //   await this.fetchArts()
        //   let a = this.favoritesDocsToArray.map(item => item.data().artId)
        //   this.favoriteFilteredArray = this.arts.filter(item => a.includes(item.id)).map(item => {
        //   return { ...item.data(), id:item.id }
        //   })
        //   if(this.currentUser){
        //     await this.fetchFavoritesDocsToArray(this.currentUser.uid)
        //   }
        // }
        // // await this.fetchFavoritesDocsToArray()
        // await this.$forceUpdate();

        this.circleShow = false
        await bus.$emit('end:spinner')
    },
    ...mapActions({
    // 좋아요 관련 로직

        fetchArts: 'fetchArts', // commons.js
        fetchFavoritesDocsToArray: 'fetchFavoritesDocsToArray', //favorite.js
    }),
    ...mapMutations({
      changeShowTopSheet: 'changeShowTopSheet',
      changeGridNum: 'changeGridNum',
    }),

    toTop () {
      this.$vuetify.goTo(0)
    },
    // retrieveFollowList(){
    //   console.log(this.followEmail)
    //   for (var i = 0; i < this.followEmail.lenth; i++){
        
    //     userProfiles.where("email", "==", this.followEmail[i]).get()
    //     .then(
    //       querySnapshot => {
    //         querySnapshot.forEach(
    //           item => {
    //             this.followList.downloadURL_user = item.data().downloadURL_user
    //             this.followList.displayName = item.data().displayName
    //             console.log(this.followList.downloadURL_user)             
    //           })
    //         }
    //     )
    //     .catch(
    //       err => {
    //         console.log(err)
    //       }
    //     )
    //   }
    //   // doc.data().followList.indexOf(this.userEmail)!==-1
      
    // }
    
    // 
  },
}
</script>

<style scoped>

</style>
