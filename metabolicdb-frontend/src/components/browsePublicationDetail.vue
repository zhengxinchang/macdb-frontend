<template>
  <div>
    <v-sheet class="ma-4 transparent">
      <bread-crumb :breadcrumb-data="breadcrumbData" ></bread-crumb>
      <v-row>
        <v-col>
          <expand-panel title-name="Publication">
            <v-row align="center">
              <v-col cols="12"  class="ml-6">
                <div class="text-h5 font-weight-bold text-left">{{Data.Title || ""}}</div>
              </v-col>

              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-col cols="2"  class="text-left">
                <span class="text-body-1 font-weight-bold " >PubMed ID:</span> <span> {{Data.PMID}}  </span> <v-icon color="blue" small @click="$commonfunc.goOuterLinkPubmed(Data.PMID)">mdi-share</v-icon>
              </v-col>
              <v-col cols="2"  class="text-left">
                <span class="text-body-1 font-weight-bold " >Journal:</span> <span> {{Data.Journal_Title}}  </span>
              </v-col>
              <v-col cols="1"  class="text-left">
                <span class="text-body-1 font-weight-bold " >Volume:</span> <span> {{Data.Volume}}  </span>
              </v-col>
              <v-col cols="1"  class="text-left">
                <span class="text-body-1 font-weight-bold " >Issue:</span> <span> {{Data.Issue}}  </span>
              </v-col>
              <v-col cols="1"  class="text-left">
                <span class="text-body-1 font-weight-bold " >Pages:</span> <span> {{Data.Pages}}  </span>
              </v-col>
              <v-col cols="2"  class="text-left">
                <span class="text-body-1 font-weight-bold " >Date:</span> <span> {{Data.Date_of_Publication}}  </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" >
                <v-sheet  class="text-left" ><span class="text-body-1 font-weight-bold " >Authors:</span></v-sheet>
                <v-sheet class="text-body-2 text-justify" >{{ Data.Authors_Full_Name && Data.Authors_Full_Name.split("||").join("; ") || ""}}</v-sheet>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" >
                <v-sheet  class="text-left" ><span class="text-body-1 font-weight-bold " >Abstract:</span></v-sheet>
                <v-sheet class="text-body-2 text-justify" >{{Data.Abstract}}</v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" >
                <v-sheet  class="text-left" ><span class="text-body-1 font-weight-bold " >Conclusion(s):</span></v-sheet>
                <v-sheet class="text-body-2 text-justify" >
                  <v-list>
                    <v-list-item v-for="x in Data.conclusion" dense :key="x" v-if="x!=null && ( x.trim() != 'nan')">
                      <v-sheet >
                        <v-list-item-icon><v-icon>mdi-menu-right</v-icon></v-list-item-icon>

                        {{$commonfunc.capitalize (x.trim())}}
                      </v-sheet>

                    </v-list-item>
                  </v-list>
                  <!--                  {{Data.conclusion}}-->
                </v-sheet>
              </v-col>
            </v-row>
          </expand-panel>

          <v-sheet class="pa-3" >
            <v-tabs  v-model="tabkey" :color="$store.state.mainColor" >
<!--              <v-tab  style="text-transform: none" class="font-weight-bold" >Publication</v-tab>-->
              <v-tab style="text-transform: none" >Related Metabolites</v-tab>
              <v-tab  style="text-transform: none" >Related Traits</v-tab>
              <v-tab style="text-transform: none"  >Related Studies</v-tab>
            </v-tabs>
          </v-sheet>

          <v-tabs-items v-model="tabkey" class="px-3 pb-6 pt-4">
<!--            <v-tab-item>-->

<!--            </v-tab-item>-->

            <v-tab-item>
              <page-sub-association :tid="$route.params.pmid" idtype="pmid" ></page-sub-association>
            </v-tab-item>

            <v-tab-item>
              <page-sub-trait :tid="$route.params.pmid" idtype="pmid"  ></page-sub-trait>
            </v-tab-item>

            <v-tab-item>
              <page-sub-study :tid="$route.params.pmid" idtype="pmid"  ></page-sub-study>
            </v-tab-item>
          </v-tabs-items>







<!--          <expand-panel title-name="Related Metabolites" >-->
<!--            -->
<!--          </expand-panel>-->

<!--          <expand-panel title-name="Related Traits" >-->
<!--            -->
<!--          </expand-panel>-->

<!--          <expand-panel title-name="Related Studies" >-->
<!--           -->
<!--          </expand-panel>-->

        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import BreadCrumb from "./sub/breadCrumb";
import ExpandPanel from "./sub/expandPanel";
import PageSubPublication from "./detailPageSub/pageSubPublication";
import PageSubAssociation from "./detailPageSub/pageSubAssociation";
import SexChip from "./sub/sexChip";
import Axios from "axios";
import PageSubStudy from "./detailPageSub/pageSubStudy";
import PageSubTrait from "./detailPageSub/pageSubTrait";
export default {
  name: "browsePublicationDetail",
  components: {PageSubTrait, PageSubStudy, PageSubAssociation, ExpandPanel, BreadCrumb},
  // components: {PageSubPublication, PageSubAssociation, SexChip, ExpandPanel, BreadCrumb},
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
          text: "Browse Publication",
          disabled: false,
          href: baseURL+"/browse_publication"
        },
        {
          text: this.$route.params.pmid,
          disabled: true,
        }
      ],
      Data:{}
    }
  },
  created() {
    Axios.get(
      baseURL+"/api/get_publication_by_pmid",{params:{pmid:this.$route.params.pmid}}
    ).then(res=>{
      this.Data = res.data[0]
    })

  },
  methods:{
    // goOuterLinkPubmed(cid) {
    //   window.open('https://pubmed.ncbi.nlm.nih.gov/' + cid, '_blank')
    // },
  }
}
</script>

<style scoped>

</style>
