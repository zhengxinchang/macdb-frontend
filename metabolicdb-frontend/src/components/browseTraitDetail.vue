<template>
<div>
  <v-sheet class="ma-4 transparent">
    <bread-crumb :breadcrumb-data="breadcrumbData" ></bread-crumb>
    <v-row>
      <v-col>
        <expand-panel title-name="Trait" >
          <v-row align="center">
            <v-col cols="5" >
              <div class="text-h3 font-weight-bold text-left">{{traitData.Trait_Ontology || ""}}</div>
            </v-col>

          </v-row>
          <v-row align="center" >
            <v-col cols="2"  class="text-left">
              <span class="text-body-1 font-weight-bold " >Trait Ontology ID:</span> <span> {{$store.state.TraitOntoPrefix}}{{$route.params.traitid}}  </span>
            </v-col>

            <v-col cols="2"  class="text-left">
              <span class="text-body-1 font-weight-bold " >Trait Type:</span> <span>
                    <v-chip :color="$commonfunc.getColorCodeByTraitType(traitData.Trait_type)"  class="text-break  ma-1" label small dark
                    > {{traitData.Trait_type}}</v-chip>
            </span>
            </v-col>

            <v-col cols="3"  class="text-left">
              <span class="text-body-1 font-weight-bold " >EFO Ontology:</span> <span>
                    <v-chip  :color="$store.state.mainColor"  class="text-break  ma-1" label small dark outlined :href="$commonfunc.getFullLinkEFO(traitData.EFO_id)" target="_blank"
                    > {{traitData.EFO_ontology}} (ID:{{traitData.EFO_id}})</v-chip>
            </span>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row class="pb-8">
            <v-col class="text-left" cols="2"  >
              <span class="text-body-1  font-weight-bold " > #Associations:</span>
              <span><v-chip small dark class="font-weight-bold" :color="$store.state.mainColor">{{traitData.NAssociation || ""}}</v-chip></span>
            </v-col>
            <v-col class="text-left" cols="2" >
              <span class="text-body-1 font-weight-bold " > #Studies:</span>
              <span><v-chip small dark class="font-weight-bold" :color="$store.state.mainColor">{{traitData.NStudy || ""}}</v-chip></span>

            </v-col>
            <v-col class="text-left" cols="2">
              <span class="text-body-1 font-weight-bold "> #Subjects:

              </span>
              <span><v-chip :color="$store.state.mainColor" class="font-weight-bold" dark
                            small>{{ traitData.NPeople || "" }}</v-chip>
                             <sup >
                 <help-msg>
                  <div class="textext-body-2">If the control group appears in N studies, it will be calculated N times.</div>
                    </help-msg></sup>
              </span>

            </v-col>
            <v-col class="text-left" cols="2">
              <span class="text-body-1 font-weight-bold " > #Publications:</span>
              <span><v-chip small dark class="font-weight-bold" :color="$store.state.mainColor">{{traitData.NPublication || ""}}</v-chip></span>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </expand-panel>

        <v-sheet class="pa-3" >
          <v-tabs  v-model="tabkey" :color="$store.state.mainColor" >
            <v-tab style="text-transform: none"  >Related Metabolites</v-tab>
            <v-tab  style="text-transform: none" >Related Studies</v-tab>
            <v-tab style="text-transform: none"  >Related Publications</v-tab>
          </v-tabs>
        </v-sheet>

        <v-tabs-items v-model="tabkey" class="px-3 pb-6 pt-4">

          <v-tab-item>
            <page-sub-association  :tid="$route.params.traitid" idtype="traitid" ></page-sub-association>
          </v-tab-item>
          <v-tab-item>
            <page-sub-study :tid="$route.params.traitid" idtype="traitid"  ></page-sub-study>
          </v-tab-item>
          <v-tab-item>
            <page-sub-publication :tid="$route.params.traitid" idtype="traitid" ></page-sub-publication>
          </v-tab-item>
        </v-tabs-items>


<!--        -->

<!--        <expand-panel title-name="Related Metabolites">-->
<!--          -->
<!--        </expand-panel>-->
<!--        <expand-panel title-name="Related Studies">-->
<!--         -->

<!--        </expand-panel>-->
<!--        <expand-panel title-name="Related Publications">-->
<!--          -->
<!--        </expand-panel>-->

      </v-col>
    </v-row>
  </v-sheet>
</div>
</template>

<script>
import Axios from 'axios'
import BreadCrumb from "./sub/breadCrumb";
import ExpandPanel from "./sub/expandPanel";
import PageSubAssociation from "./detailPageSub/pageSubAssociation";
import PageSubStudy from "./detailPageSub/pageSubStudy";
import HelpMsg from "./sub/helpMsg";
import PageSubPublication from "./detailPageSub/pageSubPublication";
export default {
name: "browseTraitDetail",
  components: {PageSubPublication, HelpMsg, PageSubStudy, PageSubAssociation, ExpandPanel, BreadCrumb},
  data(){
  return{
    tabkey:null,
    breadcrumbData:[
      {
        text: "Home",
        disabled: false,
        href: baseURL+"/home"
      },
      {
        text: "Browse Trait",
        disabled: false,
        href: baseURL+"/browse_trait"
      },
      {
        text: this.$store.state.TraitOntoPrefix +this.$route.params.traitid,
        disabled: true,
      }
    ],
    traitData:{}
  }
  },
  created() {
    Axios.get(
      baseURL+"/api/get_trait_by_traitid",{params:{traitid:this.$route.params.traitid}}
    ).then(res=>{
      this.traitData = res.data[0]
    })

  },


}
</script>

<style scoped>

</style>
