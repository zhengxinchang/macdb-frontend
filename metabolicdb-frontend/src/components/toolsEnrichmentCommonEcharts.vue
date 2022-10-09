<template>
  <div>


<!--    <v-btn @click="resizeChart">resize</v-btn>-->
<!--    <div style="height: 450px">-->
      <div :id="chartid" style="width: 1200px; height: 500px;margin: 0 auto;"></div>
<!--    </div>-->

  </div>
</template>

<script>
export default {
  name: "toolsEnrichmentCommonEcharts",
  props: ['chartid', "options"],
  data() {
    return {
      myChart: null,
    }
  },
  methods:{

    resizeChart(){

      this.myChart.resize()
    }

  },
  mounted() {


    let chartDom = document.getElementById(this.chartid);
    this.myChart = this.$echarts.init(
      chartDom,
    );
    this.myChart && this.myChart.clear()
    this.options && this.myChart && this.myChart.setOption(this.options,true);
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });

    // this.$nextTick(function () {
    //
    //   this.myChart.resize();
    // })


  },
  watch: {
    "options": {

      handler: function () {
        if (this.options !=null) {

        // let chartDom = document.getElementById(this.chartid);
        // this.myChart = this.$echarts.init(
        //   chartDom,
        // );

        // console.log("option change detected in common chart ...")
        // this.myChart && this.myChart.clear()
        // this.myChart.resize()

          this.myChart && this.myChart.clear()
          this.options && this.myChart && this.myChart.setOption(this.options,true);
        }
      },
      immediate: true,
      deep: true
    },

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
