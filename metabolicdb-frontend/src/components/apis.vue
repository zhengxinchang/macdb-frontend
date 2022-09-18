<template>
  <div>
    <v-sheet  rounded class="ma-4 transparent">

      <bread-crumb :breadcrumb-data="breadcrumbData" >

      </bread-crumb>
      <v-row class="pt-3">
        <v-col >
          <v-sheet rounded min-height="600">
            <v-row>
              <v-col col="10" offset="1">
                <v-sheet class="text-body-1 text-justify my-4">
                  <v-sheet class="text-h5 text-justify mt-2 " :style="{color:$store.state.mainColor}">API Usage</v-sheet>
                  <v-sheet class="mt-6">MACdb provides several apis for programmatic access to its data.</v-sheet>
                </v-sheet>
              </v-col>
              <v-col cols="10" offset="1">
                <v-sheet class="my-4 text-justify">

                <v-sheet class="text-h5 text-justify mt-2 mb-6" :style="{color:$store.state.mainColor}">APIs</v-sheet>
                  <v-sheet class="text-body-1 text-justify mt-6">
                    All APIs have a common base url: <span :style="{backgroundColor:$store.state.mainColor}" class="rounded mx-2 px-2 white--text ">https://ngdc.cncb.ac.cn/macdb/api/</span>
                  </v-sheet>
                  <v-sheet rounded outlined class="mt-8">

                <v-simple-table  class="mt-4 " >

                  <thead>
                  <tr>
                    <th class="text-body-1 font-weight-bold">Api name</th>
                    <th class="text-body-1 font-weight-bold">Method</th>
                    <th class="text-body-1 font-weight-bold">Description</th>
                    <th class="text-body-1 font-weight-bold">Example</th>
                  </tr>
                  </thead>
                  <tbody>

                  <tr v-for="item in apis" :key = "item.name" class="text-left">
                    <td>{{item.name}}</td>
                    <td>{{item.method}}</td>
                    <td>{{item.description}}</td>
                    <td><a :href="'https://ngdc.cncb.ac.cn/macdb/api/'+item.example" target="_blank" style="text-decoration: none">{{item.example}}</a> </td>
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
export default {
name: "apis",
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
          text: "APIs",
          disabled: true,
        },
      ],
      apis:[
        {
          name:"/get_one_compund_by_cid?cid=[cid]",
          method:"GET",
          description:"Query compound by pubchem cid",
          example:"/get_one_compund_by_cid?cid=442031"
        },{
          name:"/get_study_by_studyid?sid=[sid]",
          method:"GET",
          description:"Query study by study sid",
          example:"/get_study_by_studyid?sid=METAC_369"
        },{
          name:"/get_trait_by_traitid?traitid=[traitid]",
          method:"GET",
          description:"Query trait by trait id",
          example:"/get_trait_by_traitid?traitid=112"
        },{
          name:"/get_publication_by_pmid?pmid=[pmid]",
          method:"GET",
          description:"Query compound by pubmed pmid",
          example:"/get_publication_by_pmid?pmid=18563297"
        },
      ]
}
}
}
</script>

<style scoped>

</style>
