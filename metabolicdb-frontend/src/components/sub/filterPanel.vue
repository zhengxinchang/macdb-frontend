<template>
  <div>
<!--    <v-row>-->
<!--      <v-col cols="2" class="text-left"> <v-btn elevation="0" style="text-transform: none" small @click="expandFilter=!expandFilter" dark :color="$store.state.mainColor" >Filters <v-icon small v-show="!expandFilter" >mdi-chevron-double-down</v-icon> <v-icon small v-show="expandFilter" >mdi-chevron-double-up</v-icon></v-btn></v-col>-->
<!--    </v-row>-->
<!--    <v-row >-->
<!--      <v-col >-->
<!--        <v-expand-transition>-->
<!--          <slot  :isexpand="expandFilter"  ></slot>-->
<!--        </v-expand-transition>-->
<!--      </v-col>-->
<!--    </v-row>-->

    <v-row >
      <v-col >
          <slot ></slot>
      </v-col>
    </v-row>
  </div>

</template>

<script>
export default {
name: "filterPanel",
  data(){
  return{
    expandFilter:true
  }
  }
}
</script>

<style scoped>

</style>
