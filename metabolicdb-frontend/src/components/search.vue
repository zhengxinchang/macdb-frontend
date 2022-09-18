<template>
  <div>
    <v-sheet  rounded class="ma-4 transparent">

      <bread-crumb :breadcrumb-data="breadcrumbData" >

      </bread-crumb>

      <v-row class="pt-3">
        <v-col>
          <v-sheet>
            <v-row>
              <v-col cols="12">
                <v-sheet class="text-left text-h4 px-4 py-6">Search Term: {{$route.query.searchTerm}}</v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" >
                <v-sheet class="text-left px-4 text-h6 py-3">
                  Indroduction
                </v-sheet>
                <v-sheet class="text-left px-4 pt-3">
                  <v-icon>mdi-menu-right</v-icon> Fuzzy matching is used to mapping the searching item onto Metabolite, Trait, Study and Publication levels. Please look for detailed searching items and its corresponding level on
                  MACdb help page <a style="text-decoration: none" target="_blank" href="https://ngdc.cncb.ac.cn/macdb/docs2/">(3.1.2 Home page searching)</a>.
                </v-sheet>
                <v-sheet class="text-left px-4 pb-3">
                  <v-icon>mdi-menu-right</v-icon> Exact match filters are available at browse pages.
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                  <v-sheet class="mx-4 pa-4" outlined rounded>

                    <v-tabs
                      v-model="tab"
                      :color="$store.state.mainColor"
                      align-with-title
                    >
                      <v-tabs-slider :color="$store.state.mainColor"></v-tabs-slider>

                      <v-tab
                        style="text-transform: none;"
                      >
                        Metabolites &nbsp; <v-chip v-show="!loading.metabolite" small outlined :color=" dat.metabolite && dat.metabolite.length >0 ? $store.state.mainColor :  'grey lighten-2'"  >{{pagination.metabolite.totalPage}}</v-chip>
                        <v-icon v-show="loading.metabolite" color="grey lighten-2" >mdi-loading</v-icon>
                      </v-tab>

                      <v-tab
                        style="text-transform: none;"
                      >
                        Traits &nbsp; <v-chip v-show="!loading.trait" small outlined :color=" dat.trait && dat.trait.length >0 ? $store.state.mainColor : 'grey lighten-2'"   >{{pagination.trait.totalPage}}</v-chip>
                        <v-icon v-show="loading.trait" color="grey lighten-2" >mdi-loading</v-icon>
                      </v-tab>

                      <v-tab
                        style="text-transform: none;"
                      >
                        Studies &nbsp; <v-chip v-show="!loading.study" small outlined :color=" dat.study && dat.study.length >0 ? $store.state.mainColor :  'grey lighten-2'"   >{{pagination.study.totalPage}}</v-chip>
                        <v-icon v-show="loading.study" color="grey lighten-2" >mdi-loading</v-icon>
                      </v-tab>

                      <v-tab
                        style="text-transform: none;"
                      >
                        Publications &nbsp; <v-chip v-show="!loading.publication" small outlined :color=" dat.publication && dat.publication.length >0 ? $store.state.mainColor :  'grey lighten-2'"   >{{pagination.publication.totalPage}}</v-chip>
                        <v-icon v-show="loading.publication" color="grey lighten-2" >mdi-loading</v-icon>
                      </v-tab>
                    </v-tabs>


                    <v-tabs-items v-model="tab">
                      <v-tab-item
                      >
                        <v-card flat>
                          <v-card-text>

                            <vxe-toolbar  custom export ></vxe-toolbar>
                            <vxe-pager
                              :current-page="pagination.metabolite.currentPage"
                              :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                              :loading="loading.metabolite"
                              :page-size="pagination.metabolite.pageSize"
                              :total="pagination.metabolite.totalPage"
                              @page-change="handlePageChangeMetabolite">
                            </vxe-pager>

                            <vxe-table
                              stripe
                              :align="null"
                              :loading="loading.metabolite"
                              :column-config="{resizable: true}"
                              :data="dat.metabolite"
                              :export-config="{}"
                              :print-config="{}"
                              border
                              empty-text="Empty"
                              round
                            >
                              <vxe-column field="cid" width="450" title="PubChem ID">
                                <template #default="{row}">
                                  <a style="text-decoration: none" class="font-weight-bold text-body-2"
                                     @click="$commonfunc.openAtNewPageMetaboliteDetail(row.cid)"
                                  >{{row.cid}}</a>

                                </template>
                              </vxe-column>
                              <vxe-column field="cmpdname"  title="Metabolite standard name" ></vxe-column>
                            </vxe-table>
                            <vxe-pager
                              :current-page="pagination.metabolite.currentPage"
                              :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                              :loading="loading.metabolite"
                              :page-size="pagination.metabolite.pageSize"
                              :total="pagination.metabolite.totalPage"
                              @page-change="handlePageChangeMetabolite">
                            </vxe-pager>


                          </v-card-text>
                        </v-card>
                      </v-tab-item>

                      <v-tab-item
                      >
                        <v-card flat>
                          <v-card-text>

                            <vxe-toolbar  custom export ></vxe-toolbar>
                            <vxe-pager
                              :current-page="pagination.trait.currentPage"
                              :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                              :loading="loading.trait"
                              :page-size="pagination.trait.pageSize"
                              :total="pagination.trait.totalPage"
                              @page-change="handlePageChangeTrait">
                            </vxe-pager>
                            <vxe-table
                              stripe
                              :align="null"
                              :loading="loading.trait"
                              :column-config="{resizable: true}"
                              :data="dat.trait"
                              :export-config="{}"
                              :print-config="{}"
                              border
                              empty-text="Empty"
                              round
                            >
                              <vxe-column field="Trait_Ontology" width="450" title="Trait">
                                <template #default="{row}">
                                  <a style="text-decoration: none" class="font-weight-bold text-body-2"
                                     @click="$commonfunc.openAtNewPageTraitDetail(row.Trait_Ontology_ID)"
                                  >{{row.Trait_Ontology}}</a>

                                </template>
                              </vxe-column>
                              <vxe-column field="Trait_type"  title="Trait type" ></vxe-column>
                            </vxe-table>
                            <vxe-pager
                              :current-page="pagination.trait.currentPage"
                              :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                              :loading="loading.trait"
                              :page-size="pagination.trait.pageSize"
                              :total="pagination.trait.totalPage"
                              @page-change="handlePageChangeTrait">
                            </vxe-pager>



                          </v-card-text>
                        </v-card>
                      </v-tab-item>

                      <v-tab-item
                      >
                        <v-card flat>
                          <v-card-text>
                            <vxe-toolbar  custom export ></vxe-toolbar>
                            <vxe-pager
                              :current-page="pagination.study.currentPage"
                              :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                              :loading="loading.study"
                              :page-size="pagination.study.pageSize"
                              :total="pagination.study.totalPage"
                              @page-change="handlePageChangeStudy">
                            </vxe-pager>
                            <vxe-table
                              stripe
                              :align="null"
                              :loading="loading.study"
                              :column-config="{resizable: true}"
                              :data="dat.study"
                              :export-config="{}"
                              :print-config="{}"
                              border
                              empty-text="Empty"
                              round
                            >
                              <vxe-column field="Cohort_id" width="450" title="Study">
                                <template #default="{row}">
                                  <a style="text-decoration: none" class="font-weight-bold text-body-2"
                                     @click="$commonfunc.openAtNewPageStudyDetail(row.Cohort_id)"
                                  >{{row.Cohort_id}}</a>
                                </template>
                              </vxe-column>
                              <vxe-column field="Condition"  title="Condition" ></vxe-column>
                              <vxe-column field="Conclusion"  title="Conclusion" ></vxe-column>
                            </vxe-table>
                            <vxe-pager
                              :current-page="pagination.study.currentPage"
                              :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                              :loading="loading.study"
                              :page-size="pagination.study.pageSize"
                              :total="pagination.study.totalPage"
                              @page-change="handlePageChangeStudy">
                            </vxe-pager>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                      <v-tab-item
                      >
                        <v-card flat>
                          <v-card-text>

                            <vxe-toolbar  custom export ></vxe-toolbar>
                            <vxe-pager
                              :current-page="pagination.publication.currentPage"
                              :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                              :loading="loading.publication"
                              :page-size="pagination.publication.pageSize"
                              :total="pagination.publication.totalPage"
                              @page-change="handlePageChangePublication">
                            </vxe-pager>
                            <vxe-table
                              stripe
                              :align="null"
                              :loading="loading.publication"
                              :column-config="{resizable: true}"
                              :data="dat.publication"
                              :export-config="{}"
                              :print-config="{}"
                              border
                              empty-text="Empty"
                              round
                            >
                              <vxe-column field="PMID" width="450" title="PubMed ID">
                                <template #default="{row}">
                                  <a style="text-decoration: none" class="font-weight-bold text-body-2"
                                     @click="$commonfunc.openAtNewPagePublicationDetail(row.PMID)"
                                  >{{row.PMID}}</a>

                                </template>
                              </vxe-column>
                              <vxe-column field="Title"  title="Title" ></vxe-column>
                            </vxe-table>
                            <vxe-pager
                              :current-page="pagination.publication.currentPage"
                              :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                              :loading="loading.publication"
                              :page-size="pagination.publication.pageSize"
                              :total="pagination.publication.totalPage"
                              @page-change="handlePageChangePublication">
                            </vxe-pager>



                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs-items>

                  </v-sheet>


            </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>

    </v-sheet>
  </div>
