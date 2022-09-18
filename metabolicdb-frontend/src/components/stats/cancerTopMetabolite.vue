<template>
<div class="px-4">
  <v-row>
    <v-col cols="3"  v-for="item in dat" :key="item.cancer" >
      <v-card
        elevation="0"
        outlined
      >
        <v-card-title class=" font-weight-bold text-h6" >
          {{ Capitalize(item.cancer)  }}
        </v-card-title>

        <v-divider></v-divider>

        <v-list dense  height="250" class="overflow-y-auto">
          <v-list-item v-if="item.top1 != null" @click="$commonfunc.openAtNewPageMetaboliteDetail(item.top1.cid)" >
            <v-list-item-icon><v-icon>mdi-menu-right</v-icon></v-list-item-icon>
            <v-list-item-content class="text-left " >

              {{ item.top1 && item.top1.cmpdname || "" }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.top2 != null" @click="$commonfunc.openAtNewPageMetaboliteDetail(item.top2.cid)" >
            <v-list-item-icon><v-icon>mdi-menu-right</v-icon></v-list-item-icon>
            <v-list-item-content class="text-left" >
              {{ item.top2 && item.top2.cmpdname || "" }}
<!--              ({{item.top2 && item.top2.cid || ""}})-->
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.top3 != null"  @click="$commonfunc.openAtNewPageMetaboliteDetail(item.top3.cid)">
            <v-list-item-icon><v-icon>mdi-menu-right</v-icon></v-list-item-icon>
            <v-list-item-content class="text-left" >
              {{ item.top3 && item.top3.cmpdname || "" }}
<!--              ({{item.top3 && item.top3.cid || ""}})-->
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.top4 != null"  @click="$commonfunc.openAtNewPageMetaboliteDetail(item.top4.cid)">
            <v-list-item-icon><v-icon>mdi-menu-right</v-icon></v-list-item-icon>
            <v-list-item-content class="text-left" >
              {{ item.top4 && item.top4.cmpdname || "" }}
<!--              ({{item.top4 && item.top4.cid || ""}})-->
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="item.top5 != null"  @click="$commonfunc.openAtNewPageMetaboliteDetail(item.top5.cid)">
            <v-list-item-icon><v-icon>mdi-menu-right</v-icon></v-list-item-icon>
            <v-list-item-content class="text-left" >
              {{ item.top5 && item.top5.cmpdname || "" }}
<!--              ({{item.top5 && item.top5.cid || ""}})-->
            </v-list-item-content>
          </v-list-item>

        </v-list>

      </v-card>
    </v-col>
  </v-row>

</div>
</template>

<script>
import Axios from "axios";
import _ from 'lodash'
export default {
name: "cancerTopMetabolite",
  data() {
    return {
      dat: [],
    }
  },
  mounted() {

    this.loadData();

  },
  methods:{
    loadData() {
      Axios.post(
        baseURL + "/api/get_stats_data_total",
      ).then(res => {
        this.dat = res.data.cancer_top_metabolite;

      })
    },
    Capitalize(t){
      return _.capitalize(t)
    }
  }
}
</script>

<style scoped>

</style>
