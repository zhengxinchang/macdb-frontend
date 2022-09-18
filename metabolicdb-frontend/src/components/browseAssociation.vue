<template>
  <div>
    <v-sheet class="ma-4 transparent" rounded>
      <!--      导航条-->
      <bread-crumb :breadcrumb-data="breadcrumbData"></bread-crumb>

      <v-row class="pt-3">
        <v-col>
          <v-row>
            <v-col class="text-left" cols="12">
              <!--              <v-btn @click="toggleFilterExpand">Filter</v-btn>-->
              <v-btn v-show="!filterExpand"
                     :color="$store.state.mainColor" dark elevation="0" small
                     style="text-transform: none"
                     @click="filterExpand= true">Filter
                <v-icon small>mdi-chevron-double-right</v-icon>
              </v-btn>
            </v-col>
            <v-col v-show="filterExpand" cols="2">
              <v-sheet class="pt-6  px-3 pb-6">
                <filter-panel style="z-index: 99999999">
                  <v-sheet>
                    <v-row>
                      <v-col cols="12">
                        <v-sheet class="text-body-1 float-start font-weight-bold">Filters</v-sheet>

                        <v-btn class="float-end" :color="$store.state.mainColor"
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
                          v-model="filterItemValue.cmpdname"
                          :color="$store.state.mainColor"
                          :items="filterItemData && filterItemData.cmpdname || []"
                          :loading="filterloading"
                          item-text="text"
                          background-color="white"
                          clearable
                          dense
                          filled
                          hide-details
                          label="Metabolite"
                          outlined

                        >

                          <template #item="{item}">
                              <div style="max-width: 500px;" class="text-left" >
                                {{item.text}}
                              </div>
                          </template>

                        </v-autocomplete>

                      </v-col>
                      <v-col class="px-6" cols="12">
                        <v-autocomplete
                          v-model="filterItemValue.trait_type"
                          :color="$store.state.mainColor"
                          :items="filterItemData && filterItemData.trait_type || []"
                          :loading="filterloading"
                          background-color="white"
                          clearable
                          dense
                          hide-details
                          label="Trait Type"
                          outlined
                        >
                          <template #item="{item}">
                            <div style="max-width: 500px;" class="text-left" >
                              {{item.text}}
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

                          clearable
                          dense
                          hide-details
                          label="Trait"
                          outlined
                        >
                          <template #item="{item}">
                            <div style="max-width: 500px;" class="text-left" >
                              {{item.text}}
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
                          hide-details
                          label="Cancer Type"
                          outlined
                        >
                          <template #item="{item}">
                            <div style="max-width: 500px;" class="text-left" >
                              {{item.text}}
                            </div>
                          </template>

                        </v-autocomplete>
                      </v-col>

                      <v-col class="px-6" cols="12">
                        <v-autocomplete
                          v-model="filterItemValue.delta_trend"
                          :color="$store.state.mainColor"
                          :items="filterItemData && filterItemData.delta_trend || []"
                          :loading="filterloading"
                          background-color="white"
                          clearable
                          dense
                          hide-details
                          label="Delta Trend"
                          outlined
                        >
                          <template #item="{item}">
                            <div style="max-width: 500px;" class="text-left" >
                              {{item.text}}
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
                            >


                            </v-text-field>
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
<!--                        :loading="tableloading1"-->

                      </v-col>
                    </v-row>
                  </v-sheet>
                </filter-panel>
              </v-sheet>
            </v-col>
            <v-col :cols="filterExpand == true ? 10:12">
              <v-row>
                <v-col cols="12">
                  <v-sheet class="pa-3 ">

                    <delta-trend-summary></delta-trend-summary>
                    <pval-summary></pval-summary>
                    <trait-type></trait-type>
                    <open-external-link></open-external-link>

                  </v-sheet>
                </v-col>
              </v-row>

              <v-sheet class="px-3">
                <vxe-toolbar ref="xToolbar1" custom export></vxe-toolbar>
                <vxe-pager
                  :current-page="tablePage1.currentPage"
                  :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                  :loading="tableloading1"
                  :page-size="tablePage1.pageSize"
                  :total="tablePage1.totalPage"
                  @page-change="handlePageChange1"
                >
                </vxe-pager>
                <vxe-table
                  stripe
                  ref="xTable1"
                  align="left"
                  :column-config="{resizable: true}"
                  :data="tableData"
                  :export-config="{}"
                  :loading="tableloading1"
                  :print-config="{}"
                  :sort-config="{remote:true,trigger:'cell'}"
                  @sort-change = 'handleSort'
                  border
                  empty-text="Empty"
                  round
                >

                  <vxe-column sortable field="cmpdname" min-width="200" title="Standard Name">
                    <template #header="{column}" > {{column.title}} <help-msg>Name from PubChem</help-msg>

                    </template>
                    <template #default="{ row }">
                      <a class="font-weight-bold"
                         @click="$commonfunc.openAtNewPageMetaboliteDetail(row.cid)">{{ row.cmpdname }}</a>
                    </template>
                  </vxe-column>

                  <vxe-column field="metabolite_name" min-width="200" title="Metabolite Name">
                    <template #header="{column}" > {{column.title}} <help-msg>Name from original papers</help-msg>

                    </template>
                    <template #default="{ row }">
                      <div class="font-weight-bold" v-for="x in row.metabolite_origin_names" :key="x"
                      >{{ x }}</div>
                    </template>
                  </vxe-column>

                  <vxe-column  field="cid" title="PubChem ID" width="120">
                    <template #default="{ row }">
                      <span> {{ row.cid }}</span>
                      <v-icon color="blue" small @click="goOuterLink(row.cid)">mdi-share</v-icon>
                    </template>

                  </vxe-column>

                  <vxe-column  field="NoStudy" title="#Studies" width="100">
                    <template #default="{ row}">
                      <div class="text-center">{{ row.NoStudy }}</div>
                    </template>
                  </vxe-column>
                  <vxe-column  field="NoPeople" title="#Subjects" width="120">
                    <template #header="{column}">
                      <span>{{ column.title }}</span>
                      <span>
                    <help-msg>
                  <div
                    class="textext-body-2">If the control group appears in N studies, it will be calculated N times.</div>
                    </help-msg>
                  </span>
                    </template>

                    <template #default="{ row}">
                      <div class="text-center">{{ row.NoPeople }}</div>
                    </template>
                  </vxe-column>
                  <vxe-column :export-method="$commonfunc.exportFuncDeltaTrends" field="pctTrends"
                              title="Delta Trends Summary" width="180"    >
                    <template #default="{ row }">
                      <percent-bar-items :dat="row.pctTrends"></percent-bar-items>
                    </template>
                  </vxe-column>

                  <vxe-column :export-method="$commonfunc.exportFuncPvalSummary" title="Pval Summary" width="180"  field="pctPval">
                    <template #default="{ row }">
                      <percent-bar-items-pval :dat="row.pctPval"></percent-bar-items-pval>
                    </template>
                  </vxe-column>

                  <vxe-column sortable title="Trait" width="350" field="Trait_Ontology">

                    <template #header="{column}">
                      <span>{{ column.title }}</span>
                      <span>
                    <help-msg>
                      <div> The number of cohorts in this metabolite to study the trait</div>
                    </help-msg>
                  </span>
                    </template>


                      <template #default="{row}"  >
                        <v-tooltip   top  v-for="(value,name) in row.Trait_Ontology" :key="name" >
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs"
                                 v-on="on">

                              <v-chip :color="$commonfunc.getColorCodeByTraitType(value.traitType)"  class="text-break  ma-1" label small dark
                                      @click="$commonfunc.openAtNewPageTraitDetail(value.traitOntoID)"
                              > {{name}} ({{ value.count }})</v-chip>
                            </span>
                          </template>
                          <div class="my-1 mx-2" >
                            <b>Trait type:</b><br/>{{value.traitType}}
                          </div>
                        </v-tooltip>
                      </template>


