<template>
  <div>
    <v-sheet class="ma-4 transparent">
      <bread-crumb :breadcrumb-data="breadcrumbData"></bread-crumb>

      <v-row class="pt-3">
        <v-col>
          <v-sheet class="  px-3 pb-6">
              <v-row class="text-left mx-6" >
                <v-col cols="6" >
                  <div class="font-weight-bold text-body-1" >Contact Email:</div>
                  <div>sunyanling@big.ac.cn</div>
                  <div :class="headStyle" >Postal Address:</div>
                  <div>National Genomics Data Center, China National Center for Bioinformation / Beijing Institute of Genomics, Chinese Academy of Sciences</div>
                  <div>No.1 Beichen West Road</div>
                  <div>Chaoyang District, Beijing 100101</div>
                  <div>China</div>
                  <div :class="headStyle" >Project Leader:</div>
                  <div>Yanling Sun</div>
                  <div :class="headStyle" >Web Development:</div>
                  <div>Xinchang Zheng</div>
                  <div :class="headStyle" >Data Curaton (alphabet order):</div>

                  <div>Guoliang Wang</div>
                  <div>Jiani Sun</div>
                  <div>Xiaoning Chen</div>
                  <div>Xinchang Zheng</div>
                  <div>Yanling Sun</div>
                  <div>Yibo Wang</div>

                  <div :class="headStyle" >Principal Investigator:</div>
                  <div>Wenming Zhao </div>
                  <div>Yiming Bao</div>
                </v-col>
                <v-col cols="6">
                  <div class="font-weight-bold text-body-1 mb-12 pl-16" >Map</div>
                  <v-img width="70%" class="mx-auto" :src="require('../../static/imgs/address.jpg')" ></v-img>
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
  name: "contact",
  components: {BreadCrumb},
  data() {
    return {
      headStyle:["font-weight-bold","text-body-1","mt-3"],
      breadcrumbData: [
        {
          text: "Home",
          disabled: false,
          href: baseURL + "/home"
        },
        {
          text: "Contact",
          disabled: true,
        },

      ],
    }
  }
}
</script>

<style scoped>

</style>
