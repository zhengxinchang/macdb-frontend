<template>
  <v-row align="center" class="mb-1" no-gutters style="display: block">
    <v-col class="text-left">
      <span class="text-left font-weight-bold">Pval Summary:</span>
      <v-chip color="pink" dark label small>p ≤ 0.001</v-chip>
      <v-chip color="blue" dark label small>0.001 < p ≤ 0.01</v-chip>
      <v-chip color="teal" dark label small>0.01 < p ≤ 0.05</v-chip>
      <v-chip color="yellow darken-3" dark label small>p > 0.05</v-chip>
      <v-chip color="grey" dark label small>NA</v-chip>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
export default {
  name: "pvalSummary"
}
</script>

<style scoped>

</style>
