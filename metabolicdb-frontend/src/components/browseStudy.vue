<template>
  <div>
    <v-sheet  rounded class="ma-4 transparent">

      <bread-crumb :breadcrumb-data="breadcrumbData" >

      </bread-crumb>

      <v-row class="pt-3">
        <v-col>
          <v-row>
              <v-col class="text-left" cols="12">


                <v-btn v-show="!filterExpand"
                       :color="$store.state.mainColor" dark elevation="0" small
                       style="text-transform: none"
                       @click="filterExpand= true">Filter
                  <v-icon small>mdi-chevron-double-right</v-icon>
                </v-btn>

              </v-col>
              <v-col v-show="filterExpand" cols="2">
                <v-sheet class="pt-6  px-3 pb-6">
                  <filter-panel style="z-index: 999999;">
                    <v-sheet>
                      <v-row>
                        <v-col cols="12">
                          <v-sheet class="text-body-1 float-start font-weight-bold">Filters</v-sheet>

                          <v-btn :color="$store.state.mainColor"
                                 class="float-end"
                                 dark elevation="0" small style="text-transform: none"
                                 @click="filterExpand= false">Hide
                            <v-icon small>mdi-chevron-double-left</v-icon>
                          </v-btn>
                        </v-col>

                      </v-row>
                    </v-sheet>
                    <v-sheet color="grey lighten-4">
                      <v-row>
                        <v-col class="px-6" cols="12">
                          <v-autocomplete
                            v-model="filterItemValue.trait_type"
                            :color="$store.state.mainColor"
                            :items="filterItemData && filterItemData.trait_type || []"
                            :loading="filterloading"
                            background-color="white"
                            clearable
                            item-text="text_no_count"
                            dense
                            hide-details
                            label="Trait Type"
                            outlined
                          >

                            <template #item="{item}">
                              <div style="max-width: 500px;" class="text-left" >
                                {{item.text_no_count}}
                              </div>
                            </template>

                          </v-autocomplete>
                        </v-col>
                        <v-col class="px-6" cols="12">
                          <v-autocomplete
                            v-model="filterItemValue.trait_ontology"
                            :color="$store.state.mainColor"
                            :items="filterItemData && filterItemData.trait_ontology || []"
                            :loading="filterloading"
                            background-color="white"
                            item-text="text_no_count"
                            clearable
                            dense
                            hide-details
                            label="Trait"
                            outlined
                          >
                            <template #item="{item}">
                              <div style="max-width: 500px;" class="text-left" >
                                {{item.text_no_count}}
                              </div>
                            </template>

                          </v-autocomplete>
                        </v-col>
                        <v-col class="px-6" cols="12">
                          <v-autocomplete
                            v-model="filterItemValue.cancer_type"
                            :color="$store.state.mainColor"
                            :items="filterItemData && filterItemData.cancer_type || []"
                            :loading="filterloading"
                            background-color="white"
                            clearable
                            dense
                            item-text="text_no_count"
                            hide-details
                            label="Cancer Type"
                            outlined
                          >
                            <template #item="{item}">
                              <div style="max-width: 500px;" class="text-left" >
                                {{item.text_no_count}}
                              </div>
                            </template>

                          </v-autocomplete>
                        </v-col>
                        <v-col class="px-6" cols="12">
                          <v-autocomplete
                            v-model="filterItemValue.tissue"
                            :color="$store.state.mainColor"
                            :items="filterItemData && filterItemData.tissue || []"
                            :loading="filterloading"
                            background-color="white"
                            clearable
                            dense
                            item-text="text_no_count"
                            hide-details
                            label="Tissue"
                            outlined
                          >
                            <template #item="{item}">
                              <div style="max-width: 500px;" class="text-left" >
                                {{item.text_no_count}}
                              </div>
                            </template>

                          </v-autocomplete>
                        </v-col>

                        <v-col class="px-6" cols="12">
                          <v-text-field
                            v-model="filterItemValue.condition"
                            :color="$store.state.mainColor"
                            :loading="filterloading"
                            background-color="white"
                            clearable
                            hide-details
                            dense
                            label="Condition(Fuzzy search)"
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col class="px-6" cols="12">
                          <v-text-field
                            v-model="filterItemValue.conclusion"
                            :color="$store.state.mainColor"
                            :loading="filterloading"
                            background-color="white"
                            clearable
                            hide-details
                            dense
                            label="Conclusion(Fuzzy search)"
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col class="px-6" cols="12">
                          <v-autocomplete
                            v-model="filterItemValue.delta_trend"
                            :color="$store.state.mainColor"
                            :items="filterItemData && filterItemData.delta_trend || []"
                            :loading="filterloading"
                            background-color="white"
                            clearable
                            item-text="text_no_count"
                            dense
                            hide-details
                            label="Delta Trend"
                            outlined
                          >
                            <template #item="{item}">
                              <div style="max-width: 500px;" class="text-left" >
                                {{item.text_no_count}}
                              </div>
                            </template>

                          </v-autocomplete>
                        </v-col>
                        <v-col class="px-6" cols="12">
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                background-color="white"
                                dense
                                :rules="[rules.pval]"
                                v-model="filterItemValue.pmin"
                                label="Min P value"
                                outlined
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                :rules="[rules.pval]"
                                background-color="white"
                                dense
                                v-model="filterItemValue.pmax"
                                label="Max P value"
                                outlined
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-spacer></v-spacer>
                        <v-col class="text-right mr-6" cols="10">
                          <v-btn
                            :color="$store.state.mainColor"
                            :loading="tableloading1"
                            dark
                            elevation="0"
                            small
                            style="text-transform: none"
                            @click="apply_filters"
                          >Apply
                          </v-btn>
                          <v-btn
                            :color="$store.state.mainColor"

                            dark
                            elevation="0"
                            small
                            style="text-transform: none"
                            @click="reset_filters"
                          >Reset
                          </v-btn>


                        </v-col>
                      </v-row>
                    </v-sheet>
                  </filter-panel>
                </v-sheet>
              </v-col>
              <v-col :cols="filterExpand == true ? 10:12">
                <v-row>
                  <v-col cols="12">
                    <v-sheet class="pa-3">
                      <delta-trend-summary></delta-trend-summary>
                      <pval-summary></pval-summary>
                      <trait-type></trait-type>
                      <legend-sex></legend-sex>
                      <open-external-link></open-external-link>

                    </v-sheet>
                  </v-col>
                </v-row>
                <v-sheet  class="px-3">
                  <vxe-toolbar ref="xToolbar1" custom export ></vxe-toolbar>
                  <vxe-pager
                    :current-page="tablePage1.currentPage"
                    :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                    :loading="tableloading1"
                    :page-size="tablePage1.pageSize"
                    :total="tablePage1.totalPage"
                    @page-change="handlePageChange1">
                  </vxe-pager>
                  <vxe-table
                    stripe
                    ref="xTable1"
                    align="left"
                    :column-config="{resizable: true}"
                    :data="tableData"
                    :loading="tableloading1"
                    :export-config="{}"
                    :print-config="{}"
                    :sort-config="{remote:true,trigger:'cell'}"
                    @sort-change = 'handleSort'
                    border
                    empty-text="Empty"
                    round
                  >
                    <vxe-column sortable  min-width="130" field="Cohort_id" title="Study"  >

                      <template #default="{row}">
                        <a
                          @click="$commonfunc.openAtNewPageStudyDetail(row.Cohort_id)"
                          style="text-decoration: none"  class="text-body-2 font-weight-bold" >{{row.Cohort_id}}</a>
                      </template>

                    </vxe-column>
                    <vxe-column field="Nmetabolite"  width="110" title="#Metabolite" :visible="false" ></vxe-column>
                    <vxe-column field="Type" title="Category" min-width="100" :visible="false" >
                      <template #default="{row}" >
                        <v-chip  dark label small  :color="row.Type == 'case vs.control group' ? 'pink' : 'teal'" >
                          {{row.Type == "case vs.control group" ? "Case vs.Control" : "Porfiling" }}
                        </v-chip>
                      </template>

                    </vxe-column >
                    <vxe-column sortable field="Trait_Ontology" title="Trait" width="250"   >
                      <template #default="{row}"  >
                          <v-tooltip  top >
                            <template v-slot:activator="{ on, attrs }">
