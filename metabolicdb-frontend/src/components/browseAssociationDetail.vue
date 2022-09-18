<template>
  <div>
    <v-sheet class="ma-4 transparent">

      <bread-crumb :breadcrumb-data="breadcrumbData"></bread-crumb>

      <v-row>
        <v-col>
          <expand-panel title-name="Metabolite">
            <v-row align="center">
              <v-col class="ml-6" cols="12">
                <div class="text-h3 font-weight-bold text-left">{{ compoundData.cmpdname }}</div>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-col class="ml-6 " cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-row align="center">
                      <v-col cols="3">
                        <div :class="styles.formalHead">PubChem CID:</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="text-left pl-4"><a
                          :href="'https://pubchem.ncbi.nlm.nih.gov/compound/'+compoundData.cid"
                          class="text-decoration-none text-body-2 font-weight-bold"
                          target="_blank">{{ compoundData.cid }}</a>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col cols="3">
                        <div :class="styles.formalHead">Molecular Formula:</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="text-left pl-4"> {{ compoundData.mf }}</div>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col cols="3">
                        <div :class="styles.formalHead">Molecular Weight:</div>
                      </v-col>
                      <v-col cols="2">
                        <div class="text-left pl-4"> {{ compoundData.mw }}</div>
                      </v-col>
                    </v-row>

                    <v-row align="center">
                      <v-col cols="3">
                        <div :class="styles.formalHead">Synonyms:</div>
                      </v-col>
                      <v-col cols="9" >

                        <v-sheet class="overflow-y-auto mr-16" max-height="250">
                          <v-list dense>
                            <v-list-item
                              v-for="(x,idx) in ( compoundData.cmpdsynonym  && compoundData.cmpdsynonym.split('|') || [] )"
                              :key="idx"
                              class="text-left">
                              {{ x }}
                            </v-list-item>
                          </v-list>
                        </v-sheet>
                      </v-col>
                    </v-row>

                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="6">
                    <v-sheet class="px-16" height="450">

                      <v-tabs
                        v-model="structTab"
                        :color="$store.state.mainColor"
                        grow
                      >
                        <v-tab
                          class="black--text font-weight-bold"
                        >
                          2D Structure
                        </v-tab>
                        <v-tab
                          :disabled="!structure3dOK"
                          class="black--text font-weight-bold"
                        >
                          <v-icon v-show="structure3dchecking">mdi-loading mdi-spin</v-icon>
                          <v-icon v-show="!structure3dchecking && structure3dOK" color="primary">mdi-link-variant
                          </v-icon>
                          <v-icon v-show="!structure3dchecking && !structure3dOK" color="red">mdi-link-variant-remove
                          </v-icon>
                          &nbsp; 3D Structure &nbsp;
                          <help-msg>Data and widget of this section is linked to PubChem website.</help-msg>
                        </v-tab>
                      </v-tabs>
                      <v-tabs-items
                        v-model="structTab"
                      >
                        <v-tab-item>
                          <v-sheet class="px-3 pb-3 pt-8" height="400">
                            <!--                            <v-img  :src="baseURL+'/api/pubchemimages/CID_'+compoundData.cid+'.png'" height="400"></v-img>-->
                            <img :src="baseURL+'/api/pubchemimages/CID_'+compoundData.cid+'.png'" class="my-auto"
                                 height="90%"></img>
                          </v-sheet>

                        </v-tab-item>
                        <v-tab-item>

                          <v-sheet class="pa-3 overflow-y-auto overflow-x-auto" height="750"
                                   style="margin-top: -110px;margin-bottom: -260px">
                            <!--                                        <div style="border: solid 1px #ccc; width: 500px; max-width: 100%;">-->
                            <iframe
                              :src="'https://pubchem.ncbi.nlm.nih.gov/compound/'+compoundData.cid+'#section=3D-Conformer&embed=true&hide_title=true'" class="pubchem-widget"
                              scrolling="no"
                              style="border: 0; height: 700px;width: 700px "></iframe>
                            <!--                                        </div>-->
                          </v-sheet>


                        </v-tab-item>
                      </v-tabs-items>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col class="ml-6" cols="6">
                    <v-row>
                      <v-col :class="styles.formalHead" cols="3">Computed Descriptors</v-col>
                      <v-col cols="12">
                        <v-sheet height="300" class="overflow-y-auto pr-8">
                          <v-row align="center">
                            <v-col :class="styles.formalHead2" cols="3">IUPAC Name:</v-col>
                            <v-col class="text-left" cols="8">
                              <v-sheet class="text-break">{{ compoundData.iupacname }}</v-sheet>
                            </v-col>
                          </v-row>
                          <v-row align="center">
                            <v-col :class="styles.formalHead2" cols="3">InChI:</v-col>
                            <v-col class="text-left" cols="8">
                              <v-sheet class="text-break">{{ compoundData.inchi }}</v-sheet>
                            </v-col>
                          </v-row>
                          <v-row align="center">
                            <v-col :class="styles.formalHead2" cols="3">InChI Key:</v-col>
                            <v-col class="text-left" cols="8">
                              <v-sheet class="text-break">{{ compoundData.inchikey }}</v-sheet>
                            </v-col>
                          </v-row>
                        </v-sheet>

                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col class="ml-n6" cols="6">
                    <v-row>
                      <v-col :class="styles.formalHead" cols="3">Computed Properties</v-col>
                      <v-col cols="12" class="px-16" >
                        <v-simple-table fixed-header height="300">
                          <thead class="text-left">
                          <tr>
                            <th>Property Name</th>
                            <th> Value</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr class="text-left">
                            <td>Complexity</td>
                            <td>{{ compoundData.complexity }}</td>
                          </tr>
                          <tr class="text-left">
                            <td>XLogP3-AA</td>
                            <td>{{ compoundData.xlogp }}</td>
                          </tr>
                          <tr class="text-left">
                            <td>Heavy Atom Count</td>
                            <td>{{ compoundData.heavycnt }}</td>
                          </tr>
                          <tr class="text-left">
                            <td>Hydrogen Bound Acceptor Count</td>
                            <td>{{ compoundData.hbondacc }}</td>
                          </tr>
                          <tr class="text-left">
                            <td>Hydrogen Bound Donor Count</td>
                            <td>{{ compoundData.hbonddonor }}</td>
                          </tr>
                          <tr class="text-left">
                            <td>Rotatable Bound Count</td>
                            <td>{{ compoundData.rotbonds }}</td>
                          </tr>

                          </tbody>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>


              </v-col>
              <v-col  cols="12">
                <v-row>

                  <!--                  代谢物分类树-->
                  <v-col class="ml-6" cols="6">
                    <v-row>
                      <v-col :class="styles.formalHead" cols="6">Classification (Category)  <help-msg>This section shows the classfication of the metabolite. The larger the serial number, the more accurate. Data are retrieved from PubChem website ( Classification > MeSH ). </help-msg></v-col>
                      <v-col cols="12" class="px-16">
                        <v-simple-table fixed-header height="300">
                          <thead class="text-left">
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody class="text-left"   v-if="pubchemClassificationData &&  pubchemClassificationData.class_tree && (pubchemClassificationData.class_tree.length != 0)">
                            <tr v-for="(item,idx) in pubchemClassificationData && pubchemClassificationData.class_tree || []" :key="idx" >
                                  <td> {{idx+1}}</td>
                                  <td style="min-width: 250px" ><a target="_blank" :href="item.url" style="text-decoration: none">{{item.term}}</a>  </td>
                                  <td  >
                                    {{item.desc && item.desc.join(" ")}}
                                  </td>
                            </tr>
                          </tbody>

                          <tbody v-if="pubchemClassificationData &&  pubchemClassificationData.class_tree && (pubchemClassificationData.class_tree.length == 0) || false">
                          <tr>
                            <td colspan="3">
                              No chemical classification from PubChem database.
                            </td>
                          </tr>
                          <!--                          <v-sheet class="my-auto mx-auto"  >-->
                          <!--                           -->
                          <!--                          </v-sheet>-->
                          </tbody>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!--<v-divider vertical></v-divider>-->

                  <!--                  代谢物基因interaction-->
                  <v-col class="ml-n6" cols="6">
                    <v-row>
                      <v-col :class="styles.formalHead" cols="6">Interacted Genes  <help-msg>This section shows the possible interactions between the metabolite and genes. Data are retrieved from PubChem website ( DGidb ). </help-msg></v-col>
                      <v-col cols="12" class="px-16">
                        <v-simple-table fixed-header height="300"  >
                          <thead class="text-left">
                          <tr>
                            <th>#</th>
                            <th>Chembl ID</th>
                            <th>Drug Claim Name</th>
                            <th>Gene Name</th>
                            <th>Gene ID</th>
                            <th>Source</th>
                          </tr>
                          </thead>
                          <tbody class="text-left"  v-if="pubchemDGIdbData && (pubchemDGIdbData.length != 0)" >
                          <tr v-for="(item,idx) in pubchemDGIdbData && pubchemDGIdbData || []" :key="idx" >
                            <td> {{idx+1}}</td>
                            <td> {{item.drugchemblid}}</td>
                            <td> {{item.drugclaimname}}</td>
                            <td  >{{item.genename}} </td>
                            <td ><a target="_blank" :href="'https://www.ncbi.nlm.nih.gov/gene/'+item.geneid" style="text-decoration: none">{{item.geneid}}</a>  </td>
                            <td  >
                              {{item.interactionclaimsource}}
                            </td>
                          </tr>


                          </tbody>
                          <tbody v-show="pubchemDGIdbData && (pubchemDGIdbData.length == 0) || false">
                          <tr>
                            <td colspan="6">
                              No interacted gene information from PubChem database.
                            </td>
                          </tr>
