<template>
  <v-sheet >
    <v-sheet  class="pa-3" min-height="600">
      <v-sheet >
        <delta-trend-summary></delta-trend-summary>
        <pval-summary></pval-summary>
        <legend-open-external-link></legend-open-external-link>
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
                          v-model="filterItems.cmpdname"
                          outlined label="Metabolite Name"
                          dense
                          :items="filterLists.cmpdname"
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
                          v-model="filterItems.cid"
                          outlined label="PubChem CID"
                          dense
                          deletable-chips small-chips
                          :items="filterLists.cid"
                          multiple
                          chips
                          hide-details
                          clearable
                          background-color="white"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model.number="filterItems.numStudy"
                          outlined label="Min Number of Study"
                          dense
                          class="centered-input"
                          hide-details
                          append-icon="mdi-plus"
                          @click:append="manipulateNumberStudy('plus')"
                          prepend-inner-icon="mdi-minus"
                          @click:prepend-inner="manipulateNumberStudy('minus')"
                          background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model.number="filterItems.numPeople"
                          outlined label="Min Number of People"
                          dense
                          hide-details

                          class="centered-input"
                          append-icon="mdi-plus"
                          @click:append="manipulateNumberPeople('plus')"
                          prepend-inner-icon="mdi-minus"
                          @click:prepend-inner="manipulateNumberPeople('minus')"
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
          <v-sheet  outlined>
            <vxe-toolbar ref="xToolbar1A"  custom export  ></vxe-toolbar>
            <!--        <vxe-pager-->
            <!--          :current-page="tablePage2.currentPage"-->
            <!--          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"-->
            <!--          :loading="tableloading2"-->
            <!--          :page-size="tablePage2.pageSize"-->
            <!--          :total="dataLength"-->
            <!--          @page-change="handlePageChange1">-->
            <!--        </vxe-pager>-->
            <vxe-table
                ref="xTable1A"
                :align="allAlign"
                :column-config="{resizable: true}"
                :data="filteredData"
                :export-config="{}"
                :print-config="{}"
                :loading="tableloading2"
                border
                empty-text="Empty"
                round
                max-height="800"
                stripe
            >
              <vxe-column type="seq" title="#"  sortable width="50"></vxe-column>
              <vxe-column field="cmpdname" title="Standard Name"   align="left" sortable >
                <template #header="{column}" > {{column.title}} <help-msg>Name from PubChem</help-msg>

                </template>

                <template #default="{ row }">
                  <!--            <a class="font-weight-bold"-->
                  <!--               @click="$router.push('/browse_association/'+row.cid)">{{ row.cmpdname }}</a>            、-->
                  <a class="font-weight-bold"
                     @click="$commonfunc.openAtNewPageMetaboliteDetail(row.cid)">{{ row.cmpdname }}</a>
                </template>
              </vxe-column>

              <vxe-column field="metabolite_name"   align="left" title="Metabolite Name" sortable >
                <template #header="{column}" > {{column.title}} <help-msg>Name from original paper</help-msg>

                </template>

                <template #default="{ row }">

                  <div v-for="item in Object.keys(row.metabolite_name)":key="item">{{item}}</div>


                </template>
              </vxe-column>


              <vxe-column field="cid" title="PubChem ID"  align="left"  sortable width="120">
                <template #default="{ row }">
                  <span> {{ row.cid }}</span>
                  <v-icon color="blue" small @click="goOuterLink(row.cid)">mdi-share</v-icon>
                </template>

              </vxe-column>

              <vxe-column field="NoStudy" title="#Studies"   align="left" width="80" sortable>
                <template #default="{ row}">
                  <div class="text-center">{{ row.NoStudy }}</div>
                </template>
              </vxe-column>
              <vxe-column field="NoPeople" title="#Subjects"   align="left" width="100" sortable>
                <template #header="{column}">
                  <span>{{ column.title }}</span>
                  <span>
                    <help-msg>
                  <div class="textext-body-2">If the control group appears in N studies, it will be calculated N times.</div>
                    </help-msg>
                  </span>
                </template>

                <template #default="{ row}">
                  <div class="text-center">{{ row.NoPeople }}</div>
                </template>
              </vxe-column>
              <vxe-column :export-method="$commonfunc.exportFuncDeltaTrends" field="pctTrends"     title="Delta Trends Summary" width="180" >
                <template #default="{ row }">
                  <percent-bar-items :dat="row.pctTrends"></percent-bar-items>
                </template>
              </vxe-column>

              <vxe-column :export-method="$commonfunc.exportFuncPvalSummary" field="pctPval"     title="Pval Summary" width="180" >
                <template #default="{ row }">
                  <percent-bar-items-pval :dat="row.pctPval"></percent-bar-items-pval>
                </template>
              </vxe-column>
              <vxe-column title="Cancer Type" field="Disease"   align="left" sortable>
                <template #default="{ row }">
                  <v-chip v-for="(value,name) in row.Disease" :key="name" class="ma-1"  outlined  label small>
                    {{ name }} ({{ value.count }})
                  </v-chip>
                </template>
              </vxe-column>
            </vxe-table>
            <!--        <vxe-pager-->
            <!--          :current-page="tablePage2.currentPage"-->
            <!--          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"-->
            <!--          :loading="tableloading2"-->
            <!--          :page-size="tablePage2.pageSize"-->
            <!--          :total="dataLength"-->
            <!--          @page-change="handlePageChange1">-->
            <!--        </vxe-pager>-->
          </v-sheet>

        </v-col>

      </v-row>


    </v-sheet>

  </v-sheet>

</template>