<!--                              <div v-bind="attrs"-->
<!--                                   v-on="on">-->

                                <v-chip
                                  v-bind="attrs"
                                  v-on="on"
                                  :color="$commonfunc.getColorCodeByTraitType(row.Trait_type)"  class="text-break ma-2" label small dark
                                        @click="$commonfunc.openAtNewPageTraitDetail(row.Trait_onto_ID)"
                                > {{row.Trait_Ontology}} </v-chip>
<!--                              </div>-->
                            </template>
                            <div class="my-1 mx-2" >
                              <b>Trait type:</b><br/>{{row.Trait_type}}
                            </div>
                          </v-tooltip>
                      </template>



                    </vxe-column>

                    <vxe-column field="Condition" min-width="300" title="Condition">
                      <template #default="{row}">
                        {{ $commonfunc.capitalize( row.Condition && row.Condition.trim()) }}
                      </template>

                    </vxe-column>
                    <vxe-column  sortable field="Tissue" min-width="100"  title="Tissue"></vxe-column>
                    <vxe-column sortable field="Cancer_type" min-width="150"   title="Cancer Type">

                      <template #default="{row}"  >
                        <v-chip :color="$store.state.mainColor"   outlined class="text-break" label small dark >
                          {{row.Cancer_type}} </v-chip>
                      </template>
                    </vxe-column>
                    <vxe-column :visible="false" field="Cancer_subtype"  min-width="100" title="Cancer Subtype"></vxe-column>
                    <vxe-column min-width="150" title="Case Information">
                      <template #default="{ row }">
                        <b>Name</b>: {{ row.Case_name }}
                        <b>Age</b>: {{ row.Case_age_group }}
                        <b>Sex</b>: <v-chip v-show="row.Case_sex != null" :color="row.Case_sex =='F' ?
                      'pink':'teal'" dark label x-small> {{ row.Case_sex }}
                      </v-chip>
                        <br/>
                        <b>Size</b>: {{ row.Case_size }}
                      </template>
                    </vxe-column>
                    <vxe-column min-width="150" title="Control Information">
                      <template #default="{ row }">
                        <b>Name</b>: {{ row.Control_name }}
                        <b>Age</b>: {{ row.Control_age_group }}
                        <b>Sex</b>: <v-chip v-show="row.Control_sex != null" :color="row.Control_sex =='F' ?
                      'pink':'teal'" dark label x-small> {{ row.Control_sex }}
                      </v-chip>
                        <br/>
                        <b>Size</b>: {{ row.Control_size }}
                      </template>

                    </vxe-column>

                    <vxe-column min-width="100" :visible="false" field="Platform" title="Platform"></vxe-column>
                    <vxe-column min-width="120" field="Delta_trend" :export-method="$commonfunc.exportFuncDeltaTrends" title="Delta Trends Summary" width="190" >
                      <template #default="{ row }">
                        <percent-bar3-item :dat="row.pctTrends" ></percent-bar3-item>
                      </template>
                    </vxe-column>
                    <vxe-column min-width="120"  :export-method="$commonfunc.exportFuncPvalSummary"  width="160" title="Pval Summary">
                      <template #default="{row}">
                        <percent-bar-items-pval  :dat="row.pctPval" ></percent-bar-items-pval>
                      </template>
                    </vxe-column>
                    <vxe-column min-width="300" field="Conclusion"  title="Conclusion">

                      <template #default="{row}">

                        <span v-show="row.Conclusion != 'nan'">
                        {{  $commonfunc.capitalize( row.Conclusion && row.Conclusion.trim()) }}
                        </span>

                      </template>

                    </vxe-column>
                    <vxe-column min-width="150" field="pubmed_id"  title="Publication">
                      <template #default="{row}" >
                        <span>
                         <a class="text-body-2" style="text-decoration: none"
                            @click="$commonfunc.openAtNewPagePublicationDetail(row.pubmed_id)">{{ row.pubmed_id}}</a>

                        </span>
                        <v-icon color="blue" small @click="$commonfunc.goOuterLinkPubmed(row.pubmed_id)">mdi-share</v-icon>
                      </template>
                    </vxe-column>
