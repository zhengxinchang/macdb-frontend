<template>
  <v-sheet>
    <v-sheet class="pa-3 " min-height="600">
      <v-sheet>
        <trait-type></trait-type>
        <delta-trend-summary></delta-trend-summary>
        <pval-summary></pval-summary>
        <open-external-link></open-external-link>
      </v-sheet>
      <v-row class="mt-5">
        <v-col class="my-0 py-0" cols="12">
          <v-sheet height="40">
            <v-btn class="float-start" style="text-transform: none" @click="showFilters = ! showFilters"
                   v-show="!showFilters" small dark :color="$store.state.mainColor">Filters
              <v-icon small>mdi-chevron-double-right</v-icon>
            </v-btn>
          </v-sheet>
        </v-col>
        <v-col v-if="showFilters" cols="2">
          <v-sheet outlined rounded>
            <v-row class="pa-2">
              <v-col class="text-left" cols="12">
                <span class="font-weight-bold">Filters</span>
                <span class="float-end"><v-btn small elevation="0" @click="showFilters = ! showFilters"
                                               :color="$store.state.mainColor" dark
                                               style="text-transform: none">hide <v-icon
                    small>mdi-chevron-double-left</v-icon></v-btn></span>
              </v-col>
              <v-col cols="12">
                <v-sheet color="grey lighten-4" rounded>
                  <v-row class="px-2">
                    <v-col cols="12">
                      <v-autocomplete
                          v-model="filterItems.cancer_type"
                          outlined label="Cancer type"
                          dense
                          :items="filterLists.cancer_type"
                          multiple
                          deletable-chips small-chips
                          chips
                          hide-details
                          clearable
                          background-color="white"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-autocomplete
                          v-model="filterItems.Trait_Ontology"
                          outlined label="Trait"
                          dense
                          :items="filterLists.Trait_Ontology"
                          multiple
                          deletable-chips small-chips
                          chips
                          hide-details
                          clearable
                          background-color="white"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-autocomplete
                          v-model="filterItems.Trait_type"
                          outlined label="Trait Type"
                          dense
                          deletable-chips small-chips
                          :items="filterLists.Trait_type"
                          multiple
                          chips
                          hide-details
                          clearable
                          background-color="white"
                      ></v-autocomplete>
                    </v-col>


                    <v-col cols="12">
                      <v-text-field
                          v-model.number="filterItems.NStudy"
                          outlined label="Min Number of Study"
                          dense
                          hide-details

                          class="centered-input"
                          append-icon="mdi-plus"
                          @click:append="()=>{filterItems.NStudy +=1}"
                          prepend-inner-icon="mdi-minus"
                          @click:prepend-inner="()=>{filterItems.NStudy <=1 ?  (filterItems.NStudy = 1 ) : (filterItems.NStudy -=1)}"
                          background-color="white"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                          v-model.number="filterItems.NAssociation"
                          outlined label="Min Number of Association"
                          dense
                          hide-details
                          class="centered-input"
                          append-icon="mdi-plus"
                          @click:append="()=>{filterItems.NAssociation +=1}"
                          prepend-inner-icon="mdi-minus"
                          @click:prepend-inner=" ()=>{filterItems.NAssociation <=1 ?  (filterItems.NAssociation = 1 ) : (filterItems.NAssociation -=1)}"
                          background-color="white"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                          v-model.number="filterItems.NPeople"
                          outlined label="Min Number of Subject"
                          dense
                          hide-details

                          class="centered-input"
                          append-icon="mdi-plus"
                          @click:append="()=>{filterItems.NPeople +=1}"
                          prepend-inner-icon="mdi-minus"
                          @click:prepend-inner="()=>{filterItems.NPeople <=1 ?  (filterItems.NPeople = 1 ) : (filterItems.NPeople -=1)}"
                          background-color="white"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                          v-model.number="filterItems.NPublication"
                          outlined label="Min Number of Publication"
                          dense
                          hide-details

                          class="centered-input"
                          append-icon="mdi-plus"
                          @click:append="()=>{filterItems.NPublication +=1}"
                          prepend-inner-icon="mdi-minus"
                          @click:prepend-inner="  ()=>{filterItems.NPublication <=1 ?  (filterItems.NPublication = 1 ) : (filterItems.NPublication -=1)}"
                          background-color="white"
                      ></v-text-field>
                    </v-col>



                    <v-col cols="12" class="text-right">
                      <v-btn small class=" mx-1" @click="applyFilters" :color="$store.state.mainColor" dark
                             style="text-transform: none">Apply
                      </v-btn>
                      <v-btn small class=" mx-1" @click="resetFilters" :color="$store.state.mainColor" dark
                             style="text-transform: none">Reset
                      </v-btn>


                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>

            </v-row>
          </v-sheet>
        </v-col>
        <v-col :cols=" showFilters? 10 : 12">
          <v-sheet outlined>
            <vxe-toolbar ref="xToolbar1T" custom export  ></vxe-toolbar>

            <vxe-table
                ref="xTable1T"
                align="left"
                :column-config="{resizable: true}"
                :data="filteredData"
                :export-config="{}"
                :loading="tableloading1"
                :print-config="{}"
                border
                empty-text="Empty"
                round
                max-height="800"
                stripe

            >
              <vxe-column type="seq" title="#"  sortable width="50"></vxe-column>
              <vxe-column field="Trait_Ontology" min-width="180" sortable title="Trait">
                <template #default="{row}">
                  <v-tooltip   top   >
                    <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs"
                                  v-on="on">

                              <v-chip :color="$commonfunc.getColorCodeByTraitType(row.Trait_type)"  class="text-break  ma-1" label small dark
                                      @click="$commonfunc.openAtNewPageTraitDetail(row.Trait_Ontology_ID)"

                              > {{row.Trait_Ontology}}</v-chip>
                            </span>
                    </template>
                    <div class="my-1 mx-2" >
                      <b>Trait type:</b><br/>{{row.Trait_type}}
                    </div>
                  </v-tooltip>

                </template>
              </vxe-column>
              <vxe-column field="Cancer_typeDict" sortable title="Cancer type" width="180">
                <template #default="{ row }">
                  <v-chip v-for="(item,idx) in Object.keys(row.Cancer_typeDict)" :key="idx"   class="text-break  ma-1" label small color="grey" outlined
                  > {{item}}</v-chip>
                </template>
              </vxe-column>
              <vxe-column field="Trait_type" sortable title="Trait Type" width="180">
              </vxe-column>

              <vxe-column  :export-method="$commonfunc.exportFuncDeltaTrends" field="pctTrends" title="Delta Trends Summary"
                          width="180">
                <template #default="{ row }">

                  <percent-bar-items :dat="row.pctTrends"></percent-bar-items>
                </template>
              </vxe-column>

              <vxe-column :export-method="$commonfunc.exportFuncPvalSummary" field="pctPval" title="Pval Summary" width="180">
                <template #default="{ row }">

                  <percent-bar-items-pval :dat="row.pctPval"></percent-bar-items-pval>
                </template>
              </vxe-column>

              <vxe-column field="NAssociation" sortable title="#Association" width="180">
                <template #header="{column}">
                  <span class="text-center">{{ column.title }}</span>
                </template>
                <template #default="{ row }">
                  <div class="text-center "> {{ row.NAssociation }}</div>
                </template>
              </vxe-column>
              <vxe-column field="NStudy" :visible="false"   v-if="idtype != 'studyid'"  sortable title="Related Studies">
                <template #header="{column}">
                  <span class="text-center">{{ column.title }}</span>
                </template>
                <template #default="{ row }">

                  <a v-for="k in Object.keys(row.NStudyDict)" class="text-body-2" style="text-decoration: none;display: block"
                     @click="$commonfunc.openAtNewPageStudyDetail(k)"
                  >{{ k }}</a>


                </template>
              </vxe-column>
              <vxe-column field="NPeople" sortable title="#Subject" width="180">
                <template #header="{column}">
                  <span class="text-center">{{ column.title }}</span>
                </template>
                <template #default="{ row }">
                  <div class="text-center "> {{ row.NPeople }}</div>
                </template>
              </vxe-column>
              <vxe-column field="NPublication" sortable title="#Publication" width="180">
              </vxe-column>
              <vxe-column field="NStudy" sortable title="#Study" width="180">
              </vxe-column>
              <vxe-column align="center" field="NPublicationDict" sortable title="Publications" width="180">
                <template #default="{ row }">
                  <div v-for="x in Object.keys(row.NPublicationDict)"
                       class="text-center "><a class="text-body-2" style="text-decoration: none"
                                               @click="$commonfunc.openAtNewPagePublicationDetail(x)">{{ x }}</a>
                    <v-icon color="primary" small @click="$commonfunc.goOuterLinkPubmed(x)">mdi-share</v-icon>
                  </div>
                  <!--            <div v-for="x in Object.keys(row.NPublicationDict)" class="text-center "> <a style="text-decoration: none" class="text-body-2" @click="$router.push('/browse_publication/'+x)" >{{x}}</a> <v-icon small color="primary" @click="$commonfunc.goOuterLinkPubmed(x)">mdi-share</v-icon> </div>-->
                </template>
              </vxe-column>
            </vxe-table>
          </v-sheet>
        </v-col>
      </v-row>





    </v-sheet>
  </v-sheet>
