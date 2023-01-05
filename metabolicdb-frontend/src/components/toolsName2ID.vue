<template>
  <v-sheet>
    <v-row>

      <v-col>
        <v-sheet class="text-left my-6 text-h5 text-justify">
          <div :color="$store.state.mainColor">
            Introduction
          </div>

        </v-sheet>
        <v-sheet class="text-justify my-6">


          The tool below can be used to map
          metabolite names to PubChem identifiers(PubChem IDs), which plays an important role in standardizing
          metabolite name in MACdb. This tool integrates 226,467,569 records of PubChem titles and PubChem synonymous
          names providing powerful id mapping function.
          The tool ensures the accuracy and timeliness of the conversion by setting up the task
          queue. If you upload a large number of metabolites, or multiple users using the tool at the same time, you may
          need to wait a short while. You can view the annotation progress at any time through the Task ID.

          <!--          accessing PubChem's PUG API through <a-->
          <!--          href="https://pubchempy.readthedocs.io/en/latest/index.html" style="text-decoration: none"-->
          <!--          target="_blank">pubchempy</a>-->
          <!--          . For PubChem has restrictions on the-->
          <!--          frequency of API access,-->

        </v-sheet>

        <v-sheet class="pa-4" outlined rounded>
          <v-row>



            <v-spacer></v-spacer>
            <v-col class="pt-4" cols="3">

              <v-row>
                <v-col cols="12">
                  <div class="text-body-1 font-weight-bold">Query Metabolite Names</div>
                  <v-sheet class="text-left  " height="40">
                    <v-row>
                      <v-col cols="12">

                        <a class="my-auto" style="text-decoration: none ;" @click="showExample">#Example <help-msg>
                          Metabolite names from Liu et.al. (PMID:<a href="https://pubmed.ncbi.nlm.nih.gov/31216740/" style="text-decoration: none" target="_blank">31216740</a>)
                        </help-msg>  </a>

                      </v-col>
                    </v-row>
                  </v-sheet>
                  <v-textarea v-model="originName"
                              class="overflow-y-auto pt-2 pb-0"
                              clear-icon="mdi-close-circle"
                              clearable
                              filled hide-details label="Paste metabolite names into here" outlined
                              row-height="8"
                              rows="10">

                  </v-textarea>

                  <v-sheet class="mx-0 px-0 my-2" >
                    <v-btn :color="$store.state.mainColor" :disabled="check_loading" :loading="upload_loading"
                           class="mx-2 white--text float-right" style="text-transform: none" @click="upload">
                      <v-icon>mdi-rocket-outline</v-icon>&nbsp; Run
                    </v-btn>


                  </v-sheet>

                </v-col>
                <v-col cols="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                  <v-sheet class="text-body-1 text-left font-weight-bold pb-2 pt-1" >Check Results</v-sheet>
                  <v-row align="center" >
                    <v-col  cols="12">
                      <v-text-field v-model="taskid" :disabled="check_loading" clearable dense hide-details
                                    outlined placeholder="Task id" solo></v-text-field>
                    </v-col>
                    <v-col  cols="12">
                      <v-btn :color="$store.state.mainColor"
                             :disabled="taskid == null || (taskid && taskid.trim() =='') " :loading="check_loading"
                             class="mx-2 white--text float-right" style="text-transform: none"
                             @click="checkTaskInterval">
                        <v-icon dark>mdi-lightbulb</v-icon>&nbsp; Check
                      </v-btn>
                    </v-col>
                  </v-row>

                </v-col>
                <v-col cols="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                  <v-sheet class="text-body-1 text-left font-weight-bold pb-2 pt-1" >Messages</v-sheet>
                  <v-sheet height="84">
                    <div class="mt-4"><span><v-icon v-if="check_loading">mdi-timer-sand mdi-spin</v-icon></span> {{ msg }}&nbsp;&nbsp; <a
                        v-if="showCopyBotton" style="text-decoration: none" @click="copyTaskID">copy</a></div>
                  </v-sheet>

                </v-col>
                <v-col cols="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                  <v-sheet class="mx-0 px-0 py-2">
                    <v-btn :color="$store.state.mainColor" class="mx-2 white--text float-right" style="text-transform: none"
                           @click="reset">
                      <v-icon>mdi-refresh</v-icon> &nbsp;Reset All
                    </v-btn>
                  </v-sheet>
                </v-col>
              </v-row>





            </v-col>
            <!--            <v-col cols="2"></v-col>-->
            <v-col class="pt-4" cols="9">
              <v-sheet>

                <div class="text-body-1 font-weight-bold">Mapped PubChem Compound IDs
                  <help-msg>Other information of the compounds are also shown here.</help-msg>
                </div>
                <v-sheet class="text-right " height="40">
                  <v-row>
                    <v-col cols="9" align-self="end" >
                      <v-sheet class="text-left text-body-2 " style="vertical-align: bottom;line-height: 100%">
