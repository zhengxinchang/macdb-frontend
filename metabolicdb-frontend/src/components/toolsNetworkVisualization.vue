
<template>
  <div   :id="chartid" style="width: 100%;height: 100%;margin: 0 auto;"></div>
</template>

<script>
import Axios from "axios";
export default {
name: "toolsNetworkVisualization",
  props:['graphData',"plotconfig"],
  data() {
    return {
      myChart: null,
      graph: null,
      nodeWithID:{},
      chartid:"thisChartCancerTissue"
    }

  },
  // computed:{
  //   nodeWithID(){
  //     // 通过node生成带有 n1 等标签的对象，用于hover edge的时候取到名字
  //
  //   }
  //
  // },
  mounted() {

    if(this.graphData != null){
      this.createIDNode();
      this.drawEcharts()
    }


  },
  watch:{
    graphData:function(){
      if(this.graphData != null){
        this.createIDNode();
        this.drawEcharts()
      }
    },
    plotconfig:{
     handler:function (newval){

       // console.log(this.graphData)
       if(this.graphData != null){
         this.createIDNode();
         this.drawEcharts()
       }

     },
      deep:true,
      immediate:true,
    }
  },
  methods:{
    createIDNode(){
      // let idnode = {}
      // console.log("aaa")
      this.nodeWithID = {};
      this.graphData && this.graphData.nodes && this.graphData.nodes.forEach(item=>{
        this.nodeWithID[item.id] = item.name;
      })

      // return idnode;


    },
    drawEcharts() {



      let chartDom = document.getElementById(this.chartid);
      let myChart = this.$echarts.init(chartDom);
      let option;

      myChart.showLoading();


        this.graph = this.graphData
        that = this;

      // this.graph.nodes.forEach(function (node) {
      //     node.symbolSize = 15;
      //
      //   });

        option = {
          toolbox: {
            feature: {
              saveAsImage: {
                // type:"svg",
                title: "save",
                name:"MACdb_Network_visualization"
              }
            }
          },


          title: {
            text: 'MACdb association network',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {
            formatter: function (params){
                // console.log(params)

              if(params.dataType == "edge"){
                //使用that来获得当前的this 因为eachart里边的this进行了切换
                return `${ that.nodeWithID[params.data.source] } > ${ that.nodeWithID[ params.data.target] } : <b> ${params.data.value} </b>`
              }else if(params.dataType == "node"){
                  return `${params.data.name}`
              }

            }

          },
          legend: [
            {
              // selectedMode: 'single',
              orient:"vertical",
              left:"10",
              top:"10",
              itemGap:25,
              data: this.graph.categories.map(function (a) {
                return a.name
              })
            }
          ],

          animation:false,
          series: [
            {
              cursor:"pointer",
              animation:false,
              // name: 'MACdb association network',
              type: 'graph',
              layout: 'force',
              // layout: 'none',
              // layout: 'none',
              // layout: 'circular',
              data: this.graph.nodes,
              links: this.graph.links,
              categories: this.graph.categories,
              roam: true,
              label: {
                show: this.plotconfig.showLabel,
                position: 'middle',
                formatter: '{b}'
              },
              draggable: true,
              animationEasing:"linear",
              zoom:3,
              force: {
                edgeLength: 15,
                repulsion: 20,
                gravity: 0.1,
                friction:0.1,

              }
            }
          ]
        };


      myChart.clear()
      option && myChart.setOption(option);



      myChart.hideLoading();

      let that = this
      myChart.off('click')
      myChart.on('click', function(params) {
        // console.log("clicking....")
        if(params.dataType == "node"){
          let myattr = params.data.myattrs

          if(myattr.type == "tid"){
            that.$commonfunc.openAtNewPageTraitDetail(myattr.id)
          }
          else if(myattr.type == "cid"){

            that.$commonfunc.openAtNewPageMetaboliteDetail(myattr.id)
          }
        }

      });

      window.addEventListener("resize", () => {
        // 第六步，执行echarts自带的resize方法，即可做到让echarts图表自适应
        that.myChart && that.myChart.resize();
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