<!--                    </template>-->
                  </vxe-column>
                  <vxe-column sortable min-width="180" title="Cancer type" field="Disease">
                    <template #default="{ row }">
                      <div v-for="(value,name) in row.Disease"   :key="name">

                      <v-chip  outlined class="ma-1" :color="$store.state.mainColor" dark label
                              small>
                        {{ name }} ({{ value.count }})
                      </v-chip>
                      </div>
                    </template>
                  </vxe-column>
                </vxe-table>
                <vxe-pager
                  :current-page="tablePage1.currentPage"
                  :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                  :loading="tableloading1"
                  :page-size="tablePage1.pageSize"
                  :total="tablePage1.totalPage"
                  @page-change="handlePageChange1"
                >
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
import Axios from 'axios'
import percentBarItems from "./sub/percentBarItems";
import PercentBarItemsPval from "./sub/percentBarItemsPval";
import HelpMsg from "./sub/helpMsg";
import BreadCrumb from "./sub/breadCrumb";
import FilterPanel from "./sub/filterPanel";
import DeltaTrendSummary from "./tableLegends/LegendDeltaTrendSummary";
import PvalSummary from "./tableLegends/LegendPvalSummary";
import OpenExternalLink from "./tableLegends/LegendOpenExternalLink";
import TraitType from "./tableLegends/LegendTraitType";
import _ from 'lodash'