<!--                        <help-msg>Only first 100 rows are shown, if you have uploaded more than 100 metabolites please-->
<!--                          download full mapping results.-->
<!--                        </help-msg>-->
                        Only first 100 rows are shown, if you have uploaded more than 100 metabolites please
                        download full mapping results.
                      </v-sheet>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                      <v-btn :color="$store.state.mainColor" :disabled="taskStatus != 'ok'" elevation="0" outlined small
                             @click="copyResults">Copy
                      </v-btn> &nbsp;

                      <v-btn :color="$store.state.mainColor" :disabled="taskStatus != 'ok'" elevation="0" outlined small
                             @click="download">Download
                      </v-btn>
                    </v-col>
                  </v-row>


                </v-sheet>
              </v-sheet>
              <!--              <v-textarea class="overflow-y-auto pt-2  pb-0" filled hide-details-->
              <!--                          label="Mapped PubChem IDs will be shown here (first 100 rows for preview)" outlined-->
              <!--                          v-model="mappedData"-->
              <!--                          readonly row-height="10" rows="15">-->

              <!--              </v-textarea>-->
              <div class="overflow-y-auto pt-2  pb-0">
                <vxe-table
                  ref="xToolbar1"
                  :align="allAlign"
                  :column-config="{resizable: true}"
                  :data="mappedDataJson"
                  :export-config="{}"
                  :loading="results_loading"
                  :print-config="{}"
                  border
                  auto-resize
                  empty-text="Empty"
                  height="800"
                  round
                  stripe
                >
                  <vxe-column field="query_name" title="Quey Name" min-width="150" ></vxe-column>
                  <vxe-column field="mapped_cid" title="Mapped PubChem CID"min-width="180" ></vxe-column>
                  <vxe-column field="match_source" title="Matched Source"min-width="180" ></vxe-column>
                  <vxe-column field="compound_name"  title="Compound Name"min-width="250" ></vxe-column>
                  <vxe-column field="inchi"  title="InChI"min-width="300" ></vxe-column>
                  <vxe-column field="inchikey" show-overflow title="InChI Key"min-width="300" ></vxe-column>
                  <vxe-column field="molecular_formula" title="Molecular Formula"min-width="180" ></vxe-column>
                  <vxe-column field="monoiotopic_mass" title="Monoiotopic Mass"min-width="150" ></vxe-column>
                  <vxe-column field="exact_mass" title="Exact Mass" min-width="150"   ></vxe-column>
                </vxe-table>
              </div>


            </v-col>

            <v-spacer></v-spacer>
          </v-row>
<!--          <v-row>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-col cols="4">-->

<!--            </v-col>-->
<!--            <v-spacer></v-spacer>-->
<!--          </v-row>-->
<!--          <v-row>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-col cols="9">-->
<!--              <v-row align="center" class="py-4">-->
<!--                <v-col cosl="4">-->
<!--                  <v-row>-->
<!--                    <v-spacer></v-spacer>-->
<!--                    <v-col cols="12">-->

<!--                    </v-col>-->
<!--                  </v-row>-->


<!--                </v-col>-->


<!--                <v-divider inset vertical></v-divider>-->
<!--                <v-col cols="8">-->

<!--                </v-col>-->
<!--              </v-row>-->


<!--            </v-col>-->
<!--            <v-spacer></v-spacer>-->
<!--          </v-row>-->
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import HelpMsg from "./sub/helpMsg";
import Axios from 'axios'
import FileDownload from 'js-file-download'

