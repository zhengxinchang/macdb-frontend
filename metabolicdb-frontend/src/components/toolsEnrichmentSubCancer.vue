<template>
  <div>
    <v-sheet
        v-show="isok == true"
        height="500"
        class="mt-16"
    >
      <tools-enrichment-common-echarts chartid="enrichment_cancer_id"
                                       :options="chartOption"></tools-enrichment-common-echarts>
    </v-sheet>

    <v-sheet v-show="isok == true">
      <vxe-toolbar custom export></vxe-toolbar>

      <vxe-table
          stripe
          :align="null"
          :loading="tableLoading"
          :column-config="{resizable: true}"
          :data="dat"
          :export-config="{}"
          :print-config="{}"
          border
          empty-text="Empty"
          round
          max-height="500"
      >
        <!--        <vxe-column sortable field="Cancer_type" width="450" title="Trait">-->
        <!--          <template #default="{row}">-->
        <!--            <a style="text-decoration: none" class="font-weight-bold text-body-2"-->
        <!--               @click="$commonfunc.openAtNewPageTraitDetail(row.trait_ontology_id)"-->
        <!--            >{{row.trait_ontology}}</a>-->

        <!--          </template>-->
        <!--        </vxe-column>-->
        <vxe-column sortable field="Cancer_type" title="Cancer Type"></vxe-column>
        <vxe-column type="expand" field="hits_data" title="Metabolites Hits">
          <template #content="{row}">
            <v-sheet min-width="100" class="text-left pa-3">
              <v-chip class="ma-1" @click="$commonfunc.openAtNewPageMetaboliteDetail(item)" label small
                      v-for="item in row.hits_data " :key="item" outlined :color="$store.state.mainColor">
                {{ item }}
              </v-chip>
              <!--            {{row.hits_data}}-->
            </v-sheet>
          </template>
        </vxe-column>
        <vxe-column sortable field="Cancer_DOID" title="Cancer DOID"></vxe-column>
        <vxe-column sortable field="Cohort_id_count" title="#Study"></vxe-column>
        <!--        <vxe-column sortable field="odd"  title="Odd Ratio" ></vxe-column>-->
        <vxe-column sortable field="p" title="Pvals"></vxe-column>
        <vxe-column sortable field="adjp" title="Adjust Pvals"></vxe-column>
      </vxe-table>
      <!--      {{dat}}-->
    </v-sheet>


  </div>
</template>

<script>
import Axios from 'axios'
import ToolsEnrichmentCommonEcharts from "./toolsEnrichmentCommonEcharts";

export default {
  name: "toolsEnrichmentSubCancer",
  components: {ToolsEnrichmentCommonEcharts},
  props: ['isok', "taskid"],
  data() {
    return {
      dat: [],
      pagedData: [],
      chartData: {
        data: [],
        maxDotSize: 0,
        maxPval: 1,
      },
      enrich_type: "enrich_cancer",
      tableLoading: false,
      chartOption: null
    }
  },


  beforeMount() {

    if (this.isok == true) {

      Axios.get(baseURL + "/api/tool_enrichment_get_data", {
        params: {
          taskid: this.taskid,
          type: this.enrich_type,
        }
      }).then(res => {

        this.dat = res.data
        this.dat = this.sortData()
        this.datTop = this.dat.slice(0, 20) //图中最多显示多少个结果
        this.chartData.data = this.datTop.map(item => {

          return [item.Cancer_type, item.adjp, item.hits]
        })
        this.chartData.maxDotSize = _.maxBy(this.datTop, "hits")['hits']
        this.chartData.maxPval = _.maxBy(this.datTop, "adjp")['adjp']
        // this.pagination.totalPage = this.dat && this.dat.length || 10
        this.setChartOption(); // 生成作图的配置文件

        // console.log("Enrichment Sub Cancer Running...")

      })
    } else {
      this.chartOption = null
    }
  },

  watch: {
    isok() {

      if (this.isok == true) {

        Axios.get(baseURL + "/api/tool_enrichment_get_data", {
          params: {
            taskid: this.taskid,
            type: this.enrich_type,
          }
        }).then(res => {

          this.dat = res.data
          this.dat = this.sortData()
          this.datTop = this.dat.slice(0, 20) //图中最多显示多少个结果
          this.chartData.data = this.datTop.map(item => {

            return [item.Cancer_type, item.adjp, item.hits]
          })
          this.chartData.maxDotSize = _.maxBy(this.datTop, "hits")['hits']
          this.chartData.maxPval = _.maxBy(this.datTop, "adjp")['adjp']
          // this.pagination.totalPage = this.dat && this.dat.length || 10
          this.setChartOption(); // 生成作图的配置文件

          // console.log("Enrichment Sub Cancer Running...")

        })
      } else {
        this.chartOption = null
      }
    },
  },

  methods: {

    setChartOption() {

      let remapping = function (k, inmax, outmin = 5, outmax = 30) {
        let inmin = 0
        return ((k - inmin) * (outmax - outmin) / (inmax - inmin) + outmin)
      }
      let that = this
      this.chartOption = {
        // color:"rgba(12,217,151,0.8)",
        color: ['#61a0a8'],
        grid: {
          top: '5%',
          left: 150,
          right: "5%",
          buttom: "5%"

        },
        xAxis: {
          name: "adjust P value",
          nameLocation: "middle",
          type: "value",
          nameGap: 25,
          nameTextStyle: {
            fontSize: 18
          }

        },
        yAxis: {
          inverse: true,
          type: "category",
          axisLabel: {
            width: 120,
            overflow: "break",
            padding: [1, 6, 1, 1]
            // fontSize: 110,
          }
        },
        tooltip: {
          show: true,
          formatter: function (params) {
            return `<div style="text-align: start" >Trait: &nbsp; ${params.data[0]} </div><div style="text-align: start">Adjust Pval: &nbsp; ${params.data[1]}</div><div style="text-align: start">Hits: &nbsp; ${params.data[2]}</div>`
          }

        },

        series: [
          {
            symbolSize: function (val) {
              return remapping(val[2], that.chartData.maxDotSize);
            },
            data: this.chartData.data,
            type: 'scatter',
            encode: {
              x: [1],
              y: [0],

            },

          }
        ]

      }


    },

    sortData(by = "p", desc = false) {

      return this.dat.sort((x, y) => {

        if (desc == false) {

          return x[by] - y[by]

        } else {
          return y[by] - x[by]
        }

      })

    }

  }


}
</script>

<style scoped>

</style>
