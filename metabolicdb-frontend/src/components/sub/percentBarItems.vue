<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs"
             v-on="on">
          <v-btn-toggle
            class="mx-auto"
            style="width: 100%;"
          >
            <v-btn v-for="x in reformdata" v-if="x.pct>0"
                   :key="x.name"
                   :color="x.color" :width=" String(parseInt(x.pct))+'%'" class="no-gutters mx-0 px-0" dark
                   min-width="0" style="pointer-events: none" x-small></v-btn>
          </v-btn-toggle>
        </div>
      </template>
      <div class="mx-1 my-2">
        <table>
          <tbody>
          <tr v-for="x in reformdata" :key="x.name"
              class="text-left text-body-2">
            <td>{{ x.goodname }}:</td>
            <td class="text-right"><b>{{ Math.round(x.pct, 0) }}%</b></td>
          </tr>
          </tbody>
        </table>
      </div>
    </v-tooltip>
  </div>


</template>


<script>
export default {
  name: "percentBar3Item",
  props: ['dat'],
  data() {
    return {
      testdata: {
        "upCount": 1,
        "downCount": 0,
        "naCount": 0,
        "total": 1,
        "upPct": 100,
        "downPct": 0,
        "naPct": 0
      },

    }
  },
  computed: {
    reformdata() {
      let dat = this.dat
      let x = []
      x.push({
        name: "Up",
        color: "pink",
        pct: dat.upPct,
        goodname: "Up"
      })
      x.push({
        name: "Down",
        color: "teal",
        pct: dat.downPct,
        goodname: "Down"
      })

      x.push({
        name: "NA",
        color: "grey",
        pct: dat.naPct,
        goodname: "Unchanged & Missing"
      })
      return x
    }
  }
}
</script>

<style scoped>

</style>
