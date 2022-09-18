// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from '@/store/store'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import '@mdi/font/css/materialdesignicons.css'
import commonfunc from "./plugins/commonfunc";
import i18n from './i18n'
// import Echarts from 'echarts'
// import * as echarts from 'echarts';
import  echarts from './plugins/echartsTimeLine'

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);


Vue.config.productionTip = false

Vue.prototype.$commonfunc = commonfunc
Vue.prototype.$echarts = echarts

if(process.env.NODE_ENV == "production"){
  window.baseURL="/macdb"
}else{
  window.baseURL="/macdb"
}

VXETable.setup({
  icon: {
    // table
    TABLE_SORT_ASC: 'vxe-icon--caret-top',
    TABLE_SORT_DESC: 'vxe-icon--caret-bottom',
    TABLE_FILTER_NONE: 'vxe-icon--funnel',
    TABLE_FILTER_MATCH: 'vxe-icon--funnel',
    TABLE_EDIT: 'vxe-icon--edit-outline',
    TABLE_TREE_LOADED: 'vxe-icon--refresh roll',
    TABLE_TREE_OPEN: 'vxe-icon--caret-right rotate90',
    TABLE_TREE_CLOSE: 'vxe-icon--caret-right',
    TABLE_EXPAND_LOADED: 'vxe-icon--refresh roll',
    TABLE_EXPAND_OPEN: 'vxe-icon--minus  ',
    TABLE_EXPAND_CLOSE: 'vxe-icon--plus rotate90',
},
  i18n: (key, args) => i18n.t(key, args)
})


router.afterEach((to,from, next) => {
  window.scrollTo(0,0)
})



Vue.directive('title',{
  inserted: function(el){
    document.title = el.getAttribute('title')
    // console.log(el)
  }
})


Vue.use(VXETable)
/* eslint-disable no-new */
export default  new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})


