<template>
  <div>
    <v-sheet class="ma-4 transparent" rounded>

      <bread-crumb :breadcrumb-data="breadcrumbData">

      </bread-crumb>

      <v-row class="pt-3">
        <v-col>
          <v-sheet min-height="600" class="mb-4" rounded>
            <v-row>
              <v-col cols="10"  offset="1">
              <v-sheet class="my-8">

              <tools-network></tools-network>
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
import ToolsNetwork from "./toolsNetwork";
export default {
  name: "knowledgeGraph",
  components: {ToolsNetwork, BreadCrumb},
  data(){
    return{
      breadcrumbData:[
        {
          text: "Home",
          disabled: false,
          href: baseURL + "/home"
        },
        {
          text: "Knowledge Graph",
          disabled: true,
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>
