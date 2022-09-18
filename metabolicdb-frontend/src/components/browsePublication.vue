<template>
  <v-sheet rounded class="ma-4 transparent">
    <bread-crumb :breadcrumb-data="breadcrumbData"   ></bread-crumb>

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
            <v-sheet class="pt-6  px-3 pb-6" >
              <filter-panel  style="z-index: 9999999;" >
                <v-sheet>
                  <v-row>
                    <v-col cols="12">
                      <v-sheet class="text-body-1 float-start font-weight-bold">Filters</v-sheet>

                      <v-btn
                          class="float-end"
                            :color="$store.state.mainColor"
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
                        dense
                        item-text="text_no_count"
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
                        item-text="text_no_count"
                        dense
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
                        v-model="filterItemValue.pmid"
                        :color="$store.state.mainColor"
                        :items="filterItemData && filterItemData.pmid || []"
                        :loading="filterloading"
                        background-color="white"
                        clearable
                        item-text="text_no_count"
                        dense
                        hide-details
                        label="PubMed ID"
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
                        v-model="filterItemValue.title"
                        :color="$store.state.mainColor"
                        :loading="filterloading"
                        background-color="white"
                        clearable
                        hide-details
                        dense
                        label="Title(Fuzzy search)"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col class="px-6" cols="12">
                      <v-text-field
                        v-model="filterItemValue.year"
                        :color="$store.state.mainColor"
                        :loading="filterloading"
                        background-color="white"
                        clearable
                        hide-details
                        dense
                        label="Published Year(Fuzzy search)"
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
                <v-sheet class="pa-3 ">

                <trait-type></trait-type>
                  <open-external-link></open-external-link>
                </v-sheet>
              </v-col>
            </v-row>
            <v-sheet  class="px-3">

              <vxe-toolbar  custom export ></vxe-toolbar>
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
                align="left"
                :loading="tableloading1"
                :column-config="{resizable: true}"
                :data="tableData"
                :export-config="{}"
                :print-config="{}"
                :sort-config="{remote:true,trigger:'cell'}"
                @sort-change = 'handleSort'
                border
                empty-text="Empty"
                round

              >
<!--                :sort-config="{remote:true}"-->
                <vxe-column field="Title" width="450" title="Title">
                  <template #default="{row}">
                    <a style="text-decoration: none" class="font-weight-bold text-body-2"
                       @click="$commonfunc.openAtNewPagePublicationDetail(row.PMID)"
                    >{{row.Title}}</a>

                  </template>
                </vxe-column>

                <vxe-column min-width="230" field="trait" sortable  title="Related Traits" >
                  <template #default="{row}">
                    <v-chip v-for="x in row.trait" :key="x.Trait_Ontology_ID"
                            :color="$commonfunc.getColorCodeByTraitType(x.Trait_type)"
                            :to="'/browse_trait/'+x.Trait_Ontology_ID"
                            class="ma-1" dark elevation="0" label
                            max-width="300"
                            small style="text-transform: none;word-wrap:normal;"
                    >
                      {{ x.Trait_Ontology }}
                    </v-chip>
                  </template>

                </vxe-column>

                <vxe-column
                  sortable
                  field="Cancer_type" title="Cancer type" align="center" min-width="150"  >
                  <template #default="{row}">
                    <div v-for="x in Object.keys(row.Cancer_type)" :key="x">

                    <v-chip outlined label  >{{x}}</v-chip>
                    </div>


                  </template>

                </vxe-column>
                <vxe-column min-width="500" field="conclusion"   title="Conclusions">
                  <template #default="{row}">
                    <div  v-for="x in row.conclusion" :key="x">
                      <span v-show="x != 'nan'">
                      {{ $commonfunc.capitalize(x && x.trim() || "")}}
                      </span>
                    </div>
                  </template>

                </vxe-column>

                <vxe-column field="PMID"  sortable min-width="100" title="Pubmed ID">
                  <template #default="{row}">
                    <span>{{row.PMID}}</span> <v-icon color="blue" small @click="$commonfunc.goOuterLinkPubmed(row.PMID)">mdi-share</v-icon>
                  </template>
                </vxe-column>
                <vxe-column min-width="120" field="Journal_Title"  title="Journal"></vxe-column>
                <vxe-column field="publishinfo" sortable title="Publish Information" width="160" >
                  <template #default="{row}">
                    <b>Volume:</b> {{row.Volume}}<br/>
                    <b>Issue:</b> {{row.Issue}}<br/>
                    <b>Pages:</b> {{row.Pages}}<br/>
                    <b>Date:</b> {{row.Date_of_Publication}}
                  </template>
                </vxe-column>
                <vxe-column min-width="100" field="Nmetabolite" align="center" title="#Metabolites"></vxe-column>
                <vxe-column min-width="80"  field="Nstudy"  align="center" title="#Studies"></vxe-column>

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
</template>

