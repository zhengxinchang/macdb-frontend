<template>
  <v-sheet>
    <v-sheet class="pa-3 " min-height="600">
      <v-sheet>
        <delta-trend-summary></delta-trend-summary>
        <pval-summary></pval-summary>
        <legend-sex></legend-sex>
        <legend-category></legend-category>
        <legend-trait-type></legend-trait-type>
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
                          v-model="filterItems.category"
                          outlined label="Category"
                          dense
                          :items="filterLists.category"
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
                          v-model="filterItems.Trait"
                          outlined label="Trait"
                          dense
                          deletable-chips small-chips
                          :items="filterLists.Trait"
                          multiple
                          chips
                          hide-details
                          clearable
                          background-color="white"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-autocomplete
                          v-model="filterItems.Tissue"
                          outlined label="Tissue"
                          dense
                          deletable-chips small-chips
                          :items="filterLists.Tissue"
                          multiple
                          chips
                          hide-details
                          clearable
                          background-color="white"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-autocomplete
                          v-model="filterItems.Platform"
                          outlined label="Platform"
                          dense
                          deletable-chips small-chips
                          :items="filterLists.Platform"
                          multiple
                          chips
                          hide-details
                          clearable
                          background-color="white"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="filterItems.Condition"
                          outlined
                          label="Condition (Fuzzy search)"
                          hide-details
                          clearable
                          dense
                          background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="filterItems.Conclusion"
                          outlined
                          label="Conclusion (Fuzzy search)"
                          hide-details
                          clearable
                          dense
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
            <vxe-toolbar ref="xToolbar1S" custom export></vxe-toolbar>
            <!--      <vxe-pager-->
            <!--        :current-page="tablePage1.currentPage"-->
            <!--        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"-->
            <!--        :loading="tableloading1"-->
            <!--        :page-size="tablePage1.pageSize"-->
            <!--        :total="dataLength"-->
            <!--        @page-change="handlePageChange1">-->
            <!--      </vxe-pager>-->
            <vxe-table
                ref="xTable1S"
                align="left"
                :column-config="{resizable: true}"
                :data="filteredData"
                :export-config="{}"
                :print-config="{}"
                :loading="tableloading1"
                border
                empty-text="Empty"
                round
                max-height="800"
                stripe

            >
              <vxe-column type="seq" title="#"  sortable width="50"></vxe-column>
              <vxe-column field="Cohort_id" title="Study" align="left" width="100" sortable>
                <template #default="{row}">
                  <a style="text-decoration: none" class="font-weight-bold text-body-2"
                     @click="$commonfunc.openAtNewPageStudyDetail(row.Cohort_id)">{{ row.Cohort_id }}</a>
                </template>

              </vxe-column>
              <vxe-column field="Type" title="Category" align="left">

                <template #default="{row}">
                  <v-chip dark label small :color="row.Type == 'case vs.control group' ? 'pink' : 'teal'">
                    {{ row.Type == "case vs.control group" ? "Case vs.Control" : "Porfiling" }}
                  </v-chip>
                </template>

              </vxe-column>
              <vxe-column field="Trait" sortable title="Trait" align="left">

                <template #default="{row}">

                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <div v-bind="attrs"
                           v-on="on">

                        <v-chip :color="$commonfunc.getColorCodeByTraitType(row.Trait_type)" class="text-break" label
                                small dark
                                @click="$commonfunc.openAtNewPageTraitDetail(row.Trait_onto_ID)"
                        > {{ row.Trait_Ontology }}
                        </v-chip>

                      </div>
                    </template>

                    <div class="my-1 mx-2">
                      <b>Trait type:</b><br/>{{ row.Trait_type }}
                    </div>


                  </v-tooltip>


                </template>

              </vxe-column>
              <vxe-column field="Condition" width="300" title="Condition" align="left">


                <template #default="{row}">
                  <div v-if="row.Condition && row.Condition !='nan' ">
                    {{ $commonfunc.capitalize(row.Condition && row.Condition.trim()) }}
                  </div>

                </template>

              </vxe-column>
              <vxe-column field="Tissue" title="Tissue" align="left"></vxe-column>
              <vxe-column field="Cancer_type" title="Cancer Type" align="left"></vxe-column>
              <vxe-column :visible="false" field="Cancer_subtype" title="Cancer Subtype" align="left"></vxe-column>
              <vxe-column title="Case Information" align="left">
                <template #default="{ row }">
                  <b>Name</b>: {{ row.Case_name }}
                  <b>Age</b>: {{ row.Case_age_group }}
                  <b>Sex</b>: <sex-chip :sex="row.Case_sex"></sex-chip>
                  <br/>
                  <b>Size</b>: {{ row.Case_size }}
                </template>
              </vxe-column>

              <vxe-column title="Control Information" align="left">
                <template #default="{ row }">
                  <b>Name</b>: {{ row.Control_name }}
                  <b>Age</b>: {{ row.Control_age_group }}
                  <b>Sex</b>: <sex-chip :sex="row.Control_sex"></sex-chip>
                  <br/>
                  <b>Size</b>: {{ row.Control_size }}
                </template>

              </vxe-column>
              <vxe-column min-width="100" field="Platform" title="Platform" align="left"></vxe-column>
              <vxe-column field="Delta_trend" :export-method="$commonfunc.exportFuncDeltaTrends"
                          title="Delta Trends Summary" width="150">
                <template #default="{ row }">
                  <percent-bar3-item :dat="row.pctTrends"></percent-bar3-item>

                </template>

              </vxe-column>
              <vxe-column :export-method="$commonfunc.exportFuncPvalSummary" width="200" title="Pval Summary">

                <template #default="{row}">
                  <percent-bar-items-pval :dat="row.pctPval"></percent-bar-items-pval>
                </template>

              </vxe-column>
              <vxe-column field="Conclusion" show-overflow="tooltip" title="Conclusion">

                <template #default="{row}">
                  <div v-if="row.Conclusion && row.Conclusion !='nan' ">
                  {{ $commonfunc.capitalize(row.Conclusion && row.Conclusion.trim()) }}
                  </div>
                </template>


              </vxe-column>
              <vxe-column field="pubmed_id" title="Publication">
                <template #default="{row}">
                  <span> {{ row.pubmed_id }}</span>
                  <v-icon color="blue" small @click="goOuterLinkPubmed(row.pubmed_id)">mdi-share</v-icon>
                </template>
              </vxe-column>
            </vxe-table>
            <!--      <vxe-pager-->
            <!--        :current-page="tablePage1.currentPage"-->
            <!--        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"-->
            <!--        :loading="tableloading1"-->
            <!--        :page-size="tablePage1.pageSize"-->
            <!--        :total="dataLength"-->
            <!--        @page-change="handlePageChange1">-->
            <!--      </vxe-pager>-->
          </v-sheet>

        </v-col>
      </v-row>

    </v-sheet>

  </v-sheet>

