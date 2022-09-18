<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-sheet class="mb-2" min-height="600" rounded>

          <v-row class="py-4">

            <v-col cols="12">
              <v-sheet class="text-left my-6 text-h5 text-justify">
                <div :color="$store.state.mainColor">
                  Introduction
                </div>

              </v-sheet>
              <v-sheet class="text-justify my-6">


                The tool below can be used to Enrich traits in MACdb.
                This tool works based on hypergeometric test, P-value correction method is bonferroni.
                If you upload a large number of metabolites, or multiple users using the tool at the same time, you may
                need to wait a short while. You can view the annotation progress at any time through the Task ID.<br/>
                Please note the bubble chart shows only the top 20 terms at most.
<!--                https://www.statsmodels.org/dev/generated/statsmodels.stats.multitest.multipletests.html-->
              </v-sheet>


            </v-col>
            <!--            <v-col cols="12"   >-->
            <!--              <v-sheet height="50" class="text-start">-->
            <!--                <v-btn v-show="!is_expand"  :color="$store.state.mainColor" class="px-1 white&#45;&#45;text" @click="is_expand = true"-->
            <!--                       elevation="0" style="text-transform: none">-->
            <!--                  <v-icon>mdi-chevron-double-right</v-icon>-->
            <!--                  Show-->
            <!--                </v-btn>-->
            <!--              </v-sheet>-->
            <!--            </v-col>-->
            <v-col cols="12">
              <v-sheet class="pa-4" min-height="500" outlined rounded>


                <v-row>

                  <v-col cols="3">
                    <v-sheet class="py-4 px-2" rounded>


                      <v-row>
                        <v-col cols="12">
                          <v-row>
                            <!--                            <v-spacer></v-spacer>-->
                            <v-col class="text-center">
                              <div class="text-h5 font-weight-bold text-center">MACdb Enrichment</div>
                            </v-col>
                            <!--                            <v-spacer></v-spacer>-->

                          </v-row>
                        </v-col>
                        <v-col>
                          <v-divider></v-divider>
                        </v-col>
                        <v-col cols="12">
                          <div class="text-body-1 font-weight-bold text-start">Submit Task</div>
                        </v-col>
                        <v-col cols="12">

                          <v-sheet class="text-left  " height="40">
                            <v-row>
                              <v-col cols="12">

                               <a class="my-auto" style="text-decoration: none ;" @click="demo('name')">#Example1 <help-msg>
                                 Metabolite names from Liu et.al. (PMID:<a href="https://pubmed.ncbi.nlm.nih.gov/31216740/" style="text-decoration: none" target="_blank">31216740</a>)
                               </help-msg></a> &nbsp; <a class="my-auto" style="text-decoration: none ;" @click="demo('cid')">#Example2
                                <help-msg>PubChem IDs from Liu et.al. (PMID:<a href="https://pubmed.ncbi.nlm.nih.gov/31216740/" style="text-decoration: none" target="_blank">31216740</a>), We use the "Name2cid" in MACdb to convert the metabolite names to PubchemCID</help-msg> </a>

                              </v-col>
                            </v-row>
                          </v-sheet>
                          <v-textarea v-model="input_metabolites_list"
                                      class="overflow-y-auto pt-2 pb-0"
                                      clear-icon="mdi-close-circle"
                                      clearable
                                      filled hide-details label="Metabolite Names / PubChem IDs " outlined
                                      row-height="10"
                                      rows="10">

                          </v-textarea>
                          <v-row align="center" class="my-1 ">


                            <v-col class="text-start" cols="8">

                              <v-select
                                v-model="isMapID"
                                :items="isMapIDList"
                                dense
                                hide-details
                                label="Input Type"
                                outlined
                              >

                              </v-select>
                            </v-col>


                            <v-col class="text-end" cols="4">


                              <v-btn :color="$store.state.mainColor" :disabled="is.isCheckingStatus" :loading="is.submiting"
                                     class="px-1 white--text"
                                     elevation="0"
                                     style="text-transform: none;"
                                     @click="submit"
                              >
                                <v-icon>mdi-rocket-outline</v-icon>
                                Run
                              </v-btn>

                            </v-col>

                          </v-row>
                        </v-col>
                        <v-col cols="12">

                          <v-divider></v-divider>
                        </v-col>

                        <v-col cols="12">
                          <div class="text-body-1 font-weight-bold text-start">Check Task Status</div>
                        </v-col>

                        <v-col cols="12">

                          <v-row align="center">
                            <v-col cols="12">
                              <v-text-field v-model="taskid" clearable dense hide-details outlined placeholder="Task id"
                                            solo></v-text-field>
                            </v-col>
                            <v-col class="text-end" cols="12">
                              <v-btn :color="$store.state.mainColor" :disabled="taskid == null || (taskid && taskid.trim() =='') "
                                     :loading="is.isCheckingStatus" class="px-2 white--text "
                                     style="text-transform: none"

                                     @click="checkTaskInterval"
                              >
                                <v-icon dark>mdi-lightbulb</v-icon>&nbsp; Check
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-divider></v-divider>

                        </v-col>
                        <v-col cols="12">
                          <div class="text-body-1 font-weight-bold text-start">Messages</div>
                        </v-col>
                        <v-col cols="12">

                          <v-sheet min-height="60">
                            <v-icon v-if="is.isCheckingStatus">mdi-timer-sand mdi-spin</v-icon>
                            {{ msg }}
                            <v-icon v-if="is.isShowCopy" @click="copyTaskID">mdi-content-copy</v-icon>
                          </v-sheet>
                        </v-col>
                        <v-col cols="12">
                          <v-divider></v-divider>
                        </v-col>
                        <v-col class="text-end" cols="12">
                          <v-btn :color="$store.state.mainColor" class="px-1 white--text"
                                 elevation="0"
                                 style="text-transform: none" @click="resetAll">
                            <v-icon>mdi-refresh</v-icon>
                            Reset All
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="9">
                    <v-sheet class="mx-4">
                      <v-tabs v-model="$store.state.enrichtab" :color="$store.state.mainColor" centered>
                        <v-tab style="text-transform: none">
                          <v-icon v-show="singleEnrichment.enrich_trait.isok == true" color="primary">
                            mdi-check-circle-outline
                          </v-icon>
                          <v-icon
                            v-show="singleEnrichment.enrich_trait.isok != null && singleEnrichment.enrich_trait.isok == false">
                            mdi-loading mdi-spin
                          </v-icon>
                          Traits
                        </v-tab>


                        <v-tab style="text-transform: none">
                          <v-icon v-show="singleEnrichment.enrich_cancer.isok == true" color="primary">
                            mdi-check-circle-outline
                          </v-icon>
                          <v-icon
                            v-show="singleEnrichment.enrich_cancer.isok != null && singleEnrichment.enrich_cancer.isok == false">
                            mdi-loading mdi-spin
                          </v-icon>
                          Cancer Types
                        </v-tab>


                      </v-tabs>
                      <v-tabs-items v-model="$store.state.enrichtab">
                        <v-tab-item eager>
                          <tools-enrichment-sub-trait :isok="singleEnrichment.enrich_trait.isok "
                                                      :taskid="taskid"></tools-enrichment-sub-trait>
                        </v-tab-item>
                        <v-tab-item eager>

                          <tools-enrichment-sub-cancer :isok="singleEnrichment.enrich_cancer.isok "
                                                      :taskid="taskid"></tools-enrichment-sub-cancer>
                        </v-tab-item>
                      </v-tabs-items>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Axios from 'axios'
