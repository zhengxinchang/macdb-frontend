<template>
  <v-chip v-show="sex != null" :color="colorSex(sex)" dark label x-small> {{ sex }}
  </v-chip>
</template>

<script>
export default {
  name: "sexChip",
  props:['sex'],
  methods:{
    colorSex(sex){
      if(sex && sex.toUpperCase().trim() =='F'){
        return "pink"
      }else if(sex && sex.toUpperCase().trim() =='M'){
        return "teal"
      }else{
        return "blue"
      }
    }
  }
}
</script>

<style scoped>

</style>
