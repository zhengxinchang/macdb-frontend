<template>
  <div>
    <v-sheet class="ma-4 transparent">
      <bread-crumb :breadcrumb-data="breadcrumbData"></bread-crumb>

      <v-row>
        <v-col cols="12">

          <v-sheet  class="pt-6  px-3 pb-6">
            <v-row class="pt-3">
              <v-spacer></v-spacer>
              <v-col cols="10">

                <v-row>


                  <v-col cols="6"  md="12" sm="12" lg="6" xl="6" >  <!-- Number of Publication -->
                    <v-card outlined >
                      <v-card-title class="font-weight-bold" >Number of Publications</v-card-title>
                      <v-sheet height="550">
                        <home-time-line></home-time-line>
                      </v-sheet>
                    </v-card>
                  </v-col>

                  <v-col cols="6" md="12" sm="12" lg="6" xl="6">  <!-- Cancer Type -->
                    <v-card outlined >
                      <v-card-title class="font-weight-bold" >Cancer Category &nbsp; <span><help-msg> The length of each section is count of publication in the cancer type</help-msg></span></v-card-title>
                      <v-sheet height="550">
                        <cancer-type></cancer-type>
                      </v-sheet>
                    </v-card>
                  </v-col>

                  <v-col cols="6" md="12" sm="12" lg="6" xl="6">  <!-- Cancer Type -->
                    <v-card outlined >
                      <v-card-title class="font-weight-bold" >Tissue &nbsp; <span><help-msg> The values in heatmap is count of study (count >= 4 are shown)</help-msg></span>  </v-card-title>
                      <v-sheet height="550">
                        <cancer-tissue></cancer-tissue>
                      </v-sheet>
                    </v-card>
                  </v-col>



                  <v-col cols="6" md="12" sm="12" lg="6" xl="6">  <!-- Cancer Type -->
                    <v-card outlined >
                      <v-card-title class="font-weight-bold" >Top 20 Traits</v-card-title>
                      <v-sheet height="550">
                        <top10-trait></top10-trait>
                      </v-sheet>
                    </v-card>
                  </v-col>
                  <v-col cols="12">  <!-- Cancer Type -->
                    <v-card outlined >
                      <v-card-title class="font-weight-bold" >Top 50 Metabolites </v-card-title>
                      <v-sheet height="550">
                       <top-metabolites></top-metabolites>
                      </v-sheet>
                    </v-card>
                  </v-col>

                  <v-col cols="12">  <!-- Cancer Type -->
                    <v-card outlined >
                      <v-card-title class="font-weight-bold" >Top 5 Metabolites in Cancers   </v-card-title>
                      <v-sheet min-height="550">
                        <cancer-top-metabolite></cancer-top-metabolite>
                      </v-sheet>
                    </v-card>
                  </v-col>

                </v-row>

              </v-col>
              <v-spacer></v-spacer>

            </v-row>
          </v-sheet>
        </v-col>
      </v-row>

    </v-sheet>


  </div>
</template>

<script>

import BreadCrumb from "./sub/breadCrumb";
import homeTimeLine from "./stats/publicationTimeLine";
import Axios from "axios";
import CancerType from "./stats/cancerType";
import Top10Trait from "./stats/top10Trait";
import CancerTopMetabolite from "./stats/cancerTopMetabolite";
import CancerTissue from "./stats/cancerTissue";
import HelpMsg from "./sub/helpMsg";
import TopMetabolites from "./stats/topMetabolites";
export default {
  name: "statistics",
  components: {
    TopMetabolites,
    HelpMsg, CancerTissue, CancerTopMetabolite, Top10Trait, CancerType, BreadCrumb,homeTimeLine},
  data() {
    return {
      headStyle:["font-weight-bold","text-body-1","mt-3"],
      breadcrumbData: [
        {
          text: "Home",
          disabled: false,
          href: baseURL + "/home"
        },
        {
          text: "Statistcs",
          disabled: true,
        },
      ],
      dat:{
        timeLine:{
          data:null,
          id:null,
          option:null,
        }
      }
    }
  },

  mounted() {

  },
  methods:{



  }
}
</script>

<style scoped>

</style>
