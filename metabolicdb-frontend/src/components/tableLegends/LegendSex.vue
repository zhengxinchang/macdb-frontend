<template>
  <v-row align="center" class="mb-1" no-gutters style="display: block">
    <v-col class="text-left">
      <span class="text-left font-weight-bold">Sex:</span>
      <v-chip color="pink" dark label small> Female</v-chip>
      <v-chip color="teal" dark label small>Male</v-chip>
      <v-chip color="blue" dark label small>Female & Male</v-chip>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
export default {
  name: "LegendSex"
}
</script>

<style scoped>

</style>