<!--                          <v-sheet class="my-auto mx-auto"  >-->
<!--                           -->
<!--                          </v-sheet>-->
                          </tbody>

                        </v-simple-table>


                      </v-col>
                    </v-row>

                  </v-col>


                </v-row>

              </v-col>
              <v-col class="mb-8"></v-col>
            </v-row>
          </expand-panel>
          <v-sheet class="pa-3">
            <v-tabs v-model="tabkey" :color="$store.state.mainColor">
              <v-tab style="text-transform: none">Related Studies</v-tab>
              <v-tab  style="text-transform: none">Related Traits</v-tab>
              <v-tab  style="text-transform: none">Related Publications</v-tab>
            </v-tabs>
          </v-sheet>
          <v-tabs-items v-model="tabkey" class="px-3 pb-6 pt-4">
            <v-tab-item>
              <page-sub-study-association :cid="cid"></page-sub-study-association>
            </v-tab-item>
            <v-tab-item>
              <page-sub-trait :tid="$route.params.cid" idtype="cid"></page-sub-trait>

            </v-tab-item>
            <v-tab-item>

              <page-sub-publication :tid="$route.params.cid" idtype="cid"></page-sub-publication>
            </v-tab-item>

          </v-tabs-items>
        </v-col>
      </v-row>

      <!--      <page-sub-study tid="34033488" idtype="pmid" ></page-sub-study>-->
    </v-sheet>

  </div>


