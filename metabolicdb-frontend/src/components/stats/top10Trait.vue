<template>
  <div   :id="chartid" style="width: 95%;height: 90%;margin: 0 auto;"></div>
</template>

<script>
import Axios from "axios";
export default {
name: "top10Trait",
  data() {
    return {
      myChart: null,
      dat: [],
      chartid:"thisChartTop10Trait"
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
              name:"MACdb_statistics_top_traits"
            }
          }
        },
        grid:{

          bottom:"35%"
        },
        tooltip:{
          trigger:'item'
        },
        dataset: [
          {
            id: 'dataset_cancertype_count',
            source: this.dat.toptrait_count,
            sourceHeader:true,
          },
        ],
        xAxis: {

          inverse:false,
          type: 'category',
          nameLocation: 'middle',
          axisTick:{
            show:false,
          },
          axisLabel:{
            inside:false,
            rotate: 45
          }
        },
        yAxis: {
          name:"Number of Study",
          nameLocation:"middle",
          nameGap:35,
        },

        series: [
          {
            datasetIndex:0,
            type: 'bar',
            smooth:true,
            label:{
              show:true,
              position: 'top'
            },
            encode: {
              // 将 "amount" 列映射到 X 轴。
              x: 'Trait_Ontology',
              // 将 "product" 列映射到 Y 轴。
              y: 'count'
            },

          },


        ]

      };
      that.myChart.setOption(option);

      that.myChart.on('click', function(params) {
        // if(params.dataType == "node"){
        //   let myattr = params.data.myattrs
        //
        //   if(myattr.type == "tid"){
        //     that.$commonfunc.openAtNewPageTraitDetail(myattr.id)
        //   }
        //   else if(myattr.type == "cid"){

        that.$commonfunc.openAtNewPageTraitDetail(params.data[1])
        //   }
        // }

      });


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
