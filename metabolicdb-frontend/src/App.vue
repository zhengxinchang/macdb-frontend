<template>
  <v-app style="margin-top: 0px ;background-color: #ecf0f5;" >
    <header-bar app style="position: fixed;width: 100%;top:0px;z-index: 999999"></header-bar>
    <v-sheet
      :color="barcolor"
      class="py-3"
      style="position: fixed;width: 100%;z-index: 99999;top:30px"
    >
      <!--      color="#3c8dbc"-->
      <v-row align="center" >
        <v-col
          class="pt-4 "
          cols="12"
          lg="1"
          md="2"
          sm="12"
          xl="1"

        >
          <v-sheet :color="barcolor"  @click="$router.push('/home')">
            <v-img :src="logo" aspect-ratio="16/9" contain height="40"></v-img>
            <!--                      <div class="text-h5 white&#45;&#45;text font-weight-light " style="line-height: 20px" ><span class="red&#45;&#45;text lighten-4">M</span><span class="blue&#45;&#45;text">e</span><span class="yellow&#45;&#45;text darken-2">t</span><span class="green&#45;&#45;text lighten-2">a</span><br/>Cancer</div>-->
            <!--                      <div class="text-h5 white&#45;&#45;text font-weight-light " style="line-height: 22px"  ><span class="pink&#45;&#45;text lighten-3">Meta</span><br/>Cancer</div>-->
          </v-sheet>
        </v-col>
        <v-col  class="text-center" lg="10" md="9" cols="11" xl="10" sm="11">

          <v-tabs
            v-model="$store.state.currtab"
            :background-color="barcolor"
            class="mt-2"
            centered
            dark
            grow
            show-arrows
          >
            <v-tab
              to="/home"

            >
              <v-icon>mdi-home</v-icon> &nbsp; Home
            </v-tab>

            <v-tab
              class="px-0"

            >

              <v-menu offset-y open-on-hover close-delay="400" >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn

                    v-bind="attrs"
                    v-on="on"
                    :color="barcolor"
                    dark
                    id="browseTabID"
                    elevation="0"
                    height="100%"
                    width="100%"
                  >
                    <v-icon>mdi-bookmark-box-multiple-outline</v-icon>&nbsp;BROWSE <v-icon>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list
                  :color="barcolor"
                  class="text-left"
                  dark
                >
                  <v-list-item
                    to="/browse_association"
                  >
                    <v-list-item-title>
                      <v-icon>mdi-chemical-weapon</v-icon>
                      &nbsp; Metabolite
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    to="/browse_trait"

                  >
                    <v-list-item-title>
                      <v-icon>mdi-star-four-points</v-icon>
                      &nbsp; Trait
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item

                    to="/browse_study"
                  >
                    <v-list-item-title>
                      <v-icon>mdi-opacity</v-icon>
                      &nbsp; Study
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    to="/browse_publication"

                  >
                    <v-list-item-title>
                      <v-icon>mdi-book</v-icon>
                      &nbsp; Publication
                    </v-list-item-title>
                  </v-list-item>

                </v-list>
              </v-menu>

            </v-tab>

            <v-tab
              to="/knowledgegraph"
            >
              <v-icon>mdi-state-machine </v-icon> &nbsp; knowledge graph
            </v-tab>


            <v-tab
              to="/tools"
              @click="$router.push({name:'tools',query:{subtoolindex:0}})"
            >
              <v-icon>mdi-toolbox-outline</v-icon> &nbsp; Tools
            </v-tab>
            <v-tab
              to="/downloads"
            >
              <v-icon>mdi-download-box-outline</v-icon> &nbsp; downloads
            </v-tab>


            <v-tab
              to="/apis"
            >
              <v-icon>mdi-satellite-uplink</v-icon> &nbsp; api
            </v-tab>

            <v-tab
              to="/statistics"
            >
              <v-icon>mdi-chart-bar</v-icon> &nbsp; statistics
            </v-tab>



            <v-tab
              to="/help"
            >
              <v-icon>mdi-book-open-outline</v-icon> &nbsp; Documentation
            </v-tab>

          </v-tabs>
        </v-col>

      <v-col
          cols="1"
          lg="1"
          md="1"
          sm="1"
          xl="1"

      >
        <v-sheet :color="barcolor"  class="float-end text-right  pr-6 ">
          <v-icon class="mdi-spin align--center" color="white" size="16">mdi-cog</v-icon>
          <span class="white--text text-body-2 ">V1.0</span>
        </v-sheet>
      </v-col>
      </v-row>

    </v-sheet>
    <v-sheet class="transparent" height="100"></v-sheet>


    <router-view  />


    <v-btn :color="$store.state.mainColor" dark elevation="1" x-small fab style="position: fixed;bottom: 100px;right: 50px;z-index: 99999999"
         @click="backToTop"  v-if="$route.name != 'home' && $route.name != 'home2'"  ><v-icon small >mdi-format-vertical-align-top</v-icon>
    </v-btn>
    <footer-bar></footer-bar>
  </v-app>
</template>

<script>
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";

export default {
  name: 'App',
  components: {FooterBar, HeaderBar},
  data() {
    return {

      logo: require('./assets/img/macdb_logo_1.png'),
      // barcolor: "#0c64b6"
      barcolor: "#174978"
    }
  },
  created() {
    this.$store.dispatch("loadStats");
  },


  mounted() {
    let that = this
    // 阻止点击browse后，激活块移动到brwose tab，通过给tab内部的btn修改点击事件
    document.getElementById("browseTabID").onclick=function(e){
      // e.preventDefault();
      e.stopPropagation();

    };


    console.log("#-------------------- The developer of MACdb said: --------------------#\n" +
                "#                                                                      #\n" +
                "#  Thank you very much for using MACdb. If you encounter any technical #\n" +
                "#  problems during use, please contact zhengxinchang(AT)big.ac.cn      #\n" +
                "#                                                                      #\n" +
                "#----------------------------------------------------------------------#");


  },
  methods:{

    backToTop(){
      window.scrollTo(0,0)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
