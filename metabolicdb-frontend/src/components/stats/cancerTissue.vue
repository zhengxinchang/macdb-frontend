<template>
  <div   :id="chartid" style="width: 95%;height: 90%;margin: 0 auto;"></div>
</template>

<script>
import Axios from "axios";
export default {
name: "cancerTissue",
  data() {
    return {
      myChart: null,
      dat: [],
      chartid:"thisChartCancerTissue"
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
        this.dat = res.data.cancer_tissue;
            this.drawEcharts();
      })
  },
    drawEcharts() {

      let that = this
      let chartDom = document.getElementById(this.chartid);
      that.myChart = this.$echarts.init(
        chartDom,
      );

      const Tissue = this.dat.Tissue;
      const Cancer = this.dat.Cancer_type;
      const data = this.dat.data
        .map(function (item) {
         return [item[1], item[0], item[2] || '-'];
        });

      let option = {

        toolbox: {
          feature: {
            saveAsImage: {
              // type:"svg",
              title: "save",
              name:"MACdb_statistics_cancer_tissue"
            }
          }
        },
        tooltip: {
          position: 'top',
        },
        grid: {

          left:150,
          bottom: 120,
          top: 50
        },
        xAxis: {
          type: 'category',
          data: Tissue,
          splitArea: {
            show: true
          },
          axisLabel:{
            rotate:45,
            interval:0,
            width:140,
            overflow:"break"
          }
        },
        yAxis: {
          type: 'category',
          data: Cancer,
          splitArea: {
            show: true
          },
          axisLabel:{
            width:110,
            overflow:"break"
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          show:false,
          left: 'center',
          bottom: '15%'
        },
        series: [
          {
            name: 'Tissue',
            type: 'heatmap',
            data: data,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            tooltip: {
              formatter:function(params ){

                return `<div  class="text-left pa-3">
                        <div > <span class="text-body-1 font-weight-bold">Cancer:</span> ${Cancer[params.value[1]]} </div>
                        <div> <span class="text-body-1 font-weight-bold">Tissue: </span>${Tissue[params.value[0]]} </div>
                        <div><span class="text-body-1 font-weight-bold">Count:</span> ${params.value[2]} </div>
                        </div>
                        `
              }
            },
          }
        ]
      };


      that.myChart.setOption(option);
      window.addEventListener("resize", () => {
        // 第六步，执行echarts自带的resize方法，即可做到让echarts图表自适应
        that.myChart.resize();
        // 如果有多个echarts，就在这里执行多个echarts实例的resize方法,不过一般要做组件化开发，即一个.vue文件只会放置一个echarts实例
        /*
        this.myChart2.resize();
        this.myChart3.resize();
        ......
        */
      });
    }
  },
  beforeDestroy() {
    /* 页面组件销毁的时候，别忘了移除绑定的监听resize事件，否则的话，多渲染几次
    容易导致内存泄漏和额外CPU或GPU占用哦*/
    window.removeEventListener("resize", () => {
      this.myChart.resize();
    });
  },

}
</script>

<style scoped>

</style>
