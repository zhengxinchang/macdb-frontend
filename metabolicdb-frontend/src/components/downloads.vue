<template>
  <div>
    <v-sheet class="ma-4 transparent" rounded>

      <bread-crumb :breadcrumb-data="breadcrumbData">

      </bread-crumb>
      <v-row class="pt-3">
        <v-col>
          <v-sheet min-height="600" rounded>
            <v-row>
              <v-col col="10" offset="1">
                <v-sheet class="text-body-1 text-justify my-4">
                  <div class="text-h5 text-justify mt-2 " :color="$store.state.mainColor">Downloads Usage</div>
                  <v-sheet class="mt-6">
                    This page provides access to raw data for MACdb.
                  </v-sheet>
                </v-sheet>
              </v-col>
              <v-col cols="10" offset="1">
                <v-sheet class="my-4 text-justify">

                  <div class="text-h5 text-justify mt-2 mb-6" :color="$store.state.mainColor">Files</div>
<!--                  <v-sheet class="text-body-1 text-justify mt-6">-->
<!--                    All apis have a common base url: <span :style="{backgroundColor:$store.state.mainColor}" class="rounded mx-2 px-2 white&#45;&#45;text ">https://ngdc.cncb.ac.cn/metacancer/api/</span>-->
<!--                  </v-sheet>-->
                  <v-sheet rounded outlined class="mt-6">

                    <v-simple-table  class="mt-4 " >

                      <thead class="text-left ">
                      <tr>
                        <th class="text-body-1 font-weight-bold">File name</th>
                        <th class="text-body-1 font-weight-bold">Size</th>
                        <th class="text-body-1 font-weight-bold">Description</th>
                        <th class="text-body-1 font-weight-bold">Last update</th>
                        <th class="text-body-1 font-weight-bold">Operation</th>
                      </tr>
                      </thead>
                      <tbody class="text-left">
                      <tr v-for="item in file_stats_dat_add_info" :key="item.name">
                        <td>{{item.file_name}}</td>
                        <td>{{item.file_size}}</td>
                        <td>{{item.desc}}</td>
                        <td>{{item.lastupdate}}</td>
                        <td><a  :href="'/macdb/api/get_download_file?file_type='+item.downtype"  style="text-decoration: none">download</a></td>
                      </tr>
                      </tbody>

                    </v-simple-table>

                  </v-sheet>
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
  name: "downloads",
  components: {BreadCrumb},
  data() {
    return {
      breadcrumbData: [
        {
          text: "Home",
          disabled: false,
          href: baseURL + "/home"
        },
        {
          text: "Downloads",
          disabled: true,
        },
      ],
      file_stats_dat:null,
    }
  },
  computed:{
    file_stats_dat_add_info(){

      let res = []


      if (this.file_stats_dat != null){

        res.push(
          {
            file_name: this.file_stats_dat['metabolite'].name,
            desc:"All metabolites in MACdb database",
            file_size: this.file_stats_dat['metabolite'].size,
            lastupdate: this.file_stats_dat['metabolite'].lastupdate,
            downtype:"metabolite"
          }
        )

        res.push(
          {
            file_name: this.file_stats_dat['trait'].name,
            desc:"All traits in MACdb database",
            file_size: this.file_stats_dat['trait'].size,
            lastupdate: this.file_stats_dat['trait'].lastupdate,
            downtype:"trait"
          }
        )

        res.push(
          {
            file_name: this.file_stats_dat['study'].name,
            desc:"All studies in MACdb database",
            file_size: this.file_stats_dat['study'].size,
            lastupdate: this.file_stats_dat['study'].lastupdate,
            downtype:"study"
          }
        )

        res.push(
          {
            file_name: this.file_stats_dat['publication'].name,
            desc:"All publications in MACdb database",
            file_size: this.file_stats_dat['publication'].size,
            lastupdate: this.file_stats_dat['publication'].lastupdate,
            downtype:"publication"
          }
        )
      }

      return(res)
    }
  },
  created() {
    this.loadData()
  },
  methods:{
    loadData(){
      Axios.post(
        baseURL+"/api/get_download_stats",
      ).then(res=>{
        this.file_stats_dat = res.data
      })
    },
    // download(item){
    //
    //
    //   // var newWindow = window.open();
    //   window.open('/macdb/api/get_download_file?file_type='+item)
    //   // window.href= '/macdb/api/get_download_file?file_type='+item
    // }
  }
}
</script>

<style scoped>

</style>
