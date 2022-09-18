<template>

  <div id="thisChart" style="width: 95%;height: 90%;margin: 0 auto;"></div>

</template>

<script>

import Axios from "axios";

export default {
  name: "publicationTimeLine",
  data() {
    return {
      myChart: null,
      dat: [],
    }

  },
  created() {

    this.loadTimeLineData();
    // this.drawEcharts();

  },
  methods: {

    loadTimeLineData() {

      Axios.post(
        baseURL + "/api/get_stats_data_total",
      ).then(res => {
        this.dat = res.data;
        this.drawEcharts();
      })
    },


    drawEcharts() {

      let that = this
      let chartDom = document.getElementById('thisChart');
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
              name:"MACdb_statistics_publications_timeline"
            }
          }
        },

        tooltip:{

          trigger:'item'
        },
        dataset: [
          {
            id: 'dataset_total_count',
            source: this.dat.total_count,
            sourceHeader:true,
          },
          // {
          //   id: 'dataset_cancertype_count',
          //   source: this.dat.cancertype_count,
          //   sourceHeader:true,
          // },
        ],
        xAxis: {
          type: 'category',
            nameLocation: 'middle'
        },
        yAxis: {
          name:"Number of Publication",
          nameLocation:"middle",
          nameGap:35,
        },
        // grid: {
        //   right: "20%"
        // },

        series: [
          {
            datasetIndex:0,
            type: 'line',
            smooth:true,
            label:{
              show:true,
            },
            encode: {
              // 将 "amount" 列映射到 X 轴。
              x: 'year',
              // 将 "product" 列映射到 Y 轴。
              y: 'accumulate_count'
            },
            symbolSize:12,
          },
          // {
          //   tooltip:{
          //     formatter:'{c0}',
          //   },
          //   name:"Cancer type",
          //   datasetIndex:1,
          //   type: 'pie',
          //   itemStyle: {
          //     borderRadius: 10,
          //     borderColor: '#fff',
          //     borderWidth: 2
          //   },
          //   label: {
          //     show: false,
          //     position: 'center',
          //   },
          //   emphasis: {
          //     label: {
          //       show: true,
          //       fontSize: '40',
          //       fontWeight: 'bold'
          //     }
          //   },
          //   radius: ["50%",'70%'],
          //   center: ['90%', '50%'],
          //   encode: {
          //     itemName: 'Cancer_type',
          //     value: 'count',
          //     tooltip: 'Cancer_type'
          //   }
          // },
        ]

      };
      that.myChart.setOption(option);

      // let chartDomPie = document.getElementById('thisChartPie');
      // that.myChartPie = this.$echarts.init(
      //   chartDomPie,
      // );
      //
      //
      // let pieOption = {
      //     tooltip: {
      //       trigger: 'item'
      //     },
      //     legend: {
      //       top: '5%',
      //       left: 'center'
      //     },
      //     series: [
      //       {
      //         name: 'Access From',
      //         type: 'pie',
      //         radius: ['40%', '70%'],
      //         avoidLabelOverlap: false,
      //         itemStyle: {
      //           borderRadius: 10,
      //           borderColor: '#fff',
      //           borderWidth: 2
      //         },
      //         label: {
      //           show: false,
      //           position: 'center'
      //         },
      //         emphasis: {
      //           label: {
      //             show: true,
      //             fontSize: '40',
      //             fontWeight: 'bold'
      //           }
      //         },
      //         labelLine: {
      //           show: false
      //         },
      //         data: [
      //           { value: 1048, name: 'Search Engine' },
      //           { value: 735, name: 'Direct' },
      //           { value: 580, name: 'Email' },
      //           { value: 484, name: 'Union Ads' },
      //           { value: 300, name: 'Video Ads' }
      //         ]
      //       }
      //     ]
      //   };
      //
      // that.myChartPie.setOption(pieOption);


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
