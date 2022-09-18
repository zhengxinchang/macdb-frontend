<template>
  <v-sheet>
    <v-sheet class="pa-3 " min-height="600">
      <v-sheet>
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
                          v-model="filterItems.Date_of_Publication"
                          outlined label="Date of Publication"
                          dense
                          :items="filterLists.Date_of_Publication"
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
                          v-model="filterItems.Journal_Title"
                          outlined label="Journal Title"
                          dense
                          deletable-chips small-chips
                          :items="filterLists.Journal_Title"
                          multiple
                          chips
                          hide-details
                          clearable
                          background-color="white"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-autocomplete
                          v-model="filterItems.PMID"
                          outlined label="PMID"
                          dense
                          deletable-chips small-chips
                          :items="filterLists.PMID"
                          multiple
                          chips
                          hide-details
                          clearable
                          background-color="white"
                      ></v-autocomplete>
                    </v-col>
<!--                    <v-col cols="12">-->
<!--                      <v-autocomplete-->
<!--                          v-model="filterItems.PMC_ID"-->
<!--                          outlined label="PMCID"-->
<!--                          dense-->
<!--                          deletable-chips small-chips-->
<!--                          :items="filterLists.PMC_ID"-->
<!--                          multiple-->
<!--                          chips-->
<!--                          hide-details-->
<!--                          clearable-->
<!--                          background-color="white"-->
<!--                      ></v-autocomplete>-->
<!--                    </v-col>-->
                    <v-col cols="12">
                      <v-text-field
                          v-model="filterItems.Title"
                          outlined
                          label="Title"
                          hide-details
                          clearable
                          dense
                          background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          v-model="filterItems.Abstract"
                          outlined
                          label="Abstract"
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
          <v-sheet  outlined>
            <vxe-toolbar ref="xToolbar1P" custom export></vxe-toolbar>
            <vxe-table
                ref="xTable1P"
                :align="allAlign"
                :column-config="{resizable: true}"
                :data="filteredData"
                :export-config="{}"
                :print-config="{}"
                :loading="tableloading1"
                border
                max-height="800"
                empty-text="Empty"
                round
                stripe
            >

              <vxe-column type="seq" title="#"  sortable width="50"></vxe-column>

              <vxe-column field="Title" width="850" title="Title" align="left" sortable>
                <template #default="{row}">
                  <a style="text-decoration: none" class="font-weight-bold text-body-2"
                     @click="$commonfunc.openAtNewPagePublicationDetail(row.PMID)">{{ row.Title }}</a>
                </template>
              </vxe-column>

              <vxe-column width="120" align="left" sortable title="Pubmed ID">
                <template #default="{row}">
                  <span>{{ row.PMID }}</span>
                  <v-icon color="blue" small
                          @click="goOuterLinkPubmed(row.PMID)"
                  >mdi-share
                  </v-icon>
                </template>
              </vxe-column>

              <vxe-column field="Cancer_type" title="Cancer type" sortable align="left" min-width="120">
                <template #default="{row}">

                    <v-chip  v-for="x in Object.keys(row.Cancer_type)" :key="x"  outlined label>{{ x }}</v-chip>


<!--                  <span >-->
<!--                    -->
<!--                  </span>-->
                </template>
              </vxe-column>

              <vxe-column field="conclusion" align="left" sortable min-width="200" title="Conclusion">
                <template #default="{row}">
                  <div v-for="item in row.conclusion" :key="item" v-if=" item  && item.trim() !='' && item.trim() !='nan'  || false">
                    {{ item && $commonfunc.capitalize(item) }}
                  </div>
                </template>
              </vxe-column>

              <vxe-column field="Journal_Title" align="left" min-width="200" sortable title="Journal"></vxe-column>

              <vxe-column title="Publish Information" align="left" width="160">
                <template #default="{row}">
                  <b>Volume:</b> {{ row.Volume }}<br/>
                  <b>Issue:</b> {{ row.Issue }}<br/>
                  <b>Pages:</b> {{ row.Pages }}
                </template>
              </vxe-column>

              <vxe-column field="Date_of_Publication" align="left"  min-width="200" title="Date of Publish" sortable>
                <template #default="{row}">
                  {{ row.Date_of_Publication }}
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
import OpenExternalLink from "../tableLegends/LegendOpenExternalLink";
import _ from "lodash";

