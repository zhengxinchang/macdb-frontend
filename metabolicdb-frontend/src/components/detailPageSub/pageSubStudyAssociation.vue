<template>
  <!--  为了Association 页面中详细展示study。-->
  <!--  因为其他详情页中的study是展示所有-->
  <!--  association的汇总，所以不适合用在这里。-->
  <!--  这里是要展示的每个study中的详细信息-->

  <v-sheet>

    <v-sheet class="pa-3 " min-height="600">
      <v-sheet>

        <legend-category></legend-category>
        <trait-type></trait-type>
        <delta-trend-summary></delta-trend-summary>
        <pval-summary></pval-summary>
        <legend-sex></legend-sex>
        <open-external-link></open-external-link>

      </v-sheet>


      <v-row class="mt-5">
        <v-col  class="my-0 py-0" cols="12">
          <v-sheet height="40">
          <v-btn class="float-start" style="text-transform: none"  @click="showFilters = ! showFilters"  v-show="!showFilters"  small dark :color="$store.state.mainColor">Filters <v-icon small>mdi-chevron-double-right</v-icon></v-btn>
          </v-sheet>
        </v-col>
        <v-col v-if="showFilters" cols="2">
          <v-sheet outlined rounded >
            <v-row class="pa-2">
              <v-col class="text-left" cols="12">
                <span class="font-weight-bold">Filters</span>
                <span class="float-end"><v-btn small elevation="0"  @click="showFilters = ! showFilters" :color="$store.state.mainColor" dark
                                               style="text-transform: none">hide <v-icon small>mdi-chevron-double-left</v-icon></v-btn></span>
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
                          v-model="filterItems.trait"
                          outlined label="Trait"
                          dense
                          :items="filterLists.trait"
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
                          v-model="filterItems.trait_type"
                          outlined label="Trait Type"
                          dense
                          :items="filterLists.trait_type"
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
                          v-model="filterItems.platform"
                          outlined label="Platform"
                          dense
                          :items="filterLists.platform"
                          multiple
                          deletable-chips small-chips
                          chips
                          hide-details
                          clearable
                          background-color="white"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="filterItems.condition"
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
                          v-model="filterItems.conclusion"
                          outlined
                          label="Conclusion (Fuzzy search)"
                          hide-details
                          clearable
                          dense
                          background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="text-right">
                      <v-btn small class=" mx-1"  @click="applyFilters" :color="$store.state.mainColor" dark style="text-transform: none">Apply</v-btn>
                      <v-btn small class=" mx-1"  @click="resetFilters" :color="$store.state.mainColor" dark style="text-transform: none">Reset</v-btn>

                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>

            </v-row>
          </v-sheet>
        </v-col>
        <v-col    :cols=" showFilters? 10 : 12">
          <v-sheet outlined rounded >
            <vxe-toolbar ref="xToolbar1S" custom export></vxe-toolbar>
<!--            <vxe-pager-->
<!--                :current-page="tablePage1.currentPage"-->
<!--                :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"-->
<!--                :loading="tableloading1"-->
<!--                :page-size="tablePage1.pageSize"-->
<!--                :total="dataLength"-->
<!--                @page-change="handlePageChange1">-->
<!--            </vxe-pager>-->