</template>

<script>
import Axios from "axios";
import HelpMsg from "../sub/helpMsg";
import PercentBar3Item from "../sub/percentBarItems";
import PercentBarItemsPval from "../sub/percentBarItemsPval";
import SexChip from "../sub/sexChip";
import DeltaTrendSummary from "../tableLegends/LegendDeltaTrendSummary";
import PvalSummary from "../tableLegends/LegendPvalSummary";
import LegendSex from "../tableLegends/LegendSex";
import OpenExternalLink from "../tableLegends/LegendOpenExternalLink";
import LegendCategory from "../tableLegends/LegendCategory";
import LegendTraitType from "../tableLegends/LegendTraitType";

export default {
  name: "pageSubStudy",
  components: {
    LegendCategory,
    OpenExternalLink,
    LegendSex, PvalSummary, DeltaTrendSummary, SexChip, PercentBarItemsPval, PercentBar3Item, HelpMsg, LegendTraitType
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
      filteredData: [],
      showFilters: false,
      filterItems: {
        // 跟 filterLists 对应，选择其中的一个候选
        cancer_type: null,
        Platform: null,
        Tissue: null,
        Trait: null,
        category: null,
        Conclusion: null,
        Condition: null,
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.xTable1S.connect(this.$refs.xToolbar1S)
    })


    let url
    if (this.idtype == "traitid") {
      url = "/api/get_study_by_traitid"
    } else if (this.idtype == "pmid") {
      url = "/api/get_study_by_pmid"
    }
    // else if (this.idtype='cid'){
    //     url = "/api/get_study_by_traitid"
    // }
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
    // tableDataWithPage(){
    //   return{
    //     data:this.tableData,
    //     currentPage:this.tablePage1.currentPage,
    //     pageSize:this.tablePage1.pageSize
    //   }
    // }
    filterLists() {
      // 跟 filterItems 对应，提供候选


      // cancer_type: null,
      //     Platform: null,
      //     Tissue:null,
      //     Trait:null,
      //     category:null,
      //     Conclusion:null,
      //     Condition:null,

      let out = {
        cancer_type: new Set(),
        Platform: new Set(),
        Trait: new Set(),
        category: new Set(),
        Tissue: new Set()
        // 添加新的 filter list
      };

      this.tableData.forEach(res => {
        // for (let x in res.Disease){
        //   out.cancer_type.add(x)
        // }
        out.cancer_type.add(res.Cancer_type)
        out.Platform.add(res.Platform)
        out.Trait.add(res.Trait_Ontology)
        out.Tissue.add(res.Tissue)
        out.category.add(res.Type)
        // 添加新的filterlist
      })

      let out2 = {}
      for (let x in out) {
        out2[x] = Array.from(out[x])
      }
      return out2
    }


  },
  watch: {
    tableDataWithPage(newval, oldval) {
      if (newval.data != null && newval.currentPage != null, newval.pageSize != null) {
        let start = (this.tablePage1.currentPage - 1) * this.tablePage1.pageSize;
        let end = start + this.tablePage1.pageSize
        this.pagedData = this.tableData.slice(start, end)
      }
    }
  },
  methods: {
    handlePageChange1({currentPage, pageSize}) {
      this.tablePage1.currentPage = currentPage
      this.tablePage1.pageSize = pageSize
      let start = (this.tablePage1.currentPage - 1) * this.tablePage1.pageSize;
      let end = start + this.tablePage1.pageSize
      this.pagedData = this.tableData.slice(start, end)


    },
    goOuterLinkPubmed(cid) {
      window.open('https://pubmed.ncbi.nlm.nih.gov/' + cid, '_blank')
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
    applyFilters() {

      this.tableloading1 = true
      this.filteredData = this.tableData.filter(item=>{

        let flag =  true;
        // 如果 不为null,且长度大于0 并且item不在里边，则认为被过滤掉
        if ( (this.filterItems.cancer_type != null) && (this.filterItems.cancer_type.length >0  )  && ! this.filterItems.cancer_type.includes(item.Cancer_type)){
          flag = false
        }
        if ( (this.filterItems.category != null) && (this.filterItems.category.length >0  )  && ! this.filterItems.category.includes(item.Type)){
          flag = false
        }
        if ( (this.filterItems.Trait != null) && (this.filterItems.Trait.length >0  )  && ! this.filterItems.Trait.includes(item.Trait_Ontology)){
          flag = false
        }
        if ( (this.filterItems.Tissue != null) && (this.filterItems.Tissue.length >0  )  && ! this.filterItems.Tissue.includes(item.Tissue)){
          flag = false
        }
        if ( (this.filterItems.Platform != null) && (this.filterItems.Platform.length >0  )  && ! this.filterItems.Platform.includes(item.Platform)){
          flag = false
        }

        // 如果 item.Condition 为空，或者 不包含 condition的过滤条目，则返回false
        if ( (item.Condition == null)  || ((item.Condition != null) && (this.filterItems.Condition != null) &&  ! item.Condition.includes(this.filterItems.Condition.trim()))){

          flag = false
        }
        if ( (item.Conclusion == null) ||  ((item.Conclusion != null) && (this.filterItems.Conclusion != null) &&   ! item.Conclusion.includes(this.filterItems.Conclusion.trim()))){
          flag = false
        }
        return flag
      })

      // this.dataLength = this.filteredData.length;
      this.tableloading1 = false;
    },
    resetFilters() {
      this.filterItems = {
        // 跟 filterLists 对应，选择其中的一个候选
        cancer_type: null,
        Platform: null,
        Tissue: null,
        Trait: null,
        category: null,
        Conclusion: null,
        Condition: null,
      }
      this.applyFilters()
    }
  }
}
</script>

<style scoped>

</style>
