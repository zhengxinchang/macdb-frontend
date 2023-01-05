<template>
  <v-sheet class=" mb-16">

    <v-row>
      <v-col class="text-left" cols="12">


        <v-sheet class="text-left my-6 text-h5 text-justify">
          <div :color="$store.state.mainColor">
            Introduction
          </div>

        </v-sheet>
        <v-sheet class="text-justify my-6">


          This tool provides network visualization in MACdb database. Users can select the central node type (Cancer,
          Trait or Metabolite), node content, Max p-value, and/or evidence strength level (Publication or Study, and the
          minimum number of evidence) to display.

        </v-sheet>


        <!--        <v-btn v-show="!filterExpand"-->
        <!--               :color="$store.state.mainColor" class="my-auto" dark elevation="0" small-->
        <!--               style="text-transform: none"-->
        <!--               @click="filterExpand= true">Filter-->
        <!--          <v-icon small>mdi-chevron-double-right</v-icon>-->
        <!--        </v-btn>-->

      </v-col>
      <v-col v-show="filterExpand" cols="3">
        <v-sheet class="   pb-6">


          <!--          <v-row>-->
          <!--            <v-col class="text-left mb-4" cols="4">-->
          <!--              <v-btn :color="$store.state.mainColor"-->
          <!--                     dark elevation="0" small style="text-transform: none"-->
          <!--                     @click="filterExpand= false">Hide-->
          <!--                <v-icon small>mdi-chevron-double-left</v-icon>-->
          <!--              </v-btn>-->
          <!--            </v-col>-->
          <!--            <v-spacer></v-spacer>-->
          <!--          </v-row>-->

          <v-sheet class="py-6" color="grey lighten-4"
                   rounded>
            <v-row dense>
              <v-col class="px-6" cols="12">
                <div class="text-body-1 text-left">
                  Select Network
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="px-6" cols="12">


                <v-select
                  v-model="filterType"
                  :items="filterTypeList"
                  :loading="filterloading"
                  background-color="white"
                  dense
                  filled
                  hide-details

                  outlined
                >

                  <template #label>

                    Select Center Node Type <help-msg>
                    Currently, MACdb provides tree types of center node including Cancer, Trait, and Metabolite. Users can choose one of them and choose specific center node at the input box below.
                  </help-msg>

                  </template>


                </v-select>
              </v-col>

              <v-col class="px-6" cols="12">
                <v-autocomplete
                  v-model="filterValue"
                  :color="$store.state.mainColor"
                  :items="filterValueList"
                  :loading="filterloading"
                  background-color="white"
                  clearable
                  dense
                  filled
                  hide-details
                  item-text="text"

                  outlined
                >
                  <template #label>

                    Select Center Node <help-msg>
                    Available center nodes are based on center node type selected above.
                  </help-msg>

                  </template>


                </v-autocomplete>
              </v-col>


              <v-col class="px-6" cols="12">

                <v-text-field
                  v-model="pvalmax"
                  :loading="filterloading"
                  :rules="[rules.pval]"
                  background-color="white"
                  dense
                  hide-details

                  outlined
                >

                  <template #label>

                    Max <i>P</i> value <help-msg>
                   Max P value is used to filter associations based on the P value curated from original papers. this value can be set to empty to enroll all associations.
                  </help-msg>

                  </template>

                </v-text-field>
              </v-col>

              <v-col class="px-6" cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-select
                      v-model="countType"
                      :items="countTypeList"
                      :loading="filterloading"
                      background-color="white"
                      dense
                      filled
                      hide-details
                      outlined
                    >

                      <template #label>

                        Count Type <help-msg>
                        Count type is used to show how may studies/publications support the associations. MACdb provide study count and publication count currently.
                      </help-msg>

                      </template>

                    </v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="coutmin"
                      :loading="filterloading"
                      :rules="[rules.intNum]"
                      background-color="white"
                      dense
                      hide-details

                      outlined
                    >


                      <template #label>

                        Min count <help-msg>
                        This filter is used to filter sutdy/publication count.
                      </help-msg>

                      </template>

                    </v-text-field>
                  </v-col>
                </v-row>


              </v-col>
              <v-col class="px-6" cols="12">
                <v-row dense>
                  <v-spacer></v-spacer>
                  <v-col class="text-right mr-6" cols="10">
                    <v-btn
                      :color="$store.state.mainColor"
                      :loading="filterloading"
                      dark
                      elevation="0"
                      small
                      style="text-transform: none"
                      @click="loadData"
                    >Apply
                    </v-btn>
                    <v-btn
                      :color="$store.state.mainColor"
                      :loading="filterloading"
                      dark
                      elevation="0"
                      small
                      style="text-transform: none"
                      @click="reset"
                    >Reset
                    </v-btn>


                  </v-col>
                </v-row>
              </v-col>
              <v-col clas="px-6" cols="12">
                <v-row dense>
                  <v-col cols="12" >
                    <v-sheet height="20"  color="grey lighten-4">
                         <div v-if="showMsg" >{{msg}}</div>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet class="py-2" color="grey lighten-4 mt-4"
                   rounded>
            <v-row dense>
              <v-col class="px-6" cols="12">
                <div class="text-body-1 text-left">
                  Network Settings
                </div>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col class="px-6" cols="12">
                <v-switch
                  v-model="plotconfig.showLabel"
                  :color="$store.state.mainColor"
                  :disabled="filterloading"
                  label="Show Labels"
                ></v-switch>
              </v-col>
            </v-row>
          </v-sheet>


          <v-sheet>
            <v-row dense>
              <v-col cols="12" class=" text-left mt-4">
                The width of the line indicates the number of studies or publications shared between two entities. <br/><br/>
                Detailed manual of this tool can be found at "<span class="font-weight-bold" >3.3 Knowledge Graph</span>" in
                <a href="https://ngdc.cncb.ac.cn/macdb/docs2/#/" style="text-decoration: none" target="_blank">MACdb help page</a> .


              </v-col>
            </v-row>
          </v-sheet>

        </v-sheet>

      </v-col>
      <v-col :cols="filterExpand == true ? 9:12">
        <v-sheet class="pa-8" height="800" outlined rounded>

          <tools-network-visualization :graph-data="graphData" :plotconfig="plotconfig"></tools-network-visualization>
        </v-sheet>


      </v-col>
    </v-row>

  </v-sheet>