export default {
  name: "pageSubPublication",
  components: {OpenExternalLink},
  props: ['tid', 'idtype'],
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
        Abstract: null,
        Date_of_Publication: null,
        Journal_Title: null,
        PMID: null,
        PMC_ID: null,
        Title: null,
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.xTable1P.connect(this.$refs.xToolbar1P)
    })

    let url
    if (this.idtype == "traitid") {
      url = "/api/get_publication_by_traitid"
    } else if (this.idtype == "studyid") {
      url = "/api/get_publication_by_studyid"
    } else if (this.idtype == "cid") {
      url = "/api/get_publication_by_cid"
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

    filterLists() {
      // 跟 filterItems 对应，提供候选
      let out = {
        cancer_type: new Set(),
        Abstract: new Set(),
        Date_of_Publication: new Set(),
        Journal_Title: new Set(),
        PMID: new Set(),
        PMC_ID: new Set(),
        Title: new Set(),
        // 添加新的 filter list
      };

      this.tableData.forEach(res => {
        for (let x in res.Cancer_type) {
          out.cancer_type.add(x)
        }
        out.Abstract.add(res.Abstract)
        out.Date_of_Publication.add(res.Date_of_Publication)
        out.Journal_Title.add(res.Journal_Title)
        if (res.PMC_ID != null){
          out.PMC_ID.add(res.PMC_ID)
        }
        out.PMID.add(res.PMID)

        out.Title.add(res.Title)
        // 添加新的filterlist
      })

      let out2 = {}
      for (let x in out) {
        out2[x] = Array.from(out[x])
      }
      return out2
    }
  },

  // watch:{
  //   tableDataWithPage(newval,oldval){
  //     if (newval.data != null && newval.currentPage !=null,newval.pageSize != null){
  //       let start = (this.tablePage1.currentPage -1)* this.tablePage1.pageSize;
  //       let end = start + this.tablePage1.pageSize
  //       this.pagedData= this.tableData.slice(start,end)
  //     }
  //   }
  // },
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
    applyFilters(){

      this.tableloading1 = true

      this.filteredData = this.tableData.filter(item=>{

        let flag =  true;
        // 如果 不为null,且长度大于0 并且item不在里边，则认为被过滤掉
        if ((this.filterItems.cancer_type != null) && (this.filterItems.cancer_type.length > 0) ) {

          let item_disease = Object.keys( item.Cancer_type)

          let inters = _.intersection(item_disease,this.filterItems.cancer_type)
          // console.log(inters)
          if (inters.length  == 0){
            flag = false
          }
        }

        if ( (this.filterItems.Date_of_Publication != null) && (this.filterItems.Date_of_Publication.length >0  )  && ! this.filterItems.Date_of_Publication.includes(item.Date_of_Publication)){
          flag = false
        }
        if ( (this.filterItems.PMID != null) && (this.filterItems.PMID.length >0  )  && ! this.filterItems.PMID.includes(item.PMID)){
          flag = false
        }
        if ( (this.filterItems.PMC_ID != null) && (this.filterItems.PMC_ID.length >0  )  && ! this.filterItems.PMC_ID.includes(item.PMC_ID)){
          flag = false
        }
        if ( (this.filterItems.Journal_Title != null) && (this.filterItems.Journal_Title.length >0  )  && ! this.filterItems.Journal_Title.includes(item.Journal_Title)){
          flag = false
        }

        // 如果 item.Condition 为空，或者 不包含 condition的过滤条目，则返回false
        if ( (item.Abstract == null)  || ((item.Abstract != null) && (this.filterItems.Abstract != null) &&  ! item.Abstract.includes(this.filterItems.Abstract.trim()))){

          flag = false
        }
        if ( (item.Title == null) ||  ((item.Title != null) && (this.filterItems.Title != null) &&   ! item.Title.includes(this.filterItems.Title.trim()))){
          flag = false
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
        Abstract: null,
        Date_of_Publication: null,
        Journal_Title: null,
        PMID: null,
        PMC_ID: null,
        Title: null,
      }
      this.applyFilters()
    }

  },

}
</script>

<style scoped>

</style>