<!--            ref="xTable1S"-->
<!--            align="left"-->
<!--            :column-config="{resizable: true}"-->
<!--            :data="filteredData"-->
<!--            :export-config="{filename:'Metabolite_'+cid}"-->
<!--            :print-config="{}"-->
<!--            :loading="tableloading1"-->
<!--            border-->
<!--            empty-text="Empty"-->
<!--            round-->
<!--            max-height="800"-->
<!--            stripe-->
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
<!--              :scroll-y="{enabled: false}"-->
              <vxe-column type="seq" title="#"  sortable width="50"></vxe-column>
              <vxe-column field="Cohort_id" title="Study"  sortable width="150">
                <template #default="{row}">
                  <a style="text-decoration: none" class="font-weight-bold text-body-2"
                     @click="$commonfunc.openAtNewPageStudyDetail(row.Cohort_id)"
                  >{{ row.Cohort_id }}</a>
                </template>

              </vxe-column>
              <vxe-column field="Type" min-width="150" title="Category">
                <template #default="{row}">
                  <v-chip dark label small :color="row.Type == 'case vs.control group' ? 'pink' : 'teal'">
                    {{ row.Type == "case vs.control group" ? "Case vs.Control" : "Porfiling" }}
                  </v-chip>
                </template>
                <!--          <template #filter="{ $panel, column }">-->
                <!--            <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)">-->
                <!--          </template>-->

              </vxe-column>
              <vxe-column field="Trait" min-width="200" sortable title="Trait">
                <template #default="{row}">


                  <!--            <v-chip  dark label small  :color="$commonfunc.getColorCodeByTraitType(row.Trait_type)" >{{row.Trait}}</v-chip>-->


                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs"
                                  v-on="on">

                              <v-chip :color="$commonfunc.getColorCodeByTraitType(row.Trait_type)"
                                      class="text-break  ma-1" label small dark
                                      @click="$commonfunc.openAtNewPageTraitDetail(row.Trait_onto_ID)"
                              > {{ row.Trait_Ontology }}</v-chip>
                            </span>
                    </template>
                    <div class="my-1 mx-2">
                      <b>Trait type:</b><br/>{{ row.Trait_type }}
                    </div>
                  </v-tooltip>


                </template>

              </vxe-column>
              <!--        <vxe-column field="Trait_type" width="200" title="Trait Type">-->

              <!--        </vxe-column>-->
              <vxe-column field="Condition" title="Condition" width="280"></vxe-column>
              <vxe-column field="Tissue" sortable min-width="150" title="Tissue"></vxe-column>
              <vxe-column field="Cancer_type" min-width="160" sortable title="Cancer Type"></vxe-column>
              <vxe-column :visible="false" field="Cancer_subtype" min-width="160" title="Cancer Subtype"></vxe-column>
              <vxe-column title="Case Information" min-width="200">
                <template #default="{ row }">
                  <b>Name</b>: {{ row.Case_name }}
                  <b>Age</b>: {{ row.Case_age_group }}
                  <b>Sex</b>: <sex-chip :sex="row.Case_sex"></sex-chip>
                  <br>
                  <b>Size</b>: {{ row.Case_size }}
                </template>
              </vxe-column>
              <vxe-column title="Case Concentration" min-width="150">
                <template #header="{ column }">

                        <span>
                        {{ column.title }}</span> <span> <help-msg>
                          <div class="text-body-2">Mean(low-high)/Mean(±SD)</div>
                      </help-msg>
                      </span>


                </template>
                <template #default="{ row }">
                  <div class="text-center">
                    {{ row.case_concentration && Number(row.case_concentration).toFixed(3) || "NA" }}
                    <span v-if="row.case_concentration_low != null || row.case_concentration_high != null">({{
                        row.case_concentration_low || "?"
                      }}-{{ row.case_concentration_high || "?" }})</span>
                    <span v-else-if="row.case_confidence_interval != null">( ±{{
                        row.case_confidence_interval
                      }} )</span>
                  </div>
                </template>
              </vxe-column>
              <vxe-column title="Control Information" min-width="200">
                <template #default="{ row }">
                  <b>Name</b>: {{ row.Control_name }}
                  <b>Age</b>: {{ row.Control_age_group }}
                  <b>Sex</b>:  <sex-chip :sex="row.Control_sex"></sex-chip>
                  <br/>
                  <b>Size</b>: {{ row.Control_size }}
                </template>

              </vxe-column>
              <vxe-column field="control_concentration" title="Control Concentration" min-width="150">
                <template #header="{ column }">
                      <span>
                        {{ column.title }}</span> <span>
                        <help-msg>
                         <div class="text-body-2">Mean(low-high)/Mean(±SD)</div>
                      </help-msg>
                      </span>
                </template>
                <template #default="{ row }">
                  <div class="text-center">
                    {{ row.control_concentration && Number(row.control_concentration).toFixed(3) || "NA" }}
                    <span v-if="row.control_concentration_low != null || row.control_concentration_high != null">({{
                        row.control_concentration_low || "?"
                      }}-{{ row.control_concentration_high || "?" }})</span>
                    <span
                        v-else-if="row.control_confidence_interval != null">( ±{{
                        row.control_confidence_interval
                      }} )</span>
                  </div>
                </template>
              </vxe-column>
              <vxe-column sortable field="Platform" title="Platform" min-width="200"></vxe-column>
              <vxe-column :visible="false" field="concentration_unit" title="Unit" min-width="150"></vxe-column>
              <vxe-column field="Delta_trend" min-width="200" :export-method="$commonfunc.exportFuncDeltaTrends"
                          title="Delta Trend">
                <template #default="{ row }">
                  <v-chip
                      :color="row.Delta_trend && (row.Delta_trend.toUpperCase() =='DOWN'  ? 'teal':( row.Delta_trend.toUpperCase() == 'UP'? 'pink' :'grey' ) )  || 'grey' "
                      dark label
                      small> {{ row.Delta_trend && row.Delta_trend.toLowerCase() || "NA" }}
                  </v-chip>
                </template>

              </vxe-column>
              <vxe-column field="case_control_p-value" width="250" title="P Value">

                <template #default="{row}">

                  <v-chip small label dark class="text-body-2" :color="pvalueColor(row.p_for_sort)">
                    {{ row['case_control_p-value'] || 'NA' }}
                  </v-chip>
                </template>

              </vxe-column>
              <vxe-column field="Conclusion" title="Conclusion" min-width="300">

                <template #default="{row}">
                  <div v-if="row.Conclusion && row.Conclusion !='nan' ">
                  {{ row.Conclusion && $commonfunc.capitalize(row.Conclusion) }}
                  </div>
                </template>

              </vxe-column>

              <vxe-column field="case_control_q" min-width="150" :visible="false" title="Q Value">
              </vxe-column>


              <vxe-column field="mz" min-width="200" :visible="false" title="mz">
              </vxe-column>


              <vxe-column field="peak_position" min-width="200" :visible="false" title="Peak Position">
              </vxe-column>

              <vxe-column field="VIP" min-width="200" :visible="false" title="VIP">
              </vxe-column>

              <vxe-column field="RTs" min-width="200" :visible="false" title="RT">
              </vxe-column>

              <vxe-column field="Molecular_Formula" min-width="200" :visible="false" title="Molecular Formula">
              </vxe-column>

              <vxe-column field="FC" min-width="200" :visible="false" title="Fold Change">
              </vxe-column>

              <vxe-column field="log2FC" min-width="200" :visible="false" title="Log2 Fold Change">
              </vxe-column>


              <vxe-column field="AUC" min-width="200" :visible="false" title="AUC">
              </vxe-column>

              <vxe-column field="AUROC" min-width="200"  :visible="false" title="ROC">
              </vxe-column>

              <vxe-column field="Adduct" min-width="200"  :visible="false" title="Adduct">
              </vxe-column>
              <vxe-column field="sensitivity" min-width="200"  :visible="false" title="Sensitivity">
              </vxe-column>
              <vxe-column field="specificity" min-width="200"  :visible="false" title="Specificity">
              </vxe-column>


            </vxe-table>