export default {
  name: "toolsName2ID",
  components: {HelpMsg},
  data() {
    return {
      allAlign: null,
      isRunDemo: false,
      taskStatus: null,
      checkTaskFlag: null,
      checnTaskLeftTimeCount: 5,
      taskid: null,
      originName: null,
      mappedData: null,
      mappedDataJson: [],
      upload_loading: false,
      check_loading: false,
      results_loading:false,
      msg: "",
      showCopyBotton: false,
      example: "l-tyrosine\n" +
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

    }
  },
  beforeDestroy() {
    window.clearInterval(this.checkTaskFlag)
  },

  watch: {
    "originName": {
      handler: function (newval) {
        if (this.originName != null) {
          if (this.originName != this.example) {

            this.isRunDemo = false
          }

        }

      },
      deep: true,
      immediate: true,
    }

  },
  methods: {
    showExample() {
      this.originName = this.example
      this.isRunDemo = true
    },

    checkTaskInterval() {

      if (this.taskid != null && this.taskid && this.taskid.trim() != "") {
        this.check_loading = true;
        this.setMessage("Checking Task: " + this.taskid + " status...")
        this.checkTask();
        this.checkTaskFlag = window.setInterval(this.runCheck, 1000);
      }


    },
    runCheck() {
      // 确保5s 检查一次结果
      this.checnTaskLeftTimeCount = this.checnTaskLeftTimeCount - 1
      if (this.checnTaskLeftTimeCount <= 0) {
        if (this.taskStatus == "running" || this.taskStatus == null) {
          this.checkTask();
        } else {

          this.check_loading = false
          window.clearInterval(this.checkTaskFlag);

          if (this.taskStatus == "ok") {

            this.originName = null;

            this.setMessage("Task: " + this.taskid + " is done. loading...")



            Axios.get(baseURL + "/api/tool_name2id_get_res_string", {
              params: {
                taskid: this.taskid
              }
            }).then(res2 => {
              this.mappedData = res2.data.join("")
              this.setMessage("Task: " + this.taskid + " is loaded.")
              this.results_loading = false;
            })

            // mini 100 json
            Axios.get(baseURL + "/api/tool_name2id_get_res_json", {
              params: {
                taskid: this.taskid
              }
            }).then(res2 => {
              this.mappedDataJson = res2.data
            })
          }

        }
        this.checnTaskLeftTimeCount = 5
      }
    },
    checkTask() {
      //单次，check 结果
      // console.log("checking...status")
      if (this.taskid != null) {


        Axios.get(
          baseURL + "/api/tool_name2id_check_task_status",
          {
            params: {
              taskid: this.taskid.trim()
            }
          }
        ).then(res => {

          this.taskStatus = res.data.status;
          // console.log("taskStatus:" + this.taskStatus)
          if (this.taskStatus == "no_exists") {
            this.setMessage("Task: " + this.taskid + " not exists!")
            this.check_loading = false
          } else if (this.taskStatus == "running") {
            this.setMessage("Task: " + this.taskid + " is running, please wait...")
          } else if (this.taskStatus == "error") {
            this.setMessage("Task: " + this.taskid + " has some errors, please re-submit your data later or contact us.")
            this.check_loading = false
          } else if (this.taskStatus == "ok") {


            //成功或取得数据后清除定时
            this.setMessage("Task: " + this.taskid + " is done. loading...")
            this.results_loading = true;
            // alert(this.results_loading )
            this.check_loading = false
          }
        })
      }
    },
    upload() {


      if (this.originName != null && this.originName.trim() != "") {
        this.setMessage("")
        this.mappedData = null
        this.mappedDataJson = []
        this.taskStatus = null
        this.upload_loading = true
        let cleanstr = this.originName.replace(/\n/g, "%@&@%")
        // console.log( cleanstr)
        let formData = new FormData();
        formData.append("nameString", cleanstr)
        Axios.post(
          baseURL + "/api/tool_name2id_mapping",
          formData,
          // {
          //   params:{
          //     // nameString: cleanstr    //这里一律修改为formData上传文件到本地
          //     nameFile:
          //   }
          // }
        ).then(res => {
          this.upload_loading = false
          this.taskid = res.data
          this.setMessage("Your data has been submitted successfully with Task ID:" + this.taskid, true)
          this.checkTaskInterval();
          // if(this.isRunDemo ==true){
          //
          // }
        })
      }


    },
    download() {

      Axios.get(
        "https://ngdc.cncb.ac.cn/macdb/api/tool_name2id_get_res_file?taskid=" + this.taskid
      ).then(res => {

        FileDownload(res.data, this.taskid + ".mapped.txt")

      })


    },
    setMessage(t, showCopy = false) {
      this.msg = t
      if (showCopy) {
        this.showCopyBotton = true
      } else {
        this.showCopyBotton = false
      }
    },
    reset() {
      this.taskStatus = null
      this.taskid = null
      this.originName = null
      this.mappedData = null
      this.mappedDataJson = []
      this.upload_loading = false
      this.check_loading = false
      this.setMessage("")
      window.clearInterval(this.checkTaskFlag)
      this.isRunDemo = false;
    },
    copyTaskID() {

      this.$copyText(this.taskid).then(function (e) {
          alert('Copied')
        }, function (e) {
          alert('Can not copy')
        }
      )
    },
    copyResults() {
      this.$copyText(this.mappedData).then(function (e) {
          alert('Copied')
        }, function (e) {
          alert('Can not copy')
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
