<template>
  <v-container class="container--fluid pa-6" >
    <v-row>
      <v-col class="pa-0" cols="12">
        <v-sheet :style="{
           background: 'url('+bannerimg+')',

           paddingBottom:'10px',
           marginTop:'38px',
           marginLeft:'10px',
           marginRight:'10px',
           backgroundPosition: '50% -10px',
           backgroundSize:'115%',
           borderRadius: '5px 5px 5px 5px',
           }"
                 class="mb-4"
        >

          <v-row>

            <v-col class="mt-2" lg="12" md="12" sm="12">

              <v-sheet class="z-transparent pt-8 pb-3">
                <v-row align="center">
                  <!--                  <v-col cols="3">-->
                  <!--                    <span class="text-h2  pt-8 font-weight-bold white&#45;&#45;text" style="line-height: 65px;">-->
                  <!--                         <v-img :src="logo" aspect-ratio="16/9" contain height="120"></v-img>-->
                  <!--                    </span>-->
                  <!--                  </v-col>-->
                  <v-col cols="12">
                     <span class="pb-4 white--text" style="font-size: 0">

                    <span class="white--text text-h3 ">M</span>
                    <span class="white--text darken-4 text-h3 ">A</span>
                    <span class="white--text text-h3 ">C</span>
                    <span class="white--text text-h3 ">
                      db:
                    </span>



                    <span class="text-h4"> A curated knowledgebase for <span class="white--text text-h4 ">M</span>etabolic  <span
                        class="white--text darken-4 text-h4 ">A</span>ssociations in <span
                        class="white--texttext text-h4 ">C</span>ancers</span>
                    </span>

                  </v-col>
                </v-row>