<!--            <vxe-pager-->
<!--                :current-page="tablePage1.currentPage"-->
<!--                :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"-->
<!--                :loading="tableloading1"-->
<!--                :page-size="tablePage1.pageSize"-->
<!--                :total="dataLength"-->
<!--                @page-change="handlePageChange1">-->
<!--            </vxe-pager>-->
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
import TraitType from "../tableLegends/LegendTraitType";
import LegendCategory from "../tableLegends/LegendCategory";


export default {
  name: "pageSubStudyAssociation",
  components: {
    LegendCategory,
    TraitType,
    OpenExternalLink,
    LegendSex, PvalSummary, DeltaTrendSummary, SexChip, PercentBarItemsPval, PercentBar3Item, HelpMsg
  },
  props: ["cid"],
  data() {
    return {
      allAlign: null,
      tableData: [],
      dataLength: 0,
      tableloading1: false,
      filteredData:[],
      pagedData: [],
      tablePage1: {
        currentPage: 1,
        pageSize: 10,
      },
      showFilters:false,
      filterItems: {
        // 跟 filterLists 对应，选择其中的一个候选
        cancer_type: null,
        category: null,
        trait: null,
        trait_type:null,
        platform:null,
        condition:null,
        conclusion:null,
      }
    }
  },
  created() {
    this.$nextTick(() => {
      // this.$refs.xTable1S.connect(this.$refs.xToolbar1S)
    })


    let url = "/api/get_study_by_cid"

    this.tableloading1 = true;
    Axios.post(
        baseURL + url, {}, {params: {cid: this.cid}}
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
    //     data: this.filteredData,
    //     currentPage: this.tablePage1.currentPage,
    //     pageSize: this.tablePage1.pageSize
    //   }
    // },
    filterLists() {
      // 跟 filterItems 对应，提供候选
      let out = {
        cancer_type: new Set(),
        category: new Set(),
        trait: new Set(),
        trait_type: new Set(),
        platform:new Set(),
        // 添加新的 filter list
      };

      this.tableData.forEach(res => {
        out.cancer_type.add(res.Cancer_type)
        out.category.add(res.Type)
        out.trait.add(res.Trait_Ontology)
        out.trait_type.add(res.Trait_type)
        out.platform.add(res.Platform)
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
  //       this.pagedData = this.filteredData.slice(start, end)
  //     }
  //   }
  // },
  methods: {
    handlePageChange1({currentPage, pageSize}) {
      this.tablePage1.currentPage = currentPage
      this.tablePage1.pageSize = pageSize
      let start = (this.tablePage1.currentPage - 1) * this.tablePage1.pageSize;
      let end = start + this.tablePage1.pageSize
      this.pagedData = this.filteredData.slice(start, end)


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

    applyFilters(){

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
        if ( (this.filterItems.trait != null) && (this.filterItems.trait.length >0  )  && ! this.filterItems.trait.includes(item.Trait_Ontology)){
          flag = false
        }
        if ( (this.filterItems.trait_type != null) && (this.filterItems.trait_type.length >0  )  && ! this.filterItems.trait_type.includes(item.Trait_type)){
          flag = false
        }
        if ( (this.filterItems.platform != null) && (this.filterItems.platform.length >0  )  && ! this.filterItems.platform.includes(item.Platform)){
          flag = false
        }

        // 如果 item.Condition 为空，或者 不包含 condition的过滤条目，则返回false
        if ( (item.Condition == null)  || ((item.Condition != null) && (this.filterItems.condition != null) &&  ! item.Condition.includes(this.filterItems.condition.trim()))){

          flag = false
        }
        if ( (item.Conclusion == null) ||  ((item.Conclusion != null) && (this.filterItems.conclusion != null) &&   ! item.Conclusion.includes(this.filterItems.conclusion.trim()))){
          flag = false
        }
        return flag
      })

      // this.dataLength = this.filteredData.length;
      this.tableloading1 = false;
    },
    resetFilters(){
      this.filterItems = {
        // 跟 filterLists 对应，选择其中的一个候选
        cancer_type: null,
            category: null,
          trait: null,
          trait_type:null,
          platform:null,
          condition:null,
          conclusion:null,
      }

      this.applyFilters();
    }
  }


}
</script>

<style scoped>

</style>
