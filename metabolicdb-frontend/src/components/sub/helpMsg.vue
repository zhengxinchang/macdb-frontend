<template>

  <v-menu
    open-on-hover
    bottom
    offset-y
  >
  <template v-slot:activator="{ on, attrs }">

      <v-icon
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        small
      >mdi-help-circle-outline</v-icon>

  </template>
  <v-sheet rounded color="white" elevation="99" class="pa-2 text-left" max-width="500">
    <slot>

    </slot>
  </v-sheet>

</v-menu>
</template>

<script>
export default {
  name: "helpMsg"
}
</script>

<style scoped>

</style>
