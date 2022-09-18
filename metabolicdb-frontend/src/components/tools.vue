<template>
  <div>
    <v-sheet class="ma-4 transparent" rounded>

      <bread-crumb :breadcrumb-data="breadcrumbData">

      </bread-crumb>
      <v-row class="pt-3">


        <v-col>
          <v-sheet min-height="600" class="mb-2" rounded>

            <v-row  class="pb-4">
              <v-spacer></v-spacer>
                <v-col cols="10" >
                  <v-tabs  v-model="tooltab"  :color="$store.state.mainColor"

                  >

                    <v-tab style="text-transform: none" >
                      <v-icon>mdi-key-variant</v-icon> &nbsp;Name2cid
                    </v-tab>

                    <v-tab style="text-transform: none" >
                      <v-icon>mdi-chart-timeline</v-icon> &nbsp; Enrichment
                    </v-tab>

                  </v-tabs>
                  <v-tabs-items
                  v-model = "tooltab"
                  >

                    <v-tab-item>

                      <tools-name2-i-d></tools-name2-i-d>
                    </v-tab-item>


                    <v-tab-item>
                      <tools-enrichment></tools-enrichment>

                    </v-tab-item>

                  </v-tabs-items>
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
import Axios from 'axios'
import ToolsName2ID from "./toolsName2ID";
import ToolsNetwork from "./toolsNetwork";
import ToolsEnrichment from "./toolsEnrichment";
export default {
  name: "tools",
  components: {ToolsEnrichment, ToolsNetwork, ToolsName2ID, BreadCrumb},
  data() {
    return {
      breadcrumbData: [
        {
          text: "Home",
          disabled: false,
          href: baseURL + "/home"
        },
        {
          text: "Tools",
          disabled: true,
        },
      ],
      tooltab:0,
    }
  },
  computed:{

  },


  beforeRouteEnter(to,from,next){

    next( vm=>{
       vm.tooltab = to.query.subtoolindex;
    })

  }

}
</script>

<style scoped>

</style>
