<template>
  <v-expansion-panels v-model="expandPanels1"  style="z-index: auto;"  accordion class="my-4" >
    <v-expansion-panel

    >
      <v-expansion-panel-header class="font-weight-bold" expand-icon="" @click="isexpand = !isexpand" > <span>{{titleName}} <v-icon left v-show="isexpand" >mdi-chevron-double-up</v-icon> <v-icon left v-show="!isexpand" >mdi-chevron-double-down</v-icon> </span></v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot></slot>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
name: "expandPanel",
  props:['titleName'],
  data(){
  return{
    isexpand:true,
    expandPanels1:0
  }
}
}
</script>

<style scoped>

</style>