</template>

<script>
import ToolsNetworkVisualization from "./toolsNetworkVisualization";
import Axios from 'axios'
import FilterPanel from "./sub/filterPanel";
import _ from "lodash";
import HelpMsg from "./sub/helpMsg";

export default {
  name: "toolsNetwork",
  components: {HelpMsg, FilterPanel, ToolsNetworkVisualization},
  data() {
    return {
      graphData: null,
      filterExpand: true,
      filterloading: false,
      msg:null,
      showMsg:false,
      pvalmax: 0.01,
      plotconfig: {
        showLabel: true,
      },
      filterValue: "prostate cancer",
      filterType: "cancer",
      filterValueTotalDict: {},
      filterValueList: [
        {
          text: "Prostate Cancer",
          value: "prostate cancer",
        },

      ],
      coutmin: 3,
      filterTypeList: [
        {
          text: "Cancer",
          value: "cancer",
        }, {
          text: "Trait",
          value: "trait",
        }, {
          text: "Metabolite",
          value: "metabolite",
        },
      ],
      countTypeList: [
        {
          text: "Publication",
          value: "publication",
        }, {
          text: "Study",
          value: "study",
        },
      ],
      countType: "study",
      rules: {
        pval: function (val) {

          if (_.isNull(val) ) {
            return true
          } else if (_.isNaN(val)) {
            return true
          } else {
            if (!_.isNull(parseFloat(val)) && !_.isNaN(parseFloat(val)) && _.isNumber(parseFloat(val))) {
              // console.log(parseFloat(val))
              if (parseFloat(val) > 1 || parseFloat(val) < 0) {
                return "Please provide a number from 0 - 1"
              } else {
                return true
              }
            } else {
              return "Please provide a number"
            }
          }
        },
        intNum: function (val) {
          if (_.isNull(val)) {
            return true
          } else if (_.isNaN(val)) {
            return true
          } else {
            if (!_.isNull(parseInt(val)) && !_.isNaN(parseInt(val)) && _.isNumber(parseInt(val))) {
              // console.log(parseInt(val))
              if (parseInt(val) < 0) {
                return "Please provide a number larger than 1"
              } else {
                return true
              }
            } else {
              return "Please provide a number"
            }
          }
        },

      },
    }
  },
  mounted() {
    this.loadData()

    this.loadFilterItems();

  },

  watch: {
    filterType(newVal) {

      this.filterValueList = this.filterValueTotalDict[newVal]

      if (newVal != "cancer") {
        this.coutmin = 1
        if (newVal == "metabolite") {
          this.pvalmax = 1
        } else if (newVal == "trait") {
          this.pvalmax = 0.01
        }
      } else {
        this.coutmin = 3
        this.pvalmax = 0.01
      }

    }

  },
  methods: {
    loadFilterItems(){
      Axios.post(
        baseURL + "/api/build_tools_network_filter_items"
      ).then(res => {
        this.filterValueTotalDict = JSON.parse(res.data)
        this.filterValueList = this.filterValueTotalDict.cancer

      })
    },
    loadData() {
      this.filterloading = true;
      this.msg=null
      this.showMsg = false;
      Axios.post(
        baseURL + "/api/tool_network_get_network",
        {},
        {
          params: {
            countType: this.countType,
            filterType: this.filterType,
            filterValue: this.filterValue,
            pValCutoff: parseFloat(this.pvalmax) || null,
            minCount: this.coutmin,
          }
        }
      ).then(res => {
        this.graphData = JSON.parse(res.data)
        if(this.graphData && this.graphData.nodes && this.graphData.nodes.length  ==0){
          this.msg="Empty Network!"
          this.showMsg = true;
        }
        this.filterloading = false;
      })
    },
    reset() {
      this.msg=null
      this.showMsg = false;
      this.pvalmax = 0.01
      this.filterValue ="prostate cancer"
      this.filterType = "cancer"
      this.filterValueTotalDict = {}
      this.coutmin = 3
      this.filterValueList= [
        {
          text: "Prostate Cancer",
          value: "prostate cancer",
        },

      ]
      this.filterTypeList = [
        {
          text: "Cancer",
          value: "cancer",
        }, {
          text: "Trait",
          value: "trait",
        }, {
          text: "Metabolite",
          value: "metabolite",
        },
      ]
      this.countTypeList = [
        {
          text: "Publication",
          value: "publication",
        }, {
          text: "Study",
          value: "study",
        },
      ]
      this.countType = "study"
      this.loadFilterItems();
      this.loadData();
    },

  }
}
</script>

<style scoped>

</style>