</template>

<script>
import Axios from "axios";
import PercentBarItemsPval from "../sub/percentBarItemsPval";
import PercentBarItems from "../sub/percentBarItems";
import DeltaTrendSummary from "../tableLegends/LegendDeltaTrendSummary";
import PvalSummary from "../tableLegends/LegendPvalSummary";
import LegendSex from "../tableLegends/LegendSex";
import TraitType from "../tableLegends/LegendTraitType";
import OpenExternalLink from "../tableLegends/LegendOpenExternalLink";
import _ from "lodash";

export default {
  name: "pageSubTrait",
  components: {
    OpenExternalLink,
    TraitType, LegendSex, PvalSummary, DeltaTrendSummary, PercentBarItemsPval, PercentBarItems
  },
  props: ["tid", "idtype"],
  data() {
    return {
      allAlign: null,
      tableData: [],
      dataLength: 0,
      tableloading1: false,
      pagedData: [],
      tablePage1: {
        currentPage: 1,
        pageSize: 10,
      },
      filteredData:[],
      showFilters:false,
      filterItems: {
        // 跟 filterLists 对应，选择其中的一个候选
        cancer_type: null,
        Trait_type: null,
        Trait_Ontology:null,
        NAssociation:1,
        NPeople:1,
        NPublication:1,
        NStudy:1,
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.xTable1T.connect(this.$refs.xToolbar1T)
    })


    let url
    if (this.idtype == "cid") {
      url = "/api/get_trait_by_cid"
    } else if (this.idtype == "pmid") {
      url = "/api/get_trait_by_pmid"
    } else if (this.idtype = 'studyid') {
      url = "/api/get_trait_by_studyid"
    }
    this.tableloading1 = true;
    Axios.post(
      baseURL + url, {}, {params: {tid: this.tid}}
    ).then(res => {
      this.tableData = res.data
      this.filteredData = this.tableData;
      this.dataLength = res.data.length;
      this.tableloading1 = false;
    })
  },
  computed: {
    // tableDataWithPage() {
    //   return {
    //     data: this.tableData,
    //     currentPage: this.tablePage1.currentPage,
    //     pageSize: this.tablePage1.pageSize
    //   }
    // }
    filterLists() {
      // 跟 filterItems 对应，提供候选
      let out = {
        cancer_type: new Set(),
        Trait_type: new Set(),
        Trait_Ontology: new Set(),
        // 添加新的 filter list
      };

      this.tableData.forEach(res => {
        for (let x in res.Cancer_typeDict){
          out.cancer_type.add(x)
        }
        out.Trait_type.add(res.Trait_type)
        out.Trait_Ontology.add(res.Trait_Ontology)
        // 添加新的filterlist
      })

      let out2 = {}
      for (let x in out) {
        out2[x] = Array.from(out[x])
      }
      return out2
    }
  },
  // watch: {
  //   tableDataWithPage(newval, oldval) {
  //     if (newval.data != null && newval.currentPage != null, newval.pageSize != null) {
  //       let start = (this.tablePage1.currentPage - 1) * this.tablePage1.pageSize;
  //       let end = start + this.tablePage1.pageSize
  //       this.pagedData = this.tableData.slice(start, end)
  //     }
  //   }
  // },
  methods: {
    // handlePageChange1({currentPage, pageSize}) {
    //   this.tablePage1.currentPage = currentPage
    //   this.tablePage1.pageSize = pageSize
    //   let start = (this.tablePage1.currentPage - 1) * this.tablePage1.pageSize;
    //   let end = start + this.tablePage1.pageSize
    //   this.pagedData = this.tableData.slice(start, end)
    // },
    goOuterLinkPubmed(cid) {
      window.open('https://pubmed.ncbi.nlm.nih.gov/' + cid, '_blank')
    },
    applyFilters(){
      this.tableloading1 = true

      this.filteredData = this.tableData.filter(item=>{

        let flag =  true;
        // 如果 不为null,且长度大于0 并且item不在里边，则认为被过滤掉
        // 如果 不为null,且长度大于0 并且item不在里边，则认为被过滤掉
        if ((this.filterItems.cancer_type != null) && (this.filterItems.cancer_type.length > 0) ) {

          let item_disease = Object.keys( item.Cancer_typeDict)

          let inters = _.intersection(item_disease,this.filterItems.cancer_type)

          if (inters.length  == 0){
            flag = false
          }

        }
        if ( (this.filterItems.Trait_type != null) && (this.filterItems.Trait_type.length >0  )  && ! this.filterItems.Trait_type.includes(item.Trait_type)){
          flag = false
        }
        if ( (this.filterItems.Trait_Ontology != null) && (this.filterItems.Trait_Ontology.length >0  )  && ! this.filterItems.Trait_Ontology.includes(item.Trait_Ontology)){
          flag = false
        }


        if( (this.filterItems.NPeople != null) && (  _.isNumber(this.filterItems.NPeople) ) ){
          if (this.filterItems.NPeople > item.NPeople){
            flag = false;
          }
        }

        if( (this.filterItems.NAssociation != null) && (  _.isNumber(this.filterItems.NAssociation) ) ){
          if (this.filterItems.NAssociation > item.NAssociation){
            flag = false;
          }
        }


        if( (this.filterItems.NStudy != null) && (  _.isNumber(this.filterItems.NStudy) ) ){
          if (this.filterItems.NStudy > item.NStudy){
            flag = false;
          }
        }


        if( (this.filterItems.NPublication != null) && (  _.isNumber(this.filterItems.NPublication) ) ){
          if (this.filterItems.NPublication > item.NPublication){
            flag = false;
          }
        }


        return flag
      })

      // this.dataLength = this.filteredData.length;
      this.tableloading1 = false;
    },
    resetFilters(){
      this.filterItems= {
        // 跟 filterLists 对应，选择其中的一个候选
        cancer_type: null,
        Trait_type: null,
        Trait_Ontology:null,
        NAssociation:1,
        NPeople:1,
        NPublication:1,
        NStudy:1,
      }
      this.applyFilters()
    },
  }
}
</script>

<style scoped>
.centered-input   >>> input {
  text-align: center;
}
</style>
