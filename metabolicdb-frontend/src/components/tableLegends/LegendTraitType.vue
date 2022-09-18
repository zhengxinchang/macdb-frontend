<template>
  <v-row align="center" class="mb-1" no-gutters style="display: block">
    <v-col class="text-left">
      <span class="text-left font-weight-bold">Trait Type:</span>
      <v-chip :color="$commonfunc.getColorCodeByTraitType('cancer')" dark label small>cancer</v-chip>
      <v-chip :color="$commonfunc.getColorCodeByTraitType('gene abnormality')" dark label small>gene abnormality</v-chip>
      <v-chip :color="$commonfunc.getColorCodeByTraitType('genotype')" dark label small>genotype</v-chip>
      <v-chip :color="$commonfunc.getColorCodeByTraitType('medical intervention')" dark label small>medical intervention</v-chip>
      <v-chip :color="$commonfunc.getColorCodeByTraitType('phenotype')" dark label small>phenotype</v-chip>
<!--      <v-chip color="grey" dark label small>NA</v-chip>-->



    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
export default {
  name: "traitType"
}
</script>

<style scoped>

</style>
