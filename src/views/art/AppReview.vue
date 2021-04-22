<template>
<div>
<appbar :arrow="true">리뷰 게시글</appbar>

  <v-row>
    <!-- 메인 정보 시작 -->
    <v-col cols="12"> 
      <review-main :authorProfile="authorProfile" :isAuthor="isAuthor" :reviewDoc="authorDoc"></review-main>
    </v-col> 
    <!-- 메인 정보 끝 -->

    <!-- 상세 정보 시작 -->
    <v-col cols="12">
      <v-card flat>
        <v-card-title>
            내용
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            {{ authorDoc ? authorDoc.data().content : null }}
        </v-card-text>
      </v-card>
    </v-col>
    <!-- 상세 정보 끝 -->


  </v-row>
  </div>
</template>

<script>
import appbar from '../../components/appbar'
import reviewMain from '../../components/reviewMain'
import artContent from '../../components/artContent'
import comment from '../../components/comment'
import { mapGetters, mapMutations, mapActions } from 'vuex'

import firebase from 'firebase/app'
import { reviews, userProfiles, storaged, dbRead } from '../../firebase.js';
import IsAuthor from '../../mixins/IsAuthor';
import bus from '../../utils/bus.js';

export default {
  mixins : [IsAuthor],
  components: {
    appbar,
    reviewMain,
    artContent,
    comment,
  },
  data(){
    return {
      type: 'review',
      forUser: false,
      authorDocType: 'review',
      // rootArts: '',
      
    }
  },
  computed: {
    ...mapGetters({
      // init
      currentUser: 'getCurrentUser', // commons.js
      userProfile: 'getUserProfile', // commons.js

    }),
  },
  watch:{
 
  },
  async created(){
    await bus.$emit('start:spinner')
  },
  async mounted() {
    await bus.$emit('end:spinner')
     
  },
  methods: {
    ...mapMutations({
      setWriteIdFromArt: 'setWriteIdFromArt', // reviewwrite.js
    }),
    ...mapActions({
      // 업데이트
      updateLatestTattoos: 'updateLatestTattoos',
      
      fetchArtAuthorEmail: 'fetchArtAuthorEmail',
      fetchArtAuthorUid: 'fetchArtAuthorUid',
      }),
  },
}
</script>

<style scoped>

</style>