<script>
import percentBarItems from "../sub/percentBarItems";
import PercentBarItemsPval from "../sub/percentBarItemsPval";
import HelpMsg from "../sub/helpMsg";
import Axios from "axios";
import DeltaTrendSummary from "../tableLegends/LegendDeltaTrendSummary";
import PvalSummary from "../tableLegends/LegendPvalSummary";
import OpenExternalLink from "../tableLegends/LegendOpenExternalLink";
import LegendOpenExternalLink from "../tableLegends/LegendOpenExternalLink";
import _ from 'lodash'

export default {
name: "pageSubAssociation",
  components: {OpenExternalLink, PvalSummary, DeltaTrendSummary, HelpMsg, PercentBarItemsPval, percentBarItems,LegendOpenExternalLink},
  props:["tid","idtype"],
  data() {
    return {
      allAlign: null,
      tableData:[],
      dataLength:0,
      tableloading2: false,
      pagedData:[],
      tablePage2: {
        currentPage: 1,
        pageSize: 10,
      },
      filteredData:[],
      showFilters:false,
      filterItems: {
        // 跟 filterLists 对应，选择其中的一个候选
        cancer_type: null,
        cmpdname: null,
        cid:null,
        numStudy:1,
        numPeople:1,
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.xTable1A.connect(this.$refs.xToolbar1A)
    })

    let url
    if (this.idtype=="traitid"){
      url = "/api/get_compund_by_traitid"
    } else if(this.idtype=="studyid"){
      url = "/api/get_compund_by_studyid"
    } else if (this.idtype='pmid'){
      url = "/api/get_compund_by_pmid"
    }
    this.tableloading2 = true;
    Axios.post(
      baseURL+url,{},{params:{tid:this.tid}}
    ).then(res=>{
      this.tableData = res.data
      this.filteredData = this.tableData;
      this.dataLength = res.data.length;
      this.tableloading2 = false;
    })
  },

  // watch:{
  //   tableDataWithPage(newval,oldval){
  //     if (newval.data != null && newval.currentPage !=null,newval.pageSize != null){
  //       let start = (this.tablePage2.currentPage -1)* this.tablePage2.pageSize;
  //       let end = start + this.tablePage2.pageSize
  //       this.pagedData= this.tableData.slice(start,end)
  //     }
  //   }
  // },
  computed:{
    // tableDataWithPage(){
    //   return{
    //     data:this.tableData,
    //     currentPage:this.tablePage2.currentPage,
    //     pageSize:this.tablePage2.pageSize
    //   }
    // },
    filterLists() {
      // 跟 filterItems 对应，提供候选
      let out = {
        cancer_type: new Set(),
        cmpdname: new Set(),
        cid: new Set(),
        // 添加新的 filter list
      };

      this.tableData.forEach(res => {
        for (let x in res.Disease){
           out.cancer_type.add(x)
        }
        out.cmpdname.add(res.cmpdname)
        out.cid.add(res.cid)
        // 添加新的filterlist
      })

      let out2 = {}
      for (let x in out) {
        out2[x] = Array.from(out[x])
      }
      return out2
    }
  },
  methods:{
    handlePageChange1({currentPage, pageSize}) {
      this.tablePage2.currentPage = currentPage
      this.tablePage2.pageSize = pageSize
      let start = (this.tablePage2.currentPage -1)* this.tablePage2.pageSize;
      let end = start + this.tablePage2.pageSize
      this.pagedData= this.tableData.slice(start,end)
    },
    goOuterLink(cid) {
      window.open('https://pubchem.ncbi.nlm.nih.gov/compound/' + cid, '_blank')
    },
    manipulateNumberStudy(type){
      if(type=="plus"){
        this.filterItems.numStudy +=1

      }
      if(type=="minus"){
        this.filterItems.numStudy <=1 ? (this.filterItems.numStudy =1) : (this.filterItems.numStudy -=1)


      }
    },
    manipulateNumberPeople(type){
      if(type=="plus"){
        this.filterItems.numPeople +=1
      }
      if(type=="minus"){
        // this.filterItems.numPeople -=1
        this.filterItems.numPeople <=1 ? (this.filterItems.numPeople =1) : (this.filterItems.numPeople -=1)
      }
    },
    applyFilters(){
      this.tableloading2 = true;


      this.filteredData = this.tableData.filter(item=> {
        let flag = true;

        // 如果 不为null,且长度大于0 并且item不在里边，则认为被过滤掉
        if ((this.filterItems.cancer_type != null) && (this.filterItems.cancer_type.length > 0) ) {

          let item_disease = Object.keys( item.Disease)

          let inters = _.intersection(item_disease,this.filterItems.cancer_type)

          if (inters.length  == 0){
            flag = false
          }

        }



        if ( (this.filterItems.cmpdname != null) && (this.filterItems.cmpdname.length >0  )  && ! this.filterItems.cmpdname.includes(item.cmpdname)){
          flag = false
        }

        if ( (this.filterItems.cid != null) && (this.filterItems.cid.length >0  )  && ! this.filterItems.cid.includes(item.cid)){
          flag = false
        }


        if( (this.filterItems.numStudy != null) && (  _.isNumber(this.filterItems.numStudy) ) ){
          if (this.filterItems.numStudy > item.NoStudy){
            flag = false;
          }
        }


        if( (this.filterItems.numPeople != null) && (  _.isNumber(this.filterItems.numPeople) ) ){
          if (this.filterItems.numPeople > item.NoPeople){
            flag = false;
          }
        }

      return flag;
      })


      this.tableloading2 = false;
    },
    resetFilters(){
      this.filterItems= {
        // 跟 filterLists 对应，选择其中的一个候选
        cancer_type: null,
        cmpdname: null,
        cid:null,
        numStudy:1,
        numPeople:1,
      }
      this.applyFilters()
    }

  }
}
</script>

<style scoped>
.centered-input   >>> input {
  text-align: center;
}
</style>