<!--                <v-row  align="center">-->
<!--                  <v-spacer></v-spacer>-->
<!--                  <v-col align-self="center" class="my-0 py-0" cols="11" >-->
<!--                    <v-sheet class="z-transparent">-->
<!--                      <hr  style="color: white;border-top: none;border-bottom: none;border-color: white; border: 3px solid"  />-->
<!--                    </v-sheet>-->
<!--                  </v-col>-->
<!--                  <v-spacer></v-spacer>-->
<!--                </v-row>-->

              </v-sheet>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="10" offset="1">

              <v-text-field
                  v-model="searchTerm"
                  append-icon="mdi-magnify mdi-36px"
                  background-color="white "
                  class="black--text"
                  clearable
                  prepend-inner-icon="mdi-chevron-right"
                  color="black" filled
                  height="40"
                  hide-details
                  outlined
                  placeholder="Metabolite name, PubChem ID, Cancer type, PubMed ID or Title, etc."
                  @keyup.enter.native="searchClick"
                  @click:append="searchClick"
              ></v-text-field>


              <!--              <v-text-field-->
              <!--                  v-model="searchTerm"-->
              <!--                  append-icon="mdi-magnify mdi-36px"-->
              <!--dark-->
              <!--                  class="black&#45;&#45;text"-->
              <!--                  clearable-->
              <!--                  color="white"-->
              <!--                  height="40"-->
              <!--                  hide-details-->

              <!--                  placeholder="Metabolite name, PubChem ID, Cancer type, PubMed ID or Title, etc."-->
              <!--                  @keyup.enter.native="searchClick"-->
              <!--                  @click:append="searchClick"-->
              <!--              ></v-text-field>-->


            </v-col>
            <v-col class="mt-n1 mb-2" cols="10" offset="1">
              <div class="text-left white--text ">
                <span>eg.</span>
                <a class="white--text" style="text-decoration: none" @click="demoSearch('Glutamine')">Glutamine</a>,
                &nbsp;
                <a class="white--text" style="text-decoration: none" @click="demoSearch('5961')">5961</a>, &nbsp;
                <a class="white--text" style="text-decoration: none" @click="demoSearch('breast cancer')">breast
                  cancer</a>, &nbsp;
                <a class="white--text" style="text-decoration: none" @click="demoSearch('31171223')">31171223</a> &nbsp;
              </div>
            </v-col>
          </v-row>
          <!--          <v-row>-->
          <!--            <v-col class="text-left" cols="10" offset="1">-->
          <!--              <v-divider dark></v-divider>-->
          <!--            </v-col>-->
          <!--          </v-row>-->

        </v-sheet>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="12" lg="12" md="12" sm="12" xl="12">
        <v-sheet class="z-transparent">
          <v-row>
            <!--            左侧介绍-->
            <v-col cols="12" lg="6" md="6" sm="12" xl="6">

              <v-card :elevation="total_elevation" height="100%">
                <v-card-title :style="{'color':$store.state.mainColor}">About</v-card-title>
                <v-row>
                  <v-col class="text-left " cols="12">
                    <v-sheet class="pa-3" height="100%">

                      <div>

                        MACdb is a comprehensive knowledgebase based totally on manual curation of cancer metabolic
                        literature, providing high quality metabolite associations, online visualizing networks, and
                        other effective tools for cancer or metabonomics researches.
                      </div>

                      <div>
                        <v-icon color="black">mdi-chevron-right</v-icon>
                        MACdb has curated <a :style="{color:hilightColor,textDecoration:'none'}"
                                             @click="$router.push('/browse_association')">
                        <v-icon :color="hilightColor" size="16">mdi-chemical-weapon</v-icon>
                        {{ $store.state.stats && $store.state.stats.associations.toLocaleString("en-US") || "0" }}</a>
                        metabolite-cancer associations, covering <a :style="{color:hilightColor,textDecoration:'none'}"
                                                                    @click="$router.push('/browse_trait')">
                        <v-icon :color="hilightColor" size="16">mdi-star-four-points</v-icon>
                        {{ $store.state.stats && $store.state.stats.trait.toLocaleString("en-US") || "0" }}</a> traits
                        which were extracted from <a :style="{color:hilightColor,textDecoration:'none'}"
                                                     @click="$router.push('/browse_study')">
                        <v-icon :color="hilightColor" size="16">mdi-opacity</v-icon>
                        {{ $store.state.stats && $store.state.stats.cohort.toLocaleString("en-US") || "0" }}</a> studies
                        reported in <a :style="{color:hilightColor,textDecoration:'none'}"
                                       @click="$router.push('/browse_publication')">
                        <v-icon :color="hilightColor" size="16">mdi-book</v-icon>
                        {{ $store.state.stats && $store.state.stats.paper.toLocaleString("en-US") || "0" }}</a>
                        publications (<a :style="{color:hilightColor,textDecoration:'none'}"
                                         @click="$router.push('/statistics')">
                        <v-icon :color="hilightColor" size="16">mdi-liquid-spot</v-icon>
                        {{ $store.state.stats && $store.state.stats.cancertype.toLocaleString("en-US") || "0" }}</a>
                        cancer categories).

                      </div>


                      <div>
                        <v-icon color="black">mdi-chevron-right</v-icon>
                        <a :style="{color:hilightColor,textDecoration:'none'}"
                           @click="$router.push('/knowledgegraph')">
                          <v-icon :color="hilightColor" size="16">mdi-state-machine</v-icon>
                          knowledge graph</a> is implemented to comprehensively evaluate and visualize associations from
                        metabolite, trait, cancer levels.
                      </div>


                      <div>
                        <v-icon color="black">mdi-chevron-right</v-icon>
                        MACdb embeds an online tool for <a :style="{color:hilightColor,textDecoration:'none'}"
                                                           @click="$router.push({name:'tools',query:{subtoolindex:0}})">
                        <v-icon :color="hilightColor" size="16">mdi-key-variant</v-icon>
                        PubChem ID mapping</a> and <a :style="{color:hilightColor,textDecoration:'none'}"
                                                      @click="$router.push({name:'tools',query:{subtoolindex:1}})">
                        <v-icon :color="hilightColor" size="16">mdi-chart-timeline</v-icon>
                        Enrichment analysis</a>, which are helpful for users to standardize and enrich metabolites with
                        no requirement of bioinformatics skills.
                      </div>

                      <div>
                        <v-icon color="black">mdi-chevron-right</v-icon>
                        Users can download all associations from the <a
                          :style="{color:hilightColor,textDecoration:'none'}"
                          @click="$router.push('/downloads')">
                        <v-icon :color="hilightColor" size="16">mdi-download-box-outline</v-icon>
                        downloads</a> or the <a
                          :style="{color:hilightColor,textDecoration:'none'}"
                          @click="$router.push('/apis')">
                        <v-icon :color="hilightColor" size="16">mdi-satellite-uplink</v-icon>
                        APIs</a> page.
                      </div>

                      <div>
                        Details for curation model, user manual, and contact information are available at <a
                          :style="{color:hilightColor,textDecoration:'none'}"
                          @click="$router.push('/help')">
                        <v-icon :color="hilightColor" size="16">mdi-book-open-outline</v-icon>
                        documentation</a>.
                      </div>





                    </v-sheet>


                  </v-col>
                </v-row>
              </v-card>


            </v-col>
            <!--右侧统计-->
            <v-col cols="12" lg="6" md="6" sm="12" xl="6">
              <v-card :elevation="total_elevation" class="pb-4" height="100%">
                <v-card-title :style="{'color':$store.state.mainColor}">Statistics</v-card-title>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="11">
                    <v-row>
                      <v-col v-for="item in statsdata" :key="item.name" cols="12" lg="4" md="4" sm="4" xl="4">
                        <v-hover v-slot="{ hover }">
                          <v-card
                              :elevation="hover?4:0"
                              :to="item.to"
                              class="mx-0 pa-3 my-auto"
                              tile
                              min-height="140"

                          >

                            <v-sheet class="pt-6">
                              <v-progress-circular
                                  v-show="$store.state.stats ==null"
                                  :color="$store.state.mainColor"
                                  :size="45"
                                  :width="7"
                                  indeterminate
                              ></v-progress-circular>

                              <div v-show="$store.state.stats !=null" :style="{color: $store.state.mainColor}"
                                   class="text-h4"
                              >
                                <v-icon :color="item.color">{{ item.icon }} mdi-36px</v-icon>
                                {{ item.num }}
                              </div>
                              <v-divider dark></v-divider>

                              <div :class="[item.fontsize]" :style="{color: $store.state.mainColor}"
                                   v-html="item.name"></div>
                            </v-sheet>

                          </v-card>
                        </v-hover>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </v-card>

            </v-col>
          </v-row>
        </v-sheet>

      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="12" md="12" sm="12" xl="12">
        <v-row>
          <v-col cols="12" lg="3" md="6" sm="12" xl="3">
            <v-card :elevation="total_elevation" height="300">
              <v-card-title :style="{'color':$store.state.mainColor}">Tools</v-card-title>
              <v-card-text>
                <v-list class="overflow-y-auto overflow-x-hidden" max-height="280">

                  <v-list-item class="align--center" @click="$router.push({name:'knowledgegraph'})">
                    <v-icon>mdi-state-machine</v-icon> &nbsp; &nbsp;
                    <div class="black--text font-weight-bold mr-3">Knowledge Graph</div>
                  </v-list-item>

                  <v-list-item class="align--center" @click="$router.push({name:'tools',query:{subtoolindex:0}})">
                    <v-icon>mdi-key-variant</v-icon> &nbsp; &nbsp;
                    <div class="black--text font-weight-bold mr-3">Name2cid</div>
                  </v-list-item>
                  <v-list-item class="align--center" @click="$router.push({name:'tools',query:{subtoolindex:1}})">
                    <v-icon>mdi-chart-timeline</v-icon> &nbsp; &nbsp;
                    <div class="black--text font-weight-bold mr-3">Enrichment</div>
                    &nbsp;
                  </v-list-item>

                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" lg="3" md="6" sm="12" xl="3">
            <v-card :elevation="total_elevation" height="300">
              <v-card-title :style="{'color':$store.state.mainColor}">News</v-card-title>


              <v-sheet class="overflow-y-auto mx-2" height="220">
                <v-timeline align-top dense>
                  <v-timeline-item v-for="item in news" :key="item.text" fill-dot icon="mdi-star" small>
                    <v-row class="mr-2" justify="space-between">
                      <v-col class="text-left" cols="12">
                        {{ item.date }} &nbsp;
                        {{ item.text }}
                      </v-col>


                    </v-row>

                  </v-timeline-item>

                </v-timeline>
              </v-sheet>

            </v-card>
          </v-col>


          <v-col cols="12" lg="3" md="6" sm="12" xl="3">
            <v-card :elevation="total_elevation" height="300">
              <v-card-title :style="{'color':$store.state.mainColor}">Global Visitors</v-card-title>
              <v-card-text>
                <div class="mx-1 my-4 ">
                  <v-row>
                    <v-col cols="12">
                      <v-sheet class="pa-2 mx-auto overflow-auto ">
                        <a class="noclick" href="https://www.revolvermaps.com/livestats/5j7qq7wks3k/"><img
                            alt="Map" height="180" src="//rf.revolvermaps.com/h/m/a/0/ff8a00/211/0/5j7qq7wks3k.png"
                            style="border:0;" width="380"></a>
                      </v-sheet>
                    </v-col>

                  </v-row>

                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="3" md="6" sm="12" xl="3">
            <v-card :elevation="total_elevation" height="300">
              <v-card-title :style="{'color':$store.state.mainColor}">Related Resources</v-card-title>
              <v-card-text>
                <v-list class="overflow-y-auto overflow-x-hidden" max-height="220">
                  <v-list-item v-for="(item,idx) in relatedlinks" :key="idx" class="align--center" :href="item.href"
                               target="_blank">
                    <v-sheet class="text-left align--center" >
                      <v-icon>mdi-link-variant</v-icon> &nbsp;
                      <span class="black--text font-weight-bold mr-3" style="white-space: nowrap">{{ item.name }}</span>

                      <img style="display: inline-block;border: 1px solid darkgrey" height="20" :src="item.logo"></img>

                    </v-sheet>

                  </v-list-item>


                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-sheet rounded class="py-2 px-3 mb-2" >
          <div class="text-left mb-2 mt-4">
            <v-icon>mdi-format-quote-open-outline</v-icon>
            <span> <b>How to Cite:</b> Database Resources of the National Genomics Data Center, China National Center for Bioinformation in 2022. Nucleic Acids Res 2022, 50(D1):D27-D38. [PMID=<a
                href="https://pubmed.ncbi.nlm.nih.gov/34718731/"
                :style="{color:hilightColor,textDecoration:'none'}"
                target="_blank">34718731</a>][DOI=<a
                href="https://doi.org/10.1093/nar/gkab951"
                :style="{color:hilightColor,textDecoration:'none'}" target="_blank">10.1093/nar/gkab951</a>]</span>
          </div>

          <div class="text-left">
            <v-icon>mdi-information-outline</v-icon>
            <span>To get the best experience, please visit us using the latest version of Google Chrome, Microsoft Edge or Firefox.</span>
          </div>
        </v-sheet>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Axios from "axios";