import ToolsEnrichmentSubTrait from "./toolsEnrichmentSubTrait";
import ToolsEnrichmentSubCancer from "./toolsEnrichmentSubCancer";
import HelpMsg from "./sub/helpMsg";

export default {
  name: "toolsEnrichment",
  components: {HelpMsg, ToolsEnrichmentSubCancer, ToolsEnrichmentSubTrait},
  data() {
    return {
      is_expand: true,
      // enrichtab: null,
      input_metabolites_list: "",
      loading: false,
      taskid: null,
      // example: "Isoleucine\n" +
      //   "Glutamine\n" +
      //   "Glutamate\n" +
      //   "Creatine\n" +
      //   "myoinositol\n" +
      //   "Alanine\n" +
      //   "PC ae C40:6\n" +
      //   "lysoPC a C26:0\n" +
      //   "PC ae C40:2\n",
      example: "6057\n" +
          "998\n" +
          "997\n" +
          "6140\n" +
          "439322\n" +
          "5862\n" +
          "6613\n" +
          "1174\n" +
          "6305\n" +
          "5202\n" +
          "161166\n" +
          "5355219\n" +
          "472\n" +
          "802\n" +
          "5289590\n" +
          "94715\n" +
          "6274\n" +
          "51\n" +
          "222656\n" +
          "31348\n" +
          "5816\n" +
          "681\n" +
          "5280393\n" +
          "1123\n" +
          "6288\n" +
          "750\n" +
          "1175\n" +
          "190\n",
      example2: "l-tyrosine\n" +
          "Phenylacetaldehyde\n" +
          "Phenylpyruvic acid\n" +
          "l-phenylalanine\n" +
          "Pantetheine\n" +
          "l-Cysteine\n" +
          "Pantothenic acid\n" +
          "Uracil\n" +
          "Tryptophan\n" +
          "Serotonin\n" +
          "l-Kynurenine\n" +
          "Indoleacrylic acid\n" +
          "4-(2-Aminophenyl)-2,4-dioxobutanoic acid\n" +
          "3-Indoleacetic acid\n" +
          "d-Xylulose\n" +
          "d-Glucuronic acid\n" +
          "l-histidine\n" +
          "2-oxoglutarate\n" +
          "l-Malic acid\n" +
          "Citrate\n" +
          "Epinephrine\n" +
          "Dopamine\n" +
          "Maleylacetoacetic acid\n" +
          "Taurine\n" +
          "l-threonine\n" +
          "Glycine\n" +
          "Uric acid\n" +
          "Adenine\n",
      task_status: null,
      is: {
        RunDemo: false,
        uploading: true,
        submiting: false,
        isCheckingStatus: false,
        isShowCopy: false,
      },
      msg: "",
      checkInterval: 5000,
      isMapID: true,
      checkTaskTimer: null,
      isMapIDList: [
        {
          text: "Metabolite Names",
          value: true
        },
        {
          text: "PubChem IDs",
          value: false
        }
      ],
      singleEnrichment: {
        enrich_trait: {
          isok: null,
        },
        enrich_cancer:{
          isok: null,
        }
      }
    }

  },
  watch: {
    "input_metabolites_list": {
      handler: function (newval) {
        if (this.input_metabolites_list != null) {
          if (this.input_metabolites_list != this.example) {

            this.is.RunDemo = false
          }

        }

      },
      deep: true,
      immediate: true,
    }

  },
  methods: {

    resetEnrichStatus(flag = true) {
      // console.log("resetEnrichStatus")

      Object.keys(this.singleEnrichment).forEach(k => {
        // console.log(k)
        this.singleEnrichment[k]['isok'] = flag

      })
    },


    assignEnrichStatus(enrichmentOjb) {
      if (enrichmentOjb.enrich_trait.status == "ok") {
        this.singleEnrichment.enrich_trait.isok = true
      }

      if (enrichmentOjb.enrich_cancer.status == "ok") {
        this.singleEnrichment.enrich_cancer.isok = true
      }

    },


    setMessage(msg) {
      this.msg = msg
    },
    submit() {
      if (this.input_metabolites_list != null && this.input_metabolites_list.trim() != "") {
        this.is.submiting = true
        this.task_status = null
        this.is.uploading = true
        this.resetEnrichStatus(null)
        let cleanstr = this.input_metabolites_list.replace(/\n/g, "%@&@%")
        // console.log( cleanstr)
        let formData = new FormData();
        formData.append("nameFile", this.originName)
        Axios.post(
          baseURL + "/api/tool_enrichment",
          {},
          {
            params: {
              nameString: cleanstr,
              isMapID: this.isMapID
            }
          }
        ).then(res => {
          this.resetMessage()
          this.is.submiting = false
          this.taskid = res.data
          this.setMessage("Your data has been submitted successfully with Task ID:" + this.taskid, true)
          this.is.isShowCopy = true;
          this.checkTaskInterval();
          // if(this.is.RunDemo ==true){
          //
          // }
        })


      }
    },
    demo(k) {
      if(k=="cid"){

      this.input_metabolites_list = this.example;
      this.isMapID = false;
      this.is.RunDemo = true;
      }else if(k=='name'){
        this.input_metabolites_list = this.example2;
        this.isMapID = true;
        this.is.RunDemo = true;

      }

    },
    resetMessage() {

      this.is.isShowCopy = false;
      this.is.timesand = false;
    },
    copyTaskID() {

      this.$copyText(this.taskid).then(function (e) {
          alert('Copied')
        }, function (e) {
          alert('Can not copy')
        }
      )
    },

    checkTaskInterval() {

      if (this.taskid != null && this.taskid && this.taskid.trim() != "") {
        this.is.isCheckingStatus = true;
        this.setMessage("Checking Task: " + this.taskid + " status...")
        this.singleRunCheck();

        this.resetEnrichStatus(null); //将所有都设置为 false 表示都在loading
        this.checkTaskTimer = window.setInterval(this.singleRunCheck, this.checkInterval);
      }
    },

    singleRunCheck() {

      Axios.get(
        baseURL + "/api/tool_enrichment_task_status",
        {
          params: {
            taskid: this.taskid.trim()
          }
        }
      ).then(res => {
        // console.log(this.taskid)
        // console.log(res.data)
        this.task_status = res.data.total_status
        let enrichments = res.data.enrichment;
        if (this.task_status == "ok") {
          window.clearInterval(this.checkTaskTimer);
          this.resetMessage()
          this.is.isCheckingStatus = false;
          this.setMessage("Task: " + this.taskid + " is done")

          // 修改 enrichment 单个的状态，
          this.assignEnrichStatus(enrichments)
        } else if (this.task_status == "error") {
          window.clearInterval(this.checkTaskTimer);
          this.resetMessage()
          this.is.isCheckingStatus = false;
          this.resetEnrichStatus(null)
          this.setMessage("Task: " + this.taskid + " has error...")
        } else if (this.task_status == "no_exists") {
          window.clearInterval(this.checkTaskTimer);
          this.resetMessage()
          this.is.isCheckingStatus = false;
          this.resetEnrichStatus(null);
          this.setMessage("Task: " + this.taskid + " does not exists...")
        } else if (this.task_status == "running") {
          this.resetMessage()
          this.setMessage("Task: " + this.taskid + " is running...")

          this.assignEnrichStatus(enrichments)


        }

      });

    },
    resetAll() {

      this.input_metabolites_list = ""
      this.taskid = null;
      this.task_status = null;
      this.is.RunDemo = false;
      this.is.uploading = false;
      this.is.submiting = false;
      this.is.isCheckingStatus = false;
      this.is.isShowCopy = false;
      this.msg = "";
      this.isMapID = true;
      this.resetEnrichStatus(null)
      window.clearInterval(this.checkTaskTimer);
    }
  },
  beforeDestroy() {
    window.clearInterval(this.checkTaskTimer)
  },

}
</script>

<style scoped>

</style>
