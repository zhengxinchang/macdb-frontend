<template>
  <div>
    <v-sheet rounded class="ma-4 transparent">
      <bread-crumb :breadcrumb-data="breadcrumbData" ></bread-crumb>

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
                          item-text="text_no_count"
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
              <v-sheet class="pa-3">
                <trait-type></trait-type>
                <legend-open-external-link></legend-open-external-link>
              </v-sheet>
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
                  stripe
                  empty-text="Empty"
                  round
                >

                  <vxe-column sortable field="Trait"   title="Trait" width="450" >
                    <template #default="{ row }">
                      <v-chip
                        @click="$commonfunc.openAtNewPageTraitDetail(row.Trait_Ontology_ID)"
                        small label dark :color="$commonfunc.getColorCodeByTraitType(row.Trait_type)">{{row.Trait_Ontology}}</v-chip>
                    </template>
                  </vxe-column>

                  <vxe-column :visible="false"  field="Trait_Ontology_ID" title="Trait Ontology ID">
                    <template #header="{column}">
                      <div class="text-center">{{column.title}}</div>
                    </template>
                    <template #default="{ row }">
                      <div class="text-center ">  {{$store.state.TraitOntoPrefix}}{{row.Trait_Ontology_ID}}</div>
                    </template>
                  </vxe-column>

                  <vxe-column  sortable field="EFO_ontology"  min-width="120" title="EFO Ontology">
                    <template #default="{ row }">
                      <div class="text-left "><a target="_blank"  :href="$commonfunc.getFullLinkEFO(row.EFO_id)" style="text-decoration: none">{{row.EFO_ontology}} <v-icon color="blue" small >mdi-share</v-icon></a>   </div>
                    </template>
                  </vxe-column>

                  <vxe-column :visible="false"  field="EFO_id" align="left" title="EFO Ontology ID">
                    <template #default="{ row }">
                      <div class="text-center ">  {{row.EFO_id}}</div>
                    </template>
                  </vxe-column>

                  <vxe-column  sortable field="Trait_type" :visible="false"  min-width="100"  title="Trait Type">
                    <template #default="{row}">
                      {{row.Trait_type}}

                    </template>
                  </vxe-column>

                  <vxe-column sortable min-width="130" field="Cancer_typeDict"  title="Cancer Type">
                    <template #default="{row}">

                      <v-chip v-if="x != 'null'" small label outlined v-for="x in Object.keys(row.Cancer_typeDict)" :key="x">{{x}} </v-chip>

                    </template>
                  </vxe-column>
                  <vxe-column  min-width="80" field="NAssociation" title="#Associations">
                    <template #header="{column}">
                      <div class="text-center">{{column.title}}</div>
                    </template>
                    <template #default="{ row }">
                      <div class="text-center "> {{ row.NAssociation}}</div>
                    </template>
                  </vxe-column>
                  <vxe-column  min-width="80" field="NStudy"  title="#Studies">
                    <template #header="{column}">
                      <div class="text-center">{{column.title}}</div>
                    </template>
                    <template #default="{ row }">
                      <div class="text-center "> {{ row.NStudy}}</div>
                    </template>
                  </vxe-column>
                  <vxe-column  min-width="80" field="NPeople" title="#Subjects">
                    <template #header="{column}">
                      <div class="text-center">{{column.title}}</div>
                    </template>
                    <template #default="{ row }">
                      <div class="text-center "> {{ row.NPeople}}</div>
                    </template>
                  </vxe-column>
                  <vxe-column min-width="120" field="NPublication"  title="Publications">
                    <template #header="{column}">
                      <div class="text-center">{{column.title}}</div>
                    </template>
                    <template #default="{ row }">

                      <div v-for="x in Object.keys(row.NPublicationDict)"
                           class="text-center "><a class="text-body-2" style="text-decoration: none"
                                                   @click="$commonfunc.openAtNewPagePublicationDetail(x)">{{ x }}</a>
                        <v-icon color="primary" small @click="$commonfunc.goOuterLinkPubmed(x)">mdi-share</v-icon>
                      </div>

<!--                      <div class="text-center "> {{ row.NPublication}}</div>-->
                    </template>
                  </vxe-column>

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
import LegendOpenExternalLink from "./tableLegends/LegendOpenExternalLink";
import Axios from "axios";
import TraitType from "./tableLegends/LegendTraitType";
export default {
name: "browseTrait",
  components: {TraitType, FilterPanel, BreadCrumb,LegendOpenExternalLink},
  data(){
  return{
    breadcrumbData: [
      {
        text: "Home",
        disabled: false,
        href: baseURL+"/home"
      },
      {
        text: "Browse Trait",
        disabled: true,
      },
      // {
      //   text: "Trait",
      //   disabled: true,
      // }
    ],
    allAlign: null,
    tableData: [],
    tableloading1: false,
    tablePage1: {
      currentPage: 1,
      pageSize: 10,
      totalPage:10
    },
    filterExpand: true,
    filterItemData: {},
    filterItemValue: {
      trait_type: null,
      trait_ontology: null,
      cancer_type: null,
      orderby:'trait',
      orderdesc:false,
    },
    filterloading: false,
  }
  },
  created() {
    this.loadTraitByPage()
    this.loadFilterItems()
    // this.$nextTick(() => {
    //   this.$refs.xTable1.connect(this.$refs.xToolbar1)
    // })
  },
  methods:{
    handlePageChange1({currentPage, pageSize}) {
      this.tablePage1.currentPage = currentPage
      this.tablePage1.pageSize = pageSize
      this.loadTraitByPage()
    },

    handleSort({ column, property, order, sortBy, sortList, $event }){
      if(property == 'Cancer_typeDict'){
        this.filterItemValue.orderby = 'cancertype'
      }else if(property == 'EFO_ontology'){
        this.filterItemValue.orderby = 'efo'
      }else if(property == 'Trait_type'){
        this.filterItemValue.orderby = 'traittype'
      }else if(property == 'Trait'){
        this.filterItemValue.orderby = 'trait'
      }

      if (order == 'asc'){
        this.filterItemValue.orderdesc = false;
      }else if (order == 'desc'){
        this.filterItemValue.orderdesc = true;
      }

      this.loadTraitByPage();

    },
    loadTraitByPage() {
      this.tableloading1 = true
      Axios.post(
        baseURL + "/api/get_trait_by_page_filter",
        {},
        {
          params: {
            pagenumber: this.tablePage1.currentPage,
            pagesize: this.tablePage1.pageSize,
            cancertype:this.filterItemValue.cancer_type,
            trait:this.filterItemValue.trait_ontology,
            traittype:this.filterItemValue.trait_type,
            orderby:this.filterItemValue.orderby,
            orderdesc:this.filterItemValue.orderdesc
          }
        }
      ).then(res => {
        this.tableData = res.data.data;
        this.tablePage1.totalPage = res.data.total_length;
        this.tableloading1 = false;
      })
    },
    apply_filters(){
      this.tablePage1.currentPage =1
      this.loadTraitByPage()
    },

    reset_filters(){
      this.tablePage1.currentPage =1
      this.filterItemValue = {
        trait_type: null,
        trait_ontology: null,
        cancer_type: null,
        orderby:'trait',
        orderdesc:false,
      }
      this.loadTraitByPage();
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
  }
}
</script>

<style scoped>

</style>
