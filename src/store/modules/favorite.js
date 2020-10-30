import { favorites, ask, dbUpdate } from "../../firebase.js";


const state = {
    favoritesDocsToArray: [],
}

const getters = {
    getFavoritesDocsToArray(state) {
        return state.favoritesDocsToArray
    }

}

const mutations = {
    setFavoritesDocsToArray(state, item) {
        state.favoritesDocsToArray = item
    }

}

const actions = {
    
    fetchFavoritesDocsToArray(context, userUid){
        context.commit('changeNavBtnDisabled')
        ask.where('authorUid', '==', userUid).onSnapshot(function(querySnapshot) {
            let item = [];
            querySnapshot.forEach(function(doc) {
                item.push(doc);
                // dbUpdate("ask", doc.id, { check: false });
            });
            console.log("New item: ", item);
            context.commit('setFavoritesDocsToArray', item)
        });
        context.commit('changeNavBtnDisabled')
        // .get()
        // .then(querySnapshot => {
        //     let item = []
        //     querySnapshot.forEach(
        //         doc => {
        //             item.push(doc)
        //     })
        //     context.commit('setFavoritesDocsToArray', item)
        // }).catch()  
        // context.commit('changeNavBtnDisabled')
    },

    
}

export default {
    state,
    getters,
    mutations,
    actions,
  };