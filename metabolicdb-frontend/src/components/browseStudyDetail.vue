<template>
  <div>
    <v-sheet class="ma-4 transparent">
      <bread-crumb :breadcrumb-data="breadcrumbData" ></bread-crumb>
      <v-row>
        <v-col>

          <expand-panel title-name="Study">




            <v-row align="center">
              <v-col  >
                <div class="text-h3 font-weight-bold text-left">{{studyData.Cohort_id || ""}}</div>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>


<!--              &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
            <v-row class="text-left">
              <v-col cols="6">
                <v-row class="text-left">
                  <v-col cols="4"  class="text-left">

                    <span class="text-body-1 font-weight-bold " >Category:</span> <span> {{studyData.Type}} </span>

                  </v-col>
                  <v-col cols="4"  class="text-left">
                    <span class="text-body-1 font-weight-bold " >Trait:</span> <span> <a @click="$router.push('/browse_trait/'+studyData.Trait_Ontology_ID)"  style="text-decoration: none"  class="font-weight-bold" >{{studyData.Trait_Ontology}} </a> </span>
                  </v-col>
                  <v-col cols="4"  class="text-left">
                    <span class="text-body-1 font-weight-bold " >PubMed ID:</span> <span> {{studyData.pubmed_id}} <v-icon color="blue" small @click="goOuterLinkPubmed(studyData.pubmed_id)">mdi-share</v-icon></span>
                  </v-col>
                </v-row>
                <v-row class="text-left">
                  <v-col cols="4"  class="text-left">
                    <span class="text-body-1 font-weight-bold " >Tissue:</span> <span> {{studyData.Tissue}} </span>
                  </v-col>
                  <v-col cols="4"  class="text-left">
                    <span class="text-body-1 font-weight-bold " >Cancer Type:</span> <span>  <v-chip :color="$store.state.mainColor" small label outlined>{{studyData.Cancer_type}}</v-chip>  </span>
                  </v-col>
                  <v-col cols="4"  class="text-left">
                    <span class="text-body-1 font-weight-bold " >Platform:</span> <span> {{studyData.Platform}} </span>
                  </v-col>
                  <v-col cols="4"  class="text-left">
                    <span class="text-body-1 font-weight-bold " >Cancer subType:</span> <span> {{studyData.Cancer_subtype}} </span>
                  </v-col>
                  <v-col cols="12"  class="text-left" >
                    <span class="text-body-1 font-weight-bold text-left " >Condition:</span> <span> {{studyData.Condition}} </span>
                  </v-col>
                  <v-col cols="12"  class="text-left" >
                    <span class="text-body-1 font-weight-bold text-left " >Conclusion:</span> <span> {{studyData.Conclusion}} </span>
                  </v-col>
                </v-row>

              </v-col>
              <v-col cols="6" class="px-4">

                <v-sheet outlined rounded >
                  <v-simple-table>
                    <thead>
                    <tr class="text-body-1 font-weight-bold">
                      <th>Group</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Sex</th>
                      <th>Size</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Case</td>
                      <td>{{studyData.Case_name}}</td>
                      <td>{{studyData.Case_age_group}}</td>
                      <td><sex-chip :sex="studyData.Case_sex"></sex-chip></td>
                      <td>{{studyData.Case_size}}</td>
                    </tr>
                    <tr>
                      <td>Control</td>
                      <td>{{studyData.Control_name}}</td>
                      <td>{{studyData.Control_age_group}}</td>
                      <td><sex-chip :sex="studyData.Control_sex"></sex-chip></td>
                      <td>{{studyData.Control_size}}</td>
                    </tr>

                    </tbody>
                  </v-simple-table>
                </v-sheet>


              </v-col>
            </v-row>


          </expand-panel>

          <v-sheet class="pa-3" >
            <v-tabs  v-model="tabkey" :color="$store.state.mainColor" >
<!--              <v-tab  style="text-transform: none" class="font-weight-bold" >Study</v-tab>-->
              <v-tab style="text-transform: none"  >Related Metabolites</v-tab>
              <v-tab  style="text-transform: none" >Related Traits</v-tab>
              <v-tab style="text-transform: none"  >Related Publications</v-tab>
            </v-tabs>
          </v-sheet>

          <v-tabs-items v-model="tabkey" class="px-3 pb-6 pt-4">

            <v-tab-item>
              <page-sub-association  :tid="$route.params.studyid" idtype="studyid"  ></page-sub-association>
            </v-tab-item>
            <v-tab-item>
              <page-sub-trait  :tid="$route.params.studyid" idtype="studyid"  > </page-sub-trait>
            </v-tab-item>
            <v-tab-item>
              <page-sub-publication  :tid="$route.params.studyid" idtype="studyid"  > </page-sub-publication>
            </v-tab-item>
          </v-tabs-items>

        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import BreadCrumb from "./sub/breadCrumb";
import ExpandPanel from "./sub/expandPanel";
import Axios from "axios";
import SexChip from "./sub/sexChip";
import PageSubAssociation from "./detailPageSub/pageSubAssociation";
import PageSubPublication from "./detailPageSub/pageSubPublication";
import PageSubTrait from "./detailPageSub/pageSubTrait";
export default {
  name: "browseStudyDetail",
  components: {PageSubTrait, PageSubPublication, PageSubAssociation, SexChip, ExpandPanel, BreadCrumb},
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
          text: "Browse Study",
          disabled: false,
          href: baseURL+"/browse_study"
        },
        {
          text: this.$route.params.studyid,
          disabled: true,
        }
      ],
      studyData:{}
    }
  },
  created() {
    Axios.get(
      baseURL+"/api/get_study_by_studyid",{params:{sid:this.$route.params.studyid}}
    ).then(res=>{
      this.studyData = res.data[0]
    })

  },
  methods:{
    goOuterLinkPubmed(cid) {
      window.open('https://pubmed.ncbi.nlm.nih.gov/' + cid, '_blank')
    },
  }
}
</script>

<style scoped>

</style>