<script>
import BreadCrumb from "./sub/breadCrumb";
import FilterPanel from "./sub/filterPanel";
import Axios from "axios";
import TraitType from "./tableLegends/LegendTraitType";
import OpenExternalLink from "./tableLegends/LegendOpenExternalLink";
export default {
name: "browsePublication",
  components: {OpenExternalLink, TraitType, FilterPanel, BreadCrumb},
  data(){
    return{
      breadcrumbData: [
        {
          text: "Home",
          disabled: false,
          href: baseURL+"/home"
        },
        {
          text: "Browse Publication",
          disabled: true,
        },
      ],
      allAlign: null,
      filterExpand: true,
      filterItemData: {},
      filterItemValue: {
        trait_type: null,
        trait_ontology: null,
        cancer_type: null,
        conclusion:null,
        pmid:null,
        title:null,
        year:null,
        orderby:'pmid',
        orderdesc:false,
      },
      filterloading: false,
      tableData: [],
      tableloading1: false,
      tablePage1: {
        currentPage: 1,
        pageSize: 10,
        totalPage:10
      },
    }
  },
  created() {
    this.loadPublicationByPage()
    this.loadFilterItems()
  },
  methods:{
    apply_filters(){
      this.tablePage1.currentPage =1
      this.loadPublicationByPage()
    },

    reset_filters(){

      this.tablePage1.currentPage =1

      this.filterItemValue = {
        trait_type: null,
        trait_ontology: null,
        cancer_type: null,
        conclusion:null,
        title:null,
        pmid:null,
        year:null,
        orderby:'pmid',
        orderdesc:false,
      }
      this.loadPublicationByPage()

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
    handlePageChange1({currentPage, pageSize}) {
      this.tablePage1.currentPage = currentPage
      this.tablePage1.pageSize = pageSize
      this.loadPublicationByPage()
    },
    handleSort({ column, property, order, sortBy, sortList, $event }){
      if(property == 'Cancer_type'){
        this.filterItemValue.orderby = 'cancertype'
      }else if(property == 'PMID'){
        this.filterItemValue.orderby = 'pmid'
      }else if(property == 'publishinfo'){
        this.filterItemValue.orderby = 'year'
      }else if(property == 'trait'){
        this.filterItemValue.orderby = 'trait'
      }

      if (order == 'asc'){
        this.filterItemValue.orderdesc = false;
      }else if (order == 'desc'){
        this.filterItemValue.orderdesc = true;
      }

      this.loadPublicationByPage();

    },
    loadPublicationByPage() {
      this.tableloading1 = true
      Axios.post(
        baseURL + "/api/get_publication_by_page_filter",
        {},
        {
          params: {
            pagenumber: this.tablePage1.currentPage,
            pagesize: this.tablePage1.pageSize,
            pmid:this.filterItemValue.pmid,
            year:this.filterItemValue.year,
            title:this.filterItemValue.title,
            cancertype: this.filterItemValue.cancer_type,
            trait: this.filterItemValue.trait_ontology,
            traittype: this.filterItemValue.trait_type,
            conclusion:this.filterItemValue.conclusion,
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
  }
}
</script>

<style scoped>

</style>
