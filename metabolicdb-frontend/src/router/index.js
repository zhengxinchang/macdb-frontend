import Vue from 'vue'
import Router from 'vue-router'
import home from "../components/home"
import browseAssociation from "../components/browseAssociation";
import browseAssociationDetail from "../components/browseAssociationDetail";
import browseTrait from "../components/browseTrait";
import browseTraitDetail from "../components/browseTraitDetail";
import contact from "../components/contact";
import browseStudy from "../components/browseStudy";
import browseStudyDetail from "../components/browseStudyDetail";
import browsePublication from "../components/browsePublication";
import browsePublicationDetail from "../components/browsePublicationDetail";
import search from "../components/search";
import store from "../store/store"
import statistics from "../components/statistics";
import downloads from "../components/downloads";
import apis from "../components/apis";
import tools from '../components/tools'
import knowledgeGraph from "../components/knowledgeGraph";

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let router = new Router({
  mode: 'history',
  base: "/macdb",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{
        title:"MACdb: A curated knowledgebase for metabolic associations in cancers"
      }
    },
    {
      path: '/home',
      name: 'home2',
      component: home,
      meta:{
        title:"MACdb: A curated knowledgebase for metabolic associations in cancers"
      }
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: downloads,
      meta:{
        title:"Downloads-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/apis',
      name: 'apis',
      component: apis,
      meta:{
        title:"API-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/tools',
      name: 'tools',
      component: tools,
      meta:{
        title:"Tools-MACdb-CNCB-NGDC"
      }
    },

    {
      path: '/browse_association',
      name: 'browse_association',
      component:browseAssociation,
      beforeEnter: (to, from,next) => {
        store.state.currtab=1;
        next();
      },
      meta:{
        title:"Browse-MACdb-CNCB-NGDC"
      }

    },
    {
      path: '/browse_association/:cid',
      name: 'browse_association_detail',
      component:browseAssociationDetail,
      beforeEnter: (to, from,next) => {
        store.state.currtab=1;
        next();
      },
      meta:{
        title:"Browse-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/browse_trait',
      name: 'browse_trait',
      component:browseTrait,
      beforeEnter: (to, from,next) => {
        store.state.currtab=1;
        next();
      },
      meta:{
        title:"Browse-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/browse_trait/:traitid',
      name: 'browse_trait_detail',
      component:browseTraitDetail,
      beforeEnter: (to, from,next) => {
        store.state.currtab=1;
        next();
      },
      meta:{
        title:"Browse-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/browse_study',
      name: 'browse_study',
      component:browseStudy,
      beforeEnter: (to, from,next) => {
        store.state.currtab=1;
        next();
      },
      meta:{
        title:"Browse-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/browse_study/:studyid',
      name: 'browse_study_detail',
      component:browseStudyDetail,
      beforeEnter: (to, from,next) => {
        store.state.currtab=1;
        next();
      },
      meta:{
        title:"Browse-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/knowledgegraph',
      name: 'knowledgegraph',
      component:knowledgeGraph,
      meta:{
        title:"Knowledge Graph-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component:statistics,
      meta:{
        title:"Statistics-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/browse_publication',
      name: 'browse_publication',
      component:browsePublication,
      beforeEnter: (to, from,next) => {
        store.state.currtab=1;
        next();
      },
      meta:{
        title:"Browse-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/search',
      name: 'search',
      component:search,
      meta:{
        title:"Search-MACdb-CNCB-NGDC"
      }
    },

    {
      path: '/browse_publication/:pmid',
      name: 'browse_publication_detial',
      component:browsePublicationDetail,
      beforeEnter: (to, from,next) => {
        store.state.currtab=1;
        next();
      },
      meta:{
        title:"Browse-MACdb-CNCB-NGDC"
      }
    },
    {
      path: '/help',
      name:'help',
      component:browsePublication,
      beforeEnter: (to, from) => {
        window.open("/macdb/docs2/","_blank")
        return false
      },
    },
  ]
})


router.beforeEach((to,form,next)=>{
  if(to.meta.title){
    document.title = to.meta.title;
  }
  next();
})


export default router
