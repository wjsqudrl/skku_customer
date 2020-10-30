<template>
    <div v-if="item.userBackgroundUrl">
        <v-img class="rounded-img grey darken-4" @click.stop="$router.push('/artist/' + item.uid)" aspect-ratio="0.995" :src="item.thumbBackground ? item.thumbBackground : item.userBackgroundUrl"> 
        <slot></slot>
        </v-img>
    </div>
    <div v-else>
        <!-- <v-img class="rounded-img grey darken-4" @click.stop="$router.push('/artist/' + item.uid)" aspect-ratio="0.995" :src="item.thumbBackground ? item.thumbBackground : item.userBackgroundUrl">  -->
        <v-img class="rounded-img grey darken-4" @click.stop="$router.push('/artist/' + item.uid)" aspect-ratio="0.995" src="../assets/back.jpg"> 
        <slot></slot>
        </v-img>
        <!-- </v-img> -->
    </div>
</template>

<script>
export default {
    name:'cardListImg',
    props:['item','size'],
    data(){
        return{
        }
    },
    mounted(){
        console.log(this.size)
    }    

}
</script>

<style scoped>
/* 이미지 둥글게 */
.rounded-img{
    border-radius: 12px 12px 12px 12px;
}
</style>