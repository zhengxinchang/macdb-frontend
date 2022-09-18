<template>

  <v-row align="center" class="mb-1" no-gutters style="display: block">
    <v-col class="text-left">
      <span class="text-left font-weight-bold">Delta Trends Summary: </span>
      <v-chip color="pink" dark label small>Case group > Control group</v-chip>
      <v-chip color="teal" dark label small>Case group < Control group</v-chip>
      <v-chip color="grey" dark label small>Unchanged & Missing</v-chip>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
export default {
name: "deltaTrendSummary"
}
</script>

<style scoped>

</style>
