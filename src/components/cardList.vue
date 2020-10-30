<template>
    <v-row class="black">
        <v-col @click.stop="$router.push('/artist/' + item.uid)"  style="padding:0px 1px 0px 1px;" class="card" v-for="(item, i) in arts" :key="item.writeId" cols="6">
            <v-card tile class="black" style="line-height: 1rem;">
                <v-spacer></v-spacer>
                <card-list-img :item="item" :size="size"></card-list-img>
                <v-card-title style="padding:7px 3px 0px 3px; overflow:hidden; font-size:14px; text-overflow:ellipsis; white-space:nowrap; font-weight:600;">
                    {{ item.displayName }}
                </v-card-title>
                <v-card-text style="padding:0px;">
                    <v-col cols="12" style="padding:3px 3px 3px 3px; overflow:hidden; font-size:12px; text-overflow:ellipsis; white-space:nowrap;">
                        {{item.address}}
                    </v-col>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import favoriteBtn from './favoriteBtn'
import { dbRead, dbQuery} from '../firebase'
import numLikes from './numLikes'
import cardListImg from './cardListImg'
import rating from './rating'
export default {
    name:'cardList',
    computed:{
        ...mapGetters({
            currentUser: 'getCurrentUser',
        }),
    },
    components: {
        favoriteBtn,
        numLikes,
        cardListImg,
        rating
        
    },
    data(){
        return {
            items: [],
        }
    },
    props: ['arts','size'],
    created(){
        console.log(this.arts)
        if(this.currentUser === null){
            console.log('if')
            
        }else{
        }
        
    },
    methods:{
    ...mapMutations({
      changeGridNum: 'changeGridNum',
    }),
    }
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
/* 이미지 둥글게 */
.rounded-img{
    border-radius: 12px 12px 12px 12px;
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


</style>