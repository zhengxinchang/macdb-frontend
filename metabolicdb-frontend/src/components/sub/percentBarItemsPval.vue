<template>
  <div>

    <v-tooltip  top >
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs"
             v-on="on">
          <v-btn-toggle

            style="width: 100%;"
            class="mx-auto"
          >
            <v-btn v-for="x in reformdata" style="pointer-events: none" v-if="x.pct>0"
                   :key="x.name" :color="x.color" :width=" String(parseInt(x.pct))+'%'" class="no-gutters mx-0 px-0"
                   dark min-width="0" x-small></v-btn>
          </v-btn-toggle>
        </div>
      </template>

        <div class="my-1 mx-2" >

          <table>
            <tbody>
            <tr  class="text-left text-body-2" v-for="x in reformdata"
                  :key="x.name">
              <td  >{{ x.goodname }}:</td> <td class="text-right"><b>{{ Math.round(x.pct, 0) }}%</b></td>
            </tr>
            </tbody>
          </table>
<!--          <div  class="text-left" v-for="x in reformdata"-->
<!--               :key="x.name">-->
<!--            <span  >{{ x.goodname }}:</span>  <span  ><b>{{ Math.round(x.pct, 0) }}%</b></span>-->
<!--          </div>-->
        </div>



    </v-tooltip>

  </div>


</template>

<script>
export default {
  name: "percentBarItemsPval",
  props: ['dat'],
  methods:{
  },
  computed: {
    reformdata() {
      let dat = this.dat
      let x = []
      x.push({
        name: "lt0001",
        color: "pink",
        pct: dat.lt0001Pct,
        goodname:"p <=0.001"
      })

      x.push({
        name: "0001_001Pct",
        color: "blue",
        pct: dat['0001_001Pct'],
        goodname:"0.001< p ≤0.01"
      })
      x.push({
        name: "005_001Pct",
        color: "teal",
        pct: dat['005_001Pct'],
        goodname:"0.01< p ≤0.05"
      })

      x.push({
        name: "gt005Pct",
        color: "yellow darken-3",
        pct: dat.gt005Pct,
        goodname:"p >0.05"
      })

      x.push({
        name: "NA",
        color: "grey",
        pct: dat.naPct,
        goodname:"NA"
      })
      return x
    }
  }
}
</script>

<style scoped>

</style>
