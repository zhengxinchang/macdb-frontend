import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    TraitOntoPrefix:"MTON",
    enrichtab:null,
    // mainColor:'#DA664D',
    // mainColor:'#740760',
    mainColor:'#091C2B',
    // mainColor:'#ce1c2c',
    stats:null,
    currtab: 0,
  },
  mutations: {
    assignStats(state,s){
      state.stats = s;
    },
    // setTabWith (state,tab) {
    //   state.currTab=tab
    // },
    // setTabWithWithRouter (state,tab,r) {
    //   state.currentTab=tab
    //   this.$router.push(r)
    // },
  },

  actions:{
    loadStats(context){

      Axios.post(
        baseURL+"/api/get_stats"
      ).then((response)=>{
        // console.log("successfully retrival stats");
        context.commit("assignStats",response.data)
      }).catch((err)=>{
        console.log(err);
      });
    }
  },
  getters:{

  }
})