<!--                    <vxe-column min-width="180" title="Disease">-->
<!--                      <template #default="{ row }">-->
<!--                        <v-chip  outlined  class="ma-1" :color="$store.state.mainColor" dark label-->
<!--                                small>-->
<!--                          {{ row.Cancer_type }}-->
<!--                        </v-chip>-->
<!--                      </template>-->
<!--                    </vxe-column>-->
                  </vxe-table>
                  <vxe-pager
                    :current-page="tablePage1.currentPage"
                    :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                    :loading="tableloading1"
                    :page-size="tablePage1.pageSize"
                    :total="tablePage1.totalPage"
                    @page-change="handlePageChange1">
                  </vxe-pager>
                </v-sheet>

              </v-col>
          </v-row>
        </v-col>

      </v-row>

    </v-sheet>
  </div>

</template>

<script>
import BreadCrumb from "./sub/breadCrumb";
import FilterPanel from "./sub/filterPanel";
import Axios from "axios";
import PercentBarItemsPval from "./sub/percentBarItemsPval";
import PercentBar3Item from "./sub/percentBarItems";
import DeltaTrendSummary from "./tableLegends/LegendDeltaTrendSummary";
import PvalSummary from "./tableLegends/LegendPvalSummary";
import TraitType from "./tableLegends/LegendTraitType";
import OpenExternalLink from "./tableLegends/LegendOpenExternalLink";
import _ from 'lodash'
import SexChip from "./sub/sexChip";
import LegendCategory from "./tableLegends/LegendCategory";
import LegendSex from "./tableLegends/LegendSex";
export default {
name: "browseStudy",
  components: {
    LegendSex,
    LegendCategory,
    SexChip,
    OpenExternalLink,
    TraitType, PvalSummary, DeltaTrendSummary, PercentBar3Item, PercentBarItemsPval, FilterPanel, BreadCrumb},
  data(){
  return{
    breadcrumbData: [
      {
        text: "Home",
        disabled: false,
        href: baseURL+"/home"
      },
      {
        text: "Browse Study",
        disabled: true,
      },
    ],
    allAlign: null,
    tableData: [],
    filterExpand: true,
    filterItemData: {},
    filterItemValue: {
      trait_type: null,
      trait_ontology: null,
      cancer_type: null,
      delta_trend: null,
      cmpdname: null,
      pmax: null,
      pmin: null,
      tissue:null,
      condition:null,
      conclusion:null,
      orderby:'studyid',
      orderdesc:false,

    },
    rules: {
      pval: function (val) {
        if (_.isNull(val)){
          return true
        }else if(_.isNaN(val)){
          return true
        }
        else{
          if ( ! _.isNull(parseFloat(val))  &&  ! _.isNaN(parseFloat(val)) && _.isNumber(parseFloat(val))){
            // console.log(parseFloat(val))
            if (parseFloat(val) >1 || parseFloat(val) <0){
              return "Please provide a number from 0 - 1"
            }else{
              return true
            }
          }else{
            return "Please provide a number"
          }
        }
      },

    },
    filterloading: false,
    tableloading1: false,
    tablePage1: {
      currentPage: 1,
      pageSize: 10,
      totalPage: 10,
    },
  }
  },
  created() {
    this.loadStudyByPage()
    this.loadFilterItems()
    // this.$nextTick(() => {
    //   this.$refs.xTable1.connect(this.$refs.xToolbar1)
    // })
  },
  methods:{
    handlePageChange1({currentPage, pageSize}) {
      this.tablePage1.currentPage = currentPage
      this.tablePage1.pageSize = pageSize
      this.loadStudyByPage()
    },
    loadStudyByPage() {
      this.tableloading1 = true
      Axios.post(
        baseURL + "/api/get_study_by_page_filter",
        {},
        {
          params: {
            pagenumber: this.tablePage1.currentPage,
            pagesize: this.tablePage1.pageSize,
            cancertype: this.filterItemValue.cancer_type,
            trait: this.filterItemValue.trait_ontology,
            traittype: this.filterItemValue.trait_type,
            trend: this.filterItemValue.delta_trend,
            pvalmax: parseFloat(this.filterItemValue.pmax) || null,
            pvalmin: parseFloat(this.filterItemValue.pmin) || null,
            tissue:this.filterItemValue.tissue,
            conclusion:this.filterItemValue.conclusion,
            condition:this.filterItemValue.condition,
            orderby:this.filterItemValue.orderby,
            orderdesc:this.filterItemValue.orderdesc
          }
        }
      ).then(res => {
        this.tableData = res.data.data;
        this.tableloading1 = false;
        this.tablePage1.totalPage = res.data.total_length;
      })
    },
    handleSort({ column, property, order, sortBy, sortList, $event }){

      // console.log(property)
      if(property == 'Cancer_type'){
        this.filterItemValue.orderby = 'cancertype'
      }else if(property == 'Cohort_id'){
        this.filterItemValue.orderby = 'studyid'
      }else if(property == 'Tissue'){
        this.filterItemValue.orderby = 'tissue'
      }else if(property == 'Trait_Ontology'){
        this.filterItemValue.orderby = 'trait'
      }
      if (order == 'asc'){
        this.filterItemValue.orderdesc = false;
      }else if (order == 'desc'){
        this.filterItemValue.orderdesc = true;
      }

      this.loadStudyByPage();

    },
    loadFilterItems() {
      this.filterloading = true;
      Axios.post(
        // baseURL + "/api/get_compound_by_page",
        baseURL + "/api/get_filter_items",
      ).then(res => {
        this.filterItemData = res.data;
        this.filterloading = false;
      })

    },
    apply_filters(){
      this.tablePage1.currentPage =1
      this.loadStudyByPage()
    },

    reset_filters(){

      this.tablePage1.currentPage =1

      this.filterItemValue = {
        trait_type: null,
        trait_ontology: null,
        cancer_type: null,
        delta_trend: null,
        cmpdname: null,
        pmax: null,
        pmin: null,
        tissue:null,
        condition:null,
        conclusion:null,
        orderby:'studyid',
        orderdesc:false,
      }
      this.loadStudyByPage()

    },
  }

}
</script>

<style scoped>

</style>
