<template>
  <div   :id="chartid" style="width: 95%;height: 90%;margin: 0 auto;"></div>
</template>

<script>
import Axios from "axios";
export default {
name: "cancerType",
  data() {
    return {
      myChart: null,
      dat: [],
      chartid:"thisChartCancerType"
    }

  },
  mounted() {

    this.loadData();
    // this.drawEcharts();

  },
  methods:{
    loadData() {
      Axios.post(
        baseURL + "/api/get_stats_data_total",
      ).then(res => {
        this.dat = res.data;

            this.drawEcharts();



      })
  },
    drawEcharts() {

      let that = this
      let chartDom = document.getElementById(this.chartid);
      that.myChart = this.$echarts.init(
        chartDom,
      );

      let option ={
        animationDuration: 2000,

        // 设置为下载图片
        toolbox: {
          feature: {
            saveAsImage: {
              // type:"svg",
              title: "save",
              name:"MACdb_statistics_cancer_type"
            }
          }
        },
        // legend: {
        //   orient: 'vertical',
        // },
        tooltip:{
          trigger:'item'
        },
        dataset: [
          {
            id: 'dataset_cancertype_count',
            source: this.dat.cancertype_count,
            sourceHeader:true,
          },
        ],

        series: [

          {
            tooltip:{
              formatter:'{c0}',
              textStyle:{
                fontSize: '10',
                fontWeight: 'bold',
              }
            },
            name:"Cancer type",
            datasetIndex:0,
            type: 'pie',
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              formatter: '{c}',
              position:"outside"
            },
            emphasis: {
              // itemStyle: {
              //   shadowBlur: 10,
              //   shadowOffsetX: 0,
              //   shadowColor: 'rgba(0, 0, 0, 0.5)'
              // },
              // label: {
              //   show: true,
              //   fontSize: '30',
              //   fontWeight: 'bold',
              // }

            },
            radius: ["50%",'70%'],
            center: ['50%', '50%'],
            encode: {
              name: ['Cancer_type',"count"],
              value: "count",
              tooltip: ['Cancer_type',"count"]
            }
          },
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