export default {
  name: "home",
  data() {
    return {
      bannerimg: require('../assets/img/macdb_background_1.png'),
      searchTerm: "",
      logo: require('../assets/img/macdb_logo_1.png'),
      bannerLeftWidth: 8,
      total_elevation: 0,
      hilightColor: '#0d8dd2',
      news: [
        {
          date: "[2022/08/23]",
          text: "Bugs fix and code clean."
        },
        {
          date: "[2022/07/19]",
          text: "Enrichment tool was released."
        },
        {
          date: "[2022/06/14]",
          text: "Knowledge Graph was released."
        },
        {
          date: "[2022/06/13]",
          text: "MACdb version 1 was released."
        },
      ],
      relatedlinks: [
        {
          href: "https://pubchem.ncbi.nlm.nih.gov/",
          icon: "mdi-link-variant",
          name: "PubChem",
          logo: require('../../static/imgs/related_resource_pubchem.png'),
        },

        {
          href: "https://humancyc.org/",
          icon: "mdi-link-variant",
          name: "HumanCyc",
          logo: require('../../static/imgs/related_resource_humancyc.png'),
        },
        {
          href: "https://lipidmaps.org/",
          icon: "mdi-link-variant",
          name: "Lipid Maps",
          logo: require('../../static/imgs/related_resource_lips.png'),
        },
        {
          href: "https://hmdb.ca/",
          icon: "mdi-link-variant",
          name: "HMDB",
          logo: require('../../static/imgs/related_resource_hmdb.png'),
        },
        {
          href: "https://ngdc.cncb.ac.cn/ccas/#/",
          icon: "mdi-link-variant",
          name: "CCAS",
          logo: require('../../static/imgs/CCASlogo.png'),
        },
        {
          href: "https://ngdc.cncb.ac.cn/ascancer/home",
          icon: "mdi-link-variant",
          name: "ASCancer Atlas",
          logo: require('../../static/imgs/ascancer_atlas.png'),
        },
        {
          href: "https://ngdc.cncb.ac.cn/gsa-human/",
          icon: "mdi-link-variant",
          name: "GSA-Human",
          logo: require('../../static/imgs/gsahuman.png'),
        },
        {
          href: "https://ngdc.cncb.ac.cn/omix/",
          icon: "mdi-link-variant",
          name: "OMIX",
          logo: require('../../static/imgs/omix.png'),
        },
        {
          href: "https://ngdc.cncb.ac.cn/cancerscem/",
          icon: "mdi-link-variant",
          name: "CancerSCEM",
          logo: require('../../static/imgs/cancersem.png'),
        },

      ]
    }
  },
  computed: {
    statsdata() {
      return [
        {
          to: "/browse_association",
          icon: "mdi-chemical-weapon",
          name: "Associations",
          color: "teal",
          fontsize: 'text-h5',
          num: this.$store.state.stats && this.$store.state.stats.associations.toLocaleString("en-US") || "0"

        },

        {
          to: "/browse_association",
          icon: "mdi-flask-empty-outline",
          name: "Metabolites",
          color: "orange",
          fontsize: 'text-h5',
          num: this.$store.state.stats && this.$store.state.stats.metabolite.toLocaleString("en-US") || "0"
        },
        {
          to: "/browse_trait",
          icon: "mdi-star-four-points",
          name: "Traits",
          color: "purple",
          fontsize: 'text-h5',
          num: this.$store.state.stats && this.$store.state.stats.trait.toLocaleString("en-US") || "0"
        },
        {
          to: "/browse_study",
          icon: "mdi-opacity",
          name: "Studies",
          color: "indigo",
          fontsize: 'text-h5',
          num: this.$store.state.stats && this.$store.state.stats.cohort.toLocaleString("en-US") || "0"
        },
        {
          to: "/browse_publication",
          icon: "mdi-book",
          name: "Publications",
          color: "blue",
          fontsize: 'text-h5',
          num: this.$store.state.stats && this.$store.state.stats.paper.toLocaleString("en-US") || "0"
        },
        {
          to: "/statistics",
          icon: "mdi-liquid-spot",
          name: "Cancer Categories",
          color: "red",
          fontsize: 'text-h6',
          num: this.$store.state.stats && this.$store.state.stats.cancertype.toLocaleString("en-US") || "0"
        },
      ]
    }

  },
  mounted() {
    // postscribe('#revolverMaps',
    //   `<script type="text/javascript" src="//rf.revolvermaps.com/0/0/7.js?i=5j7qq7wks3k&amp;m=0&amp;c=ff0000&amp;cr1=ffffff&amp;sx=0" async="async"><\/script>`)
    // postscribe('#revolverMaps',
    //   `<script type="text/javascript" src="//rf.revolvermaps.com/0/0/5.js?i=5j7qq7wks3k&amp;m=0&amp;c=ff0000&amp;cr1=ffffff" async="async"><\/script>`)
    // postscribe('#revolverMaps',
    //   `<script type="text/javascript" src="//rf.revolvermaps.com/0/0/5.js?i=5j7qq7wks3k&amp;m=0&amp;c=ff0000&amp;cr1=ffffff" async="async"><\/script>`)
    // postscribe('#revolverMaps',
    //   `<script type="text/javascript" src="//rf.revolvermaps.com/0/0/4.js?i=5j7qq7wks3k&amp;m=0&amp;h=180&amp;c=ff8a00&amp;r=0" async="async"><\/script>`)








  },

  methods: {
    searchClick() {
      // alert(this.searchTerm)

      if (this.searchTerm != null && this.searchTerm.trim() != "") {

        this.$router.push({path: "/search", query: {"searchTerm": this.searchTerm}})
      }
    },
    demoSearch(term) {
      this.searchTerm = term;
      this.searchClick();
    },
    // raiseEvaliation(event){
    //
    //   // var elev = event.currentTarget.getAttribute('elevation')
    //   event.currentTarget.setAttribute('elevation',4)
    //   // elev = "4"
    //   console.log("mouse enter")
    // },
    // downEvaliation(){
    //   var elev = event.currentTarget.getAttribute('elevation')
    //   elev = "0"
    // }
  }
}
</script>

<style scoped>
.z-transparent {
  background-color: transparent !important;
  opacity: 2;
  border-color: transparent !important;
}

.z-transparent-background {
  background-color: transparent !important;
  opacity: 2;
  /*border-color: transparent !important;*/
}

.noclick {
  pointer-events: none;
  cursor: none;
}

.resoveMapFrme > div {
  height: 120px;
}
</style>
