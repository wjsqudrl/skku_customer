<template>
    <v-row class="black" v-if="!checkPage">
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
    </v-row>
    <v-row class="black" v-else>
        <v-col style="margin:-10px -5px -10px -5px;" v-for="(item, i) in arts" :key="item.id" cols="12">
            <v-card style="padding:0px 0px 0px 0px;margin-bottom:0px;" class="black" tile elevation="12">
                <v-row style="margin:0px 0px 0px 0px;" align="center">

                    <v-col cols="5" style="padding:13px 0px 0px 0px;">
                        <!-- {{item.data()}} -->
                        <div v-if="item.data().img[0].url">
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
                            {{ item.data().title }}
                        </v-card-title>
                        <v-card-text style="padding:0px;font-size:11px;color:rgba(255, 255, 255, 0.7);">
                            {{ dateTimeToFormatted(item.data().createdAt.toDate()) }}
                        </v-card-text>
                        <v-card-text style="padding:0px;">
                            <v-btn style="background-color:black" outlined @click="clickBtn(item.id)">
                                <v-col cols="12" style="color:#3884FF;padding:0px 0px 0px 0px; overflow:hidden; font-size:12px; text-overflow:ellipsis; white-space:nowrap;">
                                    받은 견적서 보기  <span v-show="!item.data().check" style="color:red;">*</span>
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
                        위치설정
                        <v-spacer></v-spacer>
                        <v-btn class="mt-6" text @click="show = !show">
                            닫기
                        </v-btn>
                    </v-card-title>

                    <v-divider style="border-color:#707070; color:#707070;"></v-divider>

                    <v-card-text>
                    <v-row>
                        <v-col style="background-color:#1a1c1f;margin:0;padding:0" cols="12">
                          
                        </v-col>
                    </v-row>
                    </v-card-text>

                    <v-divider style="border-color:#707070; color:#707070;"></v-divider>
                    
                </v-card>
            </v-bottom-sheet>
    </v-row>
    
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import favoriteBtn from './favoriteBtn'
import { dbRead, dbQuery,dbUpdate} from '../firebase'
import numLikes from './numLikes'
import cardListSmallImg from './cardListSmallImg'
import rating from './rating'
export default {
    name:'cardListSmall',
    computed:{
        ...mapGetters({
            currentUser: 'getCurrentUser',
        }),
        checkPage(){
            return this.type==="favorite"
        },
        // dt() {
        //     return this.dateTimeToFormatted(a.toDate())
        // },
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
            loadingImg: true,
            show:false,
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
    clickBtn(id){
        var input2 = {check:true}
        dbUpdate('ask', id, input2)
        this.show=!this.show
        console.log(this.show)

    }
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