</template>

<script>
import Axios from 'axios'
import HelpMsg from "./sub/helpMsg";
import BreadCrumb from "./sub/breadCrumb";
import ExpandPanel from "./sub/expandPanel";
import SexChip from "./sub/sexChip";
import PageSubTrait from "./detailPageSub/pageSubTrait";
import PageSubPublication from "./detailPageSub/pageSubPublication";
import DeltaTrendSummary from "./tableLegends/LegendDeltaTrendSummary";
import PvalSummary from "./tableLegends/LegendPvalSummary";
import LegendSex from "./tableLegends/LegendSex";
import TraitType from "./tableLegends/LegendTraitType";
import PageSubAssociation from "./detailPageSub/pageSubAssociation";
import PageSubStudy from "./detailPageSub/pageSubStudy";
import PageSubStudyAssociation from "./detailPageSub/pageSubStudyAssociation";

export default {
  name: "browseAssociationDetail",
  components: {
    PageSubStudyAssociation,
    PageSubStudy,
    PageSubAssociation,
    TraitType,
    LegendSex,
    PvalSummary,
    DeltaTrendSummary, PageSubPublication, PageSubTrait, SexChip, ExpandPanel, BreadCrumb, HelpMsg
  },
  data() {
    return {
      baseURL: window.baseURL,
      tabkey: null,
      structTab: null,
      isexpand: {
        compound: true,
        study: true,
      },
      styles: {
        formalHead: {
          "text-body-1": true,
          "text-left": true,
          "font-weight-bold": true,
        },
        formalHead2: {
          "text-body-2": true,
          "text-left": true,
          "font-weight-bold": true,
          "ml-6": true
        }
      },
      breadcrumbData: [
        {
          text: "Home",
          disabled: false,
          href: baseURL + "/home"
        },
        {
          text: "Browse Metabolite",
          disabled: false,
          href: baseURL + "/browse_association"
        },
        {
          text: this.$route.params.cid,
          disabled: true,
        }
      ],
      tableloading1: false,
      allAlign: null,
      cid: this.$route.params.cid,
      loadings: {
        loadingCompound: false,
        loadingStudy: false,
      },
      currentPage: 1,
      pageSize: 10,
      totalResult: 0,
      compoundData: {},
      studyData: [],
      expandPanels1: 0,
      expandPanels2: 0,
      tablePage1: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      structure3dOK: false,
      structure3dchecking: false,
      pubchemClassificationData:null,
      pubchemDGIdbData:null,


    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.$refs.xTable1.connect(this.$refs.xToolbar1)
    // })

    //load compound
    this.loadings.loadingCompound = true
    Axios.get(
      baseURL + "/api/get_one_compund_by_cid", {params: {cid: this.cid}}
    ).then(res => {
      this.compoundData = res.data
      this.loadings.loadingCompound = false
    })

    this.loadStudyDataByPage()
    this.check3DStructureAvaliable();
    this.loadPubchemClassification();
    this.loadPubchemDGIdb();
  },
  methods: {

    check3DStructureAvaliable() {

      this.structure3dchecking = true
      Axios.get(
        "https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/" + this.cid + "/JSON/?heading=3D+Conformer"
      ).then((res) => {
        this.structure3dchecking = false;
        if (res.status == 200 || res.status == 304) {
          this.structure3dOK = true;
        } else {
          this.structure3dOK = false;
        }
      }).catch(() => {
        this.structure3dchecking = false;
        this.structure3dOK = false;
      })

    },


    handlePageChange1({currentPage, pageSize}) {
      this.tablePage1.currentPage = currentPage
      this.tablePage1.pageSize = pageSize
    },
    pvalueColor(p) {

      if (p == null) {
        return "grey"
      }

      if (parseFloat(p) < 0.01) {
        return 'pink'
      } else if (parseFloat(p) >= 0.01 && parseFloat(p) < 0.05) {
        return 'teal'
      } else if (parseFloat(p) >= 0.05) {
        return 'yellow darken-3'
      }
    },
    loadStudyDataByPage() {
      //load study
      this.loadings.loadingStudy = true
      Axios.post(
        baseURL + "/api/get_study_by_cid", {}, {params: {cid: this.cid}}
      ).then(res => {
        this.studyData = res.data
        this.loadings.loadingStudy = false
        this.tablePage1.totalResult = res.data.length;
      })
    },

    loadPubchemClassification(){
      Axios.post(
        baseURL + "/api/get_compund_classification_by_cid", {}, {params: {cid: this.cid}}
      ).then(res => {
        this.pubchemClassificationData = res.data
      })
    },
    loadPubchemDGIdb(){
      Axios.post(
        baseURL + "/api/get_compund_dgidb_gene_interaction_by_cid", {}, {params: {cid: this.cid}}
      ).then(res => {
        this.pubchemDGIdbData = res.data
      })
    },
  }

}
</script>

<style scoped>
.columnRed {
  background-color: #c51162;
}
</style>