export default {
  name: "browseAssociation",
  components: {
    TraitType,
    OpenExternalLink,
    PvalSummary, DeltaTrendSummary, FilterPanel, BreadCrumb, HelpMsg, PercentBarItemsPval, percentBarItems
  },
  data() {
    return {
      breadcrumbData: [
        {
          text: "Home",
          disabled: false,
          href: baseURL + "/home"
        },
        {
          text: "Browse Metabolite",
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
        orderby:'cmpdname',
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

    this.loadDataByPage()
    this.loadFilterItems()
  },
  methods: {
    toggleFilterExpand() {
      this.filterExpand = !this.filterExpand;
      if (this.filterExpand == false) {
      } else {
      }
    },
    handlePageChange1({currentPage, pageSize}) {
      this.tablePage1.currentPage = currentPage
      this.tablePage1.pageSize = pageSize
      this.loadDataByPage()
    },
    openAtNewPage(cid) {
      const {href} = this.$router.resolve({
        path: `/browse_association/${cid}`
      });
      window.open(href, '_blank');
    },
    handleSort({ column, property, order, sortBy, sortList, $event }){

      // console.log(property)
      if(property == 'cmpdnamne'){
        this.filterItemValue.orderby = 'cmpdname'
      }
      // else if(property == 'cid'){
      //   this.filterItemValue.orderby = 'cid'
      // }
      else if(property == 'Trait'){
        this.filterItemValue.orderby = 'trait'
      }else if(property == 'Disease'){
        this.filterItemValue.orderby = 'cancertype'
      }
      if (order == 'asc'){
        this.filterItemValue.orderdesc = false;
      }else if (order == 'desc'){
        this.filterItemValue.orderdesc = true;
      }

      this.loadDataByPage();
    },

    loadDataByPage() {
      this.tableloading1 = true
      Axios.post(
        // baseURL + "/api/get_compound_by_page",
        baseURL + "/api/get_compound_by_page_filter",
        {},
        {
          params: {
            pagenumber: this.tablePage1.currentPage,
            pagesize: this.tablePage1.pageSize,
            cmpdname:this.filterItemValue.cmpdname && this.filterItemValue.cmpdname.replace("user_",""),
            cancertype: this.filterItemValue.cancer_type,
            trait: this.filterItemValue.trait_ontology,
            traittype: this.filterItemValue.trait_type,
            trend: this.filterItemValue.delta_trend,
            pvalmax: parseFloat(this.filterItemValue.pmax) || null,
            pvalmin: parseFloat(this.filterItemValue.pmin) || null,
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
      this.loadDataByPage()
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
          orderby:'cmpdname',
          orderdesc:false,
      }
      this.loadDataByPage()

    },
    goOuterLink(cid) {
      window.open('https://pubchem.ncbi.nlm.nih.gov/compound/' + cid, '_blank')
    },

  }
}
</script>

<style scoped>

</style>