</template>

<script>
import BreadCrumb from "./sub/breadCrumb";
import Axios from 'axios'

export default {
  name: "search",
  // props:["searchterm"],
  components: {BreadCrumb},
  data(){
    return{
      breadcrumbData: [
        {
          text: "Home",
          disabled: false,
          href: baseURL + "/home"
        },
        {
          text: "Search",
          disabled: true,
        },
      ],
      tab: null,
      searchterm:this.$route.query.searchTerm,
      loading:{
        metabolite:false,
        trait:false,
        study:false,
        publication:false,
      },
      dat:{
        metabolite:[],
        trait:[],
        study:[],
        publication:[]
      },
      pagination:{
        metabolite:{
          currentPage:1,
          pageSize: 10,
          totalPage:10
        },

        trait:{
          currentPage:1,
          pageSize: 10,
          totalPage:10
        },

        study:{
          currentPage:1,
          pageSize: 10,
          totalPage:10
        },

        publication:{
          currentPage:1,
          pageSize: 10,
          totalPage:10
        },
      }
    }
  },

  created() {

  this.loadMetaboliteSearch();
  this.loadTraitSearch();
  this.loadStudySearch();
  this.loadPublicationSearch();
  },

  methods:{
    loadMetaboliteSearch(){
      this.loading.metabolite = true;
      Axios.post(
        baseURL + "/api/search",
        {},{
          params:{
            term: this.searchterm,
            search_type :"metabolite",
            pageNumber:this.pagination.metabolite.currentPage,
            pageSize:this.pagination.metabolite.pageSize,
          }
        }
      ).then(res => {
        this.dat.metabolite = res.data.data;
        this.pagination.metabolite.totalPage = res.data.total_length && res.data.total_length.count ;
        this.loading.metabolite = false;
      })

    },

    handlePageChangeMetabolite({currentPage, pageSize}) {
      this.pagination.metabolite.currentPage = currentPage;
      this.pagination.metabolite.pageSize = pageSize;
      this.loadMetaboliteSearch()
    },

    loadTraitSearch(){
      this.loading.trait = true;
      Axios.post(
        baseURL + "/api/search",
        {},{
          params:{
            term: this.searchterm,
            search_type :"trait",
            pageNumber:this.pagination.trait.currentPage,
            pageSize:this.pagination.trait.pageSize,
          }
        }
      ).then(res => {
        this.dat.trait = res.data.data;
        this.pagination.trait.totalPage =  res.data.total_length && res.data.total_length.count;
        this.loading.trait = false;
      })

    },
    handlePageChangeTrait({currentPage, pageSize}) {
      this.pagination.trait.currentPage = currentPage;
      this.pagination.trait.pageSize = pageSize;
      this.loadTraitSearch()
    },

    loadStudySearch(){
      this.loading.study = true;
      Axios.post(
        baseURL + "/api/search",
        {},{
          params:{
            term: this.searchterm,
            search_type :"study",
            pageNumber:this.pagination.study.currentPage,
            pageSize:this.pagination.study.pageSize,
          }
        }
      ).then(res => {
        this.dat.study = res.data.data;
        this.pagination.study.totalPage =  res.data.total_length && res.data.total_length.count;
        this.loading.study = false;
      })

    },
    handlePageChangeStudy({currentPage, pageSize}) {
      this.pagination.study.currentPage = currentPage;
      this.pagination.study.pageSize = pageSize;
      this.loadStudySearch()
    },

    loadPublicationSearch(){

      this.loading.publication = true;
      Axios.post(
        baseURL + "/api/search",
        {},{
          params:{
            term: this.searchterm,
            search_type :"paper",
            pageNumber:this.pagination.publication.currentPage,
            pageSize:this.pagination.publication.pageSize,
          }
        }
      ).then(res => {
        this.dat.publication = res.data.data;
        this.pagination.publication.totalPage =  res.data.total_length && res.data.total_length.count;
        this.loading.publication = false;
      })
    },

    handlePageChangePublication({currentPage, pageSize}) {
      this.pagination.publication.currentPage = currentPage;
      this.pagination.publication.pageSize = pageSize;
      this.loadPublicationSearch()
    },


  }
}
</script>

<style scoped>

</style>